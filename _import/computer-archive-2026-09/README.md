# Collectiverse Studios — Character IP Assets

Source folder for all Keeper character pose images. These are uploaded to S3 and committed to the [atlas-ip](https://github.com/CollectiverseStudio/atlas-ip) GitHub repo.

## Characters

| Character | Species | Role | Poses | Status |
|-----------|---------|------|-------|--------|
| **Atlas** | Red Panda | The Discoverer | 40 | ✅ Complete (in atlas-ip repo, named poses) |
| **Ink** | Raven | The Authenticator | 40 | ✅ Complete |
| **Pixel** | Chameleon | The Cataloger | 40 | ✅ Complete |
| **Sterling** | Fox | The Appraiser | 42 | ✅ Complete |
| **Forge** | Gorilla | The Restorer | 41 | ✅ Complete |
| **Porter** | White Rhinoceros | The Guardian | 41 | ✅ Complete |
| **Echo** | Great Horned Owl | The Memory Keeper | 40 | ✅ Complete |
| **The Hoarder** | — | Syndicate Villain | 15 | 🔶 WIP |

## Folder Structure

```
ip/
├── ink/                    40 poses (ink-1.png through ink-40.png)
├── pixel/                  40 poses (pixel-1.png through pixel-40.png)
├── sterling/               42 poses (sterling-1.png through sterling-42.png)
├── forge/                  41 poses (forge-1.png through forge-41.png)
├── porter/                 41 poses (porter-1.png through porter-41.png)
├── echo/                   40 poses (echo-1.png through echo-40.png)
├── thehoarder/             15 poses (WIP — Syndicate villain)
├── hq/                     Collectiverse Studios HQ concept art
├── vehicle/                Team vehicle concept art
├── upload-and-commit.cmd   Script to copy → S3 → GitHub
└── README.md               This file
```

## S3 Location

After upload: `s3://collectiverse-assets-prod/ip/characters/`

```
s3://collectiverse-assets-prod/ip/characters/
├── ink/ink-1.png ... ink-40.png
├── pixel/pixel-1.png ... pixel-40.png
├── sterling/sterling-1.png ... sterling-42.png
├── forge/forge-1.png ... forge-41.png
├── porter/porter-1.png ... porter-41.png
├── echo/echo-1.png ... echo-40.png
├── thehoarder/thehoarder-1.png ... thehoarder-15.png
├── hq/hq first draft.png
└── vehicle/cruiser first draft.png, cruiser second draft.png
```

## GitHub Location

Repo: `CollectiverseStudio/atlas-ip`
Path: `poses/originals/{character}/`

Atlas uses descriptive names (`atlas-arms-crossed-1.png`). Other characters use numbered names (`ink-1.png`). Future characters will follow the numbered pattern initially, then get renamed to descriptive names once pose descriptions are locked.

## How to Upload

```bash
cd "C:\Users\bellgj\Documents\Personal\collectiverse data\ip"
upload-and-commit.cmd
```

Prerequisites:
- `aws sso login --profile collectiverse-prod`
- Git push access to CollectiverseStudio/atlas-ip

## Image Specifications

- Format: PNG (transparent background)
- Style: Pixar/DreamWorks 3D CGI
- Resolution: ~1024x1024 (varies)
- Background: Transparent or plain white
- Usage: App UI, marketing, social media, merchandise

## Notes

- Atlas's poses are already in the atlas-ip repo with descriptive filenames and .txt caption files
- Ink has variants: ink-23a.png, ink-23b.png (two versions of pose 23)
- Forge has variants: forge-12a.png, forge-12b.png (two versions of pose 12)
- The Hoarder is the first Syndicate villain — 15 poses done, more coming
