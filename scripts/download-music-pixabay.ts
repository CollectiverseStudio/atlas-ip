/**
 * download-music-pixabay.ts — Download background music from Pixabay via web scraping
 *
 * Pixabay has 260K+ royalty-free music tracks but NO public API for audio.
 * This script scrapes their music pages to find and download tracks.
 *
 * IMPORTANT: You must be logged into Pixabay in your browser for downloads to work.
 * Pixabay requires authentication to download full-quality audio files.
 *
 * Usage:
 *   npx tsx scripts/download-music-pixabay.ts
 *   npx tsx scripts/download-music-pixabay.ts --dry-run
 *   npx tsx scripts/download-music-pixabay.ts --limit 50   (per mood, default 30)
 *
 * Downloads to: atlas-ip/assets/music/pixabay/{mood}/filename.mp3
 *
 * Strategy: Fetches Pixabay music search pages, extracts track IDs and metadata,
 * then downloads via their CDN URLs (which are available in page source).
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const MUSIC_DIR = path.resolve(PROJECT_ROOT, 'assets/music/pixabay');

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseInt(getArg('--limit') || '30', 10);

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

const SEARCH_QUERIES = [
  { mood: 'upbeat', searches: ['upbeat', 'happy+background', 'energetic', 'cheerful'] },
  { mood: 'chill', searches: ['chill', 'lofi', 'ambient+relaxing', 'calm'] },
  { mood: 'dramatic', searches: ['dramatic', 'cinematic+dark', 'suspense', 'epic+dark'] },
  { mood: 'adventure', searches: ['adventure', 'exploration', 'epic+journey', 'quest'] },
  { mood: 'gentle', searches: ['gentle+piano', 'soft+acoustic', 'tender', 'emotional'] },
  { mood: 'corporate', searches: ['corporate', 'business', 'technology', 'presentation'] },
  { mood: 'playful', searches: ['playful', 'cartoon', 'fun+quirky', 'comedy'] },
  { mood: 'cinematic', searches: ['cinematic+orchestral', 'trailer+epic', 'film+score', 'orchestra'] },
];

interface PixabayTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
}

async function searchPixabayMusic(query: string, page: number = 1): Promise<PixabayTrack[]> {
  const url = `https://pixabay.com/music/search/${query}/?pagi=${page}`;
  const tracks: PixabayTrack[] = [];

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    });

    if (!response.ok) {
      console.error(`   ❌ HTTP ${response.status} for ${url}`);
      return [];
    }

    const html = await response.text();

    // Extract track data from the HTML
    // Pixabay embeds audio URLs in data attributes and JSON-LD
    // Pattern: data-audio-url or audio src attributes
    const audioPattern = /data-(?:audio|src)="(https:\/\/cdn\.pixabay\.com\/[^"]+\.mp3)"/g;
    const titlePattern = /<h3[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/h3>/g;

    // Alternative: look for the __NEXT_DATA__ or similar embedded JSON
    const jsonDataMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>({.+?})<\/script>/);
    if (jsonDataMatch) {
      try {
        const data = JSON.parse(jsonDataMatch[1]);
        // Navigate the Next.js page props to find tracks
        const pageProps = data.props?.pageProps;
        if (pageProps?.media || pageProps?.hits || pageProps?.tracks) {
          const items = pageProps.media || pageProps.hits || pageProps.tracks || [];
          for (const item of items) {
            if (item.audio || item.audioUrl || item.url) {
              tracks.push({
                id: String(item.id || item.contentId || ''),
                title: item.title || item.name || `track-${item.id}`,
                artist: item.user?.username || item.username || item.artist || 'unknown',
                duration: String(item.duration || ''),
                audioUrl: item.audio || item.audioUrl || item.url || '',
              });
            }
          }
        }
      } catch { /* JSON parse failed, try regex approach */ }
    }

    // Fallback: regex extraction from HTML
    if (tracks.length === 0) {
      // Look for CDN audio links
      const cdnPattern = /https:\/\/cdn\.pixabay\.com\/(?:download\/)?audio\/[^"'\s]+\.mp3/g;
      const cdnMatches = html.match(cdnPattern) || [];

      // Look for track info nearby
      const trackBlockPattern = /<div[^>]*class="[^"]*track[^"]*"[^>]*>[\s\S]*?<\/div>/g;
      const blocks = html.match(trackBlockPattern) || [];

      // Even simpler: just grab all unique MP3 CDN links
      const uniqueUrls = [...new Set(cdnMatches)];
      for (let i = 0; i < uniqueUrls.length; i++) {
        const url = uniqueUrls[i];
        // Extract filename as title
        const filenameMatch = url.match(/\/([^/]+)\.mp3/);
        tracks.push({
          id: `pixabay-${query}-${i}`,
          title: filenameMatch?.[1]?.replace(/-/g, ' ') || `track-${i}`,
          artist: 'pixabay',
          duration: '',
          audioUrl: url,
        });
      }
    }

    return tracks;
  } catch (err: any) {
    console.error(`   ❌ Fetch error: ${err.message}`);
    return [];
  }
}

async function downloadTrack(url: string, outputPath: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://pixabay.com/',
      }
    });
    if (!response.ok) return false;
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 100000) return false; // Skip tiny files
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
  console.log('🎵 Atlas Music Library — Pixabay (Web Scraping)');
  console.log('═'.repeat(50));
  console.log(`   Output: ${MUSIC_DIR}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'DOWNLOAD'}`);
  console.log(`   Limit per mood: ${LIMIT}`);
  console.log('');
  console.log('   ⚠️  Note: Pixabay may rate-limit or require login for downloads.');
  console.log('   If downloads fail, use the browser automation approach instead.');
  console.log('');

  // Create mood directories
  for (const { mood } of SEARCH_QUERIES) {
    const dir = path.join(MUSIC_DIR, mood);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  const manifest: { mood: string; filename: string; title: string; artist: string; source_url: string }[] = [];

  for (const { mood, searches } of SEARCH_QUERIES) {
    console.log(`\n🎶 ${mood.toUpperCase()} (${searches.length} searches)`);
    console.log('─'.repeat(40));

    const seenUrls = new Set<string>();
    let moodCount = 0;

    for (const search of searches) {
      if (moodCount >= LIMIT) break;

      console.log(`   🔍 Searching: "${search}"`);

      // Try pages 1-3
      for (let page = 1; page <= 3 && moodCount < LIMIT; page++) {
        const tracks = await searchPixabayMusic(search, page);
        if (tracks.length === 0) break;

        console.log(`      Page ${page}: ${tracks.length} tracks found`);

        for (const track of tracks) {
          if (moodCount >= LIMIT) break;
          if (!track.audioUrl || seenUrls.has(track.audioUrl)) continue;
          seenUrls.add(track.audioUrl);

          const filename = `${sanitizeFilename(track.title)}_${track.id}.mp3`;
          const outputPath = path.join(MUSIC_DIR, mood, filename);

          if (fs.existsSync(outputPath)) {
            totalSkipped++;
            moodCount++;
            continue;
          }

          if (DRY_RUN) {
            console.log(`      📋 Would download: ${track.title} by ${track.artist}`);
            moodCount++;
          } else {
            const success = await downloadTrack(track.audioUrl, outputPath);
            if (success) {
              const size = fs.statSync(outputPath).size;
              console.log(`      ✅ ${track.title} (${(size / 1024 / 1024).toFixed(1)} MB)`);
              totalDownloaded++;
              moodCount++;
            } else {
              totalFailed++;
              continue;
            }
            // Be polite — 1s between downloads
            await new Promise(r => setTimeout(r, 1000));
          }

          manifest.push({
            mood,
            filename,
            title: track.title,
            artist: track.artist,
            source_url: track.audioUrl,
          });
        }

        await new Promise(r => setTimeout(r, 2000));
      }
    }

    console.log(`   ✅ ${mood}: ${moodCount} tracks`);
  }

  // Save manifest
  const manifestPath = path.join(MUSIC_DIR, 'pixabay-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 COMPLETE`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   Downloaded: ${totalDownloaded}`);
  console.log(`   Skipped: ${totalSkipped}`);
  console.log(`   Failed: ${totalFailed}`);
  console.log(`   Total in manifest: ${manifest.length}`);
  console.log(`   Manifest: ${manifestPath}`);

  if (totalFailed > totalDownloaded) {
    console.log(`\n   ⚠️  High failure rate — Pixabay may be blocking programmatic downloads.`);
    console.log(`   Try logging into pixabay.com in your browser first, or use the`);
    console.log(`   Freesound/Archive scripts instead (they have proper APIs).`);
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
