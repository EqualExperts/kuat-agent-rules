# Phase 7 — Execution Prompt (contributor skills)

**Repos / Claude Code projects:** `kuat-agent-rules` **and** `kuat-mono` (cross-repo)
**Branches:** `feature/phase-7-contributor` in each repo
**Detailed plan:** `docs/migration/phase-7-contributor-skills.md` (read first).

> **Intention.** Equip the DS team to maintain **Studio + Build** before consultants depend on a stable release — this **gates `stable`** (with Phase H). These are **repo-local** Claude Code skills (each repo's `.claude/skills/`), discovered when working in that repo. **Never** in the Enterprise marketplace/managed-settings distribution — being in the repo *is* the access control. Keep them out of the distributable `skills/` (and out of `build-plugin`).

## Run conventions

- **Plan mode first** — read the detailed plan, propose a breakdown against each repo, present for approval; no edits until approved.
- Branch `feature/phase-7-contributor` per repo; dated `docs/migration/LOG.md`; end with `docs/migration/report-phase-7.md` from the template, output it.
- Base off current `main`/`master` (4S + the content update are merged).

## Two runs (cross-repo)

**Run A — `kuat-agent-rules`** (most of the work):
1. **`generate-tokens` — do this FIRST.** From `reference/design-language/tokens/colors.tokens.json` (the SoT), **generate** `reference/design-language/colours.md` and feed the downstream kuat-core `variables.css` generation; add a **drift check** that fails if either diverges from the tokens. This retires the hand-maintained `colours.md` and permanently closes the `#0066CC` drift class. *(Land first so Phase H optimises a generated doc, not a hand one.)*
2. **Studio asset-pack upkeep:** `prep-master` (wrap `assets/slides/prep-master.py` — re-slim/font-fix/embed on master change), `curate-layouts` (label/prune the 65-layout map in `assets.manifest.json`), `add-brand-asset` (add logo/photography/icon + manifest entry).
3. **Shared authoring:** `author-reference`, `review-reference-change` (passive-test + link-integrity + token-drift gate — the gate the recent out-of-phase content edit lacked), `author-skill`.
   - All under `kuat-agent-rules/.claude/skills/` — **not** the distributable `skills/`.

**Run B — `kuat-mono`**:
4. **`add-kuat-component`** — scaffold a component (React+Vue) + Storybook + tests; update `components.manifest.json`; **regenerate the component registry from the manifest** + a **CI drift check** (reference registry vs kuat-mono manifest); regenerate the package `agent-docs` bundle.
   - Under `kuat-mono/.claude/skills/`.
   - The downstream half of `generate-tokens` (emit `variables.css` from the synced upstream tokens + drift check) lives here too, consuming the synced `reference/design-language/tokens/`.

## Acceptance / verification

- All skills are **repo-local** (`.claude/skills/`), discovered in-repo, and **absent from every plugin payload** (verify `build-plugin` excludes `.claude/skills/`).
- **`generate-tokens` round-trips:** edit a token → `colours.md` + `variables.css` regenerate to match; drift check **fails** on a deliberate hand-edit of a generated artifact.
- **`add-kuat-component`** produces a component end-to-end (code + Storybook + tests + manifest + registry + bundle); `pnpm build` green; registry drift check fails on a deliberate mismatch.
- `review-reference-change` **catches** a planted passive-test violation, broken link, and token drift.
- `prep-master` reproduces the slimmed/embedded master; `curate-layouts` updates the manifest; `add-brand-asset` adds an asset + entry.
- Consumer plugin payloads unaffected; `verify-plugins.mjs` still green.

## Report back

Fill `docs/migration/report-phase-7.md` (per repo as relevant): skills built + where they live; the `generate-tokens` generation+drift result (and confirmation `colours.md` is now generated); the `add-kuat-component` end-to-end + registry drift; the review gate catching violations; confirmation nothing leaked into the plugin payloads; and readiness input for `stable` (this + Phase H are the gates).
