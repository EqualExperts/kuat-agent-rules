# Web Rules

Guidelines for Equal Experts web presence, including marketing websites and product applications.

---

**Prerequisites:** Load [general rules](../../general/) first

---

## Overview

These rules govern the creation of web-based outputs, split into two categories:

1. **Marketing** - Public-facing websites, landing pages, marketing emails
2. **Product** - Web applications, dashboards, internal tools, product emails

---

## Subdirectories

| Directory | Description |
|-----------|-------------|
| [marketing/](./marketing/) | Marketing websites and emails |
| [product/](./product/) | Web applications and product development |

---

## When to Use Which

### Use Marketing Rules When:

- Creating public-facing website content
- Building landing pages
- Designing marketing emails
- External audience (customers, prospects, public)
- Content-focused pages

### Use Product Rules When:

- Building web applications
- Creating dashboards or internal tools
- Designing product interfaces
- User workflows and task completion
- Interactive, data-heavy interfaces
- Using Kuat-react or Kuat-vue components

---

## Common Web Foundations

### Layout Principles

Both marketing and product layouts share these foundations:

1. **Responsive design** - Works across all screen sizes
2. **Accessibility** - WCAG AA compliance minimum
3. **Performance** - Fast loading, optimized assets
4. **Brand consistency** - Equal Experts visual identity

### Navigation Patterns

**Marketing layouts:**
- Light header with full-color logo
- Horizontal navigation
- Light footer

**Product layouts:**
- Dark navigation (sidebar or horizontal)
- White/monochrome logo
- Persistent navigation

### Color Tokens

Web implementations use semantic color tokens:

| Token | Purpose |
|-------|---------|
| `--background` | Page backgrounds |
| `--foreground` | Primary text |
| `--primary` | Primary brand, main actions |
| `--secondary` | Secondary actions |
| `--muted` | Subtle backgrounds |
| `--accent` | Highlights |
| `--border` | Borders, dividers |

---

## Technical Foundations

### CSS Framework

- **Tailwind CSS** with kuat-core preset
- Semantic color tokens via CSS variables
- Responsive utilities

### Component Libraries

- **shadcn/ui** for standard components (themed via kuat-core)
- **Kuat components** for custom components (ButtonGroup, etc.)
- **Kuat blocks** for pre-built compositions (Header, Footer)

---

## Related Documentation

- [General Rules](../../general/) - Brand and design language
- [Marketing](./marketing/) - Marketing-specific rules
- [Product](./product/) - Product-specific rules
