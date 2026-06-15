# Kuat marketplace — staged files

**These files belong in the separate EE marketplace repo, not in `kuat-agent-rules`.** They are staged here (Phase 3) because the migration work is repo-scoped. Move them to the marketplace repo before publishing.

## Topology

```
EqualExperts/kuat-marketplace        ← marketplace repo (these files live here)
  .claude-plugin/marketplace.json    ← lists the plugins; source = git-subdir into kuat-agent-rules

EqualExperts/kuat-agent-rules        ← THIS repo (built plugin payloads live here)
  plugins/kuat-build/                ← assembled by skills/scripts/build-plugin.mjs
  plugins/kuat-studio/
```

The marketplace **catalogues**; the plugin **payloads** are pulled by `git-subdir` from `kuat-agent-rules/plugins/<name>/` at a channel ref.

## ⚠️ Placeholders to confirm before publishing

- **Marketplace repo coords.** `extraKnownMarketplaces.kuat.source` and `strictKnownMarketplaces` use `EqualExperts/kuat-marketplace` — confirm the real repo name/host.
- **Channel refs.** `marketplace.json` entries point at refs **`stable`** and **`beta`** in `kuat-agent-rules`. Create those refs (e.g. a `stable` release tag and a `beta` branch). The payloads are on `main`/your release branch today.

## Channels & versioning

- `stable` entries (`kuat-build`, `kuat-studio`) → ref `stable`. `beta` entries (`kuat-build-beta`, `kuat-studio-beta`) → ref `beta`.
- **Version comes from each ref's `plugin.json`.** Do **not** set `version` on a marketplace entry. For `/plugin update` to fire, beta and stable must resolve to **distinct** version strings — i.e. the `beta` ref carries a higher pre-release (e.g. `1.1.0-beta.1`) than the `stable` ref (`1.0.0`). Same string on both refs → Claude treats them as identical and skips the update.
- Promotion = fast-forward the `stable` ref to the tested beta commit and bump `plugin.json` version on `stable`.

## Audience targeting (managed-settings)

There is no in-file group targeting — deploy a different `managed-settings.json` per group:

| File | Deploy to | Enables |
|------|-----------|---------|
| [org-wide.json](./managed-settings/org-wide.json) | all consultants | `kuat-studio` (stable) |
| [engineering.json](./managed-settings/engineering.json) | engineering group | `kuat-studio` + `kuat-build` (stable) |
| [pilot-beta.json](./managed-settings/pilot-beta.json) | Phase-4 pilot cohort | `kuat-build-beta` + `kuat-studio-beta` |

`extraKnownMarketplaces` auto-registers the marketplace (no manual `/plugin marketplace add`). `strictKnownMarketplaces` (managed-only) locks installs to the EE marketplace.

## Private-repo auth

If `kuat-agent-rules` / `kuat-marketplace` are private, background auto-updates need a token with read access (e.g. `gh auth` credential or a fine-grained PAT in the environment Claude Code runs in). Document the token provisioning in the EE deployment runbook; without it, `/plugin update` cannot fetch new refs.

## Managed-settings location (reference)

- macOS: `~/Library/Application Support/Claude Code/managed-settings.json`
- Linux: `~/.config/Claude Code/managed-settings.json`

(Server-delivered via the Claude.ai admin console is preferred over local files for enforcement.)
