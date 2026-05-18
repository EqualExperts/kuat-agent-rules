---
name: kuat-create
description: Create Equal Experts branded slides, web UI, marketing content, graphics, or copy using kuat-agent-docs rules. Use when building or generating new Equal Experts branded artifacts. Always resolves up-to-date rules before creating.
---

# Equal Experts brand create

Produce new Equal Experts compliant artifacts following upstream rules and existing patterns.

## Step 0 — Resolve rules (mandatory)



<!-- begin include: skills/shared/resolve-rules.md -->

## Shared: resolve rules

## Resolve Rules (mandatory)

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

If none resolve, stop and direct the user to [skills/README.md](set KUAT_RULES_PATH or .kuat-rules-path — see skills README).

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

See **Shared: consumption contract** (included above). On conflict: design/content intent → upstream rules; implementation/API/testing → local overlay.

---

## Related

- [consumption-contract.md](./consumption-contract.md)
- [../scripts/README.md](skills/scripts/README.md in rules repo)
- [../../kuat-docs/rules/LOADING.md]({RULES_DIR}/LOADING.md)

<!-- end include: skills/shared/resolve-rules.md -->



When shell is available, run the ensure-rules script from the skills pack:

```bash
/path/to/skills/scripts/ensure-rules.sh
```

Use printed `RULES_ROOT`, `RULES_DIR`, and `RULES_REF`.



<!-- begin include: skills/shared/consumption-contract.md -->

## Shared: consumption contract

## Rules consumption contract

When skills are used from a consumer implementation repository (for example `kuat-mono`):

## Load order

1. Resolve upstream rules (`RULES_DIR`) — see [resolve-rules.md](above: Shared — Resolve rules)
2. Load local implementation overlay when `KUAT_RULES_OVERLAY_PATH` is set or documented in the consumer repo
3. Run the skill procedure (review or create)

## Conflict policy

| Topic | Canonical source |
|-------|------------------|
| Design, structure, content intent | Upstream rules (`kuat-agent-docs`) |
| Implementation, API, testing, build | Local consumer repo |
| Ambiguous implementation behaviour | Runtime evidence: tests → Storybook → package exports → source |

## Platform isolation

Load only the task type's rules from `types/` plus `foundations/`. Do not mix slides rules with web product rules in one session.

## Related

- [../../AGENTS.md]({RULES_ROOT}/AGENTS.md)
- [../../kuat-docs/rules/LOADING.md]({RULES_DIR}/LOADING.md)

<!-- end include: skills/shared/consumption-contract.md -->



## Step 1 — Load rules index

Read `{RULES_DIR}/LOADING.md`. Confirm **task type** and load:

1. Foundations (per LOADING row)
2. Create role card if any (e.g. `{RULES_DIR}/roles/technical-illustrator.md` for infographics)
3. Type-specific rules and optional scenarios
4. `{RULES_DIR}/types/web/product/examples/` **only** when implementing code in React, Vue, or CSS

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

<!-- kuat-skill-bundle: kuat-create v1.0.0 rules-ref:2db943c5c5b3 built:2026-05-18 -->
