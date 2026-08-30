---
name: commit-changes
description: Creates a safe, scoped Conventional Commit after an implementation slice passes verification. Use when asked to commit completed work or carry a task through Git delivery.
---

# Commit changes

1. Read `.claude/rules/git-workflow.md`.
2. Run `git status --short`, inspect the full diff, and identify unrelated owner changes.
3. Confirm the branch is not `main`. If it is, create an approved `<type>/<kebab-case>` branch before staging.
4. Validate the branch with `node .claude/hooks/branch-name-guard.js`.
5. Run the slice completion gate. Do not commit failing work unless the owner explicitly asks for a checkpoint commit.
6. Stage only explicit task files. Never stage unrelated `.idea`, environment, generated, or lockfile changes.
7. Review `git diff --staged`.
8. Write a Conventional Commit subject and validate it with `node .claude/hooks/commit-message-guard.js "<subject>"`.
9. Commit once. Do not amend an existing commit unless explicitly approved.
10. Report commit hash, subject, verification, and remaining uncommitted files.
