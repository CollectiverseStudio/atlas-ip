/**
 * Atlas Pose Resize Pipeline
 * 
 * Converts original PNG poses into optimized WebP variants at 3 sizes:
 *   - sm: 80px  (chat avatar, inline message)
 *   - md: 200px (side panel, medium display)
 *   - lg: 300px (large panel, hero display)
 * 
 * Source: atlas-ip/poses/originals/*.png
 * Output: atlas-ip/poses/{sm,md,lg}/*.webp
 * 
 * Usage:
 *   npx tsx scripts/resize-poses.ts           # Process all originals
 *   npx tsx scripts/resize-poses.ts --new     # Process only new (no existing webp)
 *   npx tsx scripts/resize-poses.ts --force   # Re-process all (overwrite existing)
 * 
 * After running, copy output to the app repo:
 *   cp -r poses/sm poses/md poses/lg ../collectiverse/apps/web/public/images/atlas/poses/
 * 
 * Requirements:
 *   npm install sharp
 */

import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const SIZES = {
  sm: 80,   // Avatar size
  md: 200,  // Side panel
  lg: 300,  // Large display
} as const;

const WEBP_QUALITY = 85; // Good balance of quality vs file size
const ORIGINALS_DIR = path.resolve(__dirname, '../poses/originals');
const POSES_DIR = path.resolve(__dirname, '../poses');

interface ResizeResult {
  filename: string;
  originalSize: number;
  variants: {
    size: string;
    width: number;
    outputSize: number;
    path: string;
  }[];
}

interface PipelineStats {
  processed: number;
  skipped: number;
  errors: number;
  totalInputBytes: number;
  totalOutputBytes: number;
  results: ResizeResult[];
  errorFiles: { filename: string; error: string }[];
}

async function resizePose(
  inputPath: string,
  filename: string,
  forceOverwrite: boolean
): Promise<ResizeResult | null> {
  const baseName = filename.replace('.png', '');
  const outputFilename = `${baseName}.webp`;
  const inputStats = fs.statSync(inputPath);

  const variants: ResizeResult['variants'] = [];
  let allExist = true;

  // Check if all variants already exist
  for (const [size, width] of Object.entries(SIZES)) {
    const outputPath = path.join(POSES_DIR, size, outputFilename);
    if (!fs.existsSync(outputPath)) {
      allExist = false;
      break;
    }
  }

  // Skip if all variants exist and not forcing
  if (allExist && !forceOverwrite) {
    return null;
  }

  // Process each size
  for (const [size, width] of Object.entries(SIZES)) {
    const outputDir = path.join(POSES_DIR, size);
    const outputPath = path.join(outputDir, outputFilename);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Resize and convert to WebP
    await sharp(inputPath)
      .resize(width, width, {
        fit: 'contain',           // Preserve aspect ratio, fit within bounds
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
      })
      .webp({
        quality: WEBP_QUALITY,
        alphaQuality: 100,        // Preserve transparency fully
        effort: 4,                // Compression effort (0-6, higher = smaller but slower)
      })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    variants.push({
      size,
      width,
      outputSize: outputStats.size,
      path: outputPath,
    });
  }

  return {
    filename,
    originalSize: inputStats.size,
    variants,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const forceOverwrite = args.includes('--force');
  const onlyNew = args.includes('--new');

  console.log('🎨 Atlas Pose Resize Pipeline');
  console.log('═'.repeat(60));
  console.log(`  Source: ${ORIGINALS_DIR}`);
  console.log(`  Output: ${POSES_DIR}/{sm,md,lg}/`);
  console.log(`  Sizes: sm=${SIZES.sm}px, md=${SIZES.md}px, lg=${SIZES.lg}px`);
  console.log(`  Quality: WebP ${WEBP_QUALITY}%`);
  console.log(`  Mode: ${forceOverwrite ? 'FORCE (overwrite all)' : onlyNew ? 'NEW ONLY' : 'STANDARD (skip existing)'}`);
  console.log('═'.repeat(60));

  // Validate source directory
  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.error(`❌ Source directory not found: ${ORIGINALS_DIR}`);
    process.exit(1);
  }

  // Get all PNG files
  const pngFiles = fs.readdirSync(ORIGINALS_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`\n  Found ${pngFiles.length} PNG originals\n`);

  const stats: PipelineStats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    totalInputBytes: 0,
    totalOutputBytes: 0,
    results: [],
    errorFiles: [],
  };

  for (const filename of pngFiles) {
    const inputPath = path.join(ORIGINALS_DIR, filename);

    try {
      const result = await resizePose(inputPath, filename, forceOverwrite);

      if (result === null) {
        stats.skipped++;
        if (!onlyNew) {
          process.stdout.write('.');
        }
      } else {
        stats.processed++;
        stats.totalInputBytes += result.originalSize;
        stats.totalOutputBytes += result.variants.reduce((sum, v) => sum + v.outputSize, 0);
        stats.results.push(result);
        process.stdout.write('✓');
      }
    } catch (error: any) {
      stats.errors++;
      stats.errorFiles.push({ filename, error: error.message });
      process.stdout.write('✗');
    }
  }

  // Summary
  console.log('\n\n' + '═'.repeat(60));
  console.log('  RESULTS');
  console.log('═'.repeat(60));
  console.log(`  Processed: ${stats.processed}`);
  console.log(`  Skipped (already exist): ${stats.skipped}`);
  console.log(`  Errors: ${stats.errors}`);

  if (stats.processed > 0) {
    const compression = ((1 - stats.totalOutputBytes / stats.totalInputBytes) * 100).toFixed(1);
    console.log(`\n  Input:  ${(stats.totalInputBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Output: ${(stats.totalOutputBytes / 1024 / 1024).toFixed(2)} MB (3 sizes combined)`);
    console.log(`  Compression: ${compression}% reduction`);
  }

  if (stats.errorFiles.length > 0) {
    console.log('\n  ❌ Errors:');
    for (const { filename, error } of stats.errorFiles) {
      console.log(`    ${filename}: ${error}`);
    }
  }

  // Deployment instructions
  console.log('\n' + '─'.repeat(60));
  console.log('  DEPLOY TO APP:');
  console.log('─'.repeat(60));
  console.log(`  Copy WebP variants to the Collectiverse app repo:`);
  console.log(`    cp -r ${POSES_DIR}/sm ${POSES_DIR}/md ${POSES_DIR}/lg \\`);
  console.log(`      ../collectiverse/apps/web/public/images/atlas/poses/`);
  console.log(`\n  Also copy any new original PNGs:`);
  console.log(`    cp ${ORIGINALS_DIR}/*.png \\`);
  console.log(`      ../collectiverse/apps/web/public/images/atlas/poses/`);
  console.log('─'.repeat(60));
}

main().catch((error) => {
  console.error('Pipeline failed:', error);
  process.exit(1);
});
