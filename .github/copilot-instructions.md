# GitHub Copilot Instructions — Layrix

This file provides comprehensive guidance for GitHub Copilot when working with the Layrix codebase.

## Project Overview

**Layrix** is a production-ready architectural framework for building scalable dashboard applications using Quasar Framework and Vue 3. It implements **Feature-Sliced Design (FSD)** methodology optimized for AI-assisted development.

**Core Principles:**
- **Predictability > Flexibility** — One correct way to structure code
- **Layer boundaries are law** — Strict import direction rules
- **Quasar as implementation detail** — Isolated in shared/ui/primitives/
- **AI-first architecture** — Clear, unambiguous structure for code generation

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Quasar | 2.16.0 |
| UI Library | Vue | 3.5.22 |
| Language | TypeScript | 5.9.2 (strict mode) |
| State Management | Pinia | 3.0.1 |
| Router | Vue Router | 4.x (history mode) |
| i18n | Vue I18n | 11.x |
| HTTP Client | Axios | 1.2.x |
| Linting | ESLint | 9.x (flat config) |
| Formatting | Prettier | 3.3.3 |
| Build Tool | Vite (via Quasar CLI) | — |
| Icons | Tabler Icons v2 | via quasar-extras-svg-icons |

---

## Architecture: Feature-Sliced Design (FSD)

Layrix follows strict FSD with 6 layers organized by scope of responsibility.

### Layer Hierarchy

```
┌─────────────────────────────────────────┐
│  app/      Application initialization   │ ← Can import EVERYTHING
├─────────────────────────────────────────┤
│  pages/    Route components             │ ← widgets, features, entities, shared
├─────────────────────────────────────────┤
│  widgets/  Large UI blocks              │ ← features, entities, shared
├─────────────────────────────────────────┤
│  features/ User actions                 │ ← entities, shared
├─────────────────────────────────────────┤
│  entities/ Business domain              │ ← shared only
├─────────────────────────────────────────┤
│  shared/   Reusable infrastructure      │ ← External libraries ONLY
└─────────────────────────────────────────┘
```

### Import Rules (CRITICAL)

**Direction: TOP → BOTTOM ONLY**

| Layer | CAN import from | CANNOT import from |
|-------|-----------------|-------------------|
| `app/` | Everything below | Nothing (top layer) |
| `pages/` | widgets, features, entities, shared | app, other pages |
| `widgets/` | features, entities, shared | app, pages, other widgets |
| `features/` | entities, shared | app, pages, widgets, other features |
| `entities/` | shared | app, pages, widgets, features, other entities |
| `shared/` | External libraries only | Any internal layer |

**Violations:**
- ❌ Upward imports (e.g., `entities/` importing from `features/`)
- ❌ Horizontal imports (e.g., `feature A` importing from `feature B`)
- ❌ Deep imports bypassing barrel exports

---

## Quasar Integration (CRITICAL RULE)

**Quasar components can ONLY be imported in `src/shared/ui/primitives/` components.**

### ✅ Correct

```typescript
// src/shared/ui/primitives/Button/Button.vue
import { QBtn } from 'quasar'  // ✅ ALLOWED here
```

```vue
<!-- Any other file in pages/, widgets/, features/, entities/ -->
<script setup lang="ts">
import { Button } from '@shared/ui'  // ✅ Use wrapped component
</script>
```

### ❌ Forbidden

```vue
<!-- pages/, widgets/, features/, entities/ — ANYWHERE except shared/ui/primitives/ -->
<script setup lang="ts">
import { QBtn } from 'quasar'  // ❌ FORBIDDEN
</script>
```

**Exception:** `app/layouts/` may use Quasar layout components (`QLayout`, `QPageContainer`) directly, since app layer has full access.

---

## Layer-by-Layer Guide

### 1. app/ — Application Layer

**Purpose:** Application initialization, global providers, layouts

**Structure:**
```
app/
├── providers/
│   ├── router/       # Vue Router configuration
│   ├── store/        # Pinia store setup
│   ├── i18n/         # i18n configuration
│   └── axios/        # HTTP client setup
└── layouts/
    └── AdminLayout.vue  # Main layout
```

**Rules:**
- Can import from all layers
- Contains boot files, router, store, i18n, layouts
- Layouts are NOT smart — no business logic
- Allowed: Quasar layout components (`QLayout`, `QPageContainer`, etc.)
- Forbidden: Business logic, API calls, feature-specific code

---

### 2. pages/ — Pages Layer

**Purpose:** Route components — maximally "dumb" composition wrappers

**Structure:**
```
pages/
├── analytics/
│   └── AnalyticsPage.vue
├── settings/
│   └── SettingsPage.vue
└── ...
```

**Rules:**
- **MUST be dumb** — only widget/feature composition
- NO business logic, NO API calls, NO direct store mutations
- NO complex computed properties, NO watchers with side effects
- ONLY import from: widgets, features, entities (types only), shared/ui

**Pattern:**
```vue
<script setup lang="ts">
import { PageContainer } from '@shared/ui'
import { SomeWidget } from '@widgets/some-widget'
import { SomeFeature } from '@features/some-domain'
</script>

<template>
  <PageContainer title="Page Title">
    <SomeWidget />
    <SomeFeature />
  </PageContainer>
</template>
```

---

### 3. widgets/ — Widgets Layer

**Purpose:** Large, self-contained UI blocks composed from features

**Structure:**
```
widgets/
├── header/
│   ├── ui/
│   │   ├── HeaderWidget.vue
│   │   └── HeaderUserButton.vue
│   ├── model/
│   │   └── useHeader.ts
│   └── index.ts
└── sidebar/
    ├── ui/
    │   └── SidebarWidget.vue
    ├── model/
    │   └── useSidebar.ts
    └── index.ts
```

**Rules:**
- Compose multiple features and entities
- Widget-specific state allowed
- NO imports from other widgets, pages, or app
- CAN import: features, entities, shared

**Naming:** Descriptive nouns (e.g., `header`, `sidebar`, `analytics-overview`)

---

### 4. features/ — Features Layer

**Purpose:** Single user actions (create, delete, edit, filter, toggle, etc.)

**Structure:**
```
features/
├── [domain]/          # e.g., sidebar/, theme/, user/
│   ├── [action]/      # e.g., toggle-mini/, create/, delete/
│   │   ├── ui/
│   │   │   └── [Action][Entity].vue
│   │   ├── model/
│   │   │   ├── use[Action][Entity].ts
│   │   │   ├── types.ts (optional)
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

**Rules:**
- **One feature = One action**
- Organized as `features/[domain]/[action]/`
- NO imports from other features, widgets, pages, or app
- CAN import: entities, shared

**Naming:**
- Folders: `kebab-case` verbs (e.g., `toggle-mini`, `create-user`, `delete-project`)
- Domain: `kebab-case` nouns (e.g., `sidebar`, `theme`, `user`)
- Vue files: `PascalCase.vue`
- Composables: `camelCase` with `use` prefix

**Example:** `features/sidebar/toggle-mini/`
```vue
<!-- ui/ToggleMiniButton.vue -->
<script setup lang="ts">
import { Button } from '@shared/ui'
import { useToggleMini } from '../model'

const { isMini, toggle } = useToggleMini()
</script>

<template>
  <Button @click="toggle" icon>
    {{ isMini ? 'Expand' : 'Collapse' }}
  </Button>
</template>
```

```typescript
// model/useToggleMini.ts
import { useSidebarStore } from '@entities/sidebar'

export function useToggleMini() {
  const store = useSidebarStore()

  return {
    isMini: computed(() => store.isMini),
    toggle: () => store.toggleMini(),
  }
}
```

---

### 5. entities/ — Entities Layer

**Purpose:** Business domain models, types, stores, API methods

**Structure:**
```
entities/
├── [name]/           # e.g., user/, sidebar/, project/
│   ├── model/
│   │   ├── types.ts           # Domain types
│   │   ├── [name]Store.ts     # Pinia store
│   │   └── index.ts
│   ├── api/
│   │   ├── [name]Api.ts       # CRUD methods
│   │   ├── types.ts           # DTOs
│   │   └── index.ts
│   ├── ui/                    # Small fragments only (avatar, badge)
│   │   └── [Name]Avatar.vue
│   └── index.ts
└── index.ts
```

**Rules:**
- Owns all data operations for the entity
- NO imports from features, widgets, pages, or app
- CAN import: shared only
- NO use case logic (that goes in features)
- Small UI fragments allowed (avatars, badges, cards)

**Naming:** Nouns (e.g., `user`, `sidebar`, `project`, `analytics`)

---

### 6. shared/ — Shared Layer

**Purpose:** Reusable infrastructure — UI kit, utilities, API client

**Structure:**
```
shared/
├── ui/
│   ├── primitives/        # Quasar wrappers (Button, Input, etc.)
│   │   ├── Button/
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.vue
│   │   │   └── index.ts
│   │   └── ...
│   ├── layout/            # Layout components (PageContainer)
│   └── index.ts
├── lib/
│   ├── theme/             # useTheme()
│   ├── device/            # useDevice(), useScreen()
│   └── clipboard/         # useClipboard()
├── api/                   # HTTP client, interceptors
├── config/                # Environment, constants
└── types/                 # Common types
```

**Rules:**
- NO imports from any business layer (app, pages, widgets, features, entities)
- ONLY import external libraries (vue, quasar, pinia, axios, etc.)
- `shared/ui/primitives/` is the ONLY place Quasar components are imported

---

## TypeScript Conventions

### Strict Mode Configuration

Layrix uses **VERY STRICT** TypeScript settings:

```json
{
  "strict": true,
  "exactOptionalPropertyTypes": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true
}
```

### Type Import Rule (ENFORCED)

**Always use `import type` for type-only imports:**

```typescript
// ✅ Correct
import type { User } from '@entities/user'
import type { ButtonProps } from './Button.types'

// ❌ Wrong (ESLint will error)
import { User } from '@entities/user'  // if User is a type
```

### Component Props

```typescript
// ✅ Correct
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

// ❌ Avoid
type ButtonProps = {  // Use interface, not type
  variant: string     // Use union types, not generic strings
  size: any           // Never use any
}
```

### exactOptionalPropertyTypes

```typescript
interface Props {
  value?: string
}

// ❌ Wrong
const props: Props = { value: undefined }  // Cannot assign undefined

// ✅ Correct
const props: Props = {}  // Omit the property
```

### noUncheckedIndexedAccess

```typescript
const arr = [1, 2, 3]

// ❌ Wrong (arr[0] is number | undefined)
const first = arr[0]
console.log(first.toFixed(2))  // Error

// ✅ Correct
const first = arr[0]
if (first !== undefined) {
  console.log(first.toFixed(2))
}
```

---

## Naming Conventions

### Files and Folders

| Type | Convention | Example |
|------|-----------|---------|
| Folders | `kebab-case` | `toggle-mini/`, `user-table/` |
| Vue components | `PascalCase.vue` | `ToggleMiniButton.vue` |
| TypeScript files | `camelCase.ts` | `useSidebarStore.ts` |
| Type files | `[Name].types.ts` | `Button.types.ts` |
| Composables | `use[Name].ts` | `useTheme.ts` |
| Stores | `[name]Store.ts` | `sidebarStore.ts` |
| API files | `[name]Api.ts` | `userApi.ts` |

### Slices

| Layer | Naming | Example |
|-------|--------|---------|
| Features | `verb-noun` or `domain/action` | `create-user`, `sidebar/toggle-mini` |
| Entities | `noun` | `user`, `sidebar`, `project` |
| Widgets | `descriptive-noun` | `header`, `sidebar`, `analytics-overview` |
| Pages | `descriptive-noun` | `analytics`, `settings`, `user-profile` |

---

## Path Aliases

**Always use FSD layer aliases:**

```typescript
import { Button } from '@shared/ui'
import { useSidebarStore } from '@entities/sidebar'
import { ToggleMiniButton } from '@features/sidebar'
import { HeaderWidget } from '@widgets/header'
import { AnalyticsPage } from '@pages/analytics'
import { router } from '@app/providers/router'
```

**Configured aliases:**
- `@app/*` → `./src/app/*`
- `@pages/*` → `./src/pages/*`
- `@widgets/*` → `./src/widgets/*`
- `@features/*` → `./src/features/*`
- `@entities/*` → `./src/entities/*`
- `@shared/*` → `./src/shared/*`

---

## Barrel Exports (index.ts)

**Every slice MUST export through its `index.ts`.**

### Feature Barrel

```typescript
// features/sidebar/toggle-mini/index.ts
export { default as ToggleMiniButton } from './ui/ToggleMiniButton.vue'
export { useToggleMini } from './model'
```

### Entity Barrel

```typescript
// entities/sidebar/index.ts
export { useSidebarStore } from './model/sidebarStore'
export type { SidebarState } from './model/types'
```

### Domain Barrel

```typescript
// features/sidebar/index.ts
export { ToggleMiniButton } from './toggle-mini'
export { ToggleSidebarButton } from './toggle-sidebar'
```

### Layer Barrel

```typescript
// features/index.ts
export { ToggleMiniButton, ToggleSidebarButton } from './sidebar'
export { ThemeToggle } from './theme'
```

---

## Icon Usage (CRITICAL)

**All icons MUST use Tabler Icons v2 from `quasar-extras-svg-icons`.**

### ✅ Correct

```vue
<script setup lang="ts">
import { tabHome, tabSearch, tabMail } from 'quasar-extras-svg-icons/tabler-icons-v2'
import { Button } from '@shared/ui'
</script>

<template>
  <Button :icon="tabHome" />
</template>
```

### ❌ Forbidden

```typescript
// ❌ No other icon libraries
import { mdiHome } from '@mdi/js'
import { faHome } from '@fortawesome/free-solid-svg-icons'
```

**Icon naming:** All Tabler icons use `tab` prefix in camelCase (e.g., `tabHome`, `tabSearch`, `tabMail`)

**Browsing icons:** `/icons` route provides searchable icon browser

---

## Design System Components

### Available Primitives (`@shared/ui`)

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Button` | Action button | variant, appearance, size, shape, icon, loading |
| `ButtonGroup` | Button group | orientation, spread, stretch |
| `Input` | Form input | variant, type, modelValue |
| `Alert` | Notification/alert | variant, appearance, icon, showIcon |
| `Badge` | Small label | variant, appearance |
| `Card` | Container | — |
| `ColorSwatch` | Color display | colorName |
| `Dropdown` | Dropdown menu | items, modelValue, maxWidth |
| `Typography` | Text hierarchy | as, variant, weight |

### Layout Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `PageContainer` | Page wrapper | title, subtitle |

### Composables (`@shared/lib`)

| Composable | Purpose | Returns |
|-----------|---------|---------|
| `useTheme()` | Theme management | isDark, toggleTheme, setTheme |
| `useScreen()` | Breakpoint detection | isMobileBreakpoint, currentBreakpoint |
| `usePlatform()` | Platform detection | isPlatform(type) |
| `useDevice()` | Device info | deviceType, os, browser, capabilities |
| `useClipboard()` | Copy to clipboard | copy(text) |

---

## Common Patterns

### Creating a New Feature

1. **Create structure:**
   ```
   features/[domain]/[action]/
   ├── ui/
   │   └── [Action][Entity].vue
   ├── model/
   │   ├── use[Action][Entity].ts
   │   └── index.ts
   └── index.ts
   ```

2. **Implement composable:**
   ```typescript
   // model/useCreateUser.ts
   import { ref } from 'vue'
   import { useUserStore } from '@entities/user'

   export function useCreateUser() {
     const store = useUserStore()
     const isLoading = ref(false)

     async function create(data: CreateUserData) {
       isLoading.value = true
       try {
         await store.createUser(data)
       } finally {
         isLoading.value = false
       }
     }

     return { isLoading, create }
   }
   ```

3. **Implement component:**
   ```vue
   <script setup lang="ts">
   import { Button, Input } from '@shared/ui'
   import { useCreateUser } from '../model'

   const { isLoading, create } = useCreateUser()
   </script>

   <template>
     <div>
       <Input v-model="name" label="Name" />
       <Button @click="create" :loading="isLoading">
         Create User
       </Button>
     </div>
   </template>
   ```

4. **Export through barrels:**
   ```typescript
   // features/user/create/index.ts
   export { default as CreateUserButton } from './ui/CreateUserButton.vue'
   export { useCreateUser } from './model'

   // features/user/index.ts
   export { CreateUserButton } from './create'

   // features/index.ts
   export { CreateUserButton } from './user'
   ```

---

### Creating a New Entity

1. **Create structure:**
   ```
   entities/[name]/
   ├── model/
   │   ├── types.ts
   │   ├── [name]Store.ts
   │   └── index.ts
   ├── api/
   │   ├── [name]Api.ts
   │   ├── types.ts
   │   └── index.ts
   └── index.ts
   ```

2. **Define types:**
   ```typescript
   // model/types.ts
   export interface User {
     id: string
     name: string
     email: string
   }
   ```

3. **Create store:**
   ```typescript
   // model/userStore.ts
   import { defineStore } from 'pinia'
   import type { User } from './types'

   export const useUserStore = defineStore('user', () => {
     const users = ref<User[]>([])

     async function fetchUsers() {
       // API call
     }

     return { users, fetchUsers }
   })
   ```

4. **Export:**
   ```typescript
   // entities/user/index.ts
   export { useUserStore } from './model/userStore'
   export type { User } from './model/types'
   ```

---

### Wrapping a Quasar Component

1. **Create in `shared/ui/primitives/[Name]/`**

2. **Define props interface:**
   ```typescript
   // Button.types.ts
   export interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'positive' | 'negative'
     size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
     loading?: boolean
     disabled?: boolean
   }
   ```

3. **Create component:**
   ```vue
   <!-- Button.vue -->
   <script setup lang="ts">
   import { QBtn } from 'quasar'  // ✅ ONLY allowed here
   import type { ButtonProps } from './Button.types'

   const props = withDefaults(defineProps<ButtonProps>(), {
     variant: 'primary',
     size: 'md',
   })

   // Map our props to Quasar props
   const qProps = computed(() => ({
     color: props.variant,
     size: props.size,
     loading: props.loading,
     disable: props.disabled,
   }))
   </script>

   <template>
     <QBtn v-bind="qProps">
       <slot />
     </QBtn>
   </template>
   ```

4. **Export:**
   ```typescript
   // index.ts
   export { default as Button } from './Button.vue'
   export type { ButtonProps } from './Button.types'
   ```

5. **Register in `shared/ui/index.ts`:**
   ```typescript
   export * from './primitives/Button'
   ```

---

### Creating a New Page

1. **Create page component:**
   ```vue
   <!-- pages/settings/SettingsPage.vue -->
   <script setup lang="ts">
   import { PageContainer } from '@shared/ui'
   import { SettingsWidget } from '@widgets/settings'
   </script>

   <template>
     <PageContainer title="Settings">
       <SettingsWidget />
     </PageContainer>
   </template>
   ```

2. **Register route:**
   ```typescript
   // app/providers/router/routes.ts
   {
     path: '/settings',
     name: 'settings',
     component: () => import('@pages/settings/SettingsPage.vue'),
   }
   ```

3. **Add sidebar link (optional):**
   ```typescript
   // widgets/sidebar/model/useSidebar.ts
   {
     label: 'Settings',
     icon: tabSettings,
     to: '/settings',
   }
   ```

---

## Review Checklist

Before committing, verify:

- [ ] File is in correct layer
- [ ] Naming follows conventions (kebab-case folders, PascalCase components)
- [ ] Imports follow hierarchy (no upward/horizontal)
- [ ] No direct Quasar imports (except `shared/ui/primitives/`)
- [ ] Exports through `index.ts` barrel files
- [ ] UI separated from logic (ui/ vs model/)
- [ ] Types are defined (no `any`)
- [ ] Using `import type` for type-only imports
- [ ] Component uses `@shared/ui` components
- [ ] Icons from `quasar-extras-svg-icons/tabler-icons-v2` only

---

## Issue Tracking

Layrix uses **beads** (`bd` CLI) for issue tracking.

### Common Commands

```bash
# Finding work
bd ready                              # Show available issues (no blockers)
bd list --status=open                 # All open issues
bd show <id>                          # Detailed view

# Creating issues
bd create --title="..." --type=task|bug|feature --priority=0-4

# Updating issues
bd update <id> --status=in_progress   # Start work
bd close <id1> <id2> ...              # Close multiple

# Dependencies
bd dep add <issue> <depends-on>       # Add dependency
bd blocked                            # Show blocked issues

# Sync
bd sync                               # Sync with git
bd stats                              # Project statistics
```

**Priority levels:** 0 (critical), 1 (high), 2 (medium), 3 (low), 4 (backlog)

---

## Development Workflow

### Starting Development

```bash
quasar dev               # Start dev server (auto-opens browser)
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run format           # Run Prettier
npx vue-tsc --noEmit     # Type check
```

### Building

```bash
quasar build             # Production build
```

---

## Claude Code Integration

This project has custom **Claude Code** agents and skills for enhanced AI assistance.

### Agents (Subprocesses)

| Agent | Purpose | Usage |
|-------|---------|-------|
| `fsd-reviewer` | Reviews code for FSD compliance | Use after code changes |
| `component-builder` | Creates new shared/ui primitives | Use when adding UI components |
| `feature-builder` | Scaffolds feature slices | Use when adding user actions |
| `architecture-auditor` | Full architecture audit | Use for health checks |

### Skills (Slash Commands)

| Skill | Usage | Description |
|-------|-------|-------------|
| `/beads` | `/beads [command] [args]` | Manage issues via bd CLI |
| `/new-component` | `/new-component DataTable` | Scaffold shared/ui primitive |
| `/new-feature` | `/new-feature user/create` | Scaffold feature slice |
| `/new-page` | `/new-page settings` | Scaffold page + route |
| `/lint-check` | `/lint-check [--fix]` | Run ESLint + TypeScript checks |
| `/fsd-check` | `/fsd-check` | Quick FSD compliance scan |
| `/icons` | `/icons [icon-name]` | Search Tabler icons |

---

## Common Mistakes to Avoid

### ❌ Import Violations

```typescript
// ❌ Upward import
// In entities/user/model/userStore.ts
import { CreateUserButton } from '@features/user'  // FORBIDDEN

// ❌ Horizontal import
// In features/user/create/
import { DeleteUser } from '@features/user/delete'  // FORBIDDEN

// ❌ Deep import
import { ToggleMiniButton } from '@features/sidebar/toggle-mini/ui/ToggleMiniButton.vue'  // FORBIDDEN
```

### ✅ Correct Imports

```typescript
// ✅ Top-to-bottom
// In features/user/create/
import { useUserStore } from '@entities/user'  // ✅ Correct
import { Button } from '@shared/ui'           // ✅ Correct

// ✅ Through barrel
import { ToggleMiniButton } from '@features/sidebar'  // ✅ Correct
```

### ❌ Quasar Isolation

```vue
<!-- ❌ In pages/analytics/AnalyticsPage.vue -->
<script setup lang="ts">
import { QBtn } from 'quasar'  // FORBIDDEN
</script>
```

### ✅ Correct Quasar Usage

```vue
<!-- ✅ In any file -->
<script setup lang="ts">
import { Button } from '@shared/ui'  // ✅ Use wrapped component
</script>
```

```vue
<!-- ✅ In shared/ui/primitives/Button/Button.vue -->
<script setup lang="ts">
import { QBtn } from 'quasar'  // ✅ ONLY allowed here
</script>
```

### ❌ Smart Pages

```vue
<!-- ❌ pages/users/UsersPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@entities/user'

const store = useUserStore()
const users = ref([])

onMounted(async () => {
  users.value = await store.fetchUsers()  // ❌ Business logic in page
})
</script>
```

### ✅ Dumb Pages

```vue
<!-- ✅ pages/users/UsersPage.vue -->
<script setup lang="ts">
import { PageContainer } from '@shared/ui'
import { UsersTable } from '@widgets/users-table'  // Widget handles logic
</script>

<template>
  <PageContainer title="Users">
    <UsersTable />
  </PageContainer>
</template>
```

---

## Summary

Layrix is a strictly structured FSD project where:

1. **Every file has one correct location** based on its layer
2. **Imports flow top-to-bottom only** — no exceptions
3. **Quasar is isolated** in `shared/ui/primitives/`
4. **Barrel exports are mandatory** — no deep imports
5. **Features represent actions** — organized by domain
6. **Pages are composition-only** — zero business logic
7. **TypeScript is strict** — no shortcuts, no `any`
8. **Icons come from Tabler** — via `quasar-extras-svg-icons/tabler-icons-v2`

When generating code for Layrix:
- Always check the target layer first
- Verify import rules before adding imports
- Use wrapped components from `@shared/ui`, never Quasar directly
- Keep pages dumb — move logic to widgets or features
- Export through `index.ts` barrel files
- Use `import type` for types
- Follow naming conventions

**Predictability is the core value.** There is only one right way to do things in Layrix.
