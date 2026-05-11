import { TimelineContextProvider, useTimelineContext } from "@/context";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

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

function getTimelinePlacement(
  position: NonNullable<TimelineProps["position"]>,
  orderindex?: number
) {
  const isEvenIndex = orderindex !== undefined && orderindex % 2 === 0;
  const isOddIndex = orderindex !== undefined && orderindex % 2 !== 0;

  return {
    isTextRightAligned:
      (position === "alternate" && isEvenIndex) ||
      (position === "alternate-reverse" && isOddIndex),
    shouldRenderLeftEmptyDiv:
      position === "default" ||
      (position === "alternate" && isOddIndex) ||
      (position === "alternate-reverse" && isEvenIndex),
    shouldRenderLeftLine:
      position === "left" ||
      position === "default" ||
      (position === "alternate" && isOddIndex) ||
      (position === "alternate-reverse" && isEvenIndex),
    shouldRenderRightLine:
      position === "right" ||
      position === "default-reverse" ||
      (position === "alternate" && isEvenIndex) ||
      (position === "alternate-reverse" && isOddIndex),
    shouldRenderRightEmptyDiv:
      position === "default-reverse" ||
      (position === "alternate" && isEvenIndex) ||
      (position === "alternate-reverse" && isOddIndex)
  };
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, position, children, ...props }, ref) => {
    const resolvedPosition = position ?? "default";

    return (
      <TimelineContextProvider initialPosition={resolvedPosition}>
        <div
          ref={ref}
          className={cn(
            timelineVariants({ position: resolvedPosition, className })
          )}
          {...props}
        >
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                orderIndex: index + 1
              } as React.HTMLAttributes<HTMLElement>);
            }
          })}
        </div>
      </TimelineContextProvider>
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
    const isContentCentered =
      position === "default" ||
      position === "default-reverse" ||
      position === "alternate" ||
      position === "alternate-reverse";

    return (
      <div
        className={cn(
          "relative flex min-h-16 flex-col gap-2",
          position === "right" && "items-end",
          isContentCentered && "items-center",
          className
        )}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              orderindex: orderIndex
            } as TimelineHeaderProps);
          }
        })}
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
  orderindex?: number;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, orderindex, ...props }, ref) => {
    const { position } = useTimelineContext();
    const placement = getTimelinePlacement(position, orderindex);

    const renderFilteredChild = () => {
      const filteredChild = React.Children.toArray(children).filter((child) => {
        if (React.isValidElement(child) && child.type !== TimelineIcon) {
          return child.props.children;
        }
      });

      return React.Children.toArray(filteredChild).map((child, index) => {
        const childClassName = React.isValidElement(child)
          ? (child.props as React.HTMLAttributes<HTMLElement>).className
          : undefined;

        return (
          React.isValidElement(child) &&
          React.cloneElement(child, {
            className: cn(
              childClassName,
              placement.isTextRightAligned && "text-right"
            ),
            key: index
          } as React.HTMLAttributes<HTMLElement>)
        );
      });
    };

    const renderIcon = () => {
      const iconChild = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === TimelineIcon
      ) as
        | React.ReactElement<
            unknown,
            string | React.JSXElementConstructor<unknown>
          >
        | undefined;

      if (iconChild) {
        return iconChild;
      }

      return <TimelineIcon />;
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
        {placement.shouldRenderLeftEmptyDiv && <div className='flex-1'></div>}
        {placement.shouldRenderLeftLine && renderIcon()}
        {renderFilteredChild()}
        {placement.shouldRenderRightLine && renderIcon()}
        {placement.shouldRenderRightEmptyDiv && <div className='flex-1'></div>}
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
  orderindex?: number;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, orderindex, ...props }, ref) => {
    const { position } = useTimelineContext();
    const placement = getTimelinePlacement(position, orderindex);

    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-center gap-2", className)}
        {...props}
      >
        {placement.shouldRenderLeftEmptyDiv && <div className='flex-1'></div>}
        {placement.shouldRenderLeftLine && <TimelineSeparator />}
        <div
          className={cn(
            "flex-1 pb-2",
            placement.isTextRightAligned && "text-right"
          )}
        >
          {children}
        </div>
        {placement.shouldRenderRightLine && <TimelineSeparator />}
        {placement.shouldRenderRightEmptyDiv && <div className='flex-1'></div>}
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
