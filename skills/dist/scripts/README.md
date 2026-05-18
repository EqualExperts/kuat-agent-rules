# Skills scripts

## ensure-rules.sh

Resolves the Equal Experts rules repository and prints paths for agents and humans.

```bash
# From repo root or any consumer project
/path/to/kuat-agent-docs/skills/scripts/ensure-rules.sh

# Update rules when behind upstream
KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh

# Pin to a specific ref
KUAT_RULES_REF=main KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh
```

**Output:**

```
RULES_ROOT=/path/to/kuat-agent-docs
RULES_DIR=/path/to/kuat-agent-docs/kuat-docs/rules
RULES_REF=abc1234...
```

See [../shared/resolve-rules.md](../shared/resolve-rules.md) for resolution order and environment variables.
