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

**Current State:** This project has fully migrated to FSD structure. The FSD layers (`app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`) are active and contain working code. Follow this structure for all new code.

## Development Commands

```bash
# Development
quasar dev              # Start dev server (alias: npm run dev)

# Code Quality
npm run lint            # Run ESLint on all TS/JS/Vue files
npm run format          # Format all files with Prettier
npm test               # Run tests (currently placeholder)

# Build
quasar build           # Production build (alias: npm run build)

# Note: This project uses Quasar CLI. All quasar commands work (dev, build, inspect, etc.)
```

**Package Manager:** Uses npm/yarn. Project has both npm and bun lock files.

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
- Direct Quasar imports outside `shared/ui/` primitives

### Quasar Integration

**CRITICAL RULE:** Quasar is imported ONLY in `shared/ui/primitives/` components

All Quasar components must be wrapped in `shared/ui/primitives/` and exported through `shared/ui/index.ts`.

```typescript
// ❌ FORBIDDEN everywhere except shared/ui/primitives
import { QBtn, QTable } from 'quasar'

// ✅ CORRECT
import { Button, Card } from '@shared/ui'
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
- **Structure:** `app/providers/[provider-name]/` for each provider (router, i18n, axios, store)
- **Location:** Layouts are in `app/layouts/` (e.g., `AdminLayout.vue`)
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
- **Organization:** `features/[domain]/[action]/` (e.g., `features/sidebar/toggle-mini/`, `features/theme/toggle/`)
- **Allowed:** Entity store/API calls, local state, UI for the action
- **Forbidden:** Importing other features, importing widgets/pages, complex displays (use widgets)

### entities/
- **Purpose:** Business entities and domain models
- **Organization:** `entities/[name]/` (e.g., `entities/sidebar/`)
- **Contains:** Types, API methods, Pinia stores, small UI fragments (avatar, badge)
- **Forbidden:** Forms, dialogs, importing features, use case logic

### shared/
- **Purpose:** Reusable infrastructure
- **Structure:**
  - `api/` - HTTP client, interceptors
  - `config/` - Environment variables, constants
  - `lib/` - Utilities (theme, clipboard, device detection)
  - `types/` - Common types
  - `ui/` - UI Kit (Quasar wrappers, layout components)
    - `ui/primitives/` - Basic components (Button, Card, Input, Alert, Badge, etc.)
    - `ui/layout/` - Layout components (PageContainer)
- **Forbidden:** Importing business layers, business logic

## TypeScript Conventions

**This project uses VERY STRICT TypeScript settings:**
- `strict: true` with additional strictness flags enabled
- `exactOptionalPropertyTypes: true` - Optional properties cannot be set to `undefined` explicitly
- `noUncheckedIndexedAccess: true` - Array/object access returns `T | undefined`
- `noImplicitOverride: true` - Must use `override` keyword

**Type Imports:**
- REQUIRED: Use `import type` for type-only imports (enforced by ESLint)
- Example: `import type { User } from '@entities/user'`

**Component Props:**
- All props must be typed via interface
- Avoid `any` - use `unknown` if type is truly unknown
- Component props: `interface [Component]Props`
- DTO types in `entities/[name]/api/types.ts`
- Domain types in `entities/[name]/model/types.ts`
- Shared types in `shared/types/`

## Path Aliases

**FSD Layer Aliases (ACTIVE):**
```typescript
@app/*        → ./src/app/*
@pages/*      → ./src/pages/*
@widgets/*    → ./src/widgets/*
@features/*   → ./src/features/*
@entities/*   → ./src/entities/*
@shared/*     → ./src/shared/*
```

**Note:** Also use `@shared` (without wildcard) to import from `shared/ui/index.ts`

**Legacy Aliases (available but prefer FSD aliases):**
```typescript
src/*         → ./src/*
components/*  → ./src/components/* (deprecated)
layouts/*     → ./src/layouts/* (deprecated, use @app/layouts)
pages/*       → ./src/pages/*
assets/*      → ./src/assets/*
boot/*        → ./src/boot/* (deprecated, use @app/providers)
stores/*      → ./src/stores/* (deprecated)
```

Path aliases are configured in:
- `.quasar/tsconfig.json` (TypeScript)
- `quasar.config.ts` (Vite/build)

## Common Patterns

### Creating a New Feature

```
features/[domain]/[action]/
├── ui/
│   └── [Action][Entity]Component.vue
├── model/
│   └── use[Action][Entity].ts
├── types.ts (if needed)
└── index.ts
```

Example: `features/sidebar/toggle-mini/`
- `ui/ToggleMiniButton.vue` - Button UI
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

1. Create in `shared/ui/primitives/[Name]/`
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
2. Features = actions (verbs), organized by domain: `features/[domain]/[action]/`
3. UI separated from logic (ui/ vs model/)
4. Pages contain no business logic
5. Entities own all data operations
6. Quasar only in `shared/ui/primitives/` components
7. Public API through `index.ts`
8. One responsibility per file

### MUST NOT (Forbidden)

1. Cross-imports (feature ↔ feature, widget ↔ widget)
2. Logic in UI components (use model/)
3. Direct API access from pages/widgets (use entities/features)
4. Smart layouts (no business logic in app/layouts/)
5. Direct Quasar imports outside shared/ui/primitives/
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
  name: 'new-page',
  component: () => import('@pages/new-page/NewPage.vue')
}
```

```vue
<!-- pages/new-page/NewPage.vue -->
<script setup lang="ts">
import { PageContainer } from '@shared/ui'
import { SomeWidget } from '@widgets/some-widget'
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
- [ ] No direct Quasar imports (except `shared/ui/primitives/` components)
- [ ] Exports through `index.ts`
- [ ] UI separated from logic
- [ ] Types are defined (no `any`)
- [ ] Component uses shared/ui components
- [ ] Using `import type` for type-only imports

## Code Quality

**ESLint Configuration:**
- Uses flat config (ESLint 9+)
- Vue 3 essential rules + TypeScript recommended
- Quasar-specific rules enabled
- **Enforced:** `consistent-type-imports` - must use `import type` for types
- **Special:** Multi-word component names disabled for `shared/ui/**/*.vue`

**Prettier:**
- Format command: `npm run format`
- Integrated with ESLint via `skip-formatting` config

**Type Checking:**
- `vue-tsc` available
- ESLint type-checks via `@vue/eslint-config-typescript`
- Both run automatically during development

## Quasar Configuration

**Boot Files:** Located in `app/providers/` (i18n, axios)

**Router Mode:** History mode (configured in `quasar.config.ts` line 70)

**Auto-import:** Quasar components are auto-imported by default. However, per architecture rules, only `shared/ui/primitives/` should import Quasar components directly.

**Dev Server:** Opens browser automatically on `quasar dev`

---

## Current Implementation Status

### Layers

**✅ app/** - Application Layer
- `layouts/AdminLayout.vue` - Main admin layout with Q-Layout (header + sidebar)
- `providers/router/` - Vue Router 4 with history mode, 14 routes
- `providers/store/` - Pinia store setup with plugin support
- `providers/i18n/` - Vue I18n 11 with English translations
- `providers/axios/` - HTTP client boot configuration

**✅ pages/** - Pages Layer (14 routes)
- **Dashboard:** AnalyticsPage, ECommercePage, CRMPage
- **UI/UX Demo:** ThemePage, ButtonsPage, ButtonGroupPage, InputsPage, BadgesPage, AlertsPage, DropdownPage, TypographyPage
- **Utilities:** IconsPage (searchable icon browser), DeviceTestPage (device detection demo), VelocornerWidgetPage (external widget integration)
- **Error:** ErrorNotFound.vue (404 page)

**✅ widgets/** - Widgets Layer
- `header/` - HeaderWidget with HeaderUserButton (user menu dropdown)
- `sidebar/` - SidebarWidget with recursive menu items, collapsible groups, logo section
- `theme-palette/` - ThemePalette for color palette display with color groups config

**✅ features/** - Features Layer
- `sidebar/toggle-mini/` - ToggleMiniButton (collapse/expand sidebar, responsive)
- `sidebar/toggle-sidebar/` - ToggleSidebarButton (mobile drawer toggle)
- `theme/toggle/` - ThemeToggle (light/dark mode switch)

**✅ entities/** - Entities Layer
- `sidebar/` - useSidebarStore (Pinia) with:
  - State: `isMini` (desktop collapse), `isOpen` (mobile drawer)
  - Actions: `toggleMini()`, `setMini()`, `toggleOpen()`, `setOpen()`, `initialize()`
  - Persistence: localStorage with `layrix-sidebar` key
  - HMR support enabled

**✅ shared/** - Shared Layer

### UI Primitives (`shared/ui/primitives/`)

| Component | Props | Description |
|-----------|-------|-------------|
| **Alert** | variant, appearance (fill/outline/soft/ghost), icon, showIcon, layout | Notification/alert box with icon support |
| **Badge** | variant, appearance | Small label component |
| **Button** | variant (primary/secondary/positive/negative/warning/info/regular), appearance (fill/outline/flat/ghost), shape, size, iconOnly, loading, disabled, fullWidth | Quasar QBtn wrapper with custom styling |
| **ButtonGroup** | orientation (horizontal/vertical), spread, stretch, outline, flat, rounded | Quasar QBtnGroup wrapper |
| **Card** | - | Container component |
| **ColorSwatch** | colorName | Color display with copy-to-clipboard |
| **Dropdown** | items, modelValue, maxWidth, transitions | Responsive dropdown (QMenu on desktop, QDialog bottom sheet on mobile) |
| **Input** | variants | Form input wrapper |
| **Typography** | as (h1-h6/p/span), variant, weight (light/normal/semibold/bold) | Text hierarchy component |

### Layout Components (`shared/ui/layout/`)
- **PageContainer** - Page wrapper with title/subtitle props

### Composables/Utilities (`shared/lib/`)

| Composable | Purpose |
|------------|---------|
| **useTheme()** | Theme management (light/dark), localStorage persistence, Quasar Dark plugin sync |
| **useScreen()** | Screen/breakpoint detection (`isMobileBreakpoint` computed) |
| **usePlatform()** | Platform type detection (`isPlatform()` function) |
| **useDevice()** | Device capabilities and type detection |
| **useClipboard()** | Copy to clipboard functionality |

### Exported Types (`shared/lib/device/`)
- `DeviceType`, `BreakpointName`, `OSType`, `BrowserType`
- `DeviceInfo`, `ScreenInfo`, `PlatformInfo`
- `UseDeviceReturn`, `UseScreenReturn`, `UsePlatformReturn`

---

## Routes Reference

All routes are defined in `app/providers/router/routes.ts`:

| Path | Name | Component | Description |
|------|------|-----------|-------------|
| `/` | - | Redirect | Redirects to `/analytics` |
| `/analytics` | analytics | AnalyticsPage | Analytics dashboard |
| `/e-commerce` | eCommerce | ECommercePage | E-commerce dashboard |
| `/crm` | crm | CRMPage | CRM dashboard |
| `/theme` | theme | ThemePage | Theme color palette showcase |
| `/buttons` | buttons | ButtonsPage | Button variants demo |
| `/button-group` | button-group | ButtonGroupPage | Button group demo |
| `/typography` | typography | TypographyPage | Typography scales demo |
| `/badges` | badges | BadgesPage | Badge variants demo |
| `/alerts` | alerts | AlertsPage | Alert component demo |
| `/inputs` | inputs | InputsPage | Input component demo |
| `/dropdown` | dropdown | DropdownPage | Dropdown component demo |
| `/icons` | icons | IconsPage | Searchable icon browser |
| `/device-test` | device-test | DeviceTestPage | Device detection test |
| `/velocorner-widget` | velocorner-widget | VelocornerWidgetPage | External widget integration |
| `/*` | - | ErrorNotFound | 404 catch-all |

---

## Responsive Patterns

The codebase uses Quasar's Screen plugin for responsive behavior:

```typescript
// shared/lib/device/useScreen.ts
import { useScreen } from '@shared/lib'

const { isMobileBreakpoint } = useScreen()

// In components - conditionally render based on breakpoint
<template v-if="!isMobileBreakpoint">
  <DesktopContent />
</template>
```

**Mobile/Desktop Branching Examples:**
- `ToggleMiniButton` - Hidden on mobile breakpoints
- `Dropdown` - QMenu on desktop, QDialog bottom sheet on mobile
- `SidebarWidget` - Full drawer on mobile, mini mode on desktop

---

## Known Notes

1. **`entities/index.ts`** - Currently empty placeholder; individual entities export through their own `index.ts`
2. **`widgets/index.ts`** - Only exports ThemePalette; HeaderWidget and SidebarWidget used via direct imports in AdminLayout
3. **Route imports** - Some use `pages/` alias, others use `@pages/`; both work but prefer `@pages/` for consistency
