# Architecture

- Use Next.js App Router. Keep routes explicit and English-only.
- Server Components fetch initial data; interactive controls are focused Client Components.
- Reusable behavior lives under `src/features/list-page/`. Example-specific config, types, and renderers live under their own feature folders.
- URL search parameters own shareable list state. Parse unknown input into typed defaults at one boundary.
- Route Handlers expose mock list endpoints with search, filters, sorting, pagination, and controlled demo states.
- Prefer composition and typed contracts over a universal component with dozens of optional props.
- A reusable abstraction must have at least two real consumers or a clear immediate second consumer.
- Keep domain-specific fields out of the reusable core. Render items through page-owned components.
- Do not add authentication, persistence, a database, external services, or production backend patterns.
