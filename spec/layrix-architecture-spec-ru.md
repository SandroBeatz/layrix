# Layrix Architecture Specification
## Строгая спецификация структуры проекта

**Version:** 1.0  
**Product:** Layrix — AI-ready Dashboard Architecture  
**Date:** December 2024

---

## Содержание

1. [Философия архитектуры](#1-философия-архитектуры)
2. [Корневая структура проекта](#2-корневая-структура-проекта)
3. [Слой app/](#3-слой-app)
4. [Слой pages/](#4-слой-pages)
5. [Слой widgets/](#5-слой-widgets)
6. [Слой features/](#6-слой-features)
7. [Слой entities/](#7-слой-entities)
8. [Слой shared/](#8-слой-shared)
9. [Правила именования](#9-правила-именования)
10. [Правила импортов](#10-правила-импортов)
11. [Работа с Quasar](#11-работа-с-quasar)
12. [AI-friendly правила](#12-ai-friendly-правила)
13. [Чеклист ревью](#13-чеклист-ревью)

---

## 1. Философия архитектуры

### 1.1 Основные принципы

```
┌─────────────────────────────────────────────────────────┐
│                    LAYRIX PRINCIPLES                     │
├─────────────────────────────────────────────────────────┤
│  1. Предсказуемость > Гибкость                          │
│  2. Один правильный путь                                │
│  3. Quasar = implementation detail                      │
│  4. Границы слоёв = закон                               │
│  5. AI должен понимать структуру                        │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Иерархия слоёв (строгая)

```
┌─────────────────────────────────────────────────────────┐
│                         app                              │
│  (инициализация, providers, layouts)                    │
├─────────────────────────────────────────────────────────┤
│                        pages                             │
│  (маршруты, композиция виджетов)                        │
├─────────────────────────────────────────────────────────┤
│                       widgets                            │
│  (крупные UI-блоки, композиция фич)                     │
├─────────────────────────────────────────────────────────┤
│                       features                           │
│  (действия пользователя, use cases)                     │
├─────────────────────────────────────────────────────────┤
│                       entities                           │
│  (бизнес-сущности, данные, API)                         │
├─────────────────────────────────────────────────────────┤
│                        shared                            │
│  (UI kit, утилиты, конфиги)                             │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Правило зависимостей

```
app      → может импортировать: ВСЁ
pages    → может импортировать: widgets, features, entities, shared
widgets  → может импортировать: features, entities, shared
features → может импортировать: entities, shared
entities → может импортировать: shared
shared   → может импортировать: ТОЛЬКО внешние библиотеки
```

**❌ ЗАПРЕЩЕНО:**
- Импорт вверх по иерархии
- Горизонтальный импорт между слайсами одного слоя
- Прямой импорт Quasar вне `shared/ui/quasar`

---

## 2. Корневая структура проекта

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/          # Провайдеры (router, store, i18n)
│   ├── layouts/            # Layout-компоненты
│   ├── styles/             # Глобальные стили и токены
│   └── index.ts            # Entry point
│
├── pages/                  # Страницы (routes)
│   ├── dashboard/
│   ├── users/
│   └── settings/
│
├── widgets/                # Крупные UI-блоки
│   ├── sidebar/
│   ├── header/
│   └── analytics-overview/
│
├── features/               # Действия пользователя
│   ├── auth/
│   ├── user/
│   └── notifications/
│
├── entities/               # Бизнес-сущности
│   ├── user/
│   ├── project/
│   └── analytics/
│
├── shared/                 # Переиспользуемая инфраструктура
│   ├── api/
│   ├── config/
│   ├── lib/
│   ├── types/
│   └── ui/
│
└── main.ts                 # Quasar boot
```

---

## 3. Слой app/

### 3.1 Назначение

Инициализация приложения, глобальные провайдеры, layouts.

**✅ Можно:**
- Quasar boot files
- Глобальные провайдеры
- Layout-компоненты
- Глобальные стили

**❌ Нельзя:**
- Бизнес-логика
- API вызовы
- Компоненты фич

### 3.2 Структура

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
│   ├── AdminLayout.vue        # Основной layout дашборда
│   ├── AuthLayout.vue         # Layout для auth страниц
│   ├── BlankLayout.vue        # Пустой layout
│   └── index.ts
│
├── styles/
│   ├── tokens/
│   │   ├── _colors.scss       # Цветовые токены
│   │   ├── _spacing.scss      # Отступы
│   │   ├── _typography.scss   # Типографика
│   │   └── _index.scss        # Все токены
│   │
│   ├── quasar/
│   │   └── variables.scss     # Quasar SCSS variables
│   │
│   ├── base/
│   │   ├── _reset.scss        # CSS reset
│   │   └── _global.scss       # Глобальные стили
│   │
│   └── main.scss              # Entry point для стилей
│
└── index.ts                   # App initialization
```

### 3.3 Файловые спецификации

#### `app/index.ts`
```typescript
// Назначение: Entry point приложения
// Экспортирует: функцию инициализации

export { initApp } from './providers'
export { AdminLayout, AuthLayout, BlankLayout } from './layouts'
```

#### `app/providers/router/routes.ts`
```typescript
// Назначение: Определение маршрутов
// Правило: Только импорт layouts, pages подключаются lazy

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
<!-- Назначение: Основной layout дашборда -->
<!-- Правило: Только композиция widgets, никакой логики -->

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

### 3.4 Правила для layouts

| Правило | Описание |
|---------|----------|
| ✅ Использовать widgets | Sidebar, Header — это widgets |
| ✅ Использовать q-layout | Quasar layout system разрешён |
| ❌ Бизнес-логика | Никаких computed, watchers с логикой |
| ❌ API вызовы | Никаких fetch, axios |
| ❌ Прямой store access | Только через widgets/features |

---

## 4. Слой pages/

### 4.1 Назначение

Страницы приложения. Композиция widgets и features.

**Главное правило: Page = максимально "тупой" компонент**

### 4.2 Структура

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

### 4.3 Файловые спецификации

#### Структура page-компонента

```
pages/users/
├── index.vue                  # Page component (обязательно)
├── model/                     # Page-specific logic (опционально)
│   └── useUsersPage.ts
└── ui/                        # Page-specific components (опционально)
    └── UsersPageHeader.vue
```

#### `pages/users/index.vue`
```vue
<!-- 
  Назначение: Страница списка пользователей
  Правила:
  - Только композиция widgets/features
  - Минимум логики
  - Никаких API вызовов
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

### 4.4 Правила для pages

| Разрешено | Запрещено |
|-----------|-----------|
| ✅ Импорт widgets | ❌ API вызовы |
| ✅ Импорт features | ❌ Бизнес-логика |
| ✅ Импорт shared/ui | ❌ Прямой доступ к store |
| ✅ Route params | ❌ Сложные computed |
| ✅ Простые refs | ❌ Watchers с side effects |

### 4.5 Когда можно добавить model/ в page

**Только если:**
- Нужна координация между несколькими widgets
- Page-specific state (например, активный таб)
- Передача данных между siblings

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

## 5. Слой widgets/

### 5.1 Назначение

Крупные, самодостаточные UI-блоки. Композиция features и entities.

**Widget = "умный" блок интерфейса**

### 5.2 Структура

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
    ├── ui/                    # Vue компоненты (обязательно)
    ├── model/                 # Логика (опционально)
    ├── config/                # Конфигурация (опционально)
    ├── lib/                   # Утилиты widget (опционально)
    └── index.ts               # Public API (обязательно)
```

### 5.3 Файловые спецификации

#### `widgets/users-table/index.ts`
```typescript
// Public API виджета
// Правило: Экспортировать только то, что нужно снаружи

export { default as UsersTableWidget } from './ui/UsersTable.vue'
export type { UsersTableProps } from './ui/UsersTable.vue'
```

#### `widgets/users-table/ui/UsersTable.vue`
```vue
<!--
  Назначение: Таблица пользователей
  Ответственность:
  - Отображение данных
  - Координация features (edit, delete, filter)
  - Пагинация, сортировка
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
// Назначение: Логика таблицы пользователей
// Ответственность: columns config, sorting state

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

### 5.4 Правила для widgets

| Разрешено | Запрещено |
|-----------|-----------|
| ✅ Импорт features | ❌ Импорт других widgets |
| ✅ Импорт entities | ❌ Импорт pages |
| ✅ Импорт shared | ❌ Глобальные side effects |
| ✅ Координация фич | ❌ Дублирование entity логики |
| ✅ Widget-specific state | ❌ Бизнес-правила |

### 5.5 Widget vs Feature — как различать

| Widget | Feature |
|--------|---------|
| Что отображается | Что пользователь делает |
| Таблица, сайдбар, график | Создать, удалить, фильтровать |
| Композиция features | Одно конкретное действие |
| Может быть на нескольких страницах | Переиспользуется в widgets |

---

## 6. Слой features/

### 6.1 Назначение

Действия пользователя. Use cases. Бизнес-сценарии.

**Feature = глагол (создать, удалить, фильтровать, экспортировать)**

### 6.2 Структура

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

### 6.3 Файловые спецификации

#### Структура feature-слайса

```
features/user/create/
├── ui/
│   ├── CreateUserDialog.vue   # Основной компонент
│   ├── CreateUserForm.vue     # Форма (если сложная)
│   └── index.ts               # UI exports
│
├── model/
│   ├── useCreateUser.ts       # Основная логика
│   ├── validation.ts          # Валидация (если нужна)
│   └── index.ts               # Model exports
│
├── api/                       # Только если API специфичен для feature
│   └── createUserApi.ts
│
├── lib/                       # Утилиты feature (редко)
│   └── formatUserData.ts
│
├── types.ts                   # Типы feature (опционально)
│
└── index.ts                   # Public API
```

#### `features/user/create/index.ts`
```typescript
// Public API feature
// Правило: Минимальный экспорт

export { default as CreateUserFeature } from './ui/CreateUserDialog.vue'
export { useCreateUser } from './model'
export type { CreateUserFormData } from './types'
```

#### `features/user/create/ui/CreateUserDialog.vue`
```vue
<!--
  Назначение: Диалог создания пользователя
  Ответственность:
  - UI формы
  - Вызов useCreateUser
  - Отображение состояния
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
// Назначение: Логика создания пользователя
// Ответственность:
// - Валидация
// - API вызов
// - Обновление store

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
// Типы, специфичные для feature

export interface CreateUserFormData {
  name: string
  email: string
  role: 'user' | 'admin' | 'manager'
}
```

### 6.4 Правила для features

| Разрешено | Запрещено |
|-----------|-----------|
| ✅ Импорт entities | ❌ Импорт других features |
| ✅ Импорт shared | ❌ Импорт widgets |
| ✅ Вызов entity API/store | ❌ Импорт pages |
| ✅ Локальный state | ❌ Глобальный state вне store |
| ✅ UI для действия | ❌ Отображение списков |

### 6.5 Когда создавать отдельную feature

**✅ Создавать feature если:**
- Есть конкретное действие пользователя
- Нужна форма/диалог
- Есть API вызов
- Логика переиспользуется

**❌ НЕ создавать feature если:**
- Просто отображение данных (это entity/widget)
- Нет действия пользователя
- Одноразовая логика в widget

---

## 7. Слой entities/

### 7.1 Назначение

Бизнес-сущности. Данные, типы, API, store.

**Entity = существительное (user, project, order)**

### 7.2 Структура

```
entities/
├── user/
│   ├── model/
│   │   ├── types.ts           # Типы сущности
│   │   ├── store.ts           # Pinia store
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── userApi.ts         # API методы
│   │   ├── types.ts           # API типы (DTO)
│   │   └── index.ts
│   │
│   ├── ui/                    # Маленькие UI-фрагменты
│   │   ├── UserAvatar.vue
│   │   ├── UserBadge.vue
│   │   └── index.ts
│   │
│   ├── lib/                   # Утилиты для entity
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
└── session/                   # Специальная entity для auth
    ├── model/
    ├── api/
    └── index.ts
```

### 7.3 Файловые спецификации

#### `entities/user/index.ts`
```typescript
// Public API entity
// Правило: Экспортировать всё нужное для features и widgets

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
// Типы бизнес-сущности

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
// Pinia store для entity

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

// Composable для удобства
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
// API методы для entity

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
// DTO типы для API

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
  Назначение: Аватар пользователя
  Правило: Только отображение, никакой логики
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

### 7.4 Правила для entities

| Разрешено | Запрещено |
|-----------|-----------|
| ✅ Импорт shared | ❌ Импорт features |
| ✅ Типы и интерфейсы | ❌ Импорт widgets |
| ✅ API методы | ❌ Импорт pages |
| ✅ Pinia store | ❌ Импорт других entities |
| ✅ Маленькие UI-фрагменты | ❌ Сложные формы/диалоги |
| ✅ Утилиты для entity | ❌ Use case логика |

### 7.5 Entity vs Feature — как различать

| Entity | Feature |
|--------|---------|
| Что это (данные) | Что делать (действие) |
| User, Project, Order | CreateUser, DeleteProject |
| CRUD API | Use case логика |
| Store state | UI для действия |
| Типы и модели | Валидация формы |

---

## 8. Слой shared/

### 8.1 Назначение

Переиспользуемая инфраструктура. UI kit, утилиты, конфиги.

**Shared = фундамент, на котором стоит всё остальное**

### 8.2 Структура

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
│   ├── common.ts              # Общие типы
│   ├── api.ts                 # API типы
│   └── index.ts
│
└── ui/
    ├── primitives/            # Базовые компоненты
    │   ├── Button/
    │   ├── Input/
    │   ├── Select/
    │   └── index.ts
    │
    ├── data/                  # Data-компоненты
    │   ├── DataTable/
    │   ├── Pagination/
    │   └── index.ts
    │
    ├── feedback/              # Feedback-компоненты
    │   ├── Dialog/
    │   ├── Toast/
    │   ├── Confirm/
    │   └── index.ts
    │
    ├── layout/                # Layout-компоненты
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

### 8.3 shared/ui — Подробная спецификация

#### `shared/ui/index.ts`
```typescript
// Public API shared/ui
// ❗ ВАЖНО: Это единственная точка импорта UI компонентов

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

#### Структура UI компонента

```
shared/ui/primitives/Button/
├── Button.vue                 # Компонент
├── Button.types.ts            # Типы
├── Button.test.ts             # Тесты (опционально)
└── index.ts                   # Export
```

#### `shared/ui/primitives/Button/Button.types.ts`
```typescript
// Типы компонента — НАШИ, не Quasar

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
  Назначение: Универсальная кнопка
  Инкапсулирует: QBtn
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

// Маппинг наших props на Quasar props
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
// Типы DataTable — НАШИ контракты

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
// Toast service — адаптер над Quasar Notify

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
// Confirm dialog — адаптер над Quasar Dialog

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
// Screen composable — адаптер над Quasar Screen

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
// Dark mode composable — адаптер над Quasar Dark

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

### 8.4 shared/api — Спецификация

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

### 8.5 shared/lib — Спецификация

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

### 8.6 Правила для shared

| Разрешено | Запрещено |
|-----------|-----------|
| ✅ Внешние библиотеки | ❌ Импорт entities |
| ✅ Quasar (только в ui/quasar) | ❌ Импорт features |
| ✅ Утилиты | ❌ Импорт widgets |
| ✅ Типы и интерфейсы | ❌ Импорт pages |
| ✅ Конфигурация | ❌ Бизнес-логика |

---

## 9. Правила именования

### 9.1 Файлы и папки

| Тип | Конвенция | Пример |
|-----|-----------|--------|
| Папки | kebab-case | `user-table/`, `create-user/` |
| Vue компоненты | PascalCase | `UserTable.vue`, `CreateUserDialog.vue` |
| TypeScript файлы | camelCase | `useCreateUser.ts`, `userApi.ts` |
| Типы файлов | camelCase + `.types.ts` | `Button.types.ts` |
| Индексы | `index.ts` | `index.ts` |

### 9.2 Экспорты

| Тип | Конвенция | Пример |
|-----|-----------|--------|
| Компоненты | PascalCase | `export { UserTable }` |
| Composables | use + PascalCase | `export { useCreateUser }` |
| Stores | use + Entity + Store | `export { useUserStore }` |
| Utils | camelCase | `export { formatDate }` |
| Types | PascalCase | `export type { User }` |

### 9.3 Именование слайсов

#### Features (действия = глаголы)
```
features/
├── user/
│   ├── create-user/       ✅ глагол + существительное
│   ├── edit-user/         ✅
│   ├── delete-user/       ✅
│   ├── filter-users/      ✅
│   └── export-users/      ✅
```

❌ Неправильно:
```
features/
├── user/
│   ├── user-form/         ❌ не действие
│   ├── user-modal/        ❌ не действие
│   └── users/             ❌ не действие
```

#### Entities (сущности = существительные)
```
entities/
├── user/                  ✅ существительное
├── project/               ✅
├── analytics/             ✅
└── session/               ✅
```

#### Widgets (блоки = существительные)
```
widgets/
├── users-table/           ✅ что это
├── sidebar/               ✅
├── analytics-overview/    ✅
└── header/                ✅
```

---

## 10. Правила импортов

### 10.1 Иерархия импортов (строгая)

```typescript
// 1. Внешние библиотеки
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// 2. Shared (через алиас @/)
import { Button, DataTable } from '@/shared/ui'
import { apiClient } from '@/shared/api'
import { formatDate } from '@/shared/lib'

// 3. Entities
import { useUserStore, type User } from '@/entities/user'

// 4. Features (только если это widget/page)
import { CreateUserFeature } from '@/features/user/create'

// 5. Локальные импорты
import { useLocalComposable } from '../model'
import type { LocalType } from '../types'
```

### 10.2 Матрица разрешённых импортов

| Из / В | app | pages | widgets | features | entities | shared |
|--------|-----|-------|---------|----------|----------|--------|
| app | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| pages | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| widgets | ❌ | ❌ | ❌* | ✅ | ✅ | ✅ |
| features | ❌ | ❌ | ❌ | ❌* | ✅ | ✅ |
| entities | ❌ | ❌ | ❌ | ❌ | ❌* | ✅ |
| shared | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

*❌ = Горизонтальный импорт между слайсами одного слоя запрещён

### 10.3 Алиасы путей

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

### 10.4 Правило Public API

**Импортировать ТОЛЬКО через index.ts слайса**

```typescript
// ✅ Правильно
import { UserAvatar } from '@/entities/user'
import { CreateUserFeature } from '@/features/user/create'

// ❌ Неправильно
import UserAvatar from '@/entities/user/ui/UserAvatar.vue'
import CreateUserDialog from '@/features/user/create/ui/CreateUserDialog.vue'
```

---

## 11. Работа с Quasar

### 11.1 Главное правило

```
╔════════════════════════════════════════════════════════════╗
║  Quasar импортируется ТОЛЬКО в shared/ui/quasar/           ║
║  Во всех остальных местах — ЗАПРЕЩЕНО                      ║
╚════════════════════════════════════════════════════════════╝
```

### 11.2 Разрешённые места для Quasar

| Место | Что разрешено |
|-------|---------------|
| `shared/ui/quasar/*` | Все Quasar компоненты |
| `shared/ui/composables/*` | useQuasar() |
| `app/layouts/*` | q-layout, q-page-container |
| `app/styles/quasar/*` | Quasar SCSS variables |

### 11.3 Запрещённые места для Quasar

| Место | Статус |
|-------|--------|
| `pages/*` | ❌ ЗАПРЕЩЕНО |
| `widgets/*` | ❌ ЗАПРЕЩЕНО |
| `features/*` | ❌ ЗАПРЕЩЕНО |
| `entities/*` | ❌ ЗАПРЕЩЕНО |
| `shared/lib/*` | ❌ ЗАПРЕЩЕНО |
| `shared/api/*` | ❌ ЗАПРЕЩЕНО |

### 11.4 Quasar plugins и composables

```typescript
// ❌ ЗАПРЕЩЕНО везде кроме shared/ui
import { useQuasar } from 'quasar'
const $q = useQuasar()
$q.notify(...)
$q.dialog(...)

// ✅ ПРАВИЛЬНО — использовать адаптеры
import { toastSuccess, confirm } from '@/shared/ui'
toastSuccess('Done!')
const ok = await confirm({ title: 'Sure?', message: '...' })
```

### 11.5 Quasar CSS классы

```vue
<!-- ❌ ЗАПРЕЩЕНО в features/entities -->
<div class="q-pa-md q-gutter-sm">

<!-- ✅ ПРАВИЛЬНО — использовать свои классы или layout компоненты -->
<Stack gap="md" padding="md">
```

### 11.6 Quasar SCSS variables

```scss
// ❌ ЗАПРЕЩЕНО напрямую в компонентах
.my-component {
  color: $primary;
}

// ✅ ПРАВИЛЬНО — через CSS custom properties
.my-component {
  color: var(--color-primary);
}
```

---

## 12. AI-friendly правила

### 12.1 MUST правила (обязательные)

```yaml
MUST-001:
  rule: "Каждый новый файл должен быть в правильном слое"
  check: "Определить слой ДО создания файла"

MUST-002:
  rule: "Feature = действие (глагол)"
  examples:
    good: ["create-user", "delete-project", "filter-orders"]
    bad: ["user-form", "project-modal", "order-list"]

MUST-003:
  rule: "UI отдельно от логики"
  structure:
    ui/: "Vue компоненты"
    model/: "Composables, логика"

MUST-004:
  rule: "Pages не содержат бизнес-логики"
  allowed: ["композиция widgets", "route params"]
  forbidden: ["API вызовы", "сложные computed", "watchers"]

MUST-005:
  rule: "Entities владеют данными"
  contains: ["types", "api", "store"]
  forbidden: ["формы", "диалоги", "use cases"]

MUST-006:
  rule: "Quasar только в shared/ui/quasar"
  check: "grep -r 'from.*quasar' должен найти только shared/ui"

MUST-007:
  rule: "Публичные интерфейсы через index.ts"
  pattern: "export { Component } from './ui/Component.vue'"

MUST-008:
  rule: "Одна ответственность на файл"
  check: "Один composable/компонент = один файл"
```

### 12.2 MUST NOT правила (запреты)

```yaml
MUST-NOT-001:
  rule: "Сквозные импорты запрещены"
  forbidden:
    - "features -> features"
    - "entities -> features"
    - "widgets -> widgets"

MUST-NOT-002:
  rule: "Логика в UI запрещена"
  forbidden:
    - "API вызовы в <script setup>"
    - "Сложные вычисления в компонентах"

MUST-NOT-003:
  rule: "Прямой доступ к API из pages/widgets"
  use_instead: "entities или features"

MUST-NOT-004:
  rule: "Универсальные компоненты без причины"
  check: "Если используется 1 раз — не shared"

MUST-NOT-005:
  rule: "Умные layouts запрещены"
  forbidden: ["API вызовы", "бизнес-логика в layouts"]
  allowed: ["responsive", "темы", "навигация"]

MUST-NOT-006:
  rule: "Мутация данных вне model"
  pattern: "UI вызывает action -> Model меняет state"
```

### 12.3 AI Prompts для Layrix

#### Создание новой feature
```
Создай feature "[action]-[entity]" в проекте Layrix.

Структура:
features/[entity]/[action]-[entity]/
├── ui/
│   └── [Action][Entity]Dialog.vue
├── model/
│   └── use[Action][Entity].ts
├── types.ts (если нужны специфичные типы)
└── index.ts

Правила:
1. Импорты только из entities/ и shared/
2. UI компонент использует компоненты из @/shared/ui
3. Логика в model/, UI в ui/
4. Экспорт через index.ts
```

#### Создание нового widget
```
Создай widget "[name]" в проекте Layrix.

Структура:
widgets/[name]/
├── ui/
│   └── [Name].vue
├── model/
│   └── use[Name].ts
└── index.ts

Правила:
1. Может импортировать features и entities
2. Использует компоненты из @/shared/ui
3. Координирует features, но не дублирует их логику
```

#### Добавление Quasar компонента
```
Оберни Quasar компонент Q[Name] для Layrix.

Создай в shared/ui/:
1. [name]/[Name].vue — компонент-обёртка
2. [name]/[Name].types.ts — НАШИ типы (не Quasar)
3. Экспортируй из shared/ui/index.ts

Правила:
1. Props должны быть наши, не QProps
2. Маппинг наших props на Quasar внутри компонента
3. Никакой бизнес-логики
```

---

## 13. Чеклист ревью

### 13.1 Для каждого PR

```
□ Файл в правильном слое
□ Именование по конвенции
□ Импорты соответствуют иерархии
□ Нет прямых импортов Quasar (кроме shared/ui)
□ Экспорт через index.ts
□ UI отделён от логики
□ Нет горизонтальных импортов
```

### 13.2 Для features

```
□ Название = глагол + существительное
□ Есть ui/ и model/
□ Не импортирует другие features
□ Использует entity store/api
□ UI компоненты из shared/ui
```

### 13.3 Для entities

```
□ Название = существительное
□ Есть model/types.ts
□ Есть api/ (если нужен)
□ Store в model/store.ts
□ Нет сложных UI (формы, диалоги)
□ Не импортирует features
```

### 13.4 Для widgets

```
□ Композиция features/entities
□ Не импортирует другие widgets
□ Не дублирует логику features
□ UI компоненты из shared/ui
```

### 13.5 Для pages

```
□ Максимально "тупой" компонент
□ Только композиция widgets/features
□ Нет API вызовов
□ Нет сложной логики
□ Route params через useRoute()
```

---

## Appendix A: Полная структура проекта

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

## Appendix B: ESLint правила

```javascript
// .eslintrc.js (рекомендуемые правила для Layrix)

module.exports = {
  rules: {
    // Запрет импортов вверх по иерархии
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // entities не могут импортировать features
          {
            group: ['@/features/*', '@features/*'],
            importNames: ['*'],
            message: 'Entities cannot import from features'
          },
          // features не могут импортировать widgets
          {
            group: ['@/widgets/*', '@widgets/*'],
            importNames: ['*'],
            message: 'Features cannot import from widgets'
          },
          // Quasar только в shared/ui
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
