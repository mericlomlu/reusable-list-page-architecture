---
name: scaffold-list-feature
description: Scaffolds or extends the shared reusable list-page feature with typed, composable building blocks. Use when creating ListPageShell, toolbar, filters, sorting, results, selection, pagination, query state, or list states.
---

# Scaffold list feature

1. Search for an existing primitive or behavior before creating a new one.
2. Keep reusable code in `src/features/list-page/`; keep domain rendering outside it.
3. Define the smallest typed contract required by at least two consumers.
4. Prefer composition over optional-prop expansion and stringly typed variant switches.
5. Keep URL parsing/serialization separate from visual controls.
6. Use semantic elements and shadcn primitives where they improve behavior and accessibility.
7. Default to Server Components; isolate interaction in small Client Components.
8. Add loading, empty, error, disabled, and responsive behavior appropriate to the component.
9. Run Biome and TypeScript and report the consumers proving reuse.
