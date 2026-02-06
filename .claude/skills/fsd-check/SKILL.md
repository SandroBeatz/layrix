---
name: fsd-check
description: Quick FSD architecture compliance check. Scans for import direction violations, Quasar isolation breaches, and missing barrel exports. Use as a fast health check before committing.
user-invocable: true
allowed-tools: Bash, Read, Grep, Glob
---

# FSD Architecture Check

Perform a quick scan for Feature-Sliced Design violations.

## Checks to Run

### 1. Quasar Imports Outside shared/ui/primitives/

Search all `.vue` and `.ts` files in `pages/`, `widgets/`, `features/`, `entities/` for direct Quasar imports:

```
Pattern: import.*from ['"]quasar['"]
```

Files in `app/` are exempt (app layer can import anything).
Files in `shared/ui/primitives/` are exempt (that's where wrapping happens).

### 2. Upward Import Violations

Check for imports going against the layer hierarchy:

- `entities/` importing from `features/`, `widgets/`, `pages/`
- `features/` importing from `widgets/`, `pages/`
- `widgets/` importing from `pages/`
- `shared/` importing from any business layer

Search patterns:
```
In src/entities/: @features/, @widgets/, @pages/
In src/features/: @widgets/, @pages/
In src/widgets/: @pages/
In src/shared/: @entities/, @features/, @widgets/, @pages/, @app/
```

### 3. Horizontal Import Violations

Check for cross-slice imports within the same layer:
- Any feature importing from another feature domain
- Any widget importing from another widget
- Any entity importing from another entity

### 4. Missing Barrel Exports

Check that each slice directory has an `index.ts`:
- `entities/*/index.ts`
- `features/*/*/index.ts`
- `widgets/*/index.ts`

### 5. Deep Imports

Check for imports that bypass barrel files by importing directly from internal paths (e.g., importing from `ui/` or `model/` subdirectories of another slice).

## Output

Report findings as:

```
FSD Architecture Check
======================

✅ Quasar isolation: No violations
❌ Import direction: 2 violations found
  - src/features/x/y.ts:5 imports from @widgets/z
  - src/entities/a/b.ts:12 imports from @features/c
✅ Horizontal imports: No violations
⚠️ Missing barrels: 1 warning
  - src/widgets/new-widget/ missing index.ts

Result: PASS / FAIL
```
