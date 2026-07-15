# Resolve Rules (mandatory)

Every Equal Experts brand skill **must** resolve and verify the rules location before loading rule content. Do not rely on memory of tokens, colours, or patterns.

---

## Variables

| Variable | Meaning |
|----------|---------|
| `RULES_ROOT` | Git repo root or npm package root (`@equal-experts/kuat-react`) |
| `RULES_DIR` | `{RULES_ROOT}/reference` (git) or `{RULES_ROOT}/agent-docs/rules` (package) |
| `RULES_REF` | Git SHA, or `manifest.json` `rules.snapshotRef` for packages |
| `RULES_SOURCE` | `git`, `package`, or `connector` (no filesystem — see Step 0 below) |
| `PACKAGE_VERSION` | Installed package version when `RULES_SOURCE=package` |
| `OVERLAY_DIR` | Set when `KUAT_RULES_OVERLAY_PATH` is valid |
| `COMPONENT_MANIFEST` | Path to `components.manifest.json` when present |

---

## Resolution order

### Step 0 — Environment check (do this first)

Before trying any of the filesystem/package steps below, confirm whether you can run shell commands
or read local paths at all. **In the Figma agent (Design files) and Figma Make, you cannot** — there
is no shell, no environment variables, no `node_modules`, no project root to place a
`.kuat-rules-path` file in. Steps 1-5 below do not apply there, and telling the user to set
`KUAT_RULES_PATH` or install an npm package is not actionable advice in that surface.

If shell/filesystem access is unavailable:

1. Set `RULES_SOURCE=connector`.
2. Check this prompt (and recent conversation turns) for rules content already supplied: a connector
   reference (e.g. `@Notion`, `@Drive`) pointing at a mirrored copy of the `reference/` library, rules
   text/files pasted or attached directly, or — in Figma Make specifically — a selected **Make kit**'s
   own `guidelines/` files (`Guidelines.md`, `setup.md`, `tokens.md`, `components/`). A Make kit's
   guidelines are a stronger, more authoritative source than an ad-hoc connector (they're
   design-system-authored, not just linked) — if one is active for the session, treat it as the
   primary source and don't ask the user for a connector on top of it.
3. If found, treat that content as `RULES_DIR` for this session and cite the connector/attachment/kit
   (not a git path) as the source in place of `RULES_REF`.
4. If not found, **stop and ask the user** to either pair a connector with rules content in the same
   prompt, or paste/attach the relevant reference doc(s) (e.g. `design.md`, `colours.md`) directly —
   per [figma-agent.md](../install/figma-agent.md#step-3--pair-with-a-connector-for-live-rules). Do
   **not** point them at `KUAT_RULES_PATH`, `.kuat-rules-path`, or `node_modules` install steps; none
   of those are things a person can act on from inside a Figma chat.

If shell/filesystem access **is** available (Cursor, Claude Code, Claude Projects with uploaded files,
a repo checkout), run [ensure-rules.sh](../scripts/ensure-rules.sh) when shell is available. Otherwise
try in order:

1. **`KUAT_RULES_PATH`** — git repo (`reference/README.md`) or package root (`agent-docs/`)
2. **`.kuat-rules-path`** — in cwd or git root
3. **npm package** — walk up from cwd: `node_modules/@equal-experts/kuat-{react,vue,core}` with `agent-docs/rules/LOADING-consumer.md`
4. **Sibling git paths:** `kuat-agent-docs`, `vendor/kuat-agent-docs`, `../kuat-agent-docs`
5. **Skills co-located** — parent of `skills/` in `kuat-agent-docs`

If none of steps 1-5 resolve, stop and direct the user to [skills/README.md](../README.md#install-rules).

### Loading index by source

Loading is **per-skill** (each skill names the `reference/` slices it needs); there is no global loading taxonomy.

| `RULES_SOURCE` | Start from | Then |
|----------------|------------|------|
| `git` | `{RULES_DIR}/README.md` (passive structure index) | Load the slices the active skill points to |
| `package` | `{RULES_DIR}/LOADING-consumer.md` (bundled web + foundations) | Per the consumer snapshot |
| `connector` | Whatever slice the connector/attachment actually contains | Load only what was supplied — do not assume the full library is present, and say so in output |

---

## Freshness

| `RULES_SOURCE` | Action |
|----------------|--------|
| `git` | `KUAT_RULES_REF` pin; `KUAT_RULES_UPDATE=1` to pull/checkout |
| `package` | Rules pinned to installed version; override with `KUAT_RULES_PATH` to git clone for latest upstream |
| `connector` | No pinning available — freshness depends on whoever maintains the connector's source doc; flag this as a limitation in output rather than asserting currency |

---

## Local overlay (library / mono)

After rules are resolved, load overlay second when `KUAT_RULES_OVERLAY_PATH` is set:

- Typical: `kuat-mono/kuat-docs` for contributors
- Resolve component IDs via `COMPONENT_MANIFEST` → `components/{slug}.md`

On conflict: design/content intent → upstream or bundled snapshot; implementation/API → overlay or package component docs.

See [consumption-contract.md](./consumption-contract.md) and [kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md).

---

## Component docs on demand

When a scenario or artifact references a component ID (e.g. `shadcn:button`):

1. Read [component-registry.md](../../reference/media-types/web-product/component-registry.md) for slug mapping.
2. Load doc from `{RULES_ROOT}/agent-docs/components/{slug}.md` or `{OVERLAY_DIR}/components/{slug}.md`.

Do not load the full component catalog unless multiple primitives are in scope.

---

## Related

- [consumption-contract.md](./consumption-contract.md)
- [../scripts/README.md](../scripts/README.md)
- [reference library](../../reference/README.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)
