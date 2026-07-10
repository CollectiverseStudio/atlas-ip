# 🖼️ Atlas Studio — YouTube/Video Thumbnail Template

**Template ID:** `TMPL-THUMBNAIL`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Video thumbnail / clickbait-style preview image  

---

## 📐 Dimensions

| Variant | Width | Height | Aspect Ratio | Use Case |
|---------|-------|--------|--------------|----------|
| **YouTube** | 1280px | 720px | 16:9 | YouTube, Vimeo |
| **Podcast** | 1400px | 1400px | 1:1 | Spotify, Apple Podcasts |
| **Short-form** | 1080px | 1920px | 9:16 | YouTube Shorts, TikTok, Reels cover |

**Resolution:** 72 DPI  
**Color Mode:** sRGB  
**File Formats:** PNG (primary), JPG (max quality)  
**Max File Size:** 2MB (YouTube limit)

---

## 🗺️ Zone Map — Primary (1280x720)

```
┌──────────────────────────────────────────────────────────────────┐
│┌────────┐                                                        │
││  LOGO  │         BACKGROUND ZONE                                │
││ 120x60 │         (100% - full bleed)                            │
││top-left │         Gradient / environment                         │
│└────────┘                                                        │
│                                                                  │
│ ┌─────────────────────────────┐   ┌────────────────────────────┐ │
│ │                             │   │                            │ │
│ │      TEXT ZONE              │   │     CHARACTER ZONE         │ │
│ │      (left 60%)             │   │     (right 40%)            │ │
│ │                             │   │                            │ │
│ │      768px × 480px          │   │     512px × 580px          │ │
│ │                             │   │                            │ │
│ │  ┌─────────────────────┐    │   │     Atlas face/pose        │ │
│ │  │  HEADLINE TEXT      │    │   │     Large, expressive      │ │
│ │  │  (max 5 words)      │    │   │     May bleed off edge     │ │
│ │  │  BIG & BOLD         │    │   │                            │ │
│ │  └─────────────────────┘    │   │                            │ │
│ │                             │   │                            │ │
│ │  ┌─────────────────────┐    │   │                            │ │
│ │  │  SUB-TEXT (optional) │   │   │                            │ │
│ │  └─────────────────────┘    │   │                            │ │
│ │                             │   │                            │ │
│ └─────────────────────────────┘   └────────────────────────────┘ │
│                                                                  │
│                          ┌──────────────────────┐                │
│                          │ ACCENT BAR (optional) │                │
│                          │ bottom color strip     │                │
│                          └──────────────────────┘                │
└──────────────────────────────────────────────────────────────────┘
```

### Zone Specifications (1280x720)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Background | 0 | 0 | 1280px | 720px | Full canvas |
| Logo | 24px | 24px | 120px | 60px | Top-left, always visible |
| Text Zone | 40px | 120px | 728px | 480px | Left 57% |
| Headline | 40px | 200px | 700px | 280px | Within text zone |
| Sub-text | 40px | 500px | 600px | 60px | Below headline |
| Character Zone | 768px | 70px | 512px | 650px | Right side, can bleed bottom |
| Accent Bar | 0px | 690px | 1280px | 30px | Optional bottom strip |

---

## 🎨 Color Specifications

### Primary Thumbnail Palette

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| Text Primary | White | `#FFFFFF` | Headline text |
| Text Stroke | Black | `#000000` | 4-6px outline on all text |
| Text Shadow | Dark | `rgba(0,0,0,0.5)` | Drop shadow backup |
| Accent Pop 1 | Hot Yellow | `#FFD700` | Arrows, circles, emphasis |
| Accent Pop 2 | Electric Orange | `#FF6B35` | Urgency, excitement |
| Accent Pop 3 | Bright Red | `#E63946` | "Breaking" / alert content |
| Background Grad Start | Atlas Navy | `#1B2B5E` | Dark gradient base |
| Background Grad End | Deep Purple | `#2D1B69` | Gradient endpoint |
| Accent Bar | Atlas Gold | `#F5A623` | Bottom strip |

### Background Gradient Options

| Style | Start → End | Use Case |
|-------|-------------|----------|
| Classic | `#1B2B5E` → `#0D1B3E` | Standard videos |
| Hype | `#FF6B35` → `#E63946` | Exciting reveals |
| Chill | `#1B5E4B` → `#0D3E2E` | Tips/educational |
| Premium | `#2D1B69` → `#1B0D3E` | Unboxing/luxury |
| Clean | `#F0F2F5` → `#FFFFFF` | Minimal/modern |

---

## 🔤 Font Specifications

| Element | Font Family | Weight | Size | Extras |
|---------|------------|--------|------|--------|
| Headline | Montserrat / Impact | Black (900) | 72-96px | 5px black stroke, ALL CAPS |
| Sub-text | Montserrat | Bold | 32-40px | 3px black stroke |
| Number/Stat | Montserrat | Black | 120px+ | For "TOP 10" type content |
| Logo Text | Brand font | — | — | Use SVG logo |

### Typography Rules
- **Maximum 5 words** in headline (fewer = better)
- ALL CAPS always for headline
- Every character of text MUST have a dark stroke/outline
- Text must be readable at 150px thumbnail size
- Never stack more than 2 lines
- Slight rotation (-2° to +2°) adds energy
- Scale important words 20% larger than others

---

## ✅ Required Elements

1. **Atlas character** — Face or upper body, right 40% of frame
2. **Headline text** — Max 5 words, stroked, massive
3. **Collectiverse logo** — Top-left, 120x60px
4. **High contrast** — Text must pop against any background
5. **Emotional expression** — Atlas's face must convey the video's energy
6. **Color pop accent** — At least one yellow/orange element for attention

---

## 🔲 Optional Elements

- Arrow pointing at something (classic YouTube style)
- Circle/highlight around a collectible
- Red "X" or green checkmark
- Number badge (e.g., "#1", "10x")
- "NEW" or "RARE" badge
- Secondary character/item on left side
- Blur/bokeh background instead of gradient
- Emoji as text element (🔥, 😱, 💰)
- Episode number badge
- Border glow around character

---

## ✔️ Do's

- ✅ Make Atlas's expression EXTREME — subtlety doesn't work at thumbnail size
- ✅ Use the "rule of thirds" — text left, character right
- ✅ Test readability at 168x94px (YouTube sidebar size)
- ✅ Use complementary colors (blue bg + orange accent)
- ✅ Create visual curiosity — what is Atlas looking at/reacting to?
- ✅ Make the subject/collectible visible (even if partially hidden for mystery)
- ✅ Use consistent style across a video series for brand recognition
- ✅ Add a subtle vignette to draw eyes to center

---

## ❌ Don'ts

- ❌ Never use more than 5 words in headline
- ❌ Don't use thin fonts — nothing below Bold weight
- ❌ Don't place text without stroke/outline (unreadable on all backgrounds)
- ❌ Don't make Atlas smaller than 50% of frame height
- ❌ Avoid blue text on blue backgrounds
- ❌ Don't use stock photo backgrounds (always illustrated/gradient)
- ❌ Never center-compose (split composition always wins for thumbnails)
- ❌ Don't leave dead space — every area should work visually
- ❌ Don't use light/pastel colors for text — must be high contrast

---

## 🤖 AI Generation Prompts

### Base Prompt Structure
```
atlas_character [EXTREME EXPRESSION], [POSE], YouTube thumbnail style, 
right side of frame, looking [DIRECTION], [BACKGROUND DESCRIPTION], 
vibrant colors, dramatic lighting, high contrast, professional quality, 
digital illustration, bold and eye-catching, 16:9 aspect ratio
```

### Example Prompts

**Prompt 1 — Unboxing Reaction:**
```
atlas_character with extremely surprised face and hands on cheeks, 
mouth wide open, YouTube thumbnail style, right side of frame, 
looking at a glowing mystery box on the left, dark purple gradient 
background with golden sparkles, dramatic rim lighting, vibrant colors, 
high contrast, professional digital illustration, 16:9
```

**Prompt 2 — Top 10 List:**
```
atlas_character with confident smirk and crossed arms, YouTube thumbnail 
style, right side of frame, looking at camera, dark navy gradient 
background, surrounded by floating collectible figures, dramatic 
lighting, golden glow, professional quality, digital illustration, 
bold composition, 16:9
```

**Prompt 3 — Warning/Alert Video:**
```
atlas_character with worried expression and one hand up in stop gesture, 
YouTube thumbnail style, right side of frame, looking directly at viewer, 
red-orange dramatic gradient background, caution energy, high contrast, 
urgent mood, professional digital illustration, sharp details, 16:9
```

---

## 📝 Example Topics for This Template

1. **"I FOUND A $10,000 CARD"** — Atlas shocked face + glowing rare card
2. **"5 Mistakes NEW Collectors Make"** — Atlas with concerned/teaching expression
3. **"UNBOXING: Mystery Grail Package"** — Atlas excited + mystery box with question marks

---

## 📏 Production Checklist

- [ ] Headline is ≤5 words and readable at thumbnail size
- [ ] Atlas expression is clear and exaggerated
- [ ] All text has dark stroke/outline
- [ ] Logo present in top-left
- [ ] Color pop accent present (yellow/orange)
- [ ] Tested at 168x94px (still readable?)
- [ ] Background doesn't compete with text
- [ ] Composition is split (not centered)
- [ ] File is under 2MB
- [ ] File named: `thumb-[video-title-slug]-[date].png`

---

## 🔄 Series Consistency

For video series, maintain these constants:
- Same headline font and stroke color
- Same logo placement
- Same Atlas crop style (chest-up or full body)
- Same background gradient direction
- Vary: text, expression, accent color, props

This creates a recognizable "brand grid" on the channel page.
