# Atlas Reference Image Audit

## Status

**A001 is paused for cleanup.**

The current `reference-images/` and `model-sheets/` folders contain assets that are not visually consistent enough to serve as permanent canonical references. Until cleanup is complete, downstream Atlas Studio production tasks must not treat the generated reference/model-sheet images as stable.

---

## Immediate Decision

The following original baseline files are the only approved reference images retained by default during cleanup:

```text
reference-images/atlas-front.png
reference-images/atlas-back.png
reference-images/atlas-left-side.png
reference-images/atlas-right-side.png
reference-images/atlas-three-quarter-front-left.png
reference-images/atlas-three-quarter-front-right.png
reference-images/atlas-turnaround-360.png
reference-images/atlas-expression-sheet.png
reference-images/atlas-pose-sheet.png
reference-images/atlas-props-sheet.png
reference-images/character_lock.png
```

All other generated media files in `reference-images/` and `model-sheets/` should be quarantined unless individually reviewed and promoted.

---

## Cleanup Script

Use:

```powershell
pwsh ./scripts/quarantine-noncanonical-atlas-assets.ps1
```

Dry run:

```powershell
pwsh ./scripts/quarantine-noncanonical-atlas-assets.ps1 -DryRun
```

The script moves non-allowlisted image files to:

```text
archive/quarantine/<timestamp>/
```

It does not permanently delete files. Review the quarantine manifest before final deletion.

---

## Why Quarantine Instead of Delete

Atlas is now treated as managed IP. Wrong generated assets should not remain in canonical folders, but deleting without an audit trail can lose useful concept history. Quarantine preserves traceability while removing bad files from production use.

---

## Promotion Rule

A quarantined asset may only return to canonical folders if it passes the Atlas QA checklist:

- Correct helmet shape and color.
- Gold five-point star centered on helmet.
- Single black rounded visor.
- Green crescent eyes.
- No eyebrows.
- Small orange rounded-rectangle mouth.
- Silver ear discs.
- Correct chest badge.
- White armor with metallic blue accents.
- Black segmented hands with five fingers.
- White boots with blue trim.
- Correct proportions.
- Friendly non-threatening expression.
- No forbidden additions.

---

## A001 Stability Update

A001 should not be marked `STABLE` until the reference folders contain only approved canonical files and the Reference Lock Kit is rebuilt from those approved assets.

Current status:

```text
A001 Canonical Atlas Library: CLEANUP REQUIRED
A002 Pose Library: BLOCKED
```
