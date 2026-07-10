# 📱 Atlas Studio — Story Format Template (Instagram/TikTok)

**Template ID:** `TMPL-STORY`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Vertical story / short-form static or animated frame  

---

## 📐 Dimensions

| Variant | Width | Height | Aspect Ratio | Use Case |
|---------|-------|--------|--------------|----------|
| **Standard** | 1080px | 1920px | 9:16 | Instagram Story, TikTok, Reels cover |
| **Safe Zone** | 1080px | 1420px | — | Visible area (excludes top/bottom UI) |

**Resolution:** 72 DPI  
**Color Mode:** sRGB  
**File Formats:** PNG (static), MP4 (animated, ≤15s)  
**Safe Zone Warning:** Top 200px and bottom 300px are covered by platform UI

---

## 🗺️ Zone Map (1080x1920)

```
┌──────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░  PLATFORM UI ZONE (top 200px)  ░░░░░░░░░░  │
│  ░░░  (username, timestamp, etc.)   ░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │                                          │    │
│  │         TEXT ZONE                        │    │
│  │         (top 50% of safe area)           │    │
│  │                                          │    │
│  │         540px × 710px                    │    │
│  │         centered                         │    │
│  │                                          │    │
│  │    "Your Big Statement                   │    │
│  │     Text Goes Here"                      │    │
│  │                                          │    │
│  │    (max 15 words)                        │    │
│  │    (2-3 lines)                           │    │
│  │                                          │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │                                          │    │
│  │         CHARACTER ZONE                   │    │
│  │         (bottom 40% of safe area)        │    │
│  │                                          │    │
│  │         Atlas - full body or waist-up    │    │
│  │                                          │    │
│  │         756px × 568px                    │    │
│  │         centered, bottom-anchored        │    │
│  │                                          │    │
│  │                                          │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │         CTA ZONE (bottom 10%)            │    │
│  │         "Swipe Up" / "Tap to Read"       │    │
│  │         Link sticker area                │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░  PLATFORM UI ZONE (bottom 300px)  ░░░░░░░  │
│  ░░░  (reply bar, stickers, etc.)      ░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────────────────────┘
```

### Zone Specifications (1080x1920)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Platform UI Top | 0 | 0 | 1080px | 200px | ⚠️ Do not place content here |
| Text Zone | 60px | 280px | 960px | 500px | Top 50% of safe area |
| Character Zone | 162px | 800px | 756px | 620px | Bottom 40% of safe area |
| CTA Zone | 60px | 1440px | 960px | 180px | Bottom call-to-action |
| Platform UI Bottom | 0 | 1620px | 1080px | 300px | ⚠️ Do not place content here |
| Background | 0 | 0 | 1080px | 1920px | Full canvas bleed |

### Safe Area
- **Top safe:** 200px from top
- **Bottom safe:** 300px from bottom
- **Side safe:** 60px from each side
- **Usable area:** 960px × 1420px (centered)

---

## 🎨 Color Specifications

### Background Options (Single Color or Gradient)

| Style | Color(s) | Hex | Use Case |
|-------|----------|-----|----------|
| Navy Solid | Single | `#1B2B5E` | Default/versatile |
| Ocean Gradient | Top → Bottom | `#1B2B5E` → `#0D4B7A` | Calm/educational |
| Sunset Gradient | Top → Bottom | `#FF6B35` → `#E63946` | Exciting/urgent |
| Gold Gradient | Top → Bottom | `#F5A623` → `#E8941E` | Celebration |
| Mint Gradient | Top → Bottom | `#27AE60` → `#1B8A4A` | Tips/positive |
| Purple Gradient | Top → Bottom | `#7B4FBD` → `#4A2D8A` | Mystery/reveals |
| Clean White | Single | `#FFFFFF` | Minimal modern |
| Soft Gray | Single | `#F0F2F5` | Neutral |

### Text Colors by Background

| Background | Text Color | Accent |
|-----------|-----------|--------|
| Dark (Navy, Purple) | `#FFFFFF` | `#F5A623` |
| Medium (Gradients) | `#FFFFFF` | `#FFD700` |
| Light (White, Gray) | `#1B2B5E` | `#2E5BBA` |

### Element Colors

| Element | Hex | Notes |
|---------|-----|-------|
| CTA Text | `#FFFFFF` | Always white |
| CTA Arrow/Icon | `#F5A623` | Gold accent |
| Text Shadow | `rgba(0,0,0,0.3)` | Subtle depth |
| Sticker Accent | `#FFD700` | Interactive feel |

---

## 🔤 Font Specifications

| Element | Font Family | Weight | Size | Align |
|---------|------------|--------|------|-------|
| Statement Text | Montserrat | Bold/Black | 48-64px | Center |
| Supporting Text | Nunito | Regular | 32-36px | Center |
| CTA Text | Nunito | Bold | 28px | Center |
| Small Text | Inter | Medium | 22px | Center |
| Hashtag | Inter | Regular | 20px | Center |

### Typography Rules
- **Maximum 15 words** in main text zone
- 2-3 lines maximum (never a wall of text)
- Line height: 1.4x font size
- All text center-aligned
- Statement text should be readable from arm's length
- Use line breaks strategically for rhythm:
  ```
  "Every collector
   remembers their
   FIRST GRAIL"
  ```
- Bold/capitalize the KEY word in the statement

---

## ✅ Required Elements

1. **Bold text statement** — Max 15 words, big and readable
2. **Atlas character** — Bottom half, clear expression/action
3. **Background** — Single color or gradient from official palette
4. **Safe zone compliance** — No content in top 200px or bottom 300px
5. **High contrast** — Text must read instantly on background

---

## 🔲 Optional Elements

- CTA text ("Swipe Up", "Link in Bio", "Tap for More")
- Sticker/badge (poll, question, countdown)
- Animated text entrance (for video stories)
- Collectible prop/item visible with Atlas
- Emoji accents (max 2, as design elements)
- Series indicator ("1/5", dots ● ● ○ ○ ○)
- Sound wave indicator (if audio story)
- @collectiverse tag in text
- Subtle pattern overlay on background (10% opacity)

---

## ✔️ Do's

- ✅ Front-load the hook — text statement is the FIRST thing eyes see
- ✅ Use Atlas's body language to reinforce the text message
- ✅ Design for 3-second comprehension — instant understanding
- ✅ Make text large enough to read without zooming
- ✅ Use vertical composition — eyes flow top to bottom naturally
- ✅ Create series (multi-story sequences) for engagement
- ✅ Leave space for Instagram stickers/polls if interactive
- ✅ Test on actual phone (not just desktop preview)

---

## ❌ Don'ts

- ❌ Never place important content in top 200px or bottom 300px (UI overlap)
- ❌ Don't use more than 15 words of text
- ❌ Don't use light text on light backgrounds (or dark on dark)
- ❌ Don't make Atlas smaller than 30% of canvas height
- ❌ Avoid horizontal compositions — vertical stories need vertical thinking
- ❌ Don't use detailed/busy backgrounds (solid/gradient only)
- ❌ Never use font smaller than 28px (unreadable on mobile)
- ❌ Don't center Atlas vertically — always bottom-anchored
- ❌ Don't put the punchline/key word in the platform-obscured zones

---

## 🤖 AI Generation Prompts

### Base Prompt Structure
```
atlas_character [POSE/ACTION], full body, vertical composition, 
bottom of frame, [SOLID/GRADIENT BACKGROUND COLOR], clean simple 
background, digital illustration, expressive cartoon style, 
vertical 9:16 aspect ratio, space for text above character, 
high quality, mobile-optimized
```

### Example Prompts

**Prompt 1 — Motivational/Inspirational:**
```
atlas_character standing confidently with arms raised in triumph, 
full body, vertical composition, positioned in bottom third of 
frame, solid navy blue background, subtle golden glow behind 
character, digital illustration, expressive happy face, motivational 
energy, clean simple composition, 9:16 vertical, space above for 
large text overlay
```

**Prompt 2 — Question/Engagement:**
```
atlas_character with curious expression, hand on chin thinking pose, 
full body, vertical composition, bottom of frame, purple gradient 
background, question mark visual elements floating, digital 
illustration, expressive cartoon style, clean composition, 9:16 
vertical, large empty space in top half for text
```

**Prompt 3 — Announcement/Reveal:**
```
atlas_character with excited surprised expression, both hands up 
in celebration, full body, vertical composition, bottom of frame, 
golden gradient background with sparkle effects, digital illustration, 
expressive cartoon, energetic pose, celebration mood, 9:16 vertical, 
clean upper area for text
```

---

## 📝 Example Topics for This Template

1. **"Did you know? 90% of collectors store their cards WRONG"** — Atlas with shocked face, educational hook
2. **"POV: You just pulled the chase variant"** — Atlas in pure joy, relatable moment
3. **"Which is worth more? Swipe to find out →"** — Atlas pointing up, interactive engagement

---

## 📏 Production Checklist

- [ ] Text fits within safe zone (not in top 200px / bottom 300px)
- [ ] Statement text is ≤15 words
- [ ] Text is readable at arm's length on phone
- [ ] Atlas is in bottom 40% of safe area
- [ ] Background is single color or simple gradient
- [ ] Contrast ratio passes (text clearly readable)
- [ ] CTA visible but not in platform-obscured zone
- [ ] Tested on actual phone screen
- [ ] Exported at 1080x1920px
- [ ] File named: `story-[topic-slug]-[date].png`

---

## 📱 Platform-Specific Notes

### Instagram Stories
- Add poll/question sticker zone consideration (center, ~800px from top)
- "See More" link zone: 1500-1620px from top
- Max static duration: displayed 5 seconds

### TikTok
- Caption overlay zone: bottom 250px
- Sound-on assumption (can add audio direction notes)
- "For You Page" preview: center crop to 1:1 at center

### YouTube Shorts
- Subscribe button: bottom-right
- Comments: bottom-left
- Keep action in center vertical strip (middle 70%)
