# Phase-2 skill eval set

Fixed test briefs per activity skill, plus a scoring rubric. This is both the **Phase-2 verification** and the **regression net** for later reference/plugin releases.

## How to run

1. Invoke the skill under test with the brief as the user request.
2. Follow the skill exactly (intake → load reference slices → produce/review).
3. Score the output against the skill's own **checklist** (the rubric). Each checklist item = Pass / Partial / Fail / N/A.
4. Record the run in [RESULTS.md](./RESULTS.md) with the date, reference ref, and per-item scores.

A brief **passes** when every applicable checklist item is Pass (Partial allowed only with a noted reason).

## Coverage this phase (decision D — representative live + fixtures)

All briefs below are authored as durable fixtures. **Live-run & scored this phase:** `create-web-app` (all briefs, as the reference template) + **one** brief per other skill. The remaining briefs are the regression net for future runs.

| Skill | Briefs | File |
|-------|--------|------|
| create-web-app | 3 | [create-web-app.md](./create-web-app.md) |
| review-web-app | 2 | [review-web-app.md](./review-web-app.md) |
| create-imagery | 3 | [create-imagery.md](./create-imagery.md) |
| create-presentation | 2 | [create-presentation.md](./create-presentation.md) |
| review-presentation | 2 | [review-presentation.md](./review-presentation.md) |

Generated sample outputs live in [outputs/](./outputs/).

## Later phases

- **Phase 7 (contributor skills, Run A):** [phase-7-contributor.md](./phase-7-contributor.md) → [RESULTS-phase-7.md](./RESULTS-phase-7.md). These are **executed** checks (script + exit code), not rubric-scored.
