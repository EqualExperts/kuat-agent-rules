# Product Scenarios

Applied layout and design patterns for web application page types.

Each scenario combines the foundational rules from general rules and web product rules into actionable guidance for building complete pages.

---

## When to Use Scenarios

Load a scenario guide when:

- Building a specific page type (login, dashboard, settings)
- Need composition guidance beyond foundational design rules
- Want consistent patterns for common UI challenges

---

## Available Scenarios

| Scenario | Use For | Base Layout |
|----------|---------|-------------|
| [authentication.md](./authentication.md) | Login, registration, password flows, MFA | Single Column |
| [dashboards.md](./dashboards.md) | Analytics, data tables, metrics, reporting | Sidebar Navigation |
| [forms.md](./forms.md) | Settings, multi-step forms, data entry | Varies |
| [documentation.md](./documentation.md) | Docs sites, knowledge bases, API reference | Sidebar + Split |

---

## Scenario Structure

Each scenario file follows a consistent structure:

| Section | Purpose |
|---------|---------|
| **Principles** | Core UX principles, user goals, success metrics |
| **Layout** | Which base layout to use, page structure, regions |
| **Design** | Color tokens, typography, spacing, components |
| **Content** | Content hierarchy, microcopy, error messaging |
| **Accessibility** | Scenario-specific a11y requirements (references base docs) |
| **Implementation** | Component composition, state patterns, responsive behavior |
| **Best Practices** | Do's/Don'ts, common mistakes, edge cases |

---

## How Scenarios Reference Foundations

Scenarios build on foundational documentation:

```
┌─────────────────────────────────────────┐
│             SCENARIOS                   │
│  (authentication, dashboards, etc.)     │
├─────────────────────────────────────────┤
│  References:                            │
│  ├── rules/foundations/*                │
│  ├── rules/types/web/product/design.md  │
│  ├── rules/types/web/product/           │
│  │   accessibility.md                   │
│  └── rules/foundations/accessibility.md│
└─────────────────────────────────────────┘
```

---

## For AI Agents

When building a specific page type:

1. Load the relevant scenario file
2. Follow the recommended base layout from product design rules
3. Reference accessibility requirements from general and web accessibility docs
4. Use design tokens from general colours and typography

---

## Related Documentation

- [Product Design](../design.md) - Layout patterns
- [Product Accessibility](../accessibility.md) - Technical implementation
- [Foundations Accessibility](../../../../foundations/accessibility.md) - Principles
- [Foundations](../../../../foundations/) - Brand design rules
