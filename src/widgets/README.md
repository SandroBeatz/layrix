# Widgets Layer

**Purpose:** Large, self-contained UI blocks composed of features and entities

## What Goes Here

- Large UI blocks (tables, sidebars, dashboards)
- Feature coordination
- Widget-specific state
- Composition of features and entities

## What Doesn't Go Here

- Importing other widgets
- Duplicating entity logic
- Global side effects
- Direct API calls (use entities)

## Import Rules

Can import from: **features, entities, shared**

Cannot import from: other widgets, pages, app layer

## Example Structure

```
widgets/
├── users-table/
│   ├── ui/
│   │   ├── UsersTable.vue
│   │   └── index.ts
│   ├── model/
│   │   └── useUsersTable.ts
│   └── index.ts
├── sidebar/
│   ├── ui/
│   │   └── Sidebar.vue
│   └── index.ts
└── index.ts
```

## Example Widget

A widget coordinates multiple features:

```vue
<!-- widgets/users-table/ui/UsersTable.vue -->
<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { CreateUserDialog } from '@/features/user/create'
import { DeleteUserButton } from '@/features/user/delete'
import { DataTable } from '@/shared/ui'

const userStore = useUserStore()
</script>

<template>
  <DataTable :data="userStore.users">
    <template #actions>
      <CreateUserDialog />
    </template>
    <template #row-actions="{ row }">
      <DeleteUserButton :user-id="row.id" />
    </template>
  </DataTable>
</template>
```
