# FSD Directory Structure

This document shows the Feature-Sliced Design architecture structure created for Layrix.

## Complete Structure

```
src/
├── app/                         # Application Layer
│   ├── providers/
│   │   ├── router/             # Router configuration
│   │   ├── store/              # Pinia store setup
│   │   └── i18n/               # Internationalization setup
│   ├── layouts/                # Layout components (AdminLayout, AuthLayout, etc.)
│   ├── styles/                 # Global styles, design tokens
│   ├── index.ts               # Public API
│   └── README.md              # Layer documentation
│
├── pages/                       # Pages Layer
│   ├── index.ts               # Public API (usually empty, pages lazy-loaded)
│   └── README.md              # Layer documentation
│
├── widgets/                     # Widgets Layer
│   ├── index.ts               # Public API
│   └── README.md              # Layer documentation
│
├── features/                    # Features Layer
│   ├── index.ts               # Public API
│   └── README.md              # Layer documentation
│
├── entities/                    # Entities Layer
│   ├── index.ts               # Public API
│   └── README.md              # Layer documentation
│
└── shared/                      # Shared Layer
    ├── api/                    # HTTP client, interceptors
    │   └── index.ts
    ├── config/                 # Environment, constants
    │   └── index.ts
    ├── lib/                    # Utilities (date, validation, storage)
    │   └── index.ts
    ├── types/                  # Common TypeScript types
    │   └── index.ts
    ├── ui/                     # UI Kit
    │   ├── quasar/            # Quasar component wrappers (ONLY place to import Quasar!)
    │   ├── primitives/        # Base UI components
    │   ├── composables/       # UI composables
    │   └── index.ts
    ├── index.ts               # Public API
    └── README.md              # Layer documentation
```

## Layer Hierarchy (Strict)

```
app      → can import: EVERYTHING
pages    → can import: widgets, features, entities, shared
widgets  → can import: features, entities, shared
features → can import: entities, shared
entities → can import: shared
shared   → can import: ONLY external libraries
```

## Next Steps

1. **Migrate existing code** from `src/components/`, `src/layouts/`, etc. to FSD structure
2. **Create first entity** (e.g., `entities/user/`)
3. **Create first feature** (e.g., `features/user/create/`)
4. **Create first widget** (e.g., `widgets/users-table/`)
5. **Update path aliases** in `.quasar/tsconfig.json` to include FSD layers
6. **Wrap Quasar components** in `shared/ui/quasar/`

## Documentation

Each layer has a README.md file with:
- Purpose and responsibilities
- What goes in this layer
- What doesn't go in this layer
- Import rules
- Examples

Check the README.md in each layer directory for detailed guidance.
