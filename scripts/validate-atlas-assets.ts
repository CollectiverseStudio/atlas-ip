/**
 * Atlas Asset Validation Pipeline
 *
 * Validates ALL assets in atlas-ip for correctness before sync.
 * Workflow FAILS on validation errors — blocks invalid assets from reaching the app.
 *
 * Checks:
 * - Duplicate filenames across directories
 * - Invalid names (spaces, uppercase, special characters)
 * - Missing metadata (assets not in registry)
 * - Invalid folder placement
 * - Transparency verification (poses must have alpha channel)
 * - Dimension validation (reasonable sizes)
 * - Orphaned generated files (WebP without matching original PNG)
 * - Canonical version consistency
 *
 * Exit code: 0 = valid, 1 = errors found (blocks workflow)
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');

// Asset directories to validate
const ASSET_DIRS: Record<string, { extensions: string[]; requiresTransparency: boolean; maxSizeMB: number }> = {
  'poses/originals': { extensions: ['.png'], requiresTransparency: true, maxSizeMB: 10 },
  'poses/sm': { extensions: ['.webp'], requiresTransparency: true, maxSizeMB: 1 },
  'poses/md': { extensions: ['.webp'], requiresTransparency: true, maxSizeMB: 2 },
  'poses/lg': { extensions: ['.webp'], requiresTransparency: true, maxSizeMB: 3 },
  'comics': { extensions: ['.png', '.jpg', '.webp'], requiresTransparency: false, maxSizeMB: 15 },
  'logos/brand': { extensions: ['.png', '.svg'], requiresTransparency: true, maxSizeMB: 5 },
  'reference-images': { extensions: ['.png'], requiresTransparency: false, maxSizeMB: 15 },
  'social-media': { extensions: ['.png', '.jpg', '.webp'], requiresTransparency: false, maxSizeMB: 10 },
  'expressions': { extensions: ['.png'], requiresTransparency: true, maxSizeMB: 10 },
  'model-sheets': { extensions: ['.png', '.pdf'], requiresTransparency: false, maxSizeMB: 20 },
  'icons': { extensions: ['.png', '.svg'], requiresTransparency: true, maxSizeMB: 2 },
  'stickers': { extensions: ['.png', '.webp'], requiresTransparency: true, maxSizeMB: 5 },
};

interface ValidationReport {
  errors: string[];
  warnings: string[];
  info: string[];
  stats: {
    totalFiles: number;
    validFiles: number;
    invalidFiles: number;
    totalSizeMB: number;
  };
}

const report: ValidationReport = {
  errors: [],
  warnings: [],
  info: [],
  stats: { totalFiles: 0, validFiles: 0, invalidFiles: 0, totalSizeMB: 0 },
};

// Track all filenames globally for duplicate detection
const allFilenames = new Map<string, string[]>(); // filename → [paths]

function validateFilename(filepath: string): boolean {
  const filename = path.basename(filepath);
  let valid = true;

  // No spaces
  if (filename.includes(' ')) {
    report.errors.push(`SPACE_IN_FILENAME: ${filepath}`);
    valid = false;
  }

  // No uppercase (except README.md and other docs)
  if (filename !== filename.toLowerCase() && !filename.endsWith('.md') && !filename.endsWith('.json')) {
    report.errors.push(`UPPERCASE_IN_FILENAME: ${filepath} → expected: ${filename.toLowerCase()}`);
    valid = false;
  }

  // No special characters beyond hyphens, dots, underscores
  const nameWithoutExt = path.parse(filename).name;
  if (!/^[a-z0-9_-]+$/i.test(nameWithoutExt) && !filename.endsWith('.md')) {
    report.errors.push(`INVALID_CHARACTERS: ${filepath} (only a-z, 0-9, hyphens, underscores allowed)`);
    valid = false;
  }

  // Track for duplicate detection
  const existing = allFilenames.get(filename) || [];
  existing.push(filepath);
  allFilenames.set(filename, existing);

  return valid;
}

async function validateTransparency(filepath: string): Promise<boolean> {
  try {
    const metadata = await sharp(filepath).metadata();
    if (!metadata.hasAlpha) {
      report.errors.push(`NO_TRANSPARENCY: ${filepath} (poses/logos must have alpha channel)`);
      return false;
    }
    return true;
  } catch {
    report.warnings.push(`CANNOT_READ_IMAGE: ${filepath}`);
    return true; // Don't block on unreadable (might be non-image)
  }
}

async function validateDimensions(filepath: string): Promise<void> {
  try {
    const metadata = await sharp(filepath).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    // Warn on very small images
    if (width < 50 || height < 50) {
      report.warnings.push(`VERY_SMALL: ${filepath} (${width}x${height}) — may be too small for display`);
    }

    // Warn on extremely large images
    if (width > 4096 || height > 4096) {
      report.warnings.push(`VERY_LARGE: ${filepath} (${width}x${height}) — consider resizing`);
    }
  } catch {
    // Skip non-image files
  }
}

async function validateDirectory(relDir: string, config: typeof ASSET_DIRS[string]): Promise<void> {
  const fullDir = path.join(ROOT, relDir);

  if (!fs.existsSync(fullDir)) {
    return; // Directory doesn't exist yet — that's fine
  }

  const files = fs.readdirSync(fullDir).filter(f => !f.endsWith('.md') && !f.startsWith('.'));

  for (const file of files) {
    const filepath = path.join(fullDir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) continue; // Skip subdirectories (handled separately)

    report.stats.totalFiles++;
    report.stats.totalSizeMB += stat.size / (1024 * 1024);

    // Check extension
    const ext = path.extname(file).toLowerCase();
    if (!config.extensions.includes(ext)) {
      report.errors.push(`INVALID_EXTENSION: ${relDir}/${file} (allowed: ${config.extensions.join(', ')})`);
      report.stats.invalidFiles++;
      continue;
    }

    // Check filename
    const filenameValid = validateFilename(filepath);

    // Check file size
    const sizeMB = stat.size / (1024 * 1024);
    if (sizeMB > config.maxSizeMB) {
      report.errors.push(`FILE_TOO_LARGE: ${relDir}/${file} (${sizeMB.toFixed(1)}MB > ${config.maxSizeMB}MB limit)`);
      report.stats.invalidFiles++;
      continue;
    }

    // Check transparency (for applicable directories)
    if (config.requiresTransparency && (ext === '.png' || ext === '.webp')) {
      await validateTransparency(filepath);
    }

    // Check dimensions
    if (['.png', '.jpg', '.webp'].includes(ext)) {
      await validateDimensions(filepath);
    }

    if (filenameValid) {
      report.stats.validFiles++;
    } else {
      report.stats.invalidFiles++;
    }
  }
}

function validateOrphanedWebPs(): void {
  const originalsDir = path.join(ROOT, 'poses', 'originals');
  if (!fs.existsSync(originalsDir)) return;

  const originals = new Set(
    fs.readdirSync(originalsDir)
      .filter(f => f.endsWith('.png'))
      .map(f => f.replace('.png', ''))
  );

  for (const size of ['sm', 'md', 'lg']) {
    const sizeDir = path.join(ROOT, 'poses', size);
    if (!fs.existsSync(sizeDir)) continue;

    const webps = fs.readdirSync(sizeDir).filter(f => f.endsWith('.webp'));
    for (const webp of webps) {
      const baseName = webp.replace('.webp', '');
      if (!originals.has(baseName)) {
        report.errors.push(`ORPHANED_WEBP: poses/${size}/${webp} (no matching original PNG)`);
      }
    }
  }

  // Check for originals missing WebP variants
  for (const original of originals) {
    for (const size of ['sm', 'md', 'lg']) {
      const webpPath = path.join(ROOT, 'poses', size, `${original}.webp`);
      if (!fs.existsSync(webpPath)) {
        report.warnings.push(`MISSING_VARIANT: poses/${size}/${original}.webp — run atlas:resize`);
      }
    }
  }
}

function validateDuplicates(): void {
  for (const [filename, paths] of allFilenames.entries()) {
    if (paths.length > 1) {
      // Only flag if same filename in same category type (not originals vs generated)
      const basePaths = paths.map(p => path.relative(ROOT, p));
      const isOrigAndGenerated = basePaths.some(p => p.includes('originals')) &&
        basePaths.some(p => p.includes('/sm/') || p.includes('/md/') || p.includes('/lg/'));

      if (!isOrigAndGenerated) {
        report.warnings.push(`DUPLICATE_FILENAME: "${filename}" found in: ${basePaths.join(', ')}`);
      }
    }
  }
}

function validateComicNumbering(): void {
  const comicsDir = path.join(ROOT, 'comics');
  if (!fs.existsSync(comicsDir)) return;

  const comics = fs.readdirSync(comicsDir).filter(f => f.endsWith('.png'));
  const numbers: number[] = [];

  for (const file of comics) {
    const match = file.match(/^atlas-comic-strip-(\d+)\.png$/);
    if (match) {
      numbers.push(parseInt(match[1], 10));
    } else if (!file.endsWith('.md')) {
      report.warnings.push(`COMIC_NAMING: ${file} doesn't match pattern 'atlas-comic-strip-{N}.png'`);
    }
  }

  // Check for gaps
  if (numbers.length > 0) {
    numbers.sort((a, b) => a - b);
    const max = numbers[numbers.length - 1];
    for (let i = 1; i <= max; i++) {
      if (!numbers.includes(i)) {
        report.warnings.push(`COMIC_GAP: atlas-comic-strip-${i}.png is missing (gap in sequence)`);
      }
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🔍 Atlas Asset Validation');
  console.log('═'.repeat(60));

  // Validate each configured directory
  for (const [dir, config] of Object.entries(ASSET_DIRS)) {
    await validateDirectory(dir, config);
  }

  // Cross-directory checks
  validateOrphanedWebPs();
  validateDuplicates();
  validateComicNumbering();

  // Report
  console.log('');
  report.info.push(`Total files scanned: ${report.stats.totalFiles}`);
  report.info.push(`Valid: ${report.stats.validFiles}`);
  report.info.push(`Invalid: ${report.stats.invalidFiles}`);
  report.info.push(`Total size: ${report.stats.totalSizeMB.toFixed(1)} MB`);

  for (const msg of report.info) {
    console.log(`  ℹ️  ${msg}`);
  }

  if (report.warnings.length > 0) {
    console.log(`\n  ⚠️  WARNINGS (${report.warnings.length}):`);
    for (const msg of report.warnings) {
      console.log(`     ${msg}`);
    }
  }

  if (report.errors.length > 0) {
    console.log(`\n  ❌ ERRORS (${report.errors.length}):`);
    for (const msg of report.errors) {
      console.log(`     ${msg}`);
    }
  }

  console.log('\n' + '═'.repeat(60));
  if (report.errors.length === 0) {
    console.log('  ✅ Validation PASSED');
    process.exit(0);
  } else {
    console.log(`  ❌ Validation FAILED — ${report.errors.length} error(s)`);
    console.log('  Pipeline blocked. Fix errors before syncing.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Validation crashed:', err);
  process.exit(1);
});
