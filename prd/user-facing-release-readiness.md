# Timeline User-Facing Release Readiness PRD

## Problem Statement

The Timeline primitive is close to being useful as a shadcn-style copy/paste component, but the repository is not yet ready for users to discover, understand, and reuse it confidently.

The current component has a composition-first shape, Tailwind defaults, public behavior tests, and a single-file source-owned implementation. However, the user-facing surface is still rough: the README is Vite boilerplate, the demo app is ad hoc, the dependency story is not explicit, and old `rhtl` / headless-library naming still appears in project metadata and maintainer documentation.

Before publishing a website, blog post, or social announcement, the project needs a small release-readiness pass that makes the promise honest: Timeline is an early but usable copy/paste primitive for Tailwind and shadcn-style React projects, not a stable npm package or full timeline application.

## Solution

Prepare the repository for a first public release of Timeline as a source-owned copy/paste component.

The release will present Timeline as a shadcn-style React Timeline primitive for Tailwind projects. Users should be able to copy the component into their app, install the small styling dependency set, understand the exported modules, customize the rendered parts with Tailwind classes and `data-slot` anchors, and evaluate the component from a clean README and demo.

The release-readiness work will focus on user-facing documentation, demo examples, naming cleanup, dependency clarity, project vocabulary, and release decision records. The Timeline runtime implementation should not be refactored as part of this PRD unless the documentation or demo pass exposes a concrete bug.

## User Stories

1. As a Tailwind React user, I want to understand that Timeline is a copy/paste component, so that I know I will own the source code in my app.
2. As a shadcn-style user, I want the README to match familiar component-copying conventions, so that I can install Timeline without learning a new distribution model.
3. As a prospective user, I want the project to be called Timeline, so that the purpose is obvious without decoding `rhtl`.
4. As a prospective user, I want old `rhtl` and React Headless Timeline Library naming removed, so that the project positioning feels intentional.
5. As a maintainer, I want the project metadata to use Timeline naming, so that repository internals do not contradict public documentation.
6. As a maintainer, I want the GitHub repository rename treated as a separate manual launch chore, so that code and docs cleanup can proceed independently.
7. As a prospective user, I want the README intro to say what Timeline is and who it is for, so that I can quickly decide whether it fits my project.
8. As a prospective user, I want installation instructions to explain manual copy/paste, so that I do not look for a package or registry command that does not exist.
9. As a prospective user, I want the README to list required dependencies, so that the copied component works in my project.
10. As a prospective user, I want the README to explain the `cn` helper expectation, so that path aliases and local utilities do not become hidden setup failures.
11. As a prospective user, I want a minimal usage example, so that I can see the intended compound component composition immediately.
12. As a prospective user, I want examples for default, right/left, alternate, and custom marker layouts, so that I can map Timeline to common timeline use cases.
13. As a prospective user, I want the README to document all exported modules, so that I know which parts are supported for composition.
14. As a prospective user, I want `TimelineSeparator` documented as a secondary public module, so that I understand it is available but not required for normal usage.
15. As a prospective user, I want all current `position` values documented, so that layout behavior is discoverable.
16. As a prospective user, I want the position values grouped by mental model, so that `default`, `left`, `right`, reverse, and alternate variants are easier to understand.
17. As a prospective user, I want `TimelineItem orderIndex` documented as an escape hatch, so that I can override automatic alternate positioning when needed.
18. As a prospective user, I want marker slot behavior documented, so that direct custom markers and wrapped marker content are not surprising.
19. As a prospective user, I want styling guidance for Tailwind class overrides, so that I can customize the component without changing the implementation immediately.
20. As a prospective user, I want marker and separator class targeting explained, so that I know which element receives my `className`.
21. As a prospective user, I want `data-slot` documented as a light styling and debugging contract, so that I can target stable rendered parts intentionally.
22. As a prospective user, I want an accessibility note that is honest about the static visual primitive, so that I do not mistake it for an interactive or ARIA-managed widget.
23. As a prospective user, I want guidance to compose meaningful headings and surrounding semantics, so that I can adapt Timeline to chronological, process, roadmap, activity, or editorial contexts.
24. As a prospective user, I want non-goals documented, so that I know Timeline is not a data renderer, date formatter, animation system, drag-and-drop tool, or timeline application.
25. As a prospective user, I want development commands documented, so that I can verify the project locally.
26. As a maintainer, I want the README to remain concise, so that user-facing usage guidance does not become an internal design manifesto.
27. As a maintainer, I want the blog post to carry the design story, so that the README can stay practical.
28. As a blog reader, I want to understand why Timeline uses explicit JSX composition instead of configuration objects, so that I can evaluate the design tradeoff.
29. As a blog reader, I want to understand why the first release is copy/paste-first, so that I do not expect npm packaging or semver guarantees.
30. As a blog reader, I want to understand the accessibility stance, so that static visual markup is not confused with fake interaction semantics.
31. As a LinkedIn reader, I want a short announcement version, so that I can understand the project without reading the full blog post.
32. As a LinkedIn reader, I want the post to say the component is early but usable, so that the announcement is honest without underselling the work.
33. As a demo viewer, I want a clean docs-like example page, so that I can inspect practical Timeline compositions.
34. As a demo viewer, I want examples that mirror the README, so that the visual demo and written docs reinforce each other.
35. As a maintainer, I want the demo app to avoid a marketing landing page, so that the repository focuses on the usable component.
36. As a maintainer, I want demo examples to avoid data-schema rendering, so that users do not infer an unsupported interface.
37. As a maintainer, I want demo markers to use simple Tailwind elements, so that demo-only icon dependencies do not leak into the release story.
38. As a maintainer, I want `lucide-react` removed from the project if it is unused, so that dependency expectations stay clean.
39. As a maintainer, I want a short domain glossary, so that future contributors use the same language for Timeline, position, rail, marker, separator, content, and slot.
40. As a maintainer, I want a release-positioning ADR, so that future architecture reviews do not re-suggest npm packaging, registry output, or `rhtl` naming for this first release.
41. As a maintainer, I want the Timeline runtime implementation left unchanged unless a real bug is found, so that release-readiness work stays focused and low risk.
42. As a maintainer, I want tests to continue exercising public behavior, so that documentation work does not weaken the existing test baseline.
43. As a maintainer, I want release verification to include tests, build, and local demo inspection, so that both behavior and presentation are checked before publication.
44. As a future package maintainer, I want npm packaging deferred, so that package naming, peer dependencies, exports, and semver can be handled deliberately later.
45. As a future registry maintainer, I want registry-style distribution deferred, so that no fake install path is promised before the workflow exists.

## Implementation Decisions

- The public product name is Timeline.
- The first public release promise is a shadcn-style React Timeline primitive for Tailwind projects.
- The release audience is Tailwind and shadcn-style React users, not all React users and not package-library evaluators.
- The distribution model is manual copy/paste only for this release.
- The project should not present npm install, registry install, package exports, semver, or stable library guarantees.
- The project metadata and documentation should remove `rhtl`, RHTL, and React Headless Timeline Library naming.
- The GitHub repository rename will be handled manually outside this PRD.
- The component file should remain in the shadcn-style UI component location.
- The README is the canonical user reference for installation, usage, examples, exported modules, styling, accessibility, non-goals, and development commands.
- The blog post is the narrative artifact for motivation and design tradeoffs.
- The LinkedIn post is a short announcement artifact positioned as early but usable.
- The demo app should be documentation-like and example-driven, not a marketing landing page.
- The demo app should show practical examples that match README examples.
- Demo examples should use simple Tailwind marker children instead of icon dependencies.
- `lucide-react` should not be required for the component or first public demo.
- The README should document all current exported modules: Timeline, TimelineItem, TimelineHeader, TimelineMarker, TimelineSeparator, TimelineTitle, and TimelineContent.
- `TimelineSeparator` should be documented as public but secondary; normal usage should not require direct use.
- All current `position` values should be documented.
- Position documentation should group values into single-side rail, centered rail, and alternating rail behavior.
- `TimelineItem orderIndex` should be documented as a narrow escape hatch for manual alternate positioning.
- Marker slotting should be documented: a direct marker in the header is treated as the marker slot, while wrapped marker content is treated as normal header content.
- The styling section should explain Tailwind defaults, `className` escape hatches, `data-slot` anchors, and marker/separator class targeting.
- `data-slot` should be documented as a light styling, debugging, and testing contract.
- The accessibility section should keep the current honest stance: Timeline is static and non-interactive, does not add fake ARIA roles, and leaves domain-specific semantics to consumers.
- The non-goals section should explicitly exclude data-schema rendering, built-in date formatting, status workflow logic, drag and drop, virtualization, animation libraries, CMS integrations, bundled icons, broad design-system infrastructure, npm packaging, and registry installation.
- A short project domain glossary should be added to preserve agreed language for Timeline, Timeline primitive, source-owned copy/paste usage, position, rail, marker, separator, content, slot, demo app, and public release.
- One ADR should record the first-release positioning decisions.
- The Timeline runtime implementation should not be refactored as part of this PRD unless the README or demo reveals a concrete bug.

## Testing Decisions

- Existing Timeline component tests should remain focused on public behavior through normal consumer composition.
- No private layout helper exports should be added for testing.
- Documentation-only changes do not require new component tests.
- Demo changes should be verified through build and local visual inspection.
- If the demo or README examples expose a behavior bug, add or update a public behavior test before changing the Timeline runtime implementation.
- The release verification loop should include the non-interactive test command.
- The release verification loop should include the production build command.
- The release verification loop should include starting the local demo app and manually inspecting the example page.
- Screenshot or browser regression testing is not required for this first release-readiness pass.
- Coverage thresholds are not part of this PRD.

## Out of Scope

- Publishing an npm package.
- Choosing a final package name for npm.
- Adding package exports, peer dependency metadata, semver workflow, or release automation.
- Adding a registry or CLI installation path.
- Creating a generated single-file distribution pipeline.
- Refactoring the Timeline placement, ordering, marker slotting, or rail styling modules unless a real bug is found.
- Adding `asChild`, polymorphic rendering, or Slot-style APIs.
- Adding data-schema rendering.
- Adding built-in date formatting.
- Adding animation libraries or animation behavior.
- Adding drag and drop.
- Adding virtualization.
- Adding CMS integrations.
- Adding bundled icons or icon runtime dependencies.
- Changing rendered semantics to ordered lists or adding ARIA roles before a concrete semantic requirement exists.
- Building a marketing landing page.
- Guaranteeing stable library compatibility beyond the documented copy/paste release.

## Further Notes

This PRD intentionally treats Timeline as early but usable. The release should invite users to copy, read, and adapt the component, while avoiding claims that imply package maturity.

The source of truth for the distributed component remains the single Timeline component file. Tests, docs, PRDs, ADRs, and demo files can live around it, but users should not need to chase a runtime module graph to copy the primitive.

The first release should preserve the current product values: composable primitives, accessibility-minded semantics, simple interfaces, readable source code, Tailwind-first customization, and restrained implementation.
