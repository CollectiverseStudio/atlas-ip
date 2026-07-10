/**
 * download-music-archive.ts — Batch download background music from Internet Archive
 *
 * Internet Archive has massive royalty-free music collections.
 * NO API KEY REQUIRED — fully open.
 *
 * Usage:
 *   npx tsx scripts/download-music-archive.ts
 *   npx tsx scripts/download-music-archive.ts --dry-run
 *   npx tsx scripts/download-music-archive.ts --limit 50   (per mood, default 30)
 *
 * Downloads to: atlas-ip/assets/music/archive/{mood}/filename.mp3
 *
 * Sources: Kevin MacLeod (incompetech), Free Music Archive, royalty-free collections
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const MUSIC_DIR = path.resolve(PROJECT_ROOT, 'assets/music/archive');

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseInt(getArg('--limit') || '30', 10);

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

// Internet Archive search queries — targeting royalty-free music collections
const SEARCH_QUERIES = [
  {
    mood: 'upbeat',
    queries: [
      'subject:"royalty free" AND subject:"upbeat" AND mediatype:audio',
      'subject:"happy" AND subject:"background music" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"bright"',
      'subject:"energetic" AND subject:"instrumental" AND mediatype:audio',
    ]
  },
  {
    mood: 'chill',
    queries: [
      'subject:"ambient" AND subject:"relaxing" AND mediatype:audio',
      'subject:"chill" AND subject:"lofi" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"calm"',
      'subject:"mellow" AND subject:"background" AND mediatype:audio',
    ]
  },
  {
    mood: 'dramatic',
    queries: [
      'subject:"dramatic" AND subject:"cinematic" AND mediatype:audio',
      'subject:"suspense" AND subject:"tension" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"dark"',
      'subject:"epic" AND subject:"orchestral" AND mediatype:audio',
    ]
  },
  {
    mood: 'adventure',
    queries: [
      'subject:"adventure" AND subject:"epic" AND mediatype:audio',
      'subject:"exploration" AND subject:"instrumental" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"heroic"',
      'subject:"quest" AND subject:"fantasy" AND mediatype:audio',
    ]
  },
  {
    mood: 'gentle',
    queries: [
      'subject:"piano" AND subject:"gentle" AND mediatype:audio',
      'subject:"soft" AND subject:"acoustic" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"tender"',
      'subject:"warm" AND subject:"emotional" AND mediatype:audio',
    ]
  },
  {
    mood: 'corporate',
    queries: [
      'subject:"corporate" AND subject:"background" AND mediatype:audio',
      'subject:"business" AND subject:"presentation" AND mediatype:audio',
      'subject:"technology" AND subject:"modern" AND mediatype:audio',
      'subject:"professional" AND subject:"clean" AND mediatype:audio',
    ]
  },
  {
    mood: 'playful',
    queries: [
      'subject:"playful" AND subject:"fun" AND mediatype:audio',
      'subject:"cartoon" AND subject:"comedy" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"comedy"',
      'subject:"quirky" AND subject:"whimsical" AND mediatype:audio',
    ]
  },
  {
    mood: 'cinematic',
    queries: [
      'subject:"cinematic" AND subject:"orchestral" AND mediatype:audio',
      'subject:"trailer" AND subject:"epic" AND mediatype:audio',
      'creator:"Kevin MacLeod" AND subject:"film"',
      'subject:"soundtrack" AND subject:"score" AND mediatype:audio',
    ]
  },
];

interface ArchiveItem {
  identifier: string;
  title: string;
  creator?: string;
  description?: string;
}

interface ArchiveSearchResponse {
  response: {
    numFound: number;
    docs: ArchiveItem[];
  };
}

interface ArchiveFileInfo {
  name: string;
  format: string;
  size?: string;
  length?: string;
}

async function searchArchive(query: string, rows: number = 20): Promise<ArchiveItem[]> {
  const params = new URLSearchParams({
    q: query,
    output: 'json',
    rows: String(rows),
    fl: 'identifier,title,creator,description',
  });

  const url = `https://archive.org/advancedsearch.php?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`   ❌ Search error (${response.status})`);
      return [];
    }
    const data = await response.json() as ArchiveSearchResponse;
    return data.response?.docs || [];
  } catch (err: any) {
    console.error(`   ❌ Network error: ${err.message}`);
    return [];
  }
}

async function getItemFiles(identifier: string): Promise<ArchiveFileInfo[]> {
  const url = `https://archive.org/metadata/${identifier}/files`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data.result || [];
  } catch {
    return [];
  }
}

async function downloadFile(identifier: string, filename: string, outputPath: string): Promise<boolean> {
  const url = `https://archive.org/download/${identifier}/${encodeURIComponent(filename)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 50000) return false; // Skip files under 50KB (likely not music)
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
  console.log('🎵 Atlas Music Library — Internet Archive');
  console.log('═'.repeat(50));
  console.log(`   Output: ${MUSIC_DIR}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'DOWNLOAD'}`);
  console.log(`   Limit per mood: ${LIMIT}`);
  console.log(`   No API key needed! ✨`);
  console.log('');

  // Create mood directories
  for (const { mood } of SEARCH_QUERIES) {
    const dir = path.join(MUSIC_DIR, mood);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalSkipped = 0;
  const manifest: { mood: string; filename: string; title: string; creator: string; identifier: string; original_file: string }[] = [];

  for (const { mood, queries } of SEARCH_QUERIES) {
    console.log(`\n🎶 ${mood.toUpperCase()} (${queries.length} searches)`);
    console.log('─'.repeat(40));

    const seenIds = new Set<string>();
    let moodCount = 0;

    for (const query of queries) {
      if (moodCount >= LIMIT) break;

      console.log(`   🔍 Searching: "${query.substring(0, 60)}..."`);
      const items = await searchArchive(query, 15);
      console.log(`      Found: ${items.length} items`);

      for (const item of items) {
        if (moodCount >= LIMIT) break;
        if (seenIds.has(item.identifier)) continue;
        seenIds.add(item.identifier);

        // Get files for this item — look for MP3s
        const files = await getItemFiles(item.identifier);
        const mp3Files = files.filter(f =>
          f.format === 'VBR MP3' || f.format === 'MP3' ||
          f.name.endsWith('.mp3')
        );

        if (mp3Files.length === 0) continue;

        // Pick the first MP3 (or the largest one if multiple)
        const targetFile = mp3Files.sort((a, b) =>
          parseInt(b.size || '0') - parseInt(a.size || '0')
        )[0];

        const filename = `${sanitizeFilename(item.title || item.identifier)}_${item.identifier.substring(0, 20)}.mp3`;
        const outputPath = path.join(MUSIC_DIR, mood, filename);

        if (fs.existsSync(outputPath)) {
          totalSkipped++;
          moodCount++;
          continue;
        }

        if (DRY_RUN) {
          console.log(`      📋 Would download: ${item.title} by ${item.creator || 'unknown'}`);
          moodCount++;
        } else {
          const success = await downloadFile(item.identifier, targetFile.name, outputPath);
          if (success) {
            const size = fs.statSync(outputPath).size;
            console.log(`      ✅ ${item.title} (${(size / 1024 / 1024).toFixed(1)} MB)`);
            totalDownloaded++;
            moodCount++;
          } else {
            console.log(`      ⚠️  Failed/too small: ${item.title}`);
            continue;
          }
          await new Promise(r => setTimeout(r, 500));
        }

        manifest.push({
          mood,
          filename,
          title: item.title || item.identifier,
          creator: item.creator || 'unknown',
          identifier: item.identifier,
          original_file: targetFile.name,
        });

        await new Promise(r => setTimeout(r, 300));
      }

      await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`   ✅ ${mood}: ${moodCount} tracks`);
  }

  // Save manifest
  const manifestPath = path.join(MUSIC_DIR, 'archive-manifest.json');
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
