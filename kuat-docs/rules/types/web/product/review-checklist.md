# Web Product — Review Checklist

Use for **review** intent at any depth. Pair with [review-context.md](./review-context.md) when depth is `product_ux` or `full`.

**See also:** [design.md](./design.md), [accessibility.md](./accessibility.md), [component-decision-tree.md](./component-decision-tree.md), [kuat-review](../../../../skills/kuat-review/SKILL.md).

---

## Brand compliance (all depths)

- [ ] Colours from approved palette / semantic tokens — no arbitrary hex in UI
- [ ] Typography uses defined scale (Lexend, type roles)
- [ ] Spacing follows 4px grid
- [ ] Logo usage follows [foundations/logo.md](../../../foundations/logo.md) if present
- [ ] Border radius: 0px static content, 6px interactive, 4px inputs

---

## Accessibility (all depths)

- [ ] Single logical H1 per view (or equivalent page title pattern)
- [ ] Heading hierarchy is sequential
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large text/UI)
- [ ] Focus states visible for keyboard users
- [ ] Images have appropriate alt text (decorative: empty alt)
- [ ] Interactive controls have accessible names

See [accessibility.md](./accessibility.md) for full requirements.

---

## Product patterns (all depths)

- [ ] Product layout uses dark navigation pattern where applicable ([design.md](./design.md))
- [ ] Components sourced per [component-decision-tree.md](./component-decision-tree.md)
- [ ] No inline styles for themeable properties — use design tokens

---

## Product / UX fit (`product_ux` or `full` only)

**Blocked** until [review-context.md](./review-context.md) items are supplied. Do not score this section without user story and scope.

- [ ] Primary actions and labels support the stated job-to-be-done ([content/actions.md](./content/actions.md))
- [ ] Copy enables task completion — not marketing tone ([content/product-content.md](./content/product-content.md))
- [ ] Errors, empty, and loading states match scoped flows (see relevant [scenarios/](./scenarios/) file)
- [ ] Form labels and validation align with scenario rules if applicable
- [ ] Screen content reflects stated success criteria from review context — cite evidence

If context missing: mark section **Blocked** and list required items under Open questions.

---

## Report usage

Map failures to [kuat-review](../../../../skills/kuat-review/SKILL.md) violation table. Cite the rule file for each finding.
