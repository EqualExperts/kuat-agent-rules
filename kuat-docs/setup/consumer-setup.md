# Consumer Setup Guide

How to set up a new project using the Kuat Design System with the recommended architecture: **kuat-core for theming + shadcn components installed directly**.

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

**Decision Priority:**
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
# ... etc
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
# ... etc
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

## What Goes Where

| Component Type | Source | Example |
|----------------|--------|---------|
| Design tokens | `@equal-experts/kuat-core` | Colors, fonts, spacing |
| Standard UI | shadcn CLI | Button, Dialog, Dropdown |
| Kuat custom | `@equal-experts/kuat-react` | ButtonGroup |
| Kuat blocks | `@equal-experts/kuat-react` | KuatHeader (coming soon) |
| App-specific | Your code | Custom features |

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

```tsx
document.documentElement.classList.toggle('dark');
```

---

## Migration from Previous Architecture

If you were previously importing components from `@equal-experts/kuat-react`:

### Before (Deprecated)

```tsx
import { Button, Dialog, ButtonGroup } from '@equal-experts/kuat-react';
```

### After (Recommended)

```tsx
// Standard components from your local shadcn installation
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

// Kuat-specific components from the package
import { ButtonGroup } from '@equal-experts/kuat-react';
```

### Migration Steps

1. Install `@equal-experts/kuat-core` if not already installed
2. Initialize shadcn CLI: `npx shadcn@latest init`
3. Install the components you need: `npx shadcn@latest add button dialog`
4. Update imports to use local components
5. Remove deprecated imports from `@equal-experts/kuat-react`

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

---

## Related Documentation

- [kuat-core Integration](./kuat-core-integration.md) - Framework-agnostic token usage
- [Verification Guide](./verification.md) - Test your setup
- [Component Patterns](../rules/components/patterns.md) - Development standards
