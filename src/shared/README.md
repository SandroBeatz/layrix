# Shared Layer

**Purpose:** Reusable infrastructure - UI kit, utilities, API client, types

## What Goes Here

- UI components (Quasar wrappers)
- UI composables
- HTTP client and interceptors
- Utility functions
- Common types
- Configuration and constants

## What Doesn't Go Here

- Business logic
- Domain entities
- Feature-specific code
- Imports from business layers

## Import Rules

Can import from: **ONLY external libraries** (Quasar, Vue, Axios, etc.)

Cannot import from: app, pages, widgets, features, entities

## Critical Rule

**ONLY `shared/ui/quasar/` can import Quasar components directly!**

All other code must import UI components from `@/shared/ui`

## Structure

```
shared/
├── api/
│   ├── client.ts          # Axios instance
│   ├── interceptors.ts    # Request/response interceptors
│   └── index.ts
├── config/
│   ├── constants.ts       # App constants
│   ├── env.ts            # Environment variables
│   └── index.ts
├── lib/
│   ├── date/             # Date utilities
│   ├── validation/       # Validation helpers
│   ├── storage/          # LocalStorage helpers
│   └── index.ts
├── types/
│   ├── common.ts         # Common types (Nullable, etc.)
│   └── index.ts
├── ui/
│   ├── quasar/           # Quasar component wrappers
│   ├── primitives/       # Base UI components
│   ├── composables/      # UI composables
│   └── index.ts
└── index.ts
```

## Example: Wrapping Quasar Components

```typescript
// shared/ui/primitives/Button/Button.types.ts
export interface ButtonProps {
  label?: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}
```

```vue
<!-- shared/ui/primitives/Button/Button.vue -->
<script setup lang="ts">
import { QBtn } from 'quasar' // ONLY allowed here!
import { computed } from 'vue'
import type { ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md'
})

const color = computed(() => {
  const colorMap = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'negative'
  }
  return colorMap[props.variant]
})

const qSize = computed(() => {
  const sizeMap = { sm: 'sm', md: 'md', lg: 'lg' }
  return sizeMap[props.size]
})
</script>

<template>
  <QBtn
    :label="label"
    :color="color"
    :size="qSize"
    :loading="loading"
    :disable="disabled"
  >
    <slot />
  </QBtn>
</template>
```

```typescript
// shared/ui/primitives/Button/index.ts
export { default as Button } from './Button.vue'
export type { ButtonProps } from './Button.types'
```

```typescript
// shared/ui/index.ts
export * from './primitives/Button'
// ... other exports
```

Now other layers use it like this:

```typescript
// ✅ CORRECT
import { Button } from '@/shared/ui'

// ❌ FORBIDDEN
import { QBtn } from 'quasar'
```
