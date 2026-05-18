# Install skills in Claude Code

## 1. Rules path

```bash
export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs
/path/to/kuat-agent-docs/skills/scripts/ensure-rules.sh
```

Or add `.kuat-rules-path` in your project root.

## 2. Install skills

**Option A — Reference source skills in CLAUDE.md** (repo with filesystem access):

```markdown
## Equal Experts brand skills

Review: /path/to/kuat-agent-docs/skills/kuat-review/SKILL.md
Create: /path/to/kuat-agent-docs/skills/kuat-create/SKILL.md
Run: skills/scripts/ensure-rules.sh (or set KUAT_RULES_PATH)
```

**Option B — Bundled single files** (paste or @-mention paths):

- `skills/dist/kuat-review/SKILL.md`
- `skills/dist/kuat-create/SKILL.md`

Regenerate: `npm run bundle:skills`

**Option C — Symlink** under `.claude/skills/` when supported (mirror Cursor layout).

## 3. Verify

Ask: *Create a client pitch slide deck.*

Expected: create skill procedure, scenario/audience/delivery questions, rules loaded from `RULES_DIR`.

## Related

- [cursor.md](./cursor.md) — Symlink pattern
- [../README.md](../README.md)
