# Manual Execution Report — Phase 4

**Plugin:** kuat-studio
**Run date:** 2026-06-16
**Status:** ⚠️ FAIL

## 1. What was done

- Test directory created at ~/Claude/Projects/kuat-studio-test.
- Simple prompt given to "Make me a knowledge-sharing deck outline on AI in design".
- Clarifying questions were asked to understand if the slides are only for a live presentation, and audience.
- The ouput was a simple HTML presentation.

## 2. Kuat review (from Skill)

Brand Review — *AI in Design: State of the Field*


|                       |                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Scope**             | All 18 slides (`ai-in-design.html` / `ai-in-design.pdf`)                                                                             |
| **Depth**             | Full (brand + layout + narrative/density/voice)                                                                                      |
| **Context**           | Knowledge-sharing · external conference (masterbrand-strict) · presented-live (sparse)                                               |
| **Visual gate**       | Met — 18 slides rendered to PNG, badge/brand colours pixel-sampled                                                                   |
| **Overall status**    | **Partial pass — not yet release-ready.** Brand system is sound; one layout defect plus intentional placeholders block external use. |
| **Reference version** | `a115ac0` · 2026-06-16                                                                                                               |


**Headline:** The deck is structurally on-brand — the persistent badge, type hierarchy, single-accent discipline, and sparse density are all correct. Three things stand between it and a conference stage: a broken slide (12), placeholder content (stat, photos, contact), and a couple of polish nits.

### Checklist


| Rule group                                           | Status           | Notes                                                                     |
| ---------------------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| Title slide (title + sub + B&W hero + logo)          | Pass             | Logo in blue title bar; hero is placeholder (see below)                   |
| Section structure (eyebrow + title)                  | Pass             | Every content slide has both                                              |
| Type size ≥ 11pt                                     | Pass             | Smallest is ~13–14px captions/legend; above floor                         |
| Photography monochrome                               | Partial          | Treatment grayscale, but all images are placeholders, not real B&W photos |
| Layouts — no hybrids; 5–8 distinct                   | Partial          | No hybrids; ~9 distinct layouts (marginally over)                         |
| Stats paired with context                            | Pass             | Slide 7 number + context sentence                                         |
| Page badge — EE Blue, body slides only               | Pass             | Sampled `#0066CC` exact; absent on title/dividers/full-bleed/contact      |
| Badge colour = token                                 | Pass             | Pixel-sampled `(0,102,204)` = `#0066CC` exactly                           |
| Logo — title + closing only, no distortion           | Pass             | Only slides 1 + 18                                                        |
| Closing slide (contact, photo, email, phone, social) | Pass (structure) | All present; details are placeholders                                     |
| Charts — one per slide, conclusion in title          | Pass             | Diagram (5) + stat (7); titles carry conclusions                          |
| Co-brand weight                                      | N/A              | Masterbrand only                                                          |
| Density vs delivery mode                             | Pass             | Sparse, correct for presented-live                                        |
| Voice — active, no hedging, low jargon               | Pass             | Titles carry the argument throughout                                      |


### Violations

**[Major] Broken layout — Slide 12 (demo).** The photo-brief overlay box and the "Demonstration / From prompt to first draft in seconds" caption panel both sit bottom-left and overlap into an illegible jumble of stacked text. A full-bleed slide must read cleanly.

- *Rule:* `reference/media-types/slides/layouts.md` (§Section divider / no competing text blocks); `imagery-and-diagrams.md` (legible overlays).
- *Fix:* Move the caption panel to bottom-right, or remove the placeholder brief box from this slide so only the demo caption remains.

**[Major] Photography is placeholder, not real B&W.** Every hero/section/headshot is the grey diagonal-stripe placeholder with a brief. The treatment is correctly monochrome, but for an external conference the real approved B&W photographs are required.

- *Rule:* `reference/media-types/slides/imagery-and-diagrams.md` (B&W photography on all slides).
- *Fix:* Swap in approved EE B&W imagery per the briefs (this was the agreed placeholder approach — flagged so it isn't forgotten before release).

### Recommendations (non-blocking)

**[Minor] Layout count slightly over guideline.** ~9 distinct layouts vs the 5–8 target (`layouts.md` §Do). The agenda 3-up (3) and risks 3-up (15) are effectively the same layout, as are the light statements (2/6/14/17) and dark key-concept (9) — so the spirit (reuse, not one-per-slide) is met. Consider consciously treating those as shared layouts; no structural change needed.

**[Minor] EE Blue doing two accent jobs — Slide 5.** The eyebrow and the highlighted diagram chips both use EE Blue. `styling.md` (§Colour usage Do) wants EE Blue on one accent job per slide. The badge/brackets are exempt brand furniture, but eyebrow + chart-accent together is borderline. *Fix:* mute the eyebrow to Slate on slide 5, letting the highlighted chips own the blue.

**[Minor] Version-stamp contrast on dark slides (9, 18).** The `EE reference …` footer is dark grey on Slate-900 — near-invisible. It's meta, not content, so not an AA content failure, but lift it to ~60% white on dark slides for consistency.

**[Minor] Closing-slide bracket + title hero brief.** Slide 18 has only the top-left bracket (no bottom-right pair); slide 1's hero brief is clipped behind the title bar. Both cosmetic.

### Product / UX notes

Narrative arc is strong and audience-fit: three-act structure, the dark slide (9) lands the key concept as the pattern intends, and slide 16 ("things to try on Monday") converts the talk to action per the knowledge-sharing pattern. Slides 10/11 correctly use generic content layouts labelled "illustrative" rather than the case-study layout — exactly right for hypotheticals (`patterns/knowledge-sharing.md` §Don't).

### Open questions

1. **Slide 7 stat (`~65%`)** is a flagged placeholder — confirm the real, citable figure before release.
2. **Slide 5 attribution** ("adapted from NN/g and the Figma AI report") — verify those sources actually support the chip placement.
3. **Slide 18 contact** — fill `[Your name]` / role / email / phone before sharing.

### References

- `reference/media-types/slides/` — `styling.md`, `layouts.md`, `content.md`, `imagery-and-diagrams.md`, `data.md`
- `reference/design-language/colours.md` — EE Blue `#0066CC` (sampled match)
- `reference/media-types/slides/patterns/knowledge-sharing.md`
- `reference/brand/logo.md`
- **Reference version:** `a115ac0` · 2026-06-16

## 3. Observations

- **MAJOR** - The slides are not on brand with Equal Experts. The slide templates do not align with the EE template, colours or patterns. This needs to be resolved. 
- MAJOR - The EE brandmark logo was recreated as a [E] and does not comply with Kuat

