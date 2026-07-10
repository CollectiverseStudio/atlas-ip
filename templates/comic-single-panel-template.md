# 🎯 Atlas Studio — Single Panel Comic Template

**Template ID:** `TMPL-COMIC-SINGLE`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Single panel gag / standalone illustration with caption  

---

## 📐 Dimensions

| Variant | Width | Height | Aspect Ratio | Use Case |
|---------|-------|--------|--------------|----------|
| **Square** | 1080px | 1080px | 1:1 | Instagram feed, primary |
| **Portrait** | 1080px | 1350px | 4:5 | Instagram (more feed space) |
| **Landscape** | 1200px | 628px | ~1.91:1 | Twitter/X, Open Graph |

**Resolution:** 72 DPI (web) / 300 DPI (print)  
**Color Mode:** sRGB  
**File Formats:** PNG (primary), WebP (web), JPG (fallback)

---

## 🗺️ Zone Map — Square (1080x1080)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              BACKGROUND ZONE                     │
│              (100% - full bleed)                  │
│                                                  │
│         ┌────────────────────────┐               │
│         │                        │               │
│         │                        │               │
│         │    CHARACTER ZONE      │               │
│         │    (center 70%)        │               │
│         │                        │               │
│         │    756px × 648px       │               │
│         │    centered at         │               │
│         │    (540, 432)          │               │
│         │                        │               │
│         │                        │               │
│         │                        │               │
│         └────────────────────────┘               │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │           CAPTION ZONE                       │ │
│ │           (bottom 20%)                       │ │
│ │           Semi-transparent overlay           │ │
│ │           rgba(27, 43, 94, 0.85)            │ │
│ │                                    ┌──────┐ │ │
│ │    "Caption text goes here"        │ LOGO │ │ │
│ │                                    │64x64 │ │ │
│ │                                    └──────┘ │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Zone Specifications (1080x1080)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Background | 0 | 0 | 1080px | 1080px | Full canvas |
| Character | 162px | 108px | 756px | 648px | Center 70%, top 60% |
| Caption Overlay | 0px | 864px | 1080px | 216px | Bottom 20% |
| Caption Text | 40px | 884px | 900px | 176px | 40px padding |
| Logo | 976px | 968px | 64px | 64px | Bottom-right in caption |

---

## 🎨 Color Specifications

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| Caption Overlay | Navy (85% opacity) | `rgba(27, 43, 94, 0.85)` | Semi-transparent bar |
| Caption Text | White | `#FFFFFF` | High contrast on overlay |
| Caption Accent | Atlas Gold | `#F5A623` | For quotes or key words |
| Background Default | Light Gray | `#F0F2F5` | If no illustrated BG |
| Panel Border (opt) | Navy | `#1B2B5E` | 4px, only if comic-style |
| SFX Text | Variable | Per mood | Red for action, blue for chill |

### Background Mood Options

| Mood | Primary | Secondary | Use |
|------|---------|-----------|-----|
| Happy/Funny | `#FFF8E7` | `#FFE4B5` | Warm gags |
| Surprised | `#E8F4FD` | `#B8E0F7` | Reveal jokes |
| Frustrated | `#FFE8E8` | `#FFCCCB` | Relatable struggles |
| Excited | `#F5A623` → `#FF6B35` | gradient | Hype/celebration |
| Chill | `#E8F5E9` | `#C8E6C9` | Zen collecting moments |

---

## 🔤 Font Specifications

| Element | Font Family | Weight | Size | Color |
|---------|------------|--------|------|-------|
| Caption (primary) | Nunito | Bold | 36-42px | `#FFFFFF` |
| Caption (secondary) | Nunito | Regular | 28-32px | `#E0E0E0` |
| SFX Text | Bangers | Regular | 48-72px | Variable |
| Attribution | Inter | Light | 18px | `#AAAAAA` |
| Hashtag | Inter | Medium | 20px | `#F5A623` |

### Caption Rules
- Maximum 12 words in caption
- Single line preferred, two lines maximum
- Center-aligned within caption zone
- No period at end (unless multiple sentences)
- Can use emoji (max 2 per caption)

---

## ✅ Required Elements

1. **Atlas character** — Clearly visible, minimum 50% of character zone height
2. **Single clear action/emotion** — One joke, one reaction, one moment
3. **Caption** — Text overlay at bottom (can be minimal: 2-3 words)
4. **Logo** — Collectiverse logo, 64x64px, bottom-right corner
5. **Background** — At minimum a solid color from mood palette
6. **Readable at thumbnail size** — Character and emotion clear at 200px width

---

## 🔲 Optional Elements

- Speech bubble (floating, no tail needed in single panel)
- Sound effect text (SFX)
- Props / collectibles in scene
- Environmental details (shelf, convention, store)
- Secondary character (max 1 additional)
- Decorative border or vignette
- Hashtag text in caption zone
- Small "series" label (e.g., "Collector Moods #7")

---

## ✔️ Do's

- ✅ Make Atlas's expression the punchline — his face sells the joke
- ✅ Use negative space — single panels need breathing room
- ✅ Make it scroll-stopping — bold action or extreme emotion
- ✅ Ensure the image works WITHOUT the caption (visual gag first)
- ✅ Keep Atlas at 60-80% of canvas height for impact
- ✅ Use dramatic angles (low angle = epic, high angle = vulnerability)
- ✅ Include one recognizable collectible when relevant

---

## ❌ Don'ts

- ❌ Don't overcrowd with multiple characters (save that for 4-panel)
- ❌ Don't use more than 2 lines of caption text
- ❌ Don't place text over Atlas's face
- ❌ Don't use busy/detailed backgrounds that compete with character
- ❌ Never make Atlas smaller than 40% of canvas height
- ❌ Don't use caption font smaller than 32px (unreadable on mobile)
- ❌ Avoid text-heavy content — this format is VISUAL first
- ❌ Don't place the logo over the character

---

## 🤖 AI Generation Prompts

### Base Prompt Structure
```
atlas_character [EMOTION/ACTION], [SCENE CONTEXT], single panel 
illustration, clean digital art style, expressive cartoon, 
[BACKGROUND COLOR/MOOD], centered composition, high quality, 
sharp lines, collectible hobby theme
```

### Example Prompts

**Prompt 1 — The Find:**
```
atlas_character with wide eyes and open mouth, holding a rare holographic 
Pokemon card up to the light, single panel illustration, dramatic lighting 
from the card glow, warm background, centered composition, expressive 
cartoon style, clean digital art, high quality, collectible hobby, 
excited energy, sparkle effects around card
```

**Prompt 2 — The Pain:**
```
atlas_character looking at phone screen with devastated expression, 
single panel illustration, online auction showing "OUTBID" notification, 
blue-gray mood background, centered composition, expressive cartoon 
style, clean digital art, slumped posture, comedic despair, relatable 
humor
```

**Prompt 3 — The Flex:**
```
atlas_character confidently posing with arms crossed, standing in front 
of a perfectly organized display shelf of collectible figures, single 
panel illustration, warm golden background glow, centered composition, 
proud expression, clean digital art style, high quality, soft lighting, 
achievement energy
```

---

## 📝 Example Topics for This Template

1. **"When the PSA 10 hits different"** — Atlas literally glowing while holding a perfect-grade card
2. **"Me explaining to my partner why I need this"** — Atlas with presentation board of justifications
3. **"That feeling when free shipping kicks in"** — Atlas floating/ascending in pure joy

---

## 📏 Production Checklist

- [ ] Atlas is clearly visible and expressive
- [ ] Single clear emotion/action (not ambiguous)
- [ ] Caption is ≤12 words and readable
- [ ] Logo placed at 64x64 in bottom-right
- [ ] Background supports (not competes with) character
- [ ] Works at thumbnail size (expression still readable)
- [ ] Caption overlay at correct opacity (85%)
- [ ] Exported at 1080x1080 minimum
- [ ] Alt-text written for accessibility
- [ ] File named: `comic-single-[topic]-[date].png`

---

## 🔄 Variant Notes

### Portrait Variant (1080x1350)
- Caption zone expands to bottom 25% (337px)
- Character zone shifts up, gains vertical space
- Better for "tall" poses (standing, jumping)

### Landscape Variant (1200x628)
- Caption zone: bottom 25% (157px)
- Character shifted to right 40%
- Text can appear left of character
- Better for "scene" compositions with environment
