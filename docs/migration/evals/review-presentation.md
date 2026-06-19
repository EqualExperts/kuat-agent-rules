# Eval briefs — review-presentation

Rubric = the **Step 5 review table** (plus the **Step 3 authenticity gate** and **Step 4 visual gate**) in [skills/review-presentation/SKILL.md](../../../skills/review-presentation/SKILL.md).

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

Exercises the **Step 4 visual gate** + pixel sampling. Source is supplied as **per-slide PNG renders** (so the visual pass can run), with these properties:

> Review this rendered 8-slide knowledge-sharing deck (PNGs attached) at `brand_compliance` depth. Visible in the renders:
> - Cover: full-bleed hero photo in **full colour** (not monochrome).
> - Body slides: a top-right page badge filled with a **near-but-wrong blue** (~`#1E73D9`, not EE Blue `#1795d4`).
> - One body slide where the EE logo has been **recoloured teal**.
> - Otherwise on-brand (eyebrow+title structure, one layout per slide, body ≥ 11pt).

**Expected findings:** the vision pass runs over the renders; **photography flagged** (colour hero should be B&W, ⬚ Photography); the badge is **pixel-sampled** and reported as `#1E73D9` vs the `#1795d4` token in `reference/design-language/colours.md` (⬚ Badge / action colour — not a vague "looks off"); **logo recolour flagged** (⬚ Logo rendering); text/structure rows pass. Each finding cites `reference/...`.

### Brief E3-fallback — text-only source must not pass visual rows

> Review this deck for brand compliance. (Source: a Google Slides **link / text-only extraction** — no render provided.)

**Expected:** the skill recognises the source is not renderable, **requests a PDF / per-slide PNG export**, and marks every ⬚ row (photography, badge/action colour, logo, layouts, title-slide hero, co-brand) as a **flagged gap** — explicitly *not* a clean pass — while still verifying the text/structure rows (type size, stats, density, voice, closing contents). It must not assert the visual rows are compliant.

---

## Brief E4 — Recreated-logo deck must FAIL (the false-pass regression) — Phase 4S

The **proof the Phase-4 false pass is fixed.** Source = the original failing pilot deck (`Kuat/kuat-studio-test/ai-in-design.html` / `ai-in-design.pdf`): a **bespoke HTML lookalike** whose "logo" is a fabricated **text `[E]` + "Equal Experts"** (the HTML has **zero `<img>` assets**), on a **near-but-wrong royal-blue** title bar, with grey placeholder photography.

> Review this 18-slide knowledge-sharing deck at `brand_compliance` depth (PDF render available).

**Expected findings (Step 3 authenticity gate):**
- **✪ Logo authenticity → FAIL.** The logo is a **recreation** (a fabricated `[E]`/text wordmark), not the canonical asset (`assets/slides/logo/ee-logo-wordmark-white.png`). A recreation is a brand **FAIL regardless** of how clean it looks. (The Phase-4 review **passed** this — `ai-in-design-review.md` — because it only checked plausibility.)
- **✪ Template authenticity → FAIL.** The deck is **bespoke HTML**, not built on `ee-master-2026.pptx`; the left "[" bracket / badge are redrawn, not inherited.
- Badge / title-bar blue **pixel-sampled** as a near-miss vs the `#1795d4` token in `colours.md`; photography flagged (placeholder/colour, ⬚).
- It must **NOT** report a clean or "partial pass" that overlooks the recreation. Authenticity FAILs are blocking and are not offset by good type/spacing.

**Pass criterion for the eval:** the reworked review **fails the deck on authenticity** where the Phase-4 review passed it.

---

## Brief E5 — Case-study deck review (scenario parity, genuine master)

> Review this client case-study deck at `brand_compliance` depth. Source: the actual `.pptx`, built from the EE master (PDF render also available). It's broadly on-brand; the planted issues are scenario-specific, not authenticity.

Planted issues to catch:
> - Cover places the **client logo at equal weight** beside the EE logo (should be the endorsement pattern — EE leads; client logo in the body, not co-equal on the cover).
> - The case study names a client and outcome that are **not marked as approved/true**.
> - No closing **contact** block.
> - One body slide states a result as a **bare "+40%"** with no surrounding context.

**Targets:** scenario resolved = **case study** (distinct from E1 sales / E2 reporting); because the source **is** the genuine `.pptx`, the **authenticity gate (Step 3) passes** — and the review says so explicitly rather than treating "on the master" as suspicious. Findings are the **case-study pattern** breaches (co-brand weight, approval/truth of the named case, closing contact, contextless stat), each cited to `reference/media-types/slides/patterns/case-studies.md` / `slides/...`. Confirms a clean-authenticity deck is **not** auto-passed and the scenario pattern rules are applied.
