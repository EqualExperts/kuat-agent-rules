# Install skills in Cursor

## 1. Rules path

Clone or submodule [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs) and verify:

```bash
export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs
./skills/scripts/ensure-rules.sh
```

| Context | Rules |
|---------|--------|
| Org / full taxonomy | `.kuat-rules-path` → `kuat-agent-docs` clone |
| `kuat-mono` contributor | `.kuat-rules-path` + `KUAT_RULES_OVERLAY_PATH` → mono `kuat-docs/` |
| App (npm) | `node_modules/@equal-experts/kuat-react/agent-docs/AGENTS.md` (no clone once package ships `agent-docs/`) |

See [consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md).

## 2. Install skills

**Recommended (editable, shared files work):** symlink **source** folders:

```bash
ln -sf /path/to/kuat-agent-docs/skills/kuat-review ~/.cursor/skills/kuat-review
ln -sf /path/to/kuat-agent-docs/skills/kuat-create ~/.cursor/skills/kuat-create
```

**Alternative:** symlink bundled single-file skills from `skills/dist/` (fully self-contained).

After extracting skills to a separate repo, symlink from that repo instead.

## 3. Project rules snippet (optional)

Add to `.cursorrules` or `CLAUDE.md` in consumer projects:

```markdown
## Equal Experts brand

- Review: use skill `kuat-review`
- Create: use skill `kuat-create`
- Rules: ensure-rules.sh → RULES_SOURCE=git or package
- App: point at kuat-react agent-docs/AGENTS.md when using npm only
```

## 4. Verify

Prompt: *Review this checkout feature for brand compliance.*

Expected: skill loads, ensure-rules runs or path resolves, grouped intake (depth, artifacts, user story, research, output format) before violations.

See [../README.md](../README.md) and [../../kuat-docs/setup/verification.md](../../kuat-docs/setup/verification.md).
