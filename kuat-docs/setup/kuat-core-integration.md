# Framework-Agnostic kuat-core Integration

This guide covers using `@equal-experts/kuat-core` design tokens. This is the foundation of the Kuat Design System and works with any framework.

## Overview

`@equal-experts/kuat-core` provides:

- **CSS Variables** - All design tokens as CSS custom properties
- **Tailwind CSS Preset** - Pre-configured theme extensions
- **Dark Mode Support** - Automatic light/dark mode via `.dark` class

---

## Recommended: kuat-core + shadcn

The recommended architecture for React and Vue applications is to use **kuat-core for theming** combined with **shadcn components installed directly**.

This approach:
- Gives you full control over component code
- Automatically themes components via CSS variables
- Reduces dependency on wrapper packages
- Follows shadcn's "copy into your project" philosophy

### Quick Setup (React)

```bash
# 1. Install kuat-core
pnpm add @equal-experts/kuat-core

# 2. Initialize shadcn
npx shadcn@latest init

# 3. Install components as needed
npx shadcn@latest add button dialog
```

```typescript
// tailwind.config.ts
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

```typescript
// main.tsx - Import design tokens
import '@equal-experts/kuat-core/variables.css';
```

Components installed via shadcn CLI will automatically use Kuat's brand colors, typography, and spacing.

**For the complete setup guide, see [Consumer Setup Guide](./consumer-setup.md).**

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-core

# Using npm
npm install @equal-experts/kuat-core

# Using yarn
yarn add @equal-experts/kuat-core
```

For Tailwind CSS integration:

```bash
pnpm add -D tailwindcss@^4.0.0 @tailwindcss/vite
```

---

## Integration Patterns

### Tailwind CSS (Any Framework)

The recommended approach is to use kuat-core as a Tailwind preset.

**Step 1: Configure Tailwind**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
} satisfies Config;
```

**Step 2: Import CSS Variables**

```typescript
// main.ts or app entry point
import '@equal-experts/kuat-core/variables.css';
```

**Step 3: Use Design Tokens**

```html
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2">
    Click me
  </button>
</div>
```

### Vanilla CSS Variables

If not using Tailwind CSS, use CSS variables directly.

```css
/* styles.css */
.my-button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.my-button:hover {
  background-color: var(--primary-foreground);
  color: var(--primary);
  outline: 2px solid var(--primary);
}

.my-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
}
```

### Runtime Access via JavaScript

```typescript
// Get computed value of a CSS variable
function getCSSVariable(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const primaryColor = getCSSVariable('--primary');

// Set a CSS variable dynamically
document.documentElement.style.setProperty('--primary', 'oklch(0.6 0.2 250)');
```

---

## Framework-Specific Guides

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

### Next.js (Pages Router)

**pages/_app.tsx**

```tsx
import '@equal-experts/kuat-core/variables.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
```

### Vite + React (without kuat-react)

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

### SvelteKit

**tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{html,js,svelte,ts}'],
} satisfies Config;
```

**src/routes/+layout.svelte**

```svelte
<script>
  import '@equal-experts/kuat-core/variables.css';
  import '../app.css';
</script>

<div class="bg-background text-foreground min-h-screen">
  <slot />
</div>
```

**Using tokens in Svelte components**

```svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
  class="px-4 py-2 rounded-lg transition-colors"
  class:bg-primary={variant === 'primary'}
  class:text-primary-foreground={variant === 'primary'}
  class:bg-secondary={variant === 'secondary'}
  class:text-secondary-foreground={variant === 'secondary'}
>
  <slot />
</button>
```

### Astro

**tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
} satisfies Config;
```

**src/layouts/Layout.astro**

```astro
---
import '@equal-experts/kuat-core/variables.css';
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body class="bg-background text-foreground min-h-screen">
    <slot />
  </body>
</html>
```

### Angular

**angular.json**

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@equal-experts/kuat-core/src/variables.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

**src/styles.css**

```css
@import 'tailwindcss';

/* Your custom styles */
```

**Component styling**

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-background text-foreground min-h-screen">
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
        Click me
      </button>
    </div>
  `,
})
export class AppComponent {}
```

### Vue 3 (without kuat-vue)

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

## CSS-in-JS Libraries

### styled-components

```tsx
import styled, { createGlobalStyle } from 'styled-components';

// Import variables in your entry point
import '@equal-experts/kuat-core/variables.css';

// Create components using CSS variables
const Button = styled.button`
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Card = styled.div`
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
`;
```

### Emotion

```tsx
import { css } from '@emotion/react';

// Import variables in your entry point
import '@equal-experts/kuat-core/variables.css';

const buttonStyles = css`
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

function Button({ children }) {
  return <button css={buttonStyles}>{children}</button>;
}
```

### Panda CSS

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: 'var(--primary)' },
          'primary-foreground': { value: 'var(--primary-foreground)' },
          background: { value: 'var(--background)' },
          foreground: { value: 'var(--foreground)' },
        },
      },
    },
  },
});
```

---

## Dark Mode Implementation

Dark mode is enabled by adding the `.dark` class to a parent element.

### Manual Toggle

```typescript
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

function setDarkMode(enabled: boolean) {
  document.documentElement.classList.toggle('dark', enabled);
}

function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}
```

### System Preference Detection

```typescript
// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply on load
if (prefersDark) {
  document.documentElement.classList.add('dark');
}

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark', e.matches);
  });
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

## Troubleshooting

### Styles Not Applying

1. **Check CSS import order**: Import `variables.css` before your own styles
2. **Verify Tailwind config**: Ensure the preset is included in `presets` array
3. **Check content paths**: Make sure your files are included in Tailwind's `content` array
4. **Clear cache**: Run `rm -rf .turbo node_modules/.cache` and rebuild

### Dark Mode Not Working

1. **Check class application**: Ensure `.dark` class is on `<html>` or `<body>`
2. **Verify CSS import**: Make sure `variables.css` is imported
3. **Check specificity**: Your custom styles might be overriding dark mode values
4. **Server-side rendering**: Ensure dark class is applied before hydration to prevent flash

### TypeScript Errors

1. **Install types**: Ensure `tailwindcss` is installed for type definitions
2. **Check import syntax**: Use `import kuatPreset from '@equal-experts/kuat-core'`
3. **Verify tsconfig**: Ensure `moduleResolution` is set to `bundler` or `node16`

### Build Errors

1. **Check Node version**: Requires Node.js 18 or higher
2. **Verify package versions**: Ensure Tailwind CSS v4 is installed
3. **Clear caches**: Run `rm -rf node_modules && pnpm install`

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

/* Brand Colors (full palettes) */
--ee-blue-50 through --ee-blue-950
--tech-blue-50 through --tech-blue-950
--transform-teal-50 through --transform-teal-950
--equal-ember-50 through --equal-ember-950

/* Typography */
--font-sans, --font-serif, --font-mono

/* Layout */
--radius, --spacing, --tracking-normal

/* Shadows */
--shadow-2xs through --shadow-2xl
```

### Tailwind Utility Classes

When using the preset, these utilities are available:

```html
<!-- Colors -->
<div class="bg-background text-foreground">
<div class="bg-primary text-primary-foreground">
<div class="bg-secondary text-secondary-foreground">
<div class="border-border">

<!-- Border Radius -->
<div class="rounded-sm">  <!-- Small -->
<div class="rounded-md">  <!-- Medium -->
<div class="rounded-lg">  <!-- Large -->
```

---

## Related Documentation

- [Consumer Setup Guide](./consumer-setup.md) - Recommended kuat-core + shadcn setup
- [Integration Guide](./integration.md) - General integration patterns
- [Verification Guide](./verification.md) - Test your setup
- [Colors](../rules/design/colours.md) - Brand color specifications
- [Typography](../rules/design/typography.md) - Font families and text styling
- [Component Patterns](../rules/components/patterns.md) - Component development patterns
