/**
 * generate-full-comic.ts — End-to-End Comic Production Pipeline
 *
 * Reads a comic script markdown file, generates all panel scenes via Fal.ai
 * LoRA, then assembles the final strip with speech bubbles and text.
 *
 * This is the ALL-IN-ONE pipeline:
 *   Write script (.md) → Run one command → Get professional comic strip.
 *
 * Usage:
 *   npx tsx scripts/generate-full-comic.ts \
 *     --script comics/scripts/comic-001.md \
 *     --output comics/comic-001-final.png
 *
 * Script Markdown Format:
 *   # Comic 001: Rookie Cards Explained
 *   Layout: grid
 *   Title: Atlas Tips #001: Rookie Cards
 *
 *   ## Panel 1
 *   Prompt: atlas_character in a card shop examining cards, excited expression
 *   Text: Hey collectors! Let me tell you about ROOKIE CARDS!
 *   Bubble: top-left
 *
 *   ## Panel 2
 *   Prompt: atlas_character holding up a basketball card proudly
 *   Text: A rookie card is a player's FIRST officially licensed card!
 *   Bubble: top-right
 *   ...
 *
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - .lora-model-url.txt in project root
 *   - node_modules installed (canvas, dotenv)
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateComicPanel } from './generate-comic-panel.js';
import { composeComicStrip } from './compose-comic-strip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type BubblePosition = 'top-left' | 'top-right' | 'top-center';
type LayoutType = 'grid' | 'horizontal' | 'vertical' | '3x3';

interface PanelScript {
  number: number;
  prompt: string;
  text: string;
  bubble: BubblePosition;
  seed?: number;
}

interface ComicScript {
  title?: string;
  layout: LayoutType;
  panels: PanelScript[];
  metadata?: Record<string, string>;
}

interface FullComicArgs {
  scriptPath: string;
  output?: string;
  skipGenerate?: boolean; // Skip image generation (use existing)
  panelDir?: string;      // Custom directory for generated panels
  dryRun?: boolean;       // Parse and display script without generating
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

function parseArgs(argv: string[]): FullComicArgs {
  const args = argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  const scriptPath = get('--script');
  if (!scriptPath) {
    printUsage();
    process.exit(1);
  }

  return {
    scriptPath,
    output: get('--output'),
    skipGenerate: has('--skip-generate'),
    panelDir: get('--panel-dir'),
    dryRun: has('--dry-run'),
  };
}

function printUsage(): void {
  console.error(`
╔══════════════════════════════════════════════════════════════════════╗
║  🎬 Atlas Full Comic Pipeline — Script to Finished Strip           ║
╚══════════════════════════════════════════════════════════════════════╝

End-to-end pipeline: reads a comic script, generates all panels via
Fal.ai LoRA, then assembles the final strip with bubbles and text.

Usage:
  npx tsx scripts/generate-full-comic.ts \\
    --script comics/scripts/comic-001.md \\
    --output comics/comic-001-final.png

Required:
  --script <path>        Path to comic script markdown file

Optional:
  --output <path>        Final output path (default: derived from script name)
  --skip-generate        Skip AI generation, use existing panel images
  --panel-dir <path>     Custom directory for panel images
  --dry-run              Parse script and show plan without generating

Script Markdown Format:
  # Comic 001: Title Here
  Layout: grid | horizontal | vertical | 3x3
  Title: Display title for the strip

  ## Panel 1
  Prompt: atlas_character doing something, detailed scene description
  Text: Dialogue text here (or NAR: for narration)
  Bubble: top-left | top-right | top-center
  Seed: 12345 (optional, for reproducibility)

  ## Panel 2
  ...
`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT PARSER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Parse a comic script markdown file into structured data.
 */
function parseComicScript(filePath: string): ComicScript {
  const resolvedPath = path.resolve(PROJECT_ROOT, filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Script file not found: ${resolvedPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, 'utf-8');
  const lines = content.split('\n');

  let title: string | undefined;
  let layout: LayoutType = 'grid';
  const panels: PanelScript[] = [];
  const metadata: Record<string, string> = {};

  let currentPanel: Partial<PanelScript> | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines
    if (!line) continue;

    // H1 header — comic title (informational, not the strip title)
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      metadata.comicName = line.substring(2).trim();
      continue;
    }

    // Top-level metadata fields
    if (line.startsWith('Layout:')) {
      layout = line.substring(7).trim().toLowerCase() as LayoutType;
      continue;
    }
    if (line.startsWith('Title:')) {
      title = line.substring(6).trim();
      continue;
    }

    // Panel header
    if (line.startsWith('## Panel')) {
      // Save previous panel if exists
      if (currentPanel && currentPanel.prompt && currentPanel.text) {
        panels.push(currentPanel as PanelScript);
      }

      const numMatch = line.match(/\d+/);
      currentPanel = {
        number: numMatch ? parseInt(numMatch[0], 10) : panels.length + 1,
        prompt: '',
        text: '',
        bubble: panels.length % 2 === 0 ? 'top-left' : 'top-right',
      };
      continue;
    }

    // Panel fields
    if (currentPanel) {
      if (line.startsWith('Prompt:')) {
        currentPanel.prompt = line.substring(7).trim();
      } else if (line.startsWith('Text:')) {
        currentPanel.text = line.substring(5).trim();
      } else if (line.startsWith('Bubble:')) {
        currentPanel.bubble = line.substring(7).trim() as BubblePosition;
      } else if (line.startsWith('Seed:')) {
        currentPanel.seed = parseInt(line.substring(5).trim(), 10);
      }
    }
  }

  // Don't forget the last panel
  if (currentPanel && currentPanel.prompt && currentPanel.text) {
    panels.push(currentPanel as PanelScript);
  }

  if (panels.length === 0) {
    console.error('❌ No panels found in script. Ensure format uses ## Panel N headers.');
    process.exit(1);
  }

  return { title, layout, panels, metadata };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PIPELINE EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  console.log(`\n🎬 Atlas Full Comic Pipeline`);
  console.log(`${'─'.repeat(50)}`);

  // Parse the script
  const script = parseComicScript(args.scriptPath);

  console.log(`   📄 Script: ${args.scriptPath}`);
  console.log(`   📐 Layout: ${script.layout}`);
  if (script.title) console.log(`   📝 Title: "${script.title}"`);
  console.log(`   🖼️  Panels: ${script.panels.length}`);
  console.log('');

  // Display panel plan
  for (const panel of script.panels) {
    console.log(`   Panel ${panel.number}:`);
    console.log(`     Prompt: "${panel.prompt.substring(0, 60)}${panel.prompt.length > 60 ? '...' : ''}"`);
    console.log(`     Text: "${panel.text.substring(0, 50)}${panel.text.length > 50 ? '...' : ''}"`);
    console.log(`     Bubble: ${panel.bubble}`);
    console.log('');
  }

  if (args.dryRun) {
    console.log('🏁 Dry run complete. No images generated.');
    return;
  }

  // Determine panel output directory
  const scriptBasename = path.basename(args.scriptPath, '.md');
  const panelDir = args.panelDir
    ? path.resolve(PROJECT_ROOT, args.panelDir)
    : path.resolve(PROJECT_ROOT, 'generated', scriptBasename);

  if (!fs.existsSync(panelDir)) {
    fs.mkdirSync(panelDir, { recursive: true });
  }

  // Step 1: Generate panel images
  console.log(`${'═'.repeat(50)}`);
  console.log(`📸 STEP 1: Generate panel scene images`);
  console.log(`${'═'.repeat(50)}`);

  const panelPaths: string[] = [];

  for (const panel of script.panels) {
    const panelFilename = `panel-${String(panel.number).padStart(2, '0')}.png`;
    const panelPath = path.join(panelDir, panelFilename);
    const relativePanelPath = path.relative(PROJECT_ROOT, panelPath);

    if (args.skipGenerate && fs.existsSync(panelPath)) {
      console.log(`   ⏭️  Panel ${panel.number}: Using existing → ${relativePanelPath}`);
      panelPaths.push(relativePanelPath);
      continue;
    }

    console.log(`\n   🎬 Panel ${panel.number}/${script.panels.length}:`);

    try {
      await generateComicPanel({
        prompt: panel.prompt,
        size: '1024x1024',
        output: relativePanelPath,
        seed: panel.seed,
      });
      panelPaths.push(relativePanelPath);
    } catch (err: any) {
      console.error(`   ❌ Failed to generate panel ${panel.number}: ${err.message}`);
      console.error(`      Continuing with remaining panels...`);
      // Create a placeholder path (strip compositor will error if missing)
      panelPaths.push(relativePanelPath);
    }

    // Brief pause between generations to avoid rate limiting
    if (panel.number < script.panels.length) {
      console.log(`   ⏱️  Cooling down (2s)...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Step 2: Assemble the strip
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📰 STEP 2: Assemble comic strip`);
  console.log(`${'═'.repeat(50)}`);

  const finalOutput = args.output || `comics/${scriptBasename}-final.png`;

  await composeComicStrip({
    layout: script.layout,
    title: script.title,
    panels: script.panels.map((panel, i) => ({
      imagePath: panelPaths[i],
      text: panel.text,
      bubblePosition: panel.bubble,
    })),
    output: finalOutput,
  });

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 PIPELINE COMPLETE`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   Script:  ${args.scriptPath}`);
  console.log(`   Panels:  ${panelDir}/`);
  console.log(`   Output:  ${path.resolve(PROJECT_ROOT, finalOutput)}`);
  console.log(`\n   Run again with --skip-generate to re-compose without regenerating.`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
