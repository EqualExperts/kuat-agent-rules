---
name: create-web-app
description: Build or modify Equal Experts web application UI — forms, dashboards, app screens, navigation, settings, tables, product flows. Use when creating product UI (React/Vue/HTML) that should follow EE brand, design tokens, accessibility, and the Kuat component system. Not for marketing pages (use web-marketing reference) or slides.
---

# Create EE web app UI

Build on-brand, accessible Equal Experts **product** UI. Reuse existing Kuat/shadcn components before writing custom code, use semantic tokens (never raw hex), and follow the patterns below — don't invent layouts.

This skill **links** to the passive reference library; load only the slices you need, when you need them. Standards live in [`/reference`](${CLAUDE_PLUGIN_ROOT}/reference/README.md) — never paste reference content inline.

## Step 1 — Intake

Run the grouped intake first: see [../_shared/intake.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md). For web product, confirm at least:

- **Scenario / page type** — form, dashboard, documentation, auth flow, table, settings, etc.
- **Framework + deliverable** — React, Vue, or plain HTML/CSS? Code, Figma, or a spec?
- **Scope of states** — happy path only, or also empty / loading / error states?
- **Component source available** — is `@equal-experts/kuat-react`/`kuat-vue` (or an overlay) installed? (Drives Step 3.)

If the deliverable format is ambiguous, ask once before building.

## Step 2 — Load the standards you need

Load progressively — start with foundations, add the medium + pattern slices the scenario needs:

| Need | Load |
|------|------|
| Colour / type / spacing / radius tokens | [../../reference/design-language/](${CLAUDE_PLUGIN_ROOT}/reference/design-language/) (colours, typography, spacing, borders) |
| Accessibility requirements | [../../reference/accessibility/accessibility.md](${CLAUDE_PLUGIN_ROOT}/reference/accessibility/accessibility.md) + [../../reference/media-types/web-product/accessibility.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/accessibility.md) |
| Layout & navigation (dark nav patterns, logo placement) | [../../reference/media-types/web-product/design.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/design.md) |
| Component selection priority | [../../reference/media-types/web-product/component-decision-tree.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/component-decision-tree.md) |
| UX writing (actions, errors, empty states, forms, confirmations) | [../../reference/media-types/web-product/content/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/content/) + [../../reference/content/](${CLAUDE_PLUGIN_ROOT}/reference/content/) |
| The specific page type | [../../reference/media-types/web-product/patterns/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/patterns/) — `authentication`, `dashboards`, `documentation`, `forms` |
| Logo usage | [../../reference/brand/logo.md](${CLAUDE_PLUGIN_ROOT}/reference/brand/logo.md) |
| Transactional email UI | [../../reference/media-types/web-product/emails.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/emails.md) |

**Token/layout syntax (illustrative only):** [../../reference/media-types/web-product/examples/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/examples/) shows React/Vue/CSS token usage. Treat it as syntax reference, **not** canonical component API — prefer component guides (Step 3).

## Step 3 — Resolve components (Kuat-first, graceful fallback)

Follow the decision tree: **Kuat Blocks → Kuat Components → shadcn (themed via kuat-core) → custom build**.

Per-component API/usage/a11y is **not** in this repo — it ships with the implementation. Resolve by stable ID via [../../reference/media-types/web-product/component-registry.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/component-registry.md):

1. Map the need to an ID (e.g. `shadcn:button`, `kuat:button-group`, `kuat:kuat-header`).
2. Read the guide at `{package}/agent-docs/components/{slug}.md` (installed package) or `{OVERLAY_DIR}/components/{slug}.md` (contributor overlay), resolved via `components.manifest.json`. The slug drops the namespace (`shadcn:button` → `button`).
3. Read technical setup (Tailwind / kuat-core preset, theming, tokens) from the package's `agent-docs/setup/` — it is implementation-owned and ships downstream, not in this reference.

**Graceful fallback — when a component or its guide is missing:**

- Build from the documented pattern in [../../reference/media-types/web-product/patterns/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/patterns/) + token syntax in `examples/`, using semantic tokens.
- **Flag the gap** explicitly in your output: name the component ID you wanted, note it wasn't resolvable, and that you fell back to documented patterns — so it can be added to the library later.
- Never silently invent a component API or hardcode values to paper over a missing guide.

## Step 4 — Build

- Reuse existing components/patterns first; build custom only when the decision tree bottoms out.
- Semantic tokens only (`bg-primary`, `bg-sidebar`, `p-4`) — never raw hex or arbitrary px.
- Product layouts use **dark navigation** (Tech Blue) with white monochrome logo; light content areas.
- Radius: 0px static content, 6px interactive, 4px inputs.
- Build the scoped states (empty / loading / error) when in scope, per the content rules.

## Step 5 — Pre-handoff checklist

- [ ] Components resolved via the decision tree; custom code only where justified; any missing-component fallback **flagged**
- [ ] All colours, spacing, type, radius via semantic tokens — no arbitrary hex/px
- [ ] Dark nav pattern + white monochrome logo where a product layout applies
- [ ] Single logical H1; sequential headings; visible focus states; accessible names on controls
- [ ] WCAG AA contrast (4.5:1 text, 3:1 large/UI)
- [ ] UX copy supports the task (actions, errors, empty states) — not marketing tone
- [ ] Scoped states (empty/loading/error) handled when in scope
- [ ] Version stamp applied — see [../_shared/version-stamp.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)

## Conflict & ambiguity

- If a user request conflicts with a brand/accessibility rule, **flag the conflict** in your output and recommend the compliant option rather than silently breaking the rule.
- If a foundation rule and a web-product rule conflict, the foundation wins — raise it.
- Ask when scenario, framework, or scope is unclear; don't guess.

## Related

- Review counterpart: [review-web-app](${CLAUDE_PLUGIN_ROOT}/skills/review-web-app/SKILL.md)
- Shared: [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) · [version-stamp](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)
