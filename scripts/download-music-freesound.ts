/**
 * download-music-freesound.ts — Batch download background music from Freesound.org
 *
 * Uses Freesound APIv2 (proper audio API with 500K+ sounds).
 * Requires a free API key from https://freesound.org/apiv2/apply
 *
 * Usage:
 *   npx tsx scripts/download-music-freesound.ts --key YOUR_FREESOUND_API_KEY
 *   npx tsx scripts/download-music-freesound.ts --key YOUR_FREESOUND_API_KEY --dry-run
 *
 * Downloads to: atlas-ip/assets/music/freesound/{mood}/filename.mp3
 *
 * NOTE: Freesound requires OAuth2 for full-quality downloads.
 * With token auth, you get preview quality (128kbps MP3) — which is fine for background music.
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const MUSIC_DIR = path.resolve(PROJECT_ROOT, 'assets/music/freesound');

const API_KEY = getArg('--key') || process.env.FREESOUND_API_KEY || '';
const DRY_RUN = process.argv.includes('--dry-run');

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

// Search by mood — filter for music-length sounds (30-180s)
const SEARCH_QUERIES = [
  { mood: 'upbeat', queries: ['upbeat music', 'happy background music', 'energetic instrumental', 'cheerful loop'] },
  { mood: 'chill', queries: ['chill music', 'lofi background', 'ambient relaxing', 'mellow instrumental'] },
  { mood: 'dramatic', queries: ['dramatic music', 'cinematic tension', 'dark orchestral', 'suspense background'] },
  { mood: 'adventure', queries: ['adventure music', 'exploration theme', 'epic quest', 'discovery instrumental'] },
  { mood: 'gentle', queries: ['gentle piano', 'soft background music', 'warm acoustic', 'tender instrumental'] },
  { mood: 'corporate', queries: ['corporate music', 'business background', 'technology modern', 'professional clean'] },
  { mood: 'playful', queries: ['playful music', 'cartoon fun', 'quirky instrumental', 'bouncy whimsical'] },
  { mood: 'cinematic', queries: ['cinematic orchestral', 'epic trailer music', 'film score', 'sweeping orchestra'] },
];

interface FreesoundHit {
  id: number;
  name: string;
  tags: string[];
  username: string;
  duration: number;
  previews: {
    'preview-hq-mp3': string;
    'preview-lq-mp3': string;
    'preview-hq-ogg': string;
    'preview-lq-ogg': string;
  };
  license: string;
}

interface FreesoundResponse {
  count: number;
  results: FreesoundHit[];
  next: string | null;
}

async function searchFreesound(query: string, page: number = 1): Promise<FreesoundHit[]> {
  const params = new URLSearchParams({
    query,
    token: API_KEY,
    fields: 'id,name,tags,username,duration,previews,license',
    filter: 'duration:[30 TO 180]',
    sort: 'rating_desc',
    page: String(page),
    page_size: '30',
  });

  const url = `https://freesound.org/apiv2/search/?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error(`   ❌ API error (${response.status}): ${text.substring(0, 200)}`);
      return [];
    }
    const data = await response.json() as FreesoundResponse;
    return data.results || [];
  } catch (err: any) {
    console.error(`   ❌ Network error: ${err.message}`);
    return [];
  }
}

async function downloadPreview(url: string, outputPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch {
    return false;
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60).toLowerCase();
}

async function main() {
  console.log('🎵 Atlas Music Library — Freesound.org');
  console.log('═'.repeat(50));

  if (!API_KEY) {
    console.error(`
❌ No Freesound API key provided.

Get one free at: https://freesound.org/apiv2/apply
Then run:
  npx tsx scripts/download-music-freesound.ts --key YOUR_KEY

Or add FREESOUND_API_KEY=your_key to .env
`);
    process.exit(1);
  }

  console.log(`   API Key: ${API_KEY.substring(0, 8)}...`);
  console.log(`   Output: ${MUSIC_DIR}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'DOWNLOAD'}`);
  console.log('');

  // Create mood directories
  for (const { mood } of SEARCH_QUERIES) {
    const dir = path.join(MUSIC_DIR, mood);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalSkipped = 0;
  const manifest: { mood: string; filename: string; title: string; duration: number; artist: string; license: string; freesound_id: number }[] = [];

  for (const { mood, queries } of SEARCH_QUERIES) {
    console.log(`\n🎶 ${mood.toUpperCase()} (${queries.length} searches)`);
    console.log('─'.repeat(40));

    const seenIds = new Set<number>();
    let moodCount = 0;

    for (const query of queries) {
      if (moodCount >= 30) break;

      console.log(`   🔍 Searching: "${query}"`);
      const hits = await searchFreesound(query);
      console.log(`      Found: ${hits.length} results`);

      for (const hit of hits) {
        if (moodCount >= 30) break;
        if (seenIds.has(hit.id)) continue;
        seenIds.add(hit.id);

        const previewUrl = hit.previews?.['preview-hq-mp3'];
        if (!previewUrl) continue;

        const filename = `${sanitizeFilename(hit.name)}_${hit.id}.mp3`;
        const outputPath = path.join(MUSIC_DIR, mood, filename);

        if (fs.existsSync(outputPath)) {
          totalSkipped++;
          continue;
        }

        if (DRY_RUN) {
          console.log(`      📋 Would download: ${hit.name} (${Math.round(hit.duration)}s) by ${hit.username}`);
        } else {
          const success = await downloadPreview(previewUrl, outputPath);
          if (success) {
            console.log(`      ✅ ${hit.name} (${Math.round(hit.duration)}s)`);
            totalDownloaded++;
          } else {
            console.log(`      ⚠️  Failed: ${hit.name}`);
            continue;
          }
          await new Promise(r => setTimeout(r, 300));
        }

        manifest.push({
          mood,
          filename,
          title: hit.name,
          duration: hit.duration,
          artist: hit.username,
          license: hit.license,
          freesound_id: hit.id,
        });
        moodCount++;
      }

      await new Promise(r => setTimeout(r, 500));
    }

    console.log(`   ✅ ${mood}: ${moodCount} tracks`);
  }

  // Save manifest
  const manifestPath = path.join(MUSIC_DIR, 'freesound-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 COMPLETE`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   Downloaded: ${totalDownloaded}`);
  console.log(`   Skipped: ${totalSkipped}`);
  console.log(`   Total in manifest: ${manifest.length}`);
  console.log(`   Manifest: ${manifestPath}`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
