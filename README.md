# Timeline

Timeline is an early, source-owned React Timeline primitive for Tailwind projects. It is built for shadcn-style copy/paste usage: copy the component into your app, keep the source code, and customize it with normal JSX and Tailwind classes.

Timeline is useful for chronological pages, roadmaps, process steps, milestone lists, activity histories, and editorial timelines. It is not a data renderer or full timeline application.

## Installation

Copy `src/components/ui/timeline.tsx` into your app, usually at `components/ui/timeline.tsx`.

Install the styling utilities used by the component:

```bash
pnpm add class-variance-authority clsx tailwind-merge
```

Add a local `cn` helper if your project does not already have one:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

The component imports `cn` from `@/lib/utils`. Update that import if your app uses a different alias or utility path.

## Usage

```tsx
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineTitle
} from "@/components/ui/timeline";

export function ProjectTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>2026</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Project created</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

Timeline uses explicit JSX composition instead of a data schema. Keep dates, headings, badges, links, and surrounding semantics in your own app code.

## Layout Examples

Default centered rail:

```tsx
<Timeline>
  <TimelineItem>
    <TimelineHeader>
      <TimelineTitle>Plan</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Define the scope and success criteria.</TimelineContent>
  </TimelineItem>
</Timeline>
```

Single-side rail:

```tsx
<Timeline position='left'>
  <TimelineItem>
    <TimelineHeader>
      <TimelineTitle>Review</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Collect feedback before implementation.</TimelineContent>
  </TimelineItem>
</Timeline>
```

Right-aligned rail:

```tsx
<Timeline position='right'>
  <TimelineItem>
    <TimelineHeader>
      <TimelineTitle>Ship</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Publish the finished release notes.</TimelineContent>
  </TimelineItem>
</Timeline>
```

Alternating rail:

```tsx
<Timeline position='alternate'>
  <TimelineItem>
    <TimelineHeader>
      <TimelineTitle>Alpha</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Validate the component API.</TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineHeader>
      <TimelineTitle>Beta</TimelineTitle>
    </TimelineHeader>
    <TimelineContent>Polish examples and documentation.</TimelineContent>
  </TimelineItem>
</Timeline>
```

Custom marker:

```tsx
<TimelineItem>
  <TimelineHeader>
    <TimelineMarker>
      <span className='size-4 rounded-full border-2 border-emerald-600 bg-white' />
    </TimelineMarker>
    <TimelineTitle>Complete</TimelineTitle>
  </TimelineHeader>
  <TimelineContent>Use any marker element you own.</TimelineContent>
</TimelineItem>
```

## API

Exports:

- `Timeline`: Root container. Accepts `position`, `className`, and normal `div` props.
- `TimelineItem`: Item wrapper. Accepts `orderIndex` as a narrow escape hatch for manual alternate positioning.
- `TimelineHeader`: Header row for the marker and title area.
- `TimelineMarker`: Marker slot. Without children, it renders the default dot.
- `TimelineSeparator`: Public but secondary separator line. Normal usage does not require rendering it directly.
- `TimelineTitle`: Heading element for the item label.
- `TimelineContent`: Content row for the item body.

### Position

Single-side rail:

- `left`: Rail and marker before the content.
- `right`: Rail and marker after the content, with right-aligned text.

Centered rail:

- `default`: Centered rail with content on the right.
- `default-reverse`: Centered rail with content on the left.

Alternating rail:

- `alternate`: Alternates item content across the centered rail.
- `alternate-reverse`: Alternates in the opposite order.

`TimelineItem orderIndex` overrides the automatic item index used by alternate layouts. Use it only when you need one item to render as a specific odd or even position.

### Marker Slot

The first direct `TimelineMarker` child of `TimelineHeader` is treated as the marker slot. A `TimelineMarker` wrapped in another element is treated as normal header content.

When `TimelineMarker` has children, `className` is applied to the marker column. When it has no children, `className` is applied to the default dot.

### Styling

Timeline ships with Tailwind defaults and `className` escape hatches on every exported component. Override spacing, colors, typography, marker visuals, and separator styles with Tailwind classes.

`TimelineSeparator className` targets the separator line, not the outer rail column. `TimelineMarker className` targets either the marker column or the default dot depending on whether custom marker children are provided.

Rendered parts include `data-slot` attributes such as `timeline`, `timeline-item`, `timeline-header`, `timeline-marker`, `timeline-separator`, `timeline-title`, and `timeline-content`. Treat these as light styling, debugging, and testing anchors.

## Accessibility

Timeline is a static visual primitive. It does not add fake ARIA roles, keyboard behavior, or interactive semantics.

Compose meaningful headings, lists, sections, links, and surrounding context in your application based on the content you are presenting. Chronological, process, roadmap, activity, and editorial timelines may need different semantics.

## Non-Goals

Timeline does not provide data-schema rendering, built-in date formatting, status workflow logic, drag and drop, virtualization, animation libraries, CMS integrations, bundled icons, broad design-system infrastructure, npm packaging, or registry installation.

## Development

```bash
pnpm install
pnpm test:run
pnpm build
pnpm dev
```

Use the local demo app to inspect the documented examples during release checks.
