# Output — review-web-app · Brief B3 (product-UX depth)

**Skill run:** review-web-app · **Depth:** `product_ux` · **Reference ref:** local working copy on `feature/phase-h-optimise-and-test` · **Date:** 2026-06-19

## Intake (Step 1)

- Depth: **`product_ux`** (chosen by user).
- Review context supplied: user story (new admin → working project in <5 min); research (support tickets show abandonment at "invite team"); scope = onboarding wizard.
- Artifact is **visually on-brand** — no planted brand defects. So `brand_compliance` rows are confirmed clean and the review centres on **task fit / copy / flows / states**.
- `full`-tier scenario/pattern rules: **out of scope** at this depth (noted).

## Findings (product / UX fit — tied to the stated job)

| # | Severity | Finding | Evidence / job link | Reference |
|---|----------|---------|---------------------|-----------|
| 1 | Major | "Invite team" step is **mandatory** and blocks completion | Research shows abandonment here; the job ("working project in <5 min") doesn't require teammates on day one | `reference/media-types/web-product/patterns/forms.md` |
| 2 | Major | No **skip / do-this-later** affordance on the invite step | Forces a non-essential task into the critical path | `reference/media-types/web-product/content/actions.md` |
| 3 | Minor | Step copy is feature-led ("Configure your organisation") not task-led | Doesn't tell the admin what success looks like | `reference/media-types/web-product/content/product-content.md` |
| 4 | Minor | No **empty/in-progress** state guidance after finish (where did my project go?) | Success criterion is "reaching a working project"; the hand-off isn't shown | `reference/media-types/web-product/content/empty-states.md` |

## Out of scope (this depth)

- **Brand-compliance rows:** confirmed clean (tokens/logo/spacing correct) — not re-litigated.
- **`full`-tier** scenario/pattern conformance and research design: not assessed at `product_ux`.

## Self-score (rubric = Step 3 checklist + intake)

| Area | Result |
|------|--------|
| Depth tier exercised distinctly | ✅ findings are task/copy/flow/state — **not** brand nitpicks (those are clean) |
| Findings tie to the stated job-to-be-done | ✅ each maps to "<5 min to a working project" / the abandonment evidence |
| No invented user stories / research | ✅ used only the supplied story + ticket evidence |
| `full`-only rules held out of scope | ✅ noted, not assessed |
| Cited `reference/...` per finding + severity | ✅ |

**Verdict: PASS.** `product_ux` produces a materially different finding set from B1's `brand_compliance` — the depth ladder works.
