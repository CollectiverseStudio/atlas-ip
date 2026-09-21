# Canon / Document Authority Order

**Status:** Canonical governance rule

When two repository documents conflict, use this order of authority unless a later explicit lock document states otherwise:

1. `canon/CURRENT-CHARACTER-ROSTER.md`
2. Character-specific locked design/production documents adjacent to the character under `characters/`
3. `canon/POSE-VARIANT-POLICY.md` for A/B pose selection
4. Current supplemental character specifications under `canon/character-bible/`
5. Franchise-wide canon/volume documents that do not conflict with a later character lock
6. Historical combined character bibles and legacy production documents
7. `archive/` and `_import/` — provenance/evidence only, not production authority

## Rules

- Newer locked character decisions supersede older generic roster/spec text.
- A file's presence in Git does not make it current canon.
- `_import/` is never a production source path.
- Deprecated characters remain historical IP but are excluded from the active roster.
- Humanized and original forms are independently canonical; one form does not overwrite the other.
- Generated images must pass QA before becoming approved production assets.

## Known conflict

`canon/character-bible/08-villains.md` contains older villain concepts and is retained for provenance. Use the current roster and later character-specific lock material where they differ.
