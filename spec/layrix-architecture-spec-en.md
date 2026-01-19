# Layrix Architecture Specification
## Strict Project Structure Specification

**Version:** 1.0  
**Product:** Layrix — AI-ready Dashboard Architecture  
**Date:** December 2024

---

## Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [Root Project Structure](#2-root-project-structure)
3. [App Layer](#3-app-layer)
4. [Pages Layer](#4-pages-layer)
5. [Widgets Layer](#5-widgets-layer)
6. [Features Layer](#6-features-layer)
7. [Entities Layer](#7-entities-layer)
8. [Shared Layer](#8-shared-layer)
9. [Naming Conventions](#9-naming-conventions)
10. [Import Rules](#10-import-rules)
11. [Working with Quasar](#11-working-with-quasar)
12. [AI-Friendly Rules](#12-ai-friendly-rules)
13. [Review Checklist](#13-review-checklist)

---

## 1. Architecture Philosophy

### 1.1 Core Principles

```
┌─────────────────────────────────────────────────────────┐
│                    LAYRIX PRINCIPLES                     │
├─────────────────────────────────────────────────────────┤
│  1. Predictability > Flexibility                        │
│  2. One right way                                       │
│  3. Quasar = implementation detail                      │
│  4. Layer boundaries = law                              │
│  5. AI must understand the structure                    │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Layer Hierarchy (Strict)

```
┌─────────────────────────────────────────────────────────┐
│                         app                              │
│  (initialization, providers, layouts)                   │
├─────────────────────────────────────────────────────────┤
│                        pages                             │
│  (routes, widget composition)                           │
├─────────────────────────────────────────────────────────┤
│                       widgets                            │
│  (large UI blocks, feature composition)                 │
├─────────────────────────────────────────────────────────┤
│                       features                           │
│  (user actions, use cases)                              │
├─────────────────────────────────────────────────────────┤
│                       entities                           │
│  (business entities, data, API)                         │
├─────────────────────────────────────────────────────────┤
│                        shared                            │
│  (UI kit, utilities, configs)                           │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Dependency Rule

```
app      → can import: EVERYTHING
pages    → can import: widgets, features, entities, shared
widgets  → can import: features, entities, shared
features → can import: entities, shared
entities → can import: shared
shared   → can import: ONLY external libraries
```

**❌ FORBIDDEN:**
- Importing up the hierarchy
- Horizontal imports between slices of the same layer
- Direct Quasar imports outside `shared/ui/quasar`

---

## 2. Root Project Structure

```
src/
├── app/                    # Application initialization
│   ├── providers/          # Providers (router, store, i18n)
│   ├── layouts/            # Layout components
│   ├── styles/             # Global styles and tokens
│   └── index.ts            # Entry point
│
├── pages/                  # Pages (routes)
│   ├── dashboard/
│   ├── users/
│   └── settings/
│
├── widgets/                # Large UI blocks
│   ├── sidebar/
│   ├── header/
│   └── analytics-overview/
│
├── features/               # User actions
│   ├── auth/
│   ├── user/
│   └── notifications/
│
├── entities/               # Business entities
│   ├── user/
│   ├── project/
│   └── analytics/
│
├── shared/                 # Reusable infrastructure
│   ├── api/
│   ├── config/
│   ├── lib/
│   ├── types/
│   └── ui/
│
└── main.ts                 # Quasar boot
```

---

## 3. App Layer

### 3.1 Purpose

Application initialization, global providers, layouts.

**✅ Allowed:**
- Quasar boot files
- Global providers
- Layout components
- Global styles

**❌ Forbidden:**
- Business logic
- API calls
- Feature components

### 3.2 Structure

```
app/
├── providers/
│   ├── router/
│   │   ├── index.ts           # Router instance
│   │   ├── routes.ts          # Route definitions
│   │   └── guards.ts          # Navigation guards
│   │
│   ├── store/
│   │   └── index.ts           # Pinia instance
│   │
│   ├── i18n/
│   │   ├── index.ts           # i18n instance
│   │   └── locales/
│   │       ├── en.ts
│   │       └── ru.ts
│   │
│   └── index.ts               # All providers export
│
├── layouts/
│   ├── AdminLayout.vue        # Main dashboard layout
│   ├── AuthLayout.vue         # Auth pages layout
│   ├── BlankLayout.vue        # Empty layout
│   └── index.ts
│
├── styles/
│   ├── tokens/
│   │   ├── _colors.scss       # Color tokens
│   │   ├── _spacing.scss      # Spacing
│   │   ├── _typography.scss   # Typography
│   │   └── _index.scss        # All tokens
│   │
│   ├── quasar/
│   │   └── variables.scss     # Quasar SCSS variables
│   │
│   ├── base/
│   │   ├── _reset.scss        # CSS reset
│   │   └── _global.scss       # Global styles
│   │
│   └── main.scss              # Styles entry point
│
└── index.ts                   # App initialization
```

### 3.3 File Specifications

#### `app/index.ts`
```typescript
// Purpose: Application entry point
// Exports: initialization function

export { initApp } from './providers'
export { AdminLayout, AuthLayout, BlankLayout } from './layouts'
```

#### `app/providers/router/routes.ts`
```typescript
// Purpose: Route definitions
// Rule: Only import layouts, pages are lazy-loaded

import type { RouteRecordRaw } from 'vue-router'
import { AdminLayout, AuthLayout } from '@/app/layouts'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue')
      }
    ]
  }
]
```

#### `app/layouts/AdminLayout.vue`
```vue
<!-- Purpose: Main dashboard layout -->
<!-- Rule: Only widget composition, no logic -->

<script setup lang="ts">
import { SidebarWidget } from '@/widgets/sidebar'
import { HeaderWidget } from '@/widgets/header'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderWidget />
    <SidebarWidget />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
```

### 3.4 Layout Rules

| Rule | Description |
|------|-------------|
| ✅ Use widgets | Sidebar, Header are widgets |
| ✅ Use q-layout | Quasar layout system is allowed |
| ❌ Business logic | No computed, watchers with logic |
| ❌ API calls | No fetch, axios |
| ❌ Direct store access | Only through widgets/features |

---

## 4. Pages Layer

### 4.1 Purpose

Application pages. Composition of widgets and features.

**Main rule: Page = maximally "dumb" component**

### 4.2 Structure

```
pages/
├── dashboard/
│   ├── index.vue              # Main dashboard page
│   └── analytics/
│       └── index.vue          # Analytics sub-page
│
├── users/
│   ├── index.vue              # Users list page
│   ├── [id]/
│   │   └── index.vue          # User details page
│   └── create/
│       └── index.vue          # Create user page
│
├── settings/
│   ├── index.vue              # Settings page
│   ├── profile/
│   │   └── index.vue
│   └── security/
│       └── index.vue
│
└── auth/
    ├── login/
    │   └── index.vue
    └── register/
        └── index.vue
```

### 4.3 File Specifications

#### Page component structure

```
pages/users/
├── index.vue                  # Page component (required)
├── model/                     # Page-specific logic (optional)
│   └── useUsersPage.ts
└── ui/                        # Page-specific components (optional)
    └── UsersPageHeader.vue
```

#### `pages/users/index.vue`
```vue
<!-- 
  Purpose: Users list page
  Rules:
  - Only widgets/features composition
  - Minimal logic
  - No API calls
-->

<script setup lang="ts">
import { PageContainer } from '@/shared/ui'
import { UsersTableWidget } from '@/widgets/users-table'
import { CreateUserFeature } from '@/features/user/create'
import { FilterUsersFeature } from '@/features/user/filter'
</script>

<template>
  <PageContainer title="Users">
    <template #actions>
      <CreateUserFeature />
    </template>
    
    <template #filters>
      <FilterUsersFeature />
    </template>
    
    <UsersTableWidget />
  </PageContainer>
</template>
```

### 4.4 Page Rules

| Allowed | Forbidden |
|---------|-----------|
| ✅ Import widgets | ❌ API calls |
| ✅ Import features | ❌ Business logic |
| ✅ Import shared/ui | ❌ Direct store access |
| ✅ Route params | ❌ Complex computed |
| ✅ Simple refs | ❌ Watchers with side effects |

### 4.5 When to Add model/ to a Page

**Only if:**
- Need coordination between multiple widgets
- Page-specific state (e.g., active tab)
- Passing data between siblings

```typescript
// pages/users/model/useUsersPage.ts
export function useUsersPage() {
  const activeTab = ref<'all' | 'active' | 'blocked'>('all')
  
  return {
    activeTab
  }
}
```

---

## 5. Widgets Layer

### 5.1 Purpose

Large, self-contained UI blocks. Composition of features and entities.

**Widget = "smart" UI block**

### 5.2 Structure

```
widgets/
├── sidebar/
│   ├── ui/
│   │   ├── Sidebar.vue
│   │   ├── SidebarMenu.vue
│   │   └── SidebarMenuItem.vue
│   ├── model/
│   │   └── useSidebar.ts
│   ├── config/
│   │   └── menu.ts
│   └── index.ts
│
├── header/
│   ├── ui/
│   │   ├── Header.vue
│   │   ├── HeaderSearch.vue
│   │   └── HeaderUserMenu.vue
│   ├── model/
│   │   └── useHeader.ts
│   └── index.ts
│
├── users-table/
│   ├── ui/
│   │   ├── UsersTable.vue
│   │   └── UsersTableRow.vue
│   ├── model/
│   │   └── useUsersTable.ts
│   └── index.ts
│
├── analytics-overview/
│   ├── ui/
│   │   ├── AnalyticsOverview.vue
│   │   ├── StatsCard.vue
│   │   └── TrendChart.vue
│   ├── model/
│   │   └── useAnalyticsOverview.ts
│   └── index.ts
│
└── [widget-name]/
    ├── ui/                    # Vue components (required)
    ├── model/                 # Logic (optional)
    ├── config/                # Configuration (optional)
    ├── lib/                   # Widget utilities (optional)
    └── index.ts               # Public API (required)
```

### 5.3 File Specifications

#### `widgets/users-table/index.ts`
```typescript
// Widget public API
// Rule: Export only what's needed externally

export { default as UsersTableWidget } from './ui/UsersTable.vue'
export type { UsersTableProps } from './ui/UsersTable.vue'
```

#### `widgets/users-table/ui/UsersTable.vue`
```vue
<!--
  Purpose: Users table
  Responsibility:
  - Display data
  - Coordinate features (edit, delete, filter)
  - Pagination, sorting
-->

<script setup lang="ts">
import { DataTable, Pagination } from '@/shared/ui'
import { useUsersList } from '@/entities/user'
import { EditUserFeature } from '@/features/user/edit'
import { DeleteUserFeature } from '@/features/user/delete'
import { useUsersTable } from '../model/useUsersTable'

const { users, loading, pagination } = useUsersList()
const { columns, onSort } = useUsersTable()
</script>

<template>
  <div class="users-table">
    <DataTable
      :rows="users"
      :columns="columns"
      :loading="loading"
      @sort="onSort"
    >
      <template #actions="{ row }">
        <EditUserFeature :user="row" />
        <DeleteUserFeature :user="row" />
      </template>
    </DataTable>
    
    <Pagination v-model="pagination" />
  </div>
</template>
```

#### `widgets/users-table/model/useUsersTable.ts`
```typescript
// Purpose: Users table logic
// Responsibility: columns config, sorting state

import { ref, computed } from 'vue'
import type { DataTableColumn } from '@/shared/ui'
import type { User } from '@/entities/user'

export function useUsersTable() {
  const sortBy = ref<keyof User>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  
  const columns: DataTableColumn<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true }
  ]
  
  function onSort(column: keyof User) {
    if (sortBy.value === column) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = column
      sortOrder.value = 'asc'
    }
  }
  
  return {
    columns,
    sortBy,
    sortOrder,
    onSort
  }
}
```

### 5.4 Widget Rules

| Allowed | Forbidden |
|---------|-----------|
| ✅ Import features | ❌ Import other widgets |
| ✅ Import entities | ❌ Import pages |
| ✅ Import shared | ❌ Global side effects |
| ✅ Feature coordination | ❌ Duplicating entity logic |
| ✅ Widget-specific state | ❌ Business rules |

### 5.5 Widget vs Feature — How to Distinguish

| Widget | Feature |
|--------|---------|
| What is displayed | What the user does |
| Table, sidebar, chart | Create, delete, filter |
| Feature composition | One specific action |
| Can be on multiple pages | Reused in widgets |

---

## 6. Features Layer

### 6.1 Purpose

User actions. Use cases. Business scenarios.

**Feature = verb (create, delete, filter, export)**

### 6.2 Structure

```
features/
├── auth/
│   ├── login/
│   │   ├── ui/
│   │   │   └── LoginForm.vue
│   │   ├── model/
│   │   │   ├── useLogin.ts
│   │   │   └── validation.ts
│   │   ├── api/
│   │   │   └── loginApi.ts
│   │   └── index.ts
│   │
│   ├── logout/
│   │   ├── ui/
│   │   │   └── LogoutButton.vue
│   │   ├── model/
│   │   │   └── useLogout.ts
│   │   └── index.ts
│   │
│   └── index.ts
│
├── user/
│   ├── create/
│   │   ├── ui/
│   │   │   └── CreateUserDialog.vue
│   │   ├── model/
│   │   │   └── useCreateUser.ts
│   │   └── index.ts
│   │
│   ├── edit/
│   │   ├── ui/
│   │   │   └── EditUserDialog.vue
│   │   ├── model/
│   │   │   └── useEditUser.ts
│   │   └── index.ts
│   │
│   ├── delete/
│   │   ├── ui/
│   │   │   └── DeleteUserButton.vue
│   │   ├── model/
│   │   │   └── useDeleteUser.ts
│   │   └── index.ts
│   │
│   ├── filter/
│   │   ├── ui/
│   │   │   └── FilterUsersForm.vue
│   │   ├── model/
│   │   │   └── useFilterUsers.ts
│   │   └── index.ts
│   │
│   ├── export/
│   │   ├── ui/
│   │   │   └── ExportUsersButton.vue
│   │   ├── model/
│   │   │   └── useExportUsers.ts
│   │   └── index.ts
│   │
│   └── index.ts
│
├── notifications/
│   ├── mark-as-read/
│   ├── clear-all/
│   └── index.ts
│
└── theme/
    ├── toggle-dark-mode/
    └── index.ts
```

### 6.3 File Specifications

#### Feature slice structure

```
features/user/create/
├── ui/
│   ├── CreateUserDialog.vue   # Main component
│   ├── CreateUserForm.vue     # Form (if complex)
│   └── index.ts               # UI exports
│
├── model/
│   ├── useCreateUser.ts       # Main logic
│   ├── validation.ts          # Validation (if needed)
│   └── index.ts               # Model exports
│
├── api/                       # Only if API is feature-specific
│   └── createUserApi.ts
│
├── lib/                       # Feature utilities (rare)
│   └── formatUserData.ts
│
├── types.ts                   # Feature types (optional)
│
└── index.ts                   # Public API
```

#### `features/user/create/index.ts`
```typescript
// Feature public API
// Rule: Minimal exports

export { default as CreateUserFeature } from './ui/CreateUserDialog.vue'
export { useCreateUser } from './model'
export type { CreateUserFormData } from './types'
```

#### `features/user/create/ui/CreateUserDialog.vue`
```vue
<!--
  Purpose: Create user dialog
  Responsibility:
  - Form UI
  - Call useCreateUser
  - Display state
-->

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, Button, Input, Select } from '@/shared/ui'
import { useCreateUser } from '../model'
import type { CreateUserFormData } from '../types'

const isOpen = ref(false)
const { create, loading, error } = useCreateUser()

const form = ref<CreateUserFormData>({
  name: '',
  email: '',
  role: 'user'
})

async function handleSubmit() {
  const success = await create(form.value)
  if (success) {
    isOpen.value = false
    form.value = { name: '', email: '', role: 'user' }
  }
}
</script>

<template>
  <Button @click="isOpen = true">
    Add User
  </Button>
  
  <Dialog v-model="isOpen" title="Create User">
    <form @submit.prevent="handleSubmit">
      <Input
        v-model="form.name"
        label="Name"
        required
      />
      
      <Input
        v-model="form.email"
        label="Email"
        type="email"
        required
      />
      
      <Select
        v-model="form.role"
        label="Role"
        :options="['user', 'admin', 'manager']"
      />
      
      <div v-if="error" class="error">
        {{ error }}
      </div>
      
      <Button type="submit" :loading="loading">
        Create
      </Button>
    </form>
  </Dialog>
</template>
```

#### `features/user/create/model/useCreateUser.ts`
```typescript
// Purpose: Create user logic
// Responsibility:
// - Validation
// - API call
// - Store update

import { ref } from 'vue'
import { useUserStore } from '@/entities/user'
import { toastSuccess, toastError } from '@/shared/ui'
import type { CreateUserFormData } from '../types'

export function useCreateUser() {
  const userStore = useUserStore()
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  async function create(data: CreateUserFormData): Promise<boolean> {
    loading.value = true
    error.value = null
    
    try {
      await userStore.createUser(data)
      toastSuccess('User created successfully')
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create user'
      toastError(error.value)
      return false
    } finally {
      loading.value = false
    }
  }
  
  return {
    create,
    loading,
    error
  }
}
```

#### `features/user/create/types.ts`
```typescript
// Feature-specific types

export interface CreateUserFormData {
  name: string
  email: string
  role: 'user' | 'admin' | 'manager'
}
```

### 6.4 Feature Rules

| Allowed | Forbidden |
|---------|-----------|
| ✅ Import entities | ❌ Import other features |
| ✅ Import shared | ❌ Import widgets |
| ✅ Call entity API/store | ❌ Import pages |
| ✅ Local state | ❌ Global state outside store |
| ✅ UI for action | ❌ List displays |

### 6.5 When to Create a Separate Feature

**✅ Create feature if:**
- There's a specific user action
- A form/dialog is needed
- There's an API call
- Logic is reused

**❌ DON'T create feature if:**
- Just displaying data (that's entity/widget)
- No user action
- One-time logic in widget

---

## 7. Entities Layer

### 7.1 Purpose

Business entities. Data, types, API, store.

**Entity = noun (user, project, order)**

### 7.2 Structure

```
entities/
├── user/
│   ├── model/
│   │   ├── types.ts           # Entity types
│   │   ├── store.ts           # Pinia store
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── userApi.ts         # API methods
│   │   ├── types.ts           # API types (DTO)
│   │   └── index.ts
│   │
│   ├── ui/                    # Small UI fragments
│   │   ├── UserAvatar.vue
│   │   ├── UserBadge.vue
│   │   └── index.ts
│   │
│   ├── lib/                   # Entity utilities
│   │   ├── formatUser.ts
│   │   └── index.ts
│   │
│   └── index.ts               # Public API
│
├── project/
│   ├── model/
│   ├── api/
│   ├── ui/
│   └── index.ts
│
├── analytics/
│   ├── model/
│   ├── api/
│   └── index.ts
│
└── session/                   # Special entity for auth
    ├── model/
    ├── api/
    └── index.ts
```

### 7.3 File Specifications

#### `entities/user/index.ts`
```typescript
// Entity public API
// Rule: Export everything needed for features and widgets

// Types
export type { User, UserRole, UserStatus } from './model'

// Store
export { useUserStore, useUsersList, useCurrentUser } from './model'

// API
export { userApi } from './api'
export type { CreateUserDTO, UpdateUserDTO } from './api'

// UI components
export { UserAvatar, UserBadge } from './ui'

// Utils
export { formatUserName, getUserInitials } from './lib'
```

#### `entities/user/model/types.ts`
```typescript
// Business entity types

export type UserRole = 'user' | 'admin' | 'manager'
export type UserStatus = 'active' | 'blocked' | 'pending'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

#### `entities/user/model/store.ts`
```typescript
// Pinia store for entity

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '../api'
import type { User } from './types'
import type { CreateUserDTO, UpdateUserDTO } from '../api'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const activeUsers = computed(() => 
    users.value.filter(u => u.status === 'active')
  )
  
  const userById = computed(() => (id: string) => 
    users.value.find(u => u.id === id)
  )
  
  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      users.value = await userApi.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch users'
      throw e
    } finally {
      loading.value = false
    }
  }
  
  async function createUser(data: CreateUserDTO): Promise<User> {
    const newUser = await userApi.create(data)
    users.value.push(newUser)
    return newUser
  }
  
  async function updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const updated = await userApi.update(id, data)
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = updated
    }
    return updated
  }
  
  async function deleteUser(id: string): Promise<void> {
    await userApi.delete(id)
    users.value = users.value.filter(u => u.id !== id)
  }
  
  return {
    // State
    users,
    currentUser,
    loading,
    error,
    // Getters
    activeUsers,
    userById,
    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})

// Composable for convenience
export function useUsersList() {
  const store = useUserStore()
  return {
    users: computed(() => store.users),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    fetch: store.fetchUsers
  }
}

export function useCurrentUser() {
  const store = useUserStore()
  return {
    user: computed(() => store.currentUser),
    isAuthenticated: computed(() => !!store.currentUser)
  }
}
```

#### `entities/user/api/userApi.ts`
```typescript
// API methods for entity

import { apiClient } from '@/shared/api'
import type { User } from '../model'
import type { CreateUserDTO, UpdateUserDTO, UserListParams } from './types'

export const userApi = {
  async getAll(params?: UserListParams): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users', { params })
    return response.data
  },
  
  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },
  
  async create(data: CreateUserDTO): Promise<User> {
    const response = await apiClient.post<User>('/users', data)
    return response.data
  },
  
  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data)
    return response.data
  },
  
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }
}
```

#### `entities/user/api/types.ts`
```typescript
// DTO types for API

export interface CreateUserDTO {
  name: string
  email: string
  role: 'user' | 'admin' | 'manager'
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  role?: 'user' | 'admin' | 'manager'
  status?: 'active' | 'blocked'
}

export interface UserListParams {
  page?: number
  limit?: number
  search?: string
  role?: string
  status?: string
}
```

#### `entities/user/ui/UserAvatar.vue`
```vue
<!--
  Purpose: User avatar
  Rule: Display only, no logic
-->

<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from '@/shared/ui'
import { getUserInitials } from '../lib'
import type { User } from '../model'

interface Props {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const initials = computed(() => getUserInitials(props.user))
</script>

<template>
  <Avatar
    :src="user.avatar"
    :alt="user.name"
    :fallback="initials"
    :size="size"
  />
</template>
```

### 7.4 Entity Rules

| Allowed | Forbidden |
|---------|-----------|
| ✅ Import shared | ❌ Import features |
| ✅ Types and interfaces | ❌ Import widgets |
| ✅ API methods | ❌ Import pages |
| ✅ Pinia store | ❌ Import other entities |
| ✅ Small UI fragments | ❌ Complex forms/dialogs |
| ✅ Entity utilities | ❌ Use case logic |

### 7.5 Entity vs Feature — How to Distinguish

| Entity | Feature |
|--------|---------|
| What it is (data) | What to do (action) |
| User, Project, Order | CreateUser, DeleteProject |
| CRUD API | Use case logic |
| Store state | UI for action |
| Types and models | Form validation |

---

## 8. Shared Layer

### 8.1 Purpose

Reusable infrastructure. UI kit, utilities, configs.

**Shared = foundation everything else is built on**

### 8.2 Structure

```
shared/
├── api/
│   ├── client.ts              # Axios/fetch instance
│   ├── interceptors.ts        # Request/response interceptors
│   ├── types.ts               # API types
│   └── index.ts
│
├── config/
│   ├── env.ts                 # Environment variables
│   ├── constants.ts           # App constants
│   └── index.ts
│
├── lib/
│   ├── date/
│   │   ├── format.ts
│   │   ├── parse.ts
│   │   └── index.ts
│   │
│   ├── validation/
│   │   ├── rules.ts
│   │   ├── schemas.ts
│   │   └── index.ts
│   │
│   ├── storage/
│   │   ├── local.ts
│   │   ├── session.ts
│   │   └── index.ts
│   │
│   └── index.ts
│
├── types/
│   ├── common.ts              # Common types
│   ├── api.ts                 # API types
│   └── index.ts
│
└── ui/
    ├── primitives/            # Basic components
    │   ├── Button/
    │   ├── Input/
    │   ├── Select/
    │   └── index.ts
    │
    ├── data/                  # Data components
    │   ├── DataTable/
    │   ├── Pagination/
    │   └── index.ts
    │
    ├── feedback/              # Feedback components
    │   ├── Dialog/
    │   ├── Toast/
    │   ├── Confirm/
    │   └── index.ts
    │
    ├── layout/                # Layout components
    │   ├── PageContainer/
    │   ├── Section/
    │   ├── Stack/
    │   └── index.ts
    │
    ├── quasar/                # Quasar adapters (PRIVATE)
    │   ├── Button.vue
    │   ├── DataTable.vue
    │   ├── Dialog.vue
    │   └── index.ts
    │
    ├── composables/           # UI composables
    │   ├── useScreen.ts
    │   ├── useDarkMode.ts
    │   └── index.ts
    │
    ├── types/                 # UI types
    │   ├── button.ts
    │   ├── table.ts
    │   └── index.ts
    │
    └── index.ts               # Public API
```

### 8.3 shared/ui — Detailed Specification

#### `shared/ui/index.ts`
```typescript
// shared/ui public API
// ❗ IMPORTANT: This is the only UI component import point

// Primitives
export { Button } from './primitives'
export type { ButtonProps } from './primitives'

export { Input } from './primitives'
export type { InputProps } from './primitives'

export { Select } from './primitives'
export type { SelectProps, SelectOption } from './primitives'

// Data
export { DataTable } from './data'
export type { DataTableProps, DataTableColumn } from './data'

export { Pagination } from './data'
export type { PaginationProps } from './data'

// Feedback
export { Dialog } from './feedback'
export type { DialogProps } from './feedback'

export { confirm, alert } from './feedback'
export { toastSuccess, toastError, toastInfo } from './feedback'

// Layout
export { PageContainer } from './layout'
export { Section } from './layout'
export { Stack, HStack, VStack } from './layout'

// Composables
export { useScreen } from './composables'
export { useDarkMode } from './composables'
```

#### UI Component Structure

```
shared/ui/primitives/Button/
├── Button.vue                 # Component
├── Button.types.ts            # Types
├── Button.test.ts             # Tests (optional)
└── index.ts                   # Export
```

#### `shared/ui/primitives/Button/Button.types.ts`
```typescript
// Component types — OUR types, not Quasar

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  icon?: string
  iconRight?: string
}
```

#### `shared/ui/primitives/Button/Button.vue`
```vue
<!--
  Purpose: Universal button
  Encapsulates: QBtn
-->

<script setup lang="ts">
import { computed } from 'vue'
import { QBtn } from 'quasar'
import type { ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false
})

// Mapping our props to Quasar props
const qBtnProps = computed(() => ({
  color: variantToColor(props.variant),
  size: sizeToQSize(props.size),
  loading: props.loading,
  disable: props.disabled,
  icon: props.icon,
  iconRight: props.iconRight,
  unelevated: props.variant !== 'primary',
  outline: props.variant === 'ghost'
}))

function variantToColor(variant: ButtonProps['variant']): string {
  const map: Record<string, string> = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'primary',
    danger: 'negative'
  }
  return map[variant ?? 'primary']
}

function sizeToQSize(size: ButtonProps['size']): string {
  const map: Record<string, string> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  }
  return map[size ?? 'md']
}
</script>

<template>
  <QBtn v-bind="qBtnProps">
    <slot />
  </QBtn>
</template>
```

#### `shared/ui/data/DataTable/DataTable.types.ts`
```typescript
// DataTable types — OUR contracts

export interface DataTableColumn<T = unknown> {
  key: keyof T | string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  format?: (value: unknown, row: T) => string
}

export interface DataTableProps<T = unknown> {
  rows: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  rowKey?: keyof T | string
  selection?: 'none' | 'single' | 'multiple'
  selected?: T[]
}

export interface DataTableEmits<T = unknown> {
  (e: 'sort', column: string, order: 'asc' | 'desc'): void
  (e: 'row-click', row: T): void
  (e: 'update:selected', rows: T[]): void
}
```

#### `shared/ui/feedback/Toast/toast.ts`
```typescript
// Toast service — adapter over Quasar Notify

import { Notify } from 'quasar'

interface ToastOptions {
  message: string
  timeout?: number
}

export function toastSuccess(message: string, options?: Omit<ToastOptions, 'message'>) {
  Notify.create({
    type: 'positive',
    message,
    timeout: options?.timeout ?? 3000,
    position: 'top-right'
  })
}

export function toastError(message: string, options?: Omit<ToastOptions, 'message'>) {
  Notify.create({
    type: 'negative',
    message,
    timeout: options?.timeout ?? 5000,
    position: 'top-right'
  })
}

export function toastInfo(message: string, options?: Omit<ToastOptions, 'message'>) {
  Notify.create({
    type: 'info',
    message,
    timeout: options?.timeout ?? 3000,
    position: 'top-right'
  })
}
```

#### `shared/ui/feedback/Confirm/confirm.ts`
```typescript
// Confirm dialog — adapter over Quasar Dialog

import { Dialog } from 'quasar'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

export function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    Dialog.create({
      title: options.title,
      message: options.message,
      ok: {
        label: options.confirmText ?? 'Confirm',
        color: options.danger ? 'negative' : 'primary',
        unelevated: true
      },
      cancel: {
        label: options.cancelText ?? 'Cancel',
        flat: true
      },
      persistent: true
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
  })
}
```

#### `shared/ui/composables/useScreen.ts`
```typescript
// Screen composable — adapter over Quasar Screen

import { computed } from 'vue'
import { useQuasar } from 'quasar'

export function useScreen() {
  const $q = useQuasar()
  
  return {
    isMobile: computed(() => $q.screen.lt.md),
    isTablet: computed(() => $q.screen.md),
    isDesktop: computed(() => $q.screen.gt.md),
    width: computed(() => $q.screen.width),
    height: computed(() => $q.screen.height)
  }
}
```

#### `shared/ui/composables/useDarkMode.ts`
```typescript
// Dark mode composable — adapter over Quasar Dark

import { computed } from 'vue'
import { useQuasar } from 'quasar'

export function useDarkMode() {
  const $q = useQuasar()
  
  return {
    isDark: computed(() => $q.dark.isActive),
    toggle: () => $q.dark.toggle(),
    set: (value: boolean) => $q.dark.set(value)
  }
}
```

### 8.4 shared/api — Specification

#### `shared/api/client.ts`
```typescript
// API client instance

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { setupInterceptors } from './interceptors'
import { env } from '@/shared/config'

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  setupInterceptors(client)
  
  return client
}

export const apiClient = createApiClient()
```

#### `shared/api/interceptors.ts`
```typescript
// API interceptors

import type { AxiosInstance, AxiosError } from 'axios'
import { useSessionStore } from '@/entities/session'

export function setupInterceptors(client: AxiosInstance) {
  // Request interceptor — add auth token
  client.interceptors.request.use((config) => {
    const session = useSessionStore()
    if (session.token) {
      config.headers.Authorization = `Bearer ${session.token}`
    }
    return config
  })
  
  // Response interceptor — handle errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        const session = useSessionStore()
        session.logout()
      }
      return Promise.reject(error)
    }
  )
}
```

### 8.5 shared/lib — Specification

#### `shared/lib/date/format.ts`
```typescript
// Date formatting utilities

import { format as dateFnsFormat, parseISO } from 'date-fns'

export function formatDate(date: Date | string, pattern = 'PP'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return dateFnsFormat(d, pattern)
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'PPp')
}

export function formatRelative(date: Date | string): string {
  // Implementation
}
```

### 8.6 Shared Rules

| Allowed | Forbidden |
|---------|-----------|
| ✅ External libraries | ❌ Import entities |
| ✅ Quasar (only in ui/quasar) | ❌ Import features |
| ✅ Utilities | ❌ Import widgets |
| ✅ Types and interfaces | ❌ Import pages |
| ✅ Configuration | ❌ Business logic |

---

## 9. Naming Conventions

### 9.1 Files and Folders

| Type | Convention | Example |
|------|------------|---------|
| Folders | kebab-case | `user-table/`, `create-user/` |
| Vue components | PascalCase | `UserTable.vue`, `CreateUserDialog.vue` |
| TypeScript files | camelCase | `useCreateUser.ts`, `userApi.ts` |
| Type files | camelCase + `.types.ts` | `Button.types.ts` |
| Index files | `index.ts` | `index.ts` |

### 9.2 Exports

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `export { UserTable }` |
| Composables | use + PascalCase | `export { useCreateUser }` |
| Stores | use + Entity + Store | `export { useUserStore }` |
| Utils | camelCase | `export { formatDate }` |
| Types | PascalCase | `export type { User }` |

### 9.3 Slice Naming

#### Features (actions = verbs)
```
features/
├── user/
│   ├── create-user/       ✅ verb + noun
│   ├── edit-user/         ✅
│   ├── delete-user/       ✅
│   ├── filter-users/      ✅
│   └── export-users/      ✅
```

❌ Wrong:
```
features/
├── user/
│   ├── user-form/         ❌ not an action
│   ├── user-modal/        ❌ not an action
│   └── users/             ❌ not an action
```

#### Entities (entities = nouns)
```
entities/
├── user/                  ✅ noun
├── project/               ✅
├── analytics/             ✅
└── session/               ✅
```

#### Widgets (blocks = nouns)
```
widgets/
├── users-table/           ✅ what it is
├── sidebar/               ✅
├── analytics-overview/    ✅
└── header/                ✅
```

---

## 10. Import Rules

### 10.1 Import Hierarchy (Strict)

```typescript
// 1. External libraries
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// 2. Shared (via @/ alias)
import { Button, DataTable } from '@/shared/ui'
import { apiClient } from '@/shared/api'
import { formatDate } from '@/shared/lib'

// 3. Entities
import { useUserStore, type User } from '@/entities/user'

// 4. Features (only if this is widget/page)
import { CreateUserFeature } from '@/features/user/create'

// 5. Local imports
import { useLocalComposable } from '../model'
import type { LocalType } from '../types'
```

### 10.2 Allowed Imports Matrix

| From / To | app | pages | widgets | features | entities | shared |
|-----------|-----|-------|---------|----------|----------|--------|
| app | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| pages | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| widgets | ❌ | ❌ | ❌* | ✅ | ✅ | ✅ |
| features | ❌ | ❌ | ❌ | ❌* | ✅ | ✅ |
| entities | ❌ | ❌ | ❌ | ❌ | ❌* | ✅ |
| shared | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

*❌ = Horizontal imports between slices of the same layer are forbidden

### 10.3 Path Aliases

```typescript
// tsconfig.json / vite.config.ts
{
  "paths": {
    "@/*": ["./src/*"],
    "@app/*": ["./src/app/*"],
    "@pages/*": ["./src/pages/*"],
    "@widgets/*": ["./src/widgets/*"],
    "@features/*": ["./src/features/*"],
    "@entities/*": ["./src/entities/*"],
    "@shared/*": ["./src/shared/*"]
  }
}
```

### 10.4 Public API Rule

**Import ONLY through slice index.ts**

```typescript
// ✅ Correct
import { UserAvatar } from '@/entities/user'
import { CreateUserFeature } from '@/features/user/create'

// ❌ Wrong
import UserAvatar from '@/entities/user/ui/UserAvatar.vue'
import CreateUserDialog from '@/features/user/create/ui/CreateUserDialog.vue'
```

---

## 11. Working with Quasar

### 11.1 Main Rule

```
╔════════════════════════════════════════════════════════════╗
║  Quasar is imported ONLY in shared/ui/quasar/              ║
║  Everywhere else — FORBIDDEN                               ║
╚════════════════════════════════════════════════════════════╝
```

### 11.2 Allowed Places for Quasar

| Location | What's Allowed |
|----------|----------------|
| `shared/ui/quasar/*` | All Quasar components |
| `shared/ui/composables/*` | useQuasar() |
| `app/layouts/*` | q-layout, q-page-container |
| `app/styles/quasar/*` | Quasar SCSS variables |

### 11.3 Forbidden Places for Quasar

| Location | Status |
|----------|--------|
| `pages/*` | ❌ FORBIDDEN |
| `widgets/*` | ❌ FORBIDDEN |
| `features/*` | ❌ FORBIDDEN |
| `entities/*` | ❌ FORBIDDEN |
| `shared/lib/*` | ❌ FORBIDDEN |
| `shared/api/*` | ❌ FORBIDDEN |

### 11.4 Quasar Plugins and Composables

```typescript
// ❌ FORBIDDEN everywhere except shared/ui
import { useQuasar } from 'quasar'
const $q = useQuasar()
$q.notify(...)
$q.dialog(...)

// ✅ CORRECT — use adapters
import { toastSuccess, confirm } from '@/shared/ui'
toastSuccess('Done!')
const ok = await confirm({ title: 'Sure?', message: '...' })
```

### 11.5 Quasar CSS Classes

```vue
<!-- ❌ FORBIDDEN in features/entities -->
<div class="q-pa-md q-gutter-sm">

<!-- ✅ CORRECT — use your own classes or layout components -->
<Stack gap="md" padding="md">
```

### 11.6 Quasar SCSS Variables

```scss
// ❌ FORBIDDEN directly in components
.my-component {
  color: $primary;
}

// ✅ CORRECT — via CSS custom properties
.my-component {
  color: var(--color-primary);
}
```

---

## 12. AI-Friendly Rules

### 12.1 MUST Rules (Required)

```yaml
MUST-001:
  rule: "Every new file must be in the correct layer"
  check: "Determine layer BEFORE creating file"

MUST-002:
  rule: "Feature = action (verb)"
  examples:
    good: ["create-user", "delete-project", "filter-orders"]
    bad: ["user-form", "project-modal", "order-list"]

MUST-003:
  rule: "UI separate from logic"
  structure:
    ui/: "Vue components"
    model/: "Composables, logic"

MUST-004:
  rule: "Pages contain no business logic"
  allowed: ["widget composition", "route params"]
  forbidden: ["API calls", "complex computed", "watchers"]

MUST-005:
  rule: "Entities own data"
  contains: ["types", "api", "store"]
  forbidden: ["forms", "dialogs", "use cases"]

MUST-006:
  rule: "Quasar only in shared/ui/quasar"
  check: "grep -r 'from.*quasar' should only find shared/ui"

MUST-007:
  rule: "Public interfaces through index.ts"
  pattern: "export { Component } from './ui/Component.vue'"

MUST-008:
  rule: "One responsibility per file"
  check: "One composable/component = one file"
```

### 12.2 MUST NOT Rules (Forbidden)

```yaml
MUST-NOT-001:
  rule: "Cross-imports forbidden"
  forbidden:
    - "features -> features"
    - "entities -> features"
    - "widgets -> widgets"

MUST-NOT-002:
  rule: "Logic in UI forbidden"
  forbidden:
    - "API calls in <script setup>"
    - "Complex calculations in components"

MUST-NOT-003:
  rule: "Direct API access from pages/widgets"
  use_instead: "entities or features"

MUST-NOT-004:
  rule: "Universal components without reason"
  check: "If used once — not shared"

MUST-NOT-005:
  rule: "Smart layouts forbidden"
  forbidden: ["API calls", "business logic in layouts"]
  allowed: ["responsive", "themes", "navigation"]

MUST-NOT-006:
  rule: "Data mutation outside model"
  pattern: "UI calls action -> Model changes state"
```

### 12.3 AI Prompts for Layrix

#### Creating a New Feature
```
Create feature "[action]-[entity]" in Layrix project.

Structure:
features/[entity]/[action]-[entity]/
├── ui/
│   └── [Action][Entity]Dialog.vue
├── model/
│   └── use[Action][Entity].ts
├── types.ts (if specific types needed)
└── index.ts

Rules:
1. Imports only from entities/ and shared/
2. UI component uses components from @/shared/ui
3. Logic in model/, UI in ui/
4. Export through index.ts
```

#### Creating a New Widget
```
Create widget "[name]" in Layrix project.

Structure:
widgets/[name]/
├── ui/
│   └── [Name].vue
├── model/
│   └── use[Name].ts
└── index.ts

Rules:
1. Can import features and entities
2. Uses components from @/shared/ui
3. Coordinates features but doesn't duplicate their logic
```

#### Adding a Quasar Component
```
Wrap Quasar component Q[Name] for Layrix.

Create in shared/ui/:
1. [name]/[Name].vue — wrapper component
2. [name]/[Name].types.ts — OUR types (not Quasar)
3. Export from shared/ui/index.ts

Rules:
1. Props must be ours, not QProps
2. Map our props to Quasar inside component
3. No business logic
```

---

## 13. Review Checklist

### 13.1 For Every PR

```
□ File in correct layer
□ Naming follows conventions
□ Imports follow hierarchy
□ No direct Quasar imports (except shared/ui)
□ Export through index.ts
□ UI separated from logic
□ No horizontal imports
```

### 13.2 For Features

```
□ Name = verb + noun
□ Has ui/ and model/
□ Doesn't import other features
□ Uses entity store/api
□ UI components from shared/ui
```

### 13.3 For Entities

```
□ Name = noun
□ Has model/types.ts
□ Has api/ (if needed)
□ Store in model/store.ts
□ No complex UI (forms, dialogs)
□ Doesn't import features
```

### 13.4 For Widgets

```
□ Composition of features/entities
□ Doesn't import other widgets
□ Doesn't duplicate feature logic
□ UI components from shared/ui
```

### 13.5 For Pages

```
□ Maximally "dumb" component
□ Only widget/feature composition
□ No API calls
□ No complex logic
□ Route params via useRoute()
```

---

## Appendix A: Full Project Structure

```
src/
├── app/
│   ├── providers/
│   │   ├── router/
│   │   │   ├── index.ts
│   │   │   ├── routes.ts
│   │   │   └── guards.ts
│   │   ├── store/
│   │   │   └── index.ts
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   └── index.ts
│   ├── layouts/
│   │   ├── AdminLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── index.ts
│   ├── styles/
│   │   ├── tokens/
│   │   ├── quasar/
│   │   ├── base/
│   │   └── main.scss
│   └── index.ts
│
├── pages/
│   ├── dashboard/
│   │   └── index.vue
│   ├── users/
│   │   ├── index.vue
│   │   ├── [id]/
│   │   │   └── index.vue
│   │   └── create/
│   │       └── index.vue
│   ├── settings/
│   │   └── index.vue
│   └── auth/
│       ├── login/
│       │   └── index.vue
│       └── register/
│           └── index.vue
│
├── widgets/
│   ├── sidebar/
│   │   ├── ui/
│   │   ├── model/
│   │   ├── config/
│   │   └── index.ts
│   ├── header/
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   ├── users-table/
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   └── analytics-overview/
│       ├── ui/
│       ├── model/
│       └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── logout/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── create/
│   │   ├── edit/
│   │   ├── delete/
│   │   ├── filter/
│   │   └── index.ts
│   └── notifications/
│       ├── mark-as-read/
│       └── index.ts
│
├── entities/
│   ├── user/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   ├── store.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── userApi.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   ├── UserAvatar.vue
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── project/
│   │   └── ...
│   ├── analytics/
│   │   └── ...
│   └── session/
│       └── ...
│
├── shared/
│   ├── api/
│   │   ├── client.ts
│   │   ├── interceptors.ts
│   │   └── index.ts
│   ├── config/
│   │   ├── env.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── date/
│   │   ├── validation/
│   │   ├── storage/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   └── ui/
│       ├── primitives/
│       │   ├── Button/
│       │   ├── Input/
│       │   ├── Select/
│       │   └── index.ts
│       ├── data/
│       │   ├── DataTable/
│       │   ├── Pagination/
│       │   └── index.ts
│       ├── feedback/
│       │   ├── Dialog/
│       │   ├── Toast/
│       │   ├── Confirm/
│       │   └── index.ts
│       ├── layout/
│       │   ├── PageContainer/
│       │   ├── Section/
│       │   ├── Stack/
│       │   └── index.ts
│       ├── quasar/
│       │   └── ...
│       ├── composables/
│       │   ├── useScreen.ts
│       │   ├── useDarkMode.ts
│       │   └── index.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts
│
└── main.ts
```

---

## Appendix B: ESLint Rules

```javascript
// .eslintrc.js (recommended rules for Layrix)

module.exports = {
  rules: {
    // Forbid imports up the hierarchy
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // entities cannot import features
          {
            group: ['@/features/*', '@features/*'],
            importNames: ['*'],
            message: 'Entities cannot import from features'
          },
          // features cannot import widgets
          {
            group: ['@/widgets/*', '@widgets/*'],
            importNames: ['*'],
            message: 'Features cannot import from widgets'
          },
          // Quasar only in shared/ui
          {
            group: ['quasar'],
            importNames: ['*'],
            message: 'Import Quasar only in shared/ui/quasar'
          }
        ]
      }
    ]
  }
}
```

---

*Document Version: 1.0*  
*Product: Layrix*  
*Last Updated: December 2024*
