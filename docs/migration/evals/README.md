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
| create-web-app | 5 (A1–A5) | [create-web-app.md](./create-web-app.md) |
| review-web-app | 3 (B1–B3) | [review-web-app.md](./review-web-app.md) |
| create-imagery | 5 (C1–C5) | [create-imagery.md](./create-imagery.md) |
| create-presentation | 4 (D1–D4) | [create-presentation.md](./create-presentation.md) |
| review-presentation | 5 (E1–E5, + E3-fallback) | [review-presentation.md](./review-presentation.md) |
| cross-skill edge cases | 4 (X1–X4) | [edge-cases.md](./edge-cases.md) |

Generated sample outputs live in [outputs/](./outputs/).

## Later phases

- **Phase 7 (contributor skills, Run A):** [phase-7-contributor.md](./phase-7-contributor.md) → [RESULTS-phase-7.md](./RESULTS-phase-7.md). These are **executed** checks (script + exit code), not rubric-scored.
- **Phase H (optimise & test):** the brief set above was expanded into the regression net + release gate; results in [RESULTS.md](./RESULTS.md) → "Phase H" section. **This full set is re-run on every release** and is the promotion gate. Rigor = Decision-D (durable fixtures; representative live subset scored; tooling-dependent briefs stay pilot). Negatives (C5, E4) must FAIL/be refused.
