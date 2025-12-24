# Features Layer

**Purpose:** User actions and use cases (create, delete, edit, filter, etc.)

## What Goes Here

- Each feature = ONE action
- Forms, dialogs for actions
- Action-specific UI
- Business logic for the action
- Entity store/API calls

## What Doesn't Go Here

- Importing other features (horizontal imports)
- Importing widgets/pages
- Complex data displays (use widgets)
- Shared utilities (use shared/lib)

## Import Rules

Can import from: **entities, shared**

Cannot import from: other features, widgets, pages, app layer

## Naming Convention

**Always:** `verb-noun` format

Examples:
- `create-user`
- `delete-project`
- `filter-orders`
- `edit-profile`
- `export-analytics`

## Example Structure

```
features/
├── user/
│   ├── create/
│   │   ├── ui/
│   │   │   └── CreateUserDialog.vue
│   │   ├── model/
│   │   │   └── useCreateUser.ts
│   │   └── index.ts
│   ├── delete/
│   │   ├── ui/
│   │   │   └── DeleteUserButton.vue
│   │   ├── model/
│   │   │   └── useDeleteUser.ts
│   │   └── index.ts
│   └── edit/
│       └── ...
└── index.ts
```

## Example Feature

```typescript
// features/user/create/model/useCreateUser.ts
import { ref } from 'vue'
import { useUserStore } from '@/entities/user'
import type { CreateUserDto } from '@/entities/user'

export function useCreateUser() {
  const userStore = useUserStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function createUser(data: CreateUserDto) {
    loading.value = true
    error.value = null
    try {
      await userStore.createUser(data)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return false
    } finally {
      loading.value = false
    }
  }

  return { createUser, loading, error }
}
```
