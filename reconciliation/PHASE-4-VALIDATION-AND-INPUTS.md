# Phase 4 — Validation and Remaining Humanized Inputs

Date: 2026-09-21

## Validation

The first GitHub Actions canonical-IP validation run completed successfully.

The validator confirms:
- all 15 active original-form character libraries contain at least 40 PNG assets;
- Ink has exactly 40 approved humanized poses;
- Sterling's manually approved humanized sequence is present;
- current roster canon and A/B variant policy are present.

A CI workflow now reruns these checks whenever canonical character/canon/reconciliation paths change.

## Contact sheets

A reusable contact-sheet generator and GitHub Actions workflow were added. It creates visual grids from canonical approved pose directories rather than legacy paths.

## Current humanized asset discovery

The imported computer archive contains explicit humanized pose files only for:
- Ink — complete 40/40 set;
- Sterling — manually developed set through pose 19, including A/B pose 16.

No explicit `-h` / humanized PNG sets for the other 13 characters were found in the imported archive.

The ChatGPT File Library contains several later character-card/roster images, but these are not being promoted automatically to canonical masters because filename/search relevance alone is insufficient to prove that each image is the user's locked humanized master.

## Production safety rule

Pose Factory now blocks generation for a character that lacks a canonical humanized master. This intentionally prevents spending API credits on text-only identity reconstruction.

## Next required production input

Before automated humanized pose generation can proceed for Pixel, Forge, Porter, Echo, Atlas, Director, Counterfeiter, Restorer, Hacker, Hoarder, Vault, Whisper, or Smuggler, the exact approved humanized master for that character must be identified or supplied.

This is a deliberate stop condition: do not guess the canonical master.
