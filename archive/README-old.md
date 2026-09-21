# Atlas IP — Collectiverse Character & Brand Bible

> Every collectible has a story. Atlas helps people discover that story.

Atlas is the official mascot, AI assistant, and brand ambassador of **Collectiverse**. This repository contains the complete intellectual property documentation, production bible, marketing materials, and asset archive for Atlas and the Collectiverse brand.

---

## Repository Structure

```
atlas-ip/
├── production-bible/        ← Core docs (Character Spec, Brand Bible, Animation, Content Plan)
├── character-bible/         ← Full character bibles (7 Keepers + villains + world + franchise)
├── templates/               ← Production templates (8 specs for comics, thumbnails, social, etc.)
├── scripts/                 ← Automation (LoRA training, comic generation, image pipeline)
├── generated/               ← AI-generated images (test panels, hero concepts)
├── ai-prompts/              ← AI generation templates (Veo, Runway, Kling, DALL-E, etc.)
│   ├── keeper-lora-training-prompts.md   ← 6 Keepers × 40 poses (240 images)
│   └── villain-lora-training-prompts.md  ← 8 Villains × 40 poses (320 images)
├── reference-images/        ← Character Lock Kit (canonical turnaround views)
├── social-media/            ← Campaign images
├── comics/                  ← Published strips (31) + scripts/ (10 new comic scripts)
├── animation/               ← Animation references and motion studies
├── color-specifications/    ← Color palette files (Pantone/RGB/HEX)
├── expressions/             ← Expression sheets and emotion references
├── model-sheets/            ← Orthographic views and proportion guides
├── poses/                   ← Pose library documentation
├── props/                   ← Canonical prop references
├── fonts/                   ← Atlas-specific typography
├── logos/                   ← Atlas logos and wordmarks
├── icons/                   ← Icons and avatars
├── source-files/            ← Original editable files (PSD, AI, BLEND)
├── videos/                  ← Published video content
├── merchandise/             ← Physical product specs
├── legal/                   ← General legal documents
├── trademarks/              ← Trademark filings and registrations
├── copyright/               ← Copyright registrations
├── licensing/               ← IP licensing terms
├── marketing/               ← Brand marketing content
│   ├── blog/
│   ├── emails/
│   ├── email_campaigns/
│   ├── launch_plan/
│   ├── marketplace_events/
│   ├── press_and_atlas/
│   ├── social/
│   ├── social_media/
│   └── website_copy/
├── atlas_character_traits_seed.json  ← Structured trait data (66 traits)
└── README.md
```

---

## Official Design Lock

**Atlas v1.0 is the canonical design.**

The current blue hexagonal white `C` chest emblem is approved and frozen. Proposed shield-style redesigns are rejected for canonical use because they are visually busier and weaken the simplicity of Atlas's badge.

New canonical files:

| Document | Path | Purpose |
|----------|------|---------|
| Canonical Design Lock v1.0 | `production-bible/ATLAS_CANONICAL_DESIGN_LOCK_V1.md` | Freezes the approved Atlas design and current chest emblem |
| Canonical Style Guide | `model-sheets/ATLAS_VERSION_1_CANONICAL_STYLE_GUIDE.md` | Defines visual, pose, color, material, and scale rules |
| Canonical Generation Prompt | `ai-prompts/ATLAS_CANONICAL_GENERATION_PROMPT_V1.md` | Prompt standard for consistent Atlas image generation |
| Official Chest Emblem SVG | `logos/atlas-chest-emblem-v1.svg` | Text-based vector approximation of the official emblem |

---

## Official Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Helmet White | `#FFFFFF` | Helmet, armor, boots |
| Metallic Blue | `#2F7DF6` | Accent panels, chest emblem, boot trim |
| Dark Graphite | `#2C2F36` | Visor, joints, hands, badge background |
| Silver | `#C7CCD4` | Ear discs, metallic details |
| Glowing Green | `#66FF99` | Eyes (FINAL — cannot be changed) |
| Gold | `#FFD700` | Star antenna, accents, badge "C" |

---

## The Keepers — Atlas's Team

Atlas leads **The Keepers of the Collectiverse** — a mixed-species team of heroes protecting collectors.

| Character | Species | Role | Height | Accent Color |
|-----------|---------|------|--------|--------------|
| **Atlas** | Robot | Leader, AI guide | 100% | Guardian Blue (#2F7DF6) |
| **Pixel** | Arctic Fox | Scanner, tech | 90% | Cyan |
| **Ink** | Raven | Storyteller, comics | 80% | Indigo |
| **Sterling** | British Shorthair Cat | Appraiser, value | 60% | Silver |
| **Forge** | Gorilla | Builder, crafts | 130% | Copper |
| **Porter** | Rhino | Protector, vault | 140% | Forest Green |
| **Echo** | Great Horned Owl | Memory, archive | 80% | Violet |

### The Shadow Syndicate (Villains)

| Villain | Species | Opposes |
|---------|---------|---------|
| The Director | Corrupted Robot | Atlas |
| The Counterfeiter | Chameleon | Sterling |
| The Archivist | Spider | Echo |
| The Broker | Cobra | Atlas/team |
| The Smuggler | Octopus | Porter |
| The Restorer | Praying Mantis | Ink |
| The Hacker | Electric Eel | Pixel |
| The Hoarder | Hermit Crab | Forge |

All characters share: chibi proportions, Pixar/DreamWorks style, graphite hexagon badge with gold "C".

Full character bibles in `character-bible/` (12 files, 23,501 words).

---

## LoRA Training Pipeline

Atlas is trained as a Fal.ai LoRA model for consistent AI image generation.

- **Trigger word:** `atlas_character`
- **Training data:** 41 canonical poses (PNG + captions)
- **Model file:** See `.lora-model-url.txt`
- **Scripts:** `scripts/train-atlas-lora.ts`, `scripts/generate-comic-panel.ts`

Keepers + Villains training prompts are written (560 total poses across 14 characters).
Training order: Pixel → Ink → Sterling → Forge → Porter → Echo → Villains.
| Gold Star | `#F5C542` | Star on head |
| Eye Green | `#66FF99` | Crescent eyes (glow) |
| Mouth Orange | `#FF8C42` | Mouth |

---

## Key Documents

| Document | Path | Purpose |
|----------|------|---------|
| Character Spec v1.0 | `production-bible/ATLAS_CHARACTER_SPEC.md` | Exact proportions, colors, materials, quality checklist |
| Brand Bible | `production-bible/ATLAS_BRAND_BIBLE.md` | Personality, voice, values, mission |
| Animation Bible | `production-bible/ATLAS_ANIMATION_BIBLE.md` | Motion principles, timing, camera |
| Content Master Plan | `production-bible/ATLAS_CONTENT_MASTER_PLAN.md` | 10,000-piece content strategy |
| Content Studio Playbook | `production-bible/ATLAS_CONTENT_STUDIO_PLAYBOOK.md` | Pipeline workflow, publishing |
| Video Production Kit | `ai-prompts/ATLAS_VIDEO_PRODUCTION_KIT.md` | Platform-specific generation prompts |
| Trait Seed Data | `atlas_character_traits_seed.json` | 66 structured traits for IP management system |
| Canonical Design Lock v1.0 | `production-bible/ATLAS_CANONICAL_DESIGN_LOCK_V1.md` | Current emblem and character design freeze |

---

## Relationship to Collectiverse App

This repo is the **IP documentation and archive**. Runtime assets served by the Collectiverse app live in the main repo:

```
collectiverse/apps/web/public/images/atlas/poses/    ← 41 PNG + WebP variants (app runtime)
collectiverse/apps/web/public/images/atlas/comics/   ← 31 PNG (app runtime)
collectiverse/apps/web/public/brand/                 ← Logo + mascot (app runtime)
```

Changes to the character spec in THIS repo should be reflected in the app repo via the IP Asset Management system (Task 110).

---

## AI Collaboration

This repo is designed to be accessible by AI assistants (ChatGPT, Amazon Quick, etc.) for:
- Generating new content consistent with the brand bible
- Reviewing character consistency
- Producing marketing copy aligned with brand voice
- Managing the production pipeline

**ChatGPT** can access this repo via GitHub integration (read/write).
**Amazon Quick** accesses the local clone and the main Collectiverse repo directly.

---

## Version

**Atlas v1.0** — Established June 2026

No design changes are permitted without updating the Character Spec and incrementing the version.

---

## IP Notice

Atlas is intellectual property owned by Collectiverse Studio (greg@collectiverse.studio). All character designs, specifications, and production materials in this repository are proprietary and confidential.