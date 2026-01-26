# Typography Rules

Pure typography specifications for the Kuat Design System. This document defines font families, type scale, and usage guidelines - independent of framework.

---

## Font Families

### Sans Serif (Default)

**Font:** Lexend  
**CSS Variable:** `--font-sans`  
**Fallback:** `Lexend, ui-sans-serif, sans-serif, system-ui`

**Use for:** All UI elements, body text, headings, interface copy

### Serif

**Font:** Lora  
**CSS Variable:** `--font-serif`  
**Fallback:** `Lora, ui-serif, Georgia, serif`

**Use for:** Decorative text, special emphasis (use sparingly)

### Monospace

**Font:** JetBrains Mono  
**CSS Variable:** `--font-mono`  
**Fallback:** `JetBrains Mono, ui-monospace, monospace`

**Use for:** Code blocks, technical content, data display

---

## Type Scale

Based on Tailwind's default typography scale (rem values):

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 0.75rem (12px) | 1rem (16px) | Labels, captions, metadata |
| sm | 0.875rem (14px) | 1.25rem (20px) | Secondary text, form inputs |
| base | 1rem (16px) | 1.5rem (24px) | Body text (default) |
| lg | 1.125rem (18px) | 1.75rem (28px) | Large body, subheadings |
| xl | 1.25rem (20px) | 1.75rem (28px) | Section headings |
| 2xl | 1.5rem (24px) | 2rem (32px) | Page headings |
| 3xl | 1.875rem (30px) | 2.25rem (36px) | Large headings |
| 4xl | 2.25rem (36px) | 2.5rem (40px) | Display text |
| 5xl | 3rem (48px) | 1 | Hero headings |
| 6xl | 3.75rem (60px) | 1 | Large hero text |
| 7xl | 4.5rem (72px) | 1 | Extra large display |
| 8xl | 6rem (96px) | 1 | Maximum display |
| 9xl | 8rem (128px) | 1 | Ultra large display |

---

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| thin | 100 | Rarely used |
| extralight | 200 | Rarely used |
| light | 300 | Large display text, subtle emphasis |
| normal | 400 | Default body text |
| medium | 500 | Form inputs, UI labels, subtle emphasis |
| semibold | 600 | Headings, important labels |
| bold | 700 | Strong emphasis, primary headings |
| extrabold | 800 | Maximum emphasis (use sparingly) |
| black | 900 | Maximum emphasis (use sparingly) |

### Recommended Weight Usage

- **Body Text:** 400 (normal)
- **Headings:** 600 (semibold) or 700 (bold)
- **Form Inputs:** 500 (medium) or 600 (semibold)
- **UI Labels:** 500 (medium)
- **Display Text:** 300 (light) for large sizes, 700 (bold) for impact

---

## Text Colors

Uses semantic color tokens (automatically adapt to light/dark mode):

| Token | Usage |
|-------|-------|
| `foreground` | Primary text color (default) |
| `muted-foreground` | Secondary text, hints, metadata |
| `primary` | Brand color text |
| `primary-foreground` | Text on primary backgrounds |
| `secondary` | Secondary brand color |
| `secondary-foreground` | Text on secondary backgrounds |
| `accent-foreground` | Text on accent backgrounds |
| `destructive` | Error text, warnings |
| `destructive-foreground` | Text on destructive backgrounds |

---

## Letter Spacing

Based on CSS variable `--tracking-normal` (0.01em):

| Name | Value | Usage |
|------|-------|-------|
| tighter | -0.05em | Tighter spacing |
| tight | -0.025em | Slightly tighter |
| normal | 0.01em | Default spacing |
| wide | +0.025em | Slightly wider |
| wider | +0.05em | Wider spacing |
| widest | +0.1em | Maximum spacing |

---

## Line Height

| Name | Value | Usage |
|------|-------|-------|
| none | 1 | Tight spacing (large headings) |
| tight | 1.25 | Compact text |
| snug | 1.375 | Slightly tight |
| normal | 1.5 | Default body text |
| relaxed | 1.625 | Comfortable reading |
| loose | 2 | Generous spacing |

---

## Typography Hierarchy

Establish clear visual hierarchy:

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 4xl-5xl | bold | Main page title |
| H2 | 2xl-3xl | semibold/bold | Section heading |
| H3 | xl-2xl | semibold | Subsection heading |
| Body | base | normal | Primary content |
| Supporting | sm | normal/medium | Secondary information |
| Labels/Captions | xs-sm | medium | Metadata, form labels |

---

## Accessibility Requirements

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 contrast ratio
- **Proper heading hierarchy:** h1 → h2 → h3 (no skipping levels)
- **Minimum body text size:** 12px (0.75rem)

---

## Usage Guidelines

### Do's

1. **Use semantic HTML** - Use proper `<h1>` through `<h6>`, `<p>` elements
2. **Maintain hierarchy** - Visual styling matches semantic structure
3. **Use semantic colors** - Prefer `foreground`, `muted-foreground` tokens
4. **Stick to the scale** - Use defined sizes, not arbitrary values
5. **Use `font-sans` by default** - Only use `font-mono` for code

### Don'ts

1. **Don't hardcode sizes** - Use the type scale
2. **Don't skip heading levels** - h1 → h3 is invalid
3. **Don't use low-contrast colors** - Verify accessibility
4. **Don't mix font families** - Stick to system fonts
5. **Don't use sizes smaller than 12px** - Maintain readability

---

## Responsive Typography

Adjust sizes across breakpoints:

| Breakpoint | Heading Scale | Body |
|------------|---------------|------|
| Mobile (< 640px) | 2xl-3xl | base |
| Tablet (640-1024px) | 3xl-4xl | base |
| Desktop (> 1024px) | 4xl-5xl | base |

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/typography.md](../../examples/react/typography.md) |
| Vue | [examples/vue/typography.md](../../examples/vue/typography.md) |
| CSS | [examples/css/typography.md](../../examples/css/typography.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Tailwind classes: `text-lg`, `font-semibold`, `text-foreground`
- CSS variables: `var(--font-sans)`, `var(--foreground)`
