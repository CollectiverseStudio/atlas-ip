/**
 * Atlas Hash Comparison
 *
 * Compares sha256 hashes between current assets and the existing registry
 * to determine what has actually changed. Only changed assets should be
 * included in the sync PR.
 *
 * Outputs a JSON report to stdout (consumed by the GitHub Action).
 *
 * Run: pnpm atlas:hashes
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'atlas-registry.json');

interface AssetEntry {
  id: string;
  name: string;
  category: string;
  original: string;
  generated?: Record<string, string>;
  deployTo: string | null;
  sha256: string;
  sizeBytes: number;
}

interface Registry {
  assets: AssetEntry[];
}

interface ChangeReport {
  added: { id: string; name: string; category: string; path: string }[];
  modified: { id: string; name: string; category: string; path: string; oldHash: string; newHash: string }[];
  removed: { id: string; name: string; category: string; path: string }[];
  unchanged: number;
  totalChecked: number;
  hasChanges: boolean;
  compressionSaved?: number;
}

function computeSha256(filepath: string): string | null {
  try {
    const content = fs.readFileSync(filepath);
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch {
    return null;
  }
}

function main(): void {
  // Load existing registry (the "before" state)
  if (!fs.existsSync(REGISTRY_PATH)) {
    // No existing registry — everything is new
    console.log(JSON.stringify({
      added: [],
      modified: [],
      removed: [],
      unchanged: 0,
      totalChecked: 0,
      hasChanges: true,
      note: 'No existing registry — full sync required',
    }));
    process.exit(0);
  }

  const registry: Registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  const report: ChangeReport = {
    added: [],
    modified: [],
    removed: [],
    unchanged: 0,
    totalChecked: 0,
    hasChanges: false,
  };

  // Check each registered asset
  for (const asset of registry.assets) {
    report.totalChecked++;
    const fullPath = path.join(ROOT, asset.original);

    if (!fs.existsSync(fullPath)) {
      report.removed.push({
        id: asset.id,
        name: asset.name,
        category: asset.category,
        path: asset.original,
      });
      continue;
    }

    const currentHash = computeSha256(fullPath);
    if (currentHash && currentHash !== asset.sha256) {
      report.modified.push({
        id: asset.id,
        name: asset.name,
        category: asset.category,
        path: asset.original,
        oldHash: asset.sha256,
        newHash: currentHash,
      });
    } else {
      report.unchanged++;
    }
  }

  // Check for new files not in registry
  const registeredPaths = new Set(registry.assets.map(a => a.original));
  const dirsToScan = ['poses/originals', 'comics', 'logos/brand', 'expressions', 'icons', 'model-sheets', 'stickers'];

  for (const dir of dirsToScan) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir)
      .filter(f => !f.endsWith('.md') && !f.startsWith('.') && !fs.statSync(path.join(fullDir, f)).isDirectory());

    for (const file of files) {
      const relPath = `${dir}/${file}`;
      if (!registeredPaths.has(relPath)) {
        report.added.push({
          id: 'NEW',
          name: file,
          category: dir.split('/')[0],
          path: relPath,
        });
      }
    }
  }

  report.hasChanges = report.added.length > 0 || report.modified.length > 0 || report.removed.length > 0;

  // Output as JSON (GitHub Action reads this)
  console.log(JSON.stringify(report, null, 2));

  // Also output human-readable summary to stderr
  process.stderr.write('\n📊 Atlas Hash Comparison\n');
  process.stderr.write('═'.repeat(50) + '\n');
  process.stderr.write(`  Added:     ${report.added.length}\n`);
  process.stderr.write(`  Modified:  ${report.modified.length}\n`);
  process.stderr.write(`  Removed:   ${report.removed.length}\n`);
  process.stderr.write(`  Unchanged: ${report.unchanged}\n`);
  process.stderr.write(`  Total:     ${report.totalChecked}\n`);
  process.stderr.write('═'.repeat(50) + '\n');

  if (!report.hasChanges) {
    process.stderr.write('  No changes detected — sync skipped.\n');
  } else {
    process.stderr.write(`  ${report.added.length + report.modified.length} asset(s) need syncing.\n`);
  }
}

main();
