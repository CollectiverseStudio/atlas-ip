/**
 * Atlas LoRA Training Script
 * 
 * Zips 41 Atlas pose images, uploads the ZIP to Fal.ai CDN,
 * then starts Flux LoRA training.
 * 
 * Usage: npx tsx scripts/train-atlas-lora.ts
 * 
 * Prerequisites:
 *   - FAL_KEY environment variable set (or hardcoded below)
 *   - Atlas poses in ../poses/originals/*.png
 *   - npm install @fal-ai/client (or use REST API directly)
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAL_KEY = process.env.FAL_KEY || 'a67e5fb9-eb60-4cbf-b63f-06e47213cd95:02df65ff835c49a3186c819cb170671e';
const POSES_DIR = path.resolve(__dirname, '../poses/originals');
const TRIGGER_WORD = 'atlas_character';
const S3_BUCKET = 'collectiverse-assets';
const S3_REGION = 'us-east-1';

const s3 = new S3Client({ region: S3_REGION });

async function main() {
  console.log('🎨 Atlas LoRA Training Pipeline');
  console.log('================================\n');

  // 1. Find all pose images
  const poseFiles = fs.readdirSync(POSES_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`📁 Found ${poseFiles.length} Atlas pose images in poses/originals/\n`);

  if (poseFiles.length === 0) {
    console.error('❌ No PNG files found in poses/originals/');
    process.exit(1);
  }

  // 2. Create ZIP archive of all poses + caption files
  const zipPath = path.resolve(__dirname, '../tmp/atlas-training-images.zip');
  const tmpDir = path.resolve(__dirname, '../tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  // Create caption files for each image (same name, .txt extension)
  const captionDir = path.resolve(tmpDir, 'training-data');
  if (fs.existsSync(captionDir)) fs.rmSync(captionDir, { recursive: true });
  fs.mkdirSync(captionDir, { recursive: true });

  for (const file of poseFiles) {
    // Copy image
    fs.copyFileSync(path.join(POSES_DIR, file), path.join(captionDir, file));
    
    // Create caption file
    const captionName = file.replace('.png', '.txt');
    const poseName = file.replace('.png', '').replace(/-/g, ' ');
    const caption = `${TRIGGER_WORD}, a cute chibi robot with glossy white and metallic blue body, glowing blue crescent eyes, rounded toy-like proportions, Pixar-quality 3D animation style, ${poseName}`;
    fs.writeFileSync(path.join(captionDir, captionName), caption);
  }

  console.log(`📝 Created ${poseFiles.length} caption files`);

  // Create ZIP
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  
  try {
    // Use PowerShell to create ZIP (works on Windows)
    const psCommand = `Compress-Archive -Path "${captionDir}\\*" -DestinationPath "${zipPath}" -Force`;
    execSync(`powershell -Command "${psCommand}"`, { stdio: 'pipe' });
    console.log(`📦 Created ZIP: ${zipPath} (${(fs.statSync(zipPath).size / 1024 / 1024).toFixed(1)} MB)\n`);
  } catch (err) {
    console.error('❌ Failed to create ZIP. Trying tar...');
    try {
      execSync(`tar -cf "${zipPath}" -C "${captionDir}" .`, { stdio: 'pipe' });
      console.log(`📦 Created archive: ${zipPath}`);
    } catch (err2) {
      console.error('❌ Failed to create archive:', err2);
      process.exit(1);
    }
  }

  // 3. Upload ZIP to S3 (public bucket — Fal.ai can read it directly)
  console.log('⬆️  Uploading ZIP to S3...');

  const zipBuffer = fs.readFileSync(zipPath);
  const s3Key = 'atlas-training/atlas-training-images.zip';

  await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: s3Key,
    Body: zipBuffer,
    ContentType: 'application/zip',
  }
  ));

  const zipUrl = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`;
  console.log(`✅ Uploaded to: ${zipUrl}\n`);

  // 4. Start LoRA training
  console.log('🏋️ Starting LoRA training on Fal.ai...');
  console.log(`   Trigger word: "${TRIGGER_WORD}"`);
  console.log(`   Training images: ${poseFiles.length}`);
  console.log(`   Model: Flux.1 LoRA\n`);

  const trainingResponse = await fetch('https://queue.fal.run/fal-ai/flux-lora-fast-training', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images_data_url: zipUrl,
      trigger_word: TRIGGER_WORD,
      create_masks: true,
      is_style: false,
      steps: 1000,
    }),
  });

  if (!trainingResponse.ok) {
    const error = await trainingResponse.text();
    console.error(`❌ Training request failed: ${trainingResponse.status}`);
    console.error(error);
    process.exit(1);
  }

  const trainingResult = await trainingResponse.json() as { request_id: string; status_url?: string };
  console.log(`✅ Training job submitted!`);
  console.log(`   Request ID: ${trainingResult.request_id}`);
  console.log(`\n⏳ Training takes ~15-30 minutes.`);
  console.log(`   Run: npx tsx scripts/check-training-status.ts ${trainingResult.request_id}`);
  console.log(`\n   Once complete, use the LoRA with:`);
  console.log(`   npx tsx scripts/generate-atlas-image.ts "atlas_character holding a baseball card, comic book style"`);

  // Save training info
  const trainingInfo = {
    requestId: trainingResult.request_id,
    triggerWord: TRIGGER_WORD,
    imageCount: poseFiles.length,
    startedAt: new Date().toISOString(),
    zipUrl: zipUrl.startsWith('data:') ? '(data URI - too large to store)' : zipUrl,
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../.lora-training-info.json'),
    JSON.stringify(trainingInfo, null, 2)
  );
  console.log(`\n📄 Training info saved to .lora-training-info.json`);

  // Cleanup
  fs.rmSync(captionDir, { recursive: true });
  console.log('🧹 Cleaned up temp files');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
