# ADR 0001: First Release Positioning

## Status

Accepted

## Context

Timeline is ready for a first public, user-facing release pass, but the project should not imply package maturity, registry installation, or broad application scope. The component is strongest as a readable shadcn-style primitive that users can copy into a Tailwind React project and adapt.

The repository still needs clean public language, dependency clarity, practical examples, and release artifacts before it is announced.

## Decision

For the first public release, present the project as Timeline: an early but usable shadcn-style React Timeline primitive for Tailwind projects.

Distribution is manual copy/paste only. The source of truth remains the single component file at `src/components/ui/timeline.tsx`.

Do not add npm publishing, package exports, semver workflow, registry output, generated distribution files, or package-first language in this release pass.

Keep examples composition-first. Do not introduce data-schema rendering, built-in date formatting, workflow state logic, animations, drag and drop, virtualization, CMS integrations, bundled icons, or broad design-system infrastructure.

Treat the GitHub repository rename as a separate manual launch chore outside this code and documentation pass.

## Consequences

Users get an honest setup path: copy the source, install small styling utilities, provide the local `cn` helper, and customize with Tailwind.

Maintainers have a clear decision record to point to when future work suggests npm packaging, registry installation, or a broader product scope before those are intentionally planned.

Future package or registry work can still happen, but it should be handled as a deliberate product and infrastructure decision rather than implied by this release.
