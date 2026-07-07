# Page Hero Images — Generation Prompts

Each page has a unique hero image featuring the Keeper character whose personality matches the page's purpose. These are wide banner images (1920x800 or 16:7 aspect ratio) used as page headers.

## Character Ownership

| Page | Character | Why |
|------|-----------|-----|
| Home `/` | ALL + villains | Group shot = team unity, world introduction |
| Collection | Atlas | Atlas = the curator, organizer, collector's companion |
| Catalog | Pixel | Pixel = the scanner/identifier, discovers new items |
| Vault | Porter | Porter = the protector, guardian of valuables |
| Marketplace | Sterling | Sterling = the appraiser, knows value of everything |
| Community | Forge | Forge = the builder, brings people together |
| The Archive | Ink | Ink = the storyteller, keeper of history and lore |
| Live | Echo | Echo = the broadcaster, memory keeper, connects remotely |
| Events | All Keepers (casual) | Community gathering = everyone together |
| Pricing | Atlas (friendly) | Atlas = the guide, presents options clearly |
| Challenges | Forge + Atlas | Challenge/competition energy |
| Leaderboards | Sterling + others | Rankings, prestige, value |

---

## Generation Prompts

### Home Page (Group Shot)
```
atlas_character leading a team of 6 unique fantasy creatures (arctic fox with goggles, raven with ink-drip wings, cat with monocle, gorilla with mechanical arm, armored rhino, owl with glowing crystals) standing together in heroic poses on a cliff overlooking a vast glowing city made of collectible cards and comic books and coins, dramatic sunset lighting, epic wide-angle composition, Pixar DreamWorks quality CGI, cinematic, 16:7 aspect ratio banner
```
**Size:** 1920x800 (or 1344x576 for Flux)
**Notes:** This is the HERO image. Needs to be epic and inviting.

### Collection Page (Atlas)
```
atlas_character, a small cute chibi robot with blue and white armored body, black visor face with glowing eyes, gold star antenna on top of head, standing in a beautiful organized collection room, shelves filled with sports cards in cases, comic books, coins in display cases, vinyl records, proud curator pose, warm golden lighting, cozy atmosphere, organized and satisfying, Pixar quality render, wide banner composition
```
**Size:** 1344x576
**LoRA:** Atlas LoRA ✅ (can generate now)

### Catalog Page (Pixel — Arctic Fox)
```
A cute chibi arctic fox character with cyan-tipped fur and tech goggles on forehead, wearing a scanner gauntlet with holographic display, excitedly discovering new items in an infinite library of collectibles, holographic cards floating around her, cyan glow effects, futuristic scanner beams revealing hidden treasures, Pixar DreamWorks quality CGI, wide banner composition, vibrant colors
```
**Size:** 1344x576
**LoRA:** Needs Pixel LoRA (not yet trained)
**Fallback:** Generate without LoRA, use general Flux model

### Vault Page (Porter — Rhino)
```
A massive cute chibi armored rhino character with vault-door armor plates and glowing blue horn, standing guard in front of an enormous glowing vault door, blockchain chains of light connecting to protected items inside, secure atmosphere, dramatic blue and gold lighting, impenetrable fortress feeling, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Porter LoRA (not yet trained)

### Marketplace Page (Sterling — Cat)
```
A sophisticated cute chibi British Shorthair cat character with a gold monocle and pearl vest, standing at an elegant trading floor with display cases of valuable collectibles, price tags floating holographically, other collectors browsing behind him, marketplace bazaar atmosphere, warm golden and cream tones, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Sterling LoRA (not yet trained)

### Community Page (Forge — Gorilla)
```
A friendly cute chibi gorilla character with a copper mechanical arm and welding goggles pushed up on forehead, in the center of a bustling community workshop, other collectors working on projects around him, building something together, warm workshop lighting, sparks flying, collaborative energy, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Forge LoRA (not yet trained)

### The Archive Page (Ink — Raven)
```
A dramatic cute chibi raven character with ink-drip wing-cape and golden quill pen, surrounded by floating comic book pages and glowing story fragments, in a grand library/archive with towering bookshelves, magical ink swirling in the air forming characters and scenes, indigo and gold color palette, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Ink LoRA (not yet trained)

### Live Page (Echo — Owl)
```
A mystical cute chibi great horned owl character with translucent wings and floating violet memory crystals, broadcasting from a high-tech streaming studio, holographic screens showing live auction items, audience silhouettes in background, violet and purple glow effects, energy of a live broadcast, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Echo LoRA (not yet trained)

### Events Page (All Keepers Casual)
```
atlas_character and 6 fantasy creature friends (arctic fox, raven, cat, gorilla, rhino, owl) at a fun convention hall, booths with collectible cards and comics visible, crowds of happy collectors in background, banner decorations, casual and fun atmosphere, bright colorful lighting like a card show floor, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Atlas LoRA ✅ (Atlas in scene, others generated)

### Pricing Page (Atlas Presenting)
```
atlas_character, a small cute chibi robot with blue and white armored body, black visor face with glowing eyes, gold star antenna on top of head, friendly welcoming pose with arms open, standing next to three glowing holographic plan cards labeled FREE PRO BUSINESS, clean minimal background with soft gradient, clear and inviting, Pixar quality render, wide banner composition
```
**Size:** 1344x576
**LoRA:** Atlas LoRA ✅ (can generate now)

### Challenges Page (Forge + Atlas)
```
atlas_character, a small cute chibi robot with blue and white armored body, standing next to a large friendly gorilla with copper mechanical arm, both in competitive ready poses, trophy and medal display behind them, challenge arena with scoreboard, energetic atmosphere with sparks and determination, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Atlas LoRA ✅ (Atlas featured, Forge generated)

### Leaderboards Page (Sterling + Trophy)
```
A sophisticated cute chibi British Shorthair cat character with gold monocle on a podium at position #1, trophy in hand, rankings board behind showing collector names and scores, confetti falling, celebration atmosphere, gold and cream prestige colors, Pixar DreamWorks quality CGI, wide banner composition
```
**Size:** 1344x576
**LoRA:** Needs Sterling LoRA (not yet trained)

---

## Pages Generatable NOW (Atlas LoRA available):
1. ✅ Collection (Atlas solo)
2. ✅ Pricing (Atlas presenting)
3. ✅ Events (Atlas + generic team)
4. ✅ Challenges (Atlas + generic Forge)
5. ✅ Home (Atlas leading team — quality may vary without other LoRAs)

## Pages Needing Keeper LoRAs (Phase 2):
1. ⬜ Catalog (Pixel LoRA)
2. ⬜ Vault (Porter LoRA)
3. ⬜ Marketplace (Sterling LoRA)
4. ⬜ Community (Forge LoRA)
5. ⬜ The Archive (Ink LoRA)
6. ⬜ Live (Echo LoRA)
7. ⬜ Leaderboards (Sterling LoRA)

## Generation Commands:
```bash
# Collection hero
npx tsx scripts/generate-comic-panel.ts \
  --prompt "atlas_character standing in a beautiful organized collection room, shelves filled with sports cards in cases, comic books, coins in display cases, vinyl records, proud curator pose, warm golden lighting, cozy atmosphere, organized and satisfying" \
  --size 1344x576 \
  --output generated/hero-collection.png

# Pricing hero
npx tsx scripts/generate-comic-panel.ts \
  --prompt "atlas_character friendly welcoming pose with arms open, standing next to three glowing holographic plan cards, clean minimal background with soft gradient, clear and inviting" \
  --size 1344x576 \
  --output generated/hero-pricing.png

# Events hero
npx tsx scripts/generate-comic-panel.ts \
  --prompt "atlas_character at a fun convention hall with booths showing collectible cards and comics, crowds of happy collectors, banner decorations, casual and fun atmosphere, bright colorful lighting" \
  --size 1344x576 \
  --output generated/hero-events.png

# Challenges hero
npx tsx scripts/generate-comic-panel.ts \
  --prompt "atlas_character standing next to a large friendly gorilla with copper mechanical arm, both in competitive ready poses, trophy display behind them, challenge arena with scoreboard, energetic atmosphere" \
  --size 1344x576 \
  --output generated/hero-challenges.png
```
