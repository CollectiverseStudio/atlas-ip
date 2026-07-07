# 🎬 Atlas Studio — 4-Panel Comic Strip Template

**Template ID:** `TMPL-COMIC-4PANEL`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Sequential comic strip / narrative gag  

---

## 📐 Dimensions

| Variant | Width | Height | Aspect Ratio | Use Case |
|---------|-------|--------|--------------|----------|
| **Square** | 1200px | 1200px | 1:1 | Instagram feed, Facebook |
| **Landscape** | 1200px | 628px | ~1.91:1 | Twitter/X, LinkedIn, blog embed |

**Resolution:** 72 DPI (web) / 300 DPI (print variant)  
**Color Mode:** sRGB  
**File Formats:** PNG (primary), WebP (web optimized), JPG (fallback)

---

## 🗺️ Zone Map — Square Variant (1200x1200)

```
┌─────────────────────────────────────────────────────────┐
│ [5px BORDER - Atlas Blue #1B2B5E]                        │
│ ┌──────────────────────┐   ┌──────────────────────┐     │
│ │     PANEL 1          │10 │     PANEL 2          │     │
│ │                      │px │                      │     │
│ │  ┌─BUBBLE ZONE─────┐│   │  ┌─BUBBLE ZONE─────┐│     │
│ │  │  (top 30%)      ││   │  │  (top 30%)      ││     │
│ │  └─────────────────┘│gut│  └─────────────────┘│     │
│ │                      │ter│                      │     │
│ │  ┌─CHARACTER ZONE──┐│   │  ┌─CHARACTER ZONE──┐│     │
│ │  │  (center 60%)   ││   │  │  (center 60%)   ││     │
│ │  └─────────────────┘│   │  └─────────────────┘│     │
│ │                      │   │                      │     │
│ │  [BG ZONE - 100%]   │   │  [BG ZONE - 100%]   │     │
│ └──────────────────────┘   └──────────────────────┘     │
│          10px gutter (vertical)                          │
│ ┌──────────────────────┐   ┌──────────────────────┐     │
│ │     PANEL 3          │10 │     PANEL 4          │     │
│ │                      │px │                      │     │
│ │  ┌─BUBBLE ZONE─────┐│   │  ┌─BUBBLE ZONE─────┐│     │
│ │  │  (top 30%)      ││   │  │  (top 30%)      ││     │
│ │  └─────────────────┘│gut│  └─────────────────┘│     │
│ │                      │ter│                      │     │
│ │  ┌─CHARACTER ZONE──┐│   │  ┌─CHARACTER ZONE──┐│     │
│ │  │  (center 60%)   ││   │  │  (center 60%)   ││     │
│ │  └─────────────────┘│   │  └─────────────────┘│     │
│ │                      │   │                      │     │
│ │  ★ ATLAS HOME PANEL │   │  [BG ZONE - 100%]   │     │
│ └──────────────────────┘   └──────────────────────┘     │
│ [5px BORDER]                                             │
└─────────────────────────────────────────────────────────┘
```

### Panel Dimensions (Square — 1200x1200)

| Element | X | Y | Width | Height |
|---------|---|---|-------|--------|
| Panel 1 | 5px | 5px | 590px | 590px |
| Panel 2 | 605px | 5px | 590px | 590px |
| Panel 3 | 5px | 605px | 590px | 590px |
| Panel 4 | 605px | 605px | 590px | 590px |
| Gutter H | — | 595px | 1200px | 10px |
| Gutter V | 595px | — | 10px | 1200px |
| Border | 0px | 0px | 1200px | 1200px |

### Panel Dimensions (Landscape — 1200x628)

| Element | X | Y | Width | Height |
|---------|---|---|-------|--------|
| Panel 1 | 5px | 5px | 290px | 304px |
| Panel 2 | 305px | 5px | 290px | 304px |
| Panel 3 | 605px | 5px | 290px | 304px |
| Panel 4 | 905px | 5px | 290px | 304px |

*Note: Landscape uses 4 panels in a single row (1x4 grid)*

---

## 🎨 Color Specifications

### Official Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Panel Background | White | `#FFFFFF` | Default panel fill |
| Border/Gutter | Atlas Navy | `#1B2B5E` | Frame and separators |
| Speech Bubble Fill | White | `#FFFFFF` | Bubble interior |
| Speech Bubble Stroke | Dark Gray | `#2D2D2D` | 2px bubble outline |
| Emphasis Bubble | Atlas Gold | `#F5A623` | Excited/important speech |
| Thought Bubble | Light Blue | `#E8F4FD` | Internal monologue |
| Narration Box | Navy | `#1B2B5E` | Narrator text (white text) |
| SFX Text | Red | `#E63946` | Sound effects |
| Background Option 1 | Light Gray | `#F5F5F5` | Neutral environment |
| Background Option 2 | Sky Blue | `#87CEEB` | Outdoor scenes |
| Background Option 3 | Warm Cream | `#FFF8E7` | Indoor/cozy scenes |

---

## 🔤 Font Specifications

| Element | Font Family | Weight | Size | Style |
|---------|------------|--------|------|-------|
| Speech Text | Nunito / Comic Neue | Regular | 24-28px | Sentence case |
| Emphasis Words | Nunito / Comic Neue | Bold | 28-32px | ALL CAPS for single words |
| Narration | Inter / Montserrat | Medium | 20-22px | Italic |
| SFX / Onomatopoeia | Bangers / Impact | Bold | 36-48px | ALL CAPS, rotated ±15° |
| Panel Number (debug) | Mono | Light | 12px | Bottom-right, 30% opacity |

### Typography Rules
- Maximum 25 words per speech bubble
- Maximum 2 speech bubbles per panel
- Line height: 1.3x font size
- Bubble padding: 12px all sides
- Tail/pointer always aims at speaker's mouth area

---

## ✅ Required Elements

Every 4-panel comic MUST include:

1. **Atlas character** — Present in minimum 2 of 4 panels (ideally 3-4)
2. **Speech/thought bubble** — Minimum 1 per panel with dialogue
3. **Punchline in Panel 4** — Final panel delivers the joke/insight/resolution
4. **Consistent background** — Same environment across all panels (unless scene change is the joke)
5. **Reading order** — Clear left-to-right, top-to-bottom flow
6. **Atlas in Panel 3** — Atlas is ALWAYS present in the lower-left panel (home panel)
7. **Collectiverse watermark** — 40px, 20% opacity, bottom-right of Panel 4

---

## 🔲 Optional Elements

- Secondary characters (other collectibles, humans, pets)
- Motion lines for action
- Background details / environmental storytelling
- Panel-breaking elements (character reaching across gutter)
- Reaction zoom (one panel is a close-up face)
- Color shift between panels for time passage
- Small collectible cameos hidden in backgrounds (easter eggs)

---

## ✔️ Do's

- ✅ Keep Atlas's proportions consistent across all 4 panels
- ✅ Use the "beat panel" technique (panel 3 silent reaction before panel 4 punchline)
- ✅ Vary camera angles between panels (wide → medium → close-up → medium)
- ✅ Make each panel readable independently (clear action)
- ✅ Use Atlas's expressive face for reactions (his big eyes are his superpower)
- ✅ Reference real collecting scenarios (grading, hunting, trading)
- ✅ Include at least one collectible item visible in the strip

---

## ❌ Don'ts

- ❌ Never put text outside speech bubbles (except SFX and narration boxes)
- ❌ Don't overcrowd panels — max 2 characters per panel in this format
- ❌ Don't use more than 3 different font sizes in one strip
- ❌ Never break the 4th wall unless that IS the joke
- ❌ Don't place Atlas smaller than 40% of panel height
- ❌ Avoid dark/black backgrounds (reduces readability)
- ❌ Don't use gradients in speech bubbles
- ❌ Never crop Atlas's full body below the chest in his "home" panel

---

## 🤖 AI Generation Prompts

### Base Prompt Structure
```
atlas_character in a [SCENE], [ACTION/POSE], comic book style, 
4-panel comic strip layout, clean lines, white background panels, 
blue border accents, speech bubbles, expressive cartoon style, 
high quality, sharp lines, digital illustration
```

### Example Prompts

**Prompt 1 — Grading Day:**
```
atlas_character holding a collectible card nervously, waiting at a 
grading counter, 4-panel comic strip, panel 1: excited face looking 
at card, panel 2: handing card to grader, panel 3: sweating anxiously, 
panel 4: celebrating with PSA 10 result, comic book style, clean lines, 
white panels, blue accents, expressive cartoon, speech bubbles
```

**Prompt 2 — Collection Disaster:**
```
atlas_character in a room with collectibles, 4-panel comic strip, 
panel 1: proudly displaying shelf of figures, panel 2: cat enters room, 
panel 3: atlas_character frozen in fear, panel 4: shelf knocked over 
chaos, comic book style, clean lines, white panels, expressive reactions, 
humorous tone
```

**Prompt 3 — Convention Hunt:**
```
atlas_character at a comic convention, 4-panel comic strip, panel 1: 
atlas_character with empty bag entering convention hall, panel 2: eyes 
wide seeing rare collectible at booth, panel 3: reaching for wallet 
dramatically, panel 4: walking out with overflowing bags happily, comic 
style, clean lines, white panels, blue borders, crowd background
```

---

## 📝 Example Topics for This Template

1. **"The Grading Wait"** — Atlas sends a card for grading and obsessively checks tracking
2. **"Convention Math"** — Atlas budgets $50 for a con, spends $500
3. **"The Duplicate Dilemma"** — Atlas finds the same figure he just bought... for half price

---

## 📏 Production Checklist

- [ ] All 4 panels filled with content
- [ ] Atlas appears in minimum 2 panels (required: Panel 3)
- [ ] Text is readable at 50% zoom (mobile preview)
- [ ] No text smaller than 20px in final output
- [ ] Punchline is in Panel 4
- [ ] Colors match official palette
- [ ] Watermark placed at 20% opacity
- [ ] Exported at correct dimensions for target platform
- [ ] Alt-text written for accessibility
- [ ] File named: `comic-4panel-[topic]-[date].png`
