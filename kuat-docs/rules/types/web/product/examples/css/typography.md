# CSS Typography Examples

Vanilla CSS examples for using Kuat Design System typography.

**Rules:** See [foundations/design/typography.md](../../../../foundations/design/typography.md)

---

## Font Families

```css
/* Sans serif (default) */
.font-sans {
  font-family: var(--font-sans);
}

/* Monospace */
.font-mono {
  font-family: var(--font-mono);
}

/* Serif */
.font-serif {
  font-family: var(--font-serif);
}

/* Applied to body */
body {
  font-family: var(--font-sans);
}

/* Code blocks */
code, pre {
  font-family: var(--font-mono);
}
```

---

## Text Sizes

```css
/* Using rem values from the type scale */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
```

---

## Heading Styles

```css
h1 {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700;
  line-height: 2.5rem;
  color: var(--foreground);
}

h2 {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 600;
  line-height: 2.25rem;
  color: var(--foreground);
}

h3 {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;
  line-height: 1.75rem;
  color: var(--foreground);
}
```

---

## Body Text

```css
body {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--foreground);
}

p {
  margin-bottom: 1rem;
}
```

---

## Text Colors

```css
/* Primary text */
.text-primary {
  color: var(--foreground);
}

/* Secondary/muted text */
.text-muted {
  color: var(--muted-foreground);
}

/* Brand color text */
.text-brand {
  color: var(--primary);
}

/* Error text */
.text-error {
  color: var(--destructive);
}
```

---

## Font Weights

```css
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## Letter Spacing

```css
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: var(--tracking-normal); }
.tracking-wide { letter-spacing: 0.025em; }
```

---

## Complete Typography Example

```css
/* Page title */
.page-title {
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  color: var(--foreground);
  margin-bottom: 1rem;
}

/* Section heading */
.section-heading {
  font-family: var(--font-sans);
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 2.25rem;
  color: var(--foreground);
  margin-bottom: 0.75rem;
}

/* Body text */
.body-text {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: var(--foreground);
}

/* Caption/helper text */
.caption {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: var(--muted-foreground);
}

/* Code */
.code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background-color: var(--muted);
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
}
```
