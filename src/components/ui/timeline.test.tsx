import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTitle
} from "./timeline";

function getSlot(container: HTMLElement, slot: string) {
  const element = container.querySelector(`[data-slot="${slot}"]`);

  expect(element).toBeInTheDocument();

  return element as HTMLElement;
}

function getAllSlots(container: HTMLElement, slot: string) {
  return Array.from(
    container.querySelectorAll(`[data-slot="${slot}"]`)
  ) as HTMLElement[];
}

function getContentInnerByText(container: HTMLElement, text: string) {
  const element = getAllSlots(container, "timeline-content-inner").find(
    (slot) => slot.textContent === text
  );

  expect(element).toBeInTheDocument();

  return element as HTMLElement;
}

function getDirectChildSlots(element: HTMLElement) {
  return Array.from(element.children).map((child) =>
    child.getAttribute("data-slot")
  );
}

describe("Timeline", () => {
  it("renders consumer composition with stable slot anchors", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>2026</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Project created</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("Project created")).toBeInTheDocument();
    expect(getSlot(container, "timeline")).toBeInTheDocument();
    expect(getSlot(container, "timeline-item")).toBeInTheDocument();
    expect(getSlot(container, "timeline-header")).toBeInTheDocument();
    expect(getSlot(container, "timeline-title")).toBeInTheDocument();
    expect(getSlot(container, "timeline-content")).toBeInTheDocument();
    expect(getSlot(container, "timeline-content-inner")).toBeInTheDocument();
  });

  it("renders the default marker dot when no custom marker is provided", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Queued</TimelineTitle>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    );

    expect(getAllSlots(container, "timeline-marker")).toHaveLength(1);
    expect(getAllSlots(container, "timeline-default-marker-dot")).toHaveLength(
      1
    );
  });

  it("uses a direct custom marker without the default marker dot", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <TimelineMarker>
              <span>Custom marker</span>
            </TimelineMarker>
            <TimelineTitle>Done</TimelineTitle>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Custom marker")).toBeInTheDocument();
    expect(getAllSlots(container, "timeline-marker")).toHaveLength(1);
    expect(getAllSlots(container, "timeline-default-marker-dot")).toHaveLength(
      0
    );
  });

  it("treats a wrapped marker as header content", () => {
    function WrappedMarker() {
      return (
        <TimelineMarker>
          <span>Wrapped marker</span>
        </TimelineMarker>
      );
    }

    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <WrappedMarker />
            <TimelineTitle>Wrapped marker title</TimelineTitle>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Wrapped marker")).toBeInTheDocument();
    expect(getAllSlots(container, "timeline-marker")).toHaveLength(2);
    expect(getAllSlots(container, "timeline-default-marker-dot")).toHaveLength(
      1
    );
  });

  it("right-aligns title and content for right positioning", () => {
    const { container } = render(
      <Timeline position='right'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Right title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Right content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Right title")).toHaveClass("text-right");
    expect(getContentInnerByText(container, "Right content")).toHaveClass(
      "text-right"
    );
  });

  it("places content before rail for right positioning", () => {
    const { container } = render(
      <Timeline position='right'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Right title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Right content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(getDirectChildSlots(getSlot(container, "timeline-header"))).toEqual([
      "timeline-title",
      "timeline-marker"
    ]);
    expect(getDirectChildSlots(getSlot(container, "timeline-content"))).toEqual(
      ["timeline-content-inner", "timeline-separator"]
    );
  });

  it("alternates item alignment from left to right", () => {
    const { container } = render(
      <Timeline position='alternate'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>First title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>First content</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Second title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Second content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("First title")).not.toHaveClass("text-right");
    expect(getContentInnerByText(container, "First content")).not.toHaveClass(
      "text-right"
    );
    expect(screen.getByText("Second title")).toHaveClass("text-right");
    expect(getContentInnerByText(container, "Second content")).toHaveClass(
      "text-right"
    );
  });

  it("alternates rail and content order", () => {
    const { container } = render(
      <Timeline position='alternate'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>First title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>First content</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Second title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Second content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    const contents = getAllSlots(container, "timeline-content");

    expect(getDirectChildSlots(contents[0])).toEqual([
      null,
      "timeline-separator",
      "timeline-content-inner"
    ]);
    expect(getDirectChildSlots(contents[1])).toEqual([
      "timeline-content-inner",
      "timeline-separator",
      null
    ]);
  });

  it("alternates item alignment from right to left when reversed", () => {
    const { container } = render(
      <Timeline position='alternate-reverse'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>First reversed title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>First reversed content</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>Second reversed title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Second reversed content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("First reversed title")).toHaveClass("text-right");
    expect(
      getContentInnerByText(container, "First reversed content")
    ).toHaveClass("text-right");
    expect(screen.getByText("Second reversed title")).not.toHaveClass(
      "text-right"
    );
    expect(
      getContentInnerByText(container, "Second reversed content")
    ).not.toHaveClass("text-right");
  });

  it("uses TimelineItem orderIndex for alternate positioning", () => {
    const { container } = render(
      <Timeline position='alternate'>
        <TimelineItem orderIndex={2}>
          <TimelineHeader>
            <TimelineTitle>Manual title</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Manual content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Manual title")).toHaveClass("text-right");
    expect(getContentInnerByText(container, "Manual content")).toHaveClass(
      "text-right"
    );
  });

  it("passes className and data attributes to public component roots", () => {
    const { container } = render(
      <Timeline className='root-class' data-example='timeline'>
        <TimelineItem className='item-class' data-example='item'>
          <TimelineHeader className='header-class' data-example='header'>
            <TimelineMarker className='marker-class' data-example='marker'>
              <span>Marker</span>
            </TimelineMarker>
            <TimelineTitle className='title-class' data-example='title'>
              Pass through title
            </TimelineTitle>
          </TimelineHeader>
          <TimelineContent className='content-class' data-example='content'>
            Pass through content
          </TimelineContent>
          <TimelineSeparator
            className='separator-class'
            data-example='separator'
          />
        </TimelineItem>
      </Timeline>
    );

    expect(getSlot(container, "timeline")).toHaveClass("root-class");
    expect(getSlot(container, "timeline")).toHaveAttribute(
      "data-example",
      "timeline"
    );
    expect(getSlot(container, "timeline-item")).toHaveClass("item-class");
    expect(getSlot(container, "timeline-item")).toHaveAttribute(
      "data-example",
      "item"
    );
    expect(getSlot(container, "timeline-header")).toHaveClass("header-class");
    expect(getSlot(container, "timeline-header")).toHaveAttribute(
      "data-example",
      "header"
    );
    expect(getSlot(container, "timeline-marker")).toHaveClass("marker-class");
    expect(getSlot(container, "timeline-marker")).toHaveAttribute(
      "data-example",
      "marker"
    );
    expect(getSlot(container, "timeline-title")).toHaveClass("title-class");
    expect(getSlot(container, "timeline-title")).toHaveAttribute(
      "data-example",
      "title"
    );
    expect(getSlot(container, "timeline-content")).toHaveClass(
      "content-class"
    );
    expect(getSlot(container, "timeline-content")).toHaveAttribute(
      "data-example",
      "content"
    );
    expect(getAllSlots(container, "timeline-separator")[1]).toHaveAttribute(
      "data-example",
      "separator"
    );
    expect(
      getAllSlots(container, "timeline-separator")[1].firstElementChild
    ).toHaveClass("separator-class");
  });

  it("throws when child components render outside Timeline", () => {
    expect(() =>
      renderToString(
        <>
          <TimelineItem>
            <TimelineHeader>
              <TimelineTitle>Outside</TimelineTitle>
            </TimelineHeader>
          </TimelineItem>
        </>
      )
    ).toThrow("useTimelineContext must be used within a Timeline provider");
  });

  it("keeps the TimelineTitle display name aligned with its export", () => {
    expect(TimelineTitle.displayName).toBe("TimelineTitle");
  });
});
