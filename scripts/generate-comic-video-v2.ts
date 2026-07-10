/**
 * generate-comic-video-v2.ts — Comic Strip → Animated Video Pipeline (V2)
 *
 * UPGRADES from v1:
 * - Crossfade transitions between panels (0.5s dissolve)
 * - TTS voiceover (Atlas narrates the speech bubble text)
 * - Consistent background music track (full duration)
 * - Kling V3 audio DISABLED (no per-panel AI audio)
 *
 * Usage:
 *   npx tsx scripts/generate-comic-video-v2.ts --script comics/scripts/comic-001.md
 *   npx tsx scripts/generate-comic-video-v2.ts --script comics/scripts/comic-001.md --voice atlas
 *   npx tsx scripts/generate-comic-video-v2.ts --script comics/scripts/comic-001.md --no-voice --no-music
 *
 * Prerequisites:
 *   - FAL_KEY in .env
 *   - Panel images already generated (via generate-full-comic.ts)
 *   - ffmpeg-static (npm install ffmpeg-static)
 *   - AWS credentials for S3 upload
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fal } from '@fal-ai/client';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const FAL_KEY = process.env.FAL_KEY || '';
const S3_BUCKET = 'collectiverse-assets';
const S3_REGION = 'us-east-1';
const s3 = new S3Client({ region: S3_REGION });
const FFMPEG = ffmpegPath || 'ffmpeg';

fal.config({ credentials: FAL_KEY });

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

interface VideoConfig {
  model: 'kling-v3' | 'kling-v2.1';
  secondsPerPanel: number;
  crossfadeDuration: number;
  addVoice: boolean;
  addMusic: boolean;
  musicTrack?: string;
  voiceModel: string;
}

const DEFAULT_CONFIG: VideoConfig = {
  model: 'kling-v3',
  secondsPerPanel: 5,
  crossfadeDuration: 0.5,
  addVoice: true,
  addMusic: true,
  voiceModel: 'fal-ai/minimax/speech-02-hd', // $0.10/1000 chars, high quality
};

const MODEL_ENDPOINTS: Record<string, { endpoint: string; costPerSec: number }> = {
  'kling-v3': { endpoint: 'fal-ai/kling-video/v3/standard/image-to-video', costPerSec: 0.084 },
  'kling-v2.1': { endpoint: 'fal-ai/kling-video/v2.1/standard/image-to-video', costPerSec: 0.056 },
};

// Atlas voice description for TTS
const ATLAS_VOICE_PROMPT = 'A friendly, enthusiastic young male robot voice — warm, encouraging, slightly playful. Like a knowledgeable guide who is genuinely excited to share collecting wisdom. Clear enunciation, moderate pace, slight digital warmth.';

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
  audioPath?: string;
  duration: number;
  text: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  return {
    scriptPath: get('--script'),
    output: get('--output'),
    model: get('--model'),
    duration: get('--duration') ? parseInt(get('--duration')!, 10) : undefined,
    noVoice: has('--no-voice'),
    noMusic: has('--no-music'),
    musicTrack: get('--music'),
    dryRun: has('--dry-run'),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT PARSER
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

// ═══════════════════════════════════════════════════════════════════════════════
// TTS — Generate Atlas voiceover for each panel
// ═══════════════════════════════════════════════════════════════════════════════

async function generateVoiceover(text: string, outputPath: string): Promise<void> {
  if (!text || text.trim() === '') return;

  const result = await fal.subscribe('fal-ai/minimax/speech-02-hd', {
    input: {
      text: text,
      voice_setting: {
        speed: 0.95,  // Slightly slower for clarity
        vol: 1.0,
        pitch: 0,
      },
    },
    pollInterval: 3000,
  }) as any;

  const audioUrl = result.data?.audio?.url || result.audio?.url;
  if (!audioUrl) {
    console.log(`      ⚠️  No audio URL returned for: "${text.substring(0, 30)}..."`);
    return;
  }

  const audioResponse = await fetch(audioUrl);
  const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());
  fs.writeFileSync(outputPath, audioBuffer);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL ANIMATION (same as v1 — uses cached clips)
// ═══════════════════════════════════════════════════════════════════════════════

async function animatePanel(
  panel: PanelInfo,
  config: VideoConfig,
  outputPath: string
): Promise<AnimatedClip> {
  const modelInfo = MODEL_ENDPOINTS[config.model];

  // Upload image to Fal.ai CDN
  const imageBuffer = fs.readFileSync(panel.imagePath);
  const imageFile = new File([imageBuffer], path.basename(panel.imagePath), { type: 'image/png' });
  const imageUrl = await fal.storage.upload(imageFile);

  const motionPrompt = panel.prompt
    ? `Subtle cinematic motion: ${panel.prompt}. Slow camera push-in, character breathing, ambient movement.`
    : 'Subtle cinematic motion: slow camera push-in, character breathing, ambient particle movement.';

  console.log(`   🎬 Animating panel ${panel.number} (${config.secondsPerPanel}s)...`);

  const result = await fal.subscribe(modelInfo.endpoint, {
    input: {
      start_image_url: imageUrl,
      prompt: motionPrompt,
      duration: config.secondsPerPanel,
      aspect_ratio: '1:1',
      generate_audio: false, // NO per-panel audio — we add our own
    },
    pollInterval: 5000,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        process.stdout.write(`      ⏳ Processing...\r`);
      }
    },
  }) as any;

  const videoUrl = result.data?.video?.url || result.video?.url || result.data?.video_url;
  if (!videoUrl) throw new Error(`No video URL for panel ${panel.number}`);

  const videoResponse = await fetch(videoUrl);
  const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());
  fs.writeFileSync(outputPath, videoBuffer);

  console.log(`      ✅ Panel ${panel.number} done`);

  return { panelNumber: panel.number, videoPath: outputPath, duration: config.secondsPerPanel, text: panel.text };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FFMPEG STITCHING (V2 — crossfades + audio)
// ═══════════════════════════════════════════════════════════════════════════════

function stitchWithCrossfades(
  clips: AnimatedClip[],
  voiceDir: string,
  config: VideoConfig,
  outputPath: string
): void {
  console.log(`\n   🎞️  Stitching ${clips.length} clips with crossfades...`);

  const tmpDir = path.resolve(PROJECT_ROOT, 'tmp', 'video-stitch-v2');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  // Step 1: Concatenate video clips with crossfade transitions
  // Build complex filter for crossfades
  const cf = config.crossfadeDuration;
  
  if (clips.length <= 1) {
    fs.copyFileSync(clips[0].videoPath, path.join(tmpDir, 'video.mp4'));
  } else {
    // Simple concat with xfade filter between each pair
    // For 10 clips with 0.5s crossfade each:
    // Total duration = (10 * 5) - (9 * 0.5) = 45.5s
    
    // Build input list
    const inputs = clips.map(c => `-i "${c.videoPath}"`).join(' ');
    
    // Build xfade filter chain
    let filterParts: string[] = [];
    let currentStream = '[0:v]';
    
    for (let i = 1; i < clips.length; i++) {
      const offset = (i * config.secondsPerPanel) - (i * cf);
      const outLabel = i < clips.length - 1 ? `[v${i}]` : '[vout]';
      filterParts.push(`${currentStream}[${i}:v]xfade=transition=fade:duration=${cf}:offset=${offset.toFixed(1)}${outLabel}`);
      currentStream = outLabel;
    }
    
    const filterComplex = filterParts.join(';');
    const videoCmd = `"${FFMPEG}" -y ${inputs} -filter_complex "${filterComplex}" -map "[vout]" -c:v libx264 -preset fast -crf 23 "${path.join(tmpDir, 'video.mp4')}" 2>&1`;
    
    try {
      execSync(videoCmd, { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
      console.log(`      ✅ Crossfade transitions applied`);
    } catch (err: any) {
      // Fallback to simple concat if crossfade fails
      console.log(`      ⚠️  Crossfade failed, using simple concat`);
      const fileListPath = path.join(tmpDir, 'files.txt');
      const fileList = clips.map(c => `file '${c.videoPath.replace(/\\/g, '/')}'`).join('\n');
      fs.writeFileSync(fileListPath, fileList);
      execSync(`"${FFMPEG}" -y -f concat -safe 0 -i "${fileListPath}" -c:v libx264 -preset fast -crf 23 "${path.join(tmpDir, 'video.mp4')}" 2>&1`, { stdio: 'pipe' });
    }
  }

  let currentOutput = path.join(tmpDir, 'video.mp4');

  // Step 2: Generate and merge voiceover audio
  if (config.addVoice && fs.existsSync(voiceDir)) {
    const voiceFiles = fs.readdirSync(voiceDir).filter(f => f.endsWith('.mp3') || f.endsWith('.wav')).sort();
    
    if (voiceFiles.length > 0) {
      console.log(`      🎙️  Merging ${voiceFiles.length} voiceover clips...`);
      
      // Concatenate all voice clips with silence gaps
      const voiceListPath = path.join(tmpDir, 'voice-files.txt');
      const silencePath = path.join(tmpDir, 'silence.wav');
      
      // Create 0.5s silence file for gaps
      execSync(`"${FFMPEG}" -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 "${silencePath}" 2>&1`, { stdio: 'pipe' });
      
      // Interleave voice + silence
      const voiceListContent = voiceFiles.map(f => {
        return `file '${path.join(voiceDir, f).replace(/\\/g, '/')}'\nfile '${silencePath.replace(/\\/g, '/')}'`;
      }).join('\n');
      fs.writeFileSync(voiceListPath, voiceListContent);
      
      const voiceConcatPath = path.join(tmpDir, 'voice-full.wav');
      try {
        execSync(`"${FFMPEG}" -y -f concat -safe 0 -i "${voiceListPath}" -c:a pcm_s16le "${voiceConcatPath}" 2>&1`, { stdio: 'pipe' });
        
        // Merge voice onto video
        const withVoicePath = path.join(tmpDir, 'with-voice.mp4');
        execSync(`"${FFMPEG}" -y -i "${currentOutput}" -i "${voiceConcatPath}" -c:v copy -c:a aac -b:a 128k -shortest "${withVoicePath}" 2>&1`, { stdio: 'pipe' });
        currentOutput = withVoicePath;
        console.log(`      ✅ Voiceover merged`);
      } catch {
        console.log(`      ⚠️  Voice merge failed — continuing without voiceover`);
      }
    }
  }

  // Step 3: Add background music (low volume, under voice)
  if (config.addMusic && config.musicTrack && fs.existsSync(config.musicTrack)) {
    console.log(`      🎵 Adding background music...`);
    const withMusicPath = path.join(tmpDir, 'final.mp4');
    const musicVol = config.addVoice ? '0.15' : '0.4'; // Lower music if voice is present
    
    try {
      execSync(`"${FFMPEG}" -y -i "${currentOutput}" -i "${config.musicTrack}" -filter_complex "[1:a]volume=${musicVol},afade=t=out:st=45:d=3[music];[0:a][music]amix=inputs=2:duration=first[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest "${withMusicPath}" 2>&1`, { stdio: 'pipe' });
      currentOutput = withMusicPath;
      console.log(`      ✅ Background music added`);
    } catch {
      console.log(`      ⚠️  Music overlay failed — continuing without music`);
    }
  }

  // Copy final output
  const resolvedOutput = path.resolve(PROJECT_ROOT, outputPath);
  const outputDir = path.dirname(resolvedOutput);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.copyFileSync(currentOutput, resolvedOutput);

  // Cleanup temp (keep clips)
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`      ✅ Final video → ${resolvedOutput}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  const args = parseArgs();

  if (!args.scriptPath) {
    console.error(`
🎬 Atlas Comic → Video Pipeline V2 (Full Upgrade)
════════════════════════════════════════════════════════

Features: Crossfade transitions + TTS voiceover + Background music

Usage:
  npx tsx scripts/generate-comic-video-v2.ts --script comics/scripts/comic-001.md

Options:
  --script <path>      Comic script .md file
  --output <path>      Output video path (default: videos/{name}-v2.mp4)
  --model <name>       kling-v3 (default), kling-v2.1
  --duration <sec>     Seconds per panel (default: 5)
  --no-voice           Skip TTS voiceover
  --no-music           Skip background music
  --music <path>       Custom background music file
  --dry-run            Show plan without generating
`);
    process.exit(1);
  }

  if (!FAL_KEY) {
    console.error('❌ FAL_KEY not set in .env');
    process.exit(1);
  }

  const config: VideoConfig = {
    ...DEFAULT_CONFIG,
    model: (args.model as VideoConfig['model']) || DEFAULT_CONFIG.model,
    secondsPerPanel: args.duration || DEFAULT_CONFIG.secondsPerPanel,
    addVoice: !args.noVoice,
    addMusic: !args.noMusic,
    musicTrack: args.musicTrack || path.resolve(PROJECT_ROOT, 'assets/music/atlas-theme-upbeat.mp3'),
  };

  const panels = parsePanelsFromScript(args.scriptPath);
  const scriptBasename = path.basename(args.scriptPath, '.md');

  // Check panel images exist
  const missingPanels = panels.filter(p => !fs.existsSync(p.imagePath));
  if (missingPanels.length > 0) {
    console.error(`❌ Missing panel images. Run generate-full-comic.ts first.`);
    process.exit(1);
  }

  const totalSeconds = panels.length * config.secondsPerPanel;
  const modelInfo = MODEL_ENDPOINTS[config.model];
  const videoCost = totalSeconds * modelInfo.costPerSec;
  const voiceChars = panels.reduce((sum, p) => sum + p.text.length, 0);
  const voiceCost = config.addVoice ? (voiceChars / 1000) * 0.10 : 0;

  console.log(`\n🎬 Atlas Comic → Video Pipeline V2`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   📁 Panels: ${panels.length}`);
  console.log(`   🎥 Video: ${config.model} (${config.secondsPerPanel}s/panel)`);
  console.log(`   🔀 Transitions: ${config.crossfadeDuration}s crossfade`);
  console.log(`   🎙️  Voice: ${config.addVoice ? 'yes' : 'no'} (${voiceChars} chars)`);
  console.log(`   🎵 Music: ${config.addMusic ? 'yes' : 'no'}`);
  console.log(`   💰 Est. cost: $${(videoCost + voiceCost).toFixed(2)} (video: $${videoCost.toFixed(2)}, voice: $${voiceCost.toFixed(2)})`);
  console.log(`   ⏱️  Est. duration: ~${(totalSeconds - (panels.length - 1) * config.crossfadeDuration).toFixed(0)}s`);
  console.log('');

  if (args.dryRun) {
    console.log('🏁 Dry run complete.');
    return;
  }

  // Step 1: Animate panels (uses cache)
  console.log(`${'═'.repeat(50)}`);
  console.log(`📸 STEP 1: Animate panels`);
  console.log(`${'═'.repeat(50)}\n`);

  const clipDir = path.resolve(PROJECT_ROOT, 'generated', scriptBasename, 'clips');
  fs.mkdirSync(clipDir, { recursive: true });

  const clips: AnimatedClip[] = [];
  for (const panel of panels) {
    const clipPath = path.join(clipDir, `clip-${String(panel.number).padStart(2, '0')}.mp4`);

    if (fs.existsSync(clipPath)) {
      console.log(`   ⏭️  Panel ${panel.number} — cached`);
      clips.push({ panelNumber: panel.number, videoPath: clipPath, duration: config.secondsPerPanel, text: panel.text });
      continue;
    }

    try {
      const clip = await animatePanel(panel, config, clipPath);
      clips.push(clip);
    } catch (err: any) {
      console.error(`   ❌ Panel ${panel.number} failed: ${err.message}`);
    }

    if (panel.number < panels.length) await new Promise(r => setTimeout(r, 2000));
  }

  if (clips.length === 0) {
    console.error('❌ No clips. Aborting.');
    process.exit(1);
  }

  // Step 2: Generate voiceover
  const voiceDir = path.resolve(PROJECT_ROOT, 'generated', scriptBasename, 'voice');
  if (config.addVoice) {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`🎙️  STEP 2: Generate voiceover`);
    console.log(`${'═'.repeat(50)}\n`);

    fs.mkdirSync(voiceDir, { recursive: true });

    for (const clip of clips) {
      if (!clip.text) continue;
      const voicePath = path.join(voiceDir, `voice-${String(clip.panelNumber).padStart(2, '0')}.mp3`);

      if (fs.existsSync(voicePath)) {
        console.log(`   ⏭️  Panel ${clip.panelNumber} voice — cached`);
        continue;
      }

      console.log(`   🎙️  Panel ${clip.panelNumber}: "${clip.text.substring(0, 50)}..."`);
      try {
        await generateVoiceover(clip.text, voicePath);
        console.log(`      ✅ Voice generated`);
      } catch (err: any) {
        console.log(`      ⚠️  TTS failed: ${err.message}`);
      }

      await new Promise(r => setTimeout(r, 1000)); // Rate limit
    }
  }

  // Step 3: Stitch with crossfades + audio
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🎞️  STEP 3: Stitch + transitions + audio`);
  console.log(`${'═'.repeat(50)}`);

  const outputPath = args.output || `videos/${scriptBasename}-v2.mp4`;
  stitchWithCrossfades(clips, voiceDir, config, outputPath);

  // Step 4: Upload to S3
  const resolvedOutput = path.resolve(PROJECT_ROOT, outputPath);
  console.log(`\n   ⬆️  Uploading to S3...`);
  const s3Key = `atlas-studio/videos/${path.basename(outputPath)}`;
  const videoBuffer = fs.readFileSync(resolvedOutput);
  await s3.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: s3Key, Body: videoBuffer, ContentType: 'video/mp4' }));
  const s3Url = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`;
  console.log(`   ✅ ${s3Url}`);

  // Summary
  const finalSize = fs.statSync(resolvedOutput).size;
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 VIDEO V2 COMPLETE`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   📁 Local: ${resolvedOutput}`);
  console.log(`   ☁️  S3: ${s3Url}`);
  console.log(`   📦 Size: ${(finalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   💰 Cost: ~$${(videoCost + voiceCost).toFixed(2)}`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message || err);
  process.exit(1);
});
