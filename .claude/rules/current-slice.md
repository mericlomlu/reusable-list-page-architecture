# Current slice: foundation and application shell

## Confirmed

- Product name: Reusable List Page Architecture.
- Description: An interactive showcase of reusable list page patterns built with Next.js and TypeScript.
- Routes, example pages, reference pages, English-only scope, mock Route Handlers, Tailwind CSS 4, shadcn/ui, and system-aware themes are approved.
- Automated tests and Storybook are out of scope.
- Claude Design project `4c198e3c-2f83-4913-8542-ef4f8333439f` is approved as the visual source.
- The warm bone/graphite/coral direction, Manrope + IBM Plex Mono pairing, sidebar shell, long list records, design tokens, icon concept, and responsive notes are approved.

## Implement now

- Foundation tokens and fonts from `Design System.dc.html` using `next/font`.
- shadcn initialization and only the primitives required by the shell and Components slice.
- Light/dark/system theme foundation.
- Semantic root layout, responsive sidebar/mobile navigation, and shared page container.
- Route placeholders needed to make navigation valid, without prematurely implementing later pages.
- Overview shell only when required to validate navigation; do not complete all route content in this slice.

## Do not combine yet

- Components list architecture and Route Handler belong to the next slice.
- Issues, Deployments, Packages, Templates, Building Blocks, and Architecture each receive later scoped slices.
- Favicon, OG assets, metadata, sitemap, manifest, and structured data are a dedicated metadata slice.
- Vercel linking and deployment happen only after the local build is complete.

When foundation and shell are merged, update this file to `components-example`.
