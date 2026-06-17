# Execution Report — Phase 7 (Contributor Skills)

> Run A (`kuat-agent-rules`) of the cross-repo Phase 7. Run B (`kuat-mono`) is handed off, not run.

---

**Repo:** kuat-agent-rules
**Branch / PR:** `feature/phase-7-contributor` (base `a408d8b`) — PR not yet opened
**Run date:** 2026-06-17
**Status:** ✅ complete (Run A) · Run B handed off

## 1. What was done

Built the **contributor** skill set — repo-local, `.claude/skills/`, never packaged — that lets the DS
team extend Kuat safely, plus the tooling that backs them.

- **`generate-tokens` (centerpiece, landed first).** New `skills/scripts/generate-tokens.mjs` generates
  `reference/design-language/colours.md` from the token SoT (`colors.tokens.json`) and provides a
  `--check` drift mode. `colours.md` is now a **generated artifact** (carries a `DO NOT EDIT BY HAND`
  banner). npm: `tokens:generate`, `tokens:check`. Skill: `.claude/skills/generate-tokens/`.
- **Reference authoring + gate.** `.claude/skills/author-reference/`, `.claude/skills/review-reference-change/`,
  `.claude/skills/author-skill/`, backed by new `skills/scripts/check-reference.mjs` (passive test +
  link integrity + structure + token drift). npm: `reference:check`.
- **Studio asset-pack upkeep.** `.claude/skills/prep-slides-master/` (wraps `assets/slides/prep-master.py`),
  `.claude/skills/curate-slide-layouts/` (+ new `skills/scripts/inspect-layouts.py`),
  `.claude/skills/add-brand-asset/`.
- **Distribution guard hardened.** `verify-plugins.mjs` gained `verifyNoContributorLeak()` — asserts no
  `.claude/skills/` skill (or `.claude/` path) reaches any plugin payload. Rebuilt both payloads.
- **CI + docs.** `.github/workflows/drift-check.yml` (authored-but-unverified); updated
  `reference/design-language/tokens/README.md` (generator now exists) and `AGENTS.md` (contributor-skills
  section). Evals: `docs/migration/evals/phase-7-contributor.md` + `RESULTS-phase-7.md`.
- **Run B handoff:** `docs/migration/phase-7-kuat-mono-handoff.md`.

These map to the plan's four families: Build (handed off), Tokens (upstream half done), Studio asset-pack
upkeep (done), Shared authoring (done).

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `generate-tokens` round-trips; drift check fails on a deliberate hand-edit | ✅ | `tokens:generate` reproduces value tables byte-identical; `tokens:check` exit 0; `#1795d4`→`#0066cc` → exit 1 (eval G1/G2) |
| `colours.md` is now generated (not hand-maintained) | ✅ | banner + generator own it; tokens README caveat removed |
| `author-reference` produces passive-compliant reference; `review-reference-change` **catches** planted violations + broken links | ✅ | `check-reference.mjs` flags `Before you create` heading, `- [ ]`, broken link, token drift (eval R1/R2) |
| Repo-only confirmed: contributor skills absent from every marketplace bundle | ✅ | `verify:plugins` → "7 repo-local skills kept out"; ALL CHECKS PASSED (eval D1) |
| Phase-3 `build-plugin` excludes `.claude/skills/` | ✅ | guard `build-plugin.mjs:32-36` present + verifier leak-assert added |
| `prep-slides-master` reproduces the slimmed/embedded master | ✅ | self-check OK: 51.5→18.9 MB, 65 layouts, fonts correct (eval P1) |
| `curate-slide-layouts` updates the manifest | ⚠️ | enumeration (`inspect-layouts.py`, 65 layouts) done; **visual labelling/pruning needs a renderer** → contributor step |
| `add-brand-asset` adds an asset + entry | ✅ (skill) | skill authored; manifest-shape + `verify:plugins` asset check cover it; no new asset added this run |
| Registry generated from kuat-mono manifest; CI fails on drift | ⛔ handed off | kuat-mono (Run B) — `docs/migration/phase-7-kuat-mono-handoff.md` (B3) |
| Component end-to-end via `add-kuat-component`; `pnpm build` green | ⛔ handed off | kuat-mono (Run B) — handoff B1 |
| Downstream `variables.css` generated + drift check | ⛔ handed off | kuat-mono (Run B) — handoff B2 |

## 3. Deviations from the plan

- **`generate-tokens` was net-new, not a 4S leftover.** The tokens README claimed the generator shipped
  in 4S; it never did. Built here from scratch.
- **`review-reference-change` scoped to the *change*, not the whole corpus.** A full-tree passive scan
  flagged 62 items: 1 false positive (`reference/README.md` describing the boundary → exempted) and 61
  genuine **pre-existing** legacy "Testing Checklist" sections. Refactoring those is out of scope, so the
  gate's default scope is "reference files changed vs base"; `--all` surfaces the 61 as a backlog, not a
  blocker. (Without this, the gate would fail every PR on legacy debt.)
- **Phase-3 exclusion guard was already in place** — verified, then hardened with an explicit leak-assert
  rather than added from scratch.
- **`add-brand-asset` skill authored but no asset added** — there was no new genuine brand asset to add
  this run; the skill + the `verify:plugins` manifest check are the deliverable.

## 4. Decisions made (with rationale)

Mirror `docs/migration/LOG.md` (Phase 7). In short: **A** placement = repo-local `.claude/skills/`;
**B** scope = Run A here + Run B handoff (single-repo guardrail); **C** branch `feature/phase-7-contributor`
(plan literal, 4S precedent); **D** `colours.md` = full generation (prose in the generator template;
near-lossless — only banner + SoT blockquote changed); **E** executable tooling in `skills/scripts/`
(CI-runnable, not packaged); **F** CI = npm gate + authored-but-unverified workflow YAML.

## 5. Open decisions for Ed

- **Legacy reference checklist backlog (61 items).** The `--all` reference scan surfaces "Testing Checklist"
  procedure in `accessibility.md`, `component-decision-tree.md`, `product-content.md`, photography. Should
  these migrate to skills in a dedicated **reference-cleanup phase**? *Recommend: yes, a small follow-up
  phase; don't fold into Phase 7.*
- **Run B scheduling.** Run B + Phase H gate `stable`. *Recommend: run B next from the kuat-mono checkout
  using the handoff doc, then promote.*
- **Commit/PR.** Working tree is ready but **not committed** (left to you). `.claude/` is untracked —
  committing it adds `.claude/skills/` (good) and `.claude/settings.local.json` (you may want to exclude
  that). *Recommend: `git add .claude/skills .github docs skills reference AGENTS.md package.json plugins`,
  leaving `settings.local.json` out.*

## 6. Verification results

All run live on `feature/phase-7-contributor`. Full table in
[`evals/RESULTS-phase-7.md`](./evals/RESULTS-phase-7.md) — **9/9 executable checks PASS**:

- `tokens:generate` → `colours.md` value tables byte-identical to prior; `tokens:check` exit 0.
- Drift injection (`#1795d4`→`#0066cc`) → `tokens:check` exit 1 ("first diff at line 22"); regenerate restores.
- `check-reference.mjs <planted>` → exit 1 flagging the passive heading, 2× checklist, broken link.
- Token-drift path through the gate → exit 1; default scope clean → ALL REFERENCE CHECKS PASSED.
- `build:plugins` + `verify:plugins` → **ALL CHECKS PASSED**, "no contributor skill leaked into any payload (7 repo-local skills kept out)".
- `prep-master.py` (raw master) → self-check OK (51.5→18.9 MB, 65 layouts, Lexend/Lora/JetBrains Mono, −Montserrat); committed master restored byte-identical.
- `inspect-layouts.py` → 65 layouts; manifest indices 0/4/39/40 resolve correctly.

CI workflow (`drift-check.yml`) is **authored-but-unverified** — no Actions runner here; validate on the first PR.

## 7. Follow-ups / backlog

- **Reference-cleanup phase** — migrate the 61 legacy checklist sections out of reference into skills
  (surfaced by `reference:check --all`).
- **`curate-slide-layouts` visual pass** — label all 65 layouts + prune unused (needs a renderer); shrinks the
  20.3 MB studio payload toward the 30 MB guard.
- **EE photography library** — `add-brand-asset` Step 3 flips `photography.available`; not done (no library yet).
- **Validate `drift-check.yml`** on the first PR.

## 8. Inputs to the next phase

- **Run B (kuat-mono)** — execute `docs/migration/phase-7-kuat-mono-handoff.md`: `add-kuat-component`,
  downstream `variables.css` generation + drift, and the registry-from-manifest + CI drift (plan checkpoint 2).
  Copy the generator/gate shapes from `skills/scripts/generate-tokens.mjs` + `check-reference.mjs`.
- **`stable` readiness** — Run A is one half of the Phase-7 gate; `stable` needs **Run B + Phase H** too.
- **Token SoT contract** — colours change at `reference/design-language/tokens/colors.tokens.json` only;
  both `colours.md` (here) and `variables.css` (mono) regenerate from it; both sides drift-checked.
