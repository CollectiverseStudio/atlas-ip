/**
 * generate-hero-images.ts — Batch generate all page hero images
 *
 * Generates wide banner hero images for each page of the Collectiverse site.
 * Each page features the Keeper character whose personality matches the page purpose.
 *
 * Currently only generates Atlas-featured pages (we have his LoRA).
 * Other Keepers will be generated once their LoRAs are trained.
 *
 * Usage:
 *   npx tsx scripts/generate-hero-images.ts           # Generate all Atlas heroes
 *   npx tsx scripts/generate-hero-images.ts --page collection   # Generate one specific page
 *   npx tsx scripts/generate-hero-images.ts --all     # Generate ALL (including non-Atlas, no LoRA)
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const FAL_KEY = process.env.FAL_KEY || '';
if (!FAL_KEY) {
  console.error('❌ FAL_KEY not set. Add it to .env');
  process.exit(1);
}

const LORA_URL = fs.readFileSync(path.resolve(PROJECT_ROOT, '.lora-model-url.txt'), 'utf-8').trim();

const CHARACTER_PREFIX = 'atlas_character, a small cute chibi robot with blue and white armored body, black visor face with glowing eyes, gold star antenna on top of head, black mechanical hands, ';
const STYLE_SUFFIX = ', Pixar DreamWorks quality CGI render, professional illustration, vibrant colors, studio lighting, high quality, wide banner composition, 16:7 aspect ratio';

// ═══════════════════════════════════════════════════════════════════
// HERO IMAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

interface HeroImage {
  page: string;
  character: string;
  usesAtlasLora: boolean;
  prompt: string;
  filename: string;
}

const HERO_IMAGES: HeroImage[] = [
  // --- ATLAS LoRA AVAILABLE (can generate now) ---
  {
    page: 'home',
    character: 'Atlas + All Keepers',
    usesAtlasLora: true,
    prompt: CHARACTER_PREFIX + 'leading a team of 6 unique fantasy creatures (arctic fox with tech goggles, raven with ink-drip wings, British Shorthair cat with gold monocle, gorilla with copper mechanical arm, armored rhino with glowing horn, owl with floating violet crystals) standing together in heroic poses on a cliff overlooking a vast glowing city made of collectible cards and comic books and coins, dramatic sunset lighting, epic wide-angle' + STYLE_SUFFIX,
    filename: 'hero-home.png',
  },
  {
    page: 'collection',
    character: 'Atlas',
    usesAtlasLora: true,
    prompt: CHARACTER_PREFIX + 'standing proudly in a beautiful organized collection room, shelves filled with sports cards in protective cases, comic books standing upright, coins in illuminated display cases, vinyl records on wall, warm golden ambient lighting, cozy satisfying atmosphere, feeling of a well-curated personal museum' + STYLE_SUFFIX,
    filename: 'hero-collection.png',
  },
  {
    page: 'pricing',
    character: 'Atlas',
    usesAtlasLora: true,
    prompt: CHARACTER_PREFIX + 'friendly welcoming pose with both arms open in presentation gesture, standing next to three glowing holographic floating cards showing tier levels with star icons, clean minimal background with soft blue-to-purple gradient, clear and inviting professional atmosphere' + STYLE_SUFFIX,
    filename: 'hero-pricing.png',
  },
  {
    page: 'events',
    character: 'Atlas + team',
    usesAtlasLora: true,
    prompt: CHARACTER_PREFIX + 'at a bustling convention hall filled with booths displaying collectible trading cards and comic books under bright lights, crowds of happy diverse people browsing in background, colorful banner decorations and balloons hanging from ceiling, bright fun card show floor atmosphere' + STYLE_SUFFIX,
    filename: 'hero-events.png',
  },
  {
    page: 'challenges',
    character: 'Atlas + Forge',
    usesAtlasLora: true,
    prompt: CHARACTER_PREFIX + 'in a dramatic competition arena standing next to a large friendly chibi gorilla character with a glowing copper mechanical arm and welding goggles on forehead, both in energetic ready-to-compete poses, gold trophy and medals displayed behind them, scoreboard with rankings glowing, sparks flying from arena floor' + STYLE_SUFFIX,
    filename: 'hero-challenges.png',
  },

  // --- NO LoRA (general Flux generation, other Keepers) ---
  {
    page: 'catalog',
    character: 'Pixel (Arctic Fox)',
    usesAtlasLora: false,
    prompt: 'A cute chibi arctic fox character with white and cyan-tipped fur, wearing high-tech goggles on forehead and a scanner gauntlet projecting holographic displays, excitedly scanning and discovering new items in an infinite glowing library of collectibles, holographic trading cards floating around her, cyan scanner beams revealing hidden treasures, futuristic discovery atmosphere' + STYLE_SUFFIX,
    filename: 'hero-catalog.png',
  },
  {
    page: 'vault',
    character: 'Porter (Rhino)',
    usesAtlasLora: false,
    prompt: 'A massive cute chibi armored rhino character with vault-door-style armor plates covering body and a glowing blue horn, standing guard protectively in front of an enormous ornate vault door with blockchain chains of golden light connecting to precious items visible inside, secure impenetrable fortress atmosphere, dramatic blue and gold lighting' + STYLE_SUFFIX,
    filename: 'hero-vault.png',
  },
  {
    page: 'marketplace',
    character: 'Sterling (Cat)',
    usesAtlasLora: false,
    prompt: 'A sophisticated cute chibi British Shorthair cat character with grey-blue fur wearing a gold monocle, pearl-button vest with cravat, and white gloves, standing confidently at an elegant trading floor with illuminated display cases of valuable collectibles, holographic price tags floating, other collectors browsing behind him, upscale marketplace bazaar atmosphere, warm golden and cream tones' + STYLE_SUFFIX,
    filename: 'hero-marketplace.png',
  },
  {
    page: 'community',
    character: 'Forge (Gorilla)',
    usesAtlasLora: false,
    prompt: 'A friendly cute chibi gorilla character with dark fur and a glowing copper mechanical arm, welding goggles pushed up on forehead, tool belt around waist, standing in the center of a warm bustling community workshop, other small collector characters working on projects around him, building and crafting together, warm orange workshop lighting with sparks flying, collaborative energy' + STYLE_SUFFIX,
    filename: 'hero-community.png',
  },
  {
    page: 'archive',
    character: 'Ink (Raven)',
    usesAtlasLora: false,
    prompt: 'A dramatic cute chibi raven character with sleek black feathers and an ink-drip wing-cape that flows like liquid ink, holding a golden quill pen, surrounded by floating comic book pages and glowing story fragments forming characters in the air, standing in a grand magical archive library with towering bookshelves, swirling indigo ink magic in the air, indigo and gold color palette' + STYLE_SUFFIX,
    filename: 'hero-archive.png',
  },
  {
    page: 'live',
    character: 'Echo (Owl)',
    usesAtlasLora: false,
    prompt: 'A mystical cute chibi great horned owl character with translucent crystalline wings and floating violet memory crystals orbiting around her, broadcasting from a high-tech streaming studio setup, holographic screens showing live auction items with bid numbers, audience silhouettes visible in background, violet and purple glow effects, electric energy of a live broadcast' + STYLE_SUFFIX,
    filename: 'hero-live.png',
  },
  {
    page: 'leaderboards',
    character: 'Sterling (Cat)',
    usesAtlasLora: false,
    prompt: 'A sophisticated cute chibi British Shorthair cat character with gold monocle gleaming, standing triumphantly on a #1 podium holding a golden trophy, large rankings board behind showing collector names and achievement scores, confetti and gold particles falling, celebration atmosphere, prestige gold and cream colors' + STYLE_SUFFIX,
    filename: 'hero-leaderboards.png',
  },
];

// ═══════════════════════════════════════════════════════════════════
// GENERATION LOGIC
// ═══════════════════════════════════════════════════════════════════

async function submitToQueue(prompt: string, useLora: boolean): Promise<string> {
  const payload: any = {
    prompt,
    image_size: { width: 1344, height: 576 },
    num_images: 1,
    num_inference_steps: 28,
    guidance_scale: 3.5,
    output_format: 'png',
    enable_safety_checker: false,
  };

  if (useLora) {
    payload.loras = [{ path: LORA_URL, scale: 1.0 }];
  }

  const resp = await fetch('https://queue.fal.run/fal-ai/flux-lora', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(`Queue submit failed: ${resp.status} ${await resp.text()}`);
  }

  const data = await resp.json();
  return data.request_id;
}

async function pollResult(requestId: string, maxWait = 120000): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const resp = await fetch(`https://queue.fal.run/fal-ai/flux-lora/requests/${requestId}/status`, {
      headers: { 'Authorization': `Key ${FAL_KEY}` },
    });
    const data = await resp.json();

    if (data.status === 'COMPLETED') {
      // Fetch result
      const resultResp = await fetch(`https://queue.fal.run/fal-ai/flux-lora/requests/${requestId}`, {
        headers: { 'Authorization': `Key ${FAL_KEY}` },
      });
      const result = await resultResp.json();
      return result.images[0].url;
    } else if (data.status === 'FAILED') {
      throw new Error(`Generation failed: ${JSON.stringify(data)}`);
    }

    // Wait 3 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  throw new Error(`Timed out after ${maxWait / 1000}s`);
}

async function downloadImage(url: string, outputPath: string): Promise<void> {
  const resp = await fetch(url);
  const buffer = Buffer.from(await resp.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  const args = process.argv.slice(2);
  const specificPage = args.find(a => a !== '--all' && !a.startsWith('--'))
    || (args.includes('--page') ? args[args.indexOf('--page') + 1] : null);
  const generateAll = args.includes('--all');

  let imagesToGenerate = HERO_IMAGES;

  if (specificPage) {
    imagesToGenerate = HERO_IMAGES.filter(h => h.page === specificPage);
    if (imagesToGenerate.length === 0) {
      console.error(`❌ Unknown page: ${specificPage}`);
      console.log('Available pages:', HERO_IMAGES.map(h => h.page).join(', '));
      process.exit(1);
    }
  } else if (!generateAll) {
    // Default: only Atlas LoRA images
    imagesToGenerate = HERO_IMAGES.filter(h => h.usesAtlasLora);
  }

  const outputDir = path.resolve(PROJECT_ROOT, 'generated', 'heroes');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n🎨 Generating ${imagesToGenerate.length} hero images...\n`);

  for (const hero of imagesToGenerate) {
    console.log(`📸 ${hero.page} (${hero.character})${hero.usesAtlasLora ? ' [LoRA]' : ' [no LoRA]'}`);
    try {
      const requestId = await submitToQueue(hero.prompt, hero.usesAtlasLora);
      console.log(`   ⏳ Queued: ${requestId}`);

      const imageUrl = await pollResult(requestId);
      console.log(`   ✅ Generated!`);

      const outputPath = path.resolve(outputDir, hero.filename);
      await downloadImage(imageUrl, outputPath);
      console.log(`   💾 Saved: ${outputPath}\n`);
    } catch (err: any) {
      console.error(`   ❌ Failed: ${err.message}\n`);
    }
  }

  console.log('🎉 Done!');
}

main().catch(console.error);
