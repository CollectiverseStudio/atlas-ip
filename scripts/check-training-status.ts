/**
 * Check Atlas LoRA Training Status
 * 
 * Usage: npx tsx scripts/check-training-status.ts [request_id]
 *        npx tsx scripts/check-training-status.ts  (auto-reads from .lora-training-info.json)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAL_KEY = process.env.FAL_KEY || 'a67e5fb9-eb60-4cbf-b63f-06e47213cd95:02df65ff835c49a3186c819cb170671e';
const TRAINING_INFO_PATH = path.resolve(__dirname, '../.lora-training-info.json');
const LORA_MODEL_PATH = path.resolve(__dirname, '../.lora-model-url.txt');

async function checkStatus(requestId: string) {
  console.log(`🔍 Checking training status for: ${requestId}\n`);

  const response = await fetch(`https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/${requestId}/status`, {
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
    },
  });

  if (!response.ok) {
    console.error(`❌ Status check failed: ${response.status}`);
    console.error(await response.text());
    process.exit(1);
  }

  const status = await response.json() as { status: string; logs?: string[]; response_url?: string };
  console.log(`Status: ${status.status}`);

  if (status.logs && status.logs.length > 0) {
    console.log(`\nLogs:`);
    status.logs.slice(-5).forEach(log => console.log(`  ${log}`));
  }

  if (status.status === 'COMPLETED') {
    // Fetch the result to get the model URL
    const resultResponse = await fetch(`https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/${requestId}`, {
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
      },
    });

    if (resultResponse.ok) {
      const result = await resultResponse.json() as { diffusers_lora_file?: { url: string }; config_file?: { url: string } };
      
      if (result.diffusers_lora_file?.url) {
        const loraUrl = result.diffusers_lora_file.url;
        console.log(`\n🎉 Training COMPLETE!`);
        console.log(`   LoRA model URL: ${loraUrl}`);
        
        // Save model URL for generation script
        fs.writeFileSync(LORA_MODEL_PATH, loraUrl);
        console.log(`   Saved to: .lora-model-url.txt`);
        console.log(`\n✅ Ready to generate! Run:`);
        console.log(`   npx tsx scripts/generate-atlas-image.ts "atlas_character waving hello"`);
      }
    }
  } else if (status.status === 'IN_PROGRESS' || status.status === 'IN_QUEUE') {
    console.log(`\n⏳ Still training... Check again in a few minutes.`);
    console.log(`   Run: npx tsx scripts/check-training-status.ts ${requestId}`);
  } else if (status.status === 'FAILED') {
    console.error(`\n❌ Training FAILED.`);
    if (status.logs) {
      console.error(`Last logs:`);
      status.logs.slice(-10).forEach(log => console.error(`  ${log}`));
    }
  }
}

async function main() {
  let requestId = process.argv[2];

  if (!requestId) {
    // Try to read from training info file
    if (fs.existsSync(TRAINING_INFO_PATH)) {
      const info = JSON.parse(fs.readFileSync(TRAINING_INFO_PATH, 'utf-8'));
      requestId = info.requestId;
      console.log(`📄 Read request ID from .lora-training-info.json\n`);
    } else {
      console.error('Usage: npx tsx scripts/check-training-status.ts [request_id]');
      console.error('       Or run train-atlas-lora.ts first to create .lora-training-info.json');
      process.exit(1);
    }
  }

  await checkStatus(requestId);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
