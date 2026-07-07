/**
 * generate-comic-panel.ts — Full Scene Comic Panel Generator
 *
 * Generates COMPLETE SCENE panel images using Fal.ai's flux-lora endpoint
 * with the trained Atlas LoRA model. Unlike the old approach of generating
 * isolated characters and compositing them onto coded backgrounds, this
 * produces fully rendered scenes where Atlas is IN the environment with
 * props, other characters, and rich backgrounds — matching the quality
 * of the reference comics (atlas-comic-strip-1.png through 31.png).
 *
 * The output is a single AI-generated image ready to be assembled into
 * a comic strip with speech bubbles overlaid on top.
 *
 * Usage:
 *   npx tsx scripts/generate-comic-panel.ts \
 *     --prompt "atlas_character in a cozy card shop, holding up a basketball card" \
 *     --size 1024x1024 \
 *     --output generated/comic-001-panel-1.png
 *
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - .lora-model-url.txt in project root (trained LoRA weights URL)
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const FAL_KEY = process.env.FAL_KEY || '';
if (!FAL_KEY) {
  console.error('❌ FAL_KEY not set. Add it to .env or set as environment variable.');
  process.exit(1);
}

const LORA_MODEL_PATH = path.resolve(PROJECT_ROOT, '.lora-model-url.txt');

// Style suffix appended to every prompt to ensure consistent comic panel quality
const STYLE_SUFFIX = ', 3D Pixar CGI animation style, vibrant colors, detailed environment, professional illustration, comic book panel composition';

// Negative prompt to avoid common failure modes
const NEGATIVE_PROMPT = 'realistic, photorealistic, anime, cel-shading, low-poly, dark, scary, horror, violence, blood, nsfw, deformed, ugly, blurry, low quality, text, watermark, speech bubble, comic text, lettering';

// Fal.ai API endpoints
const FAL_QUEUE_URL = 'https://queue.fal.run/fal-ai/flux-lora';
const FAL_STATUS_URL = (id: string) => `https://queue.fal.run/fal-ai/flux-lora/requests/${id}/status`;
const FAL_RESULT_URL = (id: string) => `https://queue.fal.run/fal-ai/flux-lora/requests/${id}`;

// Size presets mapping friendly names to Fal.ai image_size values
const SIZE_PRESETS: Record<string, string> = {
  '1024x1024': 'square_hd',
  '1024x768': 'landscape_4_3',
  '768x1024': 'portrait_4_3',
  '1024x576': 'landscape_16_9',
  '576x1024': 'portrait_16_9',
  'square': 'square_hd',
  'landscape': 'landscape_4_3',
  'portrait': 'portrait_4_3',
  'wide': 'landscape_16_9',
  'tall': 'portrait_16_9',
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

interface GenerateArgs {
  prompt: string;
  size: string;
  output: string;
  scale?: number;
  steps?: number;
  guidance?: number;
  noStyle?: boolean;
  seed?: number;
}

function parseArgs(argv: string[]): GenerateArgs {
  const args = argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  const prompt = get('--prompt');
  if (!prompt) {
    printUsage();
    process.exit(1);
  }

  return {
    prompt,
    size: get('--size') || '1024x1024',
    output: get('--output') || `generated/panel-${Date.now()}.png`,
    scale: get('--lora-scale') ? parseFloat(get('--lora-scale')!) : undefined,
    steps: get('--steps') ? parseInt(get('--steps')!, 10) : undefined,
    guidance: get('--guidance') ? parseFloat(get('--guidance')!) : undefined,
    noStyle: has('--no-style'),
    seed: get('--seed') ? parseInt(get('--seed')!, 10) : undefined,
  };
}

function printUsage(): void {
  console.error(`
╔══════════════════════════════════════════════════════════════════╗
║  🎬 Atlas Comic Panel Generator — Full Scene AI Generation     ║
╚══════════════════════════════════════════════════════════════════╝

Generates complete scene panels using Fal.ai flux-lora with Atlas LoRA.
The output is a fully rendered scene (character + environment + props).

Usage:
  npx tsx scripts/generate-comic-panel.ts \\
    --prompt "atlas_character in a cozy card shop, examining sports cards" \\
    --size 1024x1024 \\
    --output generated/comic-001-panel-1.png

Required:
  --prompt <string>      Scene description (MUST include "atlas_character")

Optional:
  --size <WxH|preset>    Image size (default: 1024x1024)
                         Presets: square, landscape, portrait, wide, tall
  --output <path>        Output file (default: generated/panel-<timestamp>.png)
  --lora-scale <0-2>     LoRA influence strength (default: 1.0)
  --steps <int>          Inference steps (default: 28)
  --guidance <float>     Guidance scale (default: 7.5)
  --no-style             Don't append the default style suffix
  --seed <int>           Fixed seed for reproducibility

Tips:
  • Always include "atlas_character" trigger word in prompts
  • Describe the FULL SCENE: character + action + environment + mood
  • Include lighting, camera angle, and atmosphere details
  • Don't mention speech bubbles or text — those are added later

Examples:
  --prompt "atlas_character in a cozy card shop, holding up a basketball card to examine it, warm lighting, shelves full of sports cards in background, excited expression"
  --prompt "atlas_character at a sports convention, crowded background with fans, holding a graded card case proudly, bright convention hall lighting"
  --prompt "atlas_character sitting at a desk studying cards with magnifying glass, cozy home office, warm lamp light, bookshelves behind"
`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CORE GENERATION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Load the trained LoRA model URL from .lora-model-url.txt
 */
function getLoraUrl(): string {
  if (!fs.existsSync(LORA_MODEL_PATH)) {
    console.error('❌ No trained LoRA model found at .lora-model-url.txt');
    console.error('   Run: npx tsx scripts/train-atlas-lora.ts first');
    process.exit(1);
  }
  return fs.readFileSync(LORA_MODEL_PATH, 'utf-8').trim();
}

/**
 * Resolve the image_size parameter for Fal.ai from a size string
 */
function resolveImageSize(sizeStr: string): string {
  // Check presets first
  if (SIZE_PRESETS[sizeStr]) {
    return SIZE_PRESETS[sizeStr];
  }
  // If it looks like WxH, map to nearest preset
  if (sizeStr.includes('x')) {
    const [w, h] = sizeStr.split('x').map(Number);
    if (w === h) return 'square_hd';
    if (w > h) return w / h > 1.5 ? 'landscape_16_9' : 'landscape_4_3';
    return h / w > 1.5 ? 'portrait_16_9' : 'portrait_4_3';
  }
  // Default
  return 'square_hd';
}

/**
 * Submit a generation request to Fal.ai queue
 */
async function submitGeneration(prompt: string, imageSize: string, loraUrl: string, options: {
  scale?: number;
  steps?: number;
  guidance?: number;
  seed?: number;
}): Promise<string> {
  const body: Record<string, any> = {
    prompt,
    image_size: imageSize,
    num_images: 1,
    loras: [{
      path: loraUrl,
      scale: options.scale ?? 1.0,
    }],
    output_format: 'png',
    num_inference_steps: options.steps ?? 28,
    guidance_scale: options.guidance ?? 7.5,
  };

  if (options.seed !== undefined) {
    body.seed = options.seed;
  }

  const response = await fetch(FAL_QUEUE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Queue submission failed (${response.status}): ${error}`);
  }

  const result = await response.json() as any;

  // Some requests return images directly (synchronous)
  if (result.images && result.images.length > 0) {
    return result.images[0].url;
  }

  // Async queue — poll for result
  if (result.request_id) {
    console.log(`   📋 Queued: ${result.request_id}`);
    return await pollForResult(result.request_id);
  }

  throw new Error(`Unexpected API response: ${JSON.stringify(result).substring(0, 200)}`);
}

/**
 * Poll the Fal.ai queue until the image is ready
 */
async function pollForResult(requestId: string): Promise<string> {
  const maxAttempts = 90; // 90 * 2s = 3 minutes max
  const pollInterval = 2000;

  process.stdout.write('   ⏳ Generating');

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, pollInterval));

    const statusResponse = await fetch(FAL_STATUS_URL(requestId), {
      headers: { 'Authorization': `Key ${FAL_KEY}` },
    });
    const status = await statusResponse.json() as { status: string; logs?: any[] };

    if (status.status === 'COMPLETED') {
      process.stdout.write(' ✓\n');
      // Fetch the full result
      const resultResponse = await fetch(FAL_RESULT_URL(requestId), {
        headers: { 'Authorization': `Key ${FAL_KEY}` },
      });
      const result = await resultResponse.json() as any;

      if (result.images && result.images.length > 0) {
        return result.images[0].url;
      }
      throw new Error('Completed but no images in result');
    }

    if (status.status === 'FAILED') {
      process.stdout.write(' ✗\n');
      throw new Error(`Generation failed: ${JSON.stringify(status)}`);
    }

    // Still in progress
    process.stdout.write('.');
  }

  process.stdout.write(' TIMEOUT\n');
  throw new Error('Timeout waiting for generation (3 minutes)');
}

/**
 * Download an image URL and save to disk
 */
async function downloadImage(imageUrl: string, outputPath: string): Promise<void> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`   💾 Saved: ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTED FUNCTION (for use by generate-full-comic.ts)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate a full scene comic panel image.
 * Can be imported by other scripts for pipeline automation.
 */
export async function generateComicPanel(options: {
  prompt: string;
  size?: string;
  output: string;
  loraScale?: number;
  steps?: number;
  guidance?: number;
  noStyle?: boolean;
  seed?: number;
}): Promise<string> {
  const loraUrl = getLoraUrl();
  const imageSize = resolveImageSize(options.size || '1024x1024');

  // Build the full prompt with style suffix
  const fullPrompt = options.noStyle
    ? options.prompt
    : options.prompt + STYLE_SUFFIX;

  console.log(`\n🎬 Generating panel scene...`);
  console.log(`   📝 Prompt: "${options.prompt.substring(0, 80)}${options.prompt.length > 80 ? '...' : ''}"`);
  console.log(`   📐 Size: ${imageSize}`);
  console.log(`   🎨 LoRA: ${loraUrl.substring(0, 50)}...`);

  // Submit and wait for result
  const imageUrl = await submitGeneration(fullPrompt, imageSize, loraUrl, {
    scale: options.loraScale,
    steps: options.steps,
    guidance: options.guidance,
    seed: options.seed,
  });

  // Resolve output path relative to project root
  const outputPath = path.isAbsolute(options.output)
    ? options.output
    : path.resolve(PROJECT_ROOT, options.output);

  // Download and save
  await downloadImage(imageUrl, outputPath);

  return outputPath;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLI ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  // Validate trigger word
  if (!args.prompt.includes('atlas_character')) {
    console.warn('⚠️  Warning: Prompt does not contain "atlas_character" trigger word.');
    console.warn('   The LoRA may not activate correctly. Consider adding it.');
    console.warn('');
  }

  const outputPath = await generateComicPanel({
    prompt: args.prompt,
    size: args.size,
    output: args.output,
    loraScale: args.scale,
    steps: args.steps,
    guidance: args.guidance,
    noStyle: args.noStyle,
    seed: args.seed,
  });

  console.log(`\n✅ Panel generated successfully!`);
  console.log(`   ${outputPath}`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
