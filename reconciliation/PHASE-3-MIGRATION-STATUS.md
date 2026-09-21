# Atlas IP Reconciliation — Phase 3 Migration Status

Date: 2026-09-21
Working branch: `reconciliation-canonical-v1`

## Completed in this phase

### Canonical original-form libraries
All active roster original-form PNG assets were copied into faction/character-scoped canonical paths while preserving legacy source paths for validation.

- Heroes: Atlas 41, Pixel 40, Ink 41, Sterling 42, Forge 41, Porter 41, Echo 40
- Villains: Director 41, Counterfeiter 45, Restorer 41, Hacker 41, Hoarder 42, Vault 41, Whisper 40, Smuggler 40

Counts above include approved alternates/specialty images where legacy sets contain more than one image for a pose number.

### Humanized Ink
- 40/40 verified humanized poses migrated to `characters/heroes/ink/humanized/poses/approved/`.
- Pose 01 installed as humanized master.
- Humanized character bible and production bible colocated with the character.

### Humanized Sterling
- Manually developed poses 1–15 and 17–19 migrated to canonical approved path.
- Pose 01 installed as master.
- Poses 02 and 05 retained as secondary references.
- Pose 16 A/B variants held under `poses/qa/candidates/`; neither was silently selected.
- API-generated 40-image calibration batch imported from `main` into `poses/generated/calibration-v1/`, explicitly outside Approved.

### Deprecated material
- The Broker's complete 40-pose original set copied to `archive/characters/the-broker/original/poses/`.

### Pose Factory
The newer Pose Factory work from `main` was brought into the reconciliation branch under `tools/pose-factory/`.

The generation and QA scripts were refactored to:
- read canonical master references from `characters/<faction>/<character>/humanized/master/master.png`;
- stage generation under the canonical character directory;
- place QA passes in `approved/` and failures in `rejected/`;
- block characters that lack a canonical humanized master rather than silently using text-only generation;
- keep the GitHub Actions workflow on the branch that invoked it rather than hard-pushing `main`.

## Validation results

Canonical original pose counts match the source libraries.

- Ink humanized approved: 40
- Sterling humanized approved: 18 (poses 1–15, 17–19)
- Sterling pose-16 candidates: 2
- Sterling API calibration images quarantined: 40
- Broker archived: 40

## Still pending

1. Resolve which manually generated Sterling pose 16 candidate is canonical (or replace both).
2. Locate/establish canonical humanized master references for the remaining characters before any further API generation.
3. Build missing pose manifests for characters not yet represented in the Pose Factory manifests directory.
4. Split/colocate villain-specific character bible content while retaining the combined villains canon source.
5. Generate contact sheets and asset manifests from canonical paths.
6. Validate and then retire redundant legacy paths; do not delete import evidence until final sign-off.
7. Integrate the reconciled branch into `main` after validation.
