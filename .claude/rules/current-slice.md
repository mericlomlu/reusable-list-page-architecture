# Current slice: templates-reference

## History

- Foundation and application shell slice merged via [PR #2](https://github.com/mericlomlu/reusable-list-page-architecture/pull/2) (`feat/foundation-shell`): foundation tokens, fonts, shadcn initialization, light/dark/system theme, root layout, responsive navigation, and route placeholders.
- Components example slice merged via [PR #3](https://github.com/mericlomlu/reusable-list-page-architecture/pull/3) (`feat/components-example`): reusable `ListPageShell` composition (`ListToolbar`, `FilterPanel`, `SortMenu`, `ViewSwitcher`, `ResultsView`, `PaginationControls`, `useListQueryState`), `/examples/components` with category, framework, and status filters, search, sort, list/grid views, `/api/components` Route Handler, and loading/empty/filtered-empty/error states.
- Issues example slice merged via [PR #4](https://github.com/mericlomlu/reusable-list-page-architecture/pull/4) (`feat/issues-example`): `/examples/issues` reusing the shared list-page architecture, accessible row selection with select-all and indeterminate state, `SelectionToolbar`, and `/api/issues` with server-side filtering, sorting, pagination, and demo-state parameters.
- Tailwind readability refactor merged via [PR #5](https://github.com/mericlomlu/reusable-list-page-architecture/pull/5) (`refactor/tailwind-readability`): grouped class-string constants, `cva` variants, and `tailwind-merge` text-token registration across existing components, with no visual or behavioral change.
- Deployments example slice merged via [PR #7](https://github.com/mericlomlu/reusable-list-page-architecture/pull/7) (`feat/deployments-example`): `/examples/deployments` reusing the shared list-page architecture, deployment status presentation with icon/shape plus text, `/api/deployments` with filtering, sorting, pagination, and demo-state parameters, and a shared `useDemoErrorRecovery` hook extracted from the third consumer.
- Packages example slice merged via [PR #8](https://github.com/mericlomlu/reusable-list-page-architecture/pull/8) (`feat/packages-example`): `/examples/packages` as the fourth reusable vertical slice, package-specific config, types, mock data, query service, and renderers under `src/features/packages-example/`, and `/api/packages` sharing the reusable query service.

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

- Import `Templates.dc.html` from the approved Claude Design project as the visual and content reference for `/reference/templates`.
- `/reference/templates` as an English-only, static presentation/reference page explaining the project's actual reusable list-page templates and composition patterns.
- Every documented template name, prop, type, and architectural claim must match the current repository implementation (`src/features/list-page/`) exactly. Do not document components or capabilities that do not exist.
- Concise presentation-oriented sections showing how reusable structure and page-specific configuration fit together, with short code samples based on this project's own APIs.
- Accessible labels for visual template previews, semantic headings/sections/lists/figures/captions, and native `<pre><code>` blocks for any code samples (no syntax-highlighting library).
- Reused presentation components only where a repeated pattern is evident; do not over-generalize before Building Blocks or Architecture exist as second consumers.

## Do not combine yet

- Building Blocks and Architecture each receive later scoped slices.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Final Overview content is out of scope.
- Vercel linking and deployment happen only after the local build is complete.

When templates-reference is merged, update this file to the next scoped slice.
