---
name: icon-usage
description: Complete guide for using the Icon component in the Layrix application. Covers all icon usage patterns, sizes, colors, and best practices. Use when adding icons to any component.
user-invocable: true
allowed-tools: Read, Edit, Grep, Glob
argument-hint: [icon-name or use-case]
---

# Icon Component Usage Guide

Complete reference for using the `Icon` component from `@shared/ui` in the Layrix application.

## Basic Import

```vue
<script setup lang="ts">
import { Icon } from '@shared/ui'
import { tabHome, tabSearch, tabMail } from 'quasar-extras-svg-icons/tabler-icons-v2'
</script>
```

## CRITICAL RULE: Never Use q-icon or QIcon Directly

**❌ WRONG — Never use Quasar's q-icon or QIcon directly outside of shared/ui/primitives/:**
```vue
<!-- ❌ FORBIDDEN in pages, widgets, features, entities -->
<q-icon :name="tabHome" />
<QIcon :name="tabHome" />
```

**✅ CORRECT — Always use the Icon component from @shared/ui:**
```vue
<!-- ✅ Use Icon everywhere outside shared/ui/primitives/ -->
<Icon :name="tabHome" />
```

### Why Icon?

- Encapsulates Quasar's QIcon behind a design system boundary
- Follows the Layrix FSD architecture rule: Quasar is only imported in `shared/ui/primitives/`
- Provides a consistent interface for icon usage across all layers
- Enables future icon system changes without touching consumer components

---

## Icon Source

All icons MUST come from **Tabler Icons v2**:

```typescript
import { tabHome, tabSearch, tabMail } from 'quasar-extras-svg-icons/tabler-icons-v2'
```

- ❌ No Material Icons, FontAwesome, MDI, or other libraries
- ❌ No inline SVGs or custom icon files
- ✅ Only `quasar-extras-svg-icons/tabler-icons-v2`

All Tabler icon exports use the `tab` prefix in camelCase: `tabHome`, `tabSearch`, `tabMail`, `tabSettings`, etc.

Browse available icons at the `/icons` route in the app.

---

## Usage Patterns

### Standalone Icon

```vue
<Icon :name="tabHome" />
```

### With Size

```vue
<!-- Quasar keyword sizes -->
<Icon :name="tabHome" size="xs" />
<Icon :name="tabHome" size="sm" />
<Icon :name="tabHome" size="md" />
<Icon :name="tabHome" size="lg" />
<Icon :name="tabHome" size="xl" />

<!-- CSS unit sizes -->
<Icon :name="tabHome" size="16px" />
<Icon :name="tabHome" size="24px" />
<Icon :name="tabHome" size="2rem" />
```

### With Color

```vue
<!-- Quasar color names -->
<Icon :name="tabCheck" color="positive" />
<Icon :name="tabX" color="negative" />
<Icon :name="tabInfo" color="primary" />

<!-- CSS class approach (preferred for design system colors) -->
<Icon :name="tabHome" class="text-primary" />
<Icon :name="tabAlert" class="text-negative" />
<Icon :name="tabInfo" class="text-muted-foreground" />
```

### Inline with Text (Margin Gutters)

```vue
<!-- Icon before text — use right prop for right margin -->
<Icon :name="tabCheck" right /> Saved successfully

<!-- Icon after text — use left prop for left margin -->
Click here <Icon :name="tabChevronRight" left />
```

### Dynamic Icon

```vue
<script setup lang="ts">
import { Icon } from '@shared/ui'
import type { IconProps } from '@shared/ui'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
}

const props = defineProps<Props>()
</script>

<template>
  <Icon :name="props.icon" />
</template>
```

### Conditional Icon

```vue
<Icon v-if="isComplete" :name="tabCircleCheck" class="text-positive" />
<Icon v-else :name="tabCircle" class="text-muted-foreground" />
```

---

## Common Use Cases

### Icon in List Items

```vue
<script setup lang="ts">
import { Icon, List, ListItem } from '@shared/ui'
import { tabHome, tabSettings, tabUser } from 'quasar-extras-svg-icons/tabler-icons-v2'
</script>

<template>
  <List>
    <ListItem label="Home" clickable>
      <template #prepend>
        <Icon :name="tabHome" size="20px" class="text-muted-foreground" />
      </template>
    </ListItem>
    <ListItem label="Settings" clickable>
      <template #prepend>
        <Icon :name="tabSettings" size="20px" class="text-muted-foreground" />
      </template>
    </ListItem>
  </List>
</template>
```

### Icon in Buttons

```vue
<script setup lang="ts">
import { Button, Icon } from '@shared/ui'
import { tabPlus, tabTrash } from 'quasar-extras-svg-icons/tabler-icons-v2'
</script>

<template>
  <!-- Use Button's built-in :icon prop -->
  <Button :icon="tabPlus">Add Item</Button>

  <!-- Or place Icon inside Button default slot -->
  <Button icon-only appearance="ghost">
    <Icon :name="tabTrash" size="18px" />
  </Button>
</template>
```

### Icon with Input

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FieldControl, Input } from '@shared/ui'
import { tabSearch } from 'quasar-extras-svg-icons/tabler-icons-v2'

const query = ref('')
</script>

<template>
  <!-- Input accepts icon prop directly — no need to use Icon component -->
  <FieldControl label="Search">
    <Input v-model="query" :icon="tabSearch" placeholder="Search..." />
  </FieldControl>
</template>
```

### Notification / Status Icon

```vue
<script setup lang="ts">
import { Icon } from '@shared/ui'
import { tabCircleCheck, tabAlertTriangle, tabInfoCircle, tabCircleX } from 'quasar-extras-svg-icons/tabler-icons-v2'

const statusIconMap = {
  success: tabCircleCheck,
  warning: tabAlertTriangle,
  info: tabInfoCircle,
  error: tabCircleX,
}

type Status = keyof typeof statusIconMap

const props = defineProps<{ status: Status }>()
</script>

<template>
  <Icon
    :name="statusIconMap[props.status]"
    size="20px"
    :class="{
      'text-positive': props.status === 'success',
      'text-warning': props.status === 'warning',
      'text-info': props.status === 'info',
      'text-negative': props.status === 'error',
    }"
  />
</template>
```

---

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `any` | — (**required**) | Tabler icon SVG string from `quasar-extras-svg-icons/tabler-icons-v2` |
| `size` | `string` | `undefined` | CSS size (`'16px'`, `'1.5rem'`) or Quasar keyword (`'xs'` / `'sm'` / `'md'` / `'lg'` / `'xl'`) |
| `color` | `string` | `undefined` | Quasar color name (`'primary'`, `'negative'`) or CSS color. Prefer CSS class for design tokens. |
| `left` | `boolean` | `false` | Add a small left margin gutter (icon before text) |
| `right` | `boolean` | `false` | Add a small right margin gutter (icon after text) |
| `tag` | `string` | `'i'` | HTML tag used for rendering |

---

## Best Practices

### DO ✅

- Import icons only from `quasar-extras-svg-icons/tabler-icons-v2`
- Use `import type { IconProps }` when typing icon props in component interfaces
- Use CSS utility classes (`text-primary`, `text-muted-foreground`) for design token colors
- Use `size="20px"` or `size="24px"` for most UI icons
- Use `v-if` when the icon value may be undefined/null

### DON'T ❌

- Never use `<q-icon>` or `<QIcon>` outside of `shared/ui/primitives/`
- Never import icons from Material Icons, FontAwesome, MDI, or any other library
- Never use inline SVGs for icons that exist in Tabler Icons
- Never use `size` prop with plain numbers (e.g., `size="24"`) — always include the unit (`"24px"`)

---

## Icon Naming Reference

| Icon | Import |
|------|--------|
| Home | `tabHome` |
| Search | `tabSearch` |
| Mail | `tabMail` |
| Settings | `tabSettings` |
| User | `tabUser` |
| Lock | `tabLock` |
| Bell | `tabBell` |
| Trash | `tabTrash` |
| Edit / Pencil | `tabPencil` |
| Check | `tabCheck` |
| Circle Check | `tabCircleCheck` |
| X / Close | `tabX` |
| Circle X | `tabCircleX` |
| Info Circle | `tabInfoCircle` |
| Alert Triangle | `tabAlertTriangle` |
| Arrow Right | `tabArrowRight` |
| Chevron Right | `tabChevronRight` |
| Eye | `tabEye` |
| Eye Off | `tabEyeOff` |
| Moon | `tabMoon` |
| Sun | `tabSun` |
| Menu | `tabMenu2` |
| Log Out | `tabLogout` |
| Plus | `tabPlus` |
| Star | `tabStar` |

Browse the full icon set: `/icons` route in the app, or visit https://tabler.io/icons
