# Component Catalog

Always prefer a Kuat or shadcn component over raw HTML elements. Resolution priority (from
`component-decision-tree.md`), highest first:

1. **Kuat Blocks** — pre-built compositions (`KuatHeader`)
2. **Kuat Components** — custom components with no shadcn equivalent (`ButtonGroup`, `Callout`,
   `StatusBadge`, `Tag`, `TagGroup`, `CounterBadge`)
3. **shadcn-sourced primitives** — standard controls, themed via `kuat-core` (see `setup.md` for the
   import-path caveat on these)
4. **Custom build** — only when none of the above fit

## Catalog

"Documented" means a full `agent-docs` guide with real props/variants exists in this repo (see file
column). "Undocumented" means the component ships from `@equal-experts/kuat-react` but has no
per-component guide yet — treat these conservatively (standard shadcn/Radix defaults only, no
invented Kuat-specific variants) until documented.

| Component | Source | Import | Status | Guide |
|---|---|---|---|---|
| KuatHeader | Kuat Block | `@equal-experts/kuat-react/kuat-header` | Documented | `kuat-header.md` |
| ButtonGroup | Kuat Component | `@equal-experts/kuat-react/button-group` | Documented | `button-group.md` |
| Callout | Kuat Component | `@equal-experts/kuat-react/callout` | Documented | `callout.md` |
| StatusBadge | Kuat Component | `@equal-experts/kuat-react/status-badge` | Documented | `status-badge.md` |
| Tag | Kuat Component | `@equal-experts/kuat-react/tag` | Documented | `tag.md` |
| TagGroup | Kuat Component | `@equal-experts/kuat-react/tag-group` | Documented | `tag-group.md` |
| CounterBadge | Kuat Component | `@equal-experts/kuat-react/counter-badge` | Documented | `counter-badge.md` |
| Button | shadcn (themed) | `@equal-experts/kuat-react/button` — see `setup.md` caveat | Documented | `button.md` |
| Badge | — | — | **Deprecated** — use StatusBadge / Tag / CounterBadge instead | — |
| Accordion, AlertDialog, Select, Checkbox, Radio, Switch, Textarea, Field, Toggle, ToggleGroup, Carousel, KuatCarousel, IconButton, Sonner, KuatRadialProgress | shadcn/Kuat (themed) | `@equal-experts/kuat-react/{name}` | **Undocumented** — package exports these but no per-component guide exists in this repo yet | — |

## Button variant decision tree

Real variants, from `button.md` — do not use names outside this set:

```
"What button variant should I use?"
├─ Main call-to-action, submit, confirm?
│  └─ variant="default"
├─ Irreversible/dangerous action (delete, revoke)?
│  └─ variant="destructive"
├─ Secondary or cancel action alongside a primary?
│  └─ variant="outline" or variant="secondary"
└─ Inline text-style action?
   └─ variant="link"
```

Valid `variant` values: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Valid
`size` values: `default`, `sm`, `lg`, `icon`. Always specify both explicitly rather than relying on
defaults when the choice matters.

## Status/feedback decision tree

Four different components cover status and count — pick the one whose shape matches, don't improvise:

```
"How should I show status or count information?"
├─ Persistent, in-page message tied to a section (title + optional description + link action)?
│  └─ Callout — type: info | positive | warning | issue
├─ Non-interactive status pill, one per row/card/item?
│  └─ StatusBadge — type: success | warning | error | info | neutral
├─ Zero-to-many category labels per item, or filter chips?
│  └─ Tag (wrap in TagGroup) — mode: display | toggle | dismiss
└─ Numeric count overlaying an icon/avatar?
   └─ CounterBadge — type: primary | attention
```

Never use `Badge` (deprecated) for any of the above.

## Navigation and page shell

Product screens (dashboards, internal tools) always use **dark** navigation — this is what
distinguishes them from EE marketing pages, which use light navigation. Two sanctioned patterns:

```
"What navigation shape does this screen need?"
├─ 5-7 top-level nav items, no deep hierarchy?
│  └─ Dark horizontal nav bar (KuatHeader) — bg-sidebar, white monochrome logo, 64-72px tall
├─ 8+ items or hierarchical structure?
│  └─ Dark sidebar (240-280px, collapsible to 64px) — bg-sidebar, top bar stays light (bg-background)
└─ No persistent app navigation needed (auth, forms, wizards, standalone reports)?
   └─ Content-only single column — narrow/centred (max 400-480px) for auth/forms,
      full-width (720-960px readable column) for reports/documents
```

Sidebar layout region order, top to bottom / left to right: system banner (conditional, full width) →
sidebar (workspace switcher → primary nav → secondary nav → account footer) → top bar (collapse
toggle → breadcrumb/title → search/notifications/theme toggle) → main content (feedback →
page header → metrics → visualisations → primary work surface).

**Never** use a full-colour logo on dark navigation — white monochrome only, 120-150px.

## Rules

- Only one `default`-variant Button per visible section.
- Do not mix `Tag` interaction modes (`toggle` vs `dismiss`) within the same group.
- Wrap every set of `Tag`s in a `TagGroup` — don't lay them out in a raw flex container.
- Undocumented components: don't invent Kuat-specific variant names for them — if unsure, use the
  plain shadcn/Radix default API and flag it in the handoff as needing DS-team review.

## Related

- `../Guidelines.md` — product character and top-level rules
- `../setup.md` — import paths, including the open question on primitive components
- `../tokens.md` — colour/type/spacing/radius tokens referenced above
