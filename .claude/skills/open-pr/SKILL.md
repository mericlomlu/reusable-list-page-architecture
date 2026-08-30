---
name: open-pr
description: Pushes a completed feature branch and opens a structured pull request to main. Use after verified commits when asked to deliver work through a PR.
---

# Open pull request

1. Read `.claude/rules/git-workflow.md`.
2. Verify a clean task diff, valid non-main branch, completed checks, and at least one commit ahead of `origin/main`.
3. Inspect `git log --oneline origin/main..HEAD` and `git diff --stat origin/main...HEAD`.
4. Push only the current branch with upstream tracking. Never force-push.
5. Create a PR to `main` using a Conventional Commit-style title.
6. Use the repository PR template and complete Summary, Why, Changes, Verification, Screenshots, and Notes.
7. Do not invent issue links, metrics, reviewers, labels, or deployment URLs.
8. Do not merge or enable auto-merge.
9. Return the PR URL, title, branch, commits, checks run, and any follow-up needed.
