/**
 * compose-comic-panel.ts — PROFESSIONAL Comic Book Panel Compositor
 *
 * Produces real comic-book-quality panels and strips with:
 *   • Elliptical speech bubbles with bold black strokes & organic pointed tails
 *   • All-caps hand-lettering-style bold typography
 *   • Rich, layered backgrounds (halftone, wood-grain, speed lines, etc.)
 *   • Proper panel borders, gutters, and inner shadows
 *   • 4-panel strip compositor (2×2 grid or 1×4 horizontal)
 *   • SFX text, narration boxes, thought bubbles, yell/starburst bubbles
 *
 * Usage (single panel):
 *   npx tsx scripts/compose-comic-panel.ts \
 *     --character generated/atlas-pointing.png \
 *     --text "Hey collectors! Let me tell you about ROOKIE CARDS!" \
 *     --background "card-shop" \
 *     --bubble-position "top-right" \
 *     --bubble-type "speech" \
 *     --output comics/panels/panel-001.png \
 *     --size 1080x1080
 *
 * Usage (4-panel strip):
 *   npx tsx scripts/compose-comic-panel.ts --strip \
 *     --title "Atlas Tips #001: Rookie Cards" \
 *     --layout grid \
 *     --panel1-character generated/atlas-pointing.png \
 *     --panel1-text "Hey collectors!" \
 *     --panel1-bg "card-shop" \
 *     --panel2-character generated/atlas-thinking.png \
 *     --panel2-text "A rookie card is a player's FIRST officially licensed card..." \
 *     --panel2-bg "card-shop" \
 *     --panel3-character generated/atlas-explaining.png \
 *     --panel3-text "NAR:The value depends on condition, scarcity, and demand." \
 *     --panel3-bg "collectors-study" \
 *     --panel4-character generated/atlas-thumbsup.png \
 *     --panel4-text "Now you know! Happy collecting!" \
 *     --panel4-bg "card-shop" \
 *     --output comics/comic-001.png
 *
 * Usage (batch from markdown):
 *   npx tsx scripts/compose-comic-panel.ts --batch comics/scripts/comic-001.md
 */

import 'dotenv/config';
import { createCanvas, loadImage, Canvas, CanvasRenderingContext2D, Image } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS — Professional Comic Book Color Palette
// ═══════════════════════════════════════════════════════════════════════════════

const COMIC = {
  border: '#000000',
  panelBg: '#FFFFFF',
  bubbleFill: '#FEFEFE',
  bubbleStroke: '#000000',
  bubbleStrokeWidth: 2.5,
  dialogueColor: '#000000',
  narrationBg: '#1B2B5E',
  narrationText: '#FFFFFF',
  sfxColor: '#E63946',
  sfxOutline: '#000000',
  emphasisFill: '#FFF8DC',
  titleBarBg: '#1B2B5E',
  titleBarText: '#FFFFFF',
  watermarkColor: '#000000',
  watermarkOpacity: 0.25,
  gutterWidth: 8,
  outerBorder: 4,
  panelBorder: 3,
  panelRadius: 3,
  titleBarHeight: 42,
} as const;

// Comic lettering fonts — bold weights that mimic hand lettering
const FONT_DIALOGUE = 'bold "Arial Black", "Impact", "Helvetica Neue", Arial, sans-serif';
const FONT_NARRATION = 'italic bold "Georgia", "Times New Roman", serif';
const FONT_SFX = 'bold "Impact", "Arial Black", sans-serif';
const FONT_TITLE = 'bold "Arial Black", "Impact", sans-serif';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type BubbleType = 'speech' | 'thought' | 'yell' | 'narration';
type BubblePosition = 'top' | 'top-right' | 'top-left';
type StripLayout = 'grid' | 'horizontal';
type BackgroundPreset = 'card-shop' | 'collectors-study' | 'vault' | 'convention'
  | 'outdoor' | 'spotlight' | 'action' | 'halftone' | 'white';

interface PanelConfig {
  character: string;
  text: string;
  background: string;
  bubblePosition: BubblePosition;
  bubbleType: BubbleType;
  panelNumber?: number;
}

interface SinglePanelArgs {
  mode: 'single';
  config: PanelConfig;
  output: string;
  width: number;
  height: number;
  caption?: string;
  noWatermark?: boolean;
}

interface StripArgs {
  mode: 'strip';
  title?: string;
  layout: StripLayout;
  panels: PanelConfig[];
  output: string;
  noWatermark?: boolean;
}

interface BatchArgs {
  mode: 'batch';
  scriptPath: string;
}

type ParsedArgs = SinglePanelArgs | StripArgs | BatchArgs;

// ═══════════════════════════════════════════════════════════════════════════════
// ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════════

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const get = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };
  const has = (flag: string): boolean => args.includes(flag);

  // Batch mode
  if (get('--batch')) {
    return { mode: 'batch', scriptPath: get('--batch')! };
  }

  // Strip mode
  if (has('--strip')) {
    const panels: PanelConfig[] = [];
    for (let i = 1; i <= 4; i++) {
      const character = get(`--panel${i}-character`);
      const text = get(`--panel${i}-text`);
      const bg = get(`--panel${i}-bg`) || 'white';
      const bt = (get(`--panel${i}-bubble-type`) || 'speech') as BubbleType;
      if (character && text) {
        panels.push({
          character,
          text,
          background: bg,
          bubblePosition: i % 2 === 1 ? 'top-right' : 'top-left',
          bubbleType: bt,
          panelNumber: i,
        });
      }
    }

    if (panels.length === 0) {
      console.error('❌ Strip mode requires at least --panel1-character and --panel1-text');
      process.exit(1);
    }

    return {
      mode: 'strip',
      title: get('--title'),
      layout: (get('--layout') || 'grid') as StripLayout,
      panels,
      output: get('--output') || 'comics/strip-output.png',
      noWatermark: has('--no-watermark'),
    };
  }

  // Single panel mode
  const character = get('--character');
  const text = get('--text');
  const output = get('--output');

  if (!character || !text || !output) {
    printUsage();
    process.exit(1);
  }

  const sizeStr = get('--size') || '1080x1080';
  const [wStr, hStr] = sizeStr.split('x');

  return {
    mode: 'single',
    config: {
      character,
      text,
      background: get('--background') || 'white',
      bubblePosition: (get('--bubble-position') || 'top-right') as BubblePosition,
      bubbleType: (get('--bubble-type') || 'speech') as BubbleType,
    },
    output,
    width: parseInt(wStr, 10) || 1080,
    height: parseInt(hStr, 10) || 1080,
    caption: get('--caption'),
    noWatermark: has('--no-watermark'),
  };
}

function printUsage(): void {
  console.error(`
╔══════════════════════════════════════════════════════════════════╗
║  🦸 Atlas Comic Panel Compositor — PROFESSIONAL EDITION        ║
╚══════════════════════════════════════════════════════════════════╝

Single Panel:
  npx tsx scripts/compose-comic-panel.ts \\
    --character <path>         Character PNG
    --text <string>            Dialogue (ALL CAPS auto-applied)
    --output <path>            Output file path
    --background <preset>      card-shop|collectors-study|vault|convention|
                               outdoor|spotlight|action|halftone|white|#hex
    --size <WxH>               Default 1080x1080
    --bubble-position <pos>    top|top-right|top-left
    --bubble-type <type>       speech|thought|yell|narration
    --caption <string>         Bottom caption bar text

Strip Mode (4-panel):
  npx tsx scripts/compose-comic-panel.ts --strip \\
    --title "Atlas Tips #001" \\
    --layout grid|horizontal \\
    --panel1-character <path> --panel1-text "..." --panel1-bg "card-shop" \\
    --panel2-character <path> --panel2-text "..." --panel2-bg "card-shop" \\
    --panel3-character <path> --panel3-text "..." --panel3-bg "vault" \\
    --panel4-character <path> --panel4-text "..." --panel4-bg "card-shop" \\
    --output comics/comic-001.png

Batch Mode:
  npx tsx scripts/compose-comic-panel.ts --batch comics/scripts/comic-001.md

Special text prefixes:
  SFX:CRASH!     → Renders as big tilted comic SFX (no bubble)
  NAR:Once...    → Renders in narration caption box (navy bg, white text)
`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND RENDERERS — Rich, layered comic book environments
// ═══════════════════════════════════════════════════════════════════════════════

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, bg: string): void {
  // Clear to white first
  ctx.fillStyle = COMIC.panelBg;
  ctx.fillRect(0, 0, w, h);

  switch (bg) {
    case 'card-shop':
      drawBgCardShop(ctx, w, h);
      break;
    case 'collectors-study':
      drawBgCollectorsStudy(ctx, w, h);
      break;
    case 'vault':
      drawBgVault(ctx, w, h);
      break;
    case 'convention':
      drawBgConvention(ctx, w, h);
      break;
    case 'outdoor':
      drawBgOutdoor(ctx, w, h);
      break;
    case 'spotlight':
      drawBgSpotlight(ctx, w, h);
      break;
    case 'action':
      drawBgAction(ctx, w, h);
      break;
    case 'halftone':
      drawBgHalftone(ctx, w, h);
      break;
    case 'white':
      // Already white
      break;
    default:
      if (bg.startsWith('#')) {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
      }
      break;
  }
}

function drawBgCardShop(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Warm interior base
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#FFF5E6');
  grad.addColorStop(1, '#F5E6D0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Wood-grain parallel lines (floor/counter feel)
  ctx.strokeStyle = 'rgba(139, 90, 43, 0.08)';
  ctx.lineWidth = 1;
  for (let y = h * 0.6; y < h; y += 6) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.1) * 2);
    ctx.lineTo(w, y + Math.sin(y * 0.1 + 1) * 2);
    ctx.stroke();
  }

  // Display case silhouettes (rectangular shapes on back wall)
  ctx.strokeStyle = 'rgba(100, 60, 20, 0.12)';
  ctx.lineWidth = 2;
  const caseW = w * 0.2;
  const caseH = h * 0.35;
  for (let i = 0; i < 3; i++) {
    const cx = w * 0.12 + i * (caseW + w * 0.08);
    const cy = h * 0.08;
    ctx.strokeRect(cx, cy, caseW, caseH);
    // Shelf lines inside cases
    for (let s = 1; s <= 3; s++) {
      ctx.beginPath();
      ctx.moveTo(cx, cy + (caseH / 4) * s);
      ctx.lineTo(cx + caseW, cy + (caseH / 4) * s);
      ctx.stroke();
    }
  }

  // Warm ambient glow from top-left (ceiling light)
  const glow = ctx.createRadialGradient(w * 0.3, 0, 0, w * 0.3, 0, h * 0.6);
  glow.addColorStop(0, 'rgba(255, 220, 150, 0.1)');
  glow.addColorStop(1, 'rgba(255, 220, 150, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
}

function drawBgCollectorsStudy(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Cozy room base
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#FFF8F0');
  grad.addColorStop(1, '#F0E8D8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Bookshelf silhouettes on wall
  ctx.fillStyle = 'rgba(80, 50, 20, 0.06)';
  const shelfW = w * 0.85;
  const shelfX = (w - shelfW) / 2;
  for (let row = 0; row < 3; row++) {
    const sy = h * 0.05 + row * h * 0.2;
    const sh = h * 0.15;
    ctx.fillRect(shelfX, sy, shelfW, sh);
    // Individual book spines
    ctx.fillStyle = 'rgba(60, 30, 10, 0.04)';
    let bx = shelfX + 4;
    while (bx < shelfX + shelfW - 10) {
      const bw = 8 + Math.random() * 14;
      ctx.fillRect(bx, sy + 2, bw, sh - 4);
      bx += bw + 2;
    }
    ctx.fillStyle = 'rgba(80, 50, 20, 0.06)';
  }

  // Warm lamp glow in corner (radial gradient)
  const lamp = ctx.createRadialGradient(w * 0.85, h * 0.7, 0, w * 0.85, h * 0.7, w * 0.4);
  lamp.addColorStop(0, 'rgba(255, 200, 100, 0.15)');
  lamp.addColorStop(0.5, 'rgba(255, 200, 100, 0.05)');
  lamp.addColorStop(1, 'rgba(255, 200, 100, 0)');
  ctx.fillStyle = lamp;
  ctx.fillRect(0, 0, w, h);
}

function drawBgVault(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Dark dramatic gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0D1B2A');
  grad.addColorStop(1, '#1B2838');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Metallic grid lines
  ctx.strokeStyle = 'rgba(100, 150, 200, 0.08)';
  ctx.lineWidth = 1;
  const gridSpacing = 40;
  for (let x = 0; x <= w; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Subtle lens flare / glow accent (upper right)
  const flare = ctx.createRadialGradient(w * 0.75, h * 0.2, 0, w * 0.75, h * 0.2, w * 0.3);
  flare.addColorStop(0, 'rgba(100, 200, 255, 0.12)');
  flare.addColorStop(0.3, 'rgba(100, 200, 255, 0.04)');
  flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flare;
  ctx.fillRect(0, 0, w, h);
}

function drawBgConvention(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Energetic warm base
  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, w, h);

  // Colored banner shapes at top
  const bannerColors = ['rgba(230, 57, 70, 0.08)', 'rgba(74, 144, 217, 0.08)', 'rgba(245, 166, 35, 0.08)'];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = bannerColors[i];
    ctx.beginPath();
    ctx.moveTo(i * (w / 3), 0);
    ctx.lineTo((i + 1) * (w / 3), 0);
    ctx.lineTo((i + 1) * (w / 3) - 20, h * 0.12);
    ctx.lineTo(i * (w / 3) + 20, h * 0.12);
    ctx.closePath();
    ctx.fill();
  }

  // Halftone dot pattern overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
  const spacing = 18;
  for (let x = 0; x <= w; x += spacing) {
    for (let y = h * 0.15; y <= h; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawBgOutdoor(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Sky gradient top half
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  sky.addColorStop(0, '#87CEEB');
  sky.addColorStop(1, '#E0F0FF');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.55);

  // Green ground bottom half
  const ground = ctx.createLinearGradient(0, h * 0.5, 0, h);
  ground.addColorStop(0, '#7CB342');
  ground.addColorStop(1, '#558B2F');
  ctx.fillStyle = ground;
  ctx.fillRect(0, h * 0.5, w, h * 0.5);

  // Simple cloud shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  drawCloud(ctx, w * 0.2, h * 0.12, 50);
  drawCloud(ctx, w * 0.65, h * 0.08, 40);
  drawCloud(ctx, w * 0.85, h * 0.18, 30);
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
  ctx.arc(x + size * 1.4, y, size * 0.6, 0, Math.PI * 2);
  ctx.fill();
}

function drawBgSpotlight(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Dark base
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, w, h);

  // Dramatic circular spotlight
  const spot = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.45);
  spot.addColorStop(0, 'rgba(255, 255, 220, 0.35)');
  spot.addColorStop(0.4, 'rgba(255, 255, 200, 0.15)');
  spot.addColorStop(0.7, 'rgba(255, 255, 180, 0.05)');
  spot.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, w, h);
}

function drawBgAction(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Light base
  ctx.fillStyle = '#FFFDE8';
  ctx.fillRect(0, 0, w, h);

  // Radiating speed lines from center (manga impact style)
  const cx = w / 2;
  const cy = h / 2;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 2;
  const numLines = 60;
  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * Math.PI * 2;
    const innerR = Math.min(w, h) * 0.25;
    const outerR = Math.max(w, h) * 0.75;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
    ctx.stroke();
  }
}

function drawBgHalftone(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Light base
  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, w, h);

  // Classic Ben-Day dots (large, at angle — rotated grid)
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(Math.PI / 12); // ~15 degree angle
  ctx.fillStyle = 'rgba(230, 57, 70, 0.08)';
  const dotSpacing = 24;
  const dotRadius = 6;
  for (let x = -w; x <= w; x += dotSpacing) {
    for (let y = -h; y <= h; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER RENDERING
// ═══════════════════════════════════════════════════════════════════════════════

/** Removes near-white pixels from a canvas (for characters on white BG) */
function removeWhiteBackground(canvas: Canvas, threshold: number = 235): void {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    } else if (r >= threshold - 15 && g >= threshold - 15 && b >= threshold - 15) {
      const avg = (r + g + b) / 3;
      const fade = Math.max(0, (avg - (threshold - 15)) / 15);
      data[i + 3] = Math.round(data[i + 3] * (1 - fade));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draws character at proper comic framing:
 * - Fills 55-70% of panel height
 * - Positioned at rule-of-thirds (slightly off-center)
 * - Leaves room for speech bubble on the opposite side
 */
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  img: Image,
  panelW: number,
  panelH: number,
  bubblePosition: BubblePosition
): void {
  // Character fills ~65% of panel height (proper comic framing)
  const maxH = panelH * 0.65;
  const maxW = panelW * 0.6;
  const scale = Math.min(maxW / img.width, maxH / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;

  // Rule of thirds: position character OPPOSITE to the speech bubble
  let x: number;
  if (bubblePosition === 'top-right') {
    x = panelW * 0.12; // Character on left
  } else if (bubblePosition === 'top-left') {
    x = panelW - drawW - panelW * 0.12; // Character on right
  } else {
    x = (panelW - drawW) / 2; // Centered
  }
  const y = panelH - drawH - panelH * 0.03; // Anchored at bottom

  // Process character image (remove white BG if needed)
  const tempCanvas = createCanvas(Math.round(drawW), Math.round(drawH));
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0, drawW, drawH);
  removeWhiteBackground(tempCanvas);
  ctx.drawImage(tempCanvas, x, y);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPEECH BUBBLES — The heart of comic book art
// ═══════════════════════════════════════════════════════════════════════════════

/** Wraps text to fit within a max width, returns lines */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Draws an ELLIPTICAL speech bubble with organic pointed tail.
 * This is what separates amateur from professional comic art.
 */
function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  text: string,
  panelW: number,
  panelH: number,
  position: BubblePosition,
  bubbleType: BubbleType
): void {
  // Detect special text types
  if (text.startsWith('SFX:')) {
    drawSFX(ctx, text.slice(4), panelW, panelH);
    return;
  }
  if (text.startsWith('NAR:') || bubbleType === 'narration') {
    const narText = text.startsWith('NAR:') ? text.slice(4) : text;
    drawNarrationBox(ctx, narText, panelW, panelH);
    return;
  }

  // ALL CAPS — standard comic lettering convention
  const displayText = text.toUpperCase();

  // Font sizing proportional to panel
  const fontSize = Math.max(14, Math.round(panelW * 0.035));
  const lineHeight = fontSize * 1.25;
  ctx.font = `${fontSize}px ${FONT_DIALOGUE}`;

  // Measure text to determine bubble size
  const maxTextW = panelW * 0.52;
  const lines = wrapText(ctx, displayText, maxTextW);
  const textBlockH = lines.length * lineHeight;

  // Bubble dimensions — elliptical, with padding
  const padX = fontSize * 1.6;
  const padY = fontSize * 1.2;
  let bubbleW = 0;
  for (const line of lines) {
    bubbleW = Math.max(bubbleW, ctx.measureText(line).width);
  }
  bubbleW += padX * 2;
  const bubbleH = textBlockH + padY * 2;
  const rx = bubbleW / 2; // Ellipse X radius
  const ry = bubbleH / 2; // Ellipse Y radius

  // Position the bubble
  let cx: number, cy: number;
  const margin = panelW * 0.08;
  if (position === 'top-right') {
    cx = panelW - margin - rx;
    cy = margin + ry;
  } else if (position === 'top-left') {
    cx = margin + rx;
    cy = margin + ry;
  } else {
    cx = panelW / 2;
    cy = margin + ry;
  }

  // Draw based on bubble type
  if (bubbleType === 'yell') {
    drawStarburstBubble(ctx, cx, cy, rx, ry);
  } else {
    // Standard elliptical bubble
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = COMIC.bubbleFill;
    ctx.fill();
    ctx.strokeStyle = COMIC.bubbleStroke;
    ctx.lineWidth = COMIC.bubbleStrokeWidth;
    ctx.stroke();
  }

  // Draw tail
  if (bubbleType === 'thought') {
    drawThoughtTail(ctx, cx, cy + ry, position, panelW, panelH);
  } else {
    drawSpeechTail(ctx, cx, cy + ry, position, panelW, panelH);
  }

  // Draw text — centered in the ellipse, pure black, ALL CAPS
  ctx.fillStyle = COMIC.dialogueColor;
  ctx.font = `${fontSize}px ${FONT_DIALOGUE}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const textStartY = cy - (textBlockH / 2) + lineHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], cx, textStartY + i * lineHeight);
  }
}

/**
 * Organic pointed tail — slightly curved, aimed at character's head area.
 * NOT a rigid geometric triangle.
 */
function drawSpeechTail(
  ctx: CanvasRenderingContext2D,
  bubbleCx: number,
  bubbleBottom: number,
  position: BubblePosition,
  panelW: number,
  panelH: number
): void {
  // Tail points toward the character (opposite side of bubble)
  let targetX: number, targetY: number;
  if (position === 'top-right') {
    targetX = panelW * 0.3;
    targetY = panelH * 0.55;
  } else if (position === 'top-left') {
    targetX = panelW * 0.7;
    targetY = panelH * 0.55;
  } else {
    targetX = panelW * 0.5;
    targetY = panelH * 0.6;
  }

  const tailBaseW = 14; // Width at bubble edge
  ctx.fillStyle = COMIC.bubbleFill;
  ctx.strokeStyle = COMIC.bubbleStroke;
  ctx.lineWidth = COMIC.bubbleStrokeWidth;

  // Organic curved tail using bezier curves
  ctx.beginPath();
  ctx.moveTo(bubbleCx - tailBaseW / 2, bubbleBottom - 2);
  ctx.quadraticCurveTo(
    bubbleCx - tailBaseW * 0.3,
    bubbleBottom + (targetY - bubbleBottom) * 0.5,
    targetX,
    targetY
  );
  ctx.quadraticCurveTo(
    bubbleCx + tailBaseW * 0.3,
    bubbleBottom + (targetY - bubbleBottom) * 0.4,
    bubbleCx + tailBaseW / 2,
    bubbleBottom - 2
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Patch over the tail-bubble junction with fill to hide the stroke overlap
  ctx.fillStyle = COMIC.bubbleFill;
  ctx.beginPath();
  ctx.ellipse(bubbleCx, bubbleBottom - 4, tailBaseW * 0.8, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}

/** Thought bubble tail: chain of small circles leading to character */
function drawThoughtTail(
  ctx: CanvasRenderingContext2D,
  bubbleCx: number,
  bubbleBottom: number,
  position: BubblePosition,
  panelW: number,
  panelH: number
): void {
  let targetX: number, targetY: number;
  if (position === 'top-right') {
    targetX = panelW * 0.3;
    targetY = panelH * 0.55;
  } else if (position === 'top-left') {
    targetX = panelW * 0.7;
    targetY = panelH * 0.55;
  } else {
    targetX = panelW * 0.5;
    targetY = panelH * 0.6;
  }

  // 3-4 circles decreasing in size from bubble to character
  const circles = 4;
  for (let i = 1; i <= circles; i++) {
    const t = i / (circles + 1);
    const x = bubbleCx + (targetX - bubbleCx) * t;
    const y = bubbleBottom + (targetY - bubbleBottom) * t;
    const r = 10 - i * 2;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(r, 3), 0, Math.PI * 2);
    ctx.fillStyle = COMIC.bubbleFill;
    ctx.fill();
    ctx.strokeStyle = COMIC.bubbleStroke;
    ctx.lineWidth = COMIC.bubbleStrokeWidth;
    ctx.stroke();
  }
}

/** Jagged starburst shape for yelling/emphasis */
function drawStarburstBubble(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): void {
  const points = 14;
  const innerRx = rx * 0.78;
  const innerRy = ry * 0.78;
  const outerRx = rx * 1.15;
  const outerRy = ry * 1.15;

  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const isOuter = i % 2 === 0;
    const r_x = isOuter ? outerRx : innerRx;
    const r_y = isOuter ? outerRy : innerRy;
    const x = cx + Math.cos(angle) * r_x;
    const y = cy + Math.sin(angle) * r_y;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = COMIC.emphasisFill;
  ctx.fill();
  ctx.strokeStyle = COMIC.bubbleStroke;
  ctx.lineWidth = COMIC.bubbleStrokeWidth + 0.5;
  ctx.stroke();
}

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATION BOXES & SFX TEXT
// ═══════════════════════════════════════════════════════════════════════════════

/** Navy rectangle caption box at top of panel — white italic text */
function drawNarrationBox(
  ctx: CanvasRenderingContext2D,
  text: string,
  panelW: number,
  panelH: number
): void {
  const displayText = text.toUpperCase();
  const fontSize = Math.max(12, Math.round(panelW * 0.028));
  ctx.font = `${fontSize}px ${FONT_NARRATION}`;

  const padX = 16;
  const padY = 10;
  const maxW = panelW * 0.85;
  const lines = wrapText(ctx, displayText, maxW - padX * 2);
  const lineH = fontSize * 1.3;
  const boxH = lines.length * lineH + padY * 2;
  const boxW = Math.min(maxW, panelW * 0.8);
  const boxX = panelW * 0.04;
  const boxY = panelH * 0.03;

  // Navy background box with slight rounded corners
  ctx.fillStyle = COMIC.narrationBg;
  ctx.beginPath();
  const r = 3;
  ctx.moveTo(boxX + r, boxY);
  ctx.lineTo(boxX + boxW - r, boxY);
  ctx.arcTo(boxX + boxW, boxY, boxX + boxW, boxY + r, r);
  ctx.lineTo(boxX + boxW, boxY + boxH - r);
  ctx.arcTo(boxX + boxW, boxY + boxH, boxX + boxW - r, boxY + boxH, r);
  ctx.lineTo(boxX + r, boxY + boxH);
  ctx.arcTo(boxX, boxY + boxH, boxX, boxY + boxH - r, r);
  ctx.lineTo(boxX, boxY + r);
  ctx.arcTo(boxX, boxY, boxX + r, boxY, r);
  ctx.closePath();
  ctx.fill();

  // Black stroke
  ctx.strokeStyle = COMIC.bubbleStroke;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // White text
  ctx.fillStyle = COMIC.narrationText;
  ctx.font = `${fontSize}px ${FONT_NARRATION}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], boxX + padX, boxY + padY + i * lineH);
  }
}

/** Big tilted outlined SFX text (CRASH!, POW!, etc.) */
function drawSFX(
  ctx: CanvasRenderingContext2D,
  text: string,
  panelW: number,
  panelH: number
): void {
  const displayText = text.toUpperCase().trim();
  const fontSize = Math.round(panelW * 0.14);
  ctx.font = `${fontSize}px ${FONT_SFX}`;

  ctx.save();
  ctx.translate(panelW * 0.5, panelH * 0.35);
  ctx.rotate(-0.12); // Slight tilt for dynamism

  // Black outline (stroke text)
  ctx.strokeStyle = COMIC.sfxOutline;
  ctx.lineWidth = fontSize * 0.08;
  ctx.lineJoin = 'round';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText(displayText, 0, 0);

  // Red fill
  ctx.fillStyle = COMIC.sfxColor;
  ctx.fillText(displayText, 0, 0);

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL RENDERING — Full single-panel compositor
// ═══════════════════════════════════════════════════════════════════════════════

/** Draws subtle inner shadow on a panel for depth */
function drawInnerShadow(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Top inner shadow
  const topShadow = ctx.createLinearGradient(0, 0, 0, 4);
  topShadow.addColorStop(0, 'rgba(0, 0, 0, 0.06)');
  topShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = topShadow;
  ctx.fillRect(0, 0, w, 4);

  // Left inner shadow
  const leftShadow = ctx.createLinearGradient(0, 0, 4, 0);
  leftShadow.addColorStop(0, 'rgba(0, 0, 0, 0.04)');
  leftShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftShadow;
  ctx.fillRect(0, 0, 4, h);
}

/** Renders a complete single panel to a canvas context */
async function renderPanel(
  ctx: CanvasRenderingContext2D,
  config: PanelConfig,
  panelW: number,
  panelH: number
): Promise<void> {
  // 1. Background
  drawBackground(ctx, panelW, panelH, config.background);

  // 2. Character
  const charPath = resolve(PROJECT_ROOT, config.character);
  if (existsSync(charPath)) {
    const img = await loadImage(charPath);
    drawCharacter(ctx, img, panelW, panelH, config.bubblePosition);
  } else {
    console.warn(`  ⚠ Character file not found: ${charPath}`);
  }

  // 3. Speech bubble / narration / SFX
  if (config.text && config.text.trim()) {
    drawSpeechBubble(ctx, config.text, panelW, panelH, config.bubblePosition, config.bubbleType);
  }

  // 4. Inner panel shadow for depth
  drawInnerShadow(ctx, panelW, panelH);

  // 5. Panel number (tiny, top-left, 40% opacity)
  if (config.panelNumber) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#000000';
    ctx.font = `bold 12px ${FONT_DIALOGUE}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(String(config.panelNumber), 8, 6);
    ctx.globalAlpha = 1.0;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRIP COMPOSITOR — 4-panel professional comic strip
// ═══════════════════════════════════════════════════════════════════════════════

async function renderStrip(args: StripArgs): Promise<Buffer> {
  const { panels, layout, title, noWatermark } = args;

  // Determine total canvas size
  let totalW: number, totalH: number;
  let cols: number, rows: number;

  if (layout === 'horizontal') {
    // 1×4 newspaper strip
    totalW = 2400;
    totalH = 628;
    cols = 4;
    rows = 1;
  } else {
    // 2×2 Instagram square
    totalW = 1200;
    totalH = 1200;
    cols = 2;
    rows = 2;
  }

  const hasTitle = !!title;
  const titleH = hasTitle ? COMIC.titleBarHeight : 0;
  const outerB = COMIC.outerBorder;
  const gutter = COMIC.gutterWidth;

  // Available area for panels
  const availW = totalW - outerB * 2 - gutter * (cols - 1);
  const availH = totalH - outerB * 2 - gutter * (rows - 1) - titleH;
  const panelW = Math.floor(availW / cols);
  const panelH = Math.floor(availH / rows);

  const canvas = createCanvas(totalW, totalH);
  const ctx = canvas.getContext('2d');

  // Black fill for borders and gutters
  ctx.fillStyle = COMIC.border;
  ctx.fillRect(0, 0, totalW, totalH);

  // Title bar
  if (hasTitle && title) {
    ctx.fillStyle = COMIC.titleBarBg;
    ctx.fillRect(outerB, outerB, totalW - outerB * 2, titleH - 2);
    ctx.fillStyle = COMIC.titleBarText;
    const titleFontSize = Math.round(titleH * 0.55);
    ctx.font = `${titleFontSize}px ${FONT_TITLE}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title.toUpperCase(), totalW / 2, outerB + titleH / 2);
  }

  // Render each panel
  for (let i = 0; i < Math.min(panels.length, cols * rows); i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const px = outerB + col * (panelW + gutter);
    const py = outerB + titleH + row * (panelH + gutter);

    // Create panel canvas
    const panelCanvas = createCanvas(panelW, panelH);
    const panelCtx = panelCanvas.getContext('2d');

    // Assign panel number
    const panelConfig = { ...panels[i], panelNumber: i + 1 };
    await renderPanel(panelCtx, panelConfig, panelW, panelH);

    // Draw panel onto main canvas with clipping for rounded corners
    ctx.save();
    ctx.beginPath();
    roundedRectPath(ctx, px, py, panelW, panelH, COMIC.panelRadius);
    ctx.clip();
    ctx.drawImage(panelCanvas, px, py);
    ctx.restore();

    // Panel border (bold black)
    ctx.strokeStyle = COMIC.border;
    ctx.lineWidth = COMIC.panelBorder;
    ctx.beginPath();
    roundedRectPath(ctx, px, py, panelW, panelH, COMIC.panelRadius);
    ctx.stroke();
  }

  // Outer frame border (slightly thicker)
  ctx.strokeStyle = COMIC.border;
  ctx.lineWidth = outerB;
  ctx.strokeRect(outerB / 2, outerB / 2, totalW - outerB, totalH - outerB);

  // Watermark
  if (!noWatermark) {
    ctx.globalAlpha = COMIC.watermarkOpacity;
    ctx.fillStyle = COMIC.watermarkColor;
    ctx.font = `bold 11px ${FONT_DIALOGUE}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('collectiverse.com', totalW - outerB - 8, totalH - outerB - 6);
    ctx.globalAlpha = 1.0;
  }

  return canvas.toBuffer('image/png');
}

/** Helper: creates a rounded rect path without stroking/filling */
function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
): void {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE PANEL OUTPUT
// ═══════════════════════════════════════════════════════════════════════════════

async function renderSinglePanel(args: SinglePanelArgs): Promise<Buffer> {
  const { config, width, height, caption, noWatermark } = args;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Outer black border
  ctx.fillStyle = COMIC.border;
  ctx.fillRect(0, 0, width, height);

  // Panel area (inset by outer border)
  const b = COMIC.outerBorder;
  const panelW = width - b * 2;
  const panelH = height - b * 2;

  // Render panel content
  const panelCanvas = createCanvas(panelW, panelH);
  const panelCtx = panelCanvas.getContext('2d');
  await renderPanel(panelCtx, config, panelW, panelH);

  // Draw panel with rounded corners
  ctx.save();
  ctx.beginPath();
  roundedRectPath(ctx, b, b, panelW, panelH, COMIC.panelRadius);
  ctx.clip();
  ctx.drawImage(panelCanvas, b, b);
  ctx.restore();

  // Panel border
  ctx.strokeStyle = COMIC.border;
  ctx.lineWidth = COMIC.panelBorder;
  ctx.beginPath();
  roundedRectPath(ctx, b, b, panelW, panelH, COMIC.panelRadius);
  ctx.stroke();

  // Caption bar at bottom (if provided)
  if (caption) {
    drawCaptionBar(ctx, caption, width, height);
  }

  // Watermark
  if (!noWatermark) {
    ctx.globalAlpha = COMIC.watermarkOpacity;
    ctx.fillStyle = COMIC.watermarkColor;
    ctx.font = `bold 11px ${FONT_DIALOGUE}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('collectiverse.com', width - b - 8, height - b - 6);
    ctx.globalAlpha = 1.0;
  }

  return canvas.toBuffer('image/png');
}

/** Caption bar at the very bottom of a single panel */
function drawCaptionBar(
  ctx: CanvasRenderingContext2D,
  text: string,
  canvasW: number,
  canvasH: number
): void {
  const barH = 44;
  const b = COMIC.outerBorder;
  const fontSize = Math.max(14, Math.round(canvasW * 0.018));

  ctx.fillStyle = COMIC.narrationBg;
  ctx.fillRect(b, canvasH - b - barH, canvasW - b * 2, barH);

  ctx.fillStyle = COMIC.narrationText;
  ctx.font = `${fontSize}px ${FONT_TITLE}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.toUpperCase(), canvasW / 2, canvasH - b - barH / 2);
}

// ═══════════════════════════════════════════════════════════════════════════════
// BATCH MODE — Parse markdown comic scripts
// ═══════════════════════════════════════════════════════════════════════════════

interface BatchScript {
  title: string;
  panels: PanelConfig[];
  output?: string;
}

function parseBatchScript(filePath: string): BatchScript {
  const fullPath = resolve(PROJECT_ROOT, filePath);
  if (!existsSync(fullPath)) {
    console.error(`❌ Batch script not found: ${fullPath}`);
    process.exit(1);
  }

  const content = readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  let title = 'Untitled Comic';
  const panels: PanelConfig[] = [];
  let currentPanel: Partial<PanelConfig> | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Title: # Comic 001: ...
    if (trimmed.startsWith('# ')) {
      title = trimmed.slice(2).trim();
      continue;
    }

    // Panel heading: ## Panel 1
    if (trimmed.match(/^## Panel \d+/i)) {
      if (currentPanel && currentPanel.character && currentPanel.text) {
        panels.push(currentPanel as PanelConfig);
      }
      currentPanel = {
        background: 'white',
        bubblePosition: panels.length % 2 === 0 ? 'top-right' : 'top-left',
        bubbleType: 'speech',
        panelNumber: panels.length + 1,
      };
      continue;
    }

    if (!currentPanel) continue;

    // Parse panel properties
    if (trimmed.startsWith('Character:')) {
      currentPanel.character = trimmed.slice(10).trim();
    } else if (trimmed.startsWith('Text:')) {
      let t = trimmed.slice(5).trim();
      // Remove surrounding quotes
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        t = t.slice(1, -1);
      }
      currentPanel.text = t;
    } else if (trimmed.startsWith('Background:')) {
      currentPanel.background = trimmed.slice(11).trim();
    } else if (trimmed.startsWith('BubbleType:') || trimmed.startsWith('Bubble-Type:')) {
      currentPanel.bubbleType = trimmed.split(':')[1].trim() as BubbleType;
    } else if (trimmed.startsWith('BubblePosition:') || trimmed.startsWith('Bubble-Position:')) {
      currentPanel.bubblePosition = trimmed.split(':').slice(1).join(':').trim() as BubblePosition;
    }
  }

  // Push last panel
  if (currentPanel && currentPanel.character && currentPanel.text) {
    panels.push(currentPanel as PanelConfig);
  }

  return { title, panels };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FILE OUTPUT HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureOutputDir(outputPath: string): void {
  const fullPath = resolve(PROJECT_ROOT, outputPath);
  const dir = dirname(fullPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function saveBuffer(buffer: Buffer, outputPath: string): string {
  const fullPath = resolve(PROJECT_ROOT, outputPath);
  ensureOutputDir(outputPath);
  writeFileSync(fullPath, buffer);
  return fullPath;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  console.log('');
  console.log('🦸 Atlas Comic Panel Compositor — PROFESSIONAL EDITION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const parsed = parseArgs(process.argv);

  if (parsed.mode === 'batch') {
    console.log(`📖 Parsing batch script: ${parsed.scriptPath}`);
    const script = parseBatchScript(parsed.scriptPath);
    console.log(`   Title: "${script.title}"`);
    console.log(`   Panels: ${script.panels.length}`);

    // Determine output path from script filename
    const scriptBase = parsed.scriptPath.replace(/\.md$/i, '');
    const outputPath = `${scriptBase}-strip.png`;

    const stripArgs: StripArgs = {
      mode: 'strip',
      title: script.title,
      layout: script.panels.length <= 4 ? 'grid' : 'horizontal',
      panels: script.panels,
      output: outputPath,
    };

    console.log('🎨 Rendering 4-panel strip...');
    const buffer = await renderStrip(stripArgs);
    const savedPath = saveBuffer(buffer, outputPath);
    console.log(`✅ Strip saved: ${savedPath}`);
    console.log(`   Size: ${buffer.length} bytes`);
    return;
  }

  if (parsed.mode === 'strip') {
    console.log(`📐 Layout: ${parsed.layout} (${parsed.panels.length} panels)`);
    if (parsed.title) console.log(`📝 Title: "${parsed.title}"`);

    for (let i = 0; i < parsed.panels.length; i++) {
      const p = parsed.panels[i];
      console.log(`   Panel ${i + 1}: ${p.background} bg, ${p.bubbleType} bubble`);
    }

    console.log('🎨 Rendering strip...');
    const buffer = await renderStrip(parsed);
    const savedPath = saveBuffer(buffer, parsed.output);
    console.log(`✅ Strip saved: ${savedPath}`);
    console.log(`   Size: ${buffer.length} bytes`);
    return;
  }

  // Single panel mode
  const { config, output, width, height } = parsed;
  console.log(`📐 Size: ${width}×${height}`);
  console.log(`🖼  Background: ${config.background}`);
  console.log(`💬 Bubble: ${config.bubbleType} (${config.bubblePosition})`);
  console.log(`👤 Character: ${config.character}`);

  console.log('🎨 Rendering panel...');
  const buffer = await renderSinglePanel(parsed);
  const savedPath = saveBuffer(buffer, output);
  console.log(`✅ Panel saved: ${savedPath}`);
  console.log(`   Size: ${buffer.length} bytes`);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err.message || err);
  process.exit(1);
});
