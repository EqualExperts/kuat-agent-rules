# Execution Report — Phase H (Optimise & Test)

> The last gate before `stable`. A first hardening pass to the promotion bar: (a) expand evals, (b) harden the activity skills, (c) optimise reference + clear the 61 legacy passive-test violations.

---

**Repo:** kuat-agent-rules
**Branch / PR:** `feature/phase-h-optimise-and-test` (PR pending)
**Run date:** 2026-06-19
**Status:** ✅ complete

## 1. What was done

**(a) Eval coverage — expanded into the regression net + release gate.** +11 briefs across the five activity skills plus a new cross-skill edge-case file:
- `create-web-app`: **A4** settings page, **A5** data table/list view (now A1–A5 = form/auth/dashboard/settings/table).
- `review-web-app`: **B3** `product_ux` depth (the middle tier of the depth ladder).
- `create-imagery`: **C4** illustration (the missing job), **C5** negative — "recreate the logo" must be refused.
- `create-presentation`: **D4** reporting deck × left-behind/forwarded delivery (the missing scenario + density tier).
- `review-presentation`: **E5** case-study review against a genuine-master deck (scenario parity).
- New **`edge-cases.md`**: **X1** ambiguous intake, **X2** conflict vs rule, **X3** missing component/asset, **X4** varied input sources.
- Live-scored this phase (Decision-D): A5, B3, C5, X1–X4 → **7/7 PASS** (outputs in `evals/outputs/`). `RESULTS.md` + `README.md` updated with the full matrix and the "re-run on every release" gate.

**(b) Activity-skill hardening — failure-driven, minimal.** The skills were already consistent (uniform `_shared/intake` + `version-stamp`; review skills use `review-common` + `report-formats`). The one gap the edge-case briefs surfaced — `review-web-app` had no explicit conflict section — was fixed: added `## Conflict & ambiguity` (flag + recommend compliant; foundation wins; flag unresolvable component/asset).

**(c) Reference optimisation — the 61 legacy violations fully cleared.** Removed all five `- [ ]` "Testing Checklist"/checklist blocks:
- `web-product/accessibility.md`, `web-product/content/product-content.md` — removed (WHAT already stated in-file + carried by `review-common` / review-web-app Step 3).
- `web-product/component-decision-tree.md` — removed with a one-line **downstream-ownership** pointer (component test strategy is local-repo/`kuat-mono`-owned per the ownership split).
- `imagery/.../photography/diversity-inclusion.md` + `style-and-sources.md` — converted to **passive declarative prose** (kept the unique central-consent fact + cross-section framing).
- Plugin payloads rebuilt; reference snapshots regenerated.

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| Eval net covers core scenarios + negatives, with rubrics, in `RESULTS.md` | ✅ | 26-row matrix; A1–A5/B1–B3/C1–C5/D1–D4/E1–E5+fallback/X1–X4; negatives C5 (refused) + E4 (FAILs) |
| Negatives FAIL review / are refused | ✅ | C5 create-side refusal (new); E4 review-side FAIL (carried); off-brand colour E3/E4; non-master E4 |
| Skills: baseline evals pass; intake/fallback/conflict consistent | ✅ | X1–X4 + C5 = 7/7 PASS; review-web-app conflict section added for uniformity |
| Reference passive test (grep) clean + link-check 0 broken after optimisation | ✅ | `check-reference.mjs --all`: **0** violations (was 61); 322 links resolve, 0 broken |
| Colours still resolve to the token SoT | ✅ | `tokens:check` ok — `colours.md` matches SoT (no hand-edits) |
| Plugin payloads rebuilt; `verify-plugins` green | ✅ | `ALL CHECKS PASSED`; snapshots 89 files / 0 broken; skills identical-to-source-modulo-link-rewrite |
| Evals re-run against the **installed** form | ✅ (by equivalence + spot-check) | verify-plugins proves source≡installed for skills+reference; Phase-H deltas confirmed in built payloads |
| 61 legacy items triaged | ✅ (exceeded — all cleared) | Decision B: cleared all 61, not just the floor |

## 3. Deviations from the plan

- **Legacy-61: cleared all, not just "triaged."** The plan's floor was "triaged, not necessarily all cleared." With Ed's up-front go, all 61 were removed (they were duplicates of WHAT already stated in-file or carried by the skills), getting `--all` fully green — the strongest `stable` signal. No backlog carried for this item.
- **Reference links must stay inside `reference/`.** A first pass linked `component-decision-tree.md → ../../../AGENTS.md`; it resolved in source but **broke in the plugin snapshot** (which ships only `reference/`). `verify-plugins` caught it; reworded to linkless prose. Recorded as a standing reference convention.
- **(b) lighter than the plan's checklist implies.** Only one real consistency fix was warranted (review-web-app conflict section); the rest of the intake/fallback/trigger consistency was already in place, so no speculative refactor was made (honours "first pass, not completeness").

## 4. Decisions made (with rationale)

- **A — Eval rigor = Decision-D model.** Durable fixtures for all; live-score the in-session-executable subset (creates, planted-flaw reviews, behavioural edge cases); D3/E3 stay fixture+pilot (need a renderer/python-pptx) with prior evidence carried — never faked. Installed-form covered via verify-plugins equivalence + a built-payload spot-check.
- **B — Legacy-61 = clear all** (see Deviations). `component-decision-tree.md`'s component-testing checklist dropped as **downstream-owned**, not relocated into a consumer skill.
- **C — Branch `feature/phase-h-optimise-and-test`** (plan literal; matches Phase 7 / 4S practice over the generic template).
- **D — (b) failure-driven + minimal** — fix only what evals surface + confirmed nits.

## 5. Open decisions for Ed

- **`stable` promotion timing.** Phase H + Phase 7 are the two gates and both are now done (H here; 7 merged via #8). **Recommendation: GO for `stable`** (see §6). The only call left is *when* to cut the release and bump `plugin.json` version on the stable channel.
- **No blocking open decisions.** The pilot items below (§7) are post-`stable` continuous work, not gates.

## 6. Verification results

```
check-reference.mjs --all   → ALL REFERENCE CHECKS PASSED  (passive 0/88, links 322 ok / 0 broken, structure ok, token drift ok)   [was 61 violations]
reference:check (gate)      → ALL REFERENCE CHECKS PASSED  (5 changed files clean)
tokens:check                → ok — colours.md matches the token SoT
build:plugins               → kuat-build (2 skills) + kuat-studio (3 skills, asset master 18.9MB) rebuilt
verify:plugins              → ALL CHECKS PASSED  (snapshots 89 files / 0 broken; skills identical-to-source-modulo-link-rewrite; no contributor-skill leak; marketplace ok)
Eval live subset (H)        → 7/7 PASS  (A5, B3, C5, X1, X2, X3, X4)
Negatives                   → C5 refused (create) ✓ · E4 FAILs (review) ✓
```

**Release-readiness recommendation: ✅ GO for `stable`.** The regression net covers the core scenarios per skill + all negatives and is green; the skills have no known-broken intake/fallback/conflict behaviour; reference passes passive-test + link-check + token-drift with the legacy debt fully retired; the installed plugin form is verified equivalent to source. Both `stable` gates (H + 7) are cleared.

## 7. Follow-ups / backlog (ongoing a/b/c, post-`stable`)

- **Pilot eval runs (a):** D3 build-from-master and E3 rendered-deck vision pass need a renderer / python-pptx run in a tooling-equipped environment to convert their fixture+pilot status to live-scored. Same bucket as the Phase-4 visual pilot.
- **Eval breadth (a):** additional edge cases beyond X1–X4 (e.g. requirements-MCP live wiring, more web scenarios) accrue continuously via the Phase-5 contribution model.
- **Reference verifiability (c):** the anti-pattern (vague→checkable) sweep was applied where it earned its place; a broader pass over lower-impact rules remains ongoing — gated by `review-reference-change`.
- **Standing convention recorded:** reference files may only relative-link within `reference/` (the plugin snapshot ships `reference/` alone). Consider adding this as an explicit `verify-plugins`-style assertion on source if it recurs.

## 8. Inputs to the next phase (Phase 5 — rollout & governance)

- **Both `stable` gates are GO.** Phase 5 can promote `beta → stable` and pin the version on the stable channel (bump `plugin.json` only, per the distribution model).
- **The eval set is the release gate.** `docs/migration/evals/` (26-brief matrix + rubrics) is re-run on every release; `RESULTS.md` is the record. Negatives C5/E4 must stay FAIL/refused.
- **Ongoing a/b/c** is owned via the Phase-5 contribution model (contributor skills: `author-reference` + `review-reference-change`, `author-skill`, `generate-tokens`).
- Legacy `kuat-create` / `kuat-review` remain in place (untouched) — retire in Phase 5 per the standing guardrail.
