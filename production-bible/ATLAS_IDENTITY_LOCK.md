# Atlas Identity Lock

## Task ID

A001.6

## Status

**ACTIVE**

## Purpose

Create the single authoritative Atlas master character asset that every future Atlas image, pose, comic, video, merchandise mockup, animation, and licensing asset must derive from or be checked against.

This replaces the unstable reference-image workflow where generated assets were promoted too quickly and visual drift entered canonical folders.

---

## Canonical Rule

The Atlas Identity Lock is the highest visual authority for Atlas.

No generated image, pose, comic, animation, or marketing asset may redefine Atlas.

The Identity Lock defines Atlas.

Everything else is a rendering, pose, expression, or derivative use of Atlas.

---

## Repository Locations

```text
canonical/
  atlas-master-v2.0.png
  atlas-master-lock-v2.0.md
  atlas-master-generation-prompt-v2.0.md

reference-lock/
  atlas-lock-front.png
  atlas-lock-back.png
  atlas-lock-left.png
  atlas-lock-right.png
  atlas-lock-3q-front.png
  atlas-lock-3q-back.png
  atlas-lock-head.png
  atlas-lock-hands.png
  atlas-lock-boots.png
  atlas-lock-badge.png
  atlas-lock-contact-sheet.png

drafts/
  reference-images/
  model-sheets/
```

---

## Approval Flow

```text
Generated
  ↓
drafts/
  ↓
QA Review
  ↓
Approved
  ↓
canonical/
  ↓
reference-lock/
  ↓
A002 Pose Library
```

No image moves directly from generation to canonical.

---

## Locked Atlas v2.0 Traits

- Large rounded glossy white helmet.
- Metallic blue helmet accents.
- Centered metallic gold five-point star.
- Single continuous black rounded visor.
- Green illuminated crescent eyes.
- Small orange rounded-rectangle mouth.
- Silver flush-mounted ear discs.
- Compact chibi robot body.
- Glossy white armor.
- Metallic blue accent panels.
- Black segmented hands with five fingers.
- Dark graphite hexagonal chest badge with blue `C`.
- White rounded boots with blue trim and black sole.
- Friendly, smart, premium, trustworthy expression.

---

## Forbidden Drift

Reject any Atlas asset with:

- Cape.
- Hair.
- Eyebrows.
- Nose.
- Teeth.
- Human skin.
- Muscles.
- Weapons.
- Armor spikes.
- Wrong eye shape.
- Circular eyes with pupils.
- Missing star.
- Wrong chest emblem.
- Green suit replacing the white and blue body.
- Different boot style.
- Different helmet geometry.
- Different proportions.

---

## A002 Gate

A002 Pose Library remains blocked until:

- `canonical/atlas-master-v2.0.png` exists.
- `canonical/atlas-master-lock-v2.0.md` exists.
- The reference-lock kit is rebuilt from the approved master.
- Generated test poses match Atlas v2.0.

---

## Current Decision

A001 documentation remains valid.

A001 media is being rebuilt.

A001.6 Atlas Identity Lock is now the active task that unlocks A002.
