# React Border Examples

Code examples for using Kuat Design System borders in React.

**Rules:** See [rules/design/borders.md](../../rules/design/borders.md)

---

## Basic Borders

```tsx
// 1px default border
<div className="border border-border">Content</div>

// 2px emphasized border
<div className="border-2 border-primary">Important content</div>

// Focus ring (4px)
<button className="focus:ring-4 focus:ring-ring">Button</button>
```

---

## Border Radius

```tsx
// Static card (no radius)
<div className="bg-card border border-border p-6">
  Card content (no radius)
</div>

// Interactive button (6px radius)
<button className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2">
  Click me
</button>

// Clickable card (6px radius)
<div className="bg-card border border-border rounded-[6px] p-4 cursor-pointer hover:bg-muted">
  Clickable card
</div>

// Form input (4px radius)
<input 
  type="text" 
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
  placeholder="Enter text"
/>

// Textarea (4px radius)
<textarea 
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
  rows={4}
/>
```

---

## Card Borders

```tsx
// Card with border
<div className="bg-card border border-border p-6">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

---

## Form Input Borders

```tsx
// Standard input
<input 
  type="text"
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-2 focus:ring-ring"
/>

// Input with error
<input 
  type="text"
  className="bg-background border-2 border-destructive rounded-[4px] px-3 py-2"
  aria-invalid="true"
/>
```

---

## Dividers

```tsx
// Horizontal divider
<div className="border-t border-border my-6"></div>

// Vertical divider
<div className="border-l border-border pl-6"></div>
```

---

## Focus Rings

```tsx
<button className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2 focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Focusable Button
</button>
```

---

## Spacing vs Borders

```tsx
// ✅ Good: Using spacing for separation (preferred)
<div className="space-y-8">
  <section>
    <h2 className="text-2xl font-bold mb-4">Section Title</h2>
    <p>Content here</p>
  </section>
  <section>
    <h2 className="text-2xl font-bold mb-4">Another Section</h2>
    <p>More content</p>
  </section>
</div>

// ❌ Avoid: Unnecessary borders when spacing is sufficient
<div>
  <section className="border-b pb-6">
    <h2>Section Title</h2>
  </section>
  <section className="pt-6">
    <h2>Another Section</h2>
  </section>
</div>
```

---

## Good vs Bad

```tsx
// ✅ Good: Correct radius for element types
<div className="bg-card border border-border p-6">
  <h3>Static Card (no radius)</h3>
</div>

<div className="bg-card border border-border rounded-[6px] p-6 cursor-pointer">
  <h3>Clickable Card (6px radius)</h3>
</div>

<input className="border border-input rounded-[4px] px-3 py-2" />

// ❌ Bad: Wrong radius for element types
<div className="bg-card border border-border rounded-[6px] p-6">
  <h3>Static Card (should have no radius)</h3>
</div>

<input className="border border-input rounded-[6px] px-3 py-2" />
```
