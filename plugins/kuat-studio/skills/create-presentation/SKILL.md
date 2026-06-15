---
name: create-presentation
description: Create Equal Experts branded slide decks and presentations — pitch decks, knowledge-sharing talks, case studies, reports. Use when building or editing EE slides and you need brand-correct layouts, typography, photography, and slide content. Not for web UI or standalone marketing pages.
---

# Create EE presentations

Build on-brand Equal Experts decks: one idea per slide, B&W photography, restrained layout variety, the page-number badge as the persistent brand cue. Standards live in [`/reference`](${CLAUDE_PLUGIN_ROOT}/reference/README.md) — link, don't inline.

## Step 1 — Intake & "before you create"

Run the grouped intake ([skills/_shared/intake.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md)), then settle the four slide-specific questions:

1. **Scenario?** Sales & marketing, knowledge sharing, case study, or reporting — each has different density, formality, and slide budget.
2. **Audience?** External (client/prospect/conference → masterbrand-strict) vs internal (network/CoP → masterbrand-lite tone, same visual rules).
3. **Delivery mode?** How will it mostly be consumed — *presented live* (sparse; presenter carries the narrative) or *read without a presenter* (read-ahead, left-behind, or forwarded; each slide self-contained)? **Default to "read without a presenter"** — most EE decks are left behind or forwarded — and aim for *self-contained but lean* density: stands alone if forwarded, but not a wall of text (see [reference/media-types/slides/content.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/content.md) → Density by delivery mode). Go sparser only when it's genuinely presented-live and won't be forwarded. Ask if unclear.
4. **Layout per slide?** Pick from the catalogue; don't invent layouts.

## Step 2 — Load the standards you need

- Brand & voice: [reference/brand/](${CLAUDE_PLUGIN_ROOT}/reference/brand/) (brand, logo, voice-and-tone)
- Design language: [reference/design-language/](${CLAUDE_PLUGIN_ROOT}/reference/design-language/)
- Content style: [reference/content/](${CLAUDE_PLUGIN_ROOT}/reference/content/)
- Slides core: [reference/media-types/slides/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/) — `styling.md`, `layouts.md`, `content.md`, `imagery-and-diagrams.md`, `data.md`
- Scenario pattern (when deck type known): [reference/media-types/slides/patterns/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/slides/patterns/) — `sales-marketing`, `knowledge-sharing`, `case-studies`, `reporting`

## Step 3 — Brand compliance while building

- EE wordmark + bracket-E logo on the **title** and **closing** slides only (bottom-right or in the blue title bar) — **not** on every slide.
- **Page-number badge** (EE Blue square, white numeral, top-right) on body slides; absent on title, full-bleed, and section dividers.
- Bracket motif as a framing device (top-left + bottom-right), EE Blue; never overlapping the bracket-E logo on the same slide.
- Masterbrand by default; co-brand follows the endorsement pattern — EE leads, client logo sits in the body, never equal weight on a sales cover.
- Don't recolour, distort, rotate, or add effects to the logo; back it with a solid panel on busy photography.

## Step 4 — Create

- One idea per slide — the **title carries the argument**, not just the topic.
- B&W photography on all slides; leave compositional space for overlays/brackets.
- 11pt minimum body copy (10pt captions only on detail-heavy slides).
- EE Blue does **one** accent job per slide (eyebrow OR callout OR chart accent).
- One chart per slide, conclusion in the title; stats paired with context, not numbers alone.
- Aim for **5–8 distinct layouts across the whole deck**, not one per slide.
- Case studies: named, true, and (for external use) approved.

## Step 5 — Delivery checklist (gate before handoff)

- [ ] Title slide: deck title + subtitle + EE logo + B&W hero
- [ ] Section eyebrow + slide title on every content slide
- [ ] No body copy below 11pt; all photographs B&W
- [ ] One layout per slide (no hybrids); 5–8 layouts across the deck
- [ ] Stats paired with context; one chart per slide, conclusion in the title
- [ ] Page-number badge on body slides; absent on title/divider/full-bleed
- [ ] Closing slide: named contact, photograph, email, phone, social row
- [ ] Sub-brand / co-brand follows the endorsement pattern, not equal weight
- [ ] Voice active, claims unhedged, jargon stripped
- [ ] Version stamp applied — see [skills/_shared/version-stamp.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)

## Conflict & ambiguity

If a rule and the user's request collide (e.g. a colour photo, a logo on every slide), **flag the conflict** and recommend the compliant option rather than silently breaking the rule. If a foundation rule and a slides rule conflict, the foundation wins — raise it.

## Related

- Review counterpart: [review-presentation](${CLAUDE_PLUGIN_ROOT}/skills/review-presentation/SKILL.md)
- Shared: [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) · [version-stamp](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)
