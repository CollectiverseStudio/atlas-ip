# Collectiverse Character Pose Factory

Automated production pipeline for the humanized Collectiverse character pose library.

## Goal
Generate 40 production-ready PNG poses for each of 15 characters with minimal operator interaction, consistent character identity, automated QA, retry handling, resumability, and packaged outputs for comic production.

## Production rules
- 15 characters × 40 poses = 600 approved final pose assets.
- PNG only for final pose assets.
- No pose number, title, caption, border, watermark, or QA text embedded in the artwork.
- Character identity is locked from the approved reference image + character bible.
- Only pose, expression, camera angle, and approved props may change.
- Every pose is QA checked before approval.
- Failed QA automatically retries up to the configured retry limit.
- Jobs are resumable and skip already-approved poses.
- LEFT/RIGHT instructions are preserved from the pose manifest.

## Image model
Default: `gpt-image-2.5-sunburst-2026-09-08` for consistency and editing precision.

The dated snapshot is intentionally pinned so the production run does not silently change model behavior midway through the library.

Final API requests must use `output_format: "png"`.

## Operator workflow
1. Put the approved character reference image at the path specified in `config/characters.json`.
2. Put `OPENAI_API_KEY` in the execution environment. Never commit it.
3. Run the queue command.
4. The worker generates poses, runs QA, retries failures, and writes approved PNGs.
5. Packaging creates a character contact sheet and production manifest after all 40 poses pass.

## Security
The API key must be provided through an environment secret. It must never be committed to this repository or written to production manifests.

## Status
Initial orchestration/configuration scaffold. Existing approved Ink and Sterling assets can be imported as completed assets so they are not regenerated unnecessarily.
