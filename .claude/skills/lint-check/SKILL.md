---
name: lint-check
description: Run code quality checks including ESLint and TypeScript type checking. Use after making code changes to verify correctness before committing.
user-invocable: true
allowed-tools: Bash, Read
---

# Lint & Type Check

Run all code quality gates for the Layrix project.

## Steps

1. **Run ESLint:**
   ```bash
   npm run lint
   ```

2. **Run TypeScript type check:**
   ```bash
   npx vue-tsc --noEmit
   ```

3. **Report results:**
   - If both pass: Report success
   - If ESLint fails: Show errors and suggest fixes
   - If TypeScript fails: Show type errors with file locations

## Common Issues

### ESLint
- Missing `import type` for type-only imports → Add `type` keyword
- Multi-word component names → Only enforced outside `shared/ui/`
- Unused variables → Remove or prefix with `_`

### TypeScript
- `exactOptionalPropertyTypes` violations → Don't assign `undefined` to optional props; use `delete` or omit the property
- `noUncheckedIndexedAccess` → Add null checks for array/object access
- `noImplicitOverride` → Add `override` keyword to overriding methods

## Quick Fix Mode

If the user passes `--fix` as argument, run:
```bash
npm run lint -- --fix
npm run format
```
