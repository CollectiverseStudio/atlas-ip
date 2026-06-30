/**
 * Atlas TypeScript Generator
 *
 * Reads atlas-registry.json and generates TypeScript source files:
 * - generated/poses.ts — All pose data with mood mappings
 * - generated/comics.ts — All comic metadata
 * - generated/atlas-assets.ts — Full typed asset index
 *
 * These files are AUTO-GENERATED. Never manually edit them.
 * They are committed to atlas-ip AND copied to the app repo.
 *
 * Run: pnpm atlas:types
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'atlas-registry.json');
const GENERATED_DIR = path.join(ROOT, 'generated');

// ─── Types ────────────────────────────────────────────────────────────

interface AssetEntry {
  id: string;
  name: string;
  category: string;
  status: string;
  version: string;
  original: string;
  generated?: Record<string, string>;
  deployTo: string | null;
  sha256: string;
  sizeBytes: number;
  tags: string[];
}

interface Registry {
  version: string;
  character: string;
  generatedAt: string;
  assets: AssetEntry[];
}

// ─── Mood Mapping (tags → AtlasMood) ──────────────────────────────────

const TAG_TO_MOOD: Record<string, string> = {
  greeting: 'greeting',
  hello: 'greeting',
  friendly: 'greeting',
  thinking: 'thinking',
  idea: 'thinking',
  curious: 'thinking',
  searching: 'searching',
  investigating: 'searching',
  detail: 'searching',
  excited: 'excited',
  celebration: 'excited',
  energy: 'excited',
  powerful: 'excited',
  achievement: 'excited',
  explaining: 'explaining',
  teaching: 'explaining',
  attention: 'explaining',
  directing: 'explaining',
  showing: 'explaining',
  dramatic: 'explaining',
  confused: 'confused',
  uncertain: 'confused',
  questioning: 'confused',
  inspecting: 'inspecting',
  examining: 'inspecting',
  reading: 'inspecting',
  'close-look': 'inspecting',
  proud: 'proud',
  confident: 'proud',
  satisfied: 'proud',
  ready: 'proud',
  apologetic: 'apologetic',
  mistake: 'apologetic',
  oops: 'apologetic',
  idle: 'idle',
  resting: 'idle',
  casual: 'idle',
  neutral: 'idle',
  'looking-away': 'idle',
  mysterious: 'idle',
  presenting: 'presenting',
  offering: 'presenting',
  collecting: 'presenting',
  cards: 'presenting',
  encouraging: 'encouraging',
  approval: 'encouraging',
  positive: 'encouraging',
  fun: 'encouraging',
  loading: 'loading',
  action: 'loading',
  speed: 'loading',
};

function getPrimaryMood(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_TO_MOOD[tag]) return TAG_TO_MOOD[tag];
  }
  return 'idle';
}

// ─── Generators ───────────────────────────────────────────────────────

function generatePosesTs(poses: AssetEntry[]): string {
  const header = `/**
 * AUTO-GENERATED — DO NOT EDIT
 * Generated from atlas-registry.json by scripts/generate-types.ts
 * Run: pnpm atlas:types
 */

`;

  // Type definition
  let output = header;
  output += `export type AtlasMood =
  | 'greeting'
  | 'thinking'
  | 'searching'
  | 'excited'
  | 'explaining'
  | 'confused'
  | 'inspecting'
  | 'proud'
  | 'apologetic'
  | 'idle'
  | 'presenting'
  | 'encouraging'
  | 'loading';

export type AtlasSize = 'sm' | 'md' | 'lg';

export interface AtlasPose {
  id: string;
  name: string;
  filename: string;
  mood: AtlasMood;
  tags: string[];
  version: string;
}

`;

  // Pose data
  output += `export const atlasPoses: AtlasPose[] = [\n`;
  for (const pose of poses) {
    const filename = pose.original.split('/').pop()!;
    const mood = getPrimaryMood(pose.tags);
    output += `  { id: '${pose.id}', name: '${pose.name.replace(/'/g, "\\'")}', filename: '${filename}', mood: '${mood}' as AtlasMood, tags: [${pose.tags.map(t => `'${t}'`).join(', ')}], version: '${pose.version}' },\n`;
  }
  output += `];\n\n`;

  // Mood → poses mapping
  output += `export const ATLAS_POSES: Record<AtlasMood, string[]> = {\n`;
  const moodMap: Record<string, string[]> = {};
  for (const pose of poses) {
    const filename = pose.original.split('/').pop()!;
    const mood = getPrimaryMood(pose.tags);
    if (!moodMap[mood]) moodMap[mood] = [];
    moodMap[mood].push(filename);
  }
  const allMoods = ['greeting', 'thinking', 'searching', 'excited', 'explaining', 'confused', 'inspecting', 'proud', 'apologetic', 'idle', 'presenting', 'encouraging', 'loading'];
  for (const mood of allMoods) {
    const files = moodMap[mood] || [];
    output += `  ${mood}: [${files.map(f => `'${f}'`).join(', ')}],\n`;
  }
  output += `};\n\n`;

  // Helper functions
  output += `/** Pick a random pose for a mood, avoiding the last one used */
export function getAtlasPose(mood: AtlasMood, lastPose?: string): string {
  const poses = ATLAS_POSES[mood];
  if (poses.length === 0) return ATLAS_POSES.idle[0];
  if (poses.length === 1) return poses[0];
  const filtered = lastPose ? poses.filter(p => p !== lastPose) : poses;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/** Get the path to the optimized WebP image for a pose+size */
export function getAtlasImagePath(pose: string, size: AtlasSize): string {
  const filename = pose.replace('.png', '.webp');
  return \`/images/atlas/poses/\${size}/\${filename}\`;
}

/** Fallback: original PNG if WebP not yet generated */
export function getAtlasImageFallback(pose: string): string {
  return \`/images/atlas/poses/\${pose}\`;
}

/** Parse [mood:X] tag from Atlas response */
export function parseMoodFromResponse(raw: string): { content: string; mood: AtlasMood } {
  const moodMatch = raw.match(/\\[mood:(\\w+)\\]\\s*$/);
  const validMoods: AtlasMood[] = ['greeting', 'thinking', 'searching', 'excited', 'explaining', 'confused', 'inspecting', 'proud', 'apologetic', 'idle', 'presenting', 'encouraging', 'loading'];
  const mood = (moodMatch?.[1] as AtlasMood) || 'explaining';
  const content = raw.replace(/\\[mood:\\w+\\]\\s*$/, '').trim();
  return { content, mood: validMoods.includes(mood) ? mood : 'explaining' };
}

export const ATLAS_POSE_BASE = '/images/atlas/poses';
export const ATLAS_POSE_COUNT = ${poses.length};
`;

  return output;
}

function generateComicsTs(comics: AssetEntry[]): string {
  const header = `/**
 * AUTO-GENERATED — DO NOT EDIT
 * Generated from atlas-registry.json by scripts/generate-types.ts
 * Run: pnpm atlas:types
 */

`;

  let output = header;
  output += `export interface AtlasComic {
  id: string;
  name: string;
  filename: string;
  number: number;
  version: string;
}

`;

  output += `export const atlasComics: AtlasComic[] = [\n`;
  for (const comic of comics) {
    const filename = comic.original.split('/').pop()!;
    const numMatch = filename.match(/(\d+)/);
    const number = numMatch ? parseInt(numMatch[1], 10) : 0;
    output += `  { id: '${comic.id}', name: '${comic.name.replace(/'/g, "\\'")}', filename: '${filename}', number: ${number}, version: '${comic.version}' },\n`;
  }
  output += `];\n\n`;

  output += `export const ATLAS_COMIC_COUNT = ${comics.length};\n\n`;

  output += `/** Get a comic by its number */
export function getAtlasComic(number: number): AtlasComic | undefined {
  return atlasComics.find(c => c.number === number);
}

/** Get the daily comic (cycles through available comics) */
export function getDailyAtlasComic(): AtlasComic {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % atlasComics.length;
  return atlasComics[index];
}
`;

  return output;
}

function generateAssetsTs(allAssets: AssetEntry[]): string {
  const header = `/**
 * AUTO-GENERATED — DO NOT EDIT
 * Generated from atlas-registry.json by scripts/generate-types.ts
 * Run: pnpm atlas:types
 */

`;

  let output = header;
  output += `export interface AtlasAssetEntry {
  id: string;
  name: string;
  category: string;
  status: string;
  version: string;
  original: string;
  deployTo: string | null;
  tags: string[];
}

`;

  output += `export const atlasAssets: AtlasAssetEntry[] = [\n`;
  for (const asset of allAssets) {
    output += `  { id: '${asset.id}', name: '${asset.name.replace(/'/g, "\\'")}', category: '${asset.category}', status: '${asset.status}', version: '${asset.version}', original: '${asset.original}', deployTo: ${asset.deployTo ? `'${asset.deployTo}'` : 'null'}, tags: [${asset.tags.map(t => `'${t}'`).join(', ')}] },\n`;
  }
  output += `];\n\n`;

  output += `export const ATLAS_TOTAL_ASSETS = ${allAssets.length};\n`;

  // Category counts
  const byCategory: Record<string, number> = {};
  for (const a of allAssets) {
    byCategory[a.category] = (byCategory[a.category] || 0) + 1;
  }
  output += `\nexport const ATLAS_ASSET_COUNTS = ${JSON.stringify(byCategory, null, 2)} as const;\n`;

  return output;
}

// ─── Main ─────────────────────────────────────────────────────────────

function main(): void {
  console.log('⚙️  Atlas TypeScript Generator');
  console.log('═'.repeat(60));

  // Load registry
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error('❌ atlas-registry.json not found. Run atlas:manifest first.');
    process.exit(1);
  }

  const registry: Registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  console.log(`  Registry loaded: ${registry.assets.length} assets`);

  // Ensure output directory exists
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }

  // Generate files
  const poses = registry.assets.filter(a => a.category === 'pose');
  const comics = registry.assets.filter(a => a.category === 'comic');

  // 1. poses.ts
  const posesTs = generatePosesTs(poses);
  fs.writeFileSync(path.join(GENERATED_DIR, 'poses.ts'), posesTs);
  console.log(`  ✅ generated/poses.ts (${poses.length} poses)`);

  // 2. comics.ts
  const comicsTs = generateComicsTs(comics);
  fs.writeFileSync(path.join(GENERATED_DIR, 'comics.ts'), comicsTs);
  console.log(`  ✅ generated/comics.ts (${comics.length} comics)`);

  // 3. atlas-assets.ts
  const assetsTs = generateAssetsTs(registry.assets);
  fs.writeFileSync(path.join(GENERATED_DIR, 'atlas-assets.ts'), assetsTs);
  console.log(`  ✅ generated/atlas-assets.ts (${registry.assets.length} total assets)`);

  console.log('\n' + '═'.repeat(60));
  console.log('  TypeScript generation complete.');
  console.log('  These files will be copied to apps/web/src/lib/atlas/ on sync.');
}

main();
