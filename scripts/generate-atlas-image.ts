/**
 * Atlas Image Generation Script
 * 
 * Generates consistent Atlas character images using the trained LoRA model.
 * 
 * Usage: npx tsx scripts/generate-atlas-image.ts "atlas_character holding a rare coin, excited pose"
 * 
 * Prerequisites:
 *   - FAL_KEY environment variable set
 *   - LoRA training completed (check .lora-training-info.json for model URL)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAL_KEY = process.env.FAL_KEY || 'a67e5fb9-eb60-4cbf-b63f-06e47213cd95:02df65ff835c49a3186c819cb170671e';

// Load trained model info
const TRAINING_INFO_PATH = path.resolve(__dirname, '../.lora-training-info.json');
const LORA_MODEL_PATH = path.resolve(__dirname, '../.lora-model-url.txt');

const STYLE_SUFFIX = ', Pixar-quality cinematic 3D animation, premium stylized CGI, cute chibi robot aesthetic, glossy white and metallic blue materials, rounded toy-like proportions, expressive glowing green crescent eyes, high-end PBR rendering, soft global illumination, cinematic depth of field, ultra-clean white and blue color palette, family-friendly design';

const NEGATIVE_PROMPT = 'realistic, photorealistic, anime, cel-shading, low-poly, dark, scary, horror, violence, blood, nsfw, deformed, ugly, blurry, low quality, text, watermark';

async function generateImage(prompt: string, outputName?: string): Promise<string> {
  // Get LoRA model URL
  let loraUrl: string;
  if (fs.existsSync(LORA_MODEL_PATH)) {
    loraUrl = fs.readFileSync(LORA_MODEL_PATH, 'utf-8').trim();
  } else {
    console.error('❌ No trained LoRA model found.');
    console.error('   Run: npx tsx scripts/train-atlas-lora.ts first');
    console.error('   Then: npx tsx scripts/check-training-status.ts <request_id>');
    process.exit(1);
  }

  const fullPrompt = prompt + STYLE_SUFFIX;
  console.log(`🎨 Generating: "${prompt}"`);
  console.log(`   LoRA: ${loraUrl.substring(0, 60)}...`);

  const response = await fetch('https://queue.fal.run/fal-ai/flux-lora', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: fullPrompt,
      negative_prompt: NEGATIVE_PROMPT,
      loras: [{ path: loraUrl, scale: 0.9 }],
      image_size: { width: 1024, height: 1024 },
      num_images: 1,
      guidance_scale: 7.5,
      num_inference_steps: 28,
      seed: null, // random seed for variety
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Generation failed: ${response.status} — ${error}`);
  }

  const result = await response.json() as { images: { url: string }[]; request_id: string };
  
  if (!result.images || result.images.length === 0) {
    throw new Error('No images returned');
  }

  const imageUrl = result.images[0].url;
  
  // Download and save
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  
  const fileName = outputName || `atlas-${Date.now()}.png`;
  const outputDir = path.resolve(__dirname, '../generated');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, imageBuffer);
  
  console.log(`✅ Saved: ${outputPath} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
  return outputPath;
}

async function main() {
  const prompt = process.argv.slice(2).join(' ');
  
  if (!prompt) {
    console.log('Usage: npx tsx scripts/generate-atlas-image.ts "<prompt>"');
    console.log('');
    console.log('Examples:');
    console.log('  npx tsx scripts/generate-atlas-image.ts "atlas_character holding a baseball card, excited pose"');
    console.log('  npx tsx scripts/generate-atlas-image.ts "atlas_character examining a rare coin with magnifying glass"');
    console.log('  npx tsx scripts/generate-atlas-image.ts "atlas_character in a comic book store, browsing shelves"');
    console.log('  npx tsx scripts/generate-atlas-image.ts "atlas_character waving hello, front-facing"');
    console.log('');
    console.log('IMPORTANT: Always include "atlas_character" in your prompt (this is the trigger word).');
    process.exit(0);
  }

  if (!prompt.includes('atlas_character')) {
    console.warn('⚠️  Warning: Prompt does not contain "atlas_character" trigger word.');
    console.warn('   The LoRA may not activate. Add "atlas_character" to your prompt.');
  }

  await generateImage(prompt);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
