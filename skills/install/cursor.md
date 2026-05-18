# Install skills in Cursor

## 1. Rules path

Clone or submodule [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs) and verify:

```bash
export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs
./skills/scripts/ensure-rules.sh
```

For a consumer repo, add `.kuat-rules-path` in the project root with one line pointing at the rules clone.

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
- Rules: KUAT_RULES_PATH or .kuat-rules-path → kuat-agent-docs
- Run KUAT_RULES_UPDATE=1 .../skills/scripts/ensure-rules.sh before brand work
```

## 4. Verify

Prompt: *Review this checkout feature for brand compliance.*

Expected: skill loads, ensure-rules runs or path resolves, grouped intake (depth, artifacts, user story, research, output format) before violations.

See [../README.md](../README.md) and [../../kuat-docs/setup/verification.md](../../kuat-docs/setup/verification.md).
