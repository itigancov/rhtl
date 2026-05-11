import { Position } from "@/types";
import { ReactNode, createContext, useContext } from "react";

type TimelineContextProps = {
  position: Position;
};

export const TimelineContext = createContext<TimelineContextProps | undefined>(
  undefined
);

type TimelineContextProviderProps = {
  children: ReactNode;
  initialPosition?: Position | null;
};

export function TimelineContextProvider({
  children,
  initialPosition = "default"
}: TimelineContextProviderProps) {
  return (
    <TimelineContext.Provider
      value={{
        position: initialPosition ?? "default"
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimelineContext(): TimelineContextProps {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error(
      "useTimelineContext must be used within a useTimelineContextProvider"
    );
  }

  return context;
}
