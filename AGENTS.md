# Equal Experts Brand Guidelines - Agent Instructions

This repository contains brand guidelines and design system rules for **creating and reviewing** Equal Experts branded content.

## Load Order and Task → Files

**For load order and task → rules mapping, see the canonical index:** [kuat-docs/rules/LOADING.md](./kuat-docs/rules/LOADING.md)

That index defines:
- Which foundation rule files to load (or "all foundations")
- Which type-specific paths to load per task (slides, web_product, web_marketing, icons, etc.)
- Optional paths (scenarios, content subdirs, framework examples) and when to include them

**Intent (review | create):** Determine intent first. Use skills [kuat-review](./skills/kuat-review/SKILL.md) or [kuat-create](./skills/kuat-create/SKILL.md); resolve rules per [skills/shared/resolve-rules.md](./skills/shared/resolve-rules.md). See [LOADING.md](./kuat-docs/rules/LOADING.md#intent-review--create).

**Three layers:** `skills/` — session procedure; `kuat-docs/rules/` — compliance standards; consumer repo — implementation overlay.

**Role-based prompting:** For **review**, load [brand-reviewer](./kuat-docs/rules/roles/brand-reviewer.md). For **create**, use task-specific role cards (e.g. infographic, icon) — see [kuat-docs/rules/roles/](./kuat-docs/rules/roles/) and [LOADING.md](./kuat-docs/rules/LOADING.md).

## Upstream vs Local Ownership (Consumption Contract)

When this repository is consumed by implementation repositories (for example `kuat-mono`), use this ownership split:

- **Upstream (`kuat-agent-rules`) owns:** brand, foundations, content style, structure/pattern guidance, and task-to-context loading taxonomy.
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
- **EE Blue:** `#0066CC` - Primary actions, brand
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

For context size (minimal, standard, full, full+examples), see [LOADING.md](./kuat-docs/rules/LOADING.md#context-size-reference).

---

## Behavior Guidelines

When working on Equal Experts content:

1. **Determine intent** — review vs create; if unclear, ask
2. **Check documentation first** before making design decisions
3. **Follow existing patterns** - do not invent new ones
4. **Use semantic tokens** - `bg-primary` not `#0066CC`
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
