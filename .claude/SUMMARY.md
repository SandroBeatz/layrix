# Layrix — Project Summary

## What Is This

Layrix is a **production-ready architectural framework** for building scalable dashboard applications. It uses **Quasar Framework** (Vue 3) with **Feature-Sliced Design (FSD)** methodology, optimized for AI-assisted development.

The primary goal is to provide a predictable, strictly structured codebase where every file has exactly one correct location, every import follows clear rules, and AI agents can confidently navigate and modify the code.

## Architecture

### FSD Layers (strict top-to-bottom dependency)

| Layer | Path | Purpose | Import Rules |
|-------|------|---------|-------------|
| **app** | `src/app/` | Boot, layout, providers, global config | Can import everything |
| **pages** | `src/pages/` | Route components — thin composition wrappers | widgets, features, entities, shared |
| **widgets** | `src/widgets/` | Large UI blocks composing features | features, entities, shared |
| **features** | `src/features/` | Single user actions (verb + noun) | entities, shared |
| **entities** | `src/entities/` | Business domain (stores, types, API) | shared only |
| **shared** | `src/shared/` | UI kit, utilities, API client | external libs only |

### Critical Rules

1. **Imports go down only** — never up, never horizontal between siblings
2. **Quasar isolation** — only `shared/ui/primitives/` imports Quasar directly
3. **Barrel exports** — every slice has `index.ts`, imports go through it
4. **Features = actions** — organized as `features/[domain]/[action]/`
5. **Pages are dumb** — no business logic, just widget composition

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Quasar | 2.16.0 |
| UI | Vue | 3.5.22 |
| Language | TypeScript | 5.9.2 (strict mode) |
| State | Pinia | 3.0.1 |
| Router | Vue Router | 4.x (history mode) |
| i18n | Vue I18n | 11.x |
| HTTP | Axios | 1.2.x |
| Linting | ESLint | 9.x (flat config) |
| Formatting | Prettier | 3.3.3 |
| Build | Vite (via Quasar CLI) | — |

## Current Components Inventory

### Design System (`shared/ui/primitives/`)

Button, ButtonGroup, Card, Input, Alert, Badge, ColorSwatch, Dropdown, Typography

### Layout (`shared/ui/layout/`)

PageContainer

### Composables (`shared/lib/`)

useTheme, useScreen, usePlatform, useDevice, useClipboard

### Widgets

HeaderWidget (+ HeaderUserButton), SidebarWidget (recursive menus, collapsible groups), ThemePalette

### Features

sidebar/toggle-mini, sidebar/toggle-sidebar, theme/toggle

### Entities

sidebar (Pinia store with mini/open state, localStorage persistence)

### Pages (14 routes)

Dashboard (Analytics, E-Commerce, CRM), UI/UX demos (Theme, Buttons, ButtonGroup, Typography, Badges, Alerts, Inputs, Dropdown), Icons, DeviceTest, VelocornerWidget

## TypeScript Configuration

Strict mode with extra flags:
- `exactOptionalPropertyTypes: true` — can't assign `undefined` to optional props
- `noUncheckedIndexedAccess: true` — array/object access returns `T | undefined`
- `noImplicitOverride: true` — must use `override` keyword
- ESLint enforces `import type` for type-only imports

## Development

```bash
quasar dev           # Start dev server
npm run lint         # ESLint
npm run format       # Prettier
npx vue-tsc --noEmit # Type check
quasar build         # Production build
```

## Issue Tracking

Uses **beads** (`bd` CLI) — git-synced issue tracker in `.beads/`.

## Path Aliases

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared` — all map to `src/[layer]/`.
