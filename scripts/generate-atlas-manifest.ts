/**
 * Atlas Registry Generator
 *
 * Scans all asset directories and produces atlas-registry.json — the machine-readable
 * manifest of every Atlas asset with:
 * - Unique ID (P-001, C-001, L-001, etc.)
 * - Name (derived from filename)
 * - Category and status
 * - Version tracking (never overwrites — tracks v1.0 → v1.1 → v2.0)
 * - SHA256 hash (for change detection)
 * - Original and generated paths
 * - Tags (mood/context for poses, series for comics)
 * - Deployment target in the app repo
 *
 * Categories: poses, expressions, comics, logos, branding, model-sheets,
 * production-bible, merchandising, marketing, animations, videos, stickers
 *
 * Run: pnpm atlas:manifest
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'atlas-registry.json');

// ─── Types ────────────────────────────────────────────────────────────

interface AssetEntry {
  id: string;
  name: string;
  category: string;
  status: 'canonical' | 'draft' | 'deprecated' | 'archived';
  version: string;
  original: string;
  generated?: Record<string, string>;
  deployTo: string | null;
  sha256: string;
  sizeBytes: number;
  tags: string[];
  addedAt: string;
  updatedAt: string;
}

interface Registry {
  version: string;
  character: string;
  generatedAt: string;
  assets: AssetEntry[];
  summary: {
    totalAssets: number;
    totalSizeBytes: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
  };
}

// ─── ID Prefixes ──────────────────────────────────────────────────────

const CATEGORY_PREFIXES: Record<string, string> = {
  pose: 'P',
  expression: 'E',
  comic: 'C',
  logo: 'L',
  brand: 'B',
  reference: 'R',
  marketing: 'M',
  'model-sheet': 'MS',
  icon: 'I',
  sticker: 'S',
  animation: 'A',
  video: 'V',
  merchandise: 'MR',
};

// ─── Pose mood/tag mapping ────────────────────────────────────────────

const POSE_TAGS: Record<string, string[]> = {
  'waving': ['greeting', 'hello', 'friendly'],
  'thinking': ['thinking', 'idea', 'education'],
  'looking-up': ['thinking', 'idea', 'curious'],
  'looking-down': ['inspecting', 'reading', 'examining'],
  'magnify': ['searching', 'investigating', 'detail'],
  'thumbsup': ['encouraging', 'approval', 'positive'],
  'peacesign': ['encouraging', 'celebration', 'fun'],
  'pointing-up': ['explaining', 'teaching', 'attention'],
  'pointing-forward': ['explaining', 'directing', 'showing'],
  'jumping': ['excited', 'celebration', 'energy'],
  'strongman': ['excited', 'powerful', 'achievement'],
  'arms-crossed': ['proud', 'confident', 'satisfied'],
  'handson-hips': ['proud', 'confident', 'ready'],
  'shrugging': ['confused', 'uncertain', 'questioning'],
  'facepalm': ['apologetic', 'mistake', 'oops'],
  'crouching': ['inspecting', 'examining', 'close-look'],
  'sitting': ['idle', 'resting', 'casual'],
  'standing-still': ['idle', 'neutral', 'ready'],
  'running': ['loading', 'action', 'speed'],
  'leaning-forward': ['presenting', 'showing', 'offering'],
  'tradingcard': ['presenting', 'collecting', 'cards'],
  'laying-on': ['idle', 'resting', 'casual'],
  'backtruned': ['idle', 'looking-away', 'mysterious'],
  'pointing-up-on-one-knee': ['explaining', 'dramatic', 'teaching'],
};

function getTagsForPose(filename: string): string[] {
  const lower = filename.toLowerCase();
  for (const [keyword, tags] of Object.entries(POSE_TAGS)) {
    if (lower.includes(keyword)) {
      return tags;
    }
  }
  return ['general'];
}

// ─── Helpers ──────────────────────────────────────────────────────────

function computeSha256(filepath: string): string {
  const content = fs.readFileSync(filepath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function filenameToName(filename: string): string {
  return filename
    .replace(/\.(png|jpg|webp|svg|pdf|mp4|gif)$/i, '')
    .replace(/^atlas-/, 'Atlas ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateId(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(3, '0')}`;
}

// ─── Load existing registry (for version tracking) ────────────────────

function loadExistingRegistry(): Map<string, AssetEntry> {
  const map = new Map<string, AssetEntry>();
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const existing: Registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
      for (const asset of existing.assets) {
        map.set(asset.original, asset);
      }
    } catch {
      // Corrupted registry — start fresh
    }
  }
  return map;
}

function bumpVersion(existingVersion: string, hashChanged: boolean): string {
  if (!hashChanged) return existingVersion;
  const parts = existingVersion.split('.').map(Number);
  parts[1] = (parts[1] || 0) + 1;
  return parts.join('.');
}

// ─── Scan Functions ───────────────────────────────────────────────────

function scanAssets(
  relDir: string,
  category: string,
  prefix: string,
  getDeployTarget: (filename: string) => string | null,
  getTagsFn?: (filename: string) => string[],
): AssetEntry[] {
  const fullDir = path.join(ROOT, relDir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir)
    .filter(f => !f.endsWith('.md') && !f.startsWith('.') && !fs.statSync(path.join(fullDir, f)).isDirectory());

  return files.map((file, index) => {
    const filepath = path.join(fullDir, file);
    const stat = fs.statSync(filepath);
    const sha256 = computeSha256(filepath);
    const originalPath = `${relDir}/${file}`;

    return {
      id: generateId(prefix, index + 1),
      name: filenameToName(file),
      category,
      status: 'canonical' as const,
      version: '1.0',
      original: originalPath,
      deployTo: getDeployTarget(file),
      sha256,
      sizeBytes: stat.size,
      tags: getTagsFn ? getTagsFn(file) : [],
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

// ─── Main ─────────────────────────────────────────────────────────────

function main(): void {
  console.log('📋 Atlas Registry Generator');
  console.log('═'.repeat(60));

  const existingRegistry = loadExistingRegistry();
  const allAssets: AssetEntry[] = [];

  // 1. Poses (originals — generated variants are linked, not separate entries)
  const poses = scanAssets(
    'poses/originals',
    'pose',
    CATEGORY_PREFIXES.pose,
    (f) => `apps/web/public/images/atlas/poses/${f}`,
    getTagsForPose,
  );
  // Add generated variant paths
  for (const pose of poses) {
    const baseName = path.parse(pose.original.split('/').pop()!).name;
    pose.generated = {
      sm: `poses/sm/${baseName}.webp`,
      md: `poses/md/${baseName}.webp`,
      lg: `poses/lg/${baseName}.webp`,
    };
  }
  allAssets.push(...poses);

  // 2. Comics
  allAssets.push(...scanAssets(
    'comics',
    'comic',
    CATEGORY_PREFIXES.comic,
    (f) => f.endsWith('.png') ? `apps/web/public/images/atlas/comics/${f}` : null,
  ));

  // 3. Logos/brand
  allAssets.push(...scanAssets(
    'logos/brand',
    'brand',
    CATEGORY_PREFIXES.brand,
    (f) => f === 'collectiverse-logo.png'
      ? `apps/web/public/brand/${f}`
      : `apps/web/public/brand/atlas/${f}`,
  ));

  // 4. Reference images
  allAssets.push(...scanAssets(
    'reference-images',
    'reference',
    CATEGORY_PREFIXES.reference,
    () => null, // Not deployed to app
  ));

  // 5. Social media / marketing
  allAssets.push(...scanAssets(
    'social-media',
    'marketing',
    CATEGORY_PREFIXES.marketing,
    () => null,
  ));

  // 6. Expressions
  allAssets.push(...scanAssets(
    'expressions',
    'expression',
    CATEGORY_PREFIXES.expression,
    (f) => `apps/web/public/images/atlas/expressions/${f}`,
  ));

  // 7. Icons
  allAssets.push(...scanAssets(
    'icons',
    'icon',
    CATEGORY_PREFIXES.icon,
    (f) => `apps/web/public/images/atlas/icons/${f}`,
  ));

  // 8. Model sheets
  allAssets.push(...scanAssets(
    'model-sheets',
    'model-sheet',
    CATEGORY_PREFIXES['model-sheet'],
    () => null,
  ));

  // Version tracking: compare with existing registry
  for (const asset of allAssets) {
    const existing = existingRegistry.get(asset.original);
    if (existing) {
      const hashChanged = existing.sha256 !== asset.sha256;
      asset.version = bumpVersion(existing.version, hashChanged);
      asset.addedAt = existing.addedAt; // Preserve original add date
      if (!hashChanged) {
        asset.updatedAt = existing.updatedAt; // Preserve if unchanged
      }
      // Preserve manually-set tags from existing
      if (existing.tags.length > 0 && asset.tags.length === 0) {
        asset.tags = existing.tags;
      }
    }
  }

  // Build summary
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let totalSize = 0;

  for (const asset of allAssets) {
    byCategory[asset.category] = (byCategory[asset.category] || 0) + 1;
    byStatus[asset.status] = (byStatus[asset.status] || 0) + 1;
    totalSize += asset.sizeBytes;
  }

  const registry: Registry = {
    version: '1.0',
    character: 'Atlas',
    generatedAt: new Date().toISOString(),
    assets: allAssets,
    summary: {
      totalAssets: allAssets.length,
      totalSizeBytes: totalSize,
      byCategory,
      byStatus,
    },
  };

  // Write registry
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));

  // Report
  console.log(`  Total assets: ${registry.summary.totalAssets}`);
  console.log(`  Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('');
  console.log('  By category:');
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${cat}: ${count}`);
  }
  console.log('');
  console.log(`  ✅ Saved: atlas-registry.json`);
}

main();
