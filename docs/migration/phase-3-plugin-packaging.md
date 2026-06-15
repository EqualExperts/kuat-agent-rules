# Phase 3 — Plugin Packaging & Marketplace

**Repo / Claude Code project:** `kuat-agent-rules` (+ a small marketplace repo)
**Branch:** `migration/phase-3-plugin-packaging`
**Depends on:** Phase 2 merged (activity skills exist and pass evals)

> Run in plan mode first. Confirm current plugin/marketplace schema against the live docs (docs.claude.com → Claude Code → plugins / plugin-marketplaces) before writing manifests.

---

## Why this phase is more than "zip it up"

The Phase 2 skills were authored filesystem-first and **will not work installed as-is**. Two breakages must be fixed here (verified against current skill/plugin behaviour):

1. **Out-of-folder links don't survive install.** Skills reference `../../reference/...` and `../_shared/...` — paths *above/beside* the skill directory. On install, only a skill's own subtree travels and relative paths that escape the skill root don't resolve. Fix: bundle everything under one **plugin root** and rewrite those links to **`${CLAUDE_PLUGIN_ROOT}/...`** (the portable, install-safe mechanism).
2. **No `node_modules` / network in the Claude.ai skill VM.** `create-web-app` reads component docs from an installed `@equal-experts/kuat-*` package — impossible in a chat runtime. Fix: see the **two-bundle split** below (the dev bundle runs where the package *is* installed; the knowledge bundle has no code dependency).

Passing Phase 2 evals does **not** prove installability — those ran in the repo where `../../reference` resolves. **Re-run evals against the packaged/installed form** (see verification).

---

## Decision: two audience/runtime bundles, not one (confirmed with Ed)

Split by where the skill is actually used. Both bundles are built from the **single** `kuat-agent-rules/skills/` source — this is a *packaging* split, not a repo split.

| Bundle | Skills | Runtime / audience | Reference | Components |
|--------|--------|--------------------|-----------|-----------|
| **`kuat-build`** (dev) | `create-web-app`, `review-web-app` | Claude Code / Cowork — EE engineers (real project, shell, `node_modules`, network) | `${CLAUDE_PLUGIN_ROOT}/reference` snapshot | **Read live** from the installed `@equal-experts/kuat-*` package `agent-docs/components/` — fresh to the pinned version; no snapshot, no MCP needed |
| **`kuat-studio`** (knowledge) | `create-presentation`, `review-presentation`, `create-imagery` | Broad consultant audience | `${CLAUDE_PLUGIN_ROOT}/reference` snapshot | none (no code dependency) |

### Platform — decided: Cowork / Claude Code plugins across the board

The whole programme is delivered through Cowork, and Phases 6–7 *require* it (live MCP connectors; repo-local skills). So all bundles ship as **Claude Code / Cowork plugins** via the marketplace, using `${CLAUDE_PLUGIN_ROOT}` links. **No self-contained-ZIP variant is built.**

Revisit **only** if a material group of consultants turns out to be on **plain Claude.ai web with no Cowork** — in which case `build-plugin` would additionally emit per-skill self-contained ZIPs for the document bundle (reference slices copied into each skill). Until then, treat as settled.

### Open decision (resolve at start, log it)

**Bundle names** — the placeholders `kuat-build` / `kuat-studio` are dropped; pick the real, user-facing marketplace names before building.

---

## Deliverables

### In `kuat-agent-rules`

1. **Two plugin manifests** — `.claude-plugin/plugin.json` for `kuat-build` and `kuat-studio` (separate plugin dirs, or one repo emitting both). Each: pinned `version` (start `1.0.0`), `description`, `author` (EE), declaring its skill subset.
2. **Link rewrite** — convert every `../../reference/...` and `../_shared/...` pointer in the activity skills to **`${CLAUDE_PLUGIN_ROOT}/reference/...`** / `${CLAUDE_PLUGIN_ROOT}/skills/_shared/...`. This is the core fix that makes them installable.
3. **`scripts/build-plugin.mjs`** — assembles each bundle: copies its skill subset + `_shared` + a **`reference/` snapshot** under the plugin root; stamps reference git SHA + plugin version into a per-plugin `manifest.json` (mirror kuat-mono's bundling). For the dev bundle, **do not** bundle component docs — it reads them live. If the checkpoint says web Skills, also emit self-contained ZIPs for the document bundle. **Guard:** package **only** the distributable root `skills/`; **never** `.claude/skills/` — that path is reserved for repo-local **contributor** skills (Phase 7), which must never enter any Enterprise bundle.
4. **Optional `commands/`** — e.g. `/kuat-presentation`, `/kuat-review` as explicit entry points.
5. **Retire for the plugin path:** `ensure-rules.sh`, the five-step resolver, `resolve-rules.md`, `consumption-contract.md`, `{{include}}` bundler, most of `setup/` — move to `legacy/` if the IDE/npm dev path still needs them; log it.
6. **`CHANGELOG.md`** per plugin (drives release notes).

### In the marketplace repo

7. **`.claude-plugin/marketplace.json`** listing **both** plugins, each with `beta` + `stable` entries resolving to *distinct* version strings (same string on two refs → Claude skips the update).
8. **`managed-settings.json` examples** — `extraKnownMarketplaces` (auto-register), `strictKnownMarketplaces` (lock sources), `defaultEnabled`, plus **audience targeting**: `kuat-build` to engineering groups, `kuat-studio` org-wide. Document the private-repo auth token for background auto-updates.

---

## Tasks

1. Branch + log; resolve the checkpoint decision; verify schema against current docs.
2. **Rewrite the skill links** to `${CLAUDE_PLUGIN_ROOT}/...`; confirm none escape the plugin root.
3. Write both `plugin.json`s; set `version` **only** in `plugin.json`, never also in the marketplace entry.
4. Build `build-plugin.mjs` → produce both plugin payloads (reference snapshot + skill subset + `_shared` + manifest); component docs bundled for **neither** (`kuat-build` reads live; `kuat-studio` has none).
5. Marketplace repo: `marketplace.json` with both plugins × `beta`/`stable`; managed-settings examples with audience targeting.
6. Quarantine/retire the runtime resolution machinery for the plugin path.
7. **Packaged-form verification** (below).

---

## Acceptance criteria

- Both plugins install from the marketplace in a clean account with **zero setup**; `${CLAUDE_PLUGIN_ROOT}` links all resolve (no dangling `../../`).
- **`kuat-build`** verified **in a Claude Code project with `@equal-experts/kuat-*` installed**: `create-web-app` resolves component docs **live** from the package and falls back + flags when one is missing.
- **`kuat-studio`** verified in the target consultant runtime: skills trigger and produce on-brand output using only the bundled reference (no external resolution, no shell needed).
- **Eval set re-run against the installed form** (not the repo) — 5/5 still pass.
- `version` declared once per plugin (`plugin.json`); `beta`/`stable` resolve to distinct versions; `/plugin update` moves between them.
- Managed-settings examples pre-register the marketplace and install the right plugin per audience without manual `/plugin marketplace add`.

---

## Report back

Fill `docs/migration/report-phase-3.md`. Capture: the checkpoint decision (consultant runtime) + rationale; both manifests + marketplace + managed-settings; the link-rewrite; the `build-plugin` flow per bundle; the **packaged-form eval results** (per bundle, incl. `kuat-build`'s live-component test); what was retired vs kept for the dev path; version/channel mapping. Feeds **Phase 4 (pilot on `beta`)** — note pilot cohorts per bundle.
