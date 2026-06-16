# Local Validation Runbook (no marketplace needed)

Prove the Phase-3 bundles work installed — `${CLAUDE_PLUGIN_ROOT}` resolution and `kuat-build`'s live component read — using `claude --plugin-dir`, before any marketplace/org effort. This is Phase 4 · Step 0.

Plugin paths (absolute):
- `/Users/eford/Claude/Projects/Kuat/kuat-agent-rules/plugins/kuat-build`
- `/Users/eford/Claude/Projects/Kuat/kuat-agent-rules/plugins/kuat-studio`

> Make sure the link-text fix is built first (it is — `verify-plugins.mjs` = ALL CHECKS PASSED on branch `fix/plugin-link-text`). If you rebuild, re-run `node skills/scripts/verify-plugins.mjs`.

---

## Track A — `kuat-studio` (no project needed)

Proves: skills trigger, `${CLAUDE_PLUGIN_ROOT}` links resolve, on-brand output from the bundled reference alone.

1. Open a terminal in a **neutral folder** (e.g. `~/kuat-test`) — *not* inside `kuat-agent-rules`, so the repo's own source `skills/` can't muddy the test.
2. Load the plugin for the session:
   ```bash
   claude --plugin-dir /Users/eford/Claude/Projects/Kuat/kuat-agent-rules/plugins/kuat-studio
   ```
3. Confirm it loaded — `/help` should show kuat-studio entries, and `/plugin` should list `kuat-studio`. If not, see Troubleshooting below.
4. **Trigger it — prefer natural language** (this is the real test of the skill's trigger description), e.g. *"Make me a knowledge-sharing deck outline on <topic>."* The `create-presentation` skill should auto-activate; no slash command needed.
   - Slash commands (`/presentation`, or namespaced `/kuat-studio:presentation`) are convenience entry points only — and can be flaky to register under `--plugin-dir`. Don't rely on them for the test.
5. **Prove resolution:** ask *"which reference files did you load, and from what paths?"* — expect paths under the plugin dir's `reference/...`, with **no file-not-found**.

**Pass:** skill triggers, loads bundled reference, produces on-brand output; no broken/missing links.

---

## Track B — `kuat-build` (needs a real project)

Proves: the **live component read** from an installed package + the graceful fallback. This is the criterion Phase 3 couldn't verify.

**Prerequisite — a project where `@equal-experts/*` resolves.** Easiest is kuat-mono itself (packages are local workspaces); its `node_modules` currently has no `@equal-experts` scope linked, so:

```bash
cd /Users/eford/Claude/Projects/Kuat/kuat-mono
pnpm install        # links node_modules/@equal-experts/kuat-react → packages/kuat-react (carries agent-docs/components/)
ls node_modules/@equal-experts/kuat-react/agent-docs/components/   # expect button.md, button-group.md, kuat-header.md
```

(Alternative: a scratch app — `npm init -y && npm i @equal-experts/kuat-react` — if the package is reachable from your npm registry.)

1. From the kuat-mono root, load the dev bundle:
   ```bash
   claude --plugin-dir /Users/eford/Claude/Projects/Kuat/kuat-agent-rules/plugins/kuat-build
   ```
2. **Live read:** trigger `create-web-app` with natural language — *"Build a sign-in form using the Kuat button."* (slash `/web-app` is optional/convenience). Then ask *"which component guide did you read, and from what path?"* — expect it to resolve `shadcn:button` → `node_modules/@equal-experts/kuat-react/agent-docs/components/button.md` (the live read).
3. **Fallback:** ask for a component that doesn't exist (e.g. "add a date-range picker component"). Expect it to **name the missing component ID, fall back to documented patterns, and flag the gap** — never invent an API.

**Pass:** live read resolves from the installed package; missing-component path flags + falls back.

---

## Iterating & install-fidelity

- After editing a skill/reference, rebuild (`node skills/scripts/build-plugin.mjs`) and `/reload-plugins` in the session.
- For a closer-to-real install (copies to the local cache): `claude plugin install /Users/eford/Claude/Projects/Kuat/kuat-agent-rules/plugins/kuat-studio --scope local`.

## What this does NOT cover (needs the marketplace)

Org auto-registration (`extraKnownMarketplaces`), background auto-updates, and channel promotion across users. Stand the marketplace up **only after** both tracks pass — at that point it's pure distribution mechanics.
