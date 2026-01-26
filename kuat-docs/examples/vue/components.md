# Vue Component Examples

Code examples for building components with the Kuat Design System in Vue.

**Rules:** See [rules/components/patterns.md](../../rules/components/patterns.md)

---

## Button Component Structure

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[6px] text-sm font-medium transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[6px] px-3',
        lg: 'h-11 rounded-[6px] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})

const classes = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
```

---

## Card Component

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('bg-card text-card-foreground border border-border p-6', props.class)">
    <slot />
  </div>
</template>
```

---

## Card with Slots

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('bg-card text-card-foreground border border-border', props.class)">
    <div v-if="$slots.header" class="flex flex-col space-y-1.5 p-6 pb-0">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>
```

---

## Input Component

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() =>
  cn(
    'flex h-10 w-full rounded-[4px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )
)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="classes"
    @input="onInput"
  />
</template>
```

---

## cn() Utility

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Slot Usage

```vue
<template>
  <!-- Default slot -->
  <Card>
    <p>Content in default slot</p>
  </Card>
  
  <!-- Named slots -->
  <Card>
    <template #header>
      <h3>Card Title</h3>
    </template>
    
    <p>Main content</p>
    
    <template #footer>
      <Button>Action</Button>
    </template>
  </Card>
</template>
```

---

## v-model Pattern

```vue
<!-- Parent component -->
<template>
  <Input v-model="email" placeholder="Enter email" />
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>
```

---

## Conditional Classes

```vue
<template>
  <button
    :class="[
      'px-4 py-2 rounded-[6px]',
      active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
    ]"
  >
    {{ label }}
  </button>
</template>
```

---

## Export Pattern

```ts
// src/index.ts
export { default as Button } from './components/ui/Button.vue'
export { default as Card } from './components/ui/Card.vue'
export { default as Input } from './components/ui/Input.vue'
```
