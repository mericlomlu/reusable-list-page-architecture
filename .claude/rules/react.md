# React and Next.js

- Function components only. Hooks run at the top level and only in components or custom hooks.
- Derive values during render. Do not mirror props, URL parameters, or query results into state without a real draft-state requirement.
- Effects synchronize with external systems only. Put user-triggered work in event handlers.
- Never mutate state. Use functional updates when the next value depends on the previous value.
- Use stable data IDs as keys, never array indices for dynamic lists.
- Do not add manual memoization without measured or structurally clear value. React Compiler is enabled.
- Keep components outside other component bodies. Keep props serializable across Server/Client boundaries.
- Use direct imports and avoid broad barrel files in frequently rendered code.
- Use `next/image`, `next/font`, Metadata APIs, and current async App Router APIs correctly.
- Add Suspense and error boundaries around meaningful async regions, not every component.
