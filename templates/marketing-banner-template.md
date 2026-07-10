# 🏷️ Atlas Studio — Marketing Banner Template

**Template ID:** `TMPL-MARKETING-BANNER`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Web hero banner / email header / promotional display ad  

---

## 📐 Dimensions

| Variant | Width | Height | Aspect Ratio | Use Case |
|---------|-------|--------|--------------|----------|
| **Email Header** | 1200px | 400px | 3:1 | Newsletter, email campaigns |
| **Web Hero** | 1920px | 600px | 3.2:1 | Website hero section |
| **Leaderboard** | 728px | 90px | 8:1 | Display ad (IAB standard) |
| **Half-page** | 300px | 600px | 1:2 | Sidebar ad (IAB standard) |
| **Social Cover** | 1500px | 500px | 3:1 | Twitter/LinkedIn cover |

**Resolution:** 72 DPI (web) / 150 DPI (email retina)  
**Color Mode:** sRGB  
**File Formats:** PNG (primary), JPG (email fallback), WebP (web), GIF (animated variant)

---

## 🗺️ Zone Map — Email Header (1200x400)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  BACKGROUND ZONE (100% - full bleed)                                   │
│  Subtle collectible pattern OR solid gradient                          │
│                                                                        │
│  ┌───────────────────────────────┐         ┌────────────────────────┐  │
│  │                               │         │                        │  │
│  │     HEADLINE ZONE             │         │   CHARACTER ZONE       │  │
│  │     (left 50%)                │         │   (right 30%)          │  │
│  │                               │         │                        │  │
│  │     "Your Headline            │         │   Atlas pose           │  │
│  │      Goes Here"               │         │   360px × 360px       │  │
│  │                               │         │   (may bleed bottom)   │  │
│  │  ┌─────────────────────┐      │         │                        │  │
│  │  │  CTA BUTTON         │      │         │                        │  │
│  │  │  "Shop Now →"       │      │         │                        │  │
│  │  └─────────────────────┘      │         │                        │  │
│  │                               │         │                        │  │
│  └───────────────────────────────┘         └────────────────────────┘  │
│                                                                        │
│  ┌─────┐                                                               │
│  │LOGO │  (top-left or bottom-left, 100x50px)                          │
│  └─────┘                                                               │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Zone Specifications — Email (1200x400)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Background | 0 | 0 | 1200px | 400px | Full canvas |
| Headline Zone | 60px | 60px | 600px | 200px | Left 50% |
| Sub-headline | 60px | 180px | 600px | 40px | Below headline |
| CTA Button | 60px | 260px | 220px | 56px | Below sub-headline |
| Character Zone | 840px | 20px | 360px | 380px | Right 30%, can bleed bottom |
| Logo | 60px | 340px | 100px | 50px | Bottom-left |
| Pattern Area | 600px | 0px | 240px | 400px | Between text and character |

---

## 🗺️ Zone Map — Web Hero (1920x600)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  ┌──────┐   BACKGROUND (gradient + optional pattern overlay at 8% opacity)       │
│  │ LOGO │                                                                        │
│  │120x60│                                                                        │
│  └──────┘                                                                        │
│                                                                                  │
│  ┌─────────────────────────────────────┐              ┌────────────────────────┐ │
│  │                                     │              │                        │ │
│  │    HEADLINE ZONE                    │              │   CHARACTER ZONE       │ │
│  │    (left 50% — 960px)               │              │   (right 30%)          │ │
│  │                                     │              │   576px × 540px        │ │
│  │    "Big Bold Headline Text"         │              │                        │ │
│  │    (max 8 words)                    │              │   Atlas full/half body │ │
│  │                                     │              │   May bleed bottom     │ │
│  │    Sub-headline text line           │              │                        │ │
│  │    (max 15 words)                   │              │                        │ │
│  │                                     │              │                        │ │
│  │    ┌──────────────────┐             │              │                        │ │
│  │    │   CTA BUTTON     │             │              │                        │ │
│  │    │  "Get Started →" │             │              │                        │ │
│  │    └──────────────────┘             │              │                        │ │
│  │                                     │              │                        │ │
│  └─────────────────────────────────────┘              └────────────────────────┘ │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Zone Specifications — Web Hero (1920x600)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Background | 0 | 0 | 1920px | 600px | Full canvas |
| Logo | 80px | 40px | 120px | 60px | Top-left |
| Headline | 80px | 140px | 900px | 160px | Left 50% |
| Sub-headline | 80px | 320px | 800px | 50px | Below headline |
| CTA Button | 80px | 420px | 260px | 60px | Below sub-headline |
| Character Zone | 1344px | 30px | 576px | 570px | Right 30% |
| Pattern Overlay | 0 | 0 | 1920px | 600px | Optional, 5-10% opacity |

---

## 🎨 Color Specifications

### Banner Color Schemes

| Scheme | Background | Headline | Sub-text | CTA BG | CTA Text |
|--------|-----------|----------|----------|--------|----------|
| **Classic** | `#1B2B5E` | `#FFFFFF` | `#B8C9E8` | `#F5A623` | `#1B2B5E` |
| **Premium** | `#0D0D0D` → `#1B2B5E` | `#FFFFFF` | `#CCCCCC` | `#F5A623` | `#000000` |
| **Fresh** | `#FFFFFF` | `#1B2B5E` | `#555555` | `#2E5BBA` | `#FFFFFF` |
| **Sale/Promo** | `#E63946` → `#C0392B` | `#FFFFFF` | `#FFE0E0` | `#FFD700` | `#E63946` |
| **Holiday** | `#1B5E4B` → `#0D3E2E` | `#FFFFFF` | `#B8E8D8` | `#E63946` | `#FFFFFF` |

### CTA Button Specs

| State | Background | Text | Border | Border-Radius |
|-------|-----------|------|--------|---------------|
| Default | `#F5A623` | `#1B2B5E` | none | 8px |
| Hover | `#E8941E` | `#1B2B5E` | none | 8px |
| Alt (light BG) | `#2E5BBA` | `#FFFFFF` | none | 8px |
| Ghost | transparent | `#FFFFFF` | 2px `#FFFFFF` | 8px |

### Pattern Overlay Options

| Pattern | Opacity | Use Case |
|---------|---------|----------|
| Scattered collectibles (cards, figures) | 5-8% | General promo |
| Dot grid | 3-5% | Clean/modern |
| Diagonal lines | 5% | Energy/movement |
| Star burst (from character) | 8-10% | Celebration |
| None (solid/gradient only) | — | Minimal/premium |

---

## 🔤 Font Specifications

| Element | Font Family | Weight | Size (Email) | Size (Web Hero) |
|---------|------------|--------|--------------|-----------------|
| Headline | Montserrat | Bold/Black | 42-56px | 56-72px |
| Sub-headline | Nunito | Regular | 20-24px | 24-32px |
| CTA Text | Montserrat | Bold | 18px | 20-22px |
| Legal/Fine Print | Inter | Regular | 12px | 14px |
| Badge/Tag | Montserrat | Bold | 14px | 16px |

### Typography Rules
- Headline: max 8 words (email: max 6)
- Sub-headline: max 15 words, single line
- CTA: max 3 words ("Shop Now", "Learn More", "Get Started")
- Never more than 3 levels of text hierarchy
- Headlines can use ALL CAPS or Title Case (not both in one banner)
- Sub-headline is always sentence case

---

## ✅ Required Elements

1. **Headline** — Clear value proposition or promotion (max 8 words)
2. **CTA Button** — Single clear action with arrow or icon
3. **Atlas character** — Right side, relevant pose/expression
4. **Collectiverse logo** — Top-left or bottom-left
5. **Background** — On-brand color/gradient (never pure white for email)
6. **Hierarchy** — Clear reading order: headline → sub → CTA

---

## 🔲 Optional Elements

- Sub-headline / supporting text
- Discount badge ("20% OFF", "FREE SHIPPING")
- Collectible product image (in addition to Atlas)
- Pattern overlay
- Urgency text ("Limited Time", "Ends Sunday")
- Trust badges (rating stars, guarantee seal)
- Social proof ("Join 10,000+ collectors")
- Secondary CTA (text link, not button)
- Animated elements (GIF: subtle motion on Atlas or accents)

---

## ✔️ Do's

- ✅ Lead with benefit, not feature ("Find Your Grail" > "Browse Inventory")
- ✅ Make the CTA the most contrasting element (gold on navy)
- ✅ Use Atlas's expression to match the message energy
- ✅ Maintain 40%+ whitespace/breathing room around text
- ✅ Test email at 600px width (some clients scale down)
- ✅ Ensure banner works with images disabled (alt text + background color)
- ✅ Place Atlas so he "looks toward" the headline (visual direction)
- ✅ Use urgency sparingly and honestly

---

## ❌ Don'ts

- ❌ Don't use more than one CTA button (decision paralysis)
- ❌ Don't place critical text in the outer 10% (email client cropping)
- ❌ Don't use font smaller than 18px for any visible text
- ❌ Don't use busy/photo backgrounds (compete with text readability)
- ❌ Never place text over the character (or vice versa)
- ❌ Don't use more than 2 font families
- ❌ Avoid centered layouts — left-aligned headline performs better
- ❌ Don't make the banner "too beautiful" — it should drive ACTION
- ❌ Never use auto-playing video in email banners

---

## 🤖 AI Generation Prompts

### Base Prompt Structure (Character Only)
```
atlas_character [POSE], [EXPRESSION], waist-up or full body, 
right side composition, [BACKGROUND], marketing style illustration, 
clean professional digital art, friendly approachable, banner 
composition, wide aspect ratio, space on left for text, high quality
```

### Example Prompts

**Prompt 1 — Welcome/Signup:**
```
atlas_character waving with friendly smile, welcoming gesture, 
full body, right side of frame, dark navy gradient background, 
professional marketing illustration, clean digital art, approachable 
and inviting, banner composition, wide landscape format, large 
empty space on left for text and button, soft warm lighting
```

**Prompt 2 — Sale/Promotion:**
```
atlas_character excited expression with both hands showing something 
amazing, dynamic pose, waist-up, right side of frame, rich deep 
red gradient background with golden sparkles, energetic marketing 
illustration, professional quality, banner composition, wide 
landscape format, celebration mood, space for promotional text on left
```

**Prompt 3 — Educational/Content:**
```
atlas_character in teaching pose, one hand raised with index finger 
up (lightbulb moment), confident smile, waist-up, right side of 
frame, clean blue gradient background, professional educational 
illustration, approachable style, banner composition, wide landscape 
format, space for headline and CTA on left, trustworthy mood
```

---

## 📝 Example Topics for This Template

1. **"Start Your Collection Today — Free Shipping on First Order"** — Atlas welcoming with open arms
2. **"Grading Week: 25% Off All Submissions"** — Atlas holding up a graded slab excitedly
3. **"The Collectiverse Newsletter — Weekly Finds & Tips"** — Atlas reading/presenting newsletter

---

## 📏 Production Checklist

- [ ] Headline is ≤8 words with clear value proposition
- [ ] CTA button is visible and high-contrast
- [ ] Atlas is on right side, facing toward headline
- [ ] Logo present (top-left or bottom-left)
- [ ] Background is not pure white (email rendering)
- [ ] Text passes contrast ratio (WCAG AA minimum)
- [ ] Tested at 50% size (still readable?)
- [ ] Email variant tested with images disabled
- [ ] Both email (1200x400) and web hero (1920x600) exported
- [ ] Alt-text includes headline and CTA text
- [ ] File named: `banner-[campaign]-[variant]-[date].png`

---

## 📧 Email-Specific Requirements

### Fallback Background
Always set HTML background color matching the gradient start:
```html
<td bgcolor="#1B2B5E" style="background-color:#1B2B5E;">
```

### Image Alt Text Template
```
"[Headline Text]. [CTA Text] at collectiverse.com"
```

### Responsive Scaling
- Max width: 600px in email clients
- Banner scales proportionally
- At 600px width, ensure headline is still ≥28px equivalent
- CTA button minimum tap target: 44x44px

### Dark Mode Considerations
- Include `data-ogsb` attributes for Outlook dark mode
- Test banner against `#1E1E1E` background (Gmail dark)
- Logo should have transparent + dark-mode variants
