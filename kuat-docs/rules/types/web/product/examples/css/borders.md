# CSS Border Examples

Vanilla CSS examples for using Kuat Design System borders.

**Rules:** See [general/borders.md](../../../../general/borders.md)

---

## Basic Borders

```css
/* 1px default border */
.bordered {
  border: 1px solid var(--border);
}

/* 2px emphasized border */
.bordered-emphasis {
  border: 2px solid var(--primary);
}
```

---

## Border Radius

```css
/* No radius - static content (default) */
.card-static {
  border-radius: 0;
}

/* 6px radius - interactive elements */
.button,
.card-clickable {
  border-radius: 6px;
}

/* 4px radius - form inputs */
.input,
.textarea,
.select {
  border-radius: 4px;
}
```

---

## Card Styles

```css
/* Static card (no radius) */
.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 1.5rem;
}

/* Clickable card (6px radius) */
.card-interactive {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.card-interactive:hover {
  background-color: var(--muted);
}
```

---

## Form Input Styles

```css
/* Standard input (4px radius) */
.input {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--input);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
}

/* Input with error (2px border) */
.input-error {
  border: 2px solid var(--destructive);
}

.input-error:focus {
  box-shadow: 0 0 0 2px var(--destructive);
}
```

---

## Button Styles

```css
/* Button with 6px radius */
.button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  opacity: 0.9;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
```

---

## Focus Rings

```css
/* Standard focus ring */
.focusable:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
}

/* Focus ring with offset */
.focusable-offset:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
```

---

## Dividers

```css
/* Horizontal divider */
.divider-horizontal {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.5rem 0;
}

/* Vertical divider */
.divider-vertical {
  border: none;
  border-left: 1px solid var(--border);
  height: 100%;
  margin: 0 1rem;
}
```

---

## Sidebar Borders

```css
.sidebar {
  background-color: var(--sidebar);
  border-right: 1px solid var(--sidebar-border);
}
```

---

## Complete Form Example

```css
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--input);
  border-radius: 4px;
  transition: box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
}

.form-input.is-invalid {
  border: 2px solid var(--destructive);
}

.form-input.is-invalid:focus {
  box-shadow: 0 0 0 2px var(--destructive);
}

.form-error {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--destructive);
}

.form-submit {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-foreground);
  background-color: var(--primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form-submit:hover {
  opacity: 0.9;
}

.form-submit:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
```
