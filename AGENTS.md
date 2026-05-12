# AGENTS.md

## Project Purpose

This project is named Timeline. Describe it as a shadcn-style React Timeline primitive/component for Tailwind projects.

The project exists to provide a high-quality, Radix UI/shadcn/ui-inspired Timeline component for React. Its primary distribution model is source-owned copy/paste usage: users should be able to bring the component into their app, understand it, customize it, and keep full control of the code.

Npm packaging is optional and later. Keep the code clean enough to package if real demand appears, but do not let package-first concerns dominate the design before the component proves its shape.

The first product is a Timeline primitive: a composable component for chronological, milestone, process, roadmap, activity, and editorial timeline layouts. It should not become a full timeline application, data renderer, animation system, or design system.

Use "composition-first" or "schema-free" when describing the API shape. Do not use older project naming or generic library positioning for public release work.

## Product Values

Optimize for:

1. Composable primitives.
2. Accessibility-minded semantics.
3. Simple APIs.
4. Readable source code.
5. Tailwind-first customization.
6. Restrained implementation.

Prefer explicit JSX composition over configuration objects. Props should express stable component behavior or layout, not consumer data schemas.

The component should feel useful out of the box without becoming a rigid, opinionated widget.

## Inspiration

Use shadcn/ui as the main reference for ergonomics, Tailwind styling, source ownership, and copy-paste customization.

Use Radix UI as the quality bar for API restraint, accessibility thinking, and composability.

Do not copy implementation, documentation text, or APIs wholesale from either project unless licensing and attribution implications are intentionally handled.

## Scope Boundaries

Keep the library narrow. Timeline is a primitive for rendering chronological or process-oriented structure, not a timeline application.

Question requests that add:

- JSON/data-schema rendering APIs.
- Built-in date formatting.
- Status workflow logic.
- Drag and drop.
- Virtualized feeds.
- Animation libraries.
- CMS integrations.
- Opinionated card systems.
- Bundled icons or visual assets.
- Broad design-system infrastructure.

Likely in-scope work includes:

- Layout positions and timeline orientation behavior.
- Compound component ergonomics.
- Semantic markup and accessibility improvements.
- `className` override behavior.
- Documentation and examples.
- Copy/paste installation guidance and registry-style distribution.
- Package exports and publishing setup only when explicitly requested or when demand makes it a real goal.
- Focused tests for public behavior and core layout rules.

## API Philosophy

The preferred API is component composition:

```tsx
<Timeline>
  <TimelineItem>
    <TimelineHeader>
      <TimelineMarker />
      <TimelineTitle>2026</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Project created</TimelineContent>
  </TimelineItem>
</Timeline>
```

Avoid prop-heavy convenience APIs unless repeated real examples prove they reduce friction without reducing flexibility.

Do not turn Timeline into a data-rendering abstraction unless explicitly requested.

Do not add polymorphic rendering, `asChild`, or Slot-style APIs preemptively. Introduce them only to solve a concrete semantic or composition problem.

## Styling Contract

Use sensible Tailwind defaults with `className` escape hatches.

Use CVA only for meaningful layout or visual variants, not every small style choice. `position` is a valid variant because it changes layout semantics.

Avoid theme systems, token layers, CSS variables, and broad variant matrices until there is a real theming need.

Colors, spacing, icon size, and typography should usually remain class overrides unless repeated usage proves a stronger abstraction is needed.

## Dependencies

Runtime dependencies should stay styling/utilities-only unless there is a concrete behavioral requirement that cannot be solved cleanly in local code.

Do not add behavior libraries, state machines, animation libraries, date/data helpers, or icon libraries by default.

Marker visuals are consumer-provided children. Demo-only icon dependencies must not leak into the published runtime surface.

## Accessibility

Accessibility must be semantic and honest.

Do not invent ARIA roles or keyboard behavior for static layout. Use native structure where possible and leave domain-specific semantics to consumers unless the component owns that behavior.

Avoid fake interactive roles. Add keyboard behavior only when the component introduces actual interactive controls.

When changing rendered semantics or markup, state the tradeoff, make the smallest coherent change, and update docs/examples if the public usage contract changes.

## Public API

Treat public component APIs, exported names, rendered semantics, documented composition patterns, copy/paste installation instructions, dependency expectations, and documented styling override behavior as user-facing surface area.

Public API is what consumers import, configure, compose, and are told they can rely on.

`data-slot` names are a light styling, debugging, and testing contract once they are documented or covered by tests. Do not rename them casually.

Public API does not include:

- Internal helper functions.
- Private file layout.
- Exact undocumented Tailwind class strings.
- Demo app structure.
- Tests.
- Undocumented internal DOM wrappers.

Do not silently change API shape. If a change affects public API, copy/paste usage, or rendered semantics, provide a clear rationale and update relevant docs/examples.

## Testing And TDD

Use Vitest with React Testing Library for component tests once the test stack is installed.

For new behavior, bug fixes, API changes, and non-trivial refactors, use the local `tdd` skill and follow a red-green-refactor loop:

1. Write one behavior test through the public component API.
2. Make it pass with minimal code.
3. Repeat for the next behavior.
4. Refactor only while tests are green.

Avoid bulk-writing tests ahead of implementation.

Test public behavior first. Also test internal pure layout helpers when their branching rules are central to Timeline correctness. Internal helpers can be tested when they protect core layout rules, but they must not become public package API just to make tests convenient.

Coverage should be used as a feedback signal, not an absolute target. Aim for strong meaningful coverage of Timeline behavior and layout branching. Do not chase 100% coverage if it creates brittle tests or preserves bad internal boundaries.

Documentation-only changes do not require tests. Styling-only changes require build verification, and tests only when the styling affects public layout behavior.

## Stabilization

Before stabilization, prefer fast learning, small changes, meaningful tests, and clear documentation of open decisions. Avoid fake compatibility guarantees.

The project is stabilized when:

1. The exported component API is intentionally reviewed and documented.
2. Copy/paste installation and usage are documented clearly enough for external users.
3. Runtime dependency expectations are explicit, and demo-only dependencies are not required by the component.
4. README documents installation, basic usage, layout examples, styling overrides, and accessibility notes.
5. Vitest and React Testing Library tests cover public behavior and core layout helper branching.
6. Verification commands are reliable.
7. Known non-goals are written down.
8. External consumption is proven by copying the component into an example app or by using a registry-style workflow.

After stabilization, treat documented copy/paste usage and public component API changes as breaking changes unless explicitly planned, and consider enforcing branch coverage thresholds for core layout logic.

## Distribution And Publishing

Do not add npm publishing infrastructure opportunistically.

Prefer copy/paste-first distribution inspired by shadcn/ui. The component should be readable, self-contained enough to own locally, and easy to adapt after installation.

Preserve single-file copy/paste ergonomics for the distributed component. Do not extract internal helpers into separate runtime files only for test convenience.

Tests may live separately in this repository, but they should exercise the same public component exports users copy. Do not add testing-only exports or split runtime files unless that also improves the copy/paste user experience.

If registry-style distribution is introduced, keep it aligned with the same source-owned model: users should receive real component code, not a black-box runtime dependency.

Do not introduce a split-source plus generated-single-file pipeline prematurely. The source of truth is currently the same single component file users copy. Revisit generated distribution only if the component becomes large enough that single-file source hurts maintainability, or if a registry/build pipeline becomes necessary for other reasons.

When publishing work is explicitly requested, make it package-quality:

- Proper package name.
- Correct `private` setting.
- Peer dependencies.
- Exports.
- Build output.
- README.
- License.
- Versioning strategy.
- Verification commands.

If npm packaging becomes a real goal later, revisit package boundaries, peer dependencies, exports, semver, and whether a separate core is worth extracting.

## Documentation

`README.md` is for users of the component: copy/paste installation, usage, API, examples, accessibility notes, and styling guidance.

`AGENTS.md` is for maintainers and AI coding agents: project purpose, priorities, constraints, contribution rules, and decision-making guidance.

Do not bury user-facing usage docs only in `AGENTS.md`. Do not put internal decision rules into `README.md` unless they help users evaluate the component.

## Code Style

Match local style and existing component conventions.

Use TypeScript types deliberately. Preserve `forwardRef` and `displayName` conventions for exported components unless a broader API decision changes that pattern.

Avoid unrelated formatting churn. Keep edits surgical and tied directly to the task.

Use tooling as the source of truth once formatter and lint configuration are finalized.

## Verification

Check `package.json` before assuming scripts are current.

Current expected verification:

- Run `pnpm build` after code changes.
- Run `pnpm lint` when lint configuration exists and the script works.
- Use `pnpm dev` for manual/demo verification.
- Add `pnpm test` to the standard loop once the test stack exists.

## Open Decisions

These decisions are intentionally not finalized yet:

- Public package name.
- Exact test setup and coverage thresholds.
- Whether npm packaging is worth pursuing after copy/paste usage is proven.
- Final registry/copy-paste distribution workflow.
- Whether a future split-source plus generated-single-file pipeline is justified.
- Whether future semantic requirements justify polymorphic rendering or `asChild`.
