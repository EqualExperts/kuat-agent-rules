# CSS Spacing Examples

Vanilla CSS examples for using Kuat Design System spacing.

**Rules:** See [rules/design/spacing.md](../../rules/design/spacing.md)

---

## Spacing Scale

```css
/* 4px base unit (0.25rem) */
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

---

## Card Padding

```css
/* Standard card */
.card {
  padding: 1.5rem; /* 24px - equivalent to p-6 */
  background-color: var(--card);
  border: 1px solid var(--border);
}

/* Small card */
.card-sm {
  padding: 1rem; /* 16px - equivalent to p-4 */
}

/* Large card */
.card-lg {
  padding: 2rem; /* 32px - equivalent to p-8 */
}
```

---

## Button Padding

```css
/* Standard button */
.button {
  padding: 0.5rem 1rem; /* 8px 16px - equivalent to py-2 px-4 */
}

/* Small button */
.button-sm {
  padding: 0.375rem 0.75rem; /* 6px 12px - equivalent to py-1.5 px-3 */
}

/* Large button */
.button-lg {
  padding: 0.75rem 1.5rem; /* 12px 24px - equivalent to py-3 px-6 */
}
```

---

## Form Spacing

```css
/* Input padding */
.input {
  padding: 0.5rem 0.75rem; /* 8px 12px - equivalent to py-2 px-3 */
}

/* Label to input spacing */
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* 8px - equivalent to mb-2 */
}

/* Between form fields */
.form-group + .form-group {
  margin-top: 1rem; /* 16px - equivalent to space-y-4 */
}

/* Form sections */
.form-section + .form-section {
  margin-top: 1.5rem; /* 24px - equivalent to space-y-6 */
}
```

---

## Section Spacing

```css
/* Page sections */
.section + .section {
  margin-top: 3rem; /* 48px - equivalent to space-y-12 */
}

/* Content sections */
.content-section + .content-section {
  margin-top: 2rem; /* 32px - equivalent to space-y-8 */
}

/* Tight sections */
.tight-section + .tight-section {
  margin-top: 1rem; /* 16px - equivalent to space-y-4 */
}
```

---

## List Spacing

```css
/* Standard list */
.list li + li {
  margin-top: 1rem; /* 16px */
}

/* Tight list */
.list-tight li + li {
  margin-top: 0.5rem; /* 8px */
}

/* Spacious list */
.list-spacious li + li {
  margin-top: 1.5rem; /* 24px */
}
```

---

## Grid Gaps

```css
/* Standard grid */
.grid {
  display: grid;
  gap: 1rem; /* 16px - equivalent to gap-4 */
}

/* Tight grid */
.grid-tight {
  gap: 0.5rem; /* 8px - equivalent to gap-2 */
}

/* Spacious grid */
.grid-spacious {
  gap: 1.5rem; /* 24px - equivalent to gap-6 */
}
```

---

## Flexbox Gaps

```css
/* Button group */
.button-group {
  display: flex;
  gap: 0.5rem; /* 8px - equivalent to gap-2 */
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* 24px - equivalent to gap-6 */
}
```

---

## Container Padding

```css
/* Responsive container padding */
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

---

## Complete Layout Example

```css
.page {
  padding: 1.5rem; /* 24px */
}

.page-header {
  margin-bottom: 2rem; /* 32px */
}

.page-title {
  margin-bottom: 0.5rem; /* 8px */
}

.page-description {
  color: var(--muted-foreground);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; /* 16px */
}

.card {
  padding: 1.5rem; /* 24px */
  border: 1px solid var(--border);
}

.card-title {
  margin-bottom: 1rem; /* 16px */
}

.card-actions {
  margin-top: 1rem; /* 16px */
  display: flex;
  gap: 0.5rem; /* 8px */
}
```
