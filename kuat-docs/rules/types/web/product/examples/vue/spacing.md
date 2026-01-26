# Vue Spacing Examples

Code examples for using Kuat Design System spacing in Vue.

**Rules:** See [general/spacing.md](../../../../general/spacing.md)

---

## Card Padding

```vue
<template>
  <!-- Standard card padding -->
  <div class="bg-card border border-border rounded-lg p-6">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>

  <!-- Small card -->
  <div class="bg-card border border-border rounded-lg p-4">
    Compact card
  </div>

  <!-- Large card -->
  <div class="bg-card border border-border rounded-lg p-8">
    Spacious card
  </div>
</template>
```

---

## Form Spacing

```vue
<template>
  <!-- Form with consistent spacing -->
  <form class="space-y-4">
    <div>
      <label class="block mb-2">Label</label>
      <input class="w-full px-3 py-2 border border-input rounded-[4px]" />
    </div>
    <div>
      <label class="block mb-2">Another Label</label>
      <input class="w-full px-3 py-2 border border-input rounded-[4px]" />
    </div>
    <button class="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
      Submit
    </button>
  </form>
</template>
```

---

## Section Spacing

```vue
<template>
  <!-- Page with section spacing -->
  <div class="space-y-8">
    <section>
      <h2 class="text-2xl font-bold mb-4">Section Title</h2>
      <p>Content</p>
    </section>
    <section>
      <h2 class="text-2xl font-bold mb-4">Another Section</h2>
      <p>More content</p>
    </section>
  </div>
</template>
```

---

## Button Spacing

```vue
<template>
  <!-- Small button -->
  <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-[6px]">
    Small
  </button>

  <!-- Standard button -->
  <button class="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
    Standard
  </button>

  <!-- Large button -->
  <button class="px-6 py-3 bg-primary text-primary-foreground rounded-[6px]">
    Large
  </button>
</template>
```

---

## List Spacing

```vue
<template>
  <ul class="space-y-4">
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul>
</template>
```

---

## Grid Layouts

```vue
<template>
  <!-- Standard grid -->
  <div class="grid grid-cols-3 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>

  <!-- Tight grid -->
  <div class="grid grid-cols-4 gap-2">
    <!-- items -->
  </div>

  <!-- Spacious grid -->
  <div class="grid grid-cols-2 gap-6">
    <!-- items -->
  </div>
</template>
```

---

## Flex Layouts

```vue
<template>
  <!-- Button group -->
  <div class="flex gap-2">
    <button>Button 1</button>
    <button>Button 2</button>
  </div>

  <!-- Navigation -->
  <nav class="flex items-center gap-6">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </nav>
</template>
```

---

## Responsive Spacing

```vue
<template>
  <div class="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
    <h1>Responsive Container</h1>
    <p>Spacing adapts to screen size</p>
  </div>
</template>
```

---

## Good vs Bad

```vue
<template>
  <!-- ✅ Good: Using spacing scale -->
  <div class="bg-card p-6 mb-4">
    <h3 class="mb-4">Title</h3>
    <p class="mb-4">Content</p>
  </div>
</template>

<!-- ❌ Bad: Arbitrary values - DON'T DO THIS -->
<template>
  <div class="bg-card p-[13px] mb-[7px]">
    <h3 class="mb-[11px]">Title</h3>
    <p class="mb-[9px]">Content</p>
  </div>
</template>
```
