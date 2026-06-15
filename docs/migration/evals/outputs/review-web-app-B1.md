# Output — review-web-app · Brief B1 (sign-in, brand_compliance)

**Skill run:** review-web-app · **Depth:** `brand_compliance` (UX/content fit **out of scope** — no product context) · **Reference ref:** local working copy · **Date:** 2026-06-15

## Intake

- Depth: `brand_compliance` (chosen by user). Product/UX-fit section is **out of scope** and not scored.
- Artifacts: the provided component only.

## Violations

| # | Severity | Rule | Evidence | Reference | Fix |
|---|----------|------|----------|-----------|-----|
| 1 | Critical | Contrast | Button text `#7aa7d8` on `#0066CC` ≈ 1.9:1 — fails AA (needs 4.5:1) | `reference/accessibility/accessibility.md` | Use `text-primary-foreground` (white) on `bg-primary` |
| 2 | Critical | Form labels | Inputs use `placeholder` as the only label — no `<label>` | `reference/media-types/web-product/content/forms.md`; `accessibility/accessibility.md` | Add associated visible `<label>` per field |
| 3 | Major | Semantic tokens | Hardcoded `#fff`, `#0066CC`, `#ddd` instead of tokens | `reference/design-language/colours.md` | `bg-card`, `bg-primary`, `border` |
| 4 | Major | Border radius | Input radius 10px; interactive radius should be 6px / inputs 4px | `reference/design-language/borders.md` | `rounded-[4px]` inputs, `rounded-md` (6px) button |
| 5 | Major | Spacing grid | `padding: 17px` is off the 4px grid | `reference/design-language/spacing.md` | Use `p-4` (16px) / `p-5` (20px) |
| 6 | Minor | Headings | No `<h1>` / page title (uses `<h2>`) | `reference/media-types/web-product/accessibility.md` | Promote to a single logical H1 |

## Out of scope (this depth)

- Action label "Go" vs task-oriented copy ("Sign in"), and overall UX fit — **not scored** at `brand_compliance`. Flagged here as a note; would be assessed at `product_ux`/`full` with a user story.

## Self-score (rubric)

| Checklist area | Result |
|----------------|--------|
| Brand-common (colours/type/spacing/radius/logo) | ✅ all relevant items evaluated & cited |
| Accessibility-common (H1, contrast, labels) | ✅ evaluated & cited |
| Product patterns | ✅ tokens/inline-styles assessed |
| Product/UX fit | ✅ correctly **blocked/out-of-scope** at this depth (not invented) |
| Cited reference per finding + severity | ✅ |

**Verdict: PASS.** Correctly held UX-fit out of scope at `brand_compliance` and did not invent a user story.
