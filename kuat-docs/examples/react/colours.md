# React Color Examples

Code examples for using Kuat Design System colors in React.

**Rules:** See [rules/design/colours.md](../../rules/design/colours.md)

---

## Basic Usage

```tsx
// Using Tailwind classes (recommended)
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Primary Action
  </button>
  <button className="bg-secondary text-secondary-foreground">
    Secondary Action
  </button>
  <p className="text-muted-foreground">Secondary text</p>
  <div className="border-destructive text-destructive">Error message</div>
</div>
```

---

## Button Examples

```tsx
// Primary Button
<button className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
  Primary Button
</button>

// Secondary Button
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
  Secondary Button
</button>

// Destructive Button
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>

// Ghost Button
<button className="hover:bg-accent hover:text-accent-foreground">
  Ghost Button
</button>
```

---

## Links

```tsx
<a href="#" className="text-primary hover:underline">
  Link text
</a>
```

---

## Form Inputs

```tsx
<input 
  className="bg-background border-input text-foreground focus:ring-ring" 
/>
```

---

## Cards

```tsx
<div className="bg-card text-card-foreground border-border rounded-lg p-4">
  Card content
</div>
```

---

## Status Indicators

```tsx
// Error
<div className="bg-destructive/10 text-destructive border-destructive">
  Error message
</div>

// Info
<div className="bg-primary/10 text-primary border-primary">
  Information
</div>
```

---

## Dark Mode

```tsx
// Colors adapt automatically when .dark class is applied
<html className="dark">
  <body className="bg-background text-foreground">
    {/* Colors automatically switch */}
  </body>
</html>
```

---

## Using CSS Variables

```tsx
// Inline styles with CSS variables
<div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
  Content
</div>
```

---

## Good vs Bad Examples

```tsx
// ✅ Good: Using semantic tokens
<div className="bg-background text-foreground">
  <h1 className="text-primary">Heading</h1>
  <p className="text-muted-foreground">Secondary text</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Action
  </button>
</div>

// ❌ Bad: Hardcoded colors
<div style={{ backgroundColor: '#ffffff', color: '#020617' }}>
  <button style={{ backgroundColor: '#1795d4', color: '#ffffff' }}>
    Action
  </button>
</div>
```

---

## Accessibility

```tsx
// ✅ Correct foreground/background pairing
<button className="bg-primary text-primary-foreground">
  Primary Action
</button>

// ❌ Wrong - using foreground on primary (low contrast)
<button className="bg-primary text-foreground">
  Action
</button>
```
