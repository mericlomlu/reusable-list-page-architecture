# Claude Code setup and implementation workflow

Open Claude Code at the repository root.

## 0. Authenticate to Claude Design

```text
/design-login
```

Then use the prompts below one at a time. Review the diff and running result after each implementation slice before continuing.

## 1. Read-only reconnaissance

```text
Do not edit files, install packages, create a branch, commit, push, or open a PR.

Read CLAUDE.md, .claude/CLAUDE.md, every file in .claude/rules/, and docs/design/claude-design-import.md. Initialize the Next.js development context and read the relevant installed Next.js 16 documentation.

Use the claude_design MCP at https://api.anthropic.com/v1/design/mcp to import:
https://claude.ai/design/p/4c198e3c-2f83-4913-8542-ef4f8333439f?file=Components.dc.html

Read Design System.dc.html, Components.dc.html, and support.js. Treat them as design reference only.

Inspect the repository and report concisely:
1. current stack, scripts, package-manager state, App Router structure, Tailwind and Biome setup;
2. conflicts between the starter code, repository rules, and approved design;
3. exact dependencies required for the foundation and Components slices, with a reason for each;
4. proposed target file tree;
5. the smallest safe sequence of implementation slices;
6. unresolved decisions or risks.

Apply the repository overrides from docs/design/claude-design-import.md. End without changing files.
```

## 2. Foundation and application shell

```text
Implement only the current `foundation and application shell` slice defined in .claude/rules/current-slice.md.

First create a `feat/foundation-shell` branch from current origin/main without discarding or staging unrelated owner changes. Import the approved Claude Design project as documented. Read Design System.dc.html, the shared sidebar/shell portions of Components.dc.html, and support.js only if it has not already been read in this design session.

Implement:
- Tailwind CSS 4 design tokens for approved light and dark themes;
- Manrope and IBM Plex Mono with next/font;
- light/dark/system theme behavior with system as default and no flash;
- semantic root layout;
- responsive desktop sidebar and mobile navigation drawer;
- shared page container and route-aware navigation;
- minimal route placeholders needed for valid navigation.

Initialize shadcn/ui only if required, using current CLI guidance and installing only primitives needed by this slice. Customize all primitives to the approved design. Do not implement Components data, list behavior, mock Route Handlers, later pages, metadata assets, or Vercel configuration.

Follow React, accessibility, Tailwind, clean-room, and Git workflow rules. Run Biome, TypeScript, build, and browser checks at desktop, tablet, mobile, light, and dark. Use the code-reviewer and architecture-reviewer agents. Fix confirmed findings.

After checks pass, create a scoped Conventional Commit, push the branch, and open a PR to main using the repository template. Do not merge it. Return the PR URL and verification summary.
```

## 3. Components example

Run after the foundation PR is merged and local `main` is updated.

```text
Update .claude/rules/current-slice.md to `components-example`, preserving completed-slice history concisely. Implement only `/examples/components` from the approved Claude Design.

Create `feat/components-example` from current origin/main. Import the design project and read Components.dc.html plus the relevant tokens from Design System.dc.html. Do not treat the design HTML as production code.

Implement the first reusable vertical slice:
- typed ListPageShell composition;
- ListToolbar with search, category, framework, status, sort, and view controls;
- useListQueryState with readable URL parameters and typed defaults;
- ResultsView with the approved long-list default and grid alternative;
- PaginationControls;
- loading, empty, filtered-empty, and error states;
- `/api/components` Route Handler with fictional mock data, filtering, sorting, pagination, controlled latency, and explicit demo states;
- responsive and accessible behavior shown in Components.dc.html.

Keep Components-specific types, config, records, and item renderers outside the reusable list-page core. Do not implement Issues, Deployments, Packages, reference pages, metadata assets, or Vercel deployment.

Run Biome, TypeScript, build, browser inspection, accessibility review, responsive review, visual review, code-reviewer, and architecture-reviewer. Fix confirmed findings.

After checks pass, commit with Conventional Commits, push, and open a PR to main. Do not merge it. Return the PR URL, screenshots/checks summary, and remaining slices.
```

## Later slices

Continue one PR at a time:

1. Issues example and selection/bulk actions
2. Deployments example and worked system states
3. Packages example
4. Templates
5. Building Blocks
6. Architecture and Overview
7. Metadata, favicon, manifest, OG, sitemap, robots, and structured data
8. Final accessibility, responsive, performance, and visual review
9. Vercel deployment and production metadataBase update

Do not combine these into one oversized PR.
