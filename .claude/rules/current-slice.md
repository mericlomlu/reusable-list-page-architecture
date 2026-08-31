# Current slice: building-blocks-reference

## History

- Foundation and application shell slice merged via [PR #2](https://github.com/mericlomlu/reusable-list-page-architecture/pull/2) (`feat/foundation-shell`): foundation tokens, fonts, shadcn initialization, light/dark/system theme, root layout, responsive navigation, and route placeholders.
- Components example slice merged via [PR #3](https://github.com/mericlomlu/reusable-list-page-architecture/pull/3) (`feat/components-example`): reusable `ListPageShell` composition (`ListToolbar`, `FilterPanel`, `SortMenu`, `ViewSwitcher`, `ResultsView`, `PaginationControls`, `useListQueryState`), `/examples/components` with category, framework, and status filters, search, sort, list/grid views, `/api/components` Route Handler, and loading/empty/filtered-empty/error states.
- Issues example slice merged via [PR #4](https://github.com/mericlomlu/reusable-list-page-architecture/pull/4) (`feat/issues-example`): `/examples/issues` reusing the shared list-page architecture, accessible row selection with select-all and indeterminate state, `SelectionToolbar`, and `/api/issues` with server-side filtering, sorting, pagination, and demo-state parameters.
- Tailwind readability refactor merged via [PR #5](https://github.com/mericlomlu/reusable-list-page-architecture/pull/5) (`refactor/tailwind-readability`): grouped class-string constants, `cva` variants, and `tailwind-merge` text-token registration across existing components, with no visual or behavioral change.
- Deployments example slice merged via [PR #7](https://github.com/mericlomlu/reusable-list-page-architecture/pull/7) (`feat/deployments-example`): `/examples/deployments` reusing the shared list-page architecture, deployment status presentation with icon/shape plus text, `/api/deployments` with filtering, sorting, pagination, and demo-state parameters, and a shared `useDemoErrorRecovery` hook extracted from the third consumer.
- Packages example slice merged via [PR #8](https://github.com/mericlomlu/reusable-list-page-architecture/pull/8) (`feat/packages-example`): `/examples/packages` as the fourth reusable vertical slice, package-specific config, types, mock data, query service, and renderers under `src/features/packages-example/`, and `/api/packages` sharing the reusable query service.
- Templates reference slice merged via [PR #9](https://github.com/mericlomlu/reusable-list-page-architecture/pull/9) (`feat/templates-reference`): `/reference/templates` as a static presentation page documenting the shared list-page composition layers, with content verified against `src/features/list-page/`.

## Confirmed

- Product name: Reusable List Page Architecture.
- Description: An interactive showcase of reusable list page patterns built with Next.js and TypeScript.
- Routes, example pages, reference pages, English-only scope, mock Route Handlers, Tailwind CSS 4, shadcn/ui, and system-aware themes are approved.
- Automated tests and Storybook are out of scope.
- Claude Design project `4c198e3c-2f83-4913-8542-ef4f8333439f` is approved as the visual source.
- The warm bone/graphite/coral direction, Manrope + IBM Plex Mono pairing, sidebar shell, long list records, design tokens, icon concept, and responsive notes are approved.
- The reusable list-page architecture from components-example (`src/features/list-page/`), proven again by issues-example, deployments-example, and packages-example, is approved as the shared foundation for further examples.
- The shared `useDemoErrorRecovery` hook, extracted from Components, Issues, and Deployments, is approved for reuse by further examples.

## Implement now

- Import `Building Blocks.dc.html` from the approved Claude Design project as the visual and content reference for `/reference/building-blocks`.
- `/reference/building-blocks` as an English-only, static presentation/reference page documenting the project's actual reusable primitives (components, hooks, functions, types) rather than the composition layers already covered by `/reference/templates`.
- Every documented block name, prop, type, and behavior claim must match the current repository implementation (`src/features/list-page/`) exactly. Do not document components or capabilities that do not exist.
- Group real exports into concise categories (structure/results, query/navigation, search/filters/sorting/views, pagination/active filters, selection/bulk actions, loading/empty/error/demo-state recovery).
- Accurately describe server/client boundaries and primary consumers for each block.
- Accessible labels for visual previews, semantic headings/sections/lists/figures/captions, and native `<pre><code>` blocks for any code samples (no syntax-highlighting library).
- Reuse Templates presentation components only where an exact shared presentation pattern is proven; otherwise keep new reference-only components scoped to a clearly named shared reference feature.

## Do not combine yet

- Architecture receives a later scoped slice.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Final Overview content is out of scope.
- Vercel linking and deployment happen only after the local build is complete.

When building-blocks-reference is merged, update this file to the next scoped slice.
