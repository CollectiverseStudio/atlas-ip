# Atlas IP Reconciliation — Phase 1 Inventory

Date: 2026-09-21
Source branch: `atlas-a001-media`
Import source: `_import/computer-archive-2026-09/`

## Executive summary

- Repository files inventoried: 2,390
- Imported archive files inventoried: 971
- Imported archive size in Git: 1,554,090,389 bytes (~1.45 GiB)
- Imported PNG images: 756
- Imported DOCX documents: 212
- Imported Markdown documents: 2
- Imported CMD files: 1
- Exact imported files already present elsewhere in the reorganized branch (same Git blob SHA): 902
- Imported files not duplicated elsewhere in the reorganized branch: 69

This means the earlier local reorganization already incorporated **902 of 971 imported files (92.9%) exactly**. The import directory must remain a read-only evidence/staging source until reconciliation is complete.

## Material unique to the import

The 69 unique files consist primarily of:

1. **Ink humanized production set**
   - 40 PNG poses: `ink/ink-1-h.png` through `ink/ink-40-h.png`
   - `Ink_Humanized_40_Pose_Bible.md`
   - `Ink_Humanized_40_Pose_Production_Bible.docx`

2. **Sterling humanized manually produced set**
   - 20 PNG files currently present in the archive:
     - poses 1–15
     - pose 16 variants: `sterling-16a-h.png`, `sterling-16b-h.png`
     - poses 17–19
   - These are separate from the API-generated Sterling calibration batch on `main`.

3. **Roster/reference images**
   - Four `Character Roster (Complete)...png` files
   - `character roster.png`

4. Import README and upload helper script.

## Character-name inventory inside import

Counts below are filename/path matches, not final canonical classifications.

| Character | Files | Images | Docs |
|---|---:|---:|---:|
| Atlas | 83 | 72 | 11 |
| Pixel | 50 | 40 | 10 |
| Ink | 95 | 83 | 12 |
| Sterling | 72 | 62 | 10 |
| Forge | 51 | 41 | 10 |
| Porter | 51 | 41 | 10 |
| Echo | 50 | 40 | 10 |
| Director | 51 | 41 | 10 |
| Counterfeiter | 55 | 45 | 10 |
| Restorer | 41 | 41 | 0 |
| Hacker | 41 | 41 | 0 |
| Hoarder | 52 | 42 | 10 |
| Vault | 44 | 41 | 3 |
| Whisper | 40 | 40 | 0 |
| Smuggler | 50 | 40 | 10 |

## Reconciliation rules

1. Do not delete `_import/computer-archive-2026-09` until the canonical migration is validated.
2. Use Git blob SHA equality as proof of exact duplicate content.
3. Preserve both original-form and humanized-form character IP.
4. Do not treat API-generated Sterling calibration images as approved merely because their legacy path contains `approved`.
5. Humanized Ink's 40-pose set is a distinct canonical candidate and must not be confused with original raven Ink.
6. Sterling's manually approved humanized assets are the identity/reference source for continued generation and QA.
7. Deprecated characters/material remain preserved under archive rather than deleted.
8. Reconcile `main` Pose Factory work separately; do not blind-merge the diverged branches.

## Next phase

- Map all 902 exact duplicates from import to their canonical current locations.
- Classify the 69 unique import files into canonical destinations.
- Audit original 40-pose completeness by character.
- Audit humanized pose completeness by character.
- Audit character-bible/canon documentation.
- Produce a migration manifest before destructive moves or branch integration.
