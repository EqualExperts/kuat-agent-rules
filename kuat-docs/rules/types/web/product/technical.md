---
scope: type
platform: web_product
prerequisites: general
---

# Technical Guidelines

Technical setup and integration guide for Equal Experts web applications using the Kuat Design System.

---

**Prerequisites:** Load [foundations](../../../foundations/) first.

---

## Quick reference

- **Stack:** Application → Kuat Blocks → Kuat custom components → shadcn components → kuat-core (tokens, theme).
- **Priority:** Prefer Kuat Blocks, then Kuat components, then shadcn; custom build only when none fit.
- **Setup:** Install `@equal-experts/kuat-core`; preset Tailwind; import `kuat-core/variables.css`; init shadcn (Slate, CSS vars); add components as needed.
- **Theming:** CSS variables from kuat-core; dark mode via class or media; persist preference in localStorage if needed.
- **Tokens:** Use Tailwind utilities and CSS variables from design tokens; avoid hardcoded colours/spacing.

*Full detail follows.*

---

## Overview

The Kuat Design System uses a layered architecture:

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat Blocks (Header, Footer, etc.)                 │  ← From kuat-react/vue
├─────────────────────────────────────────────────────┤
│  Kuat Custom Components (ButtonGroup)               │  ← From kuat-react/vue
├─────────────────────────────────────────────────────┤
│  shadcn Components (Button, Dialog, etc.)           │  ← Installed directly
├─────────────────────────────────────────────────────┤
│  kuat-core (Design Tokens, Theme)                   │  ← Foundation
└─────────────────────────────────────────────────────┘
```

**Component Priority:**
1. **Kuat Blocks** - Pre-built compositions for common patterns
2. **Kuat Components** - Custom components not in shadcn (e.g., ButtonGroup)
3. **shadcn Components** - Standard UI components themed by kuat-core
4. **Custom Build** - Only when none of the above fit

---

## Quick Start (React)

### Step 1: Install kuat-core

```bash
pnpm add @equal-experts/kuat-core
```

### Step 2: Configure Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@equal-experts/kuat-react/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
```

### Step 3: Import Design Tokens

```typescript
// main.tsx or App.tsx
import '@equal-experts/kuat-core/variables.css';
import './styles.css'; // Your app styles
```

### Step 4: Initialize shadcn

```bash
npx shadcn@latest init
```

When prompted, use these settings:
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: tailwind.config.ts
- Components path: src/components
- Utils path: src/lib/utils

### Step 5: Install shadcn Components

```bash
# Install components as needed
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Step 6: Install Kuat Custom Components (Optional)

If you need Kuat-specific components like ButtonGroup:

```bash
pnpm add @equal-experts/kuat-react
```

```tsx
// Only import custom components, not standard ones
import { ButtonGroup, ButtonGroupText } from '@equal-experts/kuat-react';
import { Button } from '@/components/ui/button'; // Your shadcn copy

function Example() {
  return (
    <ButtonGroup>
      <Button>Option A</Button>
      <Button>Option B</Button>
      <Button>Option C</Button>
    </ButtonGroup>
  );
}
```

---

## Quick Start (Vue)

### Step 1: Install kuat-core

```bash
pnpm add @equal-experts/kuat-core
```

### Step 2: Configure Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{vue,js,ts}',
    './node_modules/@equal-experts/kuat-vue/**/*.{vue,js,ts}',
  ],
} satisfies Config;
```

### Step 3: Import Design Tokens

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

### Step 4: Initialize shadcn-vue

```bash
npx shadcn-vue@latest init
```

### Step 5: Install shadcn-vue Components

```bash
npx shadcn-vue@latest add button
npx shadcn-vue@latest add dialog
```

### Step 6: Install Kuat Custom Components (Optional)

```bash
pnpm add @equal-experts/kuat-vue
```

```vue
<script setup lang="ts">
import { ButtonGroup, ButtonGroupText } from '@equal-experts/kuat-vue';
import { Button } from '@/components/ui/button';
</script>

<template>
  <ButtonGroup>
    <Button>Option A</Button>
    <Button>Option B</Button>
  </ButtonGroup>
</template>
```

---

## Project Structure

After setup, your project should look like:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn components (installed directly)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts         # cn() utility from shadcn
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts       # Uses kuatPreset
├── components.json          # shadcn CLI config
└── package.json
```

---

## Framework Integration Guides

### Next.js (App Router)

**tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config;
```

**app/layout.tsx**

```tsx
import '@equal-experts/kuat-core/variables.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

### Vite + React

**vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**src/main.tsx**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@equal-experts/kuat-core/variables.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Vite + Vue

**vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```

**src/main.ts**

```typescript
import { createApp } from 'vue';
import '@equal-experts/kuat-core/variables.css';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');
```

---

## Theming

shadcn components are automatically themed when you:

1. Import `@equal-experts/kuat-core/variables.css`
2. Use the kuat Tailwind preset

The CSS variables from kuat-core provide:
- Brand colors (EE Blue, Transform Teal, etc.)
- Typography (Lexend, JetBrains Mono, Lora)
- Spacing scale (8-point grid)
- Border radius values
- Light/dark mode support

### Dark Mode

Apply the `.dark` class to your root element:

```tsx
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

Or toggle dynamically:

```typescript
document.documentElement.classList.toggle('dark');
```

### Persisting User Preference

```typescript
const THEME_KEY = 'kuat-theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (saved === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
}

function setTheme(theme: 'light' | 'dark' | 'system') {
  localStorage.setItem(THEME_KEY, theme);
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
}
```

---

## Design Token Reference

### Available CSS Variables

```css
/* Semantic Colors */
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--card, --card-foreground
--popover, --popover-foreground
--border, --input, --ring

/* Sidebar Colors */
--sidebar, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-accent-foreground
--sidebar-border, --sidebar-ring

/* Brand Colors (full palettes) */
--ee-blue-50 through --ee-blue-950
--tech-blue-50 through --tech-blue-950
--transform-teal-50 through --transform-teal-950
--equal-ember-50 through --equal-ember-950

/* Typography */
--font-sans, --font-serif, --font-mono

/* Layout */
--radius, --spacing, --tracking-normal
```

### Tailwind Utility Classes

```html
<!-- Colors -->
<div class="bg-background text-foreground">
<div class="bg-primary text-primary-foreground">
<div class="bg-sidebar text-sidebar-foreground">
<div class="border-border">

<!-- Border Radius -->
<div class="rounded-sm">  <!-- Small -->
<div class="rounded-md">  <!-- Medium -->
<div class="rounded-lg">  <!-- Large -->
```

---

## Troubleshooting

### Components not styled correctly

1. Verify `@equal-experts/kuat-core/variables.css` is imported before other styles
2. Check that `kuatPreset` is in your Tailwind config `presets` array
3. Ensure shadcn components are in the Tailwind `content` paths

### TypeScript errors

1. Ensure `@types/react` (React) or `vue` (Vue) are installed
2. Set `moduleResolution` to `bundler` or `node16` in tsconfig

### Dark mode not working

1. Verify `.dark` class is applied to `<html>` or a parent element
2. Check that CSS variables are imported

### Build errors

1. Check Node version: Requires Node.js 18 or higher
2. Verify package versions: Ensure Tailwind CSS v4 is installed
3. Clear caches: Run `rm -rf node_modules && pnpm install`

---

## Related Documentation

- [Design Rules](./design.md) - Layout and visual design
- [Component Decision Tree](./component-decision-tree.md) - Component selection
- [Examples](./examples/) - Framework-specific code examples
