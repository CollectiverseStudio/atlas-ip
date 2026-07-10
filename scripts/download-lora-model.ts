/**
 * Download LoRA Model (.safetensors) from Fal.ai
 * 
 * After training completes, this downloads the weights file
 * and stores it permanently in atlas-ip/models/
 * 
 * Usage:
 *   npx tsx scripts/download-lora-model.ts --character director --request-id 019f4860-0710-7bc3-bdfb-ff8b5d5898bc
 *   npx tsx scripts/download-lora-model.ts --character atlas --request-id <atlas-request-id>
 *   npx tsx scripts/download-lora-model.ts --character director   (reads from .lora-training-director.json)
 * 
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - Training must be COMPLETED
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAL_KEY = process.env.FAL_KEY || '';
const MODELS_DIR = path.resolve(__dirname, '../models');

function parseArgs(): { character: string; requestId: string } {
  const args = process.argv.slice(2);
  let character = '';
  let requestId = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--character' && args[i + 1]) {
      character = args[i + 1];
      i++;
    } else if (args[i] === '--request-id' && args[i + 1]) {
      requestId = args[i + 1];
      i++;
    }
  }

  // If no request ID provided, try reading from training info file
  if (!requestId && character) {
    const infoFile = path.resolve(__dirname, `../.lora-training-${character}.json`);
    if (fs.existsSync(infoFile)) {
      const info = JSON.parse(fs.readFileSync(infoFile, 'utf-8'));
      requestId = info.requestId;
      console.log(`📄 Read request ID from .lora-training-${character}.json\n`);
    }
  }

  if (!character || !requestId) {
    console.error('Usage: npx tsx scripts/download-lora-model.ts --character <name> [--request-id <id>]');
    console.error('       Character name is required. Request ID is read from .lora-training-<character>.json if not provided.');
    process.exit(1);
  }

  return { character, requestId };
}

async function main() {
  const { character, requestId } = parseArgs();

  console.log(`🔍 Fetching LoRA training result for: ${character}`);
  console.log(`   Request ID: ${requestId}\n`);

  if (!FAL_KEY) {
    console.error('❌ FAL_KEY not set in .env');
    process.exit(1);
  }

  // 1. Check status first
  const statusResponse = await fetch(
    `https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/${requestId}/status`,
    { headers: { 'Authorization': `Key ${FAL_KEY}` } }
  );

  if (!statusResponse.ok) {
    console.error(`❌ Status check failed: ${statusResponse.status}`);
    console.error(await statusResponse.text());
    process.exit(1);
  }

  const status = await statusResponse.json() as { status: string };
  
  if (status.status !== 'COMPLETED') {
    console.error(`❌ Training not complete yet. Status: ${status.status}`);
    console.error(`   Run: npx tsx scripts/check-training-status.ts ${requestId}`);
    process.exit(1);
  }

  // 2. Fetch the result to get model URL
  const resultResponse = await fetch(
    `https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/${requestId}`,
    { headers: { 'Authorization': `Key ${FAL_KEY}` } }
  );

  if (!resultResponse.ok) {
    console.error(`❌ Result fetch failed: ${resultResponse.status}`);
    console.error(await resultResponse.text());
    process.exit(1);
  }

  const result = await resultResponse.json() as {
    diffusers_lora_file?: { url: string; file_name?: string; file_size?: number };
    config_file?: { url: string };
  };

  if (!result.diffusers_lora_file?.url) {
    console.error('❌ No LoRA model file found in training result.');
    console.error('   Result:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const modelUrl = result.diffusers_lora_file.url;
  console.log(`✅ Training complete!`);
  console.log(`   Model URL: ${modelUrl}`);
  if (result.diffusers_lora_file.file_size) {
    console.log(`   File size: ${(result.diffusers_lora_file.file_size / 1024 / 1024).toFixed(1)} MB`);
  }

  // 3. Create models directory if needed
  if (!fs.existsSync(MODELS_DIR)) {
    fs.mkdirSync(MODELS_DIR, { recursive: true });
    console.log(`\n📁 Created models/ directory`);
  }

  // 4. Download the .safetensors file
  const outputFile = path.resolve(MODELS_DIR, `${character}-lora.safetensors`);
  console.log(`\n⬇️  Downloading to: models/${character}-lora.safetensors ...`);

  const downloadResponse = await fetch(modelUrl);
  if (!downloadResponse.ok) {
    console.error(`❌ Download failed: ${downloadResponse.status}`);
    process.exit(1);
  }

  const arrayBuffer = await downloadResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(outputFile, buffer);

  const fileSizeMB = (buffer.length / 1024 / 1024).toFixed(1);
  console.log(`✅ Downloaded: models/${character}-lora.safetensors (${fileSizeMB} MB)`);

  // 5. Also download config file if available
  if (result.config_file?.url) {
    const configFile = path.resolve(MODELS_DIR, `${character}-lora-config.json`);
    console.log(`\n⬇️  Downloading config...`);
    
    const configResponse = await fetch(result.config_file.url);
    if (configResponse.ok) {
      const configText = await configResponse.text();
      fs.writeFileSync(configFile, configText);
      console.log(`✅ Downloaded: models/${character}-lora-config.json`);
    }
  }

  // 6. Save metadata
  const metadata = {
    character,
    requestId,
    modelUrl,
    downloadedAt: new Date().toISOString(),
    fileSizeMB: parseFloat(fileSizeMB),
    localPath: `models/${character}-lora.safetensors`,
  };

  const metadataFile = path.resolve(MODELS_DIR, `${character}-lora-metadata.json`);
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
  console.log(`📄 Metadata saved: models/${character}-lora-metadata.json`);

  console.log(`\n🎉 Done! ${character} LoRA model stored permanently.`);
  console.log(`   Generate images with:`);
  console.log(`   npx tsx scripts/generate-atlas-image.ts "${character}_character standing heroically, dark background"`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
