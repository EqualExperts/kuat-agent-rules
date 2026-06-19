# Phase H — Optimise & Test (hardening · **gates `stable`**)

**Repo / Claude Code project:** `kuat-agent-rules` (reference + skills + evals)
**Branch:** `feature/phase-h-optimise-and-test`
**Sequencing (Ed):** before Phase 5 `stable`, alongside Phase 7. `beta` may run for feedback, but nothing promotes to `stable` until this lands.

> Make the system **robust and well-tested across scenarios** before consultants depend on it. Scope (Ed): **(a) expand eval coverage, (b) harden the activity skills, (c) optimise the reference files.** A broad CI harness was *not* selected — the targeted drift checks (token→artifact, registry vs kuat-mono) ride with the Phase-7 `generate-tokens` and `add-kuat-component` skills, so this phase doesn't build a separate CI workstream.

> **Scope = a defined first pass, not completeness (Ed).** H establishes the **baseline** that makes `stable` safe; **a/b/c then continue as ongoing improvement** after H — and beyond `stable` — owned via the Phase-5 contribution model. So H clears a promotion *bar*, it doesn't have to exhaust every scenario or refactor every legacy file.
>
> **Promotion bar (H exit):** (a) the eval set covers the **core scenarios per skill + the negative/authenticity briefs**, all green — a working regression net, not every edge case; (b) skills have **no known-broken** intake/fallback/conflict behaviour (the failures the baseline evals surface are fixed); (c) reference passes the **passive test + link-check + token-drift** gates, and the 61 legacy items are **triaged** (cleared where cheap, the rest tracked as ongoing backlog). Everything past this bar is continuous, post-H work.

> Run in plan mode first. Preserve the invariants already established: the **passive test** (reference states what's true, not how-to), **progressive disclosure** (skills link, never inline reference), **use-never-recreate** + **plausibility ≠ compliance**, and the **token SoT**.

---

## (a) Expand eval coverage — the core "well-tested" ask

Build the eval set out from the current handful (`docs/migration/evals/`) into a real regression net that doubles as the release gate.

- **Breadth per skill** — multiple briefs covering the real scenarios:
  - `create-presentation` / `review-presentation`: sales, knowledge-sharing, case study, reporting × delivery modes (live vs left-behind/forwarded).
  - `create-web-app` / `review-web-app`: form, dashboard, auth, table, settings; brand / product-ux / full review depths.
  - `create-imagery`: icon, infographic, illustration, photography brief.
- **Edge cases (where skills break)** — missing component/asset (graceful fallback + flag), ambiguous intake (asks, doesn't guess), conflicting request vs rule (flags, recommends compliant), varied input sources (Figma / requirements-MCP / brief / greenfield), text-only source (visual gate flagged).
- **Negative/authenticity briefs** — recreated logo, off-brand colour, non-master deck → must **FAIL** review (carry forward E4).
- **Each brief has a rubric**; record pass/fail + notes in `evals/RESULTS.md`. This set is **re-run on every release** and is the promotion gate.

## (b) Harden the activity skills

Tighten the five skills (+ `_shared`) for consistency and resilience, driven by the eval failures:

- **Intake** — complete and consistent across skills; no silent assumptions; ask once when ambiguous.
- **Fallbacks** — every "asset/component/source missing" path degrades gracefully **and flags** (never fabricates).
- **Conflict/ambiguity** — uniform "flag + recommend compliant option" behaviour; foundation rules win, raised explicitly.
- **Consistency** — shared intake/version-stamp/report-format usage is uniform; trigger descriptions are sharp and non-overlapping.

## (c) Optimise the reference files

Apply the useful parts of the old `.cursor` optimisation plans — **without re-bloating or breaking the passive test**:

- **Anti-pattern cleanup** — replace vague language ("use good judgement", "should generally", "etc.") with specific, checkable criteria.
- **Verifiability** — for high-impact rules, ensure they're stated checkably (clear imperative + how to verify); add ✓/✗ examples where they earn their place.
- **File-size & cognitive load** — keep files focused; split only where it genuinely helps; tighten cross-references (`See: path#anchor`).
- **Known backlog (from Phase 7's `review-reference-change` scan):** ~61 legacy passive-test violations — "Testing Checklist" procedure still in `accessibility.md`, `component-decision-tree.md`, `product-content.md`, photography (Phase 1 missed them). Clear these here (move procedure to skills / drop), using the new `review-reference-change` gate to verify.
- **Guardrail:** no verbs/procedure/role-cards creeping back in; colours stay sourced from the token SoT (use `tokens:check`); every change re-checked against the passive test (reuse Phase-1's grep + link-check + the new reference gate).

---

## Acceptance criteria

- Eval set covers the scenarios + edge cases above (multiple briefs per skill, with rubrics); `RESULTS.md` green; the negative/authenticity briefs FAIL review as required.
- Activity skills pass the expanded evals; fallback/conflict/intake behaviour is consistent and resilient (demonstrated by the edge-case briefs).
- Reference passes the passive test (grep clean) and link-check (0 broken) after optimisation; no file regressions; colours still resolve to the token SoT.
- Plugin payloads rebuilt; `verify-plugins.mjs` green; evals re-run against the **installed** form, not just source.

---

## Report back

Fill `docs/migration/report-phase-h.md`: the eval matrix (briefs × skills, pass/fail), the skill-hardening changes driven by failures, the reference-optimisation diff summary (and confirmation the passive test still holds), and a **release-readiness recommendation for `stable`** (this + Phase 7 are the gates).
