# Atlas Studio — Production Status Board

> Last updated: 2026-07-06

---

## Production Levels

```
Level 0 ███████████████████████████ Architecture   ✅ COMPLETE
Level 1 ███████████████████████████ Foundation     ✅ COMPLETE (A001 STABLE)
Level 2 █████████████░░░░░░░░░░░░░ Templates      🔶 IN PROGRESS (A011 — specs written)
Level 3 ░░░░░░░░░░░░░░░░░░░░░░░░░ Production     ⬜ BLOCKED (needs L2)
Level 4 ░░░░░░░░░░░░░░░░░░░░░░░░░ QA             ⬜ BLOCKED (needs L3)
Level 5 ░░░░░░░░░░░░░░░░░░░░░░░░░ Publishing     ⬜ BLOCKED (needs L4)
```

---

## Level 0: Architecture ✅ COMPLETE

| Component | Status |
|-----------|--------|
| atlas-ip repo structure | ✅ |
| GitHub Action pipeline | ✅ |
| Validation scripts | ✅ |
| Resize pipeline | ✅ |
| Registry generation | ✅ |
| TypeScript generation | ✅ |
| Hash comparison | ✅ |
| Deploy bridge (PR automation) | ✅ |
| COLLECTIVERSE_PAT configured | ✅ |
| Task ownership conventions | ✅ |
| Sprint structure defined | ✅ |
| LoRA training pipeline (Fal.ai) | ✅ |
| Comic generation pipeline | ✅ |
| Comic strip compositor | ✅ |
| Hero image generation script | ✅ |

---

## Level 1: Foundation (A001) ✅ COMPLETE — STABLE

**Approved: 2026-07-01**

- 20/20 canonical views ✅
- 6/6 construction sheets ✅
- 6/6 style guides ✅
- 6/6 production bible documents ✅
- All stability criteria met ✅

---

## Level 2: Templates 🔶 IN PROGRESS

Unlocked by: Level 1 (A001 STABLE ✅ 2026-07-01)

### Template Specs (written — ready for image production)

| Template | Spec File | Status |
|----------|-----------|--------|
| Comic 4-panel grid | `templates/comic-4panel-template.md` | ✅ Spec |
| Comic single-panel | `templates/comic-single-panel-template.md` | ✅ Spec |
| YouTube thumbnail | `templates/thumbnail-template.md` | ✅ Spec |
| Social tip (Instagram) | `templates/social-tip-template.md` | ✅ Spec |
| Story (9:16) | `templates/story-template.md` | ✅ Spec |
| Marketing banner | `templates/marketing-banner-template.md` | ✅ Spec |
| Merchandise | `templates/merchandise-template.md` | ✅ Spec |
| Storyboard | `templates/storyboard-template.md` | ✅ Spec |

**Template Specs: 8/8 ✅ | Visual Templates: 0/8 ⬜** (need to produce actual PSD/PNG versions)

---

## Comic Production Pipeline ✅ OPERATIONAL

| Script | Purpose | Status |
|--------|---------|--------|
| `scripts/generate-comic-panel.ts` | Full-scene LoRA panel generation (Fal.ai) | ✅ |
| `scripts/compose-comic-strip.ts` | Assemble panels + overlay text + borders | ✅ |
| `scripts/generate-full-comic.ts` | End-to-end: script → panels → final strip | ✅ |

**Comic scripts written:** 10 (comic-001 through comic-010)

---

## LoRA Models

| Character | Training Status | Model |
|-----------|----------------|-------|
| **Atlas** | ✅ Trained (41 poses) | `v3b.fal.media/files/b/0aa13be8/...` |
| **Pixel** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **Ink** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **Sterling** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **Forge** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **Porter** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **Echo** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Director** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Counterfeiter** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Broker** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Smuggler** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Archivist** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Restorer** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Hacker** | ⬜ Prompts written (40 poses) | Awaiting image generation |
| **The Hoarder** | ⬜ Prompts written (40 poses) | Awaiting image generation |

---

## Character Bible ✅ COMPLETE (12 files, 23,501 words)

| File | Character | Status |
|------|-----------|--------|
| `00-the-atlas-universe.md` | World overview | ✅ |
| `01-atlas.md` | Atlas (Robot, 100%) | ✅ + Visual spec |
| `02-pixel.md` | Pixel (Arctic Fox, 90%) | ✅ + Visual spec |
| `03-ink.md` | Ink (Raven, 80%) | ✅ + Visual spec |
| `04-sterling.md` | Sterling (British Shorthair Cat, 60%) | ✅ + Visual spec |
| `05-forge.md` | Forge (Gorilla, 130%) | ✅ + Visual spec |
| `06-porter.md` | Porter (Rhino, 140%) | ✅ + Visual spec |
| `07-echo.md` | Echo (Great Horned Owl, 80%) | ✅ + Visual spec |
| `08-villains.md` | The Shadow Syndicate (8 villains) | ✅ |
| `09-world-locations.md` | Locations & settings | ✅ |
| `10-rendering-animation-rules.md` | Motion & formation rules | ✅ |
| `11-franchise-bible.md` | Cross-media & cinematic roadmap | ✅ |

---

## Level 3: Production ⬜ BLOCKED

Blocked by: Level 2 (visual templates needed)

### Sprint 01 ░░░░░░░░░░ 0%

| Ticket | Title | Comic | Video | Thumb | Social | Meta | QA | Status |
|--------|-------|-------|-------|-------|--------|------|-----|--------|
| AT-001 | How to Store Sports Cards | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⏳ |
| AT-002 | 5 Signs Your Card is Fake | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⏳ |
| AT-003 | What PSA Grades Actually Mean | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⏳ |
| AT-004 | How to Ship Cards Safely | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⏳ |
| AT-005 | What Makes a Card Valuable | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⏳ |

---

## Level 4: QA ⬜ BLOCKED

10-point checklist per asset (unchanged from before).

---

## Level 5: Publishing ⬜ BLOCKED

Push → Pipeline → PR → Merge → Atlas Studio Admin (Task 138) → Social distribution

---

## Next Actions (Priority Order)

1. ~~Complete Level 1~~ ✅ DONE (2026-07-01)
2. ~~Mark A001 STABLE~~ ✅ DONE (2026-07-01)
3. ~~Write template specs (A011)~~ ✅ DONE (2026-07-06)
4. ~~Write comic scripts (10)~~ ✅ DONE (2026-07-06)
5. ~~Write character bible (12 files)~~ ✅ DONE (2026-07-06)
6. ~~Write LoRA training prompts (14 characters × 40 poses)~~ ✅ DONE (2026-07-06)
7. ~~Build comic pipeline scripts (3)~~ ✅ DONE (2026-07-06)
8. **Generate Keeper training images in ChatGPT** — Pixel first (40 poses)
9. **Produce visual templates** — use LoRA to generate actual template images
10. **Begin Sprint 01** — Only after L2 templates are done

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Complete |
| 🔶 | In progress |
| ⬜ | Not started |
| ⏳ | Queued (blocked) |
| ❌ | Failed/blocked |
