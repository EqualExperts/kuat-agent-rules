# Equal Experts brand skills

Tool-agnostic agent skills for **reviewing** and **creating** EE-branded work. Skills handle session orchestration (intake, output format, load procedure). Brand and design **standards** live in [`kuat-docs/rules/`](../kuat-docs/rules/).

This directory is staged in `kuat-agent-docs` for testing; it may be extracted to a standalone `kuat-agent-skills` repository later. Skill IDs and install paths will stay the same.

---

## Installation

**Human setup and testing:** [INSTALL.md](./INSTALL.md)

## Skills

| Skill | Source (edit) | Bundled (upload) | Use when |
|-------|---------------|------------------|----------|
| **kuat-review** | [kuat-review/](./kuat-review/) | [dist/kuat-review/SKILL.md](./dist/kuat-review/SKILL.md) | Auditing existing work |
| **kuat-create** | [kuat-create/](./kuat-create/) | [dist/kuat-create/SKILL.md](./dist/kuat-create/SKILL.md) | Producing new artifacts |

**Filesystem tools** (Cursor, Claude Code, Codex): symlink **source** skill folders.

**Upload-only tools** (Claude Projects, single-file APIs): upload **`dist/*/SKILL.md`** — self-contained, shared content inlined.

---

## Bundle (Option C)

Regenerate standalone skill files after editing source:

```bash
npm run bundle:skills
# or: node skills/scripts/bundle-skills.mjs
```

Output: [`dist/`](./dist/) — `manifest.json` records `rules.builtAtRef` for freshness checks. See [scripts/README.md](./scripts/README.md).

---

## Quick start

### 1. Install rules {#install-rules}

You need a checkout of this repo (or `kuat-agent-docs`) with `kuat-docs/rules/LOADING.md`.

```bash
git clone https://github.com/equalexperts/kuat-agent-docs.git
cd kuat-agent-docs
./skills/scripts/ensure-rules.sh
```

**Consumer repo (e.g. kuat-mono):** point at the rules clone:

```bash
export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs
# or create .kuat-rules-path in project root with one line: /path/to/kuat-agent-docs
```

### 2. Keep rules up to date

Before each review or create session, skills require fresh rules:

```bash
KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh
```

Agents without shell access must read `LOADING.md` from a known path and cite `RULES_REF` in output, or ask the user to run the script.

### 3. Install skills in your AI tool

| Tool | Guide |
|------|--------|
| Cursor | [install/cursor.md](./install/cursor.md) |
| Claude Code | [install/claude-code.md](./install/claude-code.md) |
| Claude Projects | [install/claude-projects.md](./install/claude-projects.md) |
| Codex | [install/codex.md](./install/codex.md) |

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `KUAT_RULES_PATH` | Absolute path to rules repo root (contains `kuat-docs/rules/LOADING.md`) |
| `KUAT_RULES_OVERLAY_PATH` | Optional local implementation overlay (consumer repo) |
| `KUAT_RULES_REF` | Pin rules to git tag or SHA |
| `KUAT_RULES_UPDATE` | Set to `1` to `git pull` or checkout pinned ref when stale |

Resolution order: [shared/resolve-rules.md](./shared/resolve-rules.md).

---

## For agents

1. Load the skill matching intent (`kuat-review` or `kuat-create`) — use **`dist/`** bundles when relative includes are unavailable.
2. Run [shared/resolve-rules.md](./shared/resolve-rules.md) (or inlined copy in bundle) — execute `ensure-rules.sh` when possible.
3. Read `{RULES_DIR}/LOADING.md` and load files per task type.
4. Compare `RULES_REF` to `dist/manifest.json` → `rules.builtAtRef` when rules may be stale.
5. Follow skill-specific intake before producing output.

See [AGENTS.md](./AGENTS.md).

---

## Related

- [kuat-docs/rules/LOADING.md](../kuat-docs/rules/LOADING.md) — Task → rule files
- [AGENTS.md](../AGENTS.md) — Repo entry point
- [kuat-docs/setup/integration.md](../kuat-docs/setup/integration.md) — IDE integration
