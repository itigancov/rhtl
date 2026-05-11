import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

type Position =
  | "default"
  | "left"
  | "right"
  | "default-reverse"
  | "alternate"
  | "alternate-reverse";

const timelineVariants = cva("flex flex-col gap-2 p-8", {
  variants: {
    position: {
      alternate: "",
      "alternate-reverse": "",
      default: "",
      "default-reverse": "text-right",
      left: "",
      right: "text-right"
    }
  },
  defaultVariants: {
    position: "default"
  }
});

const timelineIconColumnClass = "flex w-10 shrink-0 justify-center";

type TimelineItemContextProps = {
  orderIndex: number;
};

type TimelineLayoutSlot = "spacer" | "rail" | "content";
type TimelineRailSide = "left" | "right";

type TimelineHeaderSlots = {
  icon?: React.ReactNode;
  content: React.ReactNode[];
};

type TimelineContextProps = {
  position: Position;
};

const TimelineContext = React.createContext<TimelineContextProps | undefined>(
  undefined
);

const TimelineItemContext = React.createContext<
  TimelineItemContextProps | undefined
>(undefined);

function useTimelineContext(): TimelineContextProps {
  const context = React.useContext(TimelineContext);

  if (!context) {
    throw new Error(
      "useTimelineContext must be used within a Timeline provider"
    );
  }

  return context;
}

function useTimelineItemContext() {
  return React.useContext(TimelineItemContext);
}

function getTimelinePlacement(
  position: NonNullable<TimelineProps["position"]>,
  orderIndex?: number
) {
  const isEvenIndex = orderIndex !== undefined && orderIndex % 2 === 0;
  const isOddIndex = orderIndex !== undefined && orderIndex % 2 !== 0;
  const railSide = getTimelineRailSide(position, isEvenIndex, isOddIndex);
  const isCentered =
    position === "default" ||
    position === "default-reverse" ||
    position === "alternate" ||
    position === "alternate-reverse";

  return {
    itemAlignment:
      position === "right" ? "end" : isCentered ? "center" : "start",
    slots: getTimelineLayoutSlots(railSide, isCentered),
    textAlignment: railSide === "right" ? "right" : "left"
  };
}

function getTimelineRailSide(
  position: NonNullable<TimelineProps["position"]>,
  isEvenIndex: boolean,
  isOddIndex: boolean
): TimelineRailSide | undefined {
  if (position === "left" || position === "default") {
    return "left";
  }

  if (position === "right" || position === "default-reverse") {
    return "right";
  }

  if (position === "alternate") {
    return isEvenIndex ? "right" : isOddIndex ? "left" : undefined;
  }

  return isEvenIndex ? "left" : isOddIndex ? "right" : undefined;
}

function getTimelineLayoutSlots(
  railSide: TimelineRailSide | undefined,
  isCentered: boolean
): TimelineLayoutSlot[] {
  if (railSide === undefined) {
    return ["content"];
  }

  const railAndContent: TimelineLayoutSlot[] =
    railSide === "left" ? ["rail", "content"] : ["content", "rail"];

  if (!isCentered) {
    return railAndContent;
  }

  return railSide === "left"
    ? ["spacer", ...railAndContent]
    : [...railAndContent, "spacer"];
}

function isTimelineIcon(
  child: React.ReactNode
): child is React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
  return React.isValidElement(child) && child.type === TimelineIcon;
}

function renderTimelineItems(children: React.ReactNode) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return (
      <TimelineItemContext.Provider value={{ orderIndex: index + 1 }}>
        {child}
      </TimelineItemContext.Provider>
    );
  });
}

function getTimelineHeaderSlots(children: React.ReactNode) {
  return React.Children.toArray(children).reduce<TimelineHeaderSlots>(
    (slots, child) => {
      if (slots.icon === undefined && isTimelineIcon(child)) {
        return {
          ...slots,
          icon: child
        };
      }

      return {
        ...slots,
        content: [...slots.content, child]
      };
    },
    { content: [] }
  );
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, position, children, ...props }, ref) => {
    const resolvedPosition = position ?? "default";

    return (
      <TimelineContext.Provider value={{ position: resolvedPosition }}>
        <div
          ref={ref}
          className={cn(
            timelineVariants({ position: resolvedPosition, className })
          )}
          {...props}
        >
          {renderTimelineItems(children)}
        </div>
      </TimelineContext.Provider>
    );
  }
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orderIndex?: number;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, orderIndex, children, ...props }, ref) => {
    const { position } = useTimelineContext();
    const itemContext = useTimelineItemContext();
    const resolvedOrderIndex = orderIndex ?? itemContext?.orderIndex;
    const placement = getTimelinePlacement(position, resolvedOrderIndex);

    return (
      <div
        className={cn(
          "relative flex min-h-16 flex-col gap-2",
          placement.itemAlignment === "end" && "items-end",
          placement.itemAlignment === "center" && "items-center",
          className
        )}
        ref={ref}
        {...props}
      >
        {resolvedOrderIndex === undefined ? (
          children
        ) : (
          <TimelineItemContext.Provider
            value={{ orderIndex: resolvedOrderIndex }}
          >
            {children}
          </TimelineItemContext.Provider>
        )}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

const TimelineIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return children ? (
    <div
      className={cn(timelineIconColumnClass, "items-center", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ) : (
    <div className={cn(timelineIconColumnClass, "items-center")} ref={ref}>
      <div
        className={cn("size-3 rounded-full bg-slate-900", className)}
        {...props}
      />
    </div>
  );
});
TimelineIcon.displayName = "TimelineIcon";

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={timelineIconColumnClass} {...props}>
      <div className={cn("mx-auto w-0.5 bg-slate-200", className)} />
    </div>
  );
});
TimelineSeparator.displayName = "TimelineSeparator";

export interface TimelineHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orderIndex?: number;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, orderIndex, ...props }, ref) => {
    const { position } = useTimelineContext();
    const itemContext = useTimelineItemContext();
    const placement = getTimelinePlacement(
      position,
      orderIndex ?? itemContext?.orderIndex
    );
    const slots = getTimelineHeaderSlots(children);

    const renderHeaderContent = () => {
      return slots.content.map((child, index) => {
        const childClassName = React.isValidElement(child)
          ? (child.props as React.HTMLAttributes<HTMLElement>).className
          : undefined;

        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          className: cn(
            childClassName,
            placement.textAlignment === "right" && "text-right"
          ),
          key: index
        } as React.HTMLAttributes<HTMLElement>);
      });
    };

    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon;
      }

      return <TimelineIcon />;
    };
    const renderSlot = (slot: TimelineLayoutSlot) => {
      if (slot === "spacer") {
        return <div className='flex-1' />;
      }

      if (slot === "rail") {
        return renderIcon();
      }

      return renderHeaderContent();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        {placement.slots.map((slot, index) => (
          <React.Fragment key={`${slot}-${index}`}>
            {renderSlot(slot)}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        "flex-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TimelineTitle.displayName = "TimelineDate";

export interface TimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  orderIndex?: number;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, orderIndex, ...props }, ref) => {
    const { position } = useTimelineContext();
    const itemContext = useTimelineItemContext();
    const placement = getTimelinePlacement(
      position,
      orderIndex ?? itemContext?.orderIndex
    );

    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-center gap-2", className)}
        {...props}
      >
        {placement.slots.map((slot, index) => {
          if (slot === "spacer") {
            return <div className='flex-1' key={`${slot}-${index}`} />;
          }

          if (slot === "rail") {
            return <TimelineSeparator key={`${slot}-${index}`} />;
          }

          return (
            <div
              className={cn(
                "flex-1 pb-2",
                placement.textAlignment === "right" && "text-right"
              )}
              key={`${slot}-${index}`}
            >
              {children}
            </div>
          );
        })}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";

export {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
};
