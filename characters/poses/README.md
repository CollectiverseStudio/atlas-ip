# Pose Library — Canonical Source

This is the **single source of truth** for all Atlas pose assets.

## Structure

```
poses/
├── originals/      41 PNG (full-resolution source files)
├── sm/             41 WebP (small — app avatar size)
├── md/             41 WebP (medium — inline display)
└── lg/             41 WebP (large — side panel)
```

## Deployment

Poses are copied FROM this repo INTO the Collectiverse app at:
```
collectiverse/apps/web/public/images/atlas/poses/
```

When new poses are added or regenerated:
1. Add/replace the PNG in `originals/`
2. Generate WebP variants (sm/md/lg) using the resize pipeline
3. Copy all files to the app repo's `public/images/atlas/poses/`
4. Commit both repos

## Pose Catalog (41 poses)

| Pose | Mood | Variants |
|------|------|----------|
| atlas-arms-crossed | proud | 1 |
| atlas-backtruned-ls | idle | 1 |
| atlas-backtruned-rs | idle | 1 |
| atlas-crouching-lk | inspecting | 3 |
| atlas-crouching-rk | inspecting | 1 |
| atlas-facepalm-lh | apologetic | 1 |
| atlas-facepalm-rh | apologetic | 1 |
| atlas-handson-hips | proud | 1 |
| atlas-jumping-lh | excited | 1 |
| atlas-jumping-rh | excited | 1 |
| atlas-laying-on-ls | idle | 1 |
| atlas-laying-on-rs | idle | 1 |
| atlas-leaning-forward-palms-open | presenting | 1 |
| atlas-looking-down | inspecting | 2 |
| atlas-looking-up | thinking | 2 |
| atlas-magnify-lh | searching | 1 |
| atlas-magnify-rh | searching | 1 |
| atlas-peacesign-lh | encouraging | 1 |
| atlas-peacesign-rh | encouraging | 1 |
| atlas-pointing-forward-lh | explaining | 1 |
| atlas-pointing-forward-rh | explaining | 1 |
| atlas-pointing-up | explaining | 2 |
| atlas-pointing-up-on-one-knee | explaining | 1 |
| atlas-running-forward | loading | 1 |
| atlas-shrugging-handsup | confused | 1 |
| atlas-sitting | idle | 1 |
| atlas-standing-still | idle | 1 |
| atlas-strongman | excited | 1 |
| atlas-thinking-lh-chin | thinking | 1 |
| atlas-thinking-rh-chin | thinking | 1 |
| atlas-thumbsup-lh | encouraging | 1 |
| atlas-thumbsup-rh | encouraging | 1 |
| atlas-tradingcard-lh | presenting | 1 |
| atlas-tradingcard-rh | presenting | 1 |
| atlas-waving-lh | greeting | 1 |
| atlas-waving-rh | greeting | 1 |

## Adding New Poses

1. Generate using the canonical prompt (see `production-bible/ATLAS_CHARACTER_SPEC.md`)
2. Use `image_variation` on an existing pose with similarity_strength 0.60–0.65
3. Save PNG to `originals/`
4. Run resize script to generate sm/md/lg WebP
5. Update pose map in `src/lib/atlas/poses.ts` in the app repo
6. Copy to app repo `public/images/atlas/poses/`

---

*This folder is part of the Atlas IP repository. See root README.md for full structure.*
