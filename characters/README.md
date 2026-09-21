# Collectiverse Character IP Library

This directory is the canonical character-asset library.

## Factions

- `heroes/` — Atlas, Pixel, Ink, Sterling, Forge, Porter, Echo
- `villains/` — Director, Counterfeiter, Restorer, Hacker, Hoarder, Vault, Whisper, Smuggler

The current roster is defined by `canon/CURRENT-CHARACTER-ROSTER.md`.

## Forms

Every character is managed in two independent forms:

- `original/` — the original robot/animal/chibi mascot form.
- `humanized/` — the young-adult humanistic form.

Never overwrite one form with the other.

## Pose lifecycle

Humanized generation follows:

`generated → automated QA → approved | rejected`

Only assets under `poses/approved/` are production-approved. A successfully generated file is not automatically approved.

For A/B variants, B is canonical and A remains the backup per `canon/POSE-VARIANT-POLICY.md`.

## Legacy paths

During reconciliation, older paths and `_import/` are intentionally retained. They are evidence/provenance sources and will not be removed until canonical counts and references are validated.

## Contact sheets

Contact sheets are generated from the approved directories with:

`npm run ip:contact-sheet -- --faction=heroes --character=ink --form=humanized`

## Validation

Run:

`npm run ip:validate`

The validator checks active roster original-pose coverage, humanized Ink completeness, required canon policy files, and reports humanized master availability.
