# Current slice: deployments-example

## History

- Foundation and application shell slice merged via [PR #2](https://github.com/mericlomlu/reusable-list-page-architecture/pull/2) (`feat/foundation-shell`): foundation tokens, fonts, shadcn initialization, light/dark/system theme, root layout, responsive navigation, and route placeholders.
- Components example slice merged via [PR #3](https://github.com/mericlomlu/reusable-list-page-architecture/pull/3) (`feat/components-example`): reusable `ListPageShell` composition (`ListToolbar`, `FilterPanel`, `SortMenu`, `ViewSwitcher`, `ResultsView`, `PaginationControls`, `useListQueryState`), `/examples/components` with category, framework, and status filters, search, sort, list/grid views, `/api/components` Route Handler, and loading/empty/filtered-empty/error states.
- Issues example slice merged via [PR #4](https://github.com/mericlomlu/reusable-list-page-architecture/pull/4) (`feat/issues-example`): `/examples/issues` reusing the shared list-page architecture, accessible row selection with select-all and indeterminate state, `SelectionToolbar`, and `/api/issues` with server-side filtering, sorting, pagination, and demo-state parameters.
- Tailwind readability refactor merged via [PR #5](https://github.com/mericlomlu/reusable-list-page-architecture/pull/5) (`refactor/tailwind-readability`): grouped class-string constants, `cva` variants, and `tailwind-merge` text-token registration across existing components, with no visual or behavioral change.

## Confirmed

- Product name: Reusable List Page Architecture.
- Description: An interactive showcase of reusable list page patterns built with Next.js and TypeScript.
- Routes, example pages, reference pages, English-only scope, mock Route Handlers, Tailwind CSS 4, shadcn/ui, and system-aware themes are approved.
- Automated tests and Storybook are out of scope.
- Claude Design project `4c198e3c-2f83-4913-8542-ef4f8333439f` is approved as the visual source.
- The warm bone/graphite/coral direction, Manrope + IBM Plex Mono pairing, sidebar shell, long list records, design tokens, icon concept, and responsive notes are approved.
- The reusable list-page architecture from components-example (`src/features/list-page/`), proven again by issues-example, is approved as the shared foundation for further examples.

## Implement now

- Import `Deployments.dc.html` from the approved Claude Design project as the visual and behavioral reference for `/examples/deployments`.
- `/examples/deployments` as the third reusable vertical slice, reusing `src/features/list-page/` and adding deployment-specific config, types, mock data, query service, toolbar composition, and renderers under `src/features/deployments-example/`.
- The approved long deployment-record presentation and responsive grid alternative, with status represented by icon/shape or text as well as color.
- `/api/deployments` Route Handler with deployment-specific filtering, sorting, pagination, controlled latency, and explicit demo-state parameters, sharing the same reusable query service as the Server Component.
- Loading, empty, filtered-empty, and error-with-retry states, plus mixed/in-progress/failed/ready deployment status presentation.
- Fictional English mock deployment data.
- A shared recovery hook or component only if Components, Issues, and Deployments repeat the exact same error-boundary recovery behavior (the third consumer proving it), preserving the proven Next.js `retry()` and simulated `demoState` recovery pattern.

## Do not combine yet

- Packages, Templates, Building Blocks, and Architecture each receive later scoped slices.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Final Overview content is out of scope.
- Vercel linking and deployment happen only after the local build is complete.

When deployments-example is merged, update this file to the next scoped slice.
