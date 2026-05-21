# kuat-mono implementation plan — multi-entry rules architecture

**Branch:** `feat/multi-entry-rules-architecture` (from `master`)

**Upstream dependency:** `kuat-agent-docs` branch `feat/multi-entry-rules-architecture` (or tag once merged) — provides consumption architecture, component registry IDs, and updated `ensure-rules.sh`.

Execute this runbook in [kuat-mono](https://github.com/EqualExperts/kuat-mono) with an agent or contributor checklist.

---

## Phase 0 — Branch and pin upstream

```bash
git checkout -b feat/multi-entry-rules-architecture
```

1. Submodule or clone `kuat-agent-docs` at `external/kuat-agent-docs` (or `vendor/kuat-agent-docs`).
2. Pin to matching ref when agent-docs PR merges.
3. Record SHA in mono `kuat-docs/manifest.json` (create) for bundle script input.

---

## Phase 1 — Skills install

From pinned `kuat-agent-docs` clone:

### Cursor

```bash
MONO_ROOT="$(pwd)"
AGENT_DOCS="${MONO_ROOT}/external/kuat-agent-docs"  # adjust path

ln -sf "${AGENT_DOCS}/skills/kuat-review" ~/.cursor/skills/kuat-review
ln -sf "${AGENT_DOCS}/skills/kuat-create" ~/.cursor/skills/kuat-create
```

### Claude Code

Add to mono root `CLAUDE.md` (snippet from agent-docs `kuat-docs/setup/integration.md`):

- Review/create skill paths
- `KUAT_RULES_PATH` → agent-docs clone
- `KUAT_RULES_OVERLAY_PATH` → `${MONO_ROOT}/kuat-docs`

### Contributor path files

**`.kuat-rules-path`** (mono root, one line):

```text
/absolute/path/to/kuat-agent-docs
```

**Environment (shell profile or `.env.local`):**

```bash
export KUAT_RULES_OVERLAY_PATH=/absolute/path/to/kuat-mono/kuat-docs
```

### Verify

```bash
cd "${MONO_ROOT}"
"${AGENT_DOCS}/skills/scripts/ensure-rules.sh"
```

Expected: `RULES_SOURCE=git`, `OVERLAY_DIR=.../kuat-mono/kuat-docs`

---

## Phase 2 — Bundle script (`scripts/bundle-agent-docs.mjs`)

Create Node script invoked before `npm publish` / in CI:

### Inputs

- `KUAT_AGENT_DOCS_ROOT` — path to pinned agent-docs clone
- `KUAT_MONO_ROOT` — repo root
- Package version from `packages/kuat-react/package.json`

### Allowlist (copy from agent-docs)

- `kuat-docs/rules/foundations/**`
- `kuat-docs/rules/types/web/product/**` **excluding** `examples/` (deprecated upstream)
- `kuat-docs/rules/types/web/marketing/**` (core files + `content/`; skip optional heavy paths if size critical)
- `kuat-docs/rules/roles/brand-reviewer.md`

### Outputs (identical in both packages)

- `packages/kuat-react/agent-docs/rules/` — snapshot
- `packages/kuat-vue/agent-docs/rules/` — same snapshot
- `packages/*/agent-docs/components/` — from `kuat-mono/kuat-docs/components/`
- `packages/*/agent-docs/components.manifest.json`
- `packages/*/agent-docs/manifest.json`:

```json
{
  "packageVersion": "0.6.0",
  "rules": {
    "snapshotRef": "<agent-docs git SHA>",
    "snapshotDate": "ISO-8601",
    "sourceRepo": "equalexperts/kuat-agent-docs",
    "loadingPath": "agent-docs/rules/LOADING-consumer.md"
  }
}
```

- `packages/*/agent-docs/AGENTS.md` — consumer entry (short; points to LOADING-consumer)
- Generate `LOADING-consumer.md` — narrow index (web_product + web_marketing + foundations; link full upstream for slides)

### package.json

Both `packages/kuat-react/package.json` and `packages/kuat-vue/package.json`:

```json
"files": ["dist", "agent-docs", "README.md"],
"scripts": {
  "bundle-agent-docs": "node ../../scripts/bundle-agent-docs.mjs"
},
"prepublishOnly": "pnpm run bundle-agent-docs"
```

Root `package.json` / turbo: wire `bundle-agent-docs` into release pipeline.

---

## Phase 3 — Component documentation (pilot)

Under **`kuat-docs/components/`**:

| File | ID |
|------|-----|
| `_template.md` | — |
| `button.md` | `shadcn:button` |
| `button-group.md` | `kuat:button-group` |
| `kuat-header.md` | `kuat:kuat-header` |

Use structure from agent-docs `kuat-docs/.tmp/documentation-agent.md` (move to `contribution-docs/component-documentation-agent.md`).

**`kuat-docs/components.manifest.json`:**

```json
{
  "components": {
    "shadcn:button": { "path": "components/button.md", "slug": "button" },
    "kuat:button-group": { "path": "components/button-group.md", "slug": "button-group" },
    "kuat:kuat-header": { "path": "components/kuat-header.md", "slug": "kuat-header" }
  }
}
```

Align IDs with upstream [component-registry.md](https://github.com/equalexperts/kuat-agent-docs/blob/main/kuat-docs/rules/types/web/product/component-registry.md).

Optional: `button.react.md`, `button.vue.md` annexes with imports and Storybook story links.

---

## Phase 4 — Mono AGENTS and LOADING

### Root `AGENTS.md`

- Contributor entry: git upstream + overlay
- Link agent-docs `consumption-architecture.md`
- List `.cursor/agents/` (kuat-documentation, kuat-component-dev)

### `kuat-docs/LOADING.md`

- Contributor paths (overlay, contribution-docs)
- Consumer paths (bundled in package)
- Component manifest loading (on demand)

### `.cursor/agents/`

Update kuat-documentation agent to author `kuat-docs/components/` using `contribution-docs/component-documentation-agent.md`.

---

## Phase 5 — Redundancy audit (`kuat-docs/DEPRECATIONS.md`)

Audit and document:

| Candidate | Action |
|-----------|--------|
| Full duplicate of agent-docs rules tree under `kuat-docs/rules/` | Remove or replace with pointer to upstream/submodule |
| `cursorrules.old.md` | Delete or archive |
| Duplicate consumer setup in `contribution-docs` vs `packages/kuat-react/README` | Consolidate to package README + `agent-docs/AGENTS.md` |
| Storybook-only docs | Keep; supplement with `components/*.md` |
| Local web examples overlapping component docs | Deprecate with banner |

PR description must list every removed/redirected path.

---

## Phase 6 — Test consumer app

Update **`apps/test-consumer-react`**:

1. No `.kuat-rules-path` (package-only test).
2. `.cursorrules` references `node_modules/@equal-experts/kuat-react/agent-docs/AGENTS.md`.
3. After `pnpm install` + local `pnpm link` or workspace package, run `ensure-rules.sh` from test app cwd → `RULES_SOURCE=package`.

---

## Phase 7 — Verification checklist

- [ ] `pnpm run bundle-agent-docs` writes identical trees to react/vue packages
- [ ] `npm pack` in `packages/kuat-react` includes `agent-docs/`
- [ ] `manifest.json` `rules.snapshotRef` matches pinned agent-docs SHA
- [ ] Skills symlinks work from mono root (`RULES_SOURCE=git`, overlay set)
- [ ] Test app resolves package rules without git clone
- [ ] Pilot component docs match Storybook/props for Button, ButtonGroup, KuatHeader
- [ ] `kuat-docs/DEPRECATIONS.md` complete
- [ ] Open PR; cross-link agent-docs PR

---

## Out of scope (mono follow-up)

- Full shadcn primitive catalog
- Automated CI diff vs agent-docs allowlist
- `@equal-experts/kuat-agent-rules` standalone package

---

## Related

- [consumption-architecture.md](./consumption-architecture.md)
- [ownership-matrix.md](./ownership-matrix.md)
- [skills/INSTALL.md](../../skills/INSTALL.md)
