/**
 * check-lora-training.ts — Check LoRA training status and save model URL
 * 
 * Usage:
 *   npx tsx scripts/check-lora-training.ts --character director
 *   npx tsx scripts/check-lora-training.ts --request-id 019f4860-0710-7bc3-bdfb-ff8b5d5898bc
 */

import 'dotenv/config';
import { fal } from '@fal-ai/client';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');

fal.config({ credentials: process.env.FAL_KEY! });

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

async function main() {
  const character = getArg('--character');
  let requestId = getArg('--request-id');

  // If character specified, read from training info file
  if (character && !requestId) {
    const infoPath = resolve(PROJECT_ROOT, `.lora-training-${character}.json`);
    if (!existsSync(infoPath)) {
      console.error(`❌ No training info found at ${infoPath}`);
      process.exit(1);
    }
    const info = JSON.parse(readFileSync(infoPath, 'utf-8'));
    requestId = info.requestId;
    console.log(`📋 Character: ${character}`);
    console.log(`   Request ID: ${requestId}`);
    console.log(`   Trigger word: ${info.triggerWord}`);
    console.log(`   Images: ${info.imageCount}`);
    console.log(`   Started: ${info.startedAt}`);
    console.log('');
  }

  if (!requestId) {
    console.error('❌ Provide --character <name> or --request-id <id>');
    process.exit(1);
  }

  console.log('⏳ Checking training status...');

  try {
    const result = await fal.queue.result('fal-ai/flux-lora-fast-training', { requestId });
    
    console.log('✅ Training COMPLETE!');
    console.log('');
    
    // Extract model URL
    const data = result.data as any;
    const modelUrl = data?.diffusers_lora_file?.url || data?.config_file?.url || JSON.stringify(data).match(/https:\/\/[^"]+\.safetensors/)?.[0];
    
    if (modelUrl) {
      console.log(`🎨 Model URL: ${modelUrl}`);
      
      // Save to dedicated file
      if (character) {
        const modelPath = resolve(PROJECT_ROOT, `.lora-model-url-${character}.txt`);
        writeFileSync(modelPath, modelUrl, 'utf-8');
        console.log(`💾 Saved to: .lora-model-url-${character}.txt`);
        
        // Also update the training info JSON
        const infoPath = resolve(PROJECT_ROOT, `.lora-training-${character}.json`);
        const info = JSON.parse(readFileSync(infoPath, 'utf-8'));
        info.modelUrl = modelUrl;
        info.completedAt = new Date().toISOString();
        writeFileSync(infoPath, JSON.stringify(info, null, 2), 'utf-8');
        console.log(`💾 Updated: .lora-training-${character}.json`);
      }
    } else {
      console.log('⚠️  Could not extract model URL. Full result:');
      console.log(JSON.stringify(data, null, 2).substring(0, 2000));
    }
  } catch (err: any) {
    if (err.message?.includes('not found') || err.status === 404) {
      console.log('❌ Training request not found — may have expired (results expire after ~7 days)');
      console.log('   You may need to retrain. Use:');
      console.log(`   npx tsx scripts/train-atlas-lora.ts --character ${character || 'NAME'} --trigger TRIGGER_WORD --images PATH`);
    } else {
      console.error('❌ Error:', err.message || err);
    }
  }
}

main();
