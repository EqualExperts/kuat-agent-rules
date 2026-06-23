---
name: author-skill
description: Scaffold a new skill in the Equal Experts house style. Use when adding a new activity skill (consumer-facing, packaged) or a new contributor skill (repo-local) — produces a SKILL.md with a sharp trigger, progressive disclosure into reference/, the link conventions the build expects, a delivery checklist, and a version stamp. Wires it into the plugin build when it's a distributable skill. Contributor-only; repo-local. NOT for editing reference (that's author-reference).
---

# Author a new skill (house style)

Skills are the **HOW** — they carry the procedure that `reference/` deliberately doesn't. A good EE
skill is short, has a sharp trigger, and **links** into the reference slices it needs rather than
inlining them. Match the existing skills (e.g.
[create-presentation](../../../skills/create-presentation/SKILL.md)).

## Step 0 — Decide which kind

| Kind | Lives in | Packaged? | Audience |
|------|----------|-----------|----------|
| **Activity skill** (consumer) | `skills/<name>/` | yes — by `build-plugin.mjs` | consultants / engineers |
| **Contributor skill** | `.claude/skills/<name>/` | **no** — repo-local, in-repo discovery only | the DS team |

If it tells a consultant how to *apply* the brand → activity skill. If it helps the DS team *extend*
the system (touches the SoT) → contributor skill, repo-local.

## Step 1 — Frontmatter (the trigger)

```yaml
---
name: <kebab-name>
description: <One sharp sentence: what it does + WHEN to use it + when NOT to.>
---
```

The `description` is the trigger — make it specific. Say what it's for *and* what it's not for (e.g.
"NOT for web UI"). Vague descriptions mis-fire.

## Step 2 — Body (progressive disclosure)

- Open with the one rule that matters, then numbered steps (intake → load reference → produce → gate).
- **Link, don't inline.** Point at reference slices; never paste reference content into the skill.
- Reuse the shared assets: [intake](../../../skills/_shared/intake.md),
  [review-common](../../../skills/_shared/review-common.md),
  [report-formats](../../../skills/_shared/report-formats.md),
  [version-stamp](../../../skills/_shared/version-stamp.md).
- End with a **delivery checklist** (the gate before handoff) and a **version stamp** line, plus
  **Conflict & ambiguity** and **Related** sections.

## Step 3 — Link conventions (so the build + dev path both work)

**Activity skills** keep **repo-relative** links in source — the build rewrites them in the payload:

| Link target in source (`skills/<name>/SKILL.md`) | Becomes in the packaged payload |
|--------------------------------------------------|---------------------------------|
| `../../reference/…` | `${CLAUDE_PLUGIN_ROOT}/reference/…` |
| `../_shared/…` | `${CLAUDE_PLUGIN_ROOT}/skills/_shared/…` |
| `../<other-skill>/…` | `${CLAUDE_PLUGIN_ROOT}/skills/<other-skill>/…` |

Don't write `${CLAUDE_PLUGIN_ROOT}` yourself in an activity skill — `build-plugin.mjs` does it, and
`verify-plugins.mjs` checks source==payload-modulo-rewrite. A bundled script the skill runs should be
invoked **skill-relative** (e.g. `scripts/foo.py`), not via `${CLAUDE_PLUGIN_ROOT}/skills/...` (that
token trips the verifier's reverse-rewrite — see the Phase-4S LOG note).

**Contributor skills** are not packaged: link with plain repo-relative paths (e.g.
`../../../reference/...`) — no rewrite happens.

## Step 4 — Wire it in (activity skills only)

1. Add the skill name to `ALL_SKILLS` in `skills/scripts/build-plugin.mjs` and to the right `BUNDLES`
   entry (with a `commands/` entry).
2. Add eval briefs under `docs/migration/evals/<name>.md` and record a run in `RESULTS*.md`.
3. Rebuild + verify:
   ```bash
   npm run build:plugins && npm run verify:plugins   # ALL CHECKS PASSED
   ```

> Contributor skills are **never** added to `build-plugin.mjs`, the marketplace, or managed settings —
> being in `.claude/skills/` is the access control. `build-plugin.mjs` refuses to package from
> `.claude/skills/`.

## Step 5 — Checklist before you call it done

- [ ] Sharp `description` with when-to-use **and** when-not
- [ ] Steps follow intake → load reference → produce → gate
- [ ] No reference content inlined (links only); platform isolation respected
- [ ] Correct link convention for the kind (rewrite-friendly relative vs plain relative)
- [ ] Delivery checklist + version stamp + Conflict & ambiguity + Related sections present
- [ ] (Activity) wired into `build-plugin.mjs`; `build:plugins` + `verify:plugins` green; eval added

## Related

- Part of the [contribution model](../../../contribute/overview.md) — this is the **Heavy · skill** path ([proposing a skill](../../../contribute/proposing-a-skill.md)).
- Reference (not a skill): [author-reference](../author-reference/SKILL.md)
- Templates to copy: [create-presentation](../../../skills/create-presentation/SKILL.md), [review-web-app](../../../skills/review-web-app/SKILL.md)
- Build/verify: `skills/scripts/build-plugin.mjs`, `skills/scripts/verify-plugins.mjs`
