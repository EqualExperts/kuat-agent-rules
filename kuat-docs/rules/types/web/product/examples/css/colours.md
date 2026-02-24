# CSS Color Examples

Vanilla CSS examples for using Kuat Design System colors.

**Rules:** See [foundations/design/colours.md](../../../../foundations/design/colours.md)

---

## Using CSS Variables

```css
/* Basic color usage */
.container {
  background-color: var(--background);
  color: var(--foreground);
}

/* Primary button */
.button-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.button-primary:hover {
  opacity: 0.9;
}

/* Secondary button */
.button-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

/* Destructive button */
.button-destructive {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}
```

---

## Card Styling

```css
.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  padding: 1.5rem;
}
```

---

## Form Inputs

```css
.input {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--input);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
}
```

---

## Status States

```css
/* Error state */
.error {
  background-color: rgba(var(--destructive), 0.1);
  color: var(--destructive);
  border: 1px solid var(--destructive);
}

/* Muted/secondary text */
.text-secondary {
  color: var(--muted-foreground);
}
```

---

## Links

```css
.link {
  color: var(--primary);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
```

---

## Dark Mode

```css
/* Colors automatically switch when .dark class is on root */
.dark .container {
  /* Uses dark mode values from variables.css */
}

/* Manual dark mode override if needed */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Dark mode styles */
  }
}
```

---

## Brand Colors

```css
/* Accessing brand color scales */
.ee-blue-bg {
  background-color: var(--ee-blue-500);
}

.tech-blue-bg {
  background-color: var(--tech-blue-500);
}

.transform-teal-bg {
  background-color: var(--transform-teal-500);
}

.equal-ember-bg {
  background-color: var(--equal-ember-500);
}

/* Light shade */
.ee-blue-light {
  background-color: var(--ee-blue-100);
}

/* Dark shade */
.ee-blue-dark {
  background-color: var(--ee-blue-700);
}
```

---

## Sidebar Colors

```css
.sidebar {
  background-color: var(--sidebar);
  color: var(--sidebar-foreground);
  border-right: 1px solid var(--sidebar-border);
}

.sidebar-link {
  color: var(--sidebar-foreground);
}

.sidebar-link:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.sidebar-link.active {
  background-color: var(--sidebar-primary);
  color: var(--sidebar-primary-foreground);
}
```
