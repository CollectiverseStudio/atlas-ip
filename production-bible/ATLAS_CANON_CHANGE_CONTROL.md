# ATLAS CANON CHANGE CONTROL

## Version

1.0

## Purpose

This document defines how Atlas canon is changed without damaging continuity, ownership, visual consistency, or brand trust.

This document is procedural. It does not replace the Character Specification, Brand Bible, or Animation Bible.

---

## Canon Definition

Atlas canon includes the approved facts, visual rules, behavior rules, personality rules, production rules, and usage standards that define Atlas.

Canon includes:

- Character appearance
- Personality
- Voice
- Motion behavior
- Approved colors
- Approved props
- Approved expressions
- Collectiverse relationship
- Taglines and catchphrases
- Forbidden design changes
- Approved production workflows

---

## Change Categories

### Category A — Documentation Clarification

A clarification that explains existing canon without changing it.

Examples:

- Adding examples
- Expanding a checklist
- Clarifying vendor instructions
- Adding safer prompt wording

Version impact: patch or no version change.

### Category B — Canon Expansion

Adds new approved usage while preserving the core Atlas design.

Examples:

- New approved prop
- New pose family
- New expression sheet
- Holiday accessory
- App assistant behavior
- Merchandise standard

Version impact: minor version update may be required.

### Category C — Canon Change

Changes an existing protected element.

Examples:

- Helmet shape
- Eye color
- Star placement
- Chest emblem
- Body proportions
- Personality rule
- Primary color palette

Version impact: major version update required. Requires explicit approval.

### Category D — Prohibited Change

Not allowed unless Collectiverse Studio intentionally creates a separate character or formal variant.

Examples:

- Removing the gold star
- Replacing the visor with human eyes
- Giving Atlas weapons
- Making Atlas political
- Making Atlas resemble another protected character
- Removing Collectiverse identity

Version impact: reject.

---

## Approval Workflow

1. Identify the proposed change.
2. Classify it as A, B, C, or D.
3. List affected files and assets.
4. Check against Character Spec, Brand Bible, Animation Bible, and AI Style Governance.
5. Assess third-party similarity risk.
6. Decide whether version number changes.
7. Commit the approved change to this repository.
8. Update app/runtime assets only after this repository is updated.

---

## Change Request Template

```markdown
# Atlas Change Request

## Title

## Requestor

## Date

## Category
A / B / C / D

## Proposed Change

## Reason

## Affected Canon Documents

## Affected Asset Folders

## Similarity / IP Risk Review

## Version Impact

## Decision
Approved / Rejected / Needs Revision

## Notes
```

---

## Protected Elements Requiring Extra Review

Changes to these require explicit approval:

- Name
- Helmet shape
- Star design or placement
- Visor design
- Eye color or shape
- Mouth color or size
- Chest badge
- Color palette
- Body proportions
- Voice/personality
- Relationship to Collectiverse
- Merchandise identity
- App assistant behavior

---

## Runtime Asset Rule

The main Collectiverse app may contain runtime copies of Atlas images, comics, and UI assets.

Runtime assets do not define canon.

If runtime assets differ from this repository, fix the runtime asset or update this repository through formal change control.

---

## Versioning Model

Recommended format:

```text
Atlas vMAJOR.MINOR.PATCH
```

- MAJOR: core design or canon changes
- MINOR: approved expansions, new usage categories, new pose systems
- PATCH: clarifications, checklists, governance improvements

Current canon begins at Atlas v1.0.

---

## Practical Rule

Do not change Atlas because one generation looks good. Change Atlas only when the character system needs it and the change improves long-term consistency.
