# Execution Report — Phase 3 (Plugin Packaging & Marketplace)

**Repo:** kuat-agent-rules (+ staged files for a separate marketplace repo)
**Branch / PR:** `migration/phase-3-plugin-packaging` (PR not yet opened)
**Run date:** 2026-06-15
**Status:** ✅ complete (with two honest, by-design verification limits → Phase-4 pilot)

## 1. What was done

- Confirmed the **current plugin/marketplace/managed-settings schema** against the live Claude Code docs (2026-06-13) before writing any manifest.
- Built **`skills/scripts/build-plugin.mjs`** (+ `npm run build:plugins`) — assembles each bundle from the single `skills/` source: skill subset + `_shared` + a **full `reference/` snapshot** + `commands/` + `plugin.json` + stamped `manifest.json` + `CHANGELOG.md`, **rewriting escape-links to `${CLAUDE_PLUGIN_ROOT}/...`** at build time. Guard: refuses to package anything but the distributable `skills/` (never `.claude/skills/`).
- Produced two committed plugin payloads:
  - **`plugins/kuat-build/`** — `create-web-app`, `review-web-app` (dev bundle; reads `@equal-experts/kuat-*` component docs **live**, not bundled).
  - **`plugins/kuat-studio/`** — `create-presentation`, `review-presentation`, `create-imagery` (knowledge bundle; no code dependency).
- Staged the marketplace files under **`marketplace/`** for the separate marketplace repo: `marketplace.json` (4 channel entries), three audience-targeted `managed-settings/` examples, and a README documenting topology, channels, auth, and the placeholders to confirm.
- Committed **`skills/scripts/verify-plugins.mjs`** — the packaged-form verification (reusable as a CI gate).
- Recorded packaged-form eval results in **`docs/migration/evals/RESULTS-phase-3.md`**.
- **Retired-for-plugin = excluded:** `ensure-rules.sh`, `resolve-rules.md`, `consumption-contract.md`, `bundle-skills.mjs`, `kuat-docs/setup/` are absent from both payloads and untouched in the repo (legacy skills still use them until Phase 5).

### Link rewrite (the core installability fix)

`build-plugin.mjs` rewrites, in each copied skill `.md`:

| Source (repo-relative) | Payload (`${CLAUDE_PLUGIN_ROOT}`) |
|------------------------|-----------------------------------|
| `../../reference/...` | `${CLAUDE_PLUGIN_ROOT}/reference/...` |
| `../_shared/...` | `${CLAUDE_PLUGIN_ROOT}/skills/_shared/...` |
| `../<skill>/...` (cross-skill) | `${CLAUDE_PLUGIN_ROOT}/skills/<skill>/...` |

Source skills keep their relative links (repo dev path + Phase-2 evals still resolve); the rewrite lives only in the payload.

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| Both plugins install from the marketplace in a clean account, zero setup; `${CLAUDE_PLUGIN_ROOT}` links resolve, no dangling `../../` | ⚠️ structurally verified | `verify-plugins.mjs`: 0 escape links; kuat-build 42 / kuat-studio 43 plugin-root links all resolve. **Live clean-account install = Phase-4 pilot** (runtime-only). |
| `kuat-build` resolves component docs **live** + falls back/flags when missing | ⚠️ documented + fallback verified | Skill Step 3 documents the live read path; A1 eval exercised the missing-component fallback. **Live package test = Phase-4 pilot** (no publish here). |
| `kuat-studio` triggers + produces on-brand output from bundled reference only (no external resolution/shell) | ✅ | No code dependency; all slices bundled; packaged skills byte-identical to source modulo rewrite |
| Eval set re-run against installed form — 5/5 pass | ✅ | `RESULTS-phase-3.md` — equivalence + resolution proof; 5/5 hold |
| `version` declared once per plugin; beta/stable resolve to distinct versions; `/plugin update` moves between them | ✅ | `version` in `plugin.json` only; marketplace entries set **no** `version` (distinct via refs); documented in `marketplace/README.md` |
| Managed-settings pre-register + install the right plugin per audience without manual `marketplace add` | ✅ | `extraKnownMarketplaces` (auto-register) + `strictKnownMarketplaces` (lock) + per-group `enabledPlugins` in 3 example files |

## 3. Deviations from the plan

- **`MIGRATION-MAP.md` excluded from the reference snapshot** (migration artifact, not brand reference). Required extending the build's link-neutralise pass to also strip `MIGRATION-MAP` links (alongside `kuat-docs`) so the bundled `reference/README.md` has no dangle.
- **Channels via distinct refs, not entry `version`.** The plan said "beta + stable entries resolving to distinct version strings." Per the docs, setting `version` on an entry while `plugin.json` also sets it causes a collision; the install-safe way is distinct **refs** whose `plugin.json` carries distinct versions. So entries set no `version`; the release process bumps the pre-release on the `beta` ref. Documented.
- **Added `verify-plugins.mjs`** (not named in the plan) to make the packaged-form acceptance checks repeatable/CI-able.
- **Two acceptance criteria are structurally (not live) verified** — clean-account install and the live npm-package component read can't run in a repo-only, no-publish context. Verified by equivalence + resolution; live checks become Phase-4 pilot steps. (Plan anticipated this in "Known limitations".)

## 4. Decisions made (with rationale)

Mirrors `docs/migration/LOG.md` (Phase 3):

- **A — Names:** `kuat-build` (dev) + `kuat-studio` (knowledge). Kept the working names; clear and already used.
- **B — Distribution:** payloads committed to `plugins/<name>/`; marketplace `source` = git-subdir into `EqualExperts/kuat-agent-rules`; marketplace.json + managed-settings staged under `marketplace/` for the separate repo (placeholder coords).
- **C — Build-time link rewrite** (source stays relative; payload uses `${CLAUDE_PLUGIN_ROOT}`). Keeps the dev path + Phase-2 evals working; mirrors `bundle-skills.mjs`.
- **D — Full reference snapshot in both** (≈520K each). Guarantees resolution; platform isolation enforced at the skill level.
- **E — Retire = exclude, not quarantine.** Runtime-resolution machinery stays for the legacy path; new plugins don't reference it. No `legacy/` move.

## 5. Open decisions for Ed

- **Marketplace repo coords.** `marketplace.json` and managed-settings use `EqualExperts/kuat-marketplace` and refs `stable`/`beta` as **placeholders**. Confirm the real marketplace repo, then create the `stable` tag + `beta` branch in `kuat-agent-rules` so the git-subdir sources resolve. **Default: `EqualExperts/kuat-marketplace`, stable tag + beta branch.**
- **Where the marketplace files ultimately live.** They're staged in `marketplace/` here; moving/publishing them to the marketplace repo is outside this repo (guardrail). Confirm you want me (or a separate task) to open that repo.
- **CI vs committed payloads.** Payloads are committed (~1MB total) for install-verifiability this phase. Decide whether Phase 4+ moves payload assembly to CI (build on the release ref) to keep `main` lean. **Default: keep committed for now.**

## 6. Verification results

`node skills/scripts/verify-plugins.mjs` → **ALL CHECKS PASSED**:

- **JSON:** both `plugin.json`, both `manifest.json`, `marketplace.json`, 3 managed-settings — all valid; required fields present.
- **No escape links** in any payload skill (`../../`, `../_shared`, `../<skill>` = 0).
- **`${CLAUDE_PLUGIN_ROOT}` resolution:** kuat-build 42 links, kuat-studio 43 links — all map to bundled files.
- **Reference snapshot:** 88 files per plugin; 0 broken internal links; 0 surviving `kuat-docs` links.
- **Equivalence:** all 5 packaged skills byte-identical to source modulo the link rewrite.
- **Marketplace:** 4 entries, none set `version`; all have `name` + `source`.
- **Build manifest:** `reference.builtAtRef = 0e173e5` (current `main`); `version 1.0.0`.
- **Source untouched + dev path intact:** repo `skills/` unchanged by the build; source link-check still 0 broken.
- **Guard:** `build-plugin.mjs` refuses any source path that isn't the distributable `skills/`.
- **Packaged-form eval:** `docs/migration/evals/RESULTS-phase-3.md` — 5/5 hold by equivalence + resolution.

### Version / channel mapping

| Plugin | Stable entry | Beta entry | Version source |
|--------|-------------|-----------|----------------|
| kuat-build | `kuat-build@kuat` (ref `stable`) | `kuat-build-beta@kuat` (ref `beta`) | each ref's `plugin.json` `version` |
| kuat-studio | `kuat-studio@kuat` (ref `stable`) | `kuat-studio-beta@kuat` (ref `beta`) | each ref's `plugin.json` `version` |

Promotion = fast-forward `stable` to the tested beta commit + bump `plugin.json` version on `stable`.

## 7. Follow-ups / backlog

- **Marketplace repo:** create it, move `marketplace/` there, set real coords + create `stable`/`beta` refs; provision the private-repo auth token for background auto-updates.
- **Cosmetic:** rewrite bare-path link *text* in the create/review-web-app Step-2 tables (targets are already correct).
- **CI:** optionally move payload assembly + `verify-plugins.mjs` into CI on the release ref.
- **No-Cowork cohort:** if one appears, extend `build-plugin.mjs` to also emit self-contained ZIPs for `kuat-studio` (reference slices copied into each skill).
- **Phase 5:** removes legacy `kuat-create`/`kuat-review` + the runtime-resolution machinery kept by decision E.

## 8. Inputs to the next phase (Phase 4 — pilot on `beta`)

- **Pilot cohorts per bundle:** `marketplace/managed-settings/pilot-beta.json` enables `kuat-build-beta` + `kuat-studio-beta`. Engineering pilots **kuat-build** (needs a real project with `@equal-experts/kuat-*` installed — the live-component test); a broad consultant slice pilots **kuat-studio**.
- **Live checks to run in the pilot:** clean-account install from the marketplace (`${CLAUDE_PLUGIN_ROOT}` resolution in the real runtime); `kuat-build`'s live component-doc read + missing-component fallback against an installed package.
- **Release mechanics:** distinct beta/stable versions via refs; `/plugin update` promotion path; managed-settings deployment per group.
- **Artifacts:** `plugins/<name>/` payloads, `marketplace/` (catalogue + managed-settings), `verify-plugins.mjs` (regression gate), `RESULTS-phase-3.md` (packaged-form baseline).
