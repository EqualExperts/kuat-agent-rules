# React Spacing Examples

Code examples for using Kuat Design System spacing in React.

**Rules:** See [rules/design/spacing.md](../../rules/design/spacing.md)

---

## Card Padding

```tsx
// Standard card padding
<div className="bg-card border border-border rounded-lg p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// Small card
<div className="bg-card border border-border rounded-lg p-4">
  Compact card
</div>

// Large card
<div className="bg-card border border-border rounded-lg p-8">
  Spacious card
</div>
```

---

## Form Spacing

```tsx
// Form with consistent spacing
<form className="space-y-4">
  <div>
    <label className="block mb-2">Label</label>
    <input className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
  <div>
    <label className="block mb-2">Another Label</label>
    <input className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
    Submit
  </button>
</form>
```

---

## Section Spacing

```tsx
// Page with section spacing
<div className="space-y-8">
  <section>
    <h2 className="text-2xl font-bold mb-4">Section Title</h2>
    <p>Content</p>
  </section>
  <section>
    <h2 className="text-2xl font-bold mb-4">Another Section</h2>
    <p>More content</p>
  </section>
</div>
```

---

## Button Spacing

```tsx
// Small button
<button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-[6px]">
  Small
</button>

// Standard button
<button className="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
  Standard
</button>

// Large button
<button className="px-6 py-3 bg-primary text-primary-foreground rounded-[6px]">
  Large
</button>
```

---

## List Spacing

```tsx
<ul className="space-y-4">
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
```

---

## Grid Layouts

```tsx
// Standard grid
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Tight grid
<div className="grid grid-cols-4 gap-2">
  {/* items */}
</div>

// Spacious grid
<div className="grid grid-cols-2 gap-6">
  {/* items */}
</div>
```

---

## Flex Layouts

```tsx
// Button group
<div className="flex gap-2">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Navigation
<nav className="flex items-center gap-6">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</nav>
```

---

## Responsive Spacing

```tsx
<div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
  <h1>Responsive Container</h1>
  <p>Spacing adapts to screen size</p>
</div>
```

---

## Good vs Bad

```tsx
// ✅ Good: Using spacing scale
<div className="bg-card p-6 mb-4">
  <h3 className="mb-4">Title</h3>
  <p className="mb-4">Content</p>
</div>

// ❌ Bad: Arbitrary values
<div className="bg-card p-[13px] mb-[7px]">
  <h3 className="mb-[11px]">Title</h3>
  <p className="mb-[9px]">Content</p>
</div>
```
