# Reusable List Page Architecture

Public frontend architecture showcase built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui primitives, Route Handlers, and mock data.

## Before editing

1. Read the rules relevant to the active task in `.claude/rules/`.
2. Inspect the existing implementation before replacing or adding abstractions.
3. Follow `docs/design/claude-design-import.md` and inspect the matching Claude Design files for the active slice.
4. Read the installed Next.js documentation under `node_modules/next/dist/docs/` for APIs that may have changed.

## Product map

- `/` — Overview
- `/examples/components`
- `/examples/issues`
- `/examples/deployments`
- `/examples/packages`
- `/reference/templates`
- `/reference/building-blocks`
- `/reference/architecture`
- `/api/components`, `/api/issues`, `/api/deployments`, `/api/packages`

The interface is English-only. The demo context is a fictional Developer Workspace.

## Non-negotiable

- Clean-room implementation. Use the private legacy ListLayout only as behavioral reference. Never copy its source, names, company packages, domain models, service contracts, data, or visual design.
- Server Components by default. Add `"use client"` only for browser interaction and keep client boundaries narrow.
- URL search parameters are the shareable source of truth for search, filters, sorting, view, and pagination.
- Compose focused building blocks instead of creating a monolithic universal list component.
- Use strict TypeScript. No `any`, unsafe casts, array-index keys, mutated state, or duplicated domain models.
- Use semantic HTML5 and accessible native behavior. WCAG AA, keyboard support, visible focus, and reduced motion are requirements.
- Use Tailwind CSS 4 theme tokens and CSS variables. shadcn/ui provides owned source primitives, not the final visual identity.
- English only. No locale routes, language switch, translation library, or i18n abstraction.
- Mock Route Handlers only. Do not add a database, authentication, analytics, external API, or backend service without explicit approval.
- No automated test, Storybook, or E2E setup unless explicitly requested. Verification requires Biome, TypeScript, production build, and browser inspection.
- Do not update dependencies, initialize shadcn, or change deployment/environment configuration without an explicit task.
- Prefer self-explanatory source over comments. Comments are reserved for non-obvious constraints that cannot be expressed in names or types.

## Architecture vocabulary

- `ListPageShell`
- `ListToolbar`
- `FilterPanel`
- `SortMenu`
- `ViewSwitcher`
- `ResultsView`
- `SelectionToolbar`
- `PaginationControls`
- `ListPageState`
- `ListPageConfig`
- `useListQueryState`

These names are starting points, not permission to force an abstraction that does not fit.

## Completion gate

Before finishing implementation work:

1. Run Biome on touched files.
2. Run `npx tsc --noEmit`.
3. Run `yarn build` for completed slices.
4. Inspect affected routes at desktop, tablet, and mobile widths.
5. Verify keyboard navigation, focus, loading, empty, error, and dark-mode behavior where relevant.
6. Report assumptions, unresolved design decisions, and files changed.

Use `.claude/skills/implement-slice` for scoped implementation. Reviewer agents report findings but do not edit code.

## Git delivery

- `main` is the protected integration and release branch. Never commit directly to it unless the owner explicitly requests that exact action.
- Start implementation from an up-to-date `main` and create `<type>/<kebab-case>` branches.
- Use Conventional Commits and keep commits small, coherent, and limited to files changed for the active task.
- For implementation tasks, the default delivery is: complete the slice, pass the completion gate, commit, push the feature branch, and open a PR to `main`. Stop earlier only when the owner asks for local changes or review without delivery.
- Never force-push, rewrite shared history, amend a published commit, merge a PR, delete a branch, or include unrelated working-tree changes without explicit approval.
- Follow `.claude/rules/git-workflow.md`, `.claude/skills/commit-changes`, and `.claude/skills/open-pr`.
