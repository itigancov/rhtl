# Timeline Testing Baseline PRD

## Problem Statement

The Timeline component is currently implemented as a single shadcn-style copy/paste React component, but the repository does not have a test suite. This makes it hard to distinguish intentional behavior from accidental implementation details before the component is documented for external copy/paste usage.

The project needs a small, reliable test baseline that protects the current public component API, validates layout behavior, and supports future TDD work without forcing the component to split into multiple runtime files.

## Solution

Add a Vitest and React Testing Library test baseline for the Timeline component.

The tests will be colocated with the component in the repository, but the distributed component will remain a single copy/paste file. Tests must exercise the same public component exports that users copy. Internal helpers will remain private and will not be exported only for testing.

The initial implementation will add stable `data-slot` attributes to the Timeline DOM parts. These slots become a light styling, debugging, and testing contract. Tests will assert behavior through public rendered output and these stable slots, rather than snapshotting broad Tailwind class strings or importing private layout helpers.

## User Stories

1. As a maintainer, I want a test runner configured, so that future Timeline changes can be verified automatically.
2. As a maintainer, I want React component tests, so that Timeline behavior is tested through realistic consumer usage.
3. As a maintainer, I want the first tests colocated with the component, so that the test intent is easy to find while editing the component.
4. As a maintainer, I want tests to import only public Timeline exports, so that tests match the copy/paste consumer surface.
5. As a maintainer, I want internal layout helpers to stay private, so that test convenience does not create accidental public API.
6. As a maintainer, I want the distributed Timeline implementation to stay single-file, so that users can copy one component file into their app.
7. As a maintainer, I want `data-slot` attributes on Timeline parts, so that tests and users have stable DOM anchors.
8. As a user copying the component, I want the Timeline file to contain all runtime logic, so that I do not need to chase extra helper files.
9. As a user copying the component, I want readable source code, so that I can customize the component after installation.
10. As a user copying the component, I want stable slot names, so that advanced styling and debugging do not depend on brittle wrapper structure.
11. As a maintainer, I want a tracer test that renders normal Timeline composition, so that the test setup proves the real component path works.
12. As a maintainer, I want tests for default icon behavior, so that TimelineHeader continues to provide a default visual marker when no icon is supplied.
13. As a maintainer, I want tests for custom icon behavior, so that consumer-provided icons remain supported without bundled icon dependencies.
14. As a maintainer, I want tests for right-aligned positioning, so that a public layout behavior is protected.
15. As a maintainer, I want tests for alternate positioning, so that automatic item ordering continues to affect layout as intended.
16. As a maintainer, I want tests for alternate-reverse positioning, so that inverse alternation remains protected.
17. As a maintainer, I want a test for TimelineItem `orderIndex`, so that manual ordering remains supported.
18. As a maintainer, I want tests to avoid broad class snapshots, so that harmless Tailwind refactors do not break behavior tests.
19. As a maintainer, I want tests to assert meaningful layout classes only when they represent behavior, so that layout regressions are still caught.
20. As a maintainer, I want the `TimelineTitle` display name corrected, so that debugging output matches the exported component name.
21. As a maintainer, I want setup and the first passing tracer test committed together, so that the test infrastructure is proven by a real test.
22. As a maintainer, I want a `test` script for watch mode, so that local development can use fast feedback.
23. As a maintainer, I want a `test:run` script for CI-style execution, so that verification can run non-interactively.
24. As a maintainer, I want the test setup to use jsdom, so that React DOM rendering works in Vitest.
25. As a maintainer, I want jest-dom matchers, so that DOM assertions are readable and behavior-focused.
26. As a future contributor, I want testing rules documented by existing tests, so that new changes follow the same public-behavior style.
27. As a future contributor, I want no testing-only exports, so that the component API remains honest.
28. As a future contributor, I want test coverage to grow behavior by behavior, so that TDD remains incremental rather than speculative.
29. As a project owner, I want testing to support copy/paste distribution, so that maintainability does not undermine the product model.
30. As a project owner, I want the testing baseline to avoid package-first assumptions, so that npm packaging remains optional and later.

## Implementation Decisions

- Add Vitest as the test runner.
- Add jsdom as the test environment.
- Add React Testing Library for rendering component usage.
- Add jest-dom matchers for readable DOM assertions.
- Do not add user-event in the initial setup because Timeline is currently static and has no user interaction behavior.
- Add `test` and `test:run` scripts.
- Keep Vitest configuration minimal and aligned with the existing Vite project setup.
- Add a small test setup module that imports jest-dom matchers.
- Colocate the first test file with the Timeline component.
- Keep the Timeline runtime implementation in a single component file.
- Do not extract layout helpers into separate runtime modules for test convenience.
- Do not export private layout helpers only for tests.
- Add `data-slot` attributes to the exported Timeline parts and important internal rendered parts.
- Treat `data-slot` names as a light public contract once tested or documented.
- Add slots for the root, item, header, icon, default icon dot, separator, title, content root, and content inner wrapper.
- Fix the TimelineTitle display name so that it matches the exported component.
- Do not remove TimelineHeader or TimelineContent `orderIndex` props in this milestone, but do not lock them into tests.
- Test TimelineItem `orderIndex` as the primary manual ordering API.
- Avoid broad class-string snapshots.
- Assert Tailwind classes only when they encode meaningful public layout behavior, such as right text alignment.
- Keep npm packaging out of scope for this testing baseline.
- Keep registry or generated copy/paste output out of scope for this testing baseline.

## Testing Decisions

- Tests should verify observable behavior through public component usage.
- Tests should import the same Timeline exports that a copy/paste user sees.
- Tests should not import private helpers.
- Tests should not require the runtime component to split into multiple files.
- Tests should be written incrementally with the local TDD workflow: one failing behavior test, minimal implementation, then refactor while green.
- The first tracer test should render a basic Timeline composition and assert visible consumer content plus core `data-slot` presence.
- Default icon behavior should be tested by asserting one icon slot and one default icon dot slot when no custom icon is provided.
- Custom icon behavior should be tested by asserting the custom icon renders and the default icon dot does not.
- Right positioning should be tested by asserting right-alignment on the title and content inner slot.
- Alternate positioning should be tested with two items, asserting that the second item aligns right while the first does not.
- Alternate-reverse positioning should be tested with two items, asserting the inverse right-alignment behavior.
- TimelineItem `orderIndex` override should be tested by forcing an even order under alternate positioning and asserting right alignment.
- Pass-through behavior should be tested for meaningful `className` and `data-*` props on public component roots.
- Context boundary behavior should be tested by rendering child components outside Timeline and asserting the expected error.
- Ref tests are intentionally deferred from the first pass because they add ceremony and do not protect the highest-risk behavior yet.
- Exhaustive table tests for every position are deferred until the API stabilizes or regressions show the need.
- Header-level and content-level `orderIndex` props are not tested in the first pass because they are cleanup candidates.
- Coverage should be treated as a feedback signal, not a hard threshold in this milestone.
- Verification for this milestone should include `pnpm test:run` and `pnpm build`.

## Out of Scope

- Publishing the component as an npm package.
- Adding npm package exports, peer dependency metadata, or semver workflow.
- Adding a registry pipeline.
- Adding a split-source plus generated-single-file distribution pipeline.
- Extracting private layout helpers into separate runtime files.
- Exporting internal helpers for tests.
- Adding `asChild`, Slot-style APIs, or polymorphic rendering.
- Removing existing public props during the test baseline milestone.
- Adding animation, date formatting, data-schema rendering, icons, or timeline application logic.
- Rewriting the README.
- Implementing full accessibility/semantic markup changes beyond what is required by the test baseline.
- Enforcing hard coverage thresholds.

## Further Notes

This PRD follows the current project direction in `AGENTS.md`: the Timeline component is copy/paste-first, source-owned, composition-first, and Tailwind-customizable. The repository may contain tests and development infrastructure that end users do not copy.

The source of truth for the distributed component remains the single Timeline component file. A future split-source plus generated-single-file pipeline should only be reconsidered if the component becomes large enough that single-file source hurts maintainability or if registry distribution creates a real need for generation.

The current codebase has a healthy build baseline. `pnpm build` passed before this PRD was written. The README is still the Vite template and should be handled after the testing baseline clarifies which behaviors are intentional.
