---
name: implement-slice
description: Implements one approved project slice from the current design handoff and repository rules. Use when asked to build a named foundation, route, example, reference page, system state, or metadata slice.
---

# Implement slice

1. Read `CLAUDE.md`, `.claude/rules/current-slice.md`, and the rules relevant to the named slice.
2. Inspect existing code and the matching approved design state before editing.
3. State the slice boundary, reusable pieces, page-specific pieces, server/client boundary, responsive behavior, and unresolved decisions.
4. Implement only the named slice and required shared primitives.
5. Do not invent missing design, copy, URLs, assets, or API behavior.
6. Before the completion gate, review touched className strings against `.claude/rules/tailwind-readability.md`: no unnecessary abstraction, no excessively long inline expressions.
7. Run Biome and TypeScript. Run the production build for a completed route.
8. Inspect relevant desktop, tablet, and mobile states in the browser.
9. Report changed files, verification, assumptions, and remaining work.
