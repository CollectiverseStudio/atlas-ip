/**
 * compose-comic-strip.ts — Comic Strip Assembly from Pre-Generated Scene Panels
 *
 * REPLACES the old compose-comic-panel.ts approach entirely.
 *
 * OLD APPROACH (amateur):
 *   Paste isolated character PNGs onto coded/programmatic backgrounds.
 *   Result: flat, artificial, clearly composited look.
 *
 * NEW APPROACH (professional):
 *   Take FULL SCENE AI-generated panel images (character already IN the environment)
 *   and ONLY overlay: speech bubbles, text, panel borders, gutters, titles.
 *   The panel image IS the background. No separate character layer. No coded backgrounds.
 *
 * This matches the quality of the reference comics (atlas-comic-strip-1.png through 31.png)
 * which are fully rendered AI scenes with Atlas integrated into rich environments.
 *
 * Usage:
 *   npx tsx scripts/compose-comic-strip.ts \
 *     --layout grid \
 *     --title "Atlas Tips #001: Rookie Cards" \
 *     --panel1 generated/comic-001-panel-1.png --text1 "Hey collectors!" --bubble1 "top-left" \
 *     --panel2 generated/comic-001-panel-2.png --text2 "A rookie card is..." --bubble2 "top-right" \
 *     --panel3 generated/comic-001-panel-3.png --text3 "But not every card counts..." --bubble3 "top-left" \
 *     --panel4 generated/comic-001-panel-4.png --text4 "Look for the RC logo!" --bubble4 "top-right" \
 *     --output comics/comic-001-final.png
 */

import 'dotenv/config';
import { createCanvas, loadImage, Canvas, CanvasRenderingContext2D, Image } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN CONSTANTS — Matching Reference Comic Style
// ═══════════════════════════════════════════════════════════════════════════════

const DESIGN = {
  // Layout
  outerBorder: 4,          // px — solid black border around entire strip
  panelBorder: 3,          // px — solid black border around each panel
  gutterWidth: 8,          // px — white space between panels
  gutterColor: '#F5F5F5',  // very light gray
  titleBarHeight: 40,      // px — navy bar at top with comic title

  // Colors
  titleBarBg: '#1B2B5E',
  titleBarText: '#FFFFFF',
  borderColor: '#000000',

  // Speech bubbles
  bubbleFill: '#FFFFFF',
  bubbleStroke: '#000000',
  bubbleStrokeWidth: 2,
  bubbleMaxWidthPct: 0.45, // max 45% of panel width
  bubbleTopZonePct: 0.35,  // bubbles stay in top 35% of panel
  bubblePaddingX: 14,
  bubblePaddingY: 10,
  bubbleShadow: 'rgba(0, 0, 0, 0.12)',
  bubbleShadowBlur: 6,

  // Narration boxes
  narrationBg: '#1B2B5E',
  narrationText: '#FFFFFF',
  narrationRadius: 4,
  narrationPadding: 10,

  // Typography
  dialogueFontSize: 16,
  dialogueLineHeight: 20,
  narrationFontSize: 14,
  narrationLineHeight: 18,
  titleFontSize: 24,

  // Watermark
  watermarkText: 'collectiverse.com',
  watermarkOpacity: 0.20,
  watermarkSize: 14,

  // Panel numbering
  panelNumberOpacity: 0.40,
  panelNumberSize: 16,
} as const;

// Circled number characters for panel numbering
const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];

// Layout dimension presets
const LAYOUT_PRESETS: Record<string, { cols: number; rows: number; width: number; height: number }> = {
  'grid':       { cols: 2, rows: 2, width: 1200, height: 1200 },  // Instagram square
  'horizontal': { cols: 4, rows: 1, width: 2400, height: 628 },   // Twitter/newspaper
  'vertical':   { cols: 1, rows: 4, width: 600, height: 2400 },   // Webtoon/story
  '3x3':        { cols: 3, rows: 3, width: 1200, height: 1200 },  // 9-panel page
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type BubblePosition = 'top-left' | 'top-right' | 'top-center';
type LayoutType = 'grid' | 'horizontal' | 'vertical' | '3x3';

interface PanelInput {
  imagePath: string;
  text: string;
  bubblePosition: BubblePosition;
}

interface StripConfig {
  layout: LayoutType;
  title?: string;
  panels: PanelInput[];
  output: string;
  noWatermark?: boolean;
  noNumbers?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

function parseArgs(argv: string[]): StripConfig {
  const args = argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  const layout = (get('--layout') || 'grid') as LayoutType;
  if (!LAYOUT_PRESETS[layout]) {
    console.error(`❌ Unknown layout: "${layout}". Options: grid, horizontal, vertical, 3x3`);
    process.exit(1);
  }

  // Parse panel arguments (supports up to 9 panels)
  const panels: PanelInput[] = [];
  for (let i = 1; i <= 9; i++) {
    const imagePath = get(`--panel${i}`);
    const text = get(`--text${i}`);
    if (imagePath && text) {
      const bubblePosition = (get(`--bubble${i}`) || (i % 2 === 1 ? 'top-left' : 'top-right')) as BubblePosition;
      panels.push({ imagePath, text, bubblePosition });
    }
  }

  if (panels.length === 0) {
    printUsage();
    process.exit(1);
  }

  return {
    layout,
    title: get('--title'),
    panels,
    output: get('--output') || 'comics/strip-output.png',
    noWatermark: has('--no-watermark'),
    noNumbers: has('--no-numbers'),
  };
}

function printUsage(): void {
  console.error(`
╔══════════════════════════════════════════════════════════════════════╗
║  📰 Atlas Comic Strip Assembler — Scene-First Composition          ║
╚══════════════════════════════════════════════════════════════════════╝

Assembles pre-generated AI scene panels into a comic strip.
ONLY adds: borders, gutters, speech bubbles, text, title, watermark.
The panel image IS the background — no compositing of characters.

Usage:
  npx tsx scripts/compose-comic-strip.ts \\
    --layout grid \\
    --title "Atlas Tips #001: Rookie Cards" \\
    --panel1 generated/panel-1.png --text1 "Hey collectors!" --bubble1 "top-left" \\
    --panel2 generated/panel-2.png --text2 "Rookie cards are..." --bubble2 "top-right" \\
    --panel3 generated/panel-3.png --text3 "Not every card counts!" --bubble3 "top-left" \\
    --panel4 generated/panel-4.png --text4 "Look for the RC logo!" --bubble4 "top-right" \\
    --output comics/comic-001-final.png

Required:
  --panel1 <path>      Panel 1 scene image
  --text1 <string>     Panel 1 dialogue (prefix with "NAR:" for narration box)
  --layout <type>      grid (2x2) | horizontal (1x4) | vertical (4x1) | 3x3 (3x3)

Optional:
  --bubble1 <pos>      top-left | top-right | top-center (default alternates)
  --title <string>     Title bar text (navy bar at top)
  --output <path>      Output file path
  --no-watermark       Omit the collectiverse.com watermark
  --no-numbers         Omit panel number indicators

Supports up to 9 panels (--panel1 through --panel9).

Special text prefixes:
  NAR:text here       → Navy narration box (top-left, no tail)
  (no prefix)         → White speech bubble with tail pointing to character
`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEXT WRAPPING UTILITY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Wrap text to fit within a max width, returning lines.
 * Uses the canvas context to measure text width.
 */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPEECH BUBBLE RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Draw a speech bubble with text overlaid on the panel.
 * The bubble is positioned within the top 35% of the panel area
 * and includes a pointed tail curving toward the character (center-bottom).
 */
function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  panelX: number,
  panelY: number,
  panelW: number,
  panelH: number,
  text: string,
  position: BubblePosition
): void {
  // Set up text measurement font
  ctx.font = `bold ${DESIGN.dialogueFontSize}px "Arial Black", "Impact", Arial, sans-serif`;
  ctx.textBaseline = 'top';

  // ALL CAPS for comic dialogue
  const upperText = text.toUpperCase();

  // Calculate max bubble width (45% of panel)
  const maxBubbleWidth = panelW * DESIGN.bubbleMaxWidthPct;
  const maxTextWidth = maxBubbleWidth - (DESIGN.bubblePaddingX * 2);

  // Wrap text
  const lines = wrapText(ctx, upperText, maxTextWidth);

  // Calculate bubble dimensions
  let textWidth = 0;
  for (const line of lines) {
    const w = ctx.measureText(line).width;
    if (w > textWidth) textWidth = w;
  }

  const bubbleWidth = textWidth + (DESIGN.bubblePaddingX * 2);
  const textHeight = lines.length * DESIGN.dialogueLineHeight;
  const bubbleHeight = textHeight + (DESIGN.bubblePaddingY * 2);

  // Position the bubble within the panel's top zone
  const topZone = panelH * DESIGN.bubbleTopZonePct;
  let bubbleX: number;
  let bubbleY: number;

  const margin = 12; // px from panel edge

  switch (position) {
    case 'top-left':
      bubbleX = panelX + margin;
      bubbleY = panelY + margin;
      break;
    case 'top-right':
      bubbleX = panelX + panelW - bubbleWidth - margin;
      bubbleY = panelY + margin;
      break;
    case 'top-center':
      bubbleX = panelX + (panelW - bubbleWidth) / 2;
      bubbleY = panelY + margin;
      break;
  }

  // Ensure bubble stays within panel boundaries
  bubbleX = Math.max(panelX + margin, Math.min(bubbleX, panelX + panelW - bubbleWidth - margin));
  bubbleY = Math.max(panelY + margin, Math.min(bubbleY, panelY + topZone - bubbleHeight));

  // Tail anchor point (where the tail points to — toward character at center-bottom)
  const tailTargetX = panelX + panelW * 0.5;
  const tailTargetY = panelY + panelH * 0.6;

  // Tail origin (bottom of bubble, offset toward target)
  const tailBaseX = bubbleX + bubbleWidth * (position === 'top-left' ? 0.6 : position === 'top-right' ? 0.4 : 0.5);
  const tailBaseY = bubbleY + bubbleHeight;

  // Draw shadow behind bubble
  ctx.save();
  ctx.shadowColor = DESIGN.bubbleShadow;
  ctx.shadowBlur = DESIGN.bubbleShadowBlur;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw bubble body (rounded elliptical shape)
  ctx.beginPath();
  const rx = bubbleWidth / 2;
  const ry = bubbleHeight / 2;
  const cx = bubbleX + rx;
  const cy = bubbleY + ry;
  ctx.ellipse(cx, cy, rx + 4, ry + 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = DESIGN.bubbleFill;
  ctx.fill();
  ctx.restore();

  // Draw bubble outline (no shadow)
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx + 4, ry + 4, 0, 0, Math.PI * 2);
  ctx.strokeStyle = DESIGN.bubbleStroke;
  ctx.lineWidth = DESIGN.bubbleStrokeWidth;
  ctx.stroke();

  // Draw pointed tail
  const tailWidth = 12;
  const tailLength = Math.min(30, (tailTargetY - tailBaseY) * 0.6);

  if (tailLength > 5) {
    ctx.beginPath();
    ctx.moveTo(tailBaseX - tailWidth / 2, tailBaseY - 2);
    ctx.quadraticCurveTo(
      tailBaseX + (tailTargetX - tailBaseX) * 0.2,
      tailBaseY + tailLength * 0.6,
      tailBaseX + (tailTargetX - tailBaseX) * 0.15,
      tailBaseY + tailLength
    );
    ctx.quadraticCurveTo(
      tailBaseX + (tailTargetX - tailBaseX) * 0.1,
      tailBaseY + tailLength * 0.5,
      tailBaseX + tailWidth / 2,
      tailBaseY - 2
    );
    ctx.fillStyle = DESIGN.bubbleFill;
    ctx.fill();
    ctx.strokeStyle = DESIGN.bubbleStroke;
    ctx.lineWidth = DESIGN.bubbleStrokeWidth;
    ctx.stroke();

    // Cover the join line between tail and bubble with fill
    ctx.beginPath();
    ctx.moveTo(tailBaseX - tailWidth / 2 - 1, tailBaseY - 4);
    ctx.lineTo(tailBaseX + tailWidth / 2 + 1, tailBaseY - 4);
    ctx.lineTo(tailBaseX + tailWidth / 2 + 1, tailBaseY + 2);
    ctx.lineTo(tailBaseX - tailWidth / 2 - 1, tailBaseY + 2);
    ctx.fillStyle = DESIGN.bubbleFill;
    ctx.fill();
  }

  // Draw text
  ctx.font = `bold ${DESIGN.dialogueFontSize}px "Arial Black", "Impact", Arial, sans-serif`;
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const textStartY = bubbleY + DESIGN.bubblePaddingY;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], cx, textStartY + i * DESIGN.dialogueLineHeight);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATION BOX RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Draw a narration caption box (dark navy background, white italic text).
 * Positioned at top-left of the panel. No tail.
 */
function drawNarrationBox(
  ctx: CanvasRenderingContext2D,
  panelX: number,
  panelY: number,
  panelW: number,
  _panelH: number,
  text: string
): void {
  ctx.font = `italic bold ${DESIGN.narrationFontSize}px Georgia, "Times New Roman", serif`;
  ctx.textBaseline = 'top';

  const maxWidth = panelW * 0.50;
  const maxTextWidth = maxWidth - (DESIGN.narrationPadding * 2);
  const lines = wrapText(ctx, text, maxTextWidth);

  let textWidth = 0;
  for (const line of lines) {
    const w = ctx.measureText(line).width;
    if (w > textWidth) textWidth = w;
  }

  const boxWidth = textWidth + (DESIGN.narrationPadding * 2);
  const textHeight = lines.length * DESIGN.narrationLineHeight;
  const boxHeight = textHeight + (DESIGN.narrationPadding * 2);

  const boxX = panelX + 8;
  const boxY = panelY + 8;

  // Draw box background with slight rounded corners
  const r = DESIGN.narrationRadius;
  ctx.beginPath();
  ctx.moveTo(boxX + r, boxY);
  ctx.lineTo(boxX + boxWidth - r, boxY);
  ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + r, r);
  ctx.lineTo(boxX + boxWidth, boxY + boxHeight - r);
  ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - r, boxY + boxHeight, r);
  ctx.lineTo(boxX + r, boxY + boxHeight);
  ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - r, r);
  ctx.lineTo(boxX, boxY + r);
  ctx.arcTo(boxX, boxY, boxX + r, boxY, r);
  ctx.closePath();

  ctx.fillStyle = DESIGN.narrationBg;
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw text
  ctx.fillStyle = DESIGN.narrationText;
  ctx.font = `italic bold ${DESIGN.narrationFontSize}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = 'left';

  const textStartX = boxX + DESIGN.narrationPadding;
  const textStartY = boxY + DESIGN.narrationPadding;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], textStartX, textStartY + i * DESIGN.narrationLineHeight);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TITLE BAR RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Draw the title bar across the top of the strip.
 */
function drawTitleBar(ctx: CanvasRenderingContext2D, width: number, title: string): void {
  // Background
  ctx.fillStyle = DESIGN.titleBarBg;
  ctx.fillRect(0, 0, width, DESIGN.titleBarHeight);

  // Text
  ctx.font = `bold ${DESIGN.titleFontSize}px "Arial Black", "Impact", Arial, sans-serif`;
  ctx.fillStyle = DESIGN.titleBarText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title.toUpperCase(), width / 2, DESIGN.titleBarHeight / 2);
}

// ═══════════════════════════════════════════════════════════════════════════════
// WATERMARK RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Draw the watermark at bottom-right corner.
 */
function drawWatermark(ctx: CanvasRenderingContext2D, totalW: number, totalH: number): void {
  ctx.save();
  ctx.globalAlpha = DESIGN.watermarkOpacity;
  ctx.font = `italic ${DESIGN.watermarkSize}px Georgia, serif`;
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(DESIGN.watermarkText, totalW - DESIGN.outerBorder - 8, totalH - DESIGN.outerBorder - 6);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL NUMBER RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Draw a subtle circled panel number in the top-left of each panel.
 */
function drawPanelNumber(
  ctx: CanvasRenderingContext2D,
  panelX: number,
  panelY: number,
  num: number
): void {
  if (num < 1 || num > 9) return;

  ctx.save();
  ctx.globalAlpha = DESIGN.panelNumberOpacity;
  ctx.font = `bold ${DESIGN.panelNumberSize}px Arial, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const char = CIRCLED_NUMBERS[num - 1];
  const x = panelX + 6;
  const y = panelY + 6;

  // Dark outline for visibility on any background
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = 3;
  ctx.strokeText(char, x, y);

  // White fill
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(char, x, y);

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPOSITION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Compose a comic strip from pre-generated panel scene images.
 * This is the core function that can be called programmatically.
 */
export async function composeComicStrip(config: StripConfig): Promise<string> {
  const layoutDef = LAYOUT_PRESETS[config.layout];
  if (!layoutDef) {
    throw new Error(`Unknown layout: ${config.layout}`);
  }

  const { cols, rows, width: totalW } = layoutDef;
  let { height: totalH } = layoutDef;

  // Determine actual grid needed based on panel count
  const panelCount = config.panels.length;
  const effectiveCols = Math.min(cols, panelCount);
  const effectiveRows = Math.ceil(panelCount / effectiveCols);

  // Adjust height if we have fewer rows than the preset
  if (config.layout === 'grid' || config.layout === '3x3') {
    const baseRowHeight = totalH / rows;
    totalH = Math.round(baseRowHeight * effectiveRows);
  }

  // Add title bar height if title provided
  const titleOffset = config.title ? DESIGN.titleBarHeight : 0;
  const canvasH = totalH + titleOffset;

  // Create canvas
  const canvas = createCanvas(totalW, canvasH);
  const ctx = canvas.getContext('2d');

  // Fill background (gutter color covers everything, panels drawn on top)
  ctx.fillStyle = DESIGN.gutterColor;
  ctx.fillRect(0, 0, totalW, canvasH);

  // Draw title bar if provided
  if (config.title) {
    drawTitleBar(ctx, totalW, config.title);
  }

  // Calculate panel dimensions
  const panelAreaW = totalW - (DESIGN.outerBorder * 2) - (DESIGN.gutterWidth * (effectiveCols - 1));
  const panelAreaH = totalH - (DESIGN.outerBorder * 2) - (DESIGN.gutterWidth * (effectiveRows - 1));
  const panelW = Math.floor(panelAreaW / effectiveCols);
  const panelH = Math.floor(panelAreaH / effectiveRows);

  // Draw each panel
  for (let i = 0; i < panelCount; i++) {
    const panel = config.panels[i];
    const col = i % effectiveCols;
    const row = Math.floor(i / effectiveCols);

    // Calculate panel position
    const panelX = DESIGN.outerBorder + col * (panelW + DESIGN.gutterWidth);
    const panelY = titleOffset + DESIGN.outerBorder + row * (panelH + DESIGN.gutterWidth);

    // Resolve image path
    const imagePath = resolve(PROJECT_ROOT, panel.imagePath);
    if (!existsSync(imagePath)) {
      console.error(`❌ Panel ${i + 1} image not found: ${imagePath}`);
      process.exit(1);
    }

    // Load and draw panel scene image (scaled to fill panel area)
    const img = await loadImage(imagePath);
    
    // Scale to cover the panel area (crop if needed to maintain aspect ratio)
    const imgAspect = img.width / img.height;
    const panelAspect = panelW / panelH;
    let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;

    if (imgAspect > panelAspect) {
      // Image is wider — crop sides
      srcW = Math.round(img.height * panelAspect);
      srcX = Math.round((img.width - srcW) / 2);
    } else {
      // Image is taller — crop top/bottom
      srcH = Math.round(img.width / panelAspect);
      srcY = Math.round((img.height - srcH) / 2);
    }

    // Draw the scene image filling the panel
    ctx.drawImage(img, srcX, srcY, srcW, srcH, panelX, panelY, panelW, panelH);

    // Draw panel border
    ctx.strokeStyle = DESIGN.borderColor;
    ctx.lineWidth = DESIGN.panelBorder;
    ctx.strokeRect(panelX, panelY, panelW, panelH);

    // Draw text overlay (speech bubble or narration box)
    if (panel.text) {
      if (panel.text.startsWith('NAR:')) {
        // Narration box
        const narText = panel.text.substring(4).trim();
        drawNarrationBox(ctx, panelX, panelY, panelW, panelH, narText);
      } else {
        // Speech bubble
        drawSpeechBubble(ctx, panelX, panelY, panelW, panelH, panel.text, panel.bubblePosition);
      }
    }

    // Draw panel number
    if (!config.noNumbers) {
      drawPanelNumber(ctx, panelX, panelY, i + 1);
    }
  }

  // Draw outer border
  ctx.strokeStyle = DESIGN.borderColor;
  ctx.lineWidth = DESIGN.outerBorder;
  ctx.strokeRect(
    DESIGN.outerBorder / 2,
    titleOffset + DESIGN.outerBorder / 2,
    totalW - DESIGN.outerBorder,
    totalH - DESIGN.outerBorder
  );

  // Draw watermark
  if (!config.noWatermark) {
    drawWatermark(ctx, totalW, canvasH);
  }

  // Save output
  const outputPath = resolve(PROJECT_ROOT, config.output);
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  writeFileSync(outputPath, buffer);

  const sizeKB = (buffer.length / 1024).toFixed(0);
  console.log(`\n✅ Comic strip assembled!`);
  console.log(`   📄 ${outputPath}`);
  console.log(`   📐 ${totalW}×${canvasH}px | ${sizeKB} KB`);
  console.log(`   🖼️  ${panelCount} panels (${effectiveCols}×${effectiveRows} ${config.layout} layout)`);

  return outputPath;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLI ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  const config = parseArgs(process.argv);

  console.log(`\n📰 Atlas Comic Strip Assembler`);
  console.log(`   Layout: ${config.layout} (${LAYOUT_PRESETS[config.layout].cols}×${LAYOUT_PRESETS[config.layout].rows})`);
  console.log(`   Panels: ${config.panels.length}`);
  if (config.title) {
    console.log(`   Title: "${config.title}"`);
  }

  await composeComicStrip(config);
}

// Only run main() when executed directly (not when imported)
const isDirectRun = process.argv[1]?.includes('compose-comic-strip');
if (isDirectRun) {
  main().catch(err => {
    console.error('\n❌ Fatal error:', err.message || err);
    process.exit(1);
  });
}
