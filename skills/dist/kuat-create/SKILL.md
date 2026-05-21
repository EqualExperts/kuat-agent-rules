---
name: kuat-create
description: Create EE-branded slides, web UI, marketing content, graphics, or copy using kuat-agent-docs rules. Use when building or generating new Equal Experts branded artifacts. Always resolves up-to-date rules before creating.
---

# Equal Experts brand create

Produce new EE-branded artifacts following upstream rules and existing patterns.

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



## Step 1 — Load rules index

Read `{RULES_DIR}/LOADING.md` when `RULES_SOURCE=git`, or `{RULES_DIR}/LOADING-consumer.md` when `RULES_SOURCE=package`. Confirm **task type** and load:

1. Foundations (per LOADING row)
2. Create role card if any (e.g. `{RULES_DIR}/roles/technical-illustrator.md` for infographics)
3. Type-specific rules and optional scenarios
4. Component guides from package/overlay when building UI primitives (prefer over deprecated [examples](../../kuat-docs/rules/types/web/product/examples/))
5. `{RULES_DIR}/types/web/product/examples/` **only** for token/layout syntax when overlay docs are unavailable

## Step 2 — Pre-flight

Run type-specific **Before you create** guidance:

| Task type | Guidance |
|-----------|----------|
| **slides** | `{RULES_DIR}/types/slides/README.md` |
| **web_product** | `{RULES_DIR}/types/web/product/design.md` |
| **icons / infographics** | Role card + `{RULES_DIR}/types/graphics/` |
| **web_marketing** | `{RULES_DIR}/types/web/marketing/` + scenario when known |

If deliverable format is ambiguous, ask once: Figma, code, copy doc, deck file, etc.

## Step 3 — Create

- Search existing patterns first; do not invent layouts or components unless asked
- Use semantic tokens (`bg-primary`), not raw hex
- Follow type rules and scenarios over improvisation
- Ask if scenario, audience, or constraints are unclear

## Step 4 — Deliver

Run the type checklist before handoff (e.g. `{RULES_DIR}/types/slides/checklist.md`).

## Related skills

- Companion skill: `kuat-review` (separate bundled SKILL.md in `skills/dist/`)
- Rules standards: `{RULES_DIR}` — [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs)
- Bundle manifest: compare `RULES_REF` to `dist/manifest.json` → `rules.builtAtRef`

<!-- kuat-skill-bundle: kuat-create v1.0.0 rules-ref:f991487dc397 built:2026-05-21 -->
