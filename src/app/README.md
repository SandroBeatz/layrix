# App Layer

**Purpose:** Application initialization, global providers, and layouts

## What Goes Here

- **providers/** - Global providers (router, store, i18n)
- **layouts/** - Layout components (AdminLayout, AuthLayout, etc.)
- **styles/** - Global styles, design tokens, CSS variables

## What Doesn't Go Here

- Business logic
- API calls
- Feature components
- Page components

## Import Rules

Can import from: **EVERYTHING** (all lower layers)

## Example Structure

```
app/
├── providers/
│   ├── router/
│   │   ├── routes.ts
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   └── i18n/
│       └── index.ts
├── layouts/
│   ├── AdminLayout.vue
│   └── AuthLayout.vue
├── styles/
│   ├── tokens.scss
│   └── global.scss
└── index.ts
```
