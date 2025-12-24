# Entities Layer

**Purpose:** Business entities and domain models

## What Goes Here

- Domain types and interfaces
- Pinia stores for entity state
- API methods (CRUD operations)
- Small UI fragments (avatars, badges, status indicators)

## What Doesn't Go Here

- Forms and dialogs (use features)
- User action logic (use features)
- Importing other entities horizontally
- Complex UI components (use widgets)

## Import Rules

Can import from: **shared only**

Cannot import from: features, widgets, pages, app layer, other entities

## Naming Convention

**Always:** noun format (entity name)

Examples:
- `user`
- `project`
- `analytics`
- `order`

## Example Structure

```
entities/
├── user/
│   ├── model/
│   │   ├── types.ts           # Domain types (User interface)
│   │   ├── userStore.ts       # Pinia store
│   │   └── index.ts
│   ├── api/
│   │   ├── userApi.ts         # API calls
│   │   ├── types.ts           # DTOs
│   │   └── index.ts
│   ├── ui/
│   │   ├── UserAvatar.vue     # Small UI fragment
│   │   └── index.ts
│   └── index.ts               # Public API
└── index.ts
```

## Example Entity

```typescript
// entities/user/model/types.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}
```

```typescript
// entities/user/api/userApi.ts
import { apiClient } from '@/shared/api'
import type { CreateUserDto, UpdateUserDto } from './types'
import type { User } from '../model/types'

export const userApi = {
  async getAll(): Promise<User[]> {
    const { data } = await apiClient.get('/users')
    return data
  },

  async getById(id: string): Promise<User> {
    const { data } = await apiClient.get(`/users/${id}`)
    return data
  },

  async create(dto: CreateUserDto): Promise<User> {
    const { data } = await apiClient.post('/users', dto)
    return data
  },

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const { data } = await apiClient.patch(`/users/${id}`, dto)
    return data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }
}
```

```typescript
// entities/user/model/userStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '../api/userApi'
import type { User } from './types'
import type { CreateUserDto, UpdateUserDto } from '../api/types'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  async function fetchUsers() {
    loading.value = true
    try {
      users.value = await userApi.getAll()
    } finally {
      loading.value = false
    }
  }

  async function createUser(dto: CreateUserDto) {
    const user = await userApi.create(dto)
    users.value.push(user)
    return user
  }

  async function updateUser(id: string, dto: UpdateUserDto) {
    const user = await userApi.update(id, dto)
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = user
    }
    return user
  }

  async function deleteUser(id: string) {
    await userApi.delete(id)
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})
```
