---
name: create-presentation
description: Create Equal Experts branded slide decks and presentations — pitch decks, knowledge-sharing talks, case studies, reports. Builds from the genuine EE master template (inheriting real layouts, the left bracket, the official logo, and Lexend) — never improvises a lookalike. Use when building or editing EE slides. Not for web UI or standalone marketing pages.
---

# Create EE presentations

Build on-brand Equal Experts decks **from the genuine master template** — never from a
prose description of the brand. The master carries the real layouts, the left-side "[" bracket,
the **official EE logo**, the theme colours, and embedded Lexend; building from it makes all of
that come for free. Improvising a lookalike (bespoke HTML, a hand-drawn `[E]`) is what produced
the Phase-4 false pass — **don't**. Standards live in [`/reference`](${CLAUDE_PLUGIN_ROOT}/reference/README.md) — link, don't inline.

> **The one rule that matters:** you **insert** the genuine logo (it's inherited from the master
> layouts) — you **never recreate, redraw, or re-letter** it. If a required asset can't be
> resolved, **stop and flag it** — do not fabricate a mark or fake a layout.

## Step 1 — Intake & "before you create"

Run the grouped intake ([skills/_shared/intake.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md)), then settle the slide-specific questions:

1. **Scenario?** Sales & marketing, knowledge sharing, case study, or reporting — each has different density, formality, and slide budget.
2. **Audience?** External (client/prospect/conference → masterbrand-strict) vs internal (network/CoP → masterbrand-lite tone, same visual rules).
3. **Delivery mode?** *Presented live* (sparse; presenter carries the narrative) or *read without a presenter* (read-ahead, left-behind, forwarded; each slide self-contained)? **Default to "read without a presenter"** and aim for *self-contained but lean* density (see [reference/media-types/slides/content.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/content.md) → Density by delivery mode). Go sparser only when genuinely presented-live and won't be forwarded. Ask if unclear.
4. **Layout per slide?** Pick from the master's catalogue (the manifest's verified layouts); don't invent layouts.
5. **Assets available?** Confirm the asset pack resolves (master + manifest + logo) — see Step 2. If it doesn't, **stop and flag**; do not proceed with an approximation.

## Step 2 — Build from the master (don't improvise)

The output is a **PPTX built by cloning the master's real layouts**, not bespoke HTML.

1. **Resolve the asset pack.** Master + manifest live at `${CLAUDE_PLUGIN_ROOT}/assets/slides/` (installed) or `assets/slides/` (repo dev):
   - `ee-master-2026.pptx` — the genuine master (65 layouts, left bracket, EE logo, embedded Lexend/Lora/JetBrains Mono).
   - `assets.manifest.json` — verified layout indices (`title`, `section`, `content`, `blank`), the canonical logo files, the bracket description.
   - **If either can't be resolved, STOP and flag the missing asset.** Never recreate the master or the logo.
2. **Plan the deck** — one idea per slide, the title carrying the argument; choose a layout per slide from the manifest.
3. **Generate** — write a slides spec and run this skill's bundled `scripts/build_from_master.py`:
   ```bash
   python3 scripts/build_from_master.py --spec slides.json --out deck.pptx
   ```
   `slides.json` = `{"slides":[{"layout":"title","fields":{"0":"<title>","2":"<subtitle>"}}, ...]}` — `layout` is a manifest key; `fields` keys are placeholder indices. The script auto-resolves the bundled master (via `CLAUDE_PLUGIN_ROOT`, else the repo path), clones it, adds each slide from its real layout, fills placeholders in Lexend, and **verifies the embedded fonts + inherited logo survived**. (Needs `python-pptx`: `pip install python-pptx`.)

## Step 3 — What is inherited vs what you author

| Inherited from the master (do **not** recreate) | You author |
|---|---|
| The **EE logo** (on title/closing layouts), the left-side **"[" bracket**, theme colours (genuine EE blue), grids, embedded Lexend | Headlines, body copy, section structure, which layout each slide uses, chart/stat content |

- **Logo:** inherited via the title/closing layouts. Never redraw or re-letter it. Don't recolour, distort, rotate, or add effects.
- **Page-number badge:** present on body layouts (EE Blue square, white numeral); absent on title, full-bleed, and section dividers — this is layout behaviour, don't add it by hand.
- **Bracket:** the brand signature is the **left-side "[" bracket** (full-height, tech-blue, left edge) — inherited from the layouts. (The old reference called this a "top-left + bottom-right corner frame"; that was wrong. See [reference/media-types/slides/layouts.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/layouts.md).)

## Step 4 — Load the standards you need

- Brand & voice: [reference/brand/](${CLAUDE_PLUGIN_ROOT}/reference/brand/) (brand, logo, voice-and-tone)
- Design language: [reference/design-language/](${CLAUDE_PLUGIN_ROOT}/reference/design-language/) — colours are read from [reference/design-language/colours.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/colours.md), don't assume a hex
- Content style: [reference/content/](${CLAUDE_PLUGIN_ROOT}/reference/content/)
- Slides core: [reference/media-types/slides/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/) — `styling.md`, `layouts.md`, `content.md`, `imagery-and-diagrams.md`, `data.md`
- Scenario pattern (when deck type known): [reference/media-types/slides/patterns/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/patterns/) — `sales-marketing`, `knowledge-sharing`, `case-studies`, `reporting`

## Step 5 — Author the content (on the inherited frame)

- One idea per slide — the **title carries the argument**, not just the topic.
- EE Blue does **one** accent job per slide (eyebrow OR callout OR chart accent).
- 11pt minimum body copy (10pt captions only on detail-heavy slides); one chart per slide, conclusion in the title; stats paired with context.
- Aim for **5–8 distinct layouts across the whole deck**, not one per slide.
- **Imagery:** there is **no EE image library yet**. Any photograph is an **explicitly-marked placeholder that BLOCKS release** — never a colour stock image passed off as final, never a fabricated photo. Photography is B&W when the library exists.
- Case studies: named, true, and (for external use) approved.

## Step 6 — Delivery checklist (gate before handoff)

- [ ] Deck **built from `ee-master-2026.pptx`** (not bespoke HTML / not an approximation)
- [ ] Logo is the **genuine inherited asset** — not recreated, redrawn, or re-lettered
- [ ] No required asset was missing-then-faked (if one was missing, you stopped and flagged)
- [ ] Title slide: deck title + subtitle + inherited logo + (B&W hero when the library exists)
- [ ] Section eyebrow + slide title on every content slide
- [ ] No body copy below 11pt; any imagery is a marked placeholder (blocks release) until the library exists
- [ ] One layout per slide (no hybrids); 5–8 layouts across the deck
- [ ] Stats paired with context; one chart per slide, conclusion in the title
- [ ] Page-number badge present on body slides (inherited); absent on title/divider/full-bleed
- [ ] Closing slide: named contact, photograph, email, phone, social row
- [ ] Sub-brand / co-brand follows the endorsement pattern, not equal weight
- [ ] Voice active, claims unhedged, jargon stripped
- [ ] Version stamp applied — see [skills/_shared/version-stamp.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)

## Conflict & ambiguity

If a rule and the user's request collide (e.g. a colour photo, a logo on every slide), **flag the conflict** and recommend the compliant option rather than silently breaking the rule. If a required asset (master, manifest, logo) can't be resolved, **stop and flag** — never substitute a recreation. If a foundation rule and a slides rule conflict, the foundation wins — raise it.

## Related

- Review counterpart: [review-presentation](${CLAUDE_PLUGIN_ROOT}/skills/review-presentation/SKILL.md)
- Asset pack: `${CLAUDE_PLUGIN_ROOT}/assets/slides/` (master, manifest, logo, fonts)
- Shared: [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) · [version-stamp](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)
