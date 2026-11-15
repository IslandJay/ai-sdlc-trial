---
id: TRIAL-1
title: 'slugify: add a maxLength option that cuts at a word boundary'
status: To Do
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
- [ ] #1 `slugify(text, { maxLength })` with a positive integer returns a slug of at most `maxLength` characters.
- [ ] #2 The cut is made at the last hyphen within the limit when there is one, and the result never ends with a hyphen.
- [ ] #3 When the first word alone is longer than `maxLength`, the result is that word cut to `maxLength` characters.
- [ ] #4 Called without the option, `slugify` returns exactly what it returns today (the existing tests pass unchanged).
- [ ] #5 A `maxLength` that is not a positive integer (0, a negative number, a non-integer, or a non-number) throws a `RangeError`.
- [ ] #6 `tests/slug.test.js` has a test for each of #1 to #5, and `pnpm lint`, `pnpm format:check`, `pnpm build` and `pnpm test` pass.
<!-- SECTION:DESCRIPTION:END -->
