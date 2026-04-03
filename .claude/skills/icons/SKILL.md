---
name: icons
description: Reference for using icons in the Layrix application. All icons MUST come from quasar-extras-svg-icons/tabler-icons-v2 (Tabler Icons). Use when adding, choosing, or reviewing icon usage.
user-invocable: true
allowed-tools: Read, Grep, Glob
argument-hint: [icon-name or description]
---

# Icons in Layrix

All icons in this application MUST use **Tabler Icons v2** from the `quasar-extras-svg-icons` package.

## The Only Allowed Icon Source

```typescript
import { tabIconName } from 'quasar-extras-svg-icons/tabler-icons-v2'
```

**No other icon libraries are permitted.** This includes:
- ❌ `@quasar/extras/material-icons`
- ❌ `@quasar/extras/fontawesome-v6`
- ❌ `@quasar/extras/ionicons-v4`
- ❌ `@mdi/svg` or any MDI icons
- ❌ Inline SVGs or custom icon files
- ❌ Any other icon package

## Naming Convention

All Tabler icon exports use the `tab` prefix in camelCase:

| Icon | Import name |
|------|-------------|
| Home | `tabHome` |
| Mail | `tabMail` |
| Search | `tabSearch` |
| Lock | `tabLock` |
| Moon | `tabMoon` |
| Sun | `tabSun` |
| Menu | `tabMenu2` |
| Eye | `tabEye` |
| Eye Off | `tabEyeOff` |
| Check | `tabCheck` |
| X | `tabX` |
| Alert Circle | `tabAlertCircle` |
| Info Circle | `tabInfoCircle` |

## Usage with Quasar Components

Tabler icons are SVG strings. Use them with Quasar's `QIcon` or any component that accepts an SVG icon:

```vue
<script setup lang="ts">
import { tabMail, tabSearch } from 'quasar-extras-svg-icons/tabler-icons-v2'
</script>

<template>
  <!-- With QIcon directly (only in shared/ui/primitives/) -->
  <q-icon :name="tabMail" />

  <!-- With shared Input component -->
  <Input v-model="email" :icon="tabMail" />

  <!-- With shared Button component -->
  <Button icon :icon="tabSearch" />
</template>
```

## Browsing Available Icons

The full list of available icons can be browsed at:
- **In-app:** `/icons` route (IconsPage with search)
- **Source:** `src/pages/icons/lib/iconsData.ts` — loads all icons from the package

## Finding an Icon

If `$ARGUMENTS` is provided, search for a matching icon:

1. Check `src/pages/icons/lib/iconsData.ts` to understand the icon data structure
2. Suggest icons by name that match the description (e.g., "delete" → `tabTrash`, "settings" → `tabSettings`)
3. The full icon set is Tabler Icons v2: https://tabler.io/icons

## Review Checklist

When reviewing code for icon usage:
- [ ] Icons imported ONLY from `quasar-extras-svg-icons/tabler-icons-v2`
- [ ] Import names use `tab` prefix (e.g., `tabHome`, not `home`)
- [ ] No inline SVGs used where a Tabler icon exists
- [ ] No other icon packages imported
