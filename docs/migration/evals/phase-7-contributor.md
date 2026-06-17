# Eval briefs — Phase 7 contributor skills (Run A · kuat-agent-rules)

Contributor skills are **tooling-backed**, so their evals are largely **executable** (run the
script, assert the exit code / output) rather than scored-by-rubric like the consumer activity
skills. Results in [RESULTS-phase-7.md](./RESULTS-phase-7.md).

---

## G — `generate-tokens`

### G1 — Round-trip (regenerate matches)
`npm run tokens:generate` rewrites `reference/design-language/colours.md` from
`colors.tokens.json`; `npm run tokens:check` exits 0. **Pass:** the value-bearing tables (brand
`-500` hex/oklch, semantic aliases) are byte-identical to the prior hand-maintained file (only the
intended GENERATED banner + SoT-blockquote prose differ).

### G2 — Drift is caught
Hand-edit a generated value in `colours.md` (e.g. EE Blue `#1795d4` → `#0066cc`) and run
`npm run tokens:check`. **Pass:** exit 1, naming the first drifting line and telling the contributor
to run `tokens:generate`. Regenerating restores the file exactly.

### G3 — A real token change propagates
Change a value in `colors.tokens.json`, run `tokens:generate`. **Pass:** `colours.md` updates to the
new value and `tokens:check` is green; reverting the token + regenerating restores the baseline.

---

## R — `review-reference-change` (`check-reference.mjs`)

### R1 — Catches planted violations
A file containing a `## Before you create…` heading, `- [ ]` checklist items, and a broken relative
link. **Pass:** the gate fails (exit 1) flagging each — passive-test (heading + each checklist line)
and the broken link, with `file:line`.

### R2 — Catches token drift
With `colours.md` hand-edited out of sync, the gate's token-drift check fails (exit 1). **Pass:** the
drift is reported even when the changed-file set is otherwise clean.

### R3 — Clean change passes; legacy debt not gated
The default (changed-vs-base) scope passes on the current branch. `--all` surfaces the ~60 pre-existing
legacy "Testing Checklist" items as a backlog signal (README + MIGRATION-MAP exempt) — **not** a merge
gate. **Pass:** default green; `--all` reports the backlog without blocking unrelated changes.

---

## D — Distribution guard (`build-plugin.mjs` + `verify-plugins.mjs`)

### D1 — No contributor skill in any payload
`npm run build:plugins && npm run verify:plugins`. **Pass:** ALL CHECKS PASSED, including
`[distribution guard] no contributor skill leaked into any payload (N repo-local skills kept out)`;
`build-plugin.mjs` refuses to package from `.claude/skills/`.

---

## P — `prep-slides-master`

### P1 — Reproduces the slimmed/embedded master
`python3 assets/slides/prep-master.py "<raw 2026 EE master>.pptx"` against the external raw export.
**Pass:** self-check OK; `51.5 MB → 18.9 MB`, `79 → 0` slides, `65` layouts kept, embedded
Lexend(+Light/Medium/SemiBold)/Lora/JetBrains Mono, no Montserrat. (Committed master restored byte-identical via git.)

---

## L — `curate-slide-layouts`

### L1 — Enumerates the layout set
`python3 skills/scripts/inspect-layouts.py`. **Pass:** lists all 65 layouts with index + placeholders;
the four manifest-verified indices resolve (`0 TITLE`, `4 SECTION_HEADER`, `39 TITLE_AND_BODY`,
`40 BLANK`). *Full visual labelling/pruning is a contributor step (no renderer in CI) — not auto-scored.*

---

## A — Authoring skills (`author-reference`, `author-skill`, `add-brand-asset`)

Procedure skills with no standalone script. **Verification = the gates they hand off to:**
`author-reference` → `reference:check` green; `author-skill` (activity) → `build:plugins` +
`verify:plugins` green; `add-brand-asset` → `verify:plugins` asset-manifest check resolves. Exercised
indirectly via G/R/D above; live authoring runs are the regression net for a future phase.
