# Phase 3 — Plugin Packaging & Marketplace

**Repo / Claude Code project:** `kuat-agent-rules` (+ a small marketplace repo)
**Branch:** `migration/phase-3-plugin-packaging`
**Depends on:** Phase 2 merged (activity skills exist and pass evals)

> Run in plan mode first. Confirm current plugin/marketplace schema against the live docs (docs.claude.com → Claude Code → plugins / plugin-marketplaces) before writing manifests, in case fields changed.

---

## Objective

Package the activity skills + a pinned reference snapshot as the **"Kuat" Claude Enterprise plugin**, and stand up an **EE marketplace** with **beta/stable channels** and **managed-settings pre-registration**. Retire the runtime resolution machinery for the plugin audience.

Strategy (architecture §7 / §7.1): **pinned semver + beta/stable channel split + pre-registration via managed settings.**

---

## Deliverables

### In `kuat-agent-rules`

1. **`.claude-plugin/plugin.json`** — `name: kuat`, pinned `version` (start `1.0.0`), `description`, `author` (EE), declaring the `skills/` (activity skills only — not the legacy pair).
2. **`scripts/build-plugin.mjs`** — assembles the distributable plugin: copies the activity `skills/` and **snapshots `reference/`** into the plugin payload so skills resolve locally with zero setup. Stamp the reference git SHA + plugin version into a `manifest.json` (mirror the pattern already used by `kuat-mono`'s package bundling).
3. **Optional `commands/`** — e.g. `/kuat-review`, `/kuat-presentation` as explicit entry points for consultants who prefer commands.
4. **Retire for the plugin path:** `ensure-rules.sh`, the five-step resolver, `resolve-rules.md`, `consumption-contract.md`, `{{include}}` bundler, most of `setup/`. Keep them only if the IDE/npm developer path still needs them — otherwise move to a `legacy/` dir and note in the log.
5. **`CHANGELOG.md`** for the plugin (drives release notes).

### In the marketplace repo

6. **`.claude-plugin/marketplace.json`** listing the Kuat plugin with **two entries/refs resolving to different versions** — `beta` and `stable` (each must resolve to a *distinct* version string or Claude treats them as identical and skips updates).
7. **`managed-settings.json` example** for EE admins: `extraKnownMarketplaces` (auto-register the EE marketplace), `strictKnownMarketplaces` (lock allowed sources), `defaultEnabled`. Document the private-repo auth token needed for background auto-updates.

---

## Tasks

1. Branch + log; verify plugin/marketplace schema against current docs.
2. Write `plugin.json`; set `version` **only here**, never also in the marketplace entry (the `plugin.json` value wins silently and a stale one masks the marketplace value).
3. Build `build-plugin.mjs`; produce a plugin payload with the reference snapshot + skills + manifest.
4. Create/locate the marketplace repo; add `marketplace.json` with `beta` + `stable` channels both pointing at `1.0.0`-equivalent refs initially.
5. Write the managed-settings example + an admin install README.
6. Quarantine/retire the runtime resolution machinery for the plugin path.
7. **Clean-account install test** (the phase verification): in a fresh Claude environment, add the marketplace, install Kuat from `beta`, and confirm a skill triggers and produces on-brand output using only the bundled reference (no external resolution).

---

## Acceptance criteria

- Kuat installs from the marketplace in a clean account and runs with **zero setup** (no `ensure-rules.sh`, no env vars).
- Reference snapshot is bundled; deliverables carry the version stamp.
- `beta` and `stable` channels exist and resolve to distinct versions; `/plugin update` moves a user between them correctly.
- `version` is declared in exactly one place (`plugin.json`).
- Managed-settings example pre-registers the marketplace and installs the plugin without the user running `/plugin marketplace add`.

---

## Report back

Fill `docs/migration/report-phase-3.md`. Capture: final manifests (`plugin.json`, `marketplace.json`, managed-settings), the build-plugin flow, what was retired vs kept for the developer path, the clean-account install test result, and the initial version/channel mapping. This report feeds **Phase 4 (pilot on `beta`)**.
