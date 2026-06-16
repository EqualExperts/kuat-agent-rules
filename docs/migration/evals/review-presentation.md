# Eval briefs — review-presentation

Rubric = the **Step 4 review table** (plus the **Step 3 visual gate**) in [skills/review-presentation/SKILL.md](../../../skills/review-presentation/SKILL.md).

---

## Brief E1 — Brand review of a flawed deck (screenshots described)

> Review this 12-slide sales deck at `brand_compliance` depth. Described slides:
> - Cover: EE logo + client logo same size, side by side; colour hero photo.
> - Body slides: EE logo repeated top-left on every slide; body copy at ~9pt; two slides combine two layouts each.
> - A stats slide: "98%" with no surrounding context.
> - No closing/contact slide.

**Expected findings:** co-brand equal weight on cover (should be endorsement pattern); colour photography (should be B&W); logo on every slide (badge is the persistent cue, not the logo); body < 11pt; hybrid layouts; stat without context; missing closing contact slide. Each cites `reference/media-types/slides/...`.

---

## Brief E2 — Read-ahead density check (delivery mode matters)

> Review a read-ahead report deck for density at `full` depth.

**Targets:** intake captures delivery mode (read-ahead → denser is acceptable); doesn't penalise density inappropriately; voice/active-claims checks; scenario = reporting.

---

## Brief E3 — Visual verification on a rendered deck

Exercises the **Step 3 visual gate** + pixel sampling. Source is supplied as **per-slide PNG renders** (so the visual pass can run), with these properties:

> Review this rendered 8-slide knowledge-sharing deck (PNGs attached) at `brand_compliance` depth. Visible in the renders:
> - Cover: full-bleed hero photo in **full colour** (not monochrome).
> - Body slides: a top-right page badge filled with a **near-but-wrong blue** (~`#1E73D9`, not EE Blue `#0066CC`).
> - One body slide where the EE logo has been **recoloured teal**.
> - Otherwise on-brand (eyebrow+title structure, one layout per slide, body ≥ 11pt).

**Expected findings:** the vision pass runs over the renders; **photography flagged** (colour hero should be B&W, ⬚ Photography); the badge is **pixel-sampled** and reported as `#1E73D9` vs the `#0066CC` token in `reference/design-language/colours.md` (⬚ Badge / action colour — not a vague "looks off"); **logo recolour flagged** (⬚ Logo); text/structure rows pass. Each finding cites `reference/...`.

### Brief E3-fallback — text-only source must not pass visual rows

> Review this deck for brand compliance. (Source: a Google Slides **link / text-only extraction** — no render provided.)

**Expected:** the skill recognises the source is not renderable, **requests a PDF / per-slide PNG export**, and marks every ⬚ row (photography, badge/action colour, logo, layouts, title-slide hero, co-brand) as a **flagged gap** — explicitly *not* a clean pass — while still verifying the text/structure rows (type size, stats, density, voice, closing contents). It must not assert the visual rows are compliant.
