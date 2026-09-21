# Atlas IP Reconciliation — Phase 2 Character Asset Audit

Date: 2026-09-21
Branch audited: `atlas-a001-media`

## Original-form pose library

The reorganized branch already contains complete numbered original-form pose coverage for the active roster. Some pose numbers have alternate A/B variants, so physical PNG counts can exceed 40.

| Character | PNG files | Numbered coverage / notes |
|---|---:|---|
| Atlas | 41 | Established named-pose library; not numbered 1–40, but 41 canonical pose PNGs |
| Pixel | 40 | 1–40 |
| Ink | 41 | 1–40; pose 23 has A/B variants |
| Sterling | 42 | 1–40; poses 17 and 18 have A/B variants |
| Forge | 41 | 1–40; pose 12 has A/B variants |
| Porter | 41 | 1–40; pose 6 has A/B variants |
| Echo | 40 | 1–40 |
| The Director | 41 | 1–40; pose 21 has A/B variants |
| The Counterfeiter | 45 | 1–40 plus pose 21 variant and four additional specialty poses |
| The Restorer | 41 | 1–40; pose 21 has A/B variants |
| The Hacker | 41 | 1–40; pose 40 has A/B variants |
| The Hoarder | 42 | 1–40; poses 31 and 32 have A/B variants |
| The Vault | 41 | 1–40; pose 40 has A/B variants |
| The Whisper | 40 | 1–40 |
| The Smuggler | 40 | 1–40 (plus an unrelated test binary in the directory) |

### Deprecated/archival character

- The Broker also has a complete 1–40 original pose set.
- The Broker is not part of the current 15-character production roster and should be preserved under archive/deprecated, not deleted.

## Humanized-form material discovered

### Ink

The import contains a complete, unique 40-image humanized Ink set:

`_import/computer-archive-2026-09/ink/ink-1-h.png` through `ink-40-h.png`.

It also contains:
- `Ink_Humanized_40_Pose_Bible.md`
- `Ink_Humanized_40_Pose_Production_Bible.docx`

These files are not exact duplicates elsewhere on the branch and therefore require canonical migration.

### Sterling

The import contains the manually produced humanized Sterling set through pose 19, with two candidates for pose 16:

- poses 1–15
- `sterling-16a-h.png`
- `sterling-16b-h.png`
- poses 17–19

This is the authoritative manually developed material and must remain distinct from the 40-image API calibration batch on `main`.

## Character-bible state

Current canonical documentation is concentrated under `canon/character-bible/` and includes:

- individual hero bibles for Atlas, Pixel, Ink, Sterling, Forge, Porter, Echo
- a combined villains bible
- universe/world/rendering/franchise documents
- `Collectiverse_Character_Bible_v1.docx`
- LoRA prompt library
- supplemental Smuggler/Vault/Whisper villain specifications

The target structure should retain franchise-wide canon centrally while placing character-specific canonical material adjacent to each character's asset library.

## Canonical target model

For each active character:

```
characters/<faction>/<character>/
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
      approved/
      rejected/
    contact-sheet/
  production/
    prompts/
    training/
```

Shared universe canon remains under `canon/`. Deprecated characters move to `archive/characters/`.

## Migration priorities

1. Preserve current original-form pose libraries without regeneration.
2. Canonically migrate Ink's complete 40-pose humanized library.
3. Canonically migrate Sterling's manually approved humanized poses and references.
4. Keep API-generated Sterling calibration assets segregated until QA/reference-conditioned regeneration is complete.
5. Normalize active character names and faction paths.
6. Archive The Broker and other superseded material without deleting history.
7. Remove or quarantine non-production test binaries from character pose directories.
8. Reconcile the Pose Factory from `main` only after the canonical character paths are established.
