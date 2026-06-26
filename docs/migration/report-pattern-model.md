# Execution Report — Pattern Model rollout (web-product full cut + shared/placeholder scaffolding)

**Repo:** kuat-agent-rules
**Branch / PR:** `feature/pattern-model` (no PR yet)
**Run date:** 2026-06-26
**Status:** ✅ complete

Source of design: `docs/migration/kuat-pattern-model.md` (decisions resolved §9). Execution prompt:
`docs/migration/pattern-model-rollout-prompt.md`. Scope this run: `kuat-agent-rules` only; **Blocks
deferred**.

## 1. What was done

- **Gate extended (deliverable enabler).** `skills/scripts/check-reference.mjs` `structure()` now permits
  the shared layer `reference/patterns/` in addition to `reference/media-types/<medium>/patterns/`. This
  was a hard prerequisite — the check walks the whole tree, so the design's top-level folder was illegal
  until extended.
- **Top-level shared layer created.** `reference/patterns/overview.md` (the model, passive) and
  `reference/patterns/help-users/describe-a-case-study.md` (the worked cross-medium concept: user goal →
  context → principles → implementations → related Blocks).
- **web-product reframed (full first cut).** Four spec docs reframed to the outcome anatomy and renamed
  to outcome slugs via `git mv` (history preserved):
  - `authentication.md` → `sign-in.md` — *Help users to sign in*
  - `forms.md` → `complete-a-form.md` — *Help users to complete a form*
  - `dashboards.md` → `dashboard.md` — *Pages: Dashboard*
  - `documentation.md` (kept) — *Pages: Documentation*

  Each leads with **User goal → Context → Principles**, then folds the existing
  layout/design/content/accessibility/implementation detail under **Solution in web-product**, then
  **Best Practices** + **Examples**. `patterns/README.md` reindexed by **Ask / Help / Pages**. All four
  are **single-medium** (concept + implementation together; no spurious top-level concept).
- **slides + web-marketing aligned (light touch).** A passive "pattern model (later cut)" note added to
  each medium's `patterns/README.md`; existing files untouched. `slides/patterns/case-studies.md` gained
  an **Implements:** link up to the `describe-a-case-study` concept — wiring the cross-medium example.
- **Contribution tie-in.** `contribute/proposing-a-pattern.md` added (outcome framing, doc anatomy,
  single-vs-shared placement, **Medium/Heavy** size, `author-reference` / `review-reference-change` +
  gate, Slack request step, **`proposing-a-block` deferred** note). Linked from `contribute/overview.md`,
  `CONTRIBUTING.md`, and cross-referenced from `proposing-a-reference-change.md`.
- **Consumption.** `skills/create-web-app/SKILL.md` pattern-loading row updated to the reframed slugs +
  Ask/Help/Pages framing (source only; plugin copy regenerated).
- **Map + payloads.** `reference/MIGRATION-MAP.md` records the four renames + the new shared layer.
  `npm run build:plugins` regenerated both payloads (kuat-build, kuat-studio).

## 2. Acceptance criteria

| Criterion (from prompt) | Met? | Evidence |
|--------------------------|------|----------|
| `reference/patterns/` exists: overview + `describe-a-case-study` (slides impl linked, web-marketing TBD, **no web-product entry**) | ✅ | `reference/patterns/{overview.md, help-users/describe-a-case-study.md}`; slides impl linked; web-marketing marked *planned*; no web-product implementation |
| web-product's four patterns reframed to anatomy; README indexes by Ask/Help/Pages; single-medium | ✅ | `sign-in/complete-a-form/dashboard/documentation.md` reframed; `patterns/README.md` grouped Help/Pages |
| No medium's `patterns/` holds a pattern it doesn't implement (grep/spot-check) | ✅ | grep: no `case-stud*`/`describe*` file under web-product; each medium folder lists only its own |
| `review-reference-change` passes; 0 broken links; `verify-plugins` green; payloads rebuilt | ✅ | `reference:check --all` green (92 files, 337 links); `verify:plugins` ALL CHECKS PASSED; payloads rebuilt |
| `contribute/proposing-a-pattern.md` present + linked; Blocks/registry **not** built (deferred note only) | ✅ | file present; linked from overview + CONTRIBUTING; no registry, no `proposing-a-block`; deferred note in the page |
| Report at `docs/migration/report-pattern-model.md` | ✅ | this file |

## 3. Deviations from the plan

- **External-link fix beyond the renamed files.** The reframe touched only the four pattern files, but
  `component-registry.md` linked the old `./patterns/forms.md` + `./patterns/authentication.md`; the gate
  caught both and they were repointed. (The `content/*.md` "forms" links are a different file —
  `web-product/content/forms.md` — and were correctly left alone.)
- **`reference/README.md` index updated** (not explicitly in the plan): added a `patterns/` row + sentence
  so the shared layer is discoverable. Low-risk (README is passive-exempt).
- **`proposing-a-reference-change.md` cross-link added** (beyond the required overview/CONTRIBUTING links)
  because that page already mentions "a new pattern" — the cross-ref prevents routing confusion.
- No functional divergence from the approved plan otherwise.

## 4. Decisions made (with rationale)

Mirror of `docs/migration/LOG.md` (Pattern model — rollout):

- **A — Extend the reference gate** rather than rename the shared layer to dodge it. The design names
  `reference/patterns/` explicitly and "review-reference-change passes" is an acceptance criterion, so the
  gate had to learn the new home. Confirmed with Ed.
- **B — Lean reframe, keep detail.** Lead with outcome framing; reorganise (don't discard) the
  layout/component/content detail that `create-web-app` consumes.
- **C — Rename to outcome slugs** via `git mv` (history preserved); recorded in MIGRATION-MAP, with
  `create-web-app` + README + component-registry references updated.
- **D — Stay on `feature/pattern-model`** (the prompt's explicit branch), not a generic phase branch.
- **Historical artifacts left as-is.** Dated verification reports + eval outputs under `docs/migration/`
  still cite old pattern paths; these are point-in-time records, so the rename is carried by MIGRATION-MAP
  rather than rewriting history.

## 5. Open decisions for Ed

- **slides / web-marketing full reframe — when?** This cut left both as placeholders (note + the one
  case-study Implements link). The natural next cut: split `web-marketing/patterns/marketing-pages.md`
  into individual patterns and add the **web-marketing case-study implementation** of
  `describe-a-case-study` (currently *planned* / TBD). Recommend scheduling as a follow-up cut, not now.
- **Pattern index — build it?** Deferred this run (optional in the prompt; needs new tooling). Recommend
  building only once a second shared concept exists, so discovery has something to index. Default: defer.
- **Blocks** remain deferred by design — no action needed until the "how Blocks are created" piece lands.

## 6. Verification results

```
reference:check --all  → ALL REFERENCE CHECKS PASSED
  passive test: 90 file(s) carry no procedure markers
  link integrity: 337 relative link(s) resolve
  structure: patterns/ only at reference/patterns/ or media-types/<medium>/
  token drift: colours.md matches the token SoT

verify:plugins         → ALL CHECKS PASSED
  [kuat-build]  no residual escape links; 42 ${CLAUDE_PLUGIN_ROOT} links resolve;
                reference snapshot 91 files, 0 broken / 0 kuat-docs; 2 skills identical to source
  [kuat-studio] no residual escape links; 47 links resolve; snapshot 91 files, 0 broken;
                3 skills identical to source; asset master + manifest ok
  [distribution guard] no contributor skill leaked (7 repo-local skills kept out)

build:plugins          → wrote kuat-build (2 skills) + kuat-studio (3 skills), ref dc1399720362

no-bloat grep          → no case-study/describe file under web-product; each medium's patterns/
                         holds only its own implementations
```

## 7. Follow-ups / backlog

- **web-marketing case-study implementation** of `describe-a-case-study` (the *planned* stub) — next cut.
- **slides / web-marketing pattern-model reframe** — split page-type docs into individual patterns.
- **Pattern index** (generated, lists all patterns + applicable media) — deferred; revisit when a second
  shared concept exists.
- **Blocks / pattern↔Block registry / `proposing-a-block`** — deferred with the Block model (separate
  piece).

## 8. Inputs to the next phase

- **Shared-layer location & gate contract:** shared concepts live at `reference/patterns/` (now a legal
  home in `check-reference.mjs`); per-medium implementations stay at `media-types/<medium>/patterns/` and
  link up. A medium's folder must hold only patterns it implements (no bloat) — the structure check
  enforces placement, the no-bloat rule is review-enforced.
- **Promotion path:** a single-medium pattern becomes shared by extracting its concept to
  `reference/patterns/` and adding the new implementation — a deliberate refactor (see
  `contribute/proposing-a-pattern.md`).
- **Rename map:** `reference/MIGRATION-MAP.md` carries the web-product old→new filenames for any consumer
  still citing them.
