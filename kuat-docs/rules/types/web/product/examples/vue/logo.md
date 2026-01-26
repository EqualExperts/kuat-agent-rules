# Vue Logo Examples

Code examples for using the Equal Experts logo in Vue.

**Rules:** See [general/logo.md](../../../../general/logo.md)

---

## Marketing Header (Light Background)

```vue
<template>
  <header class="bg-white p-6">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
      alt="Equal Experts" 
      class="w-[120px] min-w-[100px] h-auto" 
    />
  </header>
</template>
```

---

## Marketing Footer (Light Background)

```vue
<template>
  <footer class="bg-muted p-8">
    <div class="p-4">
      <img 
        src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
        alt="Equal Experts" 
        class="w-[100px] min-w-[100px] h-auto" 
      />
    </div>
  </footer>
</template>
```

---

## Dark Navigation (White Text Logo)

```vue
<template>
  <footer class="bg-slate-900 p-8">
    <div class="p-4">
      <img 
        src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg" 
        alt="Equal Experts" 
        class="w-[100px] min-w-[100px] h-auto" 
      />
    </div>
  </footer>
</template>
```

---

## Dark Navigation (Monochrome White)

```vue
<template>
  <!-- Use when primary logo contrast is insufficient -->
  <footer class="bg-black p-8">
    <div class="p-4">
      <img 
        src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
        alt="Equal Experts" 
        class="w-[100px] min-w-[100px] h-auto" 
      />
    </div>
  </footer>
</template>
```

---

## Brand Mark Only (Space Constrained)

```vue
<template>
  <div class="w-8 h-8">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/brand-mark-blue.svg" 
      alt="Equal Experts" 
      class="w-full h-full" 
    />
  </div>
</template>
```

---

## App Sidebar

```vue
<template>
  <aside class="bg-sidebar text-sidebar-foreground w-64">
    <div class="p-6 border-b border-sidebar-border">
      <img 
        src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
        alt="Equal Experts" 
        class="h-10 w-auto min-w-[100px]" 
      />
    </div>
    <nav class="p-4">
      <!-- Navigation items -->
    </nav>
  </aside>
</template>
```

---

## App Horizontal Navigation

```vue
<template>
  <nav class="bg-sidebar text-sidebar-foreground h-16">
    <div class="container mx-auto px-6 h-full flex items-center">
      <img 
        src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
        alt="Equal Experts" 
        class="h-10 w-auto min-w-[100px]" 
      />
      <!-- Navigation items -->
    </div>
  </nav>
</template>
```

---

## Logo Component

```vue
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'color' | 'white-text' | 'white' | 'black';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'color',
  size: 'md'
});

const logoUrls = {
  'color': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg',
  'white-text': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg',
  'white': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg',
  'black': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-black.svg',
};

const sizes = {
  sm: 'w-[100px]',
  md: 'w-[120px]',
  lg: 'w-[150px]',
};

const logoUrl = computed(() => logoUrls[props.variant]);
const sizeClass = computed(() => sizes[props.size]);
</script>

<template>
  <img 
    :src="logoUrl" 
    alt="Equal Experts" 
    :class="['min-w-[100px] h-auto', sizeClass]"
  />
</template>
```

Usage:

```vue
<template>
  <Logo variant="color" size="md" />
  <Logo variant="white" size="lg" />
</template>
```
