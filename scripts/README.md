# Atlas IP — Automated Asset Pipeline

## Architecture

```
ChatGPT / Designer
    │
    │ Push to atlas-ip/main
    ▼
GitHub Action (sync-atlas-assets.yml)
┌──────────────────────────────────────┐
│  1. Validate assets                  │  ← Blocks on errors
│  2. Resize poses (PNG → WebP)        │  ← Only changed files
│  3. Generate atlas-registry.json     │  ← SHA256 + IDs + versions
│  4. Generate TypeScript              │  ← poses.ts, comics.ts
│  5. Compare hashes                   │  ← Skip unchanged assets
│  6. Commit generated back to atlas-ip│
│  7. Clone collectiverse              │
│  8. Copy assets to public/           │
│  9. Copy TypeScript to src/lib/atlas/│
│ 10. Open PR with change report       │  ← No auto-merge
└──────────────────────────────────────┘
    │
    ▼
CollectiverseStudio/collectiverse
    │
    ▼ Review + Merge PR
    │
    ▼ App deploys normally
```

## Canonical Rule

**`atlas-ip` is the ONLY source of truth for Atlas assets.**

The Collectiverse application is a **consumer only**. Nothing inside
`collectiverse/apps/web/public/images/atlas/` or `collectiverse/apps/web/src/lib/atlas/poses.ts`
may be edited manually. All changes originate from this repo.

---

## Scripts

| Command | Script | What It Does |
|---------|--------|--------------|
| `npm run atlas:validate` | `validate-atlas-assets.ts` | Check filenames, structure, transparency, dimensions, orphans |
| `npm run atlas:resize` | `resize-poses.ts --new` | Convert new original PNGs → sm/md/lg WebP |
| `npm run atlas:resize:force` | `resize-poses.ts --force` | Re-convert ALL PNGs (overwrite existing WebP) |
| `npm run atlas:manifest` | `generate-atlas-manifest.ts` | Build `atlas-registry.json` with IDs, SHA256, versions, tags |
| `npm run atlas:types` | `generate-types.ts` | Generate `generated/poses.ts`, `comics.ts`, `atlas-assets.ts` |
| `npm run atlas:hashes` | `compare-hashes.ts` | Compare current vs registry — output changed/added/removed |
| `npm run atlas:sync` | All of the above in order | Full pipeline (validate → resize → manifest → types) |
| `npm run atlas:deploy` | `deploy-to-app.sh` | Manual copy to app repo (fallback only) |
| `npm run atlas:deploy:dry` | `deploy-to-app.sh --dry-run` | Preview what would be copied |

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. GitHub Secret (required for automated sync)
In `atlas-ip` repo → Settings → Secrets → Actions:
- **`COLLECTIVERSE_PAT`** — Personal Access Token with `repo` scope for `CollectiverseStudio/collectiverse`

---

## Asset Registry (`atlas-registry.json`)

Every asset gets:

```json
{
  "id": "P-001",
  "name": "Atlas Looking Up",
  "category": "pose",
  "status": "canonical",
  "version": "1.0",
  "original": "poses/originals/atlas-looking-up.png",
  "generated": {
    "sm": "poses/sm/atlas-looking-up.webp",
    "md": "poses/md/atlas-looking-up.webp",
    "lg": "poses/lg/atlas-looking-up.webp"
  },
  "sha256": "a1b2c3d4...",
  "tags": ["thinking", "idea", "education"]
}
```

### Versioning

Assets are never overwritten. Versions track changes:
- `1.0` → first version
- `1.1` → modified (new SHA256)
- `2.0` → major redesign (manual bump)

---

## Generated TypeScript (`generated/`)

**DO NOT EDIT MANUALLY.** These are auto-generated from the registry.

| File | Contains |
|------|----------|
| `generated/poses.ts` | `atlasPoses[]`, `ATLAS_POSES` (mood→files map), `getAtlasPose()`, `parseMoodFromResponse()` |
| `generated/comics.ts` | `atlasComics[]`, `getDailyAtlasComic()`, `getAtlasComic(n)` |
| `generated/atlas-assets.ts` | Full typed asset index with counts |

On sync, these files replace `apps/web/src/lib/atlas/poses.ts` in the app repo.

---

## Supported Asset Categories

- poses
- expressions
- comics
- logos
- branding
- model-sheets
- production-bible
- merchandising
- marketing
- animations
- videos
- stickers
- icons

All categories are tracked in the registry.

---

## Adding New Assets

### Poses (automated flow):
1. Push PNG to `poses/originals/atlas-{name}-{number}.png`
2. GitHub Action auto-resizes, generates types, opens PR

### Comics:
1. Push PNG to `comics/atlas-comic-strip-{N}.png`
2. GitHub Action validates, opens PR

### Any other category:
1. Push file to the correct directory
2. GitHub Action validates and includes in next sync

---

## Validation Rules

Every asset must pass:
- Lowercase filename (no spaces, no special chars except hyphens)
- Correct extension for its directory
- Under size limit (varies by category)
- Poses/logos must have alpha transparency
- No orphaned generated files (WebP without original)
- No duplicate filenames across categories
- Comic numbering is sequential (gaps flagged as warnings)

Validation errors **block the pipeline**. Fix before merging.
