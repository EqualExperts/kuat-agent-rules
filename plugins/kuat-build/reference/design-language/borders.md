# Border Rules

Border specifications for Equal Experts. This document defines border philosophy, widths, radius, and usage guidelines.

---

## Overview

The design system follows a **minimal border philosophy** - borders should only be used when necessary. Prefer spacing and visual hierarchy over borders.

**Key Principle:** Use borders sparingly and purposefully. Spacing and visual hierarchy should be the primary tools for creating separation.

---

## When to Use Borders

### Use Borders For:

1. **Creating separation** between distinct sections needing clear boundaries
2. **Distinguishing interactive elements** from static content
3. **Defining component boundaries** where spacing alone is insufficient
4. **Indicating state changes** (focus states, error states, selection)

### Avoid Borders When:

- Spacing alone can create sufficient separation
- Visual hierarchy (size, color, weight) can distinguish elements
- The border would create visual clutter
- Separation is already clear through other design elements

---

## Border Width

Borders should be **1-4px** in width:

| Width | Usage |
|-------|-------|
| 1px | Default for most elements (cards, dividers) |
| 2px | Emphasized borders, active states |
| 3-4px | Focus indicators, high-contrast separations |

---

## Border Style

**Always use solid lines.**

The design system does not use:
- Dashed borders
- Dotted borders
- Other border styles

---

## Border Color

Use brand-appropriate colors:

| Usage | Color |
|-------|-------|
| Default borders | Light gray (slate-200 light, slate-700 dark) |
| Focus indicators | EE Blue or appropriate focus color |
| Error states | Red/destructive color |
| Success states | Transform Teal |

---

## Border Radius

The design system uses a **minimal radius approach**, expressed as tokens rather than raw pixel
values. Tokens live in `@equal-experts/kuat-core` (`variables.css`) as `--radius-none`,
`--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, all derived from a
single base `--radius` (currently `0.5rem`). **Never hard-code a radius pixel value** — reference
the token, or the matching Tailwind utility (`rounded-none`, `rounded-xs`, `rounded-sm`,
`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`).

### Scale

| Token | Utility | Value | Use for |
|-------|---------|-------|---------|
| `--radius-none` | `rounded-none` | 0px | **Default.** Static containers, sections, dividers, content blocks, and floating overlays — dialogs, dropdown/select menus, popovers, toasts. Overlays float above the page but are not themselves interactive, so they take the same flat corner as static content. |
| `--radius-xs` | `rounded-xs` | 2px | Rare, fine-detail use only — not a general-purpose size |
| `--radius-sm` | `rounded-sm` | 4px | **Form inputs** — text inputs, textareas, selects, checkboxes, toggles — and card-style option-field wrappers (radio/checkbox/switch "card" appearance) |
| `--radius-md` | `rounded-md` | 6px | **Interactive elements** — buttons, clickable cards, interactive tiles, tabs, menu items (including items inside an overlay, e.g. a dropdown row — the item is interactive even though its container isn't) |
| `--radius-lg` | `rounded-lg` | 8px | Reserved — not currently assigned to any component. Available for a future "larger container" category if one is introduced; don't reach for it by default. |
| `--radius-xl` | `rounded-xl` | 12px | Larger surfaces — bigger modals, feature cards |
| n/a | `rounded-full` | pill / circle | **Rounded elements** — avatars, pill-shaped tags/badges, status dots, spinners |

### Category rules

- **Static content and floating overlays → `--radius-none`.** Cards, sections, dividers, dialogs,
  dropdown/select menus, popovers, and toasts are all flat. A floating overlay is still "static" in
  this sense — it isn't itself the interactive control, it's the surface a control sits on.
- **Interactive elements → `--radius-md` (6px).** Buttons, clickable cards, tabs, menu items —
  including menu items inside an otherwise-flat overlay.
- **Form inputs → `--radius-sm` (4px).** Text inputs, textareas, selects, checkboxes, toggles, and
  the card-style appearance of radio/checkbox/switch field wrappers.
- **Pills / circular elements → `rounded-full`.** Use `rounded-full` (`calc(infinity * 1px)`)
  rather than approximating a pill with a large fixed radius, so it always resolves to a true
  circle/stadium shape regardless of element size. Use for avatars, the rounded variant of
  tags/badges, and status/counter dots.

### Known trap: keep the scale monotonic

`--radius-sm/md/lg/xl` are `calc()`'d off the single `--radius` base. If that base is ever changed,
confirm the derived values still ascend (xs < sm < md < lg < xl) before shipping. A base below
roughly 6px breaks this — for example `--radius: 0.3rem` previously made `--radius-sm` compute to
under 1px, smaller than `--radius-xs`, which silently produced near-square corners on several
components (checkboxes, textareas, menus) despite their code claiming a 4px radius. If you hit this,
fix the base token — don't route around it with a hard-coded pixel value in a component.

### Summary

| Element Type | Token | Border Radius |
|--------------|-------|---------------|
| Static content & floating overlays | `--radius-none` | 0px |
| Interactive elements | `--radius-md` | 6px |
| Form inputs & card-style option fields | `--radius-sm` | 4px |
| Rounded/pill elements | `rounded-full` | pill / circle |

---

## Accessibility

### Contrast Requirements

Borders must meet WCAG 2.1 Level AA for graphical objects:

- **Minimum contrast ratio:** 3:1 against adjacent colors

### Testing

- Test borders against background colors
- Verify visibility in both light and dark contexts
- Ensure sufficient contrast for all users

---

## Usage Guidelines

### Do's

1. **Use borders purposefully** - Only when spacing is insufficient
2. **Follow width guidelines** - 1px default, 2px emphasized, 3-4px focus
3. **Apply radius by category** - `--radius-none` static content & overlays, `--radius-md` interactive, `--radius-sm` inputs & card-style fields, `rounded-full` pills/avatars
4. **Ensure accessibility** - 3:1 minimum contrast ratio
5. **Be consistent** - Same border treatment for same element types

### Don'ts

1. **Don't overuse borders** - Spacing should be the first option
2. **Don't use non-solid borders** - No dashed or dotted
3. **Don't hard-code radius pixel values** - Use the `--radius-*` tokens/utilities, not literal `px` values, even to match an existing size
4. **Don't break accessibility** - Always verify contrast
5. **Don't use decorative borders** - Keep them functional

---

## Platform-Specific Borders

For platform-specific border guidance:

- **Web product** - See [media-types/web-product/](../media-types/web-product/)
- **Web marketing** - See [media-types/web-marketing/](../media-types/web-marketing/)
- **Graphics** - See [media-types/imagery/patterns/graphics/](../media-types/imagery/patterns/graphics/)

---

## Related Documentation

- [Spacing](./spacing.md) - Spacing as alternative to borders
- [Colours](./colours.md) - Border colors
