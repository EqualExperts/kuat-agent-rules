# Phase 7 — Contributor Skills (repo-local · **gates `stable`**)

**Repos / Claude Code projects:** `kuat-mono` **and** `kuat-agent-rules` (cross-repo)
**Branches:** `feature/phase-7-contributor` in each repo
**Sequencing (Ed):** pulled **forward — before Phase 5 `stable`.** The DS team must be able to maintain Studio + Build before consultants depend on a stable release. Repo-local, DS-team-only.

> Everything so far has served **Kuat consumers** (people applying the design system). This phase serves **Kuat contributors** — the small DS team who extend the system itself. These skills touch the source of truth, so they are sensitive.
>
> **Distribution rule (Ed, firm): contributor skills live in the repo ONLY — never in the Enterprise marketplace/managed-settings distribution.** They are committed as project-scoped Claude Code skills (in each repo's `.claude/skills/`), discovered automatically when someone works in that repo. No marketplace entry, no channel, no audience targeting — being in the repo *is* the access control.

---

## Objective

Equip the DS team to extend Kuat safely and consistently: author **components** downstream (`kuat-mono`) and **reference guidelines / patterns / skills** upstream (`kuat-agent-rules`), with the house conventions enforced (the passive test, the ownership matrix, registry integrity).

---

## Skills to build (all four families — Ed)

### Build (kuat-mono)
| Skill | Job |
|-------|-----|
| `add-kuat-component` | Scaffold a component (React + Vue) + Storybook + tests; update `components.manifest.json`; **regenerate the component registry from the manifest** + a **CI drift check** (reference registry vs kuat-mono manifest); regenerate the package `agent-docs` bundle. Closes the "component log goes stale" concern. |

### Tokens (cross-repo — closes the colour SoT gap)
| Skill | Job |
|-------|-----|
| `generate-tokens` | From the upstream `reference/design-language/tokens/colors.tokens.json` SoT, **generate** `reference/design-language/colours.md` **and** downstream kuat-core `variables.css` (via the 1b sync direction), with a **CI drift check** that fails if either artifact diverges from the tokens. Permanently prevents the `#0066CC` class of drift. (Replaces the current hand-maintained `colours.md`.) |

### Studio asset-pack upkeep (kuat-agent-rules)
| Skill | Job |
|-------|-----|
| `prep-master` | Wrap `assets/slides/prep-master.py` as a skill: when the master changes, re-slim + fix theme font → Lexend + embed fonts → refresh `ee-master-2026.pptx`; self-check. |
| `curate-layouts` | Render/inspect the 65 master layouts, label them by purpose in `assets.manifest.json`, prune unused → shrink the master/payload (the deferred layout-map curation). |
| `add-brand-asset` | Add a logo variant / photography / icon to the pack + `assets.manifest.json` with the right IDs (the path to closing the image-library gap). |

### Shared authoring (kuat-agent-rules)
| Skill | Job |
|-------|-----|
| `author-reference` | Add/edit a reference guideline or pattern **upholding the passive test** + the `media-types/<medium>/patterns/` structure; update `MIGRATION-MAP.md` if paths move. (For colours, edits go through the **token SoT** + `generate-tokens`, not by hand.) |
| `review-reference-change` | Gate a reference change: passive-test scan (no verbs/roles/loading tables), link integrity, structure conformance, token-drift. |
| `author-skill` | Scaffold a new activity skill in the house style (sharp trigger, progressive disclosure, `${CLAUDE_PLUGIN_ROOT}` links, checklist, version stamp). |

---

## Checkpoint decisions (resolve at start, log)

1. **Placement = repo-local.** Each repo's contributor skills live in **that repo's `.claude/skills/`** (project scope), committed to the repo. In `kuat-agent-rules`, keep them **separate from the distributable `skills/`** (which Phase 3 packages) — `.claude/skills/` is never bundled. No marketplace, no managed-settings, no channel.
2. **Registry as generated-from-`kuat-mono` + CI drift check** (the recommendation from the skill-placement review). Confirm: `add-kuat-component` becomes the thing that updates the manifest and regenerates the registry, and CI fails on drift between the reference registry and kuat-mono's published manifest. This is the durable fix for the "component log goes stale" concern.

---

## Tasks

1. Branch + log in each repo; resolve checkpoints.
2. **kuat-mono:** author `add-kuat-component` — scaffolds component code (both frameworks), Storybook story, tests; updates `components.manifest.json`; regenerates `agent-docs`; updates/generates the component registry consumed upstream.
3. **kuat-agent-rules:** author `author-reference` + `review-reference-change` (+ optional `author-skill`) — enforce the passive test and the `media-types`/`patterns` structure; reuse the Phase-1 verification (procedure grep, link check) as the review gate.
4. Wire the **registry generation + CI drift check** so the reference registry is derived from kuat-mono's manifest, not hand-maintained.
5. Build evals: add a component end-to-end (code → docs → registry → bundle); author + review a reference change (incl. a deliberate passive-test violation the review must catch).
6. Commit the skills to each repo's **`.claude/skills/`** (repo-local, project scope). **Do not** add them to the marketplace, managed settings, or any plugin bundle. Confirm the Phase-3 `build-plugin` excludes `.claude/skills/` (see Phase 3 guard).

---

## Acceptance criteria

- A DS-team member can add a component **end-to-end** via `add-kuat-component` (code + Storybook + tests + manifest + registry + regenerated bundle); `pnpm build` green.
- `author-reference` produces passive-compliant reference; `review-reference-change` **catches** a planted passive-test violation and any broken links.
- Registry is generated from kuat-mono's manifest; CI **fails on drift** (verified with a deliberate mismatch).
- **Repo-only confirmed:** contributor skills are discovered when working in the repo (Claude Code), and are **absent from every marketplace bundle** — verify the built consumer plugins contain none of them.
- Skills verified working in their repo context.

---

## Report back

Fill `docs/migration/report-phase-7.md` (in each repo as relevant). Capture: the bundle decision; the registry-generation + drift-check implementation (closes the stale-registry item); eval results (component end-to-end; reference author/review); the restricted-distribution verification; channel/version.
