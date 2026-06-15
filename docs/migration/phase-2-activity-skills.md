# Phase 2 — Activity Skills

**Repo / Claude Code project:** `kuat-agent-rules`
**Branch:** `migration/phase-2-activity-skills`
**Depends on:** Phase 1 merged (reference/ + `_to-skills/` holding area exist)

> Run in plan mode first. Reuse the genuinely good machinery in the existing `skills/kuat-create` and `kuat-review` (intake questions, report formats, conflict flagging) — but drop the heavy runtime resolution, since reference now ships locally/bundled.

---

## Objective

Build the prioritised activity skills as **progressive-disclosure** skills that carry procedure and cite reference slices on demand. Fold the `_to-skills/` procedure and the old role cards/checklists into them. Keep legacy `kuat-create`/`kuat-review` working alongside until Phase 5.

Priority order (from §5, as agreed): **web → imagery → presentations.**

---

## Skills to build

Create under `skills/` (new activity skills; leave legacy ones untouched):

| Skill | Create/Review | Reference it loads | Procedure source (`_to-skills/`) |
|-------|---------------|--------------------|----------------------------------|
| `create-web-app` | create | `design-language/`, `accessibility/`, `content/`, `media-types/web-product/` (+ patterns) | web product design guidance; component-decision-tree/registry |
| `review-web-app` | review | same + review checklist | `review-context.md`, `review-checklist.md`, brand-reviewer role |
| `create-imagery` | create (+ light review) | `brand/`, `design-language/`, `media-types/imagery/` | technical-illustrator + icon-designer roles |
| `create-presentation` | create | `brand/`, `design-language/`, `content/`, `media-types/slides/` (+ patterns) | slides "before you create" + scenario/pattern guidance |
| `review-presentation` | review | `media-types/slides/` + slides checklist | `slides/checklist.md`, `brand-compliance.md` |

`create-web-app` also consumes the **`kuat-mono` component library** (published packages + per-component usage docs). It must degrade gracefully: if a component doesn't exist yet, fall back to documented patterns and flag the gap.

> **Decision (Ed, confirmed): `technical.md` relocates to kuat-mono.** The web-product technical setup (`_to-skills/web-product/technical.md` — Tailwind/kuat-core preset, theming, component stack, tokens) is implementation-owned per the ownership matrix, so it does **not** become part of an agent-rules skill. Instead:
> - **kuat-mono** receives it into the overlay (`kuat-docs/setup/`, merging with the existing `kuat-core-integration.md` / `consumer-setup.md` to avoid duplication) so it bundles into each package's `agent-docs/`. Do this as its own small PR or alongside the deferred prose-sweep PR noted in the 1b report.
> - **`create-web-app`** then *reads* technical setup from the package/component `agent-docs` path (not from reference), consistent with the consumption contract.
> - Remove `technical.md` from agent-rules `_to-skills/` once it has landed in mono.
>
> `examples/` ownership remains a **separate, still-open** call (kept in `reference/media-types/web-product/examples/` for now) — decide independently.

---

## Skill anatomy (apply to each `SKILL.md`)

1. **Frontmatter**: `name`, sharp `description` written the way people actually ask ("create a deck", "review my web UI") so triggering is reliable.
2. **Short body** — the procedure only:
   - **Intake** — questions to ask before starting (scenario, audience, format). Reuse `kuat-review`'s grouped-intake and depth model for reviews.
   - **Steps** — ordered, with explicit "load `reference/<path>`" pointers (progressive disclosure — link, don't inline).
   - **Checklist** — the pass/fail gate before handoff.
   - **Conflict & ambiguity rules** — flag rule-vs-request conflicts; ask when unclear.
3. **No inlined reference content, no global loading taxonomy.** Each skill names exactly the reference files it needs.
4. **Version stamp** — output the reference/plugin version in deliverables (carry forward the `RULES_REF` citation habit).

Shared assets go in `skills/_shared/` (report formats, common review checklist, intake snippets). Migrate `kuat-review/references/report-formats.md` here.

---

## Tasks

1. Branch + log; inventory `_to-skills/` and map each item to its destination skill.
2. Scaffold the five skill folders + `_shared/`.
3. Author `create-web-app` **first** as the reference template; get it producing on-brand output against a test brief before cloning the pattern.
4. Build the remaining four, migrating procedure from `_to-skills/` and the legacy skills.
5. Wire `create-web-app`/`review-web-app` to the `kuat-mono` component docs path (align with how packages expose `agent-docs/components/`); implement the graceful-fallback behaviour.
6. Empty `_to-skills/` (every item integrated or explicitly dropped with a log entry). **Exception:** `web-product/technical.md` is **relocated to kuat-mono** (see decision above), not folded into a skill — remove it from `_to-skills/` only once it has landed downstream.
7. Build a small **eval set**: 2–3 fixed test briefs per skill scored against its checklist (this is the phase verification and the regression net for later releases).

---

## Acceptance criteria

- Five skills present, each with a tested trigger description and a self-contained procedure.
- No skill inlines reference content or relies on the retired global `LOADING.md`.
- `create-web-app` resolves `kuat-mono` component docs and falls back gracefully on a missing component.
- `_to-skills/` is empty; nothing procedural left stranded in `reference/`.
- Eval set passes: each skill produces on-brand output meeting its checklist on the test briefs.
- Legacy `kuat-create`/`kuat-review` still function.

---

## Report back

Fill `docs/migration/report-phase-2.md`. Capture: final skill list and trigger descriptions, create/review split decisions (confirm imagery stayed merged or was split), eval results per skill, the `create-web-app` ↔ `kuat-mono` contract, and anything dropped from `_to-skills/` and why.
