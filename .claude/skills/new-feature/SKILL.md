---
name: new-feature
description: Scaffold a new feature slice with proper FSD structure. Creates domain/action directory with UI component, model composable, types, and barrel exports. Use when adding new user actions.
user-invocable: true
allowed-tools: Read, Write, Edit, Glob
argument-hint: <domain/action> (e.g., user/create, sidebar/toggle)
---

# New Feature Slice

Scaffold a new feature in `src/features/`.

## Arguments

`$ARGUMENTS` should be in `domain/action` format (e.g., `user/create`, `sidebar/toggle`, `project/delete`).

If no arguments provided, ask the user what feature to create.

## Steps

Parse `$ARGUMENTS` into `[domain]` and `[action]`.

1. **Create directory structure:**
   ```
   src/features/[domain]/[action]/
   ├── ui/
   │   └── [Action][Domain].vue
   ├── model/
   │   ├── use[Action][Domain].ts
   │   └── index.ts
   └── index.ts
   ```

2. **Create composable** (`model/use[Action][Domain].ts`):
   ```typescript
   import { ref } from 'vue'

   export function use[Action][Domain]() {
     // Feature logic here
     return {
       // exposed state and methods
     }
   }
   ```

3. **Create component** (`ui/[Action][Domain].vue`):
   ```vue
   <script setup lang="ts">
   import { use[Action][Domain] } from '../model'
   // Use @shared/ui components, NOT direct Quasar imports
   </script>
   ```

4. **Create barrel exports:**
   - `model/index.ts` — Export composable
   - `index.ts` — Export component and composable

5. **Update domain barrel** (`features/[domain]/index.ts`):
   Create or update to export from the new action.

6. **Update features barrel** (`features/index.ts`):
   Add export from the domain if new.

## Naming Rules

- Folder: `kebab-case` (e.g., `create-user`, `toggle-mini`)
- Vue file: PascalCase (e.g., `CreateUser.vue`)
- Composable: camelCase with `use` prefix (e.g., `useCreateUser.ts`)

## Import Rules

Features can ONLY import from:
- `@entities/*`
- `@shared/ui`
- `@shared/lib`
- External libraries (vue, pinia)

NEVER import from other features, widgets, pages, or app.
