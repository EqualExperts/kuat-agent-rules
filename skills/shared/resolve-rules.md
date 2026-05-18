# Resolve Rules (mandatory)

Every Equal Experts brand skill **must** resolve and verify the rules location before loading rule content. Do not rely on memory of tokens, colours, or patterns.

---

## Variables

| Variable | Meaning |
|----------|---------|
| `RULES_ROOT` | Root of the rules repository (contains `kuat-docs/rules/LOADING.md`) |
| `RULES_DIR` | `{RULES_ROOT}/kuat-docs/rules` |
| `RULES_REF` | Git commit SHA or tag in use (cite in review References) |

---

## Resolution order

Try in order; stop at the first valid path (directory contains `kuat-docs/rules/LOADING.md`):

1. **`KUAT_RULES_PATH`** — environment variable (absolute path to rules repo root)
2. **`.kuat-rules-path`** — file in current working directory, then git repository root; single line, absolute or relative path
3. **Common sibling paths** from cwd: `kuat-agent-docs`, `vendor/kuat-agent-docs`, `../kuat-agent-docs`
4. **Skills co-located with rules** — if this skill lives in `kuat-agent-docs/skills/`, use parent of `skills/` as `RULES_ROOT`

If none resolve, stop and direct the user to [skills/README.md](../README.md#install-rules).

---

## Freshness

Before a review or create session:

| Method | Action |
|--------|--------|
| **Shell available** | Run `skills/scripts/ensure-rules.sh` from any cwd (script locates itself). Use printed `RULES_ROOT` and `RULES_REF`. |
| **No shell** | Read `{RULES_DIR}/LOADING.md` directly if path is known; note ref from `.git/HEAD` if visible; ask user to run ensure-rules if unsure |
| **Pin** | Set `KUAT_RULES_REF` to a tag or SHA; script validates or checks out when `KUAT_RULES_UPDATE=1` |

Set `KUAT_RULES_UPDATE=1` to allow `git pull` when the rules checkout is behind its upstream.

---

## Local overlay (consumer repos)

After upstream rules are resolved, load a **local implementation overlay** second when present:

- Env: `KUAT_RULES_OVERLAY_PATH` — path to consumer repo overlay rules
- Common: `kuat-mono` or project-specific `.cursor/rules/` overlay

See [consumption-contract.md](./consumption-contract.md). On conflict: design/content intent → upstream rules; implementation/API/testing → local overlay.

---

## Related

- [consumption-contract.md](./consumption-contract.md)
- [../scripts/README.md](../scripts/README.md)
- [../../kuat-docs/rules/LOADING.md](../../kuat-docs/rules/LOADING.md)
