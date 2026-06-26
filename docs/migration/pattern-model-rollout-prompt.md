# Pattern Model — Rollout Execution Prompt

**Repo / Claude Code project:** `kuat-agent-rules` (patterns are reference; single repo — Blocks/kuat-mono deferred).
**Branch:** `feature/pattern-model`
**Source of design:** `docs/migration/kuat-pattern-model.md` (decisions resolved). Don't re-decide; implement.

> **Intention.** Adopt the outcome-framed pattern model: shared concepts factored top-level *only when cross-medium*, single-medium patterns in-medium, **a medium's `patterns/` folder only ever holds its relevant patterns** (no bloat). First cut: **web-product full + placeholder/shared structure for slides & web-marketing**; **Blocks deferred**. Plan mode first; branch/PR; dated `LOG.md`; report back.

## Guardrails

- **No medium bloat:** never put a pattern in a medium that has no implementation there (e.g. `describe-a-case-study` must **not** appear under `web-product/`).
- Patterns are **reference** (descriptive best-practice, outcome-framed) — they must pass `review-reference-change` (no agent how-to / "before you create" procedure). Match the existing patterns' style.
- **Blocks deferred:** do **not** build a pattern↔block registry or Block contribution path. Pattern docs may *mention* that a Block could link later — nothing more.

## Deliverables

### 1. Top-level shared layer
- `reference/patterns/overview.md` — the model (outcome framing: *Ask users for… / Help users to… / Pages*; concept↔implementation; single-medium vs shared; relevance-scoping; pattern doc anatomy: user goal → context → principles → implementations → examples).
- `reference/patterns/help-users/describe-a-case-study.md` — the **worked shared concept** (cross-medium proof): user goal, context, medium-agnostic principles, and an **Implementations** list → **slides** (link the existing `media-types/slides/patterns/case-studies.md`) + **web-marketing** (TBD stub). **No web-product implementation.**

### 2. web-product — full first cut
- Reframe the four existing files (`authentication`, `dashboards`, `forms`, `documentation`) into **outcome-framed patterns** using the anatomy (user goal / context / principles / solution-in-web-product / examples). They are **single-medium (web-product)** — concept + implementation together, **no top-level concept** (none is cross-medium yet).
  - e.g. `authentication.md` → "Help users to sign in"; `dashboards.md` → Page pattern "Dashboard"; `forms.md` → "Help users to complete a form"; `documentation.md` → Page/Help pattern.
- Update `web-product/patterns/README.md` to index them by the Ask/Help/Pages framing.

### 3. slides + web-marketing — placeholder alignment (don't fully reframe)
- Add a note to each of `slides/patterns/README.md` and `web-marketing/patterns/README.md`: this medium will adopt the pattern model + link shared concepts in a later cut; existing files stay as-is for now.
- **Light touch only:** add an "Implements: [describe-a-case-study](../../../patterns/help-users/describe-a-case-study.md)" link to the existing `slides/patterns/case-studies.md` (to wire the cross-medium example). Leave the rest of slides/web-marketing untouched.

### 4. Contribution tie-in
- `contribute/proposing-a-pattern.md` — outcome framing, the doc anatomy, single-vs-shared placement rule, **Medium/Heavy** size, the `author-reference`/`review-reference-change` skills + gate, the Slack request step. Note **`proposing-a-block` is deferred** (with Blocks). Link it from `contribute/overview.md`.

### 5. Consumption + discovery
- Update `create-web-app`'s pattern-loading (Step 2/3) to the reframed web-product patterns.
- *(Optional)* a generated `reference/patterns/index` listing all patterns + applicable media — for discovery without bloating any medium. Defer if not cheap.

## Acceptance

- `reference/patterns/` exists with overview + the `describe-a-case-study` concept (slides impl linked, web-marketing TBD, **no web-product entry**).
- web-product's four patterns reframed to outcome anatomy; README indexes them; they're single-medium (no spurious top-level concepts).
- No medium's `patterns/` folder contains a pattern it doesn't implement (grep/spot-check).
- `review-reference-change` passes; link-check 0 broken; `verify-plugins` green; payloads rebuilt.
- `contribute/proposing-a-pattern.md` present + linked; Blocks/registry **not** built (deferred note only).

## Report back

`docs/migration/report-pattern-model.md`: the structure created, web-product reframe summary, the cross-medium case-study concept + its linkage, the placeholder state of slides/web-marketing, the proposing-a-pattern page, and confirmation no medium is bloated + gates green.
