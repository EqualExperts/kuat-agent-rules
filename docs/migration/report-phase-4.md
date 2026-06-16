# Execution Report — Phase 4 (Pilot — beta channel)

**Repo:** kuat-agent-rules
**Branch / PR:** `migration/phase-4-pilot` (PR not yet opened)
**Run date:** 2026-06-16
**Status:** ⚠️ complete with caveats — the **in-repo code slice is done & verified**; the **pilot itself is process + runtime + cross-repo** and is handed back to Ed/ops with a checklist (below). By design: the `/kuat-phase` guardrail is work-only-within-this-repo.

## 1. What was done

Phase 4 is "mostly process, not code." Verified against the live tree, the agent-executable, in-repo slice is:

- **Added a visual-verification pass to `review-presentation`** (the plan's "Committed skill improvement" and an Exit criterion). In `skills/review-presentation/SKILL.md`:
  - New **Step 3 — Establish visual fidelity (render the deck):** when the source is a live connector (Google Slides) or a text-only extraction, obtain a **PDF / per-slide PNG render** and run a **vision pass** (photography treatment, logo/badge rendering, colour usage, layout/spacing).
  - **Pixel sampling for exact colours:** sample badge / primary-action pixels from the render and compare the **hex** to the token in `reference/design-language/colours.md` (EE Blue `#0066CC` / `oklch(0.645 0.163 237.5)`) — a real hex check, not eyeballing.
  - **Documented limitation + fallback:** the connector text-only constraint is stated; with no render, the skill **flags the visual rows as gaps and requests a PDF/PNG export — it does not pass them.**
  - **Checklist** renumbered to **Step 4** with **7 ⬚ visual-gate rows** + a new **Badge / action colour** pixel-sample row; **Deliver** → Step 5, tightened to surface an unmet visual gate; intake gained a **Source fidelity** line; **Do not** list gained a "no passing visual checks from text alone" rule.
- **Added eval Brief E3 (+ E3-fallback)** to `docs/migration/evals/review-presentation.md` — a durable rendered-deck fixture (near-miss badge blue, colour hero, recoloured logo) expecting pixel-sampled findings, and a text-only fallback that must flag rather than pass. E1/E2 unchanged.
- **Rebuilt the `kuat-studio` payload** (`npm run build:plugins`) and **re-verified** (`verify-plugins.mjs` = ALL CHECKS PASSED).
- **Confirmed the plan's first Prerequisite was already satisfied** on `main` (commit `0b3ac6e` de-pathed the web-app Step-2 link labels; `verify-plugins.mjs` already accepts the label transform). No rework.
- Logged decisions + deviations in `docs/migration/LOG.md` (Phase 4 section).

**Not done here (by design — handed back):** the actual pilot — interactive local validation, marketplace stand-up, clean-account install, live component read, consultant selection/feedback, rating-based exit criteria. See §5 checklist.

## 2. Acceptance criteria

Phase-4 exit criteria are mostly **pilot outcomes** (runtime/process). The one **in-repo** criterion is the `review-presentation` visual verification:

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `review-presentation` visual verification shipped: renders slides for the visual pass, pixel-samples colours where it matters, documents the connector limitation, eval brief passes | ✅ (source + payload) / ⚠️ (eval *run* = pilot) | `SKILL.md` Step 3 + ⬚ Step-4 gate + Step-5 surfacing; Brief E3 authored; `verify-plugins.mjs` ALL CHECKS PASSED. *Running & scoring E3 needs a rendered deck + live session → pilot step.* |
| Link-text prerequisite fixed before consultants run the skills | ✅ | Already merged on `main` (`0b3ac6e`); payload labels de-pathed; baseline verify green |
| Pilot "would-use-again" ≥ agreed bar (e.g. median ≥ 4/5) | ⛔ pilot | Runtime/process — handed to Ed/ops (§5) |
| Top-severity reference/skill/triggering issues fixed & re-validated | ⛔ pilot | Depends on feedback that doesn't exist yet |
| ≥1 real deliverable per priority activity end-to-end on `beta` | ⛔ pilot | Runtime/cross-repo |
| Release mechanics (bump → beta → pilots receive) proven ≥ twice | ⛔ pilot | Needs the live marketplace |
| Clean-account install + `kuat-build` live component read (Phase-3 live acceptance) | ⛔ pilot | Needs publish/install + kuat-mono (separate repo) |

## 3. Deviations from the plan

- **Prerequisite already done.** The plan lists "fix the web-app Step-2 link text" as a to-do; it was already merged (`0b3ac6e`). Recorded as a finding, not redone.
- **Eval brief authored, not run.** The plan says "its eval brief passes." E3 is authored as a durable fixture; *running & scoring* it needs a rendered deck + a live agent session — the same runtime bucket as the rest of the pilot. The brief is in place; the live run is a pilot step.
- **Scope boundary made explicit.** The plan reads as one phase; in practice ~90% of it (Step 0 local validation, marketplace, install, live read, cohorts, feedback, ratings) is runtime + cross-repo + human/ops and cannot run inside this repo. This run did the in-repo code slice and packaged the rest as a hand-off checklist.

## 4. Decisions made (with rationale)

Mirrors `docs/migration/LOG.md` (Phase 4):

- **A — Scope = in-repo code slice only.** The pilot is runtime + cross-repo + human/ops; the guardrail is work-only-within-this-repo. Executed: visual verification + eval + rebuild/verify + this report. Everything else → §5 checklist.
- **B — Prerequisite already satisfied** (`0b3ac6e`); verify-only, no rework.
- **C — "Implement visual verification" = author the skill procedure (markdown), not a rendering/diff pipeline.** Skills instruct the agent; the vision pass + pixel sampling are procedures the agent runs with its own vision + the hex tokens in `colours.md`. No separate script.
- **D — Eval brief authored, not run here** (durable fixture; live run = pilot step).
- **E — `kuat-studio` version bump left to the release/promotion step** (source edit + rebuild verify fine without it). `review-web-app` visual generalisation = follow-up.

## 5. Open decisions for Ed — **Pilot-readiness checklist (handed to Ed / ops)**

The in-repo work is ready; the pilot now needs the runtime/cross-repo steps the repo can't do. In rough order:

1. **Local validation first (Step 0, no marketplace).** Run `docs/migration/local-validation-runbook.md` — Track A (`kuat-studio`, neutral folder) and Track B (`kuat-build` against kuat-mono with `@equal-experts/*` linked). **Run E3 + E3-fallback here** against a real rendered deck to close the one ⚠️ acceptance row. Any failure = a Phase-3 fix, not pilot feedback.
2. **Stand up the marketplace.** Confirm real coords (default `EqualExperts/kuat-marketplace`), move `marketplace/` there, create the `stable` tag + `beta` branch in `kuat-agent-rules`, provision the private-repo auth token. *(Phase-3 open decision, still open.)*
3. **Pre-register pilot cohorts on `beta`** via managed settings (`marketplace/managed-settings/pilot-beta.json`): engineering → `kuat-build-beta` (the live-component test); a broad consultant slice → `kuat-studio-beta`. Confirm zero-setup install.
4. **Quickstart + feedback channel.** One-pager (which skills, how to invoke, how to file feedback) + the structured feedback table from the plan (skill, scenario, outcome, triggering, reference gaps, component gaps, rating).
5. **Iterate weekly** on short-lived branches; cut ≥2 `beta` releases (rehearses Phase-5 release mechanics); keep the eval set green + run the new visual eval each release.
6. **Version bump for the first beta release** — bump `kuat-studio` `plugin.json` (this run intentionally left it; see decision E).

## 6. Verification results

`node skills/scripts/verify-plugins.mjs` → **ALL CHECKS PASSED** (baseline was already green before edits):

- **kuat-studio:** 0 residual escape links (8 skill md); **45** `${CLAUDE_PLUGIN_ROOT}` links resolve (was 44 — the new `colours.md` link); reference snapshot 88 files, 0 broken / 0 `kuat-docs`; 3 skills byte-identical to source modulo link rewrite.
- **kuat-build:** unchanged — 42 links resolve, 2 skills equivalent.
- **Marketplace:** 4 entries, none set `version`; managed-settings JSON valid.
- **Built payload spot-check:** `plugins/kuat-studio/skills/review-presentation/SKILL.md` carries the Step-3 visual pass; `colours.md` link label de-pathed, target rewritten to `${CLAUDE_PLUGIN_ROOT}/reference/design-language/colours.md`.
- **Source dev path intact:** `skills/review-presentation/SKILL.md` keeps relative `../../reference/...` links.
- **Eval:** Brief E3 + E3-fallback present; E1/E2 untouched. *(Live run deferred to the pilot — see §2/§5.)*

## 7. Follow-ups / backlog

- **`review-web-app` visual verification** — generalise the render-vs-text gate to reviewing a live URL/DOM vs rendered screenshots. Logged this phase; schedule into a later reference/skill pass.
- **Run E3 live** in Step-0 local validation and record in `docs/migration/evals/RESULTS-phase-4.md` (or extend `RESULTS.md`).
- **CI:** optionally move `build-plugin.mjs` + `verify-plugins.mjs` onto the release ref (Phase-3 backlog item, still open).
- **Phase 5:** removes legacy `kuat-create`/`kuat-review` + the runtime-resolution machinery kept by Phase-3 decision E.

## 8. Inputs to the next phase (Phase 5 — rollout & governance / promotion to `stable`)

This report is the **promotion decision** input. For go/no-go to `stable`:

**Go/no-go scaffold (fill from pilot data):**

| Gate | Threshold | Result |
|------|-----------|--------|
| Would-use-again | median ≥ 4/5 | _pilot_ |
| Top-severity skill/reference/triggering issues | all fixed & re-validated | _pilot_ |
| ≥1 real deliverable per priority activity on `beta` | web + slides (+ imagery if covered) | _pilot_ |
| Release mechanics proven | ≥ 2 beta cuts received by pilots | _pilot_ |
| Phase-3 live acceptance | clean-account install ✓ + `kuat-build` live read ✓ | _Step-0 / pilot_ |
| `review-presentation` visual eval (E3) | passes on a real rendered deck | _Step-0_ |

**Carried artifacts:** updated `skills/review-presentation/SKILL.md` (visual gate); Brief E3 fixture; `plugins/kuat-studio/` payload (45 links); `verify-plugins.mjs` regression gate; `local-validation-runbook.md`. **Phase-5 also owns** legacy-skill removal + the `kuat-studio` `plugin.json` version bump policy for stable promotion.
