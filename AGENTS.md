# Equal Experts Brand Guidelines - Agent Instructions

This repository contains brand guidelines and design system rules for **creating and reviewing** Equal Experts branded content.

## Reference and skills

**Standards live in the passive reference library at [reference/](./reference/README.md)** — brand, design language, content, accessibility, and per-medium reference (slides, web-product, web-marketing, imagery, charts-data). Reference states the **WHAT**; it contains no loading taxonomy and no verbs. Every old `kuat-docs/rules/...` path maps to its new home in [reference/MIGRATION-MAP.md](./reference/MIGRATION-MAP.md).

> **Migration note (Phase 2 done):** The global `LOADING.md` task→files taxonomy is retired and loading is now **per-skill** — each skill names the `reference/` slices it needs. Procedure from the old tree (role cards, checklists, "before you create/review") now lives in the **activity skills**; the `_to-skills/` holding area and the `kuat-docs/rules/` redirect tombstones have been removed. Legacy [kuat-review](./skills/kuat-review/SKILL.md) / [kuat-create](./skills/kuat-create/SKILL.md) are rewired onto `reference/` and keep working until Phase 5.

**Activity skills (preferred):** pick by job — [create-web-app](./skills/create-web-app/SKILL.md) / [review-web-app](./skills/review-web-app/SKILL.md), [create-imagery](./skills/create-imagery/SKILL.md), [create-presentation](./skills/create-presentation/SKILL.md) / [review-presentation](./skills/review-presentation/SKILL.md). Each carries its own intake + loads the `reference/` slices it needs.

**Intent (legacy review | create):** Determine intent first; use skill [kuat-review](./skills/kuat-review/SKILL.md) or [kuat-create](./skills/kuat-create/SKILL.md); resolve rules per [skills/shared/resolve-rules.md](./skills/shared/resolve-rules.md).

**Three layers:** `skills/` — session procedure; `reference/` — compliance standards (the WHAT); consumer repo or npm package — implementation overlay / component docs.

**Three entry points:** Org (this repo, [reference/](./reference/README.md)); library (`kuat-mono` git + overlay); app (`@equal-experts/kuat-react` bundled `agent-docs`). See [consumption-architecture.md](./kuat-docs/setup/consumption-architecture.md).

## Upstream vs Local Ownership (Consumption Contract)

When this repository is consumed by implementation repositories (for example `kuat-mono`), use this ownership split:

- **Upstream (`kuat-agent-docs`) owns:** brand, foundations, content style, structure/pattern guidance, and task-to-context loading taxonomy.
- **Local implementation repos own:** component architecture, package APIs, testing strategy, Storybook conventions, and contributor workflow.

### Cross-repo load order

1. Load upstream rules from this repository first.
2. Load local implementation overlay rules from the consumer repository second.

### Conflict resolution

- If guidance conflicts on **design/structure/content intent**, upstream wins.
- If guidance conflicts on **implementation/API/testing/build behavior**, local implementation repo wins.
- If implementation behavior is still unclear, trust runtime evidence in this order: tests, Storybook behavior, package exports, source code.

### External skills and tool guidance

External guidance (including shadcn-related skills/docs) is complementary. It may inform implementation details but must not override this ownership and precedence contract.

### Platform isolation

**Important:** Type-specific rules should NOT reference each other.

- ✅ Slides can reference foundations
- ✅ Web/product can reference foundations
- ❌ Slides should NOT need web/product rules
- ❌ Graphics should NOT need web examples

This ensures each platform gets only relevant guidance.

---

## Quick Reference (When Full Docs Unavailable)

### Brand Colors
- **EE Blue:** `oklch(0.645 0.163 237.5)` / `#1795d4` - Primary actions, brand
- **Transform Teal:** `oklch(0.645 0.120 185.0)` - Secondary actions
- **Tech Blue:** `oklch(0.435 0.090 240.0)` - Navigation, structure
- **Equal Ember:** `oklch(0.625 0.200 65.0)` - Warnings, highlights

### Typography
- **Sans:** Lexend
- **Mono:** JetBrains Mono
- **Serif:** Lora

### Spacing
4px base unit. Scale: 4, 8, 12, 16, 24, 32, 48px.

### Border Radius
- Static content: 0px
- Interactive (buttons): 6px
- Form inputs: 4px

### Accessibility
WCAG AA minimum contrast (4.5:1 for text, 3:1 for large text/graphics).

---

## Behavior Guidelines

When working on Equal Experts content:

1. **Determine intent** — review vs create; if unclear, ask
2. **Check documentation first** before making design decisions
3. **Follow existing patterns** - do not invent new ones
4. **Use semantic tokens** - `bg-primary` not `#1795d4`
5. **Ask if unclear** - request clarification rather than guessing

### Review

- Use skill [kuat-review](./skills/kuat-review/SKILL.md); run [ensure-rules.sh](./skills/scripts/ensure-rules.sh) when possible
- Intake **before** findings (artifacts, review depth, output format; product context for web at `product_ux`/`full`)
- Agree output format with the user; use **Open questions** when context is thin — do not invent user stories or research
- Cite rule files for every violation

### Create

- Use skill [kuat-create](./skills/kuat-create/SKILL.md) and type-specific "Before you create" pre-flight
- Use checklists before delivery (e.g. slides checklist)

---

## Full Documentation

See [kuat-docs/README.md](./kuat-docs/README.md) for complete documentation index.

**Consumption architecture:** [kuat-docs/setup/consumption-architecture.md](./kuat-docs/setup/consumption-architecture.md) · **Ownership:** [ownership-matrix.md](./kuat-docs/setup/ownership-matrix.md)

---

## Design-system migration (active)

We are migrating from the old `rules/` + intent-skills architecture to **reference guidelines + activity skills + an Enterprise plugin**. Plans live in `docs/migration/`. Run a phase with `/kuat-phase <n>`.

### Core principles (apply throughout)

- **Reference is passive (the WHAT).** A file belongs in `reference/` only if it states what is true about EE. Anything that says *how to do a job* — verbs, role cards, checklists, "before you create/review", loading tables — is procedure and lives in a **skill**, not in reference. (The "passive test".)
- **Media types own their patterns.** `reference/media-types/<medium>/` (slides, web-product, web-marketing, imagery, charts-data); each holds a `patterns/` subfolder describing how we do specific things in that medium. "Patterns" is **not** a top-level concept and is not technical detail.
- **Skills use progressive disclosure.** Each `SKILL.md` stays short and **links** to the reference slices it needs — never inlines reference content, never relies on a global loading taxonomy.
- **Don't break current users.** Legacy `skills/kuat-create` and `skills/kuat-review` keep working until Phase 5.

### Conventions

- One branch + PR per phase: `migration/phase-<n>-<slug>`.
- Keep a dated decision log in `docs/migration/LOG.md`; record deviations and checkpoint decisions.
- End every phase by filling `docs/migration/report-phase-<n>.md` from the template and outputting it.
- Preserve git history on moves (`git mv`). Plan mode before edits; stop and ask on ambiguous high-impact decisions.

### Distribution model (context)

Pinned semver + **beta/stable channels** + pre-registration via managed settings. A plugin release is how fresh reference reaches consultants. Bump `version` in **`plugin.json` only** (never also in the marketplace entry). See `docs/migration/phase-3-plugin-packaging.md`.

### Contributor skills (Phase 7 — DS team, repo-local)

The skills under [.claude/skills/](./.claude/skills/) are **contributor** skills — for the small DS team who *extend* the system, not consultants who *apply* it. They are **repo-local only**: project-scoped, auto-discovered when working in this repo, and **never** packaged into a plugin, the marketplace, or managed settings (the build refuses to package from `.claude/skills/`, and `verify-plugins.mjs` asserts none leak into a payload). Being in the repo *is* the access control.

- **Colours change at the SoT, never by hand.** `reference/design-language/colours.md` is a **generated artifact** (`npm run tokens:generate` from `colors.tokens.json`); a drift check (`npm run tokens:check`) gates it. Use [generate-tokens](./.claude/skills/generate-tokens/SKILL.md).
- **Reference changes go through the gate.** Add/edit reference with [author-reference](./.claude/skills/author-reference/SKILL.md); gate it with [review-reference-change](./.claude/skills/review-reference-change/SKILL.md) (`npm run reference:check` — passive test, link integrity, structure, token drift).
- **New skills** in house style: [author-skill](./.claude/skills/author-skill/SKILL.md). **Studio asset pack:** [prep-slides-master](./.claude/skills/prep-slides-master/SKILL.md), [curate-slide-layouts](./.claude/skills/curate-slide-layouts/SKILL.md), [add-brand-asset](./.claude/skills/add-brand-asset/SKILL.md).
- Component authoring (`add-kuat-component`) + the downstream `variables.css`/registry generation live **downstream in kuat-mono** — see `docs/migration/phase-7-kuat-mono-handoff.md`.

### Contributing

How to propose, build, review, and release changes to Kuat — the hybrid model, the four sizes, and a per-surface "Proposing a…" page for each contributor skill + gate — lives in [CONTRIBUTING.md](./CONTRIBUTING.md) (front door) and [contribute/overview.md](./contribute/overview.md) (full model). The `contribute/` docs are governance/how-to and sit **outside** the passive `reference/` library, so they are never bundled into a consumer plugin.
