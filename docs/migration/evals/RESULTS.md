# Phase-2 eval results

Reference ref: local working copy on `migration/phase-2-activity-skills`. Scoring per [README.md](./README.md). Decision D: representative live + fixtures — one live brief per skill (plus the mandated create-web-app run), remaining briefs are the regression net.

| Skill | Brief | Run | Verdict | Output |
|-------|-------|-----|---------|--------|
| create-web-app | A1 — sign-in (no Kuat pkg) | live | ✅ PASS | [outputs/create-web-app-A1.md](./outputs/create-web-app-A1.md) |
| create-web-app | A2 — dashboard sidebar | fixture | regression net | — |
| create-web-app | A3 — docs empty/loading | fixture | regression net | — |
| review-web-app | B1 — flawed sign-in, brand_compliance | live | ✅ PASS | [outputs/review-web-app-B1.md](./outputs/review-web-app-B1.md) |
| review-web-app | B2 — full-depth dashboard | fixture | regression net | — |
| create-imagery | C1 — icon set | live | ✅ PASS | [outputs/create-imagery-C1.md](./outputs/create-imagery-C1.md) |
| create-imagery | C2 — infographic (refs required) | fixture | regression net | — |
| create-imagery | C3 — photography selection | fixture | regression net | — |
| create-presentation | D1 — knowledge-sharing talk | live | ✅ PASS | [outputs/create-presentation-D1.md](./outputs/create-presentation-D1.md) |
| create-presentation | D2 — sales case-study cover | fixture | regression net | — |
| review-presentation | E1 — flawed sales deck | live | ✅ PASS | [outputs/review-presentation-E1.md](./outputs/review-presentation-E1.md) |
| review-presentation | E2 — read-ahead density | fixture | regression net | — |

**Live total: 5/5 PASS.**

## Notes

- **create-web-app A1:** PASS. Graceful fallback exercised (`shadcn:button` guide unresolvable → documented pattern + flagged gap). Auth-specific validate-on-submit rule correctly took precedence over the more permissive `content/forms.md` guidance.
- **review-web-app B1:** PASS. All planted brand/a11y defects caught and cited; UX-fit correctly held **out of scope** at `brand_compliance` (no invented user story).
- **create-imagery C1:** PASS. 3 icons consistent at 24×24 / 2px stroke; single-colour via `currentColor`; accessible labels. (C2 fixture asserts the "missing references → ask and stop" behaviour.)
- **create-presentation D1:** PASS. Knowledge-sharing/live conventions met; titles carry arguments; badge/logo placement correct.
- **review-presentation E1:** PASS. All seven planted deck defects detected and cited to `reference/media-types/slides/...`.
