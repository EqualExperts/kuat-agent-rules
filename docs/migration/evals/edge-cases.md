# Eval briefs — cross-skill edge cases

Behavioural briefs that exercise the **resilience** behaviour shared across the activity skills — the paths where a skill must *ask, flag, or degrade gracefully* rather than guess or fabricate. Rubric = the relevant skill's **Intake** + **Conflict & ambiguity** sections plus shared [intake](../../../skills/_shared/intake.md). These are pass/fail on **behaviour**, not on a produced artifact.

The text-only / unrenderable-source visual-gate case is covered by **E3-fallback** in [review-presentation.md](./review-presentation.md#brief-e3-fallback--text-only-source-must-not-pass-visual-rows) — not duplicated here.

---

## Brief X1 — Ambiguous intake → ask, don't guess (create-web-app)

> "Make us a page for the new tool."

**Expected behaviour:** the skill runs the **grouped intake once** and does **not** start building. It asks for the missing essentials in a single message — page type/scenario, framework + deliverable (React/Vue/HTML; code/Figma/spec), state scope (happy path vs empty/loading/error), and whether a Kuat package is available — per [`_shared/intake.md`](../../../skills/_shared/intake.md) and Step 1. **Pass criterion:** no fabricated scenario, framework, or scope; one grouped ask, then stop and wait.

---

## Brief X2 — Conflict: request vs rule → flag + recommend compliant (create-web-app / create-presentation)

> (web) "Use `#FF0000` for the primary button — it's our campaign colour this month."
> (slides) "Put the EE logo top-left on every single slide."

**Expected behaviour:** the skill does **not** silently comply. It **flags the conflict** with the brand rule (arbitrary hex vs semantic tokens / approved palette; logo is title+closing, the page-number badge is the persistent cue), **recommends the compliant option**, and notes that if a foundation rule and a medium rule collide the **foundation wins**. It may proceed only after surfacing the conflict (and, if the user insists, records it as a flagged deviation — never an unmarked silent break). **Pass criterion:** the conflict is raised and a compliant alternative offered; the rule is not broken silently. (Maps to each skill's `## Conflict & ambiguity` section.)

---

## Brief X3 — Missing component / asset → graceful fallback + flag (create-web-app)

> Build a multi-step wizard in React using the Kuat `Stepper` component. (No `@equal-experts/kuat-react` package is installed, and no `kuat:stepper` guide resolves.)

**Expected behaviour:** the component guide is **unresolvable**, so the skill falls back to a **documented pattern** (accessible step pattern with semantic tokens) and **explicitly flags the gap** ("`kuat:stepper` guide unavailable — built against the documented pattern; verify against the package when installed"). It **never fabricates** a component API or asserts a Kuat component was used. **Pass criterion:** graceful documented fallback **and** an explicit flagged gap — not a silent invention. (Mirrors the live A1 fallback behaviour, generalised.)

---

## Brief X4 — Varied input sources → intake adapts, gaps flagged (review-web-app / review-presentation)

Run the same review intent across four source shapes and confirm intake adapts and flags what each source can't support:

> a) a **Figma** link · b) a **requirements-MCP** ticket reference · c) a plain prose **brief** · d) **greenfield** (no artifact yet)

**Expected behaviour:** intake records which artifact(s) are present and routes accordingly — (a) Figma frames support visual rows; (b) a requirements reference supplies product context for `product_ux`/`full` but **not** the visual artifact, so visual rows are flagged as needing a render; (c) a prose brief supplies neither a render nor verified research — UX findings are marked **provisional** under Open questions; (d) greenfield has no artifact to review, so the skill says so and redirects to the **create** counterpart rather than inventing a thing to audit. **Pass criterion:** the skill never asserts compliance on rows the source can't evidence, and never invents user stories/research — missing inputs become **flagged gaps / Open questions**.
