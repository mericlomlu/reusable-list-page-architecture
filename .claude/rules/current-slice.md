# Current slice: components-example

## History

- Foundation and application shell slice merged via [PR #2](https://github.com/mericlomlu/reusable-list-page-architecture/pull/2) (`feat/foundation-shell`): foundation tokens, fonts, shadcn initialization, light/dark/system theme, root layout, responsive navigation, and route placeholders.

## Confirmed

- Product name: Reusable List Page Architecture.
- Description: An interactive showcase of reusable list page patterns built with Next.js and TypeScript.
- Routes, example pages, reference pages, English-only scope, mock Route Handlers, Tailwind CSS 4, shadcn/ui, and system-aware themes are approved.
- Automated tests and Storybook are out of scope.
- Claude Design project `4c198e3c-2f83-4913-8542-ef4f8333439f` is approved as the visual source.
- The warm bone/graphite/coral direction, Manrope + IBM Plex Mono pairing, sidebar shell, long list records, design tokens, icon concept, and responsive notes are approved.

## Implement now

- Import `Components.dc.html` from the approved Claude Design project as the visual and behavioral reference for `/examples/components`.
- Typed `ListPageShell` composition and the reusable list-page feature: `ListToolbar`, `FilterPanel`, `SortMenu`, `ViewSwitcher`, `ResultsView`, `PaginationControls`, `useListQueryState`.
- `/examples/components` as the first reusable vertical slice, with category, framework, and status filters, search, sort, and list/grid views.
- `/api/components` Route Handler with server-side filtering, sorting, pagination, controlled latency, and explicit demo-state query parameters.
- Loading, empty, filtered-empty, and error-with-retry states.
- Fictional English mock component data.

## Do not combine yet

- Issues, Deployments, Packages, Templates, Building Blocks, and Architecture each receive later scoped slices.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Final Overview content is out of scope.
- Vercel linking and deployment happen only after the local build is complete.

When components-example is merged, update this file to the next scoped slice.
