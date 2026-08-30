# Git workflow

## Branches

- `main` is the protected base and release branch.
- Before implementation, inspect status and fetch remote state. Do not discard local work.
- Create a branch from current `origin/main` unless the owner explicitly names another starting point.
- Branch format: `<type>/<kebab-case>`.
- Allowed types: `feat`, `fix`, `refactor`, `perf`, `docs`, `style`, `test`, `build`, `ci`, `chore`, `revert`.
- Examples: `feat/add-components-list`, `fix/preserve-filter-state`, `docs/explain-query-flow`.
- Do not create vague branches such as `changes`, `updates`, `work`, or `claude`.

## Commits

- Use Conventional Commits: `<type>(optional-scope): <imperative summary>`.
- Keep the subject lowercase, concise, imperative, and without a trailing period.
- Use `feat` for user-visible capability, `fix` for defects, `refactor` for behavior-preserving structure, `docs` for documentation, and `chore` for maintenance.
- Add a body when the reason, trade-off, migration, or limitation is not obvious from the diff.
- Use `!` and a `BREAKING CHANGE:` footer only for a real incompatible change.
- Do not mix unrelated concerns. Prefer one coherent commit per completed slice, not one commit per file.
- Stage explicit files. Never use broad staging when unrelated working-tree changes exist.
- Never add generated build output, secrets, local IDE state, or unrelated lockfile changes.

## Delivery

- Run the completion gate before the final commit.
- Review the staged diff and commit message before committing.
- Push with upstream tracking only for the current feature branch.
- Open a PR to `main` with a Conventional Commit-style title.
- PR body sections: Summary, Why, Changes, Verification, Screenshots, Notes.
- Mark Screenshots as `N/A` only when the change has no visual effect.
- Link issues only when a real issue number exists. Never invent one.
- Do not merge, auto-merge, force-push, delete branches, or close PRs without explicit approval.
- If checks fail after push, fix them in a new commit unless the owner explicitly approves history rewriting.
