---
id: TRIAL-1
title: 'slugify: add a maxLength option that cuts at a word boundary'
status: Done
assignee: []
created_date: '2026-11-15'
labels:
  - enhancement
dependencies: []
references:
  - https://github.com/IslandJay/ai-sdlc-trial/issues/2
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
`slugify(text)` in `src/slug.js` has no length limit, so long titles produce very long slugs. Add an optional second argument, `slugify(text, { maxLength })`. Tracks GitHub issue #2.

Files to change: `src/slug.js` (the option) and `tests/slug.test.js` (new tests). No other files.

## Acceptance Criteria
- [x] #1 `slugify(text, { maxLength })` with a positive integer returns a slug of at most `maxLength` characters.
- [x] #2 The cut is made at the last hyphen within the limit when there is one, and the result never ends with a hyphen.
- [x] #3 When the first word alone is longer than `maxLength`, the result is that word cut to `maxLength` characters.
- [x] #4 Called without the option, `slugify` returns exactly what it returns today (the existing tests pass unchanged).
- [x] #5 A `maxLength` that is not a positive integer (0, a negative number, a non-integer, or a non-number) throws a `RangeError`.
- [x] #6 `tests/slug.test.js` has a test for each of #1 to #5, and `pnpm lint`, `pnpm format:check`, `pnpm build` and `pnpm test` pass.
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

## Summary
Added an optional `slugify(text, { maxLength })` option in `src/slug.js` and tests for it in `tests/slug.test.js`. The work is committed locally, but I could not push it or open a PR because a governance hook blocked the push.

## Changes
- src/slug.js
- tests/slug.test.js

## Design decisions
ENVIRONMENTAL FAILURE: the push was blocked, so there is no PR.

The commit is 008069a on branch ai-sdlc/trial-1-slugify-add-a-maxlength-option-that-cuts-at-a-word. It is already based on origin/main (e961d91), so the rebase was a no-op.

I tried the push three ways: `cd` and push in one command, `git -C &lt;worktree&gt; push`, and a lone `cd` call followed by a lone push. Each time the PreToolUse hook refused it. Its message (AISDLC-905 / AISDLC-798) says the hook saw the cwd as /private/tmp/aisdlc-trial/repo, not a direct child of .worktrees. It also says force-push needs the worktree bound to one task, by session task id, `.active-task`, or an executor claim. The shell cwd appears to reset to the main checkout between calls, and I did not try to get around the policy. An operator or the executor needs to run the push from a session rooted in the worktree: `git push --force-with-lease -u origin HEAD:refs/heads/ai-sdlc/trial-1-slugify-add-a-maxlength-option-that-cuts-at-a-word`, then `gh pr create --draft`. Suggested PR title: `feat(slug): add maxLength option that cuts at a word boundary (TRIAL-1)`.

The backlog file `backlog/tasks/trial-1 - slugify maxLength option.md` shows an unstaged change from `status: To Do` to `In Progress`. I did not make that change, did not stage it, and left it for the orchestrator. `git rebase` refuses to run with it unstaged, so you may need `--autostash` or to commit it.

How the code meets the ACs:
- **Cut rule:** if the slug is longer than `maxLength`, it cuts at `slug.lastIndexOf('-', maxLength)`. Searching up to index `maxLength` means a hyphen right after the limit keeps the whole-word prefix. If there is no hyphen, it hard-cuts to `maxLength` characters. The result never ends with a hyphen.
- **Invalid values:** anything other than a positive integer throws `RangeError`. That covers 0, negatives, non-integers, NaN, Infinity, strings, null, booleans and objects. An absent or `undefined` option is a no-op, so calls without it return exactly what they did before.
- **Tests:** there is one test per AC #1 to #5, and the 3 existing tests pass unchanged.
- **Verification:** `pnpm build`, `pnpm test` (8 of 8 pass), `pnpm lint` and `pnpm format:check` all passed locally.

## Verification
- `pnpm build` — passed (build: ok)
- `pnpm test` — passed (ℹ duration_ms 102.3259)
- `pnpm lint` — passed (lint: ok)
- `pnpm format:check` — passed (format: ok)
- 3 parallel reviews approved (; reviewer harness=codex (source: default))

## Follow-up
(none)

