/**
 * LoRA Training Script (Any Character)
 * 
 * Zips character pose images + captions, uploads to S3,
 * then starts Flux LoRA training on Fal.ai.
 * 
 * Usage:
 *   npx tsx scripts/train-atlas-lora.ts --character director --trigger director_character --images reference-images/villains/the-director
 *   npx tsx scripts/train-atlas-lora.ts --character pixel --trigger pixel_character --images reference-images/keepers/pixel
 *   npx tsx scripts/train-atlas-lora.ts   (defaults to Atlas)
 * 
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - AWS credentials in .env (for S3 upload)
 *   - Character images as .png with matching .txt caption files
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAL_KEY = process.env.FAL_KEY || '';
const S3_BUCKET = 'collectiverse-assets';
const S3_REGION = 'us-east-1';

const s3 = new S3Client({ region: S3_REGION });

// Parse CLI arguments
function parseArgs(): { character: string; trigger: string; imagesDir: string } {
  const args = process.argv.slice(2);
  let character = 'atlas';
  let trigger = 'atlas_character';
  let imagesDir = path.resolve(__dirname, '../poses/originals');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--character' && args[i + 1]) {
      character = args[i + 1];
      i++;
    } else if (args[i] === '--trigger' && args[i + 1]) {
      trigger = args[i + 1];
      i++;
    } else if (args[i] === '--images' && args[i + 1]) {
      imagesDir = path.resolve(__dirname, '..', args[i + 1]);
      i++;
    }
  }

  return { character, trigger, imagesDir };
}

async function main() {
  const { character, trigger, imagesDir } = parseArgs();

  console.log(`🎨 LoRA Training Pipeline — ${character.toUpperCase()}`);
  console.log('================================\n');

  if (!FAL_KEY) {
    console.error('❌ FAL_KEY not set in .env');
    process.exit(1);
  }

  // 1. Find all pose images
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const poseFiles = fs.readdirSync(imagesDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`📁 Found ${poseFiles.length} images in ${imagesDir}\n`);

  if (poseFiles.length === 0) {
    console.error('❌ No PNG files found');
    process.exit(1);
  }

  // Check for caption files
  const captionFiles = fs.readdirSync(imagesDir)
    .filter(f => f.endsWith('.txt'))
    .sort();

  if (captionFiles.length === 0) {
    console.error('❌ No .txt caption files found alongside images.');
    console.error('   Each image needs a matching .txt file (e.g. thedirector-01.png → thedirector-01.txt)');
    process.exit(1);
  }

  console.log(`📝 Found ${captionFiles.length} caption files\n`);

  // 2. Create ZIP archive of images + captions
  const tmpDir = path.resolve(__dirname, '../tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const zipName = `${character}-training-images.zip`;
  const zipPath = path.resolve(tmpDir, zipName);

  const trainingDataDir = path.resolve(tmpDir, `${character}-training-data`);
  if (fs.existsSync(trainingDataDir)) fs.rmSync(trainingDataDir, { recursive: true });
  fs.mkdirSync(trainingDataDir, { recursive: true });

  // Copy images + captions to staging directory
  for (const file of poseFiles) {
    fs.copyFileSync(path.join(imagesDir, file), path.join(trainingDataDir, file));
  }
  for (const file of captionFiles) {
    fs.copyFileSync(path.join(imagesDir, file), path.join(trainingDataDir, file));
  }

  console.log(`📦 Staging ${poseFiles.length} images + ${captionFiles.length} captions`);

  // Create ZIP
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  try {
    const psCommand = `Compress-Archive -Path "${trainingDataDir}\\*" -DestinationPath "${zipPath}" -Force`;
    execSync(`powershell -Command "${psCommand}"`, { stdio: 'pipe' });
    console.log(`📦 Created ZIP: ${zipPath} (${(fs.statSync(zipPath).size / 1024 / 1024).toFixed(1)} MB)\n`);
  } catch (err) {
    console.error('❌ Failed to create ZIP:', err);
    process.exit(1);
  }

  // 3. Upload ZIP to S3
  console.log('⬆️  Uploading ZIP to S3...');

  const zipBuffer = fs.readFileSync(zipPath);
  const s3Key = `atlas-training/${zipName}`;

  await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: s3Key,
    Body: zipBuffer,
    ContentType: 'application/zip',
  }));

  const zipUrl = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`;
  console.log(`✅ Uploaded to: ${zipUrl}\n`);

  // 4. Start LoRA training
  console.log('🏋️ Starting LoRA training on Fal.ai...');
  console.log(`   Character: ${character}`);
  console.log(`   Trigger word: "${trigger}"`);
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
      trigger_word: trigger,
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

  const trainingResult = await trainingResponse.json() as { request_id: string };
  console.log(`✅ Training job submitted!`);
  console.log(`   Request ID: ${trainingResult.request_id}`);
  console.log(`\n⏳ Training takes ~15-30 minutes.`);
  console.log(`   Run: npx tsx scripts/check-training-status.ts ${trainingResult.request_id}`);
  console.log(`\n   Once complete, generate images with:`);
  console.log(`   npx tsx scripts/generate-atlas-image.ts "${trigger} standing heroically, dark background"`);

  // Save training info
  const trainingInfo = {
    character,
    requestId: trainingResult.request_id,
    triggerWord: trigger,
    imageCount: poseFiles.length,
    imagesDir,
    startedAt: new Date().toISOString(),
    zipUrl,
  };

  const infoFile = path.resolve(__dirname, `../.lora-training-${character}.json`);
  fs.writeFileSync(infoFile, JSON.stringify(trainingInfo, null, 2));
  console.log(`\n📄 Training info saved to .lora-training-${character}.json`);

  // Cleanup
  fs.rmSync(trainingDataDir, { recursive: true });
  console.log('🧹 Cleaned up temp files');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
