/**
 * download-music-library.ts — Master music download orchestrator
 *
 * Runs all 3 music sources in sequence:
 *   1. Internet Archive (no key needed — runs first)
 *   2. Freesound.org (needs API key)
 *   3. Pixabay (web scraping — may need browser login)
 *
 * Usage:
 *   npx tsx scripts/download-music-library.ts                          # Archive only (no keys needed)
 *   npx tsx scripts/download-music-library.ts --freesound YOUR_KEY     # Archive + Freesound
 *   npx tsx scripts/download-music-library.ts --all --freesound KEY    # All 3 sources
 *   npx tsx scripts/download-music-library.ts --dry-run                # Preview mode
 *
 * Or run individual sources:
 *   npx tsx scripts/download-music-archive.ts           # Internet Archive (FREE, no key)
 *   npx tsx scripts/download-music-freesound.ts --key X # Freesound.org (free key needed)
 *   npx tsx scripts/download-music-pixabay.ts           # Pixabay (scraping, may fail)
 *
 * All downloads go to: atlas-ip/assets/music/{source}/{mood}/
 *
 * Target: 200+ tracks across 8 moods:
 *   upbeat, chill, dramatic, adventure, gentle, corporate, playful, cinematic
 */

import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');
const RUN_ALL = process.argv.includes('--all');

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

const FREESOUND_KEY = getArg('--freesound') || process.env.FREESOUND_API_KEY || '';

async function main() {
  console.log('🎵 Atlas Music Library — Master Downloader');
  console.log('═'.repeat(60));
  console.log('');
  console.log('Sources:');
  console.log('  1. Internet Archive — FREE, no key needed ✅');
  console.log(`  2. Freesound.org   — ${FREESOUND_KEY ? '✅ Key provided' : '⬜ No key (skipping)'}`);
  console.log(`  3. Pixabay         — ${RUN_ALL ? '✅ Enabled (--all)' : '⬜ Skipped (use --all to enable)'}`);
  console.log('');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN' : 'DOWNLOAD'}`);
  console.log('');

  const dryFlag = DRY_RUN ? ' --dry-run' : '';

  // 1. Internet Archive (always runs — no key needed)
  console.log('\n' + '━'.repeat(60));
  console.log('📦 SOURCE 1: Internet Archive');
  console.log('━'.repeat(60));
  try {
    execSync(`npx tsx ${path.join(__dirname, 'download-music-archive.ts')}${dryFlag}`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
  } catch (err) {
    console.error('⚠️  Internet Archive download had errors (continuing...)');
  }

  // 2. Freesound (if key provided)
  if (FREESOUND_KEY) {
    console.log('\n' + '━'.repeat(60));
    console.log('📦 SOURCE 2: Freesound.org');
    console.log('━'.repeat(60));
    try {
      execSync(`npx tsx ${path.join(__dirname, 'download-music-freesound.ts')} --key ${FREESOUND_KEY}${dryFlag}`, {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..'),
      });
    } catch (err) {
      console.error('⚠️  Freesound download had errors (continuing...)');
    }
  }

  // 3. Pixabay (only with --all flag since it's scraping and may fail)
  if (RUN_ALL) {
    console.log('\n' + '━'.repeat(60));
    console.log('📦 SOURCE 3: Pixabay (web scraping)');
    console.log('━'.repeat(60));
    try {
      execSync(`npx tsx ${path.join(__dirname, 'download-music-pixabay.ts')}${dryFlag}`, {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..'),
      });
    } catch (err) {
      console.error('⚠️  Pixabay download had errors (scraping may be blocked)');
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('🏁 ALL SOURCES COMPLETE');
  console.log('═'.repeat(60));
  console.log('');
  console.log('Music library: atlas-ip/assets/music/');
  console.log('  ├── archive/    (Internet Archive)');
  console.log('  ├── freesound/  (Freesound.org)');
  console.log('  ├── pixabay/    (Pixabay)');
  console.log('  └── atlas-theme-upbeat.mp3  (original theme)');
  console.log('');
  console.log('Each source has a manifest JSON with track metadata.');
  console.log('The V2 video script can pick tracks from any source/mood.');
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
