# Claude Design import source

The approved editable source is hosted in Claude Design:

<https://claude.ai/design/p/4c198e3c-2f83-4913-8542-ef4f8333439f?file=Components.dc.html>

MCP endpoint:

<https://api.anthropic.com/v1/design/mcp>

## Required Claude Code sequence

1. Run `/design-login` if the current Claude Code session is not authenticated.
2. Use the `claude_design` MCP to import the project.
3. Read `Design System.dc.html` first for shared tokens, typography, theme, responsive rules, component inventory, favicon, OG, and metadata direction.
4. Read `support.js` once when establishing a new design session. It is a design runtime dependency, not production application code.
5. Read only the route file required by the active implementation slice.
6. Treat `.dc.html` files as design-reference inputs. Do not copy their inline HTML, inline styles, support runtime, or repeated sidebar markup into production.

## Design file map

- `Design System.dc.html` — shared visual system and public-asset direction
- `Overview.dc.html` — `/`
- `Components.dc.html` — `/examples/components`
- `Issues.dc.html` — `/examples/issues`
- `Deployments.dc.html` — `/examples/deployments`
- `Packages.dc.html` — `/examples/packages`
- `Templates.dc.html` — `/reference/templates`
- `Building Blocks.dc.html` — `/reference/building-blocks`
- `Architecture.dc.html` — `/reference/architecture`

## Repository overrides

Repository rules and verified project facts override design copy.

- Do not use `reusable-list-architecture.dev`; the production URL is unknown until Vercel deployment.
- Do not add `WebSite.potentialAction` or `SearchAction`; there is no site-wide search.
- Replace “five different list pages” with “multiple list pages” where it describes the problem.
- Use `next/font` for Manrope and IBM Plex Mono rather than Google Fonts `<link>` tags.
- Use semantic React components, Tailwind CSS 4 tokens, and owned shadcn primitives rather than design HTML.
- The private legacy ListLayout remains behavioral reference only and is never an implementation source.

## Source priority

1. Repository scope, clean-room, accessibility, React, and architecture rules
2. Approved Claude Design source
3. Existing implementation when it already satisfies both

Do not read the ZIP export as an implementation source. The live Claude Design project is the maintained visual handoff.
