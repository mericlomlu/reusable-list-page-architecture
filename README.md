# Reusable List Page Architecture

An interactive showcase of reusable, URL-driven list-page patterns built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

[Live demo](https://reusable-list-page-architecture.vercel.app) · [Architecture](https://reusable-list-page-architecture.vercel.app/reference/architecture) · [Building Blocks](https://reusable-list-page-architecture.vercel.app/reference/building-blocks) · [Templates](https://reusable-list-page-architecture.vercel.app/reference/templates)

![Reusable List Page Architecture — one list-page system, four distinct product surfaces. Built with Next.js, React, TypeScript, and Tailwind CSS.](https://reusable-list-page-architecture.vercel.app/opengraph-image)

## TL;DR

This project demonstrates how search, filters, sorting, pagination, view switching, selection, and system states can be shared across different list pages without coupling the architecture to one domain.

Components, Issues, Deployments, and Packages reuse the same URL-driven core while keeping their records, query services, controls, and presentation feature-owned. Explore the [live demo](https://reusable-list-page-architecture.vercel.app) or read the [architecture reference](https://reusable-list-page-architecture.vercel.app/reference/architecture).

## Why this project exists

List-heavy product surfaces often duplicate URL-state and system-state logic, or over-generalize one component until it understands every domain. This project explores a middle path: a small shared architecture with intentionally feature-owned data and presentation, validated through four contrasting examples.

## Live examples

| Example | What it demonstrates | Link |
| --- | --- | --- |
| Components | Multi-select framework filter, category and status filters, sorting, pagination, list/grid views | [/examples/components](https://reusable-list-page-architecture.vercel.app/examples/components) |
| Issues | Semantic selectable table, row and page-scoped select-all, indeterminate selection, demo-only bulk status actions, failure recovery that preserves selection | [/examples/issues](https://reusable-list-page-architecture.vercel.app/examples/issues) |
| Deployments | Environment, branch, status, and date-range filters, deployment-specific status presentation, domain-specific relative-time formatting | [/examples/deployments](https://reusable-list-page-architecture.vercel.app/examples/deployments) |
| Packages | Dependency-type and update-status filters, package version ordering, list/grid rendering | [/examples/packages](https://reusable-list-page-architecture.vercel.app/examples/packages) |

## Architecture at a glance

```
URL search params → shared parser → page-owned query service → server-rendered results
```

- The URL is the shareable source of truth for search, filters, sort, view, and pagination.
- Server Components parse the URL and query the matching feature's data.
- Focused Client Components update URL state (toolbar controls) or manage temporary interaction state (selection).
- Each example page and its matching Route Handler are separate entry points into the same page-owned query service, which reads a feature-owned in-memory dataset and applies filtering, sorting, and pagination — the page never fetches its own Route Handler.

See [`/reference/architecture`](https://reusable-list-page-architecture.vercel.app/reference/architecture) for the full request-to-render walkthrough.

## Shared core vs. feature-owned code

| Shared core — `src/features/list-page/` | Feature-owned — `src/features/*-example/` |
| --- | --- |
| Query parsing and serialization (`query-state.ts`) | Types and mock records |
| Search, filter, sort, and view controls | Filter options and `ListQueryConfig` |
| Results layouts (list/grid) | Query service (filter, sort, paginate) |
| Pagination and active-filter display | Toolbar composition |
| Selection primitives (`use-selection`) | Rows, cards, and domain presentation |
| Loading, empty, and error states | Bulk behavior, where applicable |

Features compose the shared core without modifying it.

## URL-state behavior

- Search is debounced client-side, then committed with history **replacement** so keystrokes don't flood browser history.
- Filters, sort, view, and pagination are pushed as normal navigations and stay back/forward-navigable.
- An out-of-range page number redirects to the last valid page for the current query.
- Demo states are explicit, opt-in query parameters — normal URLs stay clean.
- Selection is deliberately kept out of the URL: it's ephemeral, per-view interaction state, not shareable list state.

## System states and demo parameters

Every example supports intentional loading, empty, and error states through the same page-owned query service used by its Server Component page and matching mock Route Handler. An explicit `demoState` query parameter selects the state:

- `?demoState=loading`
- `?demoState=empty`
- `?demoState=error`

Try it: [Components — loading](https://reusable-list-page-architecture.vercel.app/examples/components?demoState=loading) · [Issues — error](https://reusable-list-page-architecture.vercel.app/examples/issues?demoState=error)

Issues also exposes an independent `bulkDemoState=error` parameter to simulate a failed bulk status update ([Issues — bulk failure](https://reusable-list-page-architecture.vercel.app/examples/issues?bulkDemoState=error)) without affecting the list's own demo state. Nothing here is persisted — bulk status changes return a mock response, and the underlying dataset is unchanged on the next fetch.

## Accessibility and responsive behavior

- Semantic headings, landmarks, and a skip-to-content link.
- Visible `:focus-visible` treatment and fully keyboard-operable controls.
- Accessible mobile navigation drawer (focus trap, Escape to close, focus restoration) and a semantic, keyboard-navigable Issues table with select-all/indeterminate state.
- Labeled filters, search, and sort controls with announced result updates; status is never conveyed by color alone.
- Reduced-motion support, and responsive light/dark/system-theme layouts at desktop, tablet, and mobile widths.

This isn't a claim of formal WCAG certification — see [`/reference/building-blocks`](https://reusable-list-page-architecture.vercel.app/reference/building-blocks) for how individual primitives are built.

## Technology

- [Next.js](https://nextjs.org) App Router
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com) primitives
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Biome](https://biomejs.dev) for linting and formatting
- [Yarn](https://yarnpkg.com)
- Deployed on [Vercel](https://vercel.com)

## Project structure

```
src/
  app/                    Routes, Route Handlers, and file-based metadata
  components/             Shared layout shell and owned shadcn/ui primitives
  features/
    list-page/            Shared, reusable list-page core
    components-example/    Components vertical slice
    issues-example/        Issues vertical slice (selection + bulk actions)
    deployments-example/   Deployments vertical slice
    packages-example/      Packages vertical slice
    reference-ui/          Shared building blocks for the reference pages
  lib/                    Site config, metadata helpers, fonts, utilities
```

## Local development

This project uses Yarn.

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). No database, authentication, or external service is required — each page queries its feature-owned mock dataset through the same query service described above.

Quality checks:

```bash
yarn lint
npx tsc --noEmit
yarn build
```

## Deployment and metadata

The app is deployed on [Vercel](https://vercel.com) at [reusable-list-page-architecture.vercel.app](https://reusable-list-page-architecture.vercel.app), which is also configured as the metadata fallback (`NEXT_PUBLIC_SITE_URL` remains an optional override). Every route ships the essential discovery and social metadata — icons, an Open Graph image, a web app manifest, a sitemap, robots rules, canonical URLs, and `SoftwareSourceCode` structured data on the Overview page.

## Trade-offs

These are explicit scope decisions, not gaps to apologize for:

- All data is fictional and stored in feature-owned in-memory datasets. Server Component pages and mock Route Handlers reuse the same domain query functions; there is no database or persistence layer.
- There is no authentication.
- Automated tests and Storybook are intentionally outside this project's scope; verification is manual (Biome, TypeScript, production build, and browser inspection).
- Issues' select-all is scoped to the current page, not the full result set across pages.
- Bulk status changes are applied to local state only after the mock request succeeds (never optimistically, before confirmation), and reset once the page fetches fresh data — nothing is saved server-side.

## Author

Built by [Meriç Lomlu](https://github.com/mericlomlu).
