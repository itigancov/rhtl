import {
  Timeline,
  TimelineContent,
  TimelineTitle,
  TimelineHeader,
  TimelineItem,
  TimelineMarker
} from "@/components/ui/timeline";
import { User } from "lucide-react";

function App() {
  return (
    <div className='container mx-auto'>
      <Timeline position='alternate'>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>February 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 1</h3>
            <div>Item 1</div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineTitle>March 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 2</h3>
            <div>
              Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item
              2Item 2Item 2Item 2
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineMarker>
              <User className='size-4' />
            </TimelineMarker>
            <TimelineTitle>March 2022</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            <h3 className='text-xl font-bold'>Title 2</h3>
            <div>Item 2Item 2Item 2Item 2Item 2Item 2Item 2Item 2</div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default App;
