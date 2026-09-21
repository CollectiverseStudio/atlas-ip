# Pose Variant Selection Policy

**Status:** Canonical rule

When a pose has both an **A** and **B** version:

- **B is always the approved/canonical pose.**
- **A is retained as the backup/alternate.**
- Neither file is deleted.
- Canonical consumers should use the unsuffixed pose filename (for example `sterling-17.png`), which points to the B variant's exact Git blob.
- The original `a` and `b` filenames remain preserved for provenance and fallback use.

This rule applies to original-form and humanized-form character assets unless Gregory Bell explicitly overrides a specific pose in the future.

Applied during the September 2026 reconciliation to:
- Ink 23
- Sterling original 17, 18
- Forge 12
- Porter 6
- Director 21
- Counterfeiter 21
- Restorer 21
- Hacker 40
- Hoarder 31, 32
- Vault 40
- Sterling humanized 16

The A variants remain available as backups.
