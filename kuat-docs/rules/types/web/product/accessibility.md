---
scope: type
platform: web_product
prerequisites: general/accessibility.md
---

# Technical Accessibility

Implementation rules for WCAG 2.2 AA compliance in web applications.

---

**Prerequisites:** Load [general accessibility rules](../../../general/accessibility.md) first.

---

## Quick reference

- **Semantic HTML:** Use `<button>`, `<a href>`, `<input>`, headings, lists, tables; avoid div/span for interactive or structural meaning.
- **Keyboard:** All interactive elements focusable; logical focus order; visible focus (e.g. ring tokens); no traps; Escape closes modals.
- **Focus:** Modals trap focus, return focus on close, initial focus on first interactive element or title.
- **ARIA:** Use only when native HTML is insufficient; prefer native over ARIA.
- **Landmarks:** Use `<main>`, `<nav>`, `<header>`, `<footer>`; one `<main>` per page.
- **Forms:** Visible labels, required/error states, clear error messages, no time limits unless necessary.
- **Touch:** Minimum 44×44px touch targets; support viewport zoom.
- **Motion:** Respect `prefers-reduced-motion`; provide static alternative.

*Full detail follows.*

---

## Overview

Technical accessibility ensures that interfaces work correctly with assistive technologies and can be operated by all users regardless of input method.

**Key principle:** Use native HTML elements correctly before reaching for ARIA.

---

## Semantic HTML

### Use Appropriate Elements

| Purpose | Use | Don't Use |
|---------|-----|-----------|
| Buttons (actions) | `<button>` | `<div onclick>` |
| Links (navigation) | `<a href>` | `<span onclick>` |
| Text input | `<input>` | `<div contenteditable>` |
| Lists | `<ul>`, `<ol>`, `<dl>` | Divs with manual bullets |
| Headings | `<h1>` - `<h6>` | Styled `<div>` or `<p>` |
| Tables | `<table>` with `<th>` | Grid of divs |

### Heading Hierarchy

- One `<h1>` per page (the main title)
- Never skip heading levels (H1 → H2 → H3)
- Headings create document outline for screen readers
- Use CSS for visual styling, not heading levels

### Native Over ARIA

> "The first rule of ARIA is: don't use ARIA if you can use native HTML."

Native elements have built-in accessibility:
- Keyboard support
- Focus management
- Screen reader announcements
- Form validation

---

## Keyboard Navigation

### Requirements

- All interactive elements must be focusable
- Focus order must be logical (follows DOM order)
- Visible focus indicators at all times
- No keyboard traps (user can always tab away)

### Standard Key Bindings

| Key | Action |
|-----|--------|
| Tab | Move focus to next interactive element |
| Shift + Tab | Move focus to previous element |
| Enter | Activate buttons and links |
| Space | Activate buttons, toggle checkboxes |
| Escape | Close modals, menus, dropdowns |
| Arrow keys | Navigate within components (menus, tabs, radio groups) |

### Focus Indicators

- Use Kuat's `ring` tokens for focus styling
- Focus must be visible in both light and dark modes
- Never use `outline: none` without replacement
- Ensure 3:1 contrast ratio for focus indicator

```css
/* Kuat focus pattern */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

---

## Focus Management

### General Rules

- Focus should be visible at all times
- Focus order should match visual order
- Don't move focus unexpectedly

### Modals and Dialogs

1. **Trap focus** - Focus stays within modal while open
2. **Initial focus** - Move focus to first interactive element (or modal title)
3. **Return focus** - When closed, return focus to trigger element
4. **Escape to close** - Always support Escape key

### Dynamic Content

- When content updates, consider if focus should move
- Announce important changes to screen readers
- Don't auto-focus unless user-initiated

### Skip Links

For pages with significant navigation:

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

- Position visually hidden until focused
- First focusable element on page
- Target the main content area

---

## ARIA

Use ARIA only when native HTML is insufficient.

### Common ARIA Attributes

| Pattern | Attributes | Usage |
|---------|------------|-------|
| Loading state | `aria-busy="true"` | While content is loading |
| Disabled | `aria-disabled="true"` | When action unavailable (prefer native `disabled`) |
| Expanded | `aria-expanded="true/false"` | Accordions, dropdowns, menus |
| Current | `aria-current="page"` | Current page in navigation |
| Modal | `role="dialog"`, `aria-modal="true"` | Modal dialogs |
| Live regions | `aria-live="polite/assertive"` | Dynamic content updates |

### Error States

| Attribute | Purpose |
|-----------|---------|
| `aria-invalid="true"` | Mark field as invalid |
| `aria-describedby="error-id"` | Link field to error message |
| `aria-errormessage="error-id"` | Alternative to describedby (newer) |

### Labels and Descriptions

| Attribute | Use When |
|-----------|----------|
| `aria-label` | No visible text label available |
| `aria-labelledby` | Label exists elsewhere on page |
| `aria-describedby` | Additional descriptive text (hints, errors) |

---

## Landmark Roles

Landmarks help screen reader users navigate page structure.

### Required Landmarks

| Landmark | HTML Element | Role |
|----------|--------------|------|
| Banner | `<header>` | `role="banner"` |
| Main | `<main>` | `role="main"` |
| Navigation | `<nav>` | `role="navigation"` |
| Footer | `<footer>` | `role="contentinfo"` |
| Search | - | `role="search"` |
| Complementary | `<aside>` | `role="complementary"` |

### Rules

- **One `<main>` per page** - The primary content area
- Use semantic HTML elements (they have implicit roles)
- Multiple `<nav>` elements should have unique `aria-label`
- `<header>` as direct child of `<body>` = banner role

### Example Structure

```html
<body>
  <header><!-- banner --></header>
  <nav aria-label="Main"><!-- navigation --></nav>
  <main><!-- main content --></main>
  <aside><!-- complementary --></aside>
  <footer><!-- contentinfo --></footer>
</body>
```

---

## Forms

### Labels

- Every input **must** have an associated `<label>`
- Use `for` attribute matching input `id`
- Never use placeholder as the only label

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" />
```

### Required Fields

- Mark required fields visually (asterisk *)
- Use `aria-required="true"` or `required` attribute
- Explain required field indicator at form start

### Error Handling

- Link error messages to fields with `aria-describedby`
- Use `aria-invalid="true"` on invalid fields
- Provide clear, actionable error messages

```html
<label for="email">Email address *</label>
<input 
  type="email" 
  id="email" 
  aria-describedby="email-error"
  aria-invalid="true"
/>
<p id="email-error" class="text-destructive">
  Please enter a valid email address
</p>
```

### Form Validation Pattern

**Validate on submit, not on blur:**

| Rule | Rationale |
|------|-----------|
| **Validate on submit** | Show all errors after form submission attempt |
| **Never disable submit buttons** | Users should always be able to attempt submission |
| **No inline validation on blur** | Don't interrupt users mid-flow |
| **Error summary at top** | Show summary with links to invalid fields |
| **Focus first invalid field** | After failed submission, move focus to first error |

### Grouping

- Group related fields with `<fieldset>` and `<legend>`
- Use for radio button groups, checkbox groups, address fields

```html
<fieldset>
  <legend>Notification preferences</legend>
  <!-- related checkboxes -->
</fieldset>
```

### Time Limits

- No time limits on form completion (or provide generous extensions)
- Warn users before session timeout
- Allow users to extend or disable timeouts

---

## Responsive Design

### Orientation

- Content must work in both portrait and landscape
- Don't restrict orientation unless essential (e.g., piano app)

### Viewport

- No horizontal scrolling at 320px viewport width
- Content must reflow, not require two-dimensional scrolling
- Exception: data tables, images, maps may scroll horizontally

### Touch Targets

| Context | Minimum Size |
|---------|--------------|
| Mobile touch targets | 44x44px |
| Spacing between targets | 8px minimum |
| Desktop click targets | 24x24px minimum |

### Text Scaling

- Support text scaling up to 200%
- Use relative units (`rem`, `em`) not fixed `px` for fonts
- Test at browser zoom 200%

---

## Page Requirements

### Page Titles

- Every page needs a unique, descriptive `<title>`
- Format: "Page Name | Site Name"
- Helps users identify pages in tabs and history

### Language

- Declare page language: `<html lang="en">`
- Mark language changes inline: `<span lang="fr">Bonjour</span>`
- Helps screen readers pronounce content correctly

### Consistent Navigation

- Navigation must appear in same location across pages
- Same components should behave consistently
- Don't rearrange navigation unexpectedly

### Multiple Navigation Methods

Provide multiple ways to find content:

- Navigation menus
- Search functionality
- Site map
- Breadcrumbs

---

## Motion and Reduced Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Kuat Implementation

Kuat components automatically respect `prefers-reduced-motion`. When building custom animations:

- Check for reduced motion preference
- Provide static alternatives
- Never use motion for essential information

---

## Testing Checklist

### Keyboard Testing

- [ ] Can reach all interactive elements with Tab
- [ ] Focus order is logical
- [ ] Focus indicator is visible
- [ ] Can activate buttons/links with Enter/Space
- [ ] Can close modals with Escape
- [ ] No keyboard traps

### Screen Reader Testing

- [ ] Page has descriptive title
- [ ] Headings create logical outline
- [ ] Images have appropriate alt text
- [ ] Links and buttons have clear labels
- [ ] Form fields are labelled
- [ ] Error messages are announced

### Visual Testing

- [ ] Content visible at 200% zoom
- [ ] Works in both orientations
- [ ] Colour contrast meets requirements
- [ ] Information not conveyed by colour alone

---

## Related Documentation

- [General Accessibility](../../../general/accessibility.md) - Principles and guidelines
- [Component Decision Tree](./component-decision-tree.md) - Component selection and patterns
- [Product Design](./design.md) - Layout patterns
- [Product Scenarios](./scenarios/) - Applied patterns for specific page types
