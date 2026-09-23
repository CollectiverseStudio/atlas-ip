# Frugal Production Policy

Effective 2026-09-23 after additional API credits were added.

## Cost controls

1. Generate only poses with no existing approved or rejected result.
2. Never automatically regenerate rejected poses during the first completion pass.
3. Process one character at a time.
4. Checkpoint after every character.
5. A moderation-blocked pose is skipped, not repeatedly retried.
6. A transient per-pose generation error is skipped so completed images are not lost.
7. An empty/malformed QA response becomes a conservative FAIL rather than aborting QA for the remaining images.
8. Insufficient quota still stops the run immediately.
9. Rejected-pose remediation is a later targeted pass, prioritized by failure pattern and value, not brute-force regeneration.

## Rationale

The first production wave showed that repeated generation/QA retries can consume substantial API balance. The frugal policy maximizes roster coverage per dollar while retaining strict approval criteria.
