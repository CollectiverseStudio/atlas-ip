# Canonical Repository Structure v1

This document defines the target IP asset structure created during the September 2026 reconciliation.

## Principles

- `canon/` contains franchise-wide canon, governance, world, rendering, and shared documentation.
- `characters/` contains character-specific IP and production assets.
- Every active character has a faction directory and separate `original` and `humanized` forms.
- Original-form assets are never overwritten by humanized assets.
- Generated assets are not approved merely because generation succeeded.
- `_import/` is read-only staging/evidence until reconciliation is signed off.
- `archive/` preserves superseded/deprecated IP rather than deleting it.

## Active roster

### Heroes / Keepers
Atlas, Pixel, Ink, Sterling, Forge, Porter, Echo

### Villains / Syndicate
Director, Counterfeiter, Restorer, Hacker, Hoarder, Vault, Whisper, Smuggler

## Character layout

```
characters/
  heroes|villains/
    <character>/
      CHARACTER-BIBLE.md
      original/
        master/
        reference/
        poses/
          approved/
          alternates/
        contact-sheet/
      humanized/
        master/
        reference/
        poses/
          generated/
          qa/
            candidates/
          approved/
          rejected/
        contact-sheet/
      production/
        prompts/
        training/
```

## Current migration status

- Canonical original-form pose libraries have been copied into the new per-character structure for all 15 active characters.
- Existing source paths remain intact during validation; Git blob reuse means the migration does not duplicate binary content in Git object storage.
- Ink's verified humanized 40-pose set has been migrated to `characters/heroes/ink/humanized/poses/approved/`.
- Ink pose 01 is also installed as the current humanized master reference.
- Sterling's manually developed humanized poses 1–15 and 17–19 are in `approved/`.
- Sterling pose 16 A/B variants are held under `qa/candidates/` until the canonical replacement is resolved.
- Sterling pose 01 is installed as the humanized master; poses 02 and 05 are retained as secondary references.
- The Broker's original 40-pose library is preserved under `archive/characters/the-broker/`.
- Existing legacy paths are not yet deleted.

## Branch strategy

- `atlas-a001-media`: protected source/reorganization branch.
- `reconciliation-canonical-v1`: canonical restructuring work branch.
- `main`: newer Pose Factory/application work; integration happens only after canonical structure validation.

## Approval rule

No legacy source directory is removed and no destructive merge into `main` occurs until:
1. file counts are validated,
2. canonical destinations are validated,
3. humanized/original separation is validated,
4. Pose Factory paths are updated,
5. a final branch comparison is reviewed.
