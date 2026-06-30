# Atlas IP — Scripts

## Resize Pipeline

Converts original PNG poses into optimized WebP variants at 3 sizes.

```bash
# Install dependency
npm install sharp

# Process all poses (skip existing)
npx tsx scripts/resize-poses.ts

# Process only new poses (no existing WebP)
npx tsx scripts/resize-poses.ts --new

# Force re-process all (overwrite)
npx tsx scripts/resize-poses.ts --force
```

### Sizes Generated

| Size | Dimensions | Use Case |
|------|-----------|----------|
| sm | 80×80px | Chat avatar, inline message |
| md | 200×200px | Side panel, medium display |
| lg | 300×300px | Large panel, hero display |

### Workflow: Adding New Poses

1. Place new PNG in `poses/originals/`
2. Run `npx tsx scripts/resize-poses.ts --new`
3. Run `./scripts/deploy-to-app.sh --poses`
4. Update `src/lib/atlas/poses.ts` in the app repo with new pose mappings
5. Commit both repos

---

## Deploy to App

Copies assets from atlas-ip (canonical source) → Collectiverse app (runtime).

```bash
# Deploy everything
./scripts/deploy-to-app.sh

# Deploy specific asset types
./scripts/deploy-to-app.sh --poses
./scripts/deploy-to-app.sh --comics
./scripts/deploy-to-app.sh --brand

# Preview (no copy)
./scripts/deploy-to-app.sh --dry-run
```

### What Gets Deployed

| Source (atlas-ip) | Target (app repo) |
|---|---|
| `poses/originals/*.png` | `public/images/atlas/poses/*.png` |
| `poses/sm/*.webp` | `public/images/atlas/poses/sm/*.webp` |
| `poses/md/*.webp` | `public/images/atlas/poses/md/*.webp` |
| `poses/lg/*.webp` | `public/images/atlas/poses/lg/*.webp` |
| `comics/*.png` | `public/images/atlas/comics/*.png` |
| `logos/brand/*` | `public/brand/` |
