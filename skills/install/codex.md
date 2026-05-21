# Install skills in Codex

## 1. Rules path

```bash
export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs
kuat-agent-docs/skills/scripts/ensure-rules.sh
```

Expect `RULES_SOURCE=git` or `package` when using npm — see [consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md).

## 2. Install skills

Symlink **source** skill folders (or `dist/` for single-file bundles):

```bash
ln -sf /path/to/kuat-agent-docs/skills/kuat-review ~/.codex/skills/kuat-review
ln -sf /path/to/kuat-agent-docs/skills/kuat-create ~/.codex/skills/kuat-create
```

The legacy **`agent-rules-design-review`** skill should delegate to `kuat-review` — see that skill's `SKILL.md` in `~/.codex/skills/agent-rules-design-review/`.

## 3. Keep rules fresh

```bash
KUAT_RULES_UPDATE=1 ~/.codex/skills/kuat-review/../scripts/ensure-rules.sh
```

Or from the rules repo: `KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh`

Pin reviews with `KUAT_RULES_REF=<sha>`.

## 4. Verify

Prompt: *Review this web feature against EE brand rules.*

Expected: resolve rules, grouped intake including user story/research at product_ux depth.

## Related

- [cursor.md](./cursor.md)
- [../README.md](../README.md)
