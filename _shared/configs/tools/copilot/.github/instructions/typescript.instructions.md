---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Guidelines

## Type Safety

- Enable strict mode
- No `any` types (use `unknown`)
- Define interfaces for objects
- Use type guards
- Explicit return types

## Patterns

- Async/await for async operations
- Early returns for guards
- Const by default
- Destructuring

## Naming

- Files: kebab-case
- Classes: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: IPrefix or no prefix

## Documentation

- JSDoc for public functions
- Include @param and @returns
- Document exceptions
