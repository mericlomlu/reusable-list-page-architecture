# Current slice: issues-example

## History

- Foundation and application shell slice merged via [PR #2](https://github.com/mericlomlu/reusable-list-page-architecture/pull/2) (`feat/foundation-shell`): foundation tokens, fonts, shadcn initialization, light/dark/system theme, root layout, responsive navigation, and route placeholders.
- Components example slice merged via [PR #3](https://github.com/mericlomlu/reusable-list-page-architecture/pull/3) (`feat/components-example`): reusable `ListPageShell` composition (`ListToolbar`, `FilterPanel`, `SortMenu`, `ViewSwitcher`, `ResultsView`, `PaginationControls`, `useListQueryState`), `/examples/components` with category, framework, and status filters, search, sort, list/grid views, `/api/components` Route Handler, and loading/empty/filtered-empty/error states.

## Confirmed

- Product name: Reusable List Page Architecture.
- Description: An interactive showcase of reusable list page patterns built with Next.js and TypeScript.
- Routes, example pages, reference pages, English-only scope, mock Route Handlers, Tailwind CSS 4, shadcn/ui, and system-aware themes are approved.
- Automated tests and Storybook are out of scope.
- Claude Design project `4c198e3c-2f83-4913-8542-ef4f8333439f` is approved as the visual source.
- The warm bone/graphite/coral direction, Manrope + IBM Plex Mono pairing, sidebar shell, long list records, design tokens, icon concept, and responsive notes are approved.
- The reusable list-page architecture from components-example (`src/features/list-page/`) is approved as the shared foundation for further examples.

## Implement now

- Import `Issues.dc.html` from the approved Claude Design project as the visual and behavioral reference for `/examples/issues`.
- `/examples/issues` as the second reusable vertical slice, reusing `src/features/list-page/` and adding Issues-specific config, types, mock data, and renderers under `src/features/issues-example/`.
- Accessible row selection: single-row selection, select-all for the currently visible page, and clear partial/full/indeterminate selection states.
- A reusable `SelectionToolbar` shown only when records are selected, with demo-only bulk actions.
- `/api/issues` Route Handler with server-side filtering, sorting, pagination, controlled latency, demo-state query parameters, and a narrowly scoped mock bulk-action endpoint.
- Loading, empty, filtered-empty, and error-with-retry states.
- Fictional English mock issue data.

## Do not combine yet

- Deployments, Packages, Templates, Building Blocks, and Architecture each receive later scoped slices.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Final Overview content is out of scope.
- Vercel linking and deployment happen only after the local build is complete.

When issues-example is merged, update this file to the next scoped slice.
