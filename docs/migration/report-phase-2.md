# Execution Report — Phase 2 (Activity Skills)

**Repo:** kuat-agent-rules
**Branch / PR:** `migration/phase-2-activity-skills` (PR not yet opened)
**Run date:** 2026-06-15
**Status:** ✅ complete

## 1. What was done

- Built **five progressive-disclosure activity skills** under `skills/`, each with a sharp trigger `description`, its own intake, explicit `../../reference/...` load pointers, a pass/fail checklist, conflict rules, and a version stamp. No skill inlines reference content or relies on the retired `LOADING.md`.
- Added **`skills/_shared/`**: `report-formats.md` (`git mv` from `kuat-review/references/` — history preserved), plus new `intake.md`, `review-common.md`, `version-stamp.md`, `README.md`.
- **`create-web-app` built first** as the reference template and live-validated against an eval brief before the pattern was cloned to the other four.
- **Rewired the legacy machinery** off `kuat-docs/rules` + `LOADING.md` onto `reference/` (decision B): `kuat-create`, `kuat-review`, `shared/resolve-rules.md`, `shared/consumption-contract.md`, `scripts/ensure-rules.sh`, `scripts/bundle-skills.mjs`. Legacy skills are **rewired, not deleted** (kept until Phase 5).
- **Removed the redirect tombstones** `kuat-docs/rules/{LOADING,README}.md` and the now-empty `kuat-docs/rules/` directory.
- **Consumed and removed `_to-skills/` entirely** (15 files) — every item folded into a skill or dropped with a rationale; `technical.md` dropped per decision E.
- Built an **eval set** at `docs/migration/evals/` (briefs + rubrics + `RESULTS.md` + sample outputs); ran one live brief per skill (plus the mandated create-web-app run) = **5/5 PASS**.
- Refreshed the central orientation docs (`AGENTS.md`, `skills/AGENTS.md`, `skills/README.md`, `skills/scripts/README.md`, `reference/README.md`, `reference/MIGRATION-MAP.md`) and swept the skill-pack install docs (`skills/INSTALL.md`, `skills/install/{claude-projects,figma-make}.md`).

### Final skill list + trigger descriptions

| Skill | Create/Review | Trigger description (frontmatter) |
|-------|---------------|-----------------------------------|
| `create-web-app` | create | "Build or modify Equal Experts web application UI — forms, dashboards, app screens, navigation, settings, tables, product flows…" |
| `review-web-app` | review | "Review Equal Experts web application UI for brand, accessibility, and product-UX compliance — audit a form, dashboard, app screen, or product flow…" |
| `create-imagery` | create (+ light review) | "Create or select Equal Experts visual assets — icons, infographics, illustrations, diagrams, and photography selection/briefs… Includes a light pre-publish quality/accessibility check." |
| `create-presentation` | create | "Create Equal Experts branded slide decks and presentations — pitch decks, knowledge-sharing talks, case studies, reports…" |
| `review-presentation` | review | "Review an Equal Experts slide deck or presentation for brand and content compliance — audit slides (deck file, PDF export, screenshots, or Figma)…" |

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| Five skills present; tested trigger descriptions; self-contained procedure | ✅ | `skills/{create-web-app,review-web-app,create-imagery,create-presentation,review-presentation}/SKILL.md` |
| No skill inlines reference / relies on retired `LOADING.md` | ✅ | grep over the 5 skills + `_shared`: no `LOADING.md` / `kuat-docs/rules`; 4–14 `reference/` links each |
| `create-web-app` resolves `kuat-mono` component docs + graceful fallback | ✅ | Skill Step 3 documents the read path; eval A1 exercises the fallback (flagged the missing `shadcn:button` guide) |
| `_to-skills/` empty | ✅ | directory removed entirely (decision E) |
| Eval set passes (on-brand output meeting checklist) | ✅ | `evals/RESULTS.md` — 5/5 live briefs PASS |
| Legacy `kuat-create`/`kuat-review` still function | ✅ | rewired onto `reference/`; `ensure-rules.sh` → `RULES_DIR=…/reference`; `bundle-skills.mjs` regenerates `dist/` clean; all referenced paths resolve (link-check) |

## 3. Deviations from the plan

- **Scope expanded to the legacy machinery + tombstones (decision B).** The `phase-2-activity-skills.md` plan scoped Phase 2 to new skills only; the Phase-1 report's follow-up and the tombstones' own text ("removed in Phase 2") assigned the rewire here. Ed chose the broader scope.
- **`technical.md` dropped now (decision E)** rather than left staged until the kuat-mono PR lands. This lets `_to-skills/` empty fully; content is recoverable from git (`_to-skills/web-product/technical.md` @ `f0338ff`).
- **Doc sweep partially in-scope.** The plan only named `AGENTS.md`/`.cursorrules`. Removing the tombstones broke links/prose in the skill-pack install docs, so I also swept `skills/INSTALL.md` + `skills/install/*` (now clean). **`kuat-docs/setup/*` and `kuat-docs/README.md` remain deferred** (see §5/§7) — a mechanical sweep is unsafe because the old `foundations/` split into four dirs.
- **Imagery kept merged** (decision C): one `create-imagery` with a light-review gate; no separate `review-imagery`. 5 skills, as the plan table specified.

## 4. Decisions made (with rationale)

Mirrors `docs/migration/LOG.md` (Phase 2):

- **A — `skills/_shared/`** for new shared assets; legacy `skills/shared/` rewired in place (not renamed). The `_` prefix signals "not a skill."
- **B — Rewire legacy + delete tombstones.** Keeps the system coherent on one rules root (`reference/`); honours "don't delete legacy skills until Phase 5" (rewired, not deleted).
- **C — Imagery merged.** Matches the plan's 5-skill table; both create role cards + photography quality-validation fold into `create-imagery`.
- **D — Representative live + fixtures.** All briefs/rubrics authored; one live graded run per skill + the mandated create-web-app run.
- **E — Drop `technical.md` now.** Git history is the recovery path; recorded for the kuat-mono PR.
- **F — `examples/` unchanged.** Still flagged for a later kuat-mono review.

## 5. Open decisions for Ed

- **Deferred doc-sweep — confirm the boundary.** I swept the skill-pack install docs but left `kuat-docs/setup/*` (consumption-architecture, integration, ownership-matrix, verification, kuat-mono-implementation-plan) and `kuat-docs/README.md` citing old `kuat-docs/rules/…` paths. **Default: do this as a small standalone follow-up PR** using `MIGRATION-MAP.md` (mind the `foundations/` → 4-dir split). Flag if you'd rather it be in this PR.
- **`technical.md` → kuat-mono.** Confirm the downstream owner ports it from git `f0338ff` into `agent-docs/setup/` (merging with `kuat-core-integration.md` / `consumer-setup.md`). It is no longer in this repo.
- **Bundling the new skills.** The 5 activity skills are filesystem-native (multi-file, link to `reference/`); only the legacy 2 are bundled to `dist/`. Bundling/packaging the new skills is **Phase 3 (plugin packaging)** — confirm that's where it belongs.

## 6. Verification results

- **Resolver:** `skills/scripts/ensure-rules.sh` → `RULES_ROOT=…/kuat-agent-rules`, `RULES_DIR=…/reference`, `RULES_SOURCE=git`, real `RULES_REF`. No dependency on the deleted tombstones.
- **Bundle:** `node skills/scripts/bundle-skills.mjs` runs clean; `dist/manifest.json` → `rules.loadingPath: "reference/README.md"`; bundled skills carry `{RULES_DIR}/...` placeholders and the shared `report-formats` include; no stale `kuat-docs/rules`/`LOADING.md` in bundled skills/shared.
- **Progressive disclosure:** new skills have 0 `LOADING.md`/`kuat-docs/rules` references; each names its `reference/` slices (create-web-app 14, review-web-app 7, create-imagery 8, create-presentation 6, review-presentation 4 reference links).
- **Link integrity:** custom link-check over all `skills/**` (source) + `reference/**` → **0 broken**.
- **Removals:** `_to-skills/` and `kuat-docs/rules/` both gone.
- **Eval scores (live, scored against each skill's checklist):**

| Skill | Live brief | Verdict |
|-------|-----------|---------|
| create-web-app | A1 — sign-in, no Kuat pkg (fallback flagged) | ✅ PASS |
| review-web-app | B1 — flawed sign-in, brand_compliance | ✅ PASS |
| create-imagery | C1 — 3-icon set | ✅ PASS |
| create-presentation | D1 — knowledge-sharing 5-slide outline | ✅ PASS |
| review-presentation | E1 — flawed sales deck (7 defects caught) | ✅ PASS |

### `create-web-app` ↔ `kuat-mono` contract (delivered)

- Component IDs resolved via `reference/media-types/web-product/component-registry.md` → read `{package}/agent-docs/components/{slug}.md` (installed package) or `{OVERLAY_DIR}/components/{slug}.md` (contributor overlay), per `components.manifest.json`; slug drops the namespace.
- Technical setup read from `{package}/agent-docs/setup/` (implementation-owned; where `technical.md` lands downstream).
- **Graceful fallback:** missing component/guide → build from `reference/.../patterns` + `examples` with semantic tokens, and **flag the gap** (name the wanted ID). Verified in eval A1.

### `_to-skills/` disposition

| Item | Disposition |
|------|-------------|
| `roles/brand-reviewer.md` | Inline Brand-Reviewer framing in review skills + `kuat-review` |
| `roles/technical-illustrator.md`, `roles/icon-designer.md` | `create-imagery` role framing |
| `roles/README.md` | Dropped — routing now in `skills/AGENTS.md` |
| `slides/{checklist,brand-compliance,README-procedure}.md` | `create-presentation` + `review-presentation` |
| `web-product/{review-context,review-checklist}.md` | `review-web-app` (+ `_shared/review-common.md`) |
| `web-product/DEPRECATIONS.md` | Dropped — superseded by component-registry + consumption contract |
| `web-product/technical.md` | **Dropped** (decision E); recover from git `f0338ff` for kuat-mono |
| `photography/quality-validation.md` | `create-imagery` light quality/accessibility check |
| `LOADING.md` | Dropped — mined for per-skill loading |
| `workflows/README.md` | Dropped — superseded by the skills |

## 7. Follow-ups / backlog

- **This repo (doc-sweep):** repoint `kuat-docs/setup/*` + `kuat-docs/README.md` from `kuat-docs/rules/…` to `reference/…` (use `MIGRATION-MAP.md`; `foundations/` splits four ways).
- **kuat-mono:** port `technical.md` (git `f0338ff`) into `agent-docs/setup/`; evaluate relocating `web-product/examples/`; expand `component-registry.md` as component docs are added.
- **Phase 3 (packaging):** bundle the 5 activity skills into a releasable plugin; flatten the informational `../<skill>/SKILL.md` cross-links in bundled `dist/*` (cosmetic — they don't resolve in single-file upload contexts).
- **Reference backlog:** real `charts-data/patterns/`; a `create-web-marketing`/`review-web-marketing` skill pair (web-marketing reference exists but has no dedicated activity skill yet).

## 8. Inputs to the next phase

- **Skills to package (Phase 3):** the 5 activity skills (`skills/<name>/SKILL.md`) + `skills/_shared/` + `reference/` must ship together so the `../../reference/...` relative links resolve in the packaged layout.
- **Resolver contract:** git rules root = `reference/`; `ensure-rules.sh` detects `reference/README.md`; `manifest.rules.loadingPath = reference/README.md`.
- **Eval regression net:** `docs/migration/evals/` (briefs + rubrics + `RESULTS.md`) — re-run on each reference/plugin release.
- **Version stamp:** skills emit the reference ref (`RULES_REF`) / plugin version per `skills/_shared/version-stamp.md` — Phase 3 should map this to the channel/semver model.
