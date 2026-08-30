# Design system

- The approved Claude Design project documented in `docs/design/claude-design-import.md` is the visual source of truth.
- Read `Design System.dc.html` for tokens and shared decisions, then only the route file required by the active slice. Read `support.js` once per new imported design session.
- Treat imported `.dc.html` files as design references, not production HTML or React source. Recreate the design semantically with project components and tokens.
- Use Tailwind CSS 4 theme variables for color, typography, spacing, radius, border, shadow, and motion decisions.
- shadcn/ui source is owned and customizable. Use its primitives for behavior and accessibility, then align them to the approved design.
- Avoid the default shadcn, PrimeNG, Material, Bootstrap, generic docs, and generic SaaS dashboard appearance.
- Current direction: warm bone light theme, warm graphite dark theme, near-black text, restrained coral accent, long horizontal list records, low visual noise, subtle borders, little or no shadow.
- Do not use gradients, glassmorphism, excessive pills, nested preview cards, decorative icon repetition, or cold SaaS blue.
- Support light, dark, and system preference. System is the default.
- Keep visual and interaction tokens centralized; do not repeat arbitrary Tailwind values across features.
- Repository rules override design copy where they conflict. Do not use the invented `reusable-list-architecture.dev` domain, do not add a site-search `SearchAction`, and use “multiple list pages” rather than “five different list pages.”
