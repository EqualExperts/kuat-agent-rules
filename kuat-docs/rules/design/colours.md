# Color Rules

Pure color specifications for the Kuat Design System. This document defines the brand colors, semantic tokens, and usage guidelines - independent of framework.

---

## Brand Colors

The Kuat Design System uses four core brand color palettes:

### EE Blue (Primary)

**Purpose:** Trust, professionalism, technology  
**Value:** `oklch(0.645 0.163 237.5)` / `#0066CC`  
**CSS Variable:** `--brand-ee-blue`

**Use for:**
- Primary actions (main buttons, links, CTAs)
- Brand identity elements
- Navigation active states
- Focus rings

### Transform Teal (Secondary)

**Purpose:** Transformation, growth, innovation  
**Value:** `oklch(0.645 0.120 185.0)`  
**CSS Variable:** `--brand-transform-teal`

**Use for:**
- Secondary actions
- Accent elements and badges
- Success indicators
- Data visualization

### Tech Blue (Supporting)

**Purpose:** Technical, professional, structural  
**Value:** `oklch(0.435 0.090 240.0)`  
**CSS Variable:** `--brand-tech-blue`

**Use for:**
- Sidebar navigation backgrounds
- Technical interfaces
- Dark mode card backgrounds
- Depth and structure

### Equal Ember (Accent)

**Purpose:** Energy, warmth, attention  
**Value:** `oklch(0.625 0.200 65.0)`  
**CSS Variable:** `--brand-equal-ember`

**Use for:**
- Special highlights (use sparingly)
- Warning states
- Attention-grabbing elements

---

## Brand Color Palette Scale

Each brand color has a scale from 50 (lightest) to 950 (darkest):

| Range | Usage |
|-------|-------|
| 50-200 | Light backgrounds, subtle accents, hover states |
| 300-500 | Primary brand colors, main actions |
| 600-800 | Darker variants for depth and contrast |
| 900-950 | Maximum depth, dark mode, high contrast |

**CSS Variables:** `--ee-blue-50` through `--ee-blue-950` (same pattern for all brand colors)

---

## Semantic Color Tokens

Semantic tokens map brand colors to UI purposes:

| Token | Purpose | Light Mode | Dark Mode |
|-------|---------|------------|-----------|
| `--background` | Page backgrounds | White | Slate-900 |
| `--foreground` | Primary text | Slate-950 | White |
| `--primary` | Primary brand, main actions | EE Blue 500 | EE Blue 500 |
| `--primary-foreground` | Text on primary | White | White |
| `--secondary` | Secondary brand | Transform Teal 500 | Transform Teal 500 |
| `--secondary-foreground` | Text on secondary | White | White |
| `--muted` | Subtle backgrounds | Slate-100 | Slate-800 |
| `--muted-foreground` | Secondary text | Slate-500 | Slate-300 |
| `--accent` | Highlights | EE Blue 50 | EE Blue 800 |
| `--accent-foreground` | Text on accent | Slate-950 | White |
| `--destructive` | Errors, warnings | Red-600 | Red-600 |
| `--destructive-foreground` | Text on destructive | White | White |
| `--border` | Borders, dividers | Slate-200 | Slate-700 |
| `--input` | Input borders | White | Slate-600 |
| `--ring` | Focus rings | Slate-300 | Slate-300 |

---

## Component-Specific Colors

### Card Colors
- `--card`: White (light) / Tech Blue 800 (dark)
- `--card-foreground`: Slate-950

### Popover Colors
- `--popover`: Black
- `--popover-foreground`: White

### Sidebar Colors (for dark navigation)
- `--sidebar`: Tech Blue 500 (light) / Tech Blue 700 (dark)
- `--sidebar-foreground`: White
- `--sidebar-primary`: EE Blue 500
- `--sidebar-primary-foreground`: EE Blue 50
- `--sidebar-accent`: Slate-200 (light) / EE Blue 700 (dark)
- `--sidebar-accent-foreground`: Tech Blue 500
- `--sidebar-border`: Slate-200
- `--sidebar-ring`: Slate-100

### Chart Colors
- `--chart-1`: Blue (#1f77b4)
- `--chart-2`: Orange (#ff7f0e)
- `--chart-3`: Green (#2ca02c)
- `--chart-4`: Red (#d62728)
- `--chart-5`: Purple (#9467bd)

---

## Color Format

All colors use **OKLCH** color space:

```
oklch(lightness chroma hue)
```

**Benefits:**
- Perceptual uniformity (equal changes = equal perception)
- Better color manipulation for consistent scales
- Modern CSS format with excellent browser support

---

## Light and Dark Mode

Colors automatically adapt based on the `.dark` class on the root element:

- **Light Mode:** Defined in `:root` selector
- **Dark Mode:** Defined in `.dark` selector

**Behavior:**
- Background switches from white to slate-900
- Foreground switches from slate-950 to white
- Brand colors (primary, secondary) remain consistent
- Supporting colors adapt for better contrast

---

## Accessibility Requirements

All color combinations must meet **WCAG AA** standards:

| Content Type | Minimum Contrast |
|--------------|------------------|
| Normal text (14px and below) | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| Graphical objects/borders | 3:1 |

**Approved Combinations:**
- `foreground` on `background` ✓
- `primary-foreground` on `primary` ✓
- `secondary-foreground` on `secondary` ✓
- `muted-foreground` on `muted` ✓
- `destructive-foreground` on `destructive` ✓

---

## Usage Guidelines

### Do's

1. **Always use semantic tokens** - Use `primary`, `foreground`, not hardcoded hex values
2. **Pair colors correctly** - Always use `-foreground` variants on colored backgrounds
3. **Leverage automatic dark mode** - Semantic tokens handle mode switching
4. **Use opacity modifiers** - For hover states: `/90`, `/50`, `/10`
5. **Respect brand hierarchy** - Primary for main actions, secondary for alternatives

### Don'ts

1. **Don't hardcode colors** - Never use `#1795d4` directly
2. **Don't mix systems** - Don't combine tokens with hardcoded colors
3. **Don't break accessibility** - Always verify contrast ratios
4. **Don't misuse brand colors** - Each has a specific purpose
5. **Don't create custom variations** - Use only design system tokens

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/colours.md](../../examples/react/colours.md) |
| Vue | [examples/vue/colours.md](../../examples/vue/colours.md) |
| CSS | [examples/css/colours.md](../../examples/css/colours.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Tailwind classes: `bg-primary`, `text-foreground`, `border-border`
- CSS variables: `var(--primary)`, `var(--background)`
