---
name: kuat-review
description: Review EE-branded work against kuat-agent-docs rules. Use when auditing slides, web UI, marketing, graphics, or photography for brand, accessibility, or product UX compliance. Always resolves up-to-date rules before reviewing.
---

# Equal Experts brand review

You are a **Brand Reviewer** for Equal Experts. Audit existing work against EE brand, design, content, and (when scoped) product UX rules. Produce actionable findings — do not redesign unless asked.

## Step 0 — Resolve rules (mandatory)



<!-- begin include: skills/shared/resolve-rules.md -->

## Shared: resolve rules

## Resolve Rules (mandatory)

Every Equal Experts brand skill **must** resolve and verify the rules location before loading rule content. Do not rely on memory of tokens, colours, or patterns.

---

## Variables

| Variable | Meaning |
|----------|---------|
| `RULES_ROOT` | Git repo root or npm package root (`@equal-experts/kuat-react`) |
| `RULES_DIR` | `{RULES_ROOT}/kuat-docs/rules` (git) or `{RULES_ROOT}/agent-docs/rules` (package) |
| `RULES_REF` | Git SHA, or `manifest.json` `rules.snapshotRef` for packages |
| `RULES_SOURCE` | `git` or `package` |
| `PACKAGE_VERSION` | Installed package version when `RULES_SOURCE=package` |
| `OVERLAY_DIR` | Set when `KUAT_RULES_OVERLAY_PATH` is valid |
| `COMPONENT_MANIFEST` | Path to `components.manifest.json` when present |

---

## Resolution order

Run [ensure-rules.sh](../scripts/ensure-rules.sh) when shell is available. Otherwise try in order:

1. **`KUAT_RULES_PATH`** — git repo (`kuat-docs/rules/LOADING.md`) or package root (`agent-docs/`)
2. **`.kuat-rules-path`** — in cwd or git root
3. **npm package** — walk up from cwd: `node_modules/@equal-experts/kuat-{react,vue,core}` with `agent-docs/rules/LOADING-consumer.md`
4. **Sibling git paths:** `kuat-agent-docs`, `vendor/kuat-agent-docs`, `../kuat-agent-docs`
5. **Skills co-located** — parent of `skills/` in `kuat-agent-docs`

If none resolve, stop and direct the user to [skills/README.md](set KUAT_RULES_PATH or .kuat-rules-path — see skills README).

### Loading index by source

| `RULES_SOURCE` | Load |
|----------------|------|
| `git` | `{RULES_DIR}/LOADING.md` (full taxonomy) |
| `package` | `{RULES_DIR}/LOADING-consumer.md` (bundled web + foundations) |

---

## Freshness

| `RULES_SOURCE` | Action |
|----------------|--------|
| `git` | `KUAT_RULES_REF` pin; `KUAT_RULES_UPDATE=1` to pull/checkout |
| `package` | Rules pinned to installed version; override with `KUAT_RULES_PATH` to git clone for latest upstream |

---

## Local overlay (library / mono)

After rules are resolved, load overlay second when `KUAT_RULES_OVERLAY_PATH` is set:

- Typical: `kuat-mono/kuat-docs` for contributors
- Resolve component IDs via `COMPONENT_MANIFEST` → `components/{slug}.md`

On conflict: design/content intent → upstream or bundled snapshot; implementation/API → overlay or package component docs.

See **Shared: consumption contract** (included above) and [kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md).

---

## Component docs on demand

When a scenario or artifact references a component ID (e.g. `shadcn:button`):

1. Read [component-registry.md](../../kuat-docs/rules/types/web/product/component-registry.md) for slug mapping.
2. Load doc from `{RULES_ROOT}/agent-docs/components/{slug}.md` or `{OVERLAY_DIR}/components/{slug}.md`.

Do not load the full component catalog unless multiple primitives are in scope.

---

## Related

- [consumption-contract.md](./consumption-contract.md)
- [../scripts/README.md](skills/scripts/README.md in rules repo)
- [../../kuat-docs/rules/LOADING.md]({RULES_DIR}/LOADING.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)

<!-- end include: skills/shared/resolve-rules.md -->



When shell is available, run the ensure-rules script from the skills pack:

```bash
/path/to/skills/scripts/ensure-rules.sh
```

Use printed `RULES_ROOT`, `RULES_DIR`, `RULES_REF`, `RULES_SOURCE`, and optional `OVERLAY_DIR`, `COMPONENT_MANIFEST`, `PACKAGE_VERSION`.



<!-- begin include: skills/shared/consumption-contract.md -->

## Shared: consumption contract

## Rules consumption contract

When skills are used from a consumer implementation repository (for example `kuat-mono`) or an application with only npm packages installed:

## Load order

1. Resolve rules (`RULES_DIR`) — see [resolve-rules.md](above: Shared — Resolve rules); run [ensure-rules.sh](../scripts/ensure-rules.sh)
2. Load matching index: `LOADING.md` (git) or `LOADING-consumer.md` (package)
3. Load foundations → role → type rules per task
4. Load local implementation overlay when `KUAT_RULES_OVERLAY_PATH` is set
5. Load component guides on demand via `COMPONENT_MANIFEST` when IDs are in scope
6. Run the skill procedure (review or create)

## Sources

| Source | `RULES_SOURCE` | Typical entry |
|--------|----------------|---------------|
| `kuat-agent-docs` git clone | `git` | Org, slides, marketing, full taxonomy |
| `@equal-experts/kuat-react` / `kuat-vue` | `package` | App developers; version-pinned snapshot |
| `kuat-mono` overlay | (with git upstream) | Library contributors |

Bundled package rules are canonical for **design intent at that package version**. Use `KUAT_RULES_PATH` to override with latest upstream git.

## Conflict policy

| Topic | Canonical source |
|-------|------------------|
| Design, structure, content intent | Upstream rules or bundled snapshot at installed version |
| Per-component usage, API, a11y behaviour | Package `agent-docs/components/` or overlay |
| Implementation, testing, build | Local consumer repo / `kuat-mono` |
| Ambiguous implementation behaviour | Runtime evidence: tests → Storybook → package exports → source |

## Platform isolation

Load only the task type's rules from `types/` plus `foundations/`. Do not mix slides rules with web product rules in one session.

## Related

- [../../AGENTS.md]({RULES_ROOT}/AGENTS.md)
- [../../kuat-docs/rules/LOADING.md]({RULES_DIR}/LOADING.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)
- [../../kuat-docs/setup/ownership-matrix.md](../../kuat-docs/setup/ownership-matrix.md)

<!-- end include: skills/shared/consumption-contract.md -->



Do not use memorized token values — read rules from `RULES_DIR`.

## Step 1 — Load rules index

Read `{RULES_DIR}/LOADING.md` when `RULES_SOURCE=git`, or `{RULES_DIR}/LOADING-consumer.md` when `RULES_SOURCE=package`. Load repo or package `AGENTS.md`. Load foundations, `{RULES_DIR}/roles/brand-reviewer.md` (role summary), and type-specific files per task type and Review load notes.

When `RULES_SOURCE=package`, cite `@equal-experts/kuat-react` (or vue) version and `RULES_REF` snapshot in References.

Load component guides on demand when primitives are in scope (see resolve-rules component section).

**Do not load** `{RULES_DIR}/types/web/product/examples/` for review-only tasks.

## Step 2 — Ask before reviewing (required)

Run intake in **one grouped message** before findings.

### Review depth

Ask the user to choose (do not assume `brand_compliance` for "review this feature"):

| Depth | Evaluates | Minimum context |
|-------|-----------|-----------------|
| `brand_compliance` | Tokens, logo, typography, spacing, accessibility | Artifacts only |
| `product_ux` | Task fit, copy, flows, empty/error states | Artifacts + product context |
| `full` | Brand + product UX + scenario rules | Above + research/insights |

### Universal intake

| # | Item |
|---|------|
| 1 | Task type (slides, web_product, …) |
| 2 | Review depth |
| 3 | Artifacts (files, URLs, Figma, screenshots) |
| 4 | Scenario (if known) |
| 5 | Audience / constraints |
| 6 | Output format — see **Reference: Report formats** below |
| 7 | Trello card (optional) — URL or ID for extra context; see **Optional integrations** |

### Type-specific context

| Task type | Load and ask per |
|-----------|------------------|
| **web_product** | `{RULES_DIR}/types/web/product/review-context.md` — **required** at `product_ux` or `full` (user story, research, constraints) |
| **slides** | `{RULES_DIR}/types/slides/README.md` — "Before you review" (scenario, audience, delivery mode) |

Never invent user stories or research conclusions.

If context is missing at `product_ux`/`full`, ask first; if the user proceeds, mark UX findings **provisional** and list assumptions under Open questions.

## Step 3 — Review

Apply type checklists when present:

- Slides: `{RULES_DIR}/types/slides/checklist.md`
- Web product: `{RULES_DIR}/types/web/product/review-checklist.md`
- Photography: `{RULES_DIR}/types/photography/quality-validation.md`

Cite `{RULES_DIR}/...` path and section for every violation. Flag rule vs user-request conflicts in output.

Do **not** produce a 1-shot review. Interrogate the artifacts from at least two product-team role perspectives (e.g. designer, engineer, content designer, accessibility specialist, product manager) and reconcile findings before writing the report. Use the role lens that best matches the task type.

## Step 4 — Deliver

Use the agreed output format. For `full_report`, follow **Reference: Report formats** below. Include `RULES_REF` in References.

If the chosen format calls for a file (rather than inline conversation), write it to `kuat review/<scope>-<YYYY-MM-DD>.md` (or `.html`) under the workspace root. Create the directory if it does not exist. Inline formats (e.g. `executive_summary`, `inline_annotations`) stay in the thread unless the user asks for a file.

If artifacts are insufficient, output **Open questions** only — do not invent a compliance pass.



<!-- begin include: skills/kuat-review/references/report-formats.md -->

## Reference: report formats

## Review output formats

Ask the user to select one format before producing findings. Default to `full_report` only if they decline to choose.

| Format | Use when |
|--------|----------|
| `full_report` | Structured Markdown (sections below) |
| `checklist_only` | Pass/fail by rule group |
| `violations_only` | Prioritized fix list (Critical / Major / Minor) |
| `inline_annotations` | Screen-by-screen or slide-by-slide notes in thread |
| `executive_summary` | Short narrative + top 3–5 risks |

## full_report sections

1. **Summary** — Scope, review depth, context received/missing, overall status, high-risk gaps
2. **Checklist** (optional) — Rule/Group | Status (Pass/Fail/Partial/N/A) | Notes
3. **Violations** — Severity | Rule | Evidence | Location | Fix
4. **Recommendations** — Non-blocking improvements; cite rule file
5. **Product/UX notes** — When depth ≥ `product_ux` and context supplied; else N/A with reason
6. **Open questions** — Missing context or artifacts
7. **References** — Rules files used + `RULES_REF` from ensure-rules

## Severity

| Severity | Definition |
|----------|------------|
| **Critical** | Brand or accessibility violations that must be fixed before release |
| **Major** | Clear rule breaks with user-facing impact |
| **Minor** | Nits, inconsistencies, or polish gaps |

<!-- end include: skills/kuat-review/references/report-formats.md -->



## Optional integrations

### Trello card

When the user supplied a Trello card in intake (item 7) or links the review to a card later:

1. **Read context** — use the Trello MCP. Read the tool schema first, then call `get_card` with `includeDetails: true` for the linked card. Treat the card as additional input, not a substitute for the user's stated scope.
2. **Post progress and findings** — after delivering the report, call `trello_add_comment` (schema first) with a short summary: overall status, top critical/major counts, report path under `kuat review/` (if a file was written), and any open questions.
3. **Auth** — prefer `TRELLO_API_KEY` and `TRELLO_TOKEN` from the environment when the tool supports it. Never paste secrets into the card or report.

If no card is supplied, skip this section entirely — do not invent a card or comment.

## Do not

- Generate mockups, rewritten copy, or code unless asked
- Assume full UX review without product context
- Skip intake when the user has not provided artifacts or depth

## Related skills

- Companion skill: `kuat-create` (separate bundled SKILL.md in `skills/dist/`)
- Rules standards: `{RULES_DIR}` — [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs)
- Bundle manifest: compare `RULES_REF` to `dist/manifest.json` → `rules.builtAtRef`

<!-- kuat-skill-bundle: kuat-review v1.0.0 rules-ref:3d4e1c1e5370 built:2026-05-21 -->
