---
name: add-example-page
description: Adds a Components, Issues, Deployments, or Packages example using the shared list architecture and a mock Route Handler. Use when implementing or extending an example route.
---

# Add example page

1. Read the route's approved feature list and design state.
2. Define page-owned item, filter, sort, and response types.
3. Add fictional mock records without private or real-world identifying data.
4. Implement the Route Handler with typed parsing, filtering, sorting, and pagination.
5. Configure shared list behavior and implement a page-owned item renderer.
6. Preserve URL state across refresh and browser navigation.
7. Cover loading, empty, filtered-empty, error, mobile, and dark-mode states.
8. Apply `.claude/rules/tailwind-readability.md` to any new or touched className strings.
9. Run Biome, TypeScript, build, and browser inspection.
