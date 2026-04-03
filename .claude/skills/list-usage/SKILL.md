---
name: list-usage
description: Complete guide for using the List and ListItem components. Covers all use cases—chat lists, settings menus, context menus, file managers, notifications, active states, dense mode, and best practices.
user-invocable: true
allowed-tools: Read, Edit, Grep, Glob
argument-hint: [use-case or feature]
---

# List & ListItem Component Usage Guide

Complete reference for using the `List` and `ListItem` components from `@shared/ui` in the Layrix application.

## Basic Import

```vue
<script setup lang="ts">
import { List, ListItem } from '@shared/ui'
</script>
```

## Anatomy

| Component | Wraps | Purpose |
|-----------|-------|---------|
| `List` | `QList` | Container that groups `ListItem`s |
| `ListItem` | `QItem` + `QItemSection` + `QItemLabel` | A single row with up to 4 zones |

### ListItem zones

```
┌─ prepend ──┬──────── main ─────────┬── side ──┬── append ─┐
│ (avatar /  │ overline              │ 12:30    │  badge /  │
│  icon)     │ label                 │ Yesterday│  button   │
│            │ caption               │          │           │
└────────────┴───────────────────────┴──────────┴───────────┘
```

---

## Simple List — Labels Only

```vue
<List bordered separator>
  <ListItem label="Dashboard" />
  <ListItem label="Profile" />
  <ListItem label="Settings" />
</List>
```

---

## Clickable List with Active State

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { List, ListItem } from '@shared/ui'

const active = ref('dashboard')

const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'profile',   label: 'Profile' },
  { id: 'settings',  label: 'Settings' },
]
</script>

<template>
  <List bordered>
    <ListItem
      v-for="item in items"
      :key="item.id"
      :label="item.label"
      :active="active === item.id"
      variant="primary"
      clickable
      @click="active = item.id"
    />
  </List>
</template>
```

---

## Context Menu Style

Matches the design reference: icon + label, last item destructive.

```vue
<script setup lang="ts">
import { List, ListItem } from '@shared/ui'
import {
  tabPencil, tabCopy, tabLink,
  tabCornerUpRight, tabTrash, tabChevronRight,
} from 'quasar-extras-svg-icons/tabler-icons-v2'

interface MenuItem {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  variant?: 'negative'
  hasSubmenu?: boolean
}

const items: MenuItem[] = [
  { label: 'Rename',    icon: tabPencil },
  { label: 'Duplicate', icon: tabCopy },
  { label: 'Copy link', icon: tabLink },
  { label: 'Move to',   icon: tabCornerUpRight, hasSubmenu: true },
  { label: 'Delete',    icon: tabTrash, variant: 'negative' },
]
</script>

<template>
  <List bordered separator>
    <ListItem
      v-for="item in items"
      :key="item.label"
      :label="item.label"
      :variant="item.variant ?? 'primary'"
      :class="item.variant === 'negative' ? 'text-negative' : ''"
      clickable
    >
      <template #prepend>
        <q-icon
          :name="item.icon"
          size="20px"
          :class="item.variant === 'negative' ? 'text-negative' : 'text-muted-foreground'"
        />
      </template>
      <template v-if="item.hasSubmenu" #append>
        <q-icon :name="tabChevronRight" size="16px" class="text-muted-foreground" />
      </template>
    </ListItem>
  </List>
</template>
```

---

## Chat / Contacts List

Matches the design reference: avatar + online status dot + message preview + unread badge.

```vue
<script setup lang="ts">
import { List, ListItem, Avatar, Badge } from '@shared/ui'
import { tabCheck } from 'quasar-extras-svg-icons/tabler-icons-v2'
import { tabPhone } from 'quasar-extras-svg-icons/tabler-icons-v2'

const contacts = [
  {
    id: 1, name: 'Beby Tsabina',
    message: 'So, You need to rewatch lessons 7',
    time: '21.48', unread: 4, status: 'online',
    src: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2, name: 'Mr. Lee',
    message: 'Thank you for ur answer',
    time: '21.15', isRead: true, status: 'online',
    src: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  // ...
]

const statusVariant = {
  online: 'positive', away: 'warning', busy: 'negative', offline: 'regular',
} as const
</script>

<template>
  <List separator>
    <ListItem
      v-for="contact in contacts"
      :key="contact.id"
      :label="contact.name"
      :side-label="contact.time"
      clickable
    >
      <!-- Left: avatar + presence dot -->
      <template #prepend>
        <div style="position: relative; display: inline-block">
          <Avatar :src="contact.src" size="md" />
          <Badge
            v-if="contact.status"
            :variant="statusVariant[contact.status]"
            dot floating
            style="bottom: 1px; right: 1px"
          />
        </div>
      </template>

      <!-- Caption: typing indicator / missed call / plain text -->
      <template #caption>
        <span v-if="contact.isTyping" class="text-primary" style="font-style: italic">
          Typing ...
        </span>
        <span v-else-if="contact.isMissedCall" class="text-negative">
          <q-icon :name="tabPhone" size="14px" /> Missed voice call
        </span>
        <span v-else>{{ contact.message }}</span>
      </template>

      <!-- Right: unread badge or read checkmark -->
      <template #append>
        <Badge v-if="contact.unread" :label="contact.unread" variant="primary" pill />
        <q-icon v-else-if="contact.isRead" :name="tabCheck" size="16px" class="text-muted-foreground" />
      </template>
    </ListItem>
  </List>
</template>
```

**Key technique:** use the `#caption` slot (not `caption` prop) when you need custom markup inside the caption row.

---

## Settings Menu

Icon tile + label/caption + right chevron.

```vue
<script setup lang="ts">
import { List, ListItem } from '@shared/ui'
import { tabUser, tabBell, tabShield, tabChevronRight } from 'quasar-extras-svg-icons/tabler-icons-v2'

const items = [
  { label: 'Profile',       caption: 'Manage your personal info',   icon: tabUser },
  { label: 'Notifications', caption: 'Configure alerts',            icon: tabBell },
  { label: 'Security',      caption: 'Password and 2FA settings',   icon: tabShield },
]
</script>

<template>
  <List separator>
    <ListItem
      v-for="item in items"
      :key="item.label"
      :label="item.label"
      :caption="item.caption"
      clickable
    >
      <template #prepend>
        <!-- Square icon tile using design system surface color -->
        <div
          class="row items-center justify-center bg-muted"
          style="width: 36px; height: 36px; border-radius: 8px"
        >
          <q-icon :name="item.icon" size="20px" class="text-primary" />
        </div>
      </template>
      <template #append>
        <q-icon :name="tabChevronRight" size="18px" class="text-muted-foreground" />
      </template>
    </ListItem>
  </List>
</template>
```

---

## Notifications List

Colored circular icon + label/caption + timestamp + unread dot.

```vue
<script setup lang="ts">
import { List, ListItem, Badge } from '@shared/ui'
import { tabCircleCheck, tabMoodSmile } from 'quasar-extras-svg-icons/tabler-icons-v2'

const notifications = [
  {
    id: 1, title: 'Pull request approved',
    caption: 'Your PR #245 has been approved',
    time: '15 min ago', read: false,
    icon: tabCircleCheck, variant: 'positive',
  },
  {
    id: 2, title: 'New comment on your post',
    caption: 'John Doe commented: "Great work!"',
    time: '2 min ago', read: false,
    icon: tabMoodSmile, variant: 'primary',
  },
]
</script>

<template>
  <List separator>
    <ListItem
      v-for="n in notifications"
      :key="n.id"
      :label="n.title"
      :caption="n.caption"
      :side-label="n.time"
      :style="!n.read ? 'background: rgba(var(--color-primary-rgb), 0.04)' : ''"
      clickable
    >
      <template #prepend>
        <div
          class="row items-center justify-center"
          :style="`
            width: 40px; height: 40px; border-radius: 50%;
            background: rgba(var(--color-${n.variant}-rgb), 0.12);
          `"
        >
          <q-icon :name="n.icon" size="20px" :class="`text-${n.variant}`" />
        </div>
      </template>
      <template #append>
        <Badge v-if="!n.read" variant="primary" dot />
      </template>
    </ListItem>
  </List>
</template>
```

---

## File Manager List

Three-line item with overline, label, side size/date, and action buttons.

```vue
<script setup lang="ts">
import { List, ListItem, Avatar, Button } from '@shared/ui'
import { tabShare, tabArchive } from 'quasar-extras-svg-icons/tabler-icons-v2'

const files = [
  { id: 1, name: 'Design System v2.fig', type: 'Figma', size: '14.2 MB', modified: 'Today',  initials: 'FG', variant: 'secondary' },
  { id: 2, name: 'API Documentation.pdf', type: 'PDF',   size: '3.8 MB',  modified: 'Yesterday', initials: 'PD', variant: 'negative' },
]
</script>

<template>
  <List separator>
    <ListItem
      v-for="file in files"
      :key="file.id"
      :overline="file.type"
      :label="file.name"
      :side-label="file.size"
      :side-caption="file.modified"
      clickable
    >
      <template #prepend>
        <Avatar :text="file.initials" :variant="file.variant" shape="rounded" />
      </template>
      <template #append>
        <div class="row q-gutter-xs">
          <Button icon-only appearance="ghost" variant="regular" size="sm">
            <q-icon :name="tabShare" size="16px" />
          </Button>
          <Button icon-only appearance="ghost" variant="regular" size="sm">
            <q-icon :name="tabArchive" size="16px" />
          </Button>
        </div>
      </template>
    </ListItem>
  </List>
</template>
```

---

## Dense Mode

Use `dense` on `List` and on each `ListItem` to reduce row height.

```vue
<List bordered separator dense>
  <ListItem dense label="Item one"   caption="Supporting text" />
  <ListItem dense label="Item two"   caption="Supporting text" />
  <ListItem dense label="Item three" caption="Supporting text" />
</List>
```

---

## Disabled Items

```vue
<List separator>
  <ListItem clickable label="Active item"   caption="This is enabled" />
  <ListItem clickable disabled label="Disabled item" caption="Not interactive" />
</List>
```

---

## Nested / Inset Items

Use `inset-level` to indent sub-items visually.

```vue
<List>
  <ListItem label="Parent item" />
  <ListItem label="Child item" :inset-level="1" />
  <ListItem label="Grandchild item" :inset-level="2" />
</List>
```

---

## Router-Link Items

Use `to` prop for Vue Router navigation (no need for `clickable`).

```vue
<List bordered>
  <ListItem label="Dashboard" :to="'/analytics'" />
  <ListItem label="Settings"  :to="{ name: 'settings' }" />
</List>
```

---

## Overline Labels (Three-Line Items)

```vue
<List bordered separator>
  <ListItem
    overline="Category · Updated Dec 14"
    label="Primary label text"
    caption="Secondary supporting text"
    side-label="Side"
  />
</List>
```

---

## List Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bordered` | `boolean` | `false` | Add border around the list |
| `separator` | `boolean` | `false` | Add divider lines between items |
| `dense` | `boolean` | `false` | Compact/reduced height mode |
| `padding` | `boolean` | `false` | Add internal top/bottom padding |
| `tag` | `string` | `'div'` | Root HTML tag |

---

## ListItem Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Main label text |
| `caption` | `string` | — | Secondary text below label |
| `overline` | `string` | — | Small uppercase text above label |
| `sideLabel` | `string` | — | Text on the right side (e.g. timestamp) |
| `sideCaption` | `string` | — | Caption below sideLabel |
| `labelLines` | `number\|string` | — | Max lines before truncating label |
| `captionLines` | `number\|string` | — | Max lines before truncating caption |
| `clickable` | `boolean` | `false` | Show hover/ripple interaction |
| `active` | `boolean` | `false` | Highlight as selected/active |
| `variant` | `ListItemVariant` | `'primary'` | Active state color token |
| `disabled` | `boolean` | `false` | Disable interaction |
| `dense` | `boolean` | `false` | Compact height mode |
| `to` | `string\|object` | — | Vue Router `<RouterLink>` destination |
| `href` | `string` | — | Plain anchor href |
| `insetLevel` | `number` | `0` | Left-indent level for nested items |

**`ListItemVariant`:** `'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info'`

---

## ListItem Slots Reference

| Slot | Location | Purpose |
|------|----------|---------|
| `prepend` | Left | Avatar, icon, thumbnail |
| `caption` | Main (caption row) | Custom caption markup (overrides `caption` prop) |
| `default` | Main (all rows) | Fully replace the content area |
| `side` | Right | Same as `append` — timestamp, label |
| `append` | Far right | Badge, action button, chevron |

### When to use `#caption` slot vs `caption` prop

Use the **`caption` prop** when the text is plain:
```vue
<ListItem label="Profile" caption="Manage your personal info" />
```

Use the **`#caption` slot** when you need custom markup (color, icon, italic):
```vue
<ListItem label="Raissa Anggraini">
  <template #caption>
    <span class="text-primary" style="font-style: italic">Typing ...</span>
  </template>
</ListItem>
```

---

## Best Practices

### DO ✅

- Always put `List` as the direct parent of `ListItem` components
- Use `variant` + `active` for selection highlighting — never apply manual color classes to the item
- Use the `#caption` slot for rich caption content (colored text, icons, italic)
- Use `separator` on `List` instead of manually placing `<q-separator>` between items
- Import icons from `quasar-extras-svg-icons/tabler-icons-v2`
- Use `to` prop for navigation items instead of `@click` + `router.push`
- Use `sideLabel` / `sideCaption` for right-aligned metadata (timestamp, file size)
- Use `overline` for the type/category tag above the label (three-line pattern)

### DON'T ❌

- Don't nest `ListItem` directly inside a `Card` without a `List` wrapper
- Don't use `q-item` / `q-list` directly — always use the `List` / `ListItem` primitives
- Don't use `active-class` on `QItem` directly; use `variant` + `active` props instead
- Don't use string icon names — always import Tabler icon objects
- Don't manually place `<q-separator>` between items — use `separator` on `List`
- Don't use the `default` slot unless you need to completely replace all text content

---

## See Also

- Live examples: `/lists` page (`src/pages/ui-ux/ListPage.vue`)
- `List` source: `src/shared/ui/primitives/List/`
- `ListItem` source: `src/shared/ui/primitives/ListItem/`
- Icon search: `/icons` skill or browse at `/icons` route
- Avatar component: use `Avatar` + `Badge dot` for presence indicators
