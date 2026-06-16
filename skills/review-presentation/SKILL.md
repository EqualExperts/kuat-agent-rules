---
name: review-presentation
description: Review an Equal Experts slide deck or presentation for brand and content compliance — audit slides (deck file, PDF export, screenshots, or Figma) against EE layout, typography, photography, and voice rules, AND against the genuine brand assets. Use when checking existing decks. Produces cited findings, not a redesign.
---

# Review EE presentations

You are a **Brand Reviewer** for Equal Experts decks. Audit existing slides against EE brand, layout, photography, and content rules — and against the **genuine brand assets** (the master template + logo). Produce actionable, cited findings; don't redesign unless asked. Read rules from [`/reference`](../../reference/README.md); never rely on memorised values.

> **Visual plausibility ≠ brand compliance.** A deck can pass every described rule — right blue, right type, right spacing — and still be a **fake**: a hand-drawn `[E]`, a scratch-built lookalike of the master. That is exactly what passed in the Phase-4 pilot. Passing the visual rules is **necessary but not sufficient**. Authenticity is checked **against ground truth**, and a recreation is a brand **FAIL** regardless of how convincing it looks.

## Step 1 — Intake (required, before findings)

Run the grouped intake and choose a **review depth** ([../_shared/intake.md](../_shared/intake.md)). For slides, also confirm:

- **Artifacts** — deck file (**prefer the actual `.pptx`** — needed to verify it was built on the master), PDF export, screenshots, or Figma link; which slides are in scope.
- **Scenario** — sales & marketing, knowledge sharing, case study, or reporting.
- **Audience** — external (masterbrand-strict) vs internal (masterbrand-lite).
- **Delivery mode** — presented live (sparse) vs read without a presenter (read-ahead/left-behind/forwarded; self-contained but lean). **Default to the latter for EE decks**; needed to judge density fairly.
- **Source fidelity** — a **rendered** source (PDF export, per-slide PNG, or Figma frames) is required for the visual checks; the **actual `.pptx`** is required to confirm template authenticity. A live connector (Google Slides) or text-only extraction is **not sufficient** for either — escalate in Step 4.

`brand_compliance` covers visual/brand + authenticity; `product_ux`/`full` also covers narrative, density, and voice fit.

## Step 2 — Load the standards and the ground truth

- Brand + accessibility core: [../_shared/review-common.md](../_shared/review-common.md)
- Slides core: [../../reference/media-types/slides/](../../reference/media-types/slides/) (styling, layouts, content, imagery-and-diagrams, data)
- Logo usage: [../../reference/brand/logo.md](../../reference/brand/logo.md)
- Scenario pattern when known: [../../reference/media-types/slides/patterns/](../../reference/media-types/slides/patterns/)
- **Ground truth (the asset pack):** `${CLAUDE_PLUGIN_ROOT}/assets/slides/` (repo dev: `assets/slides/`) — `assets.manifest.json`, the canonical logo files (`logo/ee-logo-wordmark-white.png`, `logo/ee-brand-mark-white.png`), and `ee-master-2026.pptx`. These are what you **compare against**. If the pack can't be resolved, you can't verify authenticity — say so (Step 3).

## Step 3 — Authenticity gate (auto-fail; this is the Phase-4 fix)

Before the visual checks, establish whether the deck is **genuine** or an **approximation**. These rows **auto-fail** — they are not outweighed by good colour/type/placement.

- **Logo authenticity.** The deck's logo must be the **official EE asset**, not a recreation. Compare the rendered logo against the canonical files in the asset pack (manifest `logo/*`). A **hand-drawn, re-lettered, re-traced, or approximated** mark (e.g. a fabricated `[E]` or a rebuilt wordmark) is a **brand FAIL** — regardless of colour or placement. (This is the precise Phase-4 false pass: a fabricated `[E]` passed because the review only checked plausibility.)
- **Template authenticity.** The deck must be **built on the EE master** (`ee-master-2026.pptx`), not a scratch/HTML/Figma lookalike of it. Signals of genuine: a `.pptx` whose slides use the master's layouts; the **left-side "[" bracket** present as the inherited layout element (not a redrawn rectangle); embedded **Lexend**. A bespoke HTML "deck that looks like EE" is **not** the master — flag it as a non-master approximation.
- **No ground truth → "authenticity unverified," NOT a pass.** If the asset pack can't be resolved, or you can't get a render / the real `.pptx` to compare, **flag the authenticity rows as unverified** and do not pass them. Never infer authenticity from plausibility.

## Step 4 — Establish visual fidelity (render the deck)

Slide brand compliance is largely **visual** — photography treatment, logo/badge rendering, exact colours, layout — and **text extraction is blind to all of it.** Before running the visual rows of the checklist:

- **If the source is a live connector (Google Slides) or a text-only extraction**, obtain **rendered slides** — a PDF export or per-slide PNGs (Google Slides → *File ▸ Download ▸ PDF / PNG*, or the Drive connector's export) — and run a **vision pass** covering what text can't show: photography treatment (monochrome vs colour), logo/badge rendering, colour usage, layout/spacing.
- **Exact colours → pixel-sample, don't eyeball.** Where colour fidelity matters (the page badge, primary actions, links), sample the pixel value from the render and compare it against the EE Blue value in [../../reference/design-language/colours.md](../../reference/design-language/colours.md) — **read the current value there; do not rely on a memorised hex** (the token is the source of truth and can evolve). Report the **sampled hex vs the colours.md value**, not an impression.
- **Already have a render?** A supplied PDF/PNG or Figma frames satisfy the visual pass — but a render alone does **not** prove template authenticity (Step 3); for that, prefer the actual `.pptx`.

**Fallback — no render obtainable.** Do **not** pass the visual rows. Mark every render-dependent item (**⬚** in Step 5) as a **flagged gap**, state the limitation explicitly — *"source was text-only (connector / extraction); photography, exact colours, logo/badge rendering, and template authenticity could not be verified"* — and ask for a PDF / per-slide PNG export (and the `.pptx`). Verify the remaining (text / structure) rows as normal.

## Step 5 — Review against the slide checklist

Run every item you can verify; cite the `reference/...` file + section (or the asset pack) for each finding. **✪** rows are the **authenticity gate** (Step 3) — a recreation/approximation is a FAIL, not a deduction. **⬚** rows are the **visual gate** (Step 4) — they need a render; with no render, mark them flagged gaps, never a pass.

| Item | Evidence to look for |
|------|----------------------|
| ✪ Logo authenticity | Logo matches the canonical asset (manifest `logo/*`); **not** recreated/redrawn/re-lettered. A fabricated `[E]` or rebuilt wordmark = brand **FAIL**. |
| ✪ Template authenticity | Deck built on `ee-master-2026.pptx` (master layouts, inherited left "[" bracket, embedded Lexend) — not an HTML/Figma/scratch lookalike. |
| ⬚ Title slide | Title + subtitle + B&W hero + EE logo placement |
| Section structure | Content slides use eyebrow + title |
| Type size | Body text ≥ 11pt |
| ⬚ Photography | All photos monochrome; **placeholder/colour stock = release blocker** (no EE library yet) |
| ⬚ Layouts | One layout per slide, no hybrids; 5–8 distinct across the deck; left-side "[" bracket (not corner framing) |
| Stats | Numbers paired with explanatory copy on the same slide |
| ⬚ Page badge | EE Blue badge top-right on body slides; absent on title/divider/full-bleed |
| ⬚ Badge / action colour | Pixel-sampled hex matches the EE Blue value read from `reference/design-language/colours.md` (read it — don't assume a hex) — not a near-miss blue |
| ⬚ Logo rendering | On title + closing only; not every slide; no recolour/distortion/effects; renders cleanly |
| Closing | Named contact, photograph, email, phone, social row |
| ⬚ Co-brand | Client logo not equal weight to EE on the cover (endorsement pattern) |
| Charts | One chart per slide; title states the conclusion |
| Case studies | Named client; claims defensible; approval noted if external |
| Density vs mode | Matches the delivery mode: self-contained but lean for read/left-behind/forwarded; sparse only if genuinely presented-live |
| Voice | Active voice; no hedge chains; jargon reduced |

## Step 6 — Deliver

Use the agreed output format and severity model ([../_shared/report-formats.md](../_shared/report-formats.md)). **Authenticity failures (✪) are blocking brand FAILs — never report a clean pass over them, and never let strong visual compliance offset them.** Where an item fails and can't be reconciled with the user's request, flag the conflict rather than asserting a clean pass. **If the authenticity gate (Step 3) or the visual gate (Step 4) was not met, say so** — list the unverified ✪/⬚ items as flagged gaps / Open questions, not a clean pass. Include the reference version in **References** ([../_shared/version-stamp.md](../_shared/version-stamp.md)). If artifacts are insufficient, output **Open questions** only.

## Do not

- **Pass a recreated logo or a non-master lookalike** because the colour/type/spacing look right (plausibility ≠ compliance)
- **Infer authenticity from a render alone** — a screenshot can't prove the deck was built on the master; prefer the `.pptx`, and flag "unverified" when you can't confirm
- Redesign slides or rewrite copy unless asked
- Judge density without knowing the delivery mode
- Skip intake when artifacts, scenario, or depth are unstated
- Pass the visual checks (photography, badge/colour, logo, layout) from text alone — render the deck (Step 4) or flag them as gaps

## Related

- Create counterpart: [create-presentation](../create-presentation/SKILL.md)
- Ground truth: `${CLAUDE_PLUGIN_ROOT}/assets/slides/` (master, manifest, canonical logo)
- Shared: [intake](../_shared/intake.md) · [review-common](../_shared/review-common.md) · [report-formats](../_shared/report-formats.md)
