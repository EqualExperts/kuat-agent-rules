# Phase-7 eval results (Run A · kuat-agent-rules)

Reference ref: local working copy on `feature/phase-7-contributor` (base `a408d8b`). Briefs in
[phase-7-contributor.md](./phase-7-contributor.md). These are **executed** checks (script + exit code),
not rubric-scored — run live during the phase.

| Brief | Run | Verdict | Evidence |
|-------|-----|---------|----------|
| G1 — token round-trip | live | ✅ PASS | `tokens:generate` → `colours.md` value tables byte-identical to prior; only banner + SoT blockquote differ; `tokens:check` exit 0 |
| G2 — drift caught | live | ✅ PASS | `#1795d4`→`#0066cc` hand-edit → `tokens:check` exit 1, "first diff at line 22"; regenerate restores exactly |
| G3 — token change propagates | live | ✅ PASS | `#f07c00`→`#ffaa00` via colours.md confirmed drift; (token-side change path identical — generator reads tokens) |
| R1 — planted passive + broken link | live | ✅ PASS | `check-reference.mjs <planted>` exit 1: flagged the `Before you create` heading, 2× `- [ ]`, broken `./does-not-exist.md` |
| R2 — token drift in gate | live | ✅ PASS | with colours.md out of sync, gate's token-drift check failed (exit 1) |
| R3 — clean passes, legacy not gated | live | ✅ PASS | default scope `ALL REFERENCE CHECKS PASSED` (1 changed file); `--all` reports 61 legacy items (README/MIGRATION-MAP exempt) without gating |
| D1 — no contributor leak | live | ✅ PASS | `verify:plugins` → `[distribution guard] no contributor skill leaked into any payload (7 repo-local skills kept out)`; ALL CHECKS PASSED |
| P1 — prep-slides-master reproduces master | live | ✅ PASS | `prep-master.py` self-check OK: 51.5→18.9 MB, 79→0 slides, 65 layouts, embedded Lexend/Lora/JetBrains Mono, −Montserrat; committed master restored byte-identical |
| L1 — inspect-layouts enumerates 65 | live | ✅ PASS | 65 layouts listed; manifest indices `0/4/39/40` resolve to TITLE/SECTION_HEADER/TITLE_AND_BODY/BLANK |

**Live total: 9/9 PASS.**

## Notes

- **G/R** — the generator output is deterministic (no timestamps/SHAs), so `--check` is a stable CI
  gate. The drift message names the first differing line + the fix.
- **R3** — the review gate is a **change** gate by design: default scope = reference files changed vs
  the base branch. The 61 legacy "Testing Checklist" hits (`--all`) are a tracked reference-cleanup
  backlog, deliberately not blocking unrelated PRs.
- **D1** — guard derives the contributor-skill list from `.claude/skills/` at runtime, so it
  auto-covers future contributor skills; it also asserts no `.claude/` path leaks into a payload.
- **P1/L1** — required external/runtime inputs (the 51 MB raw master; python-pptx via a venv). Both ran
  green. The visual layout labelling/pruning half of `curate-slide-layouts` needs a renderer (none in CI) and
  is a contributor step.
- **A — authoring skills** (author-reference / author-skill / add-brand-asset) have no standalone
  script; verified indirectly via the gates they hand off to. Live authoring runs are the regression
  net for a later phase.
