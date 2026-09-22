# Humanized Calibration Run — 2026-09-21

## Run 1
Blocked before generation because `gpt-image-2` does not accept the legacy `input_fidelity` edit parameter. Parameter removed. No images generated.

## Run 2
Reference-conditioned pose-01 images generated successfully for all 13 newly installed humanized masters.

Automated visual QA:
- PASS: Atlas, Echo, Director, Counterfeiter, Restorer, Hacker, Hoarder, Vault, Whisper, Smuggler
- QA process error after generation: Pixel, Forge, Porter

The three process errors were caused by truncated/malformed JSON from the QA model, not image-generation failures. Logs also revealed useful visual findings before truncation:
- Forge candidate was judged to have a canonical-identity mismatch and the mechanical arm on the wrong side.
- Porter candidate was judged not to meet the requested neutral pose because it introduced a shield/action stance.
- Pixel returned a fail verdict before its JSON was truncated, but the detailed reason was lost.

## Corrective action
QA token budget increased and malformed/truncated JSON now produces a conservative FAIL record instead of crashing the job.

## Production gate
Do not launch 40-pose production for Forge, Porter, or Pixel until their pose-01 calibration is rerun through the repaired QA path and passes. The ten successful characters are eligible for the next controlled batch after their calibration artifacts are retained/reviewed.
