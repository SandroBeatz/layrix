---
name: new-page
description: Scaffold a new page with route registration. Creates a page component using PageContainer and registers the route in the router. Use when adding new pages/routes to the application.
user-invocable: true
allowed-tools: Read, Write, Edit, Glob
argument-hint: <page-name> (e.g., settings, user-profile)
---

# New Page

Scaffold a new page in `src/pages/` and register its route.

## Arguments

`$ARGUMENTS` should be the page name in kebab-case (e.g., `settings`, `user-profile`, `notifications`).

If no arguments provided, ask the user what page to create.

## Steps

1. **Create page directory and component:**

   `src/pages/$ARGUMENTS/[PageName]Page.vue`:

   ```vue
   <script setup lang="ts">
   import { PageContainer } from '@shared/ui'
   </script>

   <template>
     <PageContainer title="Page Title">
       <!-- Compose widgets here -->
     </PageContainer>
   </template>
   ```

2. **Register route** in `src/app/providers/router/routes.ts`:

   Add to the children array of the main AdminLayout route:

   ```typescript
   {
     path: '/$ARGUMENTS',
     name: '$ARGUMENTS',
     component: () => import('@pages/$ARGUMENTS/[PageName]Page.vue'),
   }
   ```

3. **Optionally add sidebar link** in `src/widgets/sidebar/model/useSidebar.ts` if the page should appear in navigation.

## Page Rules

Pages MUST be "dumb":
- Only compose widgets and features
- No business logic
- No API calls
- No direct store access
- No complex computed properties
- No watchers with side effects

Pages CAN import from:
- `@widgets/*`
- `@features/*`
- `@entities/*` (only types)
- `@shared/ui`

Pages CANNOT:
- Import Quasar directly
- Contain business logic
- Make API calls
