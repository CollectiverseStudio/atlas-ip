/**
 * generate-comic-video.ts — Comic Strip → Animated Video Pipeline
 *
 * Takes a comic's panel images, animates each via Fal.ai image-to-video,
 * then stitches into a 30-60 second video with transitions and subtitles.
 *
 * Usage:
 *   npx tsx scripts/generate-comic-video.ts --script comics/scripts/comic-001.md
 *   npx tsx scripts/generate-comic-video.ts --panels generated/comic-001/ --output videos/comic-001.mp4
 *   npx tsx scripts/generate-comic-video.ts --script comics/scripts/comic-001.md --model kling-v3 --duration 5
 *
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - Panel images already generated (via generate-full-comic.ts)
 *   - ffmpeg installed and in PATH
 *   - AWS credentials for S3 upload
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const FAL_KEY = process.env.FAL_KEY || '';
const S3_BUCKET = 'collectiverse-assets';
const S3_REGION = 'us-east-1';
const s3 = new S3Client({ region: S3_REGION });

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

interface VideoConfig {
  model: 'kling-v3' | 'kling-v2.1' | 'veo2';
  secondsPerPanel: number;  // 3-8 seconds per panel
  transitionDuration: number; // crossfade duration in seconds
  resolution: '720p' | '1080p';
  addSubtitles: boolean;
  addMusic: boolean;
  musicTrack?: string; // path to background music file
}

const DEFAULT_CONFIG: VideoConfig = {
  model: 'kling-v3',
  secondsPerPanel: 5,
  transitionDuration: 0.5,
  resolution: '1080p',
  addSubtitles: true,
  addMusic: true,
};

// Fal.ai model endpoints
const MODEL_ENDPOINTS: Record<string, { endpoint: string; costPerSec: number }> = {
  'kling-v3': { endpoint: 'fal-ai/kling-video/v3/standard/image-to-video', costPerSec: 0.084 },
  'kling-v2.1': { endpoint: 'fal-ai/kling-video/v2.1/standard/image-to-video', costPerSec: 0.056 },
  'veo2': { endpoint: 'fal-ai/veo2/image-to-video', costPerSec: 0.10 },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface PanelInfo {
  number: number;
  imagePath: string;
  text: string;
  prompt?: string;
}

interface AnimatedClip {
  panelNumber: number;
  videoPath: string;
  duration: number;
  text: string;
}

interface VideoArgs {
  scriptPath?: string;
  panelsDir?: string;
  output?: string;
  model?: string;
  duration?: number;
  noSubtitles?: boolean;
  noMusic?: boolean;
  musicTrack?: string;
  dryRun?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

function parseArgs(): VideoArgs {
  const args = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  return {
    scriptPath: get('--script'),
    panelsDir: get('--panels'),
    output: get('--output'),
    model: get('--model'),
    duration: get('--duration') ? parseInt(get('--duration')!, 10) : undefined,
    noSubtitles: has('--no-subtitles'),
    noMusic: has('--no-music'),
    musicTrack: get('--music'),
    dryRun: has('--dry-run'),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT PARSER (reuses comic-001.md format)
// ═══════════════════════════════════════════════════════════════════════════════

function parsePanelsFromScript(scriptPath: string): PanelInfo[] {
  const resolvedPath = path.resolve(PROJECT_ROOT, scriptPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Script not found: ${resolvedPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, 'utf-8');
  const lines = content.split('\n');
  const panels: PanelInfo[] = [];
  let current: Partial<PanelInfo> | null = null;

  const scriptBasename = path.basename(scriptPath, '.md');
  const panelDir = path.resolve(PROJECT_ROOT, 'generated', scriptBasename);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('## Panel')) {
      if (current && current.imagePath) panels.push(current as PanelInfo);
      const numMatch = line.match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0], 10) : panels.length + 1;
      current = {
        number: num,
        imagePath: path.join(panelDir, `panel-${String(num).padStart(2, '0')}.png`),
        text: '',
      };
    } else if (current) {
      if (line.startsWith('Prompt:')) current.prompt = line.substring(7).trim();
      if (line.startsWith('Text:')) current.text = line.substring(5).trim();
    }
  }
  if (current && current.imagePath) panels.push(current as PanelInfo);

  return panels;
}

function parsePanelsFromDirectory(dir: string): PanelInfo[] {
  const resolvedDir = path.resolve(PROJECT_ROOT, dir);
  if (!fs.existsSync(resolvedDir)) {
    console.error(`❌ Panel directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  const pngs = fs.readdirSync(resolvedDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  return pngs.map((file, i) => ({
    number: i + 1,
    imagePath: path.join(resolvedDir, file),
    text: '', // no subtitles if loading from directory without script
  }));
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAL.AI IMAGE-TO-VIDEO
// ═══════════════════════════════════════════════════════════════════════════════

async function animatePanel(
  panel: PanelInfo,
  config: VideoConfig,
  outputPath: string
): Promise<AnimatedClip> {
  const modelInfo = MODEL_ENDPOINTS[config.model];
  
  // Read image as base64
  const imageBuffer = fs.readFileSync(panel.imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  // Motion prompt — subtle animation appropriate for comic panels
  const motionPrompt = panel.prompt
    ? `Subtle cinematic motion: ${panel.prompt}. Slow camera push-in, character breathing, ambient movement.`
    : 'Subtle cinematic motion: slow camera push-in, character breathing, ambient particle movement, dramatic lighting shift.';

  console.log(`   🎬 Animating panel ${panel.number} (${config.secondsPerPanel}s via ${config.model})...`);

  // Submit to Fal.ai queue
  const submitResponse = await fetch(`https://queue.fal.run/${modelInfo.endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_url: base64Image,
      prompt: motionPrompt,
      duration: config.secondsPerPanel,
      aspect_ratio: '1:1',
    }),
  });

  if (!submitResponse.ok) {
    const err = await submitResponse.text();
    throw new Error(`Fal.ai submit failed (${submitResponse.status}): ${err}`);
  }

  const { request_id } = await submitResponse.json() as { request_id: string };
  console.log(`      Request ID: ${request_id}`);

  // Poll for completion
  let result: any = null;
  const maxWait = 300000; // 5 minutes max
  const pollInterval = 5000; // 5 seconds
  let waited = 0;

  while (waited < maxWait) {
    await new Promise(r => setTimeout(r, pollInterval));
    waited += pollInterval;

    const statusResponse = await fetch(
      `https://queue.fal.run/${modelInfo.endpoint}/requests/${request_id}/status`,
      { headers: { 'Authorization': `Key ${FAL_KEY}` } }
    );

    const status = await statusResponse.json() as { status: string };

    if (status.status === 'COMPLETED') {
      // Fetch result
      const resultResponse = await fetch(
        `https://queue.fal.run/${modelInfo.endpoint}/requests/${request_id}`,
        { headers: { 'Authorization': `Key ${FAL_KEY}` } }
      );
      result = await resultResponse.json();
      break;
    } else if (status.status === 'FAILED') {
      throw new Error(`Panel ${panel.number} generation failed`);
    }

    process.stdout.write(`      ⏳ ${Math.round(waited / 1000)}s...`);
    process.stdout.write('\r');
  }

  if (!result) {
    throw new Error(`Panel ${panel.number} timed out after ${maxWait / 1000}s`);
  }

  // Download video
  const videoUrl = result.video?.url || result.data?.video_url;
  if (!videoUrl) {
    throw new Error(`No video URL in response for panel ${panel.number}`);
  }

  const videoResponse = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());
  fs.writeFileSync(outputPath, videoBuffer);

  console.log(`      ✅ Panel ${panel.number} done → ${path.basename(outputPath)}`);

  return {
    panelNumber: panel.number,
    videoPath: outputPath,
    duration: config.secondsPerPanel,
    text: panel.text,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FFMPEG STITCHING
// ═══════════════════════════════════════════════════════════════════════════════

function stitchVideos(
  clips: AnimatedClip[],
  config: VideoConfig,
  outputPath: string
): void {
  console.log(`\n   🎞️  Stitching ${clips.length} clips with FFmpeg...`);

  const tmpDir = path.resolve(PROJECT_ROOT, 'tmp', 'video-stitch');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  // Create file list for FFmpeg concat
  const fileListPath = path.join(tmpDir, 'files.txt');
  const fileListContent = clips
    .map(c => `file '${c.videoPath.replace(/\\/g, '/')}'`)
    .join('\n');
  fs.writeFileSync(fileListPath, fileListContent);

  // Step 1: Concatenate clips with crossfade transitions
  const concatOutput = path.join(tmpDir, 'concat.mp4');
  
  if (clips.length === 1) {
    // Single clip — just copy
    fs.copyFileSync(clips[0].videoPath, concatOutput);
  } else {
    // Multiple clips — concat with crossfade
    // Simple concat first (crossfade is complex filter — can enhance later)
    const ffmpegConcat = `ffmpeg -y -f concat -safe 0 -i "${fileListPath}" -c copy "${concatOutput}" 2>&1`;
    try {
      execSync(ffmpegConcat, { stdio: 'pipe' });
    } catch {
      // If copy fails (different codecs), re-encode
      const ffmpegReencode = `ffmpeg -y -f concat -safe 0 -i "${fileListPath}" -c:v libx264 -preset fast -crf 23 "${concatOutput}" 2>&1`;
      execSync(ffmpegReencode, { stdio: 'pipe' });
    }
  }

  // Step 2: Add subtitles if enabled
  let currentOutput = concatOutput;
  
  if (config.addSubtitles && clips.some(c => c.text)) {
    const srtPath = path.join(tmpDir, 'subtitles.srt');
    const srtContent = generateSRT(clips);
    fs.writeFileSync(srtPath, srtContent);

    const subtitledOutput = path.join(tmpDir, 'subtitled.mp4');
    const ffmpegSubs = `ffmpeg -y -i "${currentOutput}" -vf "subtitles='${srtPath.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}':force_style='FontSize=24,FontName=Arial,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2'" -c:a copy "${subtitledOutput}" 2>&1`;
    
    try {
      execSync(ffmpegSubs, { stdio: 'pipe' });
      currentOutput = subtitledOutput;
    } catch (err) {
      console.log(`      ⚠️  Subtitle overlay failed — continuing without subtitles`);
    }
  }

  // Step 3: Add background music if enabled
  if (config.addMusic && config.musicTrack && fs.existsSync(config.musicTrack)) {
    const musicOutput = path.join(tmpDir, 'with-music.mp4');
    const ffmpegMusic = `ffmpeg -y -i "${currentOutput}" -i "${config.musicTrack}" -filter_complex "[1:a]volume=0.3[music];[0:a][music]amix=inputs=2:duration=first[a]" -map 0:v -map "[a]" -c:v copy -shortest "${musicOutput}" 2>&1`;
    
    try {
      execSync(ffmpegMusic, { stdio: 'pipe' });
      currentOutput = musicOutput;
    } catch {
      console.log(`      ⚠️  Music overlay failed — continuing without music`);
    }
  }

  // Copy final to output
  const resolvedOutput = path.resolve(PROJECT_ROOT, outputPath);
  const outputDir = path.dirname(resolvedOutput);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  fs.copyFileSync(currentOutput, resolvedOutput);

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`      ✅ Video saved → ${resolvedOutput}`);
}

function generateSRT(clips: AnimatedClip[]): string {
  let srt = '';
  let timeOffset = 0;

  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    if (!clip.text) {
      timeOffset += clip.duration;
      continue;
    }

    const startTime = formatSRTTime(timeOffset);
    const endTime = formatSRTTime(timeOffset + clip.duration - 0.5);

    srt += `${i + 1}\n`;
    srt += `${startTime} --> ${endTime}\n`;
    srt += `${clip.text}\n\n`;

    timeOffset += clip.duration;
  }

  return srt;
}

function formatSRTTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// S3 UPLOAD
// ═══════════════════════════════════════════════════════════════════════════════

async function uploadToS3(localPath: string, s3Key: string): Promise<string> {
  const buffer = fs.readFileSync(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: s3Key,
    Body: buffer,
    ContentType: 'video/mp4',
  }));
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  const args = parseArgs();

  if (!args.scriptPath && !args.panelsDir) {
    console.error(`
🎬 Atlas Comic → Video Pipeline
════════════════════════════════════════════════

Animates comic panel images into a 30-60 second video.

Usage:
  npx tsx scripts/generate-comic-video.ts --script comics/scripts/comic-001.md
  npx tsx scripts/generate-comic-video.ts --panels generated/comic-001/ --output videos/comic-001.mp4

Options:
  --script <path>      Comic script .md file (reads panels from generated/ folder)
  --panels <dir>       Directory of panel PNGs (alternative to --script)
  --output <path>      Output video path (default: videos/{comic-name}.mp4)
  --model <name>       kling-v3 (default), kling-v2.1, veo2
  --duration <sec>     Seconds per panel (default: 5, range: 3-8)
  --no-subtitles       Skip subtitle overlay
  --no-music           Skip background music
  --music <path>       Custom background music track
  --dry-run            Show plan without generating
`);
    process.exit(1);
  }

  if (!FAL_KEY) {
    console.error('❌ FAL_KEY not set in .env');
    process.exit(1);
  }

  // Build config
  const config: VideoConfig = {
    ...DEFAULT_CONFIG,
    model: (args.model as VideoConfig['model']) || DEFAULT_CONFIG.model,
    secondsPerPanel: args.duration || DEFAULT_CONFIG.secondsPerPanel,
    addSubtitles: !args.noSubtitles,
    addMusic: !args.noMusic,
    musicTrack: args.musicTrack,
  };

  // Get panels
  const panels = args.scriptPath
    ? parsePanelsFromScript(args.scriptPath)
    : parsePanelsFromDirectory(args.panelsDir!);

  // Verify panels exist
  const missingPanels = panels.filter(p => !fs.existsSync(p.imagePath));
  if (missingPanels.length > 0) {
    console.error(`❌ Missing panel images:`);
    missingPanels.forEach(p => console.error(`   ${p.imagePath}`));
    console.error(`\n   Run generate-full-comic.ts first to create panel images.`);
    process.exit(1);
  }

  // Calculate costs
  const totalSeconds = panels.length * config.secondsPerPanel;
  const modelInfo = MODEL_ENDPOINTS[config.model];
  const estimatedCost = totalSeconds * modelInfo.costPerSec;

  console.log(`\n🎬 Atlas Comic → Video Pipeline`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   📁 Panels: ${panels.length}`);
  console.log(`   🎥 Model: ${config.model} ($${modelInfo.costPerSec}/sec)`);
  console.log(`   ⏱️  Duration: ${config.secondsPerPanel}s per panel × ${panels.length} panels = ${totalSeconds}s total`);
  console.log(`   💰 Estimated cost: $${estimatedCost.toFixed(2)}`);
  console.log(`   📝 Subtitles: ${config.addSubtitles ? 'yes' : 'no'}`);
  console.log(`   🎵 Music: ${config.addMusic ? 'yes' : 'no'}`);
  console.log('');

  if (args.dryRun) {
    console.log('🏁 Dry run complete.');
    panels.forEach(p => {
      console.log(`   Panel ${p.number}: ${path.basename(p.imagePath)} — "${p.text.substring(0, 50)}"`);
    });
    return;
  }

  // Step 1: Animate each panel
  console.log(`${'═'.repeat(50)}`);
  console.log(`📸 STEP 1: Animate panels (${panels.length} × ${config.secondsPerPanel}s)`);
  console.log(`${'═'.repeat(50)}\n`);

  const clipDir = path.resolve(PROJECT_ROOT, 'tmp', 'video-clips');
  if (fs.existsSync(clipDir)) fs.rmSync(clipDir, { recursive: true });
  fs.mkdirSync(clipDir, { recursive: true });

  const clips: AnimatedClip[] = [];

  for (const panel of panels) {
    const clipPath = path.join(clipDir, `clip-${String(panel.number).padStart(2, '0')}.mp4`);
    
    try {
      const clip = await animatePanel(panel, config, clipPath);
      clips.push(clip);
    } catch (err: any) {
      console.error(`   ❌ Panel ${panel.number} failed: ${err.message}`);
      // Skip failed panels
    }

    // Rate limit between panels
    if (panel.number < panels.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  if (clips.length === 0) {
    console.error('❌ No clips generated. Aborting.');
    process.exit(1);
  }

  // Step 2: Stitch into final video
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🎞️  STEP 2: Stitch + overlay`);
  console.log(`${'═'.repeat(50)}`);

  const scriptBasename = args.scriptPath
    ? path.basename(args.scriptPath, '.md')
    : path.basename(args.panelsDir!);
  const outputPath = args.output || `videos/${scriptBasename}.mp4`;

  stitchVideos(clips, config, outputPath);

  // Step 3: Upload to S3
  console.log(`\n   ⬆️  Uploading to S3...`);
  const resolvedOutput = path.resolve(PROJECT_ROOT, outputPath);
  const s3Key = `atlas-studio/videos/${path.basename(outputPath)}`;
  const s3Url = await uploadToS3(resolvedOutput, s3Key);
  console.log(`   ✅ Uploaded: ${s3Url}`);

  // Summary
  const finalSize = fs.statSync(resolvedOutput).size;
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 VIDEO COMPLETE`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   📁 Local: ${resolvedOutput}`);
  console.log(`   ☁️  S3: ${s3Url}`);
  console.log(`   📐 Panels: ${clips.length}/${panels.length} animated`);
  console.log(`   ⏱️  Duration: ~${clips.length * config.secondsPerPanel}s`);
  console.log(`   📦 Size: ${(finalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   💰 Cost: ~$${estimatedCost.toFixed(2)}`);

  // Cleanup clips
  fs.rmSync(clipDir, { recursive: true });
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
