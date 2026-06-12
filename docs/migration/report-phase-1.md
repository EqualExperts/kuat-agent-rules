# Execution Report — Phase 1 (Reference Refactor)

**Repo:** kuat-agent-rules
**Branch / PR:** `migration/phase-1-reference-refactor` (commit `f0338ff`) — **PR not yet opened; hold for lockstep with kuat-mono 1b**
**Run date:** 2026-06-12
**Status:** ⚠️ complete with caveats

> Caveat is by design and sanctioned by the plan: legacy `kuat-create`/`kuat-review` can resolve the repo root (tombstone) but cannot read moved rule content on this branch until Phase 2 rewires them. Reference tree itself is complete and clean.

## 1. What was done

- Established **`reference/`** at the repo root as a strictly passive library with the agreed shape: `brand/`, `design-language/`, `content/`, `accessibility/`, and `media-types/{slides,web-product,web-marketing,imagery,charts-data}/`, each media type owning a `patterns/` subfolder.
- Executed the plan's **move map** with `git mv` (96 files; history preserved). Foundations split into `brand/` (brand, logo, voice-and-tone), `design-language/`, `content/`, `accessibility/`; `types/` → `media-types/`; `scenarios/` → `patterns/`; photography + graphics → `imagery/patterns/{photography,graphics}/`.
- Applied the **passive test** to every moved file: stripped `Status`/`Prerequisites`/`Load order`/`Intent` meta, "before you create/review" sections, "rule files (load in order)" tables, and all `LOADING.md`/skill/role framing. Rewrote intra-reference links (**178 broken links → 0**).
- Routed all **procedure** to the repo-root **`_to-skills/`** holding area (role cards, slides checklist/brand-compliance + extracted README procedure, web-product review-context/review-checklist/DEPRECATIONS/technical.md, photography quality-validation, the retired `LOADING.md` taxonomy, workflows). Not shipped as reference; consumed in Phase 2.
- Wrote **`reference/README.md`** (passive orientation + passive/skill boundary; no loading taxonomy), per-folder scope READMEs, a placeholder `charts-data/patterns/README.md`, and **`reference/MIGRATION-MAP.md`** covering every old→new path.
- Left **no-taxonomy redirect tombstones** at `kuat-docs/rules/LOADING.md` and `kuat-docs/rules/README.md` so `ensure-rules.sh` still resolves the repo root.
- Updated **`AGENTS.md`** and **`.cursorrules`** orientation to point at `reference/`; deduped the doubled "Design-system migration" section in AGENTS.md (a pre-existing paste duplication).

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `reference/` at agreed location with full shape; each media type has a `patterns/` folder | ✅ | `find reference/media-types/*/patterns` → all 5 tracked (slides 5, web-product 5, web-marketing 2, imagery 9, charts-data 1) |
| Zero verbs/role cards/checklists/loading tables in `reference/` | ✅ | procedure grep clean across rule files (only `MIGRATION-MAP.md` names old paths as historical context) |
| `MIGRATION-MAP.md` covers every moved path | ✅ | built from `git status` rename/delete lists; foundations, media-types, procedure, removed-READMEs, follow-ups |
| All intra-reference links resolve; no orphaned files | ✅ | Python link-checker over `reference/**/*.md`: **0 broken** |
| Git history preserved on moves (`git log --follow`) | ✅ | `--follow` traces `design-language/colours.md`, `web-product/design.md`, `slides/patterns/case-studies.md` to ancestors; photography README needs `-M30%` (heavy strip) but still traces |
| Legacy skills still resolve rules (or breakage logged) | ⚠️ | `ensure-rules.sh` resolves `RULES_ROOT`/`RULES_DIR`/`RULES_SOURCE=git` via tombstone; deep content reads broken → logged for Phase 2 |

## 3. Deviations from the plan

- **`technical.md` (unmapped drift)** → routed to `_to-skills/web-product/technical.md` (decision below), not present in the plan's move tables.
- **`web/` parent index removed**, not relocated. Its shared content (nav patterns, colour tokens) duplicated `design-language/` and per-medium `design.md`/`website.md`; web-product and web-marketing are now siblings under `media-types/`. Flagged as a follow-up if unique content is later found missing.
- **9 pure-orientation folder READMEs deleted** (foundations, design, content, types, web, web/product, and three `scenarios/`), replaced by fresh passive scope READMEs. Recorded in MIGRATION-MAP under "Removed (superseded)".
- **`LOADING.md` rename linkage** not preserved by git (taxonomy moved to `_to-skills/` while a fresh tombstone took the old path → staged as add + modify). Content is correct; history of the retired taxonomy is low-value.
- **Passive-test edits crossed the rename-similarity threshold for one file** (`imagery/patterns/photography/README.md`) — `git log --follow` needs `-M30%` for it. All other moves trace at default similarity.

## 4. Decisions made (with rationale)

Mirrors `docs/migration/LOG.md`:

1. **`reference/` at repo root** (vs under `kuat-docs/`) — plan default; cleaner home; changes kuat-mono's consumed path (→ 1b lockstep).
2. **`examples/` kept** at `reference/media-types/web-product/examples/` — plan default; flagged for later kuat-mono review.
3. **`LOADING.md` global taxonomy retired** — preserved verbatim in `_to-skills/LOADING.md`; thin human index is `reference/README.md`.
4. **Legacy resolver → thin redirect tombstone** (decided with Ed) — keeps `ensure-rules.sh` root detection alive without carrying taxonomy. Honors "don't break current users"; full skill rewiring deferred to Phase 2.
5. **`technical.md` → `_to-skills/web-product/`** (decided with Ed) — setup/integration procedure + implementation detail (ownership matrix assigns to consumer repo; the file itself defers to the package README). **Flagged as a kuat-mono relocation candidate.**

## 5. Open decisions for Ed

- **Imagery structure** — I placed photography/graphics under `media-types/imagery/patterns/{photography,graphics}/` per the plan note, with a scope README at `imagery/`. If you'd rather the descriptive files sit at the `imagery/` root and reserve `patterns/` for true scenarios, flag it — cheap to adjust before Phase 2 wires skills to these paths. **Default: keep as built.**
- **`technical.md` + `examples/` relocation to kuat-mono** — both are flagged as implementation-owned. Decide whether Phase 2 (or a kuat-mono backlog item) moves them downstream. **Default: revisit in Phase 2.**

## 6. Verification results

- **Link integrity:** custom Python checker over `reference/**/*.md` — 0 broken of ~all relative links (was 178 before the passive-test pass).
- **Procedure scan:** `grep -rniE` for "before you / Status: / Load order / Prerequisites / Intent / use skill / kuat-(review|create) / load…first / LOADING.md" over `reference/` — clean (only MIGRATION-MAP historical references).
- **patterns/ folders:** all 5 media types have a tracked `patterns/`.
- **Resolver:** `ensure-rules.sh` → `RULES_ROOT=…/kuat-agent-rules`, `RULES_DIR=…/kuat-docs/rules`, `RULES_SOURCE=git` (tombstone present; no hard crash).
- **History:** `git log --follow` confirmed on 4 sample files.
- No automated markdown-lint/link-check config exists in the repo; used the custom checker instead.

## 7. Follow-ups / backlog

- **Phase 2 (this repo):** rewire `skills/kuat-create`, `skills/kuat-review`, `skills/shared/resolve-rules.md`, `skills/scripts/ensure-rules.sh`, and `skills/scripts/bundle-skills.mjs` from `kuat-docs/rules/...` + `LOADING.md` to `reference/` with per-skill loading; consume `_to-skills/`; then delete the tombstones and `_to-skills/`.
- **kuat-mono backlog:** evaluate relocating `web-product/examples/` and `web-product/technical.md` (implementation ownership).
- **Reference backlog:** add real `charts-data/patterns/`; confirm no unique content was lost when the old `web/README.md` was dropped.

## 8. Inputs to the next phase

- **MIGRATION-MAP:** `reference/MIGRATION-MAP.md` — the authoritative old→new path table for 1b and any consumer.
- **Holding area:** `_to-skills/` (+ its README) — the exact procedure inventory Phase 2 folds into activity skills, with intended destinations.
- **New reference root for skills to link into:** `reference/` (passive); skills must link, never inline, and must not rely on a global loading taxonomy.
- **Resolver contract:** tombstones at `kuat-docs/rules/{LOADING,README}.md` are temporary; Phase 2 removes them once `ensure-rules.sh` points at `reference/`.

---

### ⚠️ Merge coordination (Phase 1 only)

This PR **must merge lockstep with the kuat-mono Phase 1b sync PR** — it changes the path kuat-mono consumes (`kuat-docs/rules/` → `reference/`). **The kuat-agent-rules side is ready to PR.** Do not merge until 1b is green and the two are coordinated.
