# Atlas IP — Collectiverse Character & World Assets

> The complete intellectual property repository for the Atlas universe: characters, stories, comics, brand assets, and production materials.

## Repository Structure

```
atlas-ip/
├── characters/                    Character art & AI model assets
│   ├── poses/                     All character poses (originals + lg/md/sm variants)
│   │   ├── [atlas-*.png/txt]      Atlas pose images + prompt files
│   │   ├── echo/                  Echo character poses
│   │   ├── forge/                 Forge character poses
│   │   ├── ink/                   Ink character poses
│   │   ├── pixel/                 Pixel character poses
│   │   ├── porter/               Porter character poses
│   │   ├── sterling/             Sterling character poses
│   │   ├── thebroker/            The Broker poses
│   │   ├── thecounterfeiter/     The Counterfeiter poses
│   │   ├── thehacker/            The Hacker poses
│   │   ├── thehoarder/           The Hoarder poses
│   │   ├── therestorer/          The Restorer poses
│   │   ├── thesmuggler/          The Smuggler poses
│   │   ├── thevault/             The Vault poses
│   │   ├── thewhisper/           The Whisper poses
│   │   ├── hq/                   High-quality renders
│   │   └── vehicle/              Vehicle assets
│   ├── reference-images/          Villain reference imagery
│   │   └── villains/the-director/
│   ├── models/                    LoRA model weights & configs
│   │   ├── atlas-lora.safetensors
│   │   ├── director-lora.safetensors
│   │   └── *-config.json / *-metadata.json
│   └── training-data/             Training image archives
│       ├── atlas-training-images.zip
│       └── director-training-images.zip
│
├── canon/                         Official story canon & lore
│   ├── character-bible/           Character specs & world docs (16 files)
│   │   ├── 00-the-atlas-universe.md
│   │   ├── 01-atlas.md ... 07-echo.md
│   │   ├── 08-villains.md
│   │   ├── 09-world-locations.md
│   │   ├── 10-rendering-animation-rules.md
│   │   ├── 11-franchise-bible.md
│   │   ├── LORA_PROMPTS_ALL.md
│   │   ├── VILLAIN_SPECS_SMUGGLER_VAULT_WHISPER.md
│   │   └── Collectiverse_Character_Bible_v1.docx
│   ├── volumes/                   212 story volumes (.docx)
│   ├── CHARACTER_ROSTER.md        Quick-reference character roster
│   └── atlas_character_traits_seed.json
│
├── comics/                        Comic strip production
│   ├── [31 strip images]
│   ├── panels/                    Individual panel artwork
│   ├── scripts/                   Comic scripts
│   └── generated/                 AI-generated comic outputs
│       ├── comic-001/
│       └── comic-011-atlas-meets-the-director/
│
├── videos/                        Video content
│   ├── [2 .mp4 files]
│   ├── clips/                     Video clips
│   └── README.md
│
├── marketing/                     Marketing materials
│   ├── social-media/              Social media post images (18 PNGs)
│   └── heroes/                    Hero banner images
│
├── brand/                         Brand identity system
│   ├── logos/                     Logo files (SVG + brand variants)
│   ├── colors/                    Color & material specifications
│   ├── fonts/                     Typography assets
│   └── design-system.json         Design token definitions
│
├── assets/                        Music & audio (5.8 GB)
├── scripts/                       Build & utility scripts (25 files)
├── ai-prompts/                    AI generation prompts (6 .md files)
├── production-bible/              Production guidelines (16 files)
├── legal/                         Legal documents
│   └── trademarks/                Trademark filings
├── licensing/                     Licensing agreements
├── copyright/                     Copyright registrations
│
├── archive/                       Deprecated/historical assets
│   ├── generated/                 Old AI-generated images
│   ├── model-sheets-v0/           Legacy model sheets
│   ├── reference-images-v0/       Legacy reference images
│   ├── templates/                 Old production templates (8 .md)
│   └── readmes-from-placeholders/ Preserved README files
│
├── node_modules/                  Dependencies (gitignored)
├── ASSET_MANIFEST.json            Asset registry
├── package.json                   Node.js config
├── package-lock.json              Dependency lock
├── tsconfig.json                  TypeScript config
└── README.md                      This file
```

## Quick Start

- **Looking for a character?** → `characters/poses/` for images, `canon/character-bible/` for specs
- **Need brand assets?** → `brand/` for logos, colors, fonts
- **Writing a story?** → `canon/volumes/` for existing stories, `canon/character-bible/` for lore
- **Making a comic?** → `comics/` for existing strips, `ai-prompts/` for generation prompts
- **Need LoRA models?** → `characters/models/` for weights, `characters/training-data/` for training sets

## Character Roster

| Hero | Villain |
|------|---------|
| Atlas | The Director |
| Pixel | The Broker |
| Ink | The Counterfeiter |
| Sterling | The Hacker |
| Forge | The Hoarder |
| Porter | The Restorer |
| Echo | The Smuggler |
| | The Vault |
| | The Whisper |

## AI Models

Two LoRA models are available in `characters/models/`:
- **atlas-lora.safetensors** — Atlas character generation
- **director-lora.safetensors** — The Director character generation

Training data archives in `characters/training-data/`.

---

*Reorganized 2026-08-03. See `REORGANIZE.ps1` for the migration script.*
