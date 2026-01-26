# Vue Color Examples

Code examples for using Kuat Design System colors in Vue.

**Rules:** See [rules/design/colours.md](../../rules/design/colours.md)

---

## Basic Usage

```vue
<template>
  <div class="bg-background text-foreground border-border">
    <button class="bg-primary text-primary-foreground hover:bg-primary/90">
      Primary Action
    </button>
    <button class="bg-secondary text-secondary-foreground">
      Secondary Action
    </button>
    <p class="text-muted-foreground">Secondary text</p>
    <div class="border-destructive text-destructive">Error message</div>
  </div>
</template>
```

---

## Button Examples

```vue
<template>
  <!-- Primary Button -->
  <button class="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
    Primary Button
  </button>

  <!-- Secondary Button -->
  <button class="bg-secondary text-secondary-foreground hover:bg-secondary/90">
    Secondary Button
  </button>

  <!-- Destructive Button -->
  <button class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
    Delete
  </button>

  <!-- Ghost Button -->
  <button class="hover:bg-accent hover:text-accent-foreground">
    Ghost Button
  </button>
</template>
```

---

## Links

```vue
<template>
  <a href="#" class="text-primary hover:underline">
    Link text
  </a>
</template>
```

---

## Form Inputs

```vue
<template>
  <input 
    class="bg-background border-input text-foreground focus:ring-ring" 
  />
</template>
```

---

## Cards

```vue
<template>
  <div class="bg-card text-card-foreground border-border rounded-lg p-4">
    Card content
  </div>
</template>
```

---

## Status Indicators

```vue
<template>
  <!-- Error -->
  <div class="bg-destructive/10 text-destructive border-destructive">
    Error message
  </div>

  <!-- Info -->
  <div class="bg-primary/10 text-primary border-primary">
    Information
  </div>
</template>
```

---

## Dark Mode

```vue
<template>
  <!-- Colors adapt automatically when .dark class is applied -->
  <html class="dark">
    <body class="bg-background text-foreground">
      <!-- Colors automatically switch -->
    </body>
  </html>
</template>
```

---

## Using CSS Variables

```vue
<template>
  <div :style="{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }">
    Content
  </div>
</template>
```

---

## Good vs Bad Examples

```vue
<template>
  <!-- ✅ Good: Using semantic tokens -->
  <div class="bg-background text-foreground">
    <h1 class="text-primary">Heading</h1>
    <p class="text-muted-foreground">Secondary text</p>
    <button class="bg-primary text-primary-foreground hover:bg-primary/90">
      Action
    </button>
  </div>
</template>

<!-- ❌ Bad: Hardcoded colors - DON'T DO THIS -->
<template>
  <div style="background-color: #ffffff; color: #020617">
    <button style="background-color: #1795d4; color: #ffffff">
      Action
    </button>
  </div>
</template>
```

---

## Accessibility

```vue
<template>
  <!-- ✅ Correct foreground/background pairing -->
  <button class="bg-primary text-primary-foreground">
    Primary Action
  </button>

  <!-- ❌ Wrong - using foreground on primary (low contrast) -->
  <button class="bg-primary text-foreground">
    Action
  </button>
</template>
```
