# Spacing Rules

Pure spacing specifications for the Kuat Design System. This document defines the spacing scale, patterns, and usage guidelines - independent of framework.

---

## Overview

The design system uses a **4px base unit** (0.25rem) for consistent, predictable spacing.

**Key Principle:** Use spacing as the primary tool for visual hierarchy and separation. Prefer spacing over borders when possible.

---

## Spacing Scale

Each unit = 0.25rem (4px):

| Unit | Value | Pixels | Usage |
|------|-------|--------|-------|
| 0 | 0 | 0px | No spacing |
| 0.5 | 0.125rem | 2px | Tight spacing, fine adjustments |
| 1 | 0.25rem | 4px | Minimal spacing, tight groups |
| 1.5 | 0.375rem | 6px | Small spacing |
| 2 | 0.5rem | 8px | Small spacing, compact layouts |
| 2.5 | 0.625rem | 10px | Small-medium spacing |
| 3 | 0.75rem | 12px | Medium spacing, form fields |
| 4 | 1rem | 16px | Standard spacing, default padding |
| 5 | 1.25rem | 20px | Medium-large spacing |
| 6 | 1.5rem | 24px | Large spacing, section separation |
| 8 | 2rem | 32px | Extra large, major sections |
| 10 | 2.5rem | 40px | Very large spacing |
| 12 | 3rem | 48px | Maximum spacing, page sections |
| 16 | 4rem | 64px | Hero spacing, large sections |
| 20 | 5rem | 80px | Maximum hero spacing |
| 24 | 6rem | 96px | Ultra large spacing |

---

## Common Spacing Patterns

### Component Padding

| Component | Padding | Pixels |
|-----------|---------|--------|
| Small cards | p-4 | 16px |
| Standard cards | p-6 | 24px |
| Large cards | p-8 | 32px |
| Small buttons | px-3 py-1.5 | 12px/6px |
| Standard buttons | px-4 py-2 | 16px/8px |
| Large buttons | px-6 py-3 | 24px/12px |
| Form inputs | px-3 py-2 | 12px/8px |

### Form Spacing

| Element | Spacing | Pixels |
|---------|---------|--------|
| Label to input | mb-2 | 8px |
| Between form fields | space-y-4 | 16px |
| Between form sections | space-y-6 | 24px |

### Section Spacing

| Type | Spacing | Pixels |
|------|---------|--------|
| Tight (related content) | space-y-4 | 16px |
| Standard sections | space-y-6 | 24px |
| Large sections | space-y-8 | 32px |
| Page sections | space-y-12 | 48px |

### List Spacing

| Type | Spacing | Pixels |
|------|---------|--------|
| Tight lists | space-y-2 | 8px |
| Standard lists | space-y-4 | 16px |
| Spacious lists | space-y-6 | 24px |

### Layout Spacing

| Element | Spacing |
|---------|---------|
| Container padding | px-4 md:px-6 lg:px-8 |
| Grid gap | gap-4 (16px) standard |
| Tight grid | gap-2 (8px) |
| Spacious grid | gap-6 (24px) |
| Button groups | gap-2 (8px) |
| Navigation items | gap-6 (24px) |

---

## Spacing Relationships

Use consistent spacing relationships:

| Relationship | Spacing |
|--------------|---------|
| Tightly related elements | 2-4 (8-16px) |
| Component groups | 6-8 (24-32px) |
| Major sections | 12-16 (48-64px) |

---

## Usage Guidelines

### Do's

1. **Use the spacing scale** - Stick to defined values (4, 6, 8, 12, 16, 24, 32, 48)
2. **Prefer spacing over borders** - Create separation with space first
3. **Maintain relationships** - Smaller spacing for related items, larger for sections
4. **Use responsive spacing** - Adjust for mobile vs desktop
5. **Be consistent** - Same spacing patterns across similar components

### Don'ts

1. **Don't use arbitrary values** - Never `p-[13px]` or `m-[7px]`
2. **Don't mix spacing systems** - Use only the defined scale
3. **Don't overuse spacing** - Excessive spacing breaks visual flow
4. **Don't hardcode spacing** - Use utility classes, not inline styles
5. **Don't ignore accessibility** - Ensure spacing supports readability

---

## Spacing vs Borders

**Prefer spacing when:**
- Creating separation between related content
- Establishing visual hierarchy
- Adding breathing room

**Use borders when:**
- Spacing alone is insufficient
- Defining interactive element boundaries
- Indicating state changes (focus, error)

---

## Responsive Spacing

Adjust spacing across breakpoints:

| Breakpoint | Container Padding | Section Spacing |
|------------|-------------------|-----------------|
| Mobile (< 640px) | px-4 (16px) | space-y-6 (24px) |
| Tablet (640-1024px) | px-6 (24px) | space-y-8 (32px) |
| Desktop (> 1024px) | px-8 (32px) | space-y-12 (48px) |

---

## shadcn/ui Component Spacing

Standard spacing used in shadcn/ui components:

| Component | Spacing Pattern |
|-----------|-----------------|
| Card | p-6 padding, space-y-4 content |
| Button | px-4 py-2 padding, gap-2 icon spacing |
| Input | px-3 py-2 padding |
| Dialog | p-6 padding, space-y-4 content, mt-6 footer |
| Form | space-y-4 fields, space-y-6 sections |

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/spacing.md](../../examples/react/spacing.md) |
| Vue | [examples/vue/spacing.md](../../examples/vue/spacing.md) |
| CSS | [examples/css/spacing.md](../../examples/css/spacing.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Tailwind classes: `p-4`, `mx-auto`, `gap-6`, `space-y-4`
- CSS variables: `var(--spacing)` (4px base unit)
