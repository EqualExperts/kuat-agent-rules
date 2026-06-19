# Phase H — Execution Prompt (optimise & test)

**Repo / Claude Code project:** `kuat-agent-rules`
**Branch:** `feature/phase-h-optimise-and-test`
**Detailed plan:** `docs/migration/phase-h-optimise-and-test.md` (read first).

> **Intention.** A **first hardening pass** that makes `stable` safe — not a boil-the-ocean. Clear the **promotion bar** below; a/b/c then continue as ongoing improvement after H (Ed), owned via the Phase-5 contribution model. This is the **last gate before `stable`** (with Phase 7, now done).

## Run conventions

- **Plan mode first** — read the detailed plan, propose a breakdown, present for approval; no edits until approved.
- Branch `feature/phase-h-optimise-and-test`; dated `docs/migration/LOG.md`; end with `docs/migration/report-phase-h.md` + a **release-readiness recommendation for `stable`**.
- Base off current `main`. Use the Phase-7 tooling: the eval set, `check-reference.mjs`, `tokens:check`, `verify-plugins.mjs`.
- **Invariants (don't break):** passive test (reference = what's true, not how-to), progressive disclosure (skills link, never inline), use-never-recreate + plausibility ≠ compliance, the token SoT (colours come from tokens, never hand-edited).

## Deliverables (to the promotion bar)

**(a) Expand eval coverage — the regression net.** Multiple briefs per skill covering the *core* scenarios + the negative/authenticity briefs, each with a rubric, recorded in `evals/RESULTS.md`:
- presentation create/review: sales / knowledge-share / case-study / reporting × delivery mode (live vs left-behind).
- web create/review: form / dashboard / auth / table × review depth (brand / product-ux / full).
- imagery: icon / infographic / illustration / photography brief.
- edge cases: missing asset/component (graceful fallback + flag), ambiguous intake (asks), conflicting request vs rule (flags + recommends compliant), text-only source (visual gate flagged), varied input sources.
- negatives that must **FAIL** review: recreated logo, off-brand colour, non-master deck.
- *Bar:* core scenarios + all negatives green. Exhaustive edge-case coverage is ongoing, post-H.

**(b) Harden the activity skills.** Fix what the baseline evals surface: intake completeness, graceful-fallback (never fabricate), uniform conflict/ambiguity handling, consistent use of `_shared` (intake / report-formats / version-stamp), sharp non-overlapping triggers.
- *Bar:* no known-broken behaviour on the baseline evals.

**(c) Optimise the reference files.** Anti-pattern cleanup (vague → checkable), verifiability on high-impact rules, file-size/cross-reference discipline — without re-bloating or breaking the passive test. **Triage the 61 legacy "Testing Checklist" items** (`accessibility.md`, `component-decision-tree.md`, `product-content.md`, photography): clear the cheap ones, track the rest as ongoing backlog via `review-reference-change --all`.
- *Bar:* passive test + link-check + `tokens:check` all green; legacy items triaged (not necessarily all cleared).

## Acceptance (the promotion bar)

- Eval net: core scenarios + negatives green in `RESULTS.md`; re-run against the **installed** plugin form, not just source.
- Skills: baseline evals pass; fallback/conflict/intake demonstrably consistent.
- Reference: passive-test grep clean, link-check 0 broken, `tokens:check` ok; 61 legacy items triaged.
- Plugin payloads rebuilt; `verify-plugins.mjs` green.
- **Report carries a clear `stable` go/no-go**, and lists what's deferred to ongoing a/b/c work.

## Report back

Fill `docs/migration/report-phase-h.md`: the eval matrix (briefs × skills, pass/fail), the skill-hardening changes, the reference-optimisation summary (+ passive test still holds + legacy triage outcome), and the **release-readiness recommendation for `stable`** with the ongoing-work backlog.
