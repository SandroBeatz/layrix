---
name: breadcrumbs-usage
description: Guide for using the Breadcrumbs component in Layrix applications
user-invocable: true
allowed-tools: ["view", "edit", "create", "grep"]
argument-hint: Use this skill when you need to add navigation breadcrumbs to a page
---

# Breadcrumbs Component Usage

This skill provides guidance on how to properly use the Breadcrumbs component in Layrix applications.

## Component Location

The Breadcrumbs component is located in `src/shared/ui/primitives/Breadcrumbs/` and is exported from `@shared/ui`.

## Basic Usage

### Simple Breadcrumbs

```vue
<script setup lang="ts">
import { Breadcrumbs } from '@shared/ui';
import type { BreadcrumbItem } from '@shared/ui';

const items: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Details' }
];
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
```

## Key Features

### 1. Color Behavior

The Breadcrumbs component uses Quasar's `color` and `active-color` props for proper color management:

- **Non-active items**: Display in `foreground` color (normal text color) by default
- **On hover**: Change to `primary` color with underline
- **Active item (last)**: Display in `text-muted` color

**Important**: Do NOT try to override colors with CSS. Use the component's built-in color system.

### 2. Breadcrumb Items

Each item in the `items` array accepts all properties from Quasar's `QBreadcrumbsEl`:

```typescript
interface BreadcrumbItem {
  label: string;           // Required: Display text
  icon?: any;             // Optional: Tabler icon object
  to?: string | object;   // Optional: Vue Router path
  href?: string;          // Optional: External link
  target?: string;        // Optional: Link target (_blank, etc.)
  disable?: boolean;      // Optional: Disable the item
  exact?: boolean;        // Optional: Exact router match
  class?: string;         // Optional: Custom CSS class
  style?: string | object; // Optional: Custom styles
  replace?: boolean;      // Optional: Replace history
  append?: boolean;       // Optional: Append to path
}
```

### 3. Using Tabler Icons

Always import Tabler icons from `quasar-extras-svg-icons/tabler-icons-v2`:

```vue
<script setup lang="ts">
import { Breadcrumbs } from '@shared/ui';
import type { BreadcrumbItem } from '@shared/ui';
import { tabHome, tabSettings, tabUser } from 'quasar-extras-svg-icons/tabler-icons-v2';

const items: BreadcrumbItem[] = [
  { label: 'Home', icon: tabHome, to: '/' },
  { label: 'Settings', icon: tabSettings, to: '/settings' },
  { label: 'Account', icon: tabUser }
];
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
```

**Note**: Icon separators are not supported. Only text-based separators work reliably.

### 4. Custom Separators

Use text characters or symbols as separators:

```vue
<!-- Default separator (/) -->
<Breadcrumbs :items="items" />

<!-- Custom text separator -->
<Breadcrumbs separator=">" :items="items" />

<!-- Unicode separator -->
<Breadcrumbs separator="›" :items="items" />
```

### 5. External Links

Mix internal routes with external links:

```vue
<script setup lang="ts">
const items: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Documentation', href: 'https://quasar.dev', target: '_blank' },
  { label: 'Current Page' }
];
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
```

### 6. Variants (Optional)

The component supports two variants, though they currently behave the same:

```vue
<!-- Primary variant -->
<Breadcrumbs variant="primary" :items="items" />

<!-- Regular variant (default) -->
<Breadcrumbs variant="regular" :items="items" />
```

### 7. Alignment Options

Control breadcrumb alignment:

```vue
<!-- Left aligned (default) -->
<Breadcrumbs :items="items" />

<!-- Center aligned -->
<Breadcrumbs align="center" :items="items" />

<!-- Right aligned -->
<Breadcrumbs align="right" :items="items" />
```

### 8. Gutter Sizing

Control spacing between items:

```vue
<!-- Small gutter (default) -->
<Breadcrumbs :items="items" />

<!-- Large gutter -->
<Breadcrumbs gutter="lg" :items="items" />

<!-- No gutter -->
<Breadcrumbs gutter="none" :items="items" />
```

## Common Patterns

### Page Header with Breadcrumbs

```vue
<script setup lang="ts">
import { PageContainer, Breadcrumbs } from '@shared/ui';
import type { BreadcrumbItem } from '@shared/ui';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Users', to: '/users' },
  { label: 'Profile' }
];
</script>

<template>
  <PageContainer title="User Profile">
    <Breadcrumbs :items="breadcrumbs" class="q-mb-md" />
    <!-- Page content -->
  </PageContainer>
</template>
```

### Dynamic Breadcrumbs from Route

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Breadcrumbs } from '@shared/ui';
import type { BreadcrumbItem } from '@shared/ui';

const route = useRoute();

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const paths = route.path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: 'Home', to: '/' }];
  
  let path = '';
  paths.forEach((segment, index) => {
    path += `/${segment}`;
    items.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      to: index === paths.length - 1 ? undefined : path
    });
  });
  
  return items;
});
</script>

<template>
  <Breadcrumbs :items="breadcrumbs" />
</template>
```

## Best Practices

### DO ✅

- Always import from `@shared/ui`
- Type your items array with `BreadcrumbItem[]`
- Use Tabler icon objects (not string names)
- Use text-based separators (/, >, ›)
- Let the component handle colors automatically
- Use the last item without navigation (represents current page)

### DON'T ❌

- Don't try to override colors with CSS
- Don't use icon separators (they don't render correctly)
- Don't use string icon names like 'ti-home' (use imported icon objects)
- Don't make the last item (active/current) clickable
- Don't manually set hover styles (they're built-in)

## Troubleshooting

### Colors Not Working

If breadcrumb colors don't match the design system:

```vue
<!-- ❌ Wrong: Trying to override with CSS -->
<Breadcrumbs :items="items" class="my-custom-colors" />

<!-- ✅ Correct: Let the component handle colors -->
<Breadcrumbs :items="items" />
```

The component uses Quasar's `color="foreground"` and `active-color="text-muted"` props internally. CSS alone cannot override these.

### Icons Not Displaying

If icons show as SVG paths or don't render:

```vue
<!-- ❌ Wrong: Using string icon names -->
<script setup lang="ts">
const items = [
  { label: 'Home', icon: 'ti-home', to: '/' }
];
</script>

<!-- ✅ Correct: Using imported Tabler icon objects -->
<script setup lang="ts">
import { tabHome } from 'quasar-extras-svg-icons/tabler-icons-v2';

const items = [
  { label: 'Home', icon: tabHome, to: '/' }
];
</script>
```

### Hover Effects Not Working

Hover effects are built into the component. If they're not visible:

1. Ensure you're not on the last (active) item - it doesn't have hover
2. Check that the item has a `to` or `href` property
3. Verify the item is not disabled

## Component Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Array of breadcrumb items |
| `variant` | `'primary' \| 'regular'` | `'regular'` | Style variant |
| `separator` | `string` | `'/'` | Separator between items |
| `gutter` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` | Spacing between items |
| `align` | `'left' \| 'center' \| 'right' \| 'between' \| 'around' \| 'evenly'` | `'left'` | Alignment |
| `activeColor` | `string` | `'text-muted'` | Color for active item (managed internally) |

## Related Components

- **PageContainer**: Often used together with Breadcrumbs for page headers
- **Card**: Can contain breadcrumbs for sectioned content
- **Typography**: Used for additional context around breadcrumbs

## Demo

See the full demo at `/breadcrumbs` route in the application, showing all features and variations.
