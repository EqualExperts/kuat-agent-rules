# Vue Typography Examples

Code examples for using Kuat Design System typography in Vue.

**Rules:** See [rules/design/typography.md](../../rules/design/typography.md)

---

## Font Families

```vue
<template>
  <p class="font-sans">Primary text using Lexend</p>
  <code class="font-mono">Code example using JetBrains Mono</code>
  <p class="font-serif">Decorative text using Lora</p>
</template>
```

---

## Text Sizes

```vue
<template>
  <h1 class="text-4xl font-bold">Page Title</h1>
  <h2 class="text-3xl font-semibold">Section Heading</h2>
  <h3 class="text-xl font-semibold">Subsection</h3>
  <p class="text-base">Body text content</p>
  <span class="text-sm text-muted-foreground">Secondary information</span>
  <span class="text-xs">Labels and captions</span>
</template>
```

---

## Text Colors

```vue
<template>
  <p class="text-foreground">Primary text</p>
  <p class="text-muted-foreground">Secondary text</p>
  <h2 class="text-primary">Brand heading</h2>
  <span class="text-destructive">Error message</span>
</template>
```

---

## Typography Hierarchy

```vue
<template>
  <div>
    <h1 class="text-5xl font-bold text-foreground mb-4">
      Main Page Title
    </h1>
    <h2 class="text-3xl font-semibold text-foreground mb-3">
      Section Heading
    </h2>
    <p class="text-base font-normal text-foreground mb-2">
      Body text content goes here. This is the primary content.
    </p>
    <p class="text-sm text-muted-foreground">
      Supporting information or metadata.
    </p>
  </div>
</template>
```

---

## With shadcn-vue Components

```vue
<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardDescription } from "@equal-experts/kuat-vue";
</script>

<template>
  <!-- Button -->
  <Button class="text-lg font-semibold">
    Click me
  </Button>

  <!-- Card -->
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl font-bold">Card Title</CardTitle>
      <CardDescription class="text-sm text-muted-foreground">
        Card description
      </CardDescription>
    </CardHeader>
  </Card>
</template>
```

---

## Creating Typography Utilities

```vue
<script setup>
import { cn } from "@/lib/utils"

const headingStyles = cn(
  "text-2xl font-bold text-foreground",
  "tracking-tight"
)
</script>

<template>
  <h1 :class="headingStyles">Heading</h1>
</template>
```

---

## Responsive Typography

```vue
<template>
  <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
    Responsive Heading
  </h1>
</template>
```

---

## Dark Mode

```vue
<template>
  <!-- Colors automatically switch in dark mode -->
  <p class="text-foreground">This text adapts to dark mode</p>
  <p class="text-muted-foreground">Secondary text also adapts</p>
</template>
```
