# Vue Border Examples

Code examples for using Kuat Design System borders in Vue.

**Rules:** See [foundations/design/borders.md](../../../../foundations/design/borders.md)

---

## Basic Borders

```vue
<template>
  <!-- 1px default border -->
  <div class="border border-border">Content</div>

  <!-- 2px emphasized border -->
  <div class="border-2 border-primary">Important content</div>

  <!-- Focus ring (4px) -->
  <button class="focus:ring-4 focus:ring-ring">Button</button>
</template>
```

---

## Border Radius

```vue
<template>
  <!-- Static card (no radius) -->
  <div class="bg-card border border-border p-6">
    Card content (no radius)
  </div>

  <!-- Interactive button (6px radius) -->
  <button class="bg-primary text-primary-foreground rounded-[6px] px-4 py-2">
    Click me
  </button>

  <!-- Clickable card (6px radius) -->
  <div class="bg-card border border-border rounded-[6px] p-4 cursor-pointer hover:bg-muted">
    Clickable card
  </div>

  <!-- Form input (4px radius) -->
  <input 
    type="text" 
    class="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
    placeholder="Enter text"
  />

  <!-- Textarea (4px radius) -->
  <textarea 
    class="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
    rows="4"
  />
</template>
```

---

## Card Borders

```vue
<template>
  <!-- Card with border -->
  <div class="bg-card border border-border p-6">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-muted-foreground">Card content</p>
  </div>
</template>
```

---

## Form Input Borders

```vue
<template>
  <!-- Standard input -->
  <input 
    type="text"
    class="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-2 focus:ring-ring"
  />

  <!-- Input with error -->
  <input 
    type="text"
    class="bg-background border-2 border-destructive rounded-[4px] px-3 py-2"
    aria-invalid="true"
  />
</template>
```

---

## Dividers

```vue
<template>
  <!-- Horizontal divider -->
  <div class="border-t border-border my-6"></div>

  <!-- Vertical divider -->
  <div class="border-l border-border pl-6"></div>
</template>
```

---

## Focus Rings

```vue
<template>
  <button class="bg-primary text-primary-foreground rounded-[6px] px-4 py-2 focus:ring-2 focus:ring-ring focus:ring-offset-2">
    Focusable Button
  </button>
</template>
```

---

## Spacing vs Borders

```vue
<template>
  <!-- ✅ Good: Using spacing for separation (preferred) -->
  <div class="space-y-8">
    <section>
      <h2 class="text-2xl font-bold mb-4">Section Title</h2>
      <p>Content here</p>
    </section>
    <section>
      <h2 class="text-2xl font-bold mb-4">Another Section</h2>
      <p>More content</p>
    </section>
  </div>
</template>

<!-- ❌ Avoid: Unnecessary borders when spacing is sufficient -->
<template>
  <div>
    <section class="border-b pb-6">
      <h2>Section Title</h2>
    </section>
    <section class="pt-6">
      <h2>Another Section</h2>
    </section>
  </div>
</template>
```

---

## Good vs Bad

```vue
<template>
  <!-- ✅ Good: Correct radius for element types -->
  <div class="bg-card border border-border p-6">
    <h3>Static Card (no radius)</h3>
  </div>

  <div class="bg-card border border-border rounded-[6px] p-6 cursor-pointer">
    <h3>Clickable Card (6px radius)</h3>
  </div>

  <input class="border border-input rounded-[4px] px-3 py-2" />
</template>

<!-- ❌ Bad: Wrong radius for element types - DON'T DO THIS -->
<template>
  <div class="bg-card border border-border rounded-[6px] p-6">
    <h3>Static Card (should have no radius)</h3>
  </div>

  <input class="border border-input rounded-[6px] px-3 py-2" />
</template>
```
