# 🛍️ Atlas Studio — Merchandise/Print Template

**Template ID:** `TMPL-MERCHANDISE`  
**Version:** 1.0  
**Last Updated:** 2026-07-06  
**Content Type:** Print-ready product mockup / merchandise artwork layout  

---

## 📐 Dimensions

| Variant | Width | Height | DPI | Use Case |
|---------|-------|--------|-----|----------|
| **Master Artboard** | 2400px | 2400px | 300 | Primary high-res source |
| **T-Shirt Print** | 4500px | 5100px | 300 | DTG print (15"×17" @ 300dpi) |
| **Poster (18x24)** | 5400px | 7200px | 300 | Wall art print |
| **Sticker/Pin** | 1200px | 1200px | 300 | Die-cut sticker artwork |
| **Mug Wrap** | 4200px | 1800px | 300 | 11oz mug full wrap |
| **Phone Case** | 1500px | 2800px | 300 | Standard phone case |

**Resolution:** 300 DPI (print) — MINIMUM for all merchandise  
**Color Mode:** CMYK (print files) + sRGB (digital preview)  
**File Formats:** AI/SVG (vector), PSD/TIFF (raster), PNG (preview)  
**Bleed:** 0.125" (37.5px @ 300 DPI) on all sides

---

## 🗺️ Zone Map — Master Artboard (2400x2400 @ 300 DPI)

```
┌──────────────────────────────────────────────────────────┐
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│ ┄ BLEED ZONE (37.5px / 0.125" all sides)              ┄ │
│ ┄                                                      ┄ │
│ ┄  ┌────────────────────────────────────────────────┐  ┄ │
│ ┄  │  SAFE ZONE (200px margins all around)          │  ┄ │
│ ┄  │                                                │  ┄ │
│ ┄  │  ┌──────────────────────────────────────────┐  │  ┄ │
│ ┄  │  │                                          │  │  ┄ │
│ ┄  │  │      PRINT SAFE AREA                     │  │  ┄ │
│ ┄  │  │      2000px × 2000px                     │  │  ┄ │
│ ┄  │  │                                          │  │  ┄ │
│ ┄  │  │      ┌──────────────────────┐            │  │  ┄ │
│ ┄  │  │      │                      │            │  │  ┄ │
│ ┄  │  │      │   CHARACTER ZONE     │            │  │  ┄ │
│ ┄  │  │      │   (centered)         │            │  │  ┄ │
│ ┄  │  │      │                      │            │  │  ┄ │
│ ┄  │  │      │   1600px × 1600px    │            │  │  ┄ │
│ ┄  │  │      │   (max character     │            │  │  ┄ │
│ ┄  │  │      │    footprint)        │            │  │  ┄ │
│ ┄  │  │      │                      │            │  │  ┄ │
│ ┄  │  │      │   NO BLEED OFF       │            │  │  ┄ │
│ ┄  │  │      │   EDGES              │            │  │  ┄ │
│ ┄  │  │      │                      │            │  │  ┄ │
│ ┄  │  │      └──────────────────────┘            │  │  ┄ │
│ ┄  │  │                                          │  │  ┄ │
│ ┄  │  │      ┌───────────┐                       │  │  ┄ │
│ ┄  │  │      │ LOGO ZONE │ (optional, small)     │  │  ┄ │
│ ┄  │  │      │ 200x100px │                       │  │  ┄ │
│ ┄  │  │      └───────────┘                       │  │  ┄ │
│ ┄  │  │                                          │  │  ┄ │
│ ┄  │  └──────────────────────────────────────────┘  │  ┄ │
│ ┄  │                                                │  ┄ │
│ ┄  └────────────────────────────────────────────────┘  ┄ │
│ ┄                                                      ┄ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│                                                          │
│  [TRIM MARKS at corners]                                 │
│  [COLOR BARS along bottom]                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Zone Specifications (2400x2400)

| Zone | X | Y | Width | Height | Notes |
|------|---|---|-------|--------|-------|
| Full Artboard | 0 | 0 | 2400px | 2400px | Includes bleed |
| Bleed Area | 0 | 0 | 37.5px all sides | — | Will be trimmed |
| Trim Line | 37.5px | 37.5px | 2325px | 2325px | Final cut edge |
| Safe Zone | 200px | 200px | 2000px | 2000px | All content inside |
| Character Zone | 400px | 400px | 1600px | 1600px | Centered, no edge bleed |
| Logo Zone | 1000px | 2100px | 200px | 100px | Bottom center, optional |

---

## 🎨 Color Specifications

### CMYK Color Mode (Print)

| Element | CMYK | Pantone Equiv. | Hex (screen) | Notes |
|---------|------|----------------|--------------|-------|
| Atlas Navy | C:95 M:80 Y:30 K:20 | PMS 289 C | `#1B2B5E` | Primary brand |
| Atlas Gold | C:0 M:35 Y:85 K:4 | PMS 137 C | `#F5A623` | Accent |
| Atlas Blue | C:80 M:55 Y:0 K:0 | PMS 2728 C | `#2E5BBA` | Secondary |
| True Black | C:75 M:68 Y:67 K:90 | Rich Black | `#000000` | Outlines only |
| White | C:0 M:0 Y:0 K:0 | — | `#FFFFFF` | Negative space |
| Atlas Skin Tone | C:0 M:15 Y:30 K:0 | — | `#F5D5A0` | Character |
| Red Accent | C:0 M:90 Y:75 K:5 | PMS 485 C | `#E63946` | Alert/emphasis |

### Print Background Options

| Style | CMYK | Notes |
|-------|------|-------|
| Transparent | None | For DTG printing (shirt color shows) |
| White knockout | K:0 | Standard on dark garments |
| Navy solid | C:95 M:80 Y:30 K:20 | Brand background |
| Cream/off-white | C:0 M:3 Y:10 K:2 | Vintage/premium feel |

### Color Safety Rules
- **No color below 8% in any CMYK channel** (will not print reliably)
- **Total ink coverage max: 300%** (sum of C+M+Y+K ≤ 300)
- **Rich Black formula:** C:75 M:68 Y:67 K:90 (never use K:100 alone)
- **Spot colors available** for premium/metallic runs (gold foil = Pantone 871 C)

---

## 🔤 Font Specifications (Print)

| Element | Font Family | Weight | Min Size | Notes |
|---------|------------|--------|----------|-------|
| Character Name | Montserrat | Bold | 24pt | If text on product |
| Tagline | Nunito | Regular | 14pt | Optional sub-text |
| "Collectiverse" | Brand Logotype | — | 12pt min | Logo lockup only |
| Fine Print | Inter | Regular | 8pt | Legal/trademark |

### Print Typography Rules
- Minimum font size for screen printing: 14pt
- Minimum font size for DTG: 10pt
- Minimum stroke width: 0.5pt (thinner won't print)
- Always outline/convert fonts before sending to printer
- No effects (drop shadows, outer glow) — they print poorly
- Text should be vector, never rasterized

---

## ✅ Required Elements

1. **Atlas character** — Centered, complete (no cropping off edges for safety)
2. **300 DPI minimum** — Non-negotiable for print
3. **CMYK color file** — Separate from RGB web preview
4. **Safe zone compliance** — 200px margins, nothing critical near edges
5. **Vector elements preferred** — Logos, text MUST be vector
6. **Transparent or specified background** — Clear layer structure
7. **Trim marks and bleed** — On production file (not on artwork itself)

---

## 🔲 Optional Elements

- Collectiverse wordmark/logo below character
- Tagline text ("Collect. Connect. Conquer.")
- Small collectible items around Atlas (composition elements)
- Background gradient (for posters/prints, not t-shirts)
- Texture overlays (halftone, grain — for artistic prints)
- Series/edition number (for limited runs)
- QR code (back of shirt, inside poster margin)
- Copyright/trademark notice (©2026 Collectiverse)

---

## ✔️ Do's

- ✅ Keep Atlas fully within safe zone — no body parts touching edges
- ✅ Provide layered files (PSD/AI) with character separated from background
- ✅ Include a flat/merged export AND the layered source
- ✅ Test print at actual size before large runs (color proof)
- ✅ Design for the WORST print method (screen print = fewer colors)
- ✅ Provide separate files for light and dark garment versions
- ✅ Keep designs scalable — what works on a sticker should work on a poster
- ✅ Add 0.125" bleed on all sides for cut products (stickers, prints)
- ✅ Include color callouts (Pantone references) for print vendors

---

## ❌ Don'ts

- ❌ **NEVER** bleed Atlas off the edge of the artboard (safety issue for print)
- ❌ Don't use RGB color mode for final print files
- ❌ Don't use effects that rely on transparency (most print methods flatten)
- ❌ Don't place fine details smaller than 1mm (won't reproduce)
- ❌ Don't use total ink coverage above 300% (causes bleeding/drying issues)
- ❌ Never use K:100 alone for black areas (use rich black formula)
- ❌ Don't submit rasterized text — always vector
- ❌ Don't design at web resolution (72 DPI) and upscale — always start at 300 DPI
- ❌ Avoid gradients for screen printing (use halftone simulation instead)
- ❌ Don't use thin lines below 0.5pt weight

---

## 🤖 AI Generation Prompts

### Base Prompt Structure
```
atlas_character [POSE], [EXPRESSION], full body, centered composition, 
clean edges, no cropping, [BACKGROUND: transparent/solid], high resolution, 
merchandise ready, clean vector-like illustration, sharp edges, 
print quality, isolated character, no complex background, collectible 
hobby mascot
```

### Example Prompts

**Prompt 1 — Classic T-Shirt Pose:**
```
atlas_character standing confidently with arms crossed and a proud smile, 
full body visible head to toe, centered composition, completely isolated 
on transparent background, clean sharp edges, no cropping, high resolution 
print quality illustration, clean bold lines, merchandise-ready artwork, 
vector-like clean style, no background elements, character fully contained 
within frame, collectible hobby mascot
```

**Prompt 2 — Action Sticker Design:**
```
atlas_character jumping with joy, holding a collectible card in one hand, 
dynamic action pose, full body visible, centered, isolated on transparent 
background, clean sharp outlines, sticker-ready illustration, bold lines, 
vibrant colors, no background, high resolution, energetic composition, 
character fully within frame, die-cut sticker style
```

**Prompt 3 — Premium Poster Art:**
```
atlas_character in heroic pose standing on a pile of collectible treasures, 
looking upward confidently, full body, centered composition, navy blue 
gradient background, gold accent lighting, premium quality illustration, 
detailed shading, poster-worthy artwork, 4K resolution, collectible 
hobby theme, surrounded by floating cards and figures, rich atmospheric 
lighting, painterly quality
```

---

## 📝 Example Topics for This Template

1. **"OG Atlas" Classic Tee** — Atlas in signature pose, transparent BG, works on any shirt color
2. **"Grail Hunter" Enamel Pin** — Atlas face close-up with star eyes, bold outlines, limited palette
3. **"The Collection" Poster Print** — Atlas surrounded by collectibles, premium illustrated style

---

## 📏 Production Checklist

### Pre-Production
- [ ] Artwork is 300 DPI or higher
- [ ] CMYK color mode for print file
- [ ] RGB preview file also provided
- [ ] Atlas is fully within safe zone (200px margins)
- [ ] No body parts cropped or bleeding off edges
- [ ] Total ink coverage ≤ 300% everywhere
- [ ] Rich black used (not K:100)
- [ ] All fonts converted to outlines/paths

### File Delivery
- [ ] Layered source file (.PSD or .AI)
- [ ] Flat merged export (.TIFF, 300 DPI, CMYK)
- [ ] Web preview (.PNG, sRGB, 72 DPI)
- [ ] Transparent background version (if applicable)
- [ ] Dark garment version + Light garment version
- [ ] Trim marks and bleed included on production file
- [ ] Color proof requested before full run

### Quality Control
- [ ] Printed test at actual size
- [ ] Colors match on proof (vs screen)
- [ ] Fine details visible at print size
- [ ] No banding in gradients
- [ ] No white fringe around character edges
- [ ] File named: `merch-[product]-[design-name]-[version].tiff`

---

## 🖨️ Product-Specific Guides

### T-Shirt / Apparel
- Print area (adult M): 12" × 14" max (3600 × 4200px @ 300 DPI)
- Place design in upper ⅓ of print area (chest placement)
- Test on both black and white garments
- Max colors for screen print: 6 (DTG unlimited)

### Stickers / Die-Cut
- Add 2mm white border around artwork for die-cut path
- Minimum size: 2" × 2" (character must be recognizable)
- Maximum colors: unlimited (digital print)
- Provide separate die-cut path (vector outline)

### Posters / Art Prints
- Standard sizes: 11×17", 18×24", 24×36"
- Include 0.125" bleed on all sides
- Use premium paper profile (matte or glossy)
- Frame-safe zone: 0.5" from each edge (frame overlap)

### Enamel Pins
- Maximum 4 metal line segments per inch
- Minimum detail size: 1mm
- Separate color fills by raised metal lines
- Provide vector art with color fills clearly defined
- Max dimensions: 2" × 2" (standard pin)

### Mugs
- Print wrap area: 9.5" × 3.5" (max)
- Handle position: leave 1.5" clear zone on each end
- Design centered in wrap area
- Colors may shift on ceramic — request color proof
