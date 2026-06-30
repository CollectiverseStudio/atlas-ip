# ATLAS AI STYLE GOVERNANCE

## Version

1.0

## Purpose

This document governs how AI tools may be used to create Atlas images, comics, videos, marketing assets, and production drafts.

It protects Atlas from style drift, third-party similarity, prompt contamination, and accidental derivative character output.

This document supplements, but does not replace:

- `production-bible/ATLAS_CHARACTER_SPEC.md`
- `production-bible/ATLAS_BRAND_BIBLE.md`
- `production-bible/ATLAS_ANIMATION_BIBLE.md`
- `ai-prompts/ATLAS_VIDEO_PRODUCTION_KIT.md`

---

## Master Rule

AI tools must preserve Atlas. They must not redesign Atlas.

Every prompt should describe Atlas by his own canonical traits rather than relying primarily on another studio, franchise, character, toy line, or copyrighted property as the style source.

---

## Approved Prompt Direction

Use original descriptive language:

- Premium stylized 3D CGI
- Rounded family-friendly robot mascot
- Gloss white helmet and armor
- Metallic blue accents
- Single centered gold five-point star
- Black visor
- Green crescent eyes
- Small orange mouth
- Silver ear discs
- Dark segmented hands
- Friendly collector-guide personality
- Clean studio lighting
- Soft global illumination
- High-quality animated feature look
- Warm, optimistic, educational tone

---

## Avoid Over-Reliance on Third-Party Names

Some existing internal prompts use names of well-known studios or characters as shorthand for quality. Those references should be treated as internal approximation only.

For final production prompts, vendor briefs, public-facing creative requests, and reusable prompt templates, prefer Atlas-specific descriptive language.

### Safer Replacement Language

Instead of relying on named third-party studios, use:

- Premium animated feature quality
- High-end stylized CGI
- Soft cinematic lighting
- Expressive family-friendly character animation
- Rounded toy-inspired proportions
- Clean physically based materials
- Warm collector-focused storytelling

---

## Prohibited Prompt Patterns

Do not prompt Atlas as:

- A specific third-party character
- A mashup with another protected character
- A parody of another mascot
- A character from a named franchise universe
- A superhero from a known comic universe
- A toy brand imitation
- A clone of a movie robot
- A game character reskin
- A political mascot
- A violent, military, horror, adult, or offensive character

---

## Required Character Lock Prefix

Use this conceptual prefix for AI generation:

```text
Atlas is the official Collectiverse mascot. Maintain exact character consistency. Do not redesign Atlas. Preserve the canonical rounded white robot form, metallic blue accents, centered gold five-point star, black visor, green crescent eyes, small orange mouth, silver ear discs, dark segmented hands, Collectiverse chest emblem, friendly collector-guide personality, and clean premium 3D animated appearance.
```

---

## Negative Prompt Library

Use when the platform supports negative prompts:

```text
No redesign, no alternate mascot, no imitation of existing characters, no franchise references, no third-party logos, no weapons, no armor spikes, no cape, no human skin, no hair, no eyebrows, no teeth, no nose, no aggressive expression, no horror lighting, no dark gritty style, no realistic human robot, no military robot, no transformer-like design, no anime redesign, no low-poly model, no damaged armor, no dirty weathered surface, no extra star, no missing chest emblem, no altered colors.
```

---

## AI Output Review Checklist

Before approving any AI output, verify:

- Atlas still matches the Character Specification
- Helmet shape is correct
- Gold star is centered and singular
- Visor is black and rounded
- Eyes are green crescents
- Mouth remains small and orange
- Ear discs are silver and round
- Chest emblem remains present
- Body proportions remain chibi/friendly
- Hands are dark segmented robot hands
- Colors match the official palette
- Pose is friendly and readable
- No third-party character resemblance dominates
- No unapproved logo or copyrighted character appears
- Atlas does not act mean, aggressive, political, or offensive
- Collectibles are handled respectfully

Reject and regenerate if any item fails.

---

## Similarity Risk Review

If an output appears similar to another character, do not use it.

Similarity concerns include:

- Same silhouette
- Same face layout
- Same signature accessory
- Same color-blocking pattern
- Same pose identity
- Same catchphrase or brand behavior
- Same costume or prop association
- Same universe/franchise cues

When in doubt, revise toward Atlas's canonical Collectiverse traits.

---

## Vendor Instructions

Artists, animators, AI operators, editors, and merchandise vendors must receive:

1. Character Spec
2. Brand Bible
3. Animation Bible, when motion is involved
4. This AI Style Governance document, when AI is involved
5. Approved reference images or model sheets

Vendors should not improvise redesigns unless specifically authorized.

---

## Prompt Recordkeeping

For important Atlas assets, retain:

- Final prompt
- Tool name/version where practical
- Date generated
- Output file name
- Approval status
- Any manual edits
- Final publication URL or app location

This helps protect continuity and supports IP provenance.

---

## Final Standard

Atlas should look like Atlas because of Collectiverse Studio's own character system, not because a prompt borrowed the identity of another brand.
