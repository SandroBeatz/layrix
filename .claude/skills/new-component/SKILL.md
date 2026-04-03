---
name: new-component
description: Scaffold a new shared/ui primitive component with proper FSD structure. Creates types file, Vue component, barrel export, and registers in the UI index. Use when adding new design system components.
user-invocable: true
allowed-tools: Read, Write, Edit, Glob
argument-hint: <ComponentName>
---

# New Shared UI Component

Scaffold a new component in `src/shared/ui/primitives/`.

## Arguments

`$ARGUMENTS` should be the component name in PascalCase (e.g., `DataTable`, `ProgressBar`, `Tooltip`).

If no arguments provided, ask the user what component to create.

## Steps

1. **Create directory:** `src/shared/ui/primitives/$ARGUMENTS/`

2. **Create types file** (`$ARGUMENTS.types.ts`):
   ```typescript
   export interface $ARGUMENTSProps {
     // Add props based on the component's purpose
   }
   ```

3. **Create Vue component** (`$ARGUMENTS.vue`):
   ```vue
   <script setup lang="ts">
   import type { $ARGUMENTSProps } from './$ARGUMENTS.types'

   withDefaults(defineProps<$ARGUMENTSProps>(), {
     // defaults
   })
   </script>

   <template>
     <!-- Component template -->
   </template>
   ```

4. **Create barrel export** (`index.ts`):
   ```typescript
   export { default as $ARGUMENTS } from './$ARGUMENTS.vue'
   export type { $ARGUMENTSProps } from './$ARGUMENTS.types'
   ```

5. **Register in `shared/ui/index.ts`**:
   Add `export * from './primitives/$ARGUMENTS'`

## Reference

Look at existing primitives for patterns:
- `Button/` — Full example with variants, appearances, sizes
- `Alert/` — Variant + appearance pattern
- `Typography/` — Semantic `as` prop pattern
- `Dropdown/` — Complex responsive behavior

## Rules

- Import Quasar components directly (this is the only allowed place)
- Use `import type` for type-only imports
- No `any` types
- No business logic
- Keep component focused on one responsibility
