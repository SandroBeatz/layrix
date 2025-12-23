# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Layrix** is a production-ready architectural framework for building scalable dashboard applications on Quasar Framework. It implements Feature-Sliced Design (FSD) methodology optimized for AI-assisted development.

**Core Philosophy:**
- Predictability > Flexibility
- One right way to structure code
- Quasar as an implementation detail
- Layer boundaries are law
- AI must understand the structure

## Architecture Structure

This project follows strict Feature-Sliced Design (FSD) with 6 layers:

```
src/
├── app/          # Application initialization, providers, layouts
├── pages/        # Route components (widget composition only)
├── widgets/      # Large UI blocks (feature composition)
├── features/     # User actions (create, delete, filter)
├── entities/     # Business entities (user, project, analytics)
└── shared/       # Reusable infrastructure (UI kit, API, utils)
```

### Layer Hierarchy & Import Rules

**STRICT dependency direction (top to bottom only):**

```
app      → can import: EVERYTHING
pages    → can import: widgets, features, entities, shared
widgets  → can import: features, entities, shared
features → can import: entities, shared
entities → can import: shared
shared   → can import: ONLY external libraries
```

**FORBIDDEN:**
- Importing up the hierarchy
- Horizontal imports between slices of the same layer (e.g., feature → feature)
- Direct Quasar imports outside `shared/ui/quasar/`

### Quasar Integration

**CRITICAL RULE:** Quasar is imported ONLY in `shared/ui/quasar/`

All Quasar components must be wrapped in `shared/ui/` and exported through `shared/ui/index.ts`.

```typescript
// ❌ FORBIDDEN everywhere except shared/ui
import { QBtn, QTable } from 'quasar'

// ✅ CORRECT
import { Button, DataTable } from '@/shared/ui'
```

## Slice Structure

Every slice (feature, entity, widget) follows this structure:

```
[slice-name]/
├── ui/           # Vue components (required)
├── model/        # Logic, composables, store (optional)
├── api/          # API calls (optional, feature-specific only)
├── lib/          # Utilities (optional)
├── config/       # Configuration (optional)
└── index.ts      # Public API - barrel exports (required)
```

**Always import through index.ts, never directly from internal files.**

## Naming Conventions

### Files and Folders
- Folders: `kebab-case` (e.g., `user-table/`, `create-user/`)
- Vue components: `PascalCase.vue` (e.g., `UserTable.vue`)
- TypeScript files: `camelCase.ts` (e.g., `useCreateUser.ts`, `userApi.ts`)
- Types: `[Name].types.ts` (e.g., `Button.types.ts`)

### Slices
- **Features** = verb + noun (e.g., `create-user`, `delete-project`, `filter-orders`)
- **Entities** = noun (e.g., `user`, `project`, `analytics`)
- **Widgets** = descriptive noun (e.g., `users-table`, `sidebar`, `analytics-overview`)

## Layer-Specific Rules

### app/
- **Purpose:** Application initialization, global providers, layouts
- **Allowed:** Quasar boot files, router, store, i18n, layouts, global styles
- **Forbidden:** Business logic, API calls, feature components

### pages/
- **Purpose:** Route components - maximally "dumb"
- **Allowed:** Widget/feature composition, route params, simple refs
- **Forbidden:** API calls, business logic, direct store access, complex computed, watchers with side effects

### widgets/
- **Purpose:** Large, self-contained UI blocks
- **Allowed:** Feature coordination, widget-specific state, importing features/entities
- **Forbidden:** Importing other widgets, duplicating entity logic, global side effects

### features/
- **Purpose:** User actions and use cases
- **Structure:** Each feature represents ONE action (create, delete, edit, filter, etc.)
- **Allowed:** Entity store/API calls, local state, UI for the action
- **Forbidden:** Importing other features, importing widgets/pages, complex displays (use widgets)

### entities/
- **Purpose:** Business entities and domain models
- **Contains:** Types, API methods, Pinia stores, small UI fragments (avatar, badge)
- **Forbidden:** Forms, dialogs, importing features, use case logic

### shared/
- **Purpose:** Reusable infrastructure
- **Structure:**
  - `api/` - HTTP client, interceptors
  - `config/` - Environment variables, constants
  - `lib/` - Utilities (date, validation, storage)
  - `types/` - Common types
  - `ui/` - UI Kit (Quasar wrappers, composables)
- **Forbidden:** Importing business layers, business logic

## TypeScript Conventions

- All props must be typed via interface
- Avoid `any` - use `unknown` if type is truly unknown
- Component props: `interface [Component]Props`
- DTO types in `entities/[name]/api/types.ts`
- Domain types in `entities/[name]/model/types.ts`
- Shared types in `shared/types/`

## Path Aliases

```typescript
@/*           → ./src/*
@app/*        → ./src/app/*
@pages/*      → ./src/pages/*
@widgets/*    → ./src/widgets/*
@features/*   → ./src/features/*
@entities/*   → ./src/entities/*
@shared/*     → ./src/shared/*
```

## Common Patterns

### Creating a New Feature

```
features/[entity]/[action]/
├── ui/
│   └── [Action][Entity]Dialog.vue
├── model/
│   └── use[Action][Entity].ts
├── types.ts (if needed)
└── index.ts
```

Example: `features/user/create/`
- `ui/CreateUserDialog.vue` - Form UI
- `model/useCreateUser.ts` - Logic (validation, API call, store update)
- `index.ts` - Public exports

### Creating a New Entity

```
entities/[name]/
├── model/
│   ├── types.ts    # Domain types
│   ├── store.ts    # Pinia store
│   └── index.ts
├── api/
│   ├── [name]Api.ts  # CRUD methods
│   ├── types.ts      # DTOs
│   └── index.ts
├── ui/             # Small fragments only
│   ├── [Name]Avatar.vue
│   └── index.ts
└── index.ts
```

### Wrapping a Quasar Component

1. Create in `shared/ui/[category]/[Name]/`
2. Define OUR props interface in `[Name].types.ts`
3. Map our props to Quasar props inside component
4. Export from `shared/ui/index.ts`

```vue
<!-- shared/ui/primitives/Button/Button.vue -->
<script setup lang="ts">
import { QBtn } from 'quasar'
import type { ButtonProps } from './Button.types'
// Map props...
</script>
```

## AI-Friendly Rules

### MUST (Required)

1. Every new file must be in the correct layer
2. Features = actions (verbs), not components
3. UI separated from logic (ui/ vs model/)
4. Pages contain no business logic
5. Entities own all data operations
6. Quasar only in `shared/ui/quasar/`
7. Public API through `index.ts`
8. One responsibility per file

### MUST NOT (Forbidden)

1. Cross-imports (feature ↔ feature, widget ↔ widget)
2. Logic in UI components (use model/)
3. Direct API access from pages/widgets (use entities/features)
4. Smart layouts (no business logic in app/layouts/)
5. Direct Quasar imports outside shared/ui/
6. Data mutation outside model layer

## Common Tasks Reference

### Adding a CRUD Feature

1. Create entity in `entities/[name]/`:
   - `model/types.ts` - Domain interface
   - `api/[name]Api.ts` - CRUD endpoints
   - `model/[name]Store.ts` - Pinia store

2. Create features in `features/[name]/`:
   - `create/` - Creation dialog
   - `edit/` - Edit dialog
   - `delete/` - Delete confirmation
   - `filter/` - Filtering UI

3. Create widget in `widgets/[name]-table/`:
   - Compose features for table actions
   - Use entity store for data

4. Use widget in page

### Adding a New Page

```typescript
// app/providers/router/routes.ts
{
  path: '/new-page',
  component: AdminLayout,
  children: [{
    path: '',
    name: 'new-page',
    component: () => import('@/pages/new-page/index.vue')
  }]
}
```

```vue
<!-- pages/new-page/index.vue -->
<script setup lang="ts">
import { PageContainer } from '@/shared/ui'
import { SomeWidget } from '@/widgets/some-widget'
</script>

<template>
  <PageContainer title="Page Title">
    <SomeWidget />
  </PageContainer>
</template>
```

## Review Checklist

Before committing changes:

- [ ] File is in correct layer
- [ ] Naming follows conventions
- [ ] Imports follow hierarchy (no upward/horizontal imports)
- [ ] No direct Quasar imports (except `shared/ui/quasar/`)
- [ ] Exports through `index.ts`
- [ ] UI separated from logic
- [ ] Types are defined (no `any`)
- [ ] Component uses shared/ui components

## Special Notes

- This is an early-stage project - file structure may not exist yet
- When creating new code, strictly follow the FSD layer structure
- All architectural decisions are documented in `spec/` directory
- Reference `spec/layrix-architecture-spec-en.md` for detailed rules
- Reference `spec/layrix-dashboard-product-spec-en.md` for product context