# Figma AI custom skills release

Six self-contained skills for Figma AI's native **custom skills** feature
(`create_custom_skill` / `edit_custom_skill` / `list_custom_skills`). That surface has no network
access and no shell, so `{RULES_DIR}` runtime resolution — which every other bundle in this repo
still relies on — cannot work there. These six skills inline everything Figma AI needs instead.

Source: `skills/kuat-tokens/`, `skills/kuat-composition/`, `skills/kuat-patterns/`,
`skills/kuat-components/`, `skills/kuat-create-figma/`, `skills/kuat-review-figma/`.
Built output: `skills/dist/figma-custom-skills/<name>/SKILL.md` (regenerate with
`node skills/scripts/bundle-skills.mjs`).

## Architecture

| Skill | Contains | Built size |
|-------|----------|------------|
| `kuat-create` | Orchestrator — workflow, intake, gates; tells the agent which sibling to load at each step | ~7.2K |
| `kuat-tokens` | Semantic token tiers, binding rules by property type (Plugin API calls), fallback policy | ~11.5K |
| `kuat-composition` | Focal hierarchy, density by content type, scale contrast, restraint, the observer gate | ~11.2K |
| `kuat-patterns` | Product UI page patterns (dashboard, browse & filter, forms, sign-in, detail page, section hub, feedback, docs) + marketing pages | ~11.7K |
| `kuat-components` | Resolution priority, named resolution traps, slot patterns, state coverage, instance rules | ~8.8K |
| `kuat-review` | Review/audit workflow — binding audit, brand/accessibility/craft checks, observer gate, report format | ~6.5K |

Total: ~57K characters across six skills, each well inside Figma's 65,536-character-per-skill
limit (validated at build time — the bundler throws if any body exceeds it, or if any body still
contains a `{RULES_DIR}`/`{RULES_ROOT}` placeholder).

Skills on this surface cannot call each other automatically — `kuat-create` explicitly tells the
agent which sibling skill to load at each workflow step; loading is per-turn and manual.

## Why this replaces the workflow-based split

The previous `kuat-figma-design` / `kuat-figma-prototype` / `kuat-figma-review-design` /
`kuat-figma-make` / `kuat-figma-review-make` skills (still in `skills/dist/`, excluded from the
build by default) were split by *workflow* rather than *domain*, and every one of them still links
out to `{RULES_DIR}/...` for the actual rule content (tokens, composition, component registry).
That's fine for a filesystem or connector-backed agent that can resolve `{RULES_DIR}`, but it's
exactly what the Figma AI custom-skills runtime cannot do — no network, no shell, nothing to
resolve against. This release inlines that content directly into six domain skills instead.

## Content rules followed

- No raw hex codes or pixel values — Kuat's actual values live in the Figma library and drift out
  of sync with anything duplicated here. Skills describe *semantic intent* ("search for
  `radius-none` for static content panels") so the agent can search the live library.
- No Plugin API implementation code — the agent generates that from the rules.
- Decision frameworks with a stated "why," not just tables of values, so the agent can judge edge
  cases the rules don't literally cover.
- Anti-patterns paired with the correction, and named resolution traps for the most common
  mis-picks (e.g. a themed primitive's default "Card" vs. Kuat's own content-card component).
- A version-stamp footer convention on every skill (`Kuat <skill> skill vX.Y.Z · <date>`) plus a
  build-time footer (`<!-- kuat-skill-bundle: ... -->`) recording the rules-ref/date the bundle was
  built at.

## Installing to a Figma org

1. `list_custom_skills()` — check what's already installed.
2. For each of the six skills, if a skill with a matching `name` already exists, update it via
   `edit_custom_skill({ skill_id, name, description, body })`; otherwise `create_custom_skill({ name, description, body })`.
3. Read `name`, `description`, and `body` for each skill straight out of the frontmatter and body
   of `skills/dist/figma-custom-skills/<name>/SKILL.md` — no further editing needed, they're
   upload-ready.
4. Install all six. `kuat-create` is the entry point but expects its siblings to be installed
   alongside it, not embedded in it.

## Regenerating after a reference change

Content here is hand-authored from `reference/design-language/`, `reference/media-types/`, and the
shared workflow files under `skills/_shared/` and `skills/install/make-kit-guidelines/craft.md` —
it is not currently auto-generated from those files by the bundler (unlike the legacy `{RULES_DIR}`
bundles, which just link out to them). When a reference file changes in a way that affects one of
these six skills, update the matching `skills/<name>/SKILL.md` (or `kuat-create-figma` /
`kuat-review-figma`) source by hand, then re-run `node skills/scripts/bundle-skills.mjs` and
re-install the changed skill(s) via `edit_custom_skill`.
