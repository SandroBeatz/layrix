# Pages Layer

**Purpose:** Route components - maximally "dumb" composition of widgets and features

## What Goes Here

- Route components (one per route)
- Widget/feature composition
- Simple route params handling
- Basic refs for component state

## What Doesn't Go Here

- API calls (use entities/features)
- Business logic (use features)
- Direct store access (use features/entities)
- Complex computed properties
- Watchers with side effects

## Import Rules

Can import from: **widgets, features, entities, shared**

Cannot import from: other pages, app layer

## Example Structure

```
pages/
├── dashboard/
│   └── index.vue          # Composes widgets
├── users/
│   ├── index.vue          # User list page
│   └── [id]/
│       └── index.vue      # User detail page
└── index.ts
```

## Example Page Component

```vue
<script setup lang="ts">
import { UsersTable } from '@/widgets/users-table'
import { PageContainer } from '@/shared/ui'
</script>

<template>
  <PageContainer title="Users">
    <UsersTable />
  </PageContainer>
</template>
```
