# Output — review-presentation · Brief E1 (flawed sales deck, brand_compliance)

**Skill run:** review-presentation · **Depth:** `brand_compliance` · **Scenario:** sales & marketing · **Audience:** external · **Reference ref:** local working copy · **Date:** 2026-06-15

## Intake

- Artifacts: 12 described slides. Scenario: sales (external → masterbrand-strict). Delivery mode: not given — does not affect the brand_compliance findings below (noted).

## Violations

| # | Severity | Rule | Evidence | Reference |
|---|----------|------|----------|-----------|
| 1 | Critical | Co-branding | Cover shows EE + client logo at equal size | `reference/media-types/slides/` (brand-compliance) — EE leads; client logo in body via endorsement pattern, not equal weight on a sales cover |
| 2 | Critical | Photography | Colour hero on cover | `reference/media-types/slides/imagery-and-diagrams.md` — all photography B&W |
| 3 | Major | Logo usage | EE logo repeated top-left on every slide | brand-compliance — page-number badge is the persistent cue; logo only on title + closing |
| 4 | Major | Type size | Body copy ~9pt | `reference/media-types/slides/styling.md` / `content.md` — 11pt minimum body |
| 5 | Major | Layouts | Two slides combine two layouts each | `reference/media-types/slides/layouts.md` — one layout per slide, no hybrids |
| 6 | Major | Data/stats | "98%" with no context | `reference/media-types/slides/data.md` — stats paired with context, not numbers alone |
| 7 | Major | Closing | No closing/contact slide | brand-compliance — closing slide with named contact, photo, email, phone, social |

## Self-score (rubric = Step 3 review table)

| Item | Covered |
|------|---------|
| Title/cover, co-brand, photography, logo, type, layouts, stats, closing | ✅ all flagged with evidence |
| Cited `reference/media-types/slides/...` per finding | ✅ |
| Delivery-mode caveat noted | ✅ (not needed for these visual findings) |

**Verdict: PASS.** All seven planted defects detected and cited; severity applied.
