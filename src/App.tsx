import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineTitle
} from "@/components/ui/timeline";
import { Analytics } from "@vercel/analytics/react";
import type React from "react";

function App() {
  return (
    <>
      <main className='min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 sm:px-8 lg:px-10'>
          <header className='max-w-3xl'>
            <p className='text-sm font-medium uppercase tracking-wide text-emerald-700'>
              React Timeline primitive
            </p>
            <h1 className='mt-3 max-w-full break-words text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl'>
              Timeline examples for copy/paste React projects
            </h1>
            <p className='mt-4 text-base leading-7 text-zinc-600'>
              Practical compositions for chronological, process, roadmap, and
              milestone layouts using the same public API documented in the
              README.
            </p>
          </header>

          <section className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]'>
            <ExampleSection
              description='A centered rail with content on the right.'
              title='Default'
            >
              <Timeline className='p-0'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Kickoff</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Week 1'
                      text='Agree on the release scope and user-facing promise.'
                      title='Define the component surface'
                    />
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Review</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Week 2'
                      text='Check examples, exported modules, styling hooks, and accessibility notes.'
                      title='Tighten the public docs'
                    />
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </ExampleSection>

            <ExampleSection
              description='A single-side rail for process and checklist layouts.'
              title='Left rail'
            >
              <Timeline className='p-0' position='left'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Plan</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Step 1'
                      text='Start with explicit JSX so the app owns the content model.'
                      title='Compose the structure'
                    />
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Adapt</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Step 2'
                      text='Use Tailwind class overrides where the default styling does not fit.'
                      title='Customize locally'
                    />
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </ExampleSection>
          </section>

          <section className='grid gap-10 lg:grid-cols-[minmax(320px,0.75fr)_minmax(0,1fr)]'>
            <ExampleSection
              description='A mirrored single-side layout for right-aligned content.'
              title='Right rail'
            >
              <Timeline className='p-0' position='right'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Audit</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Docs'
                      text='Make setup, dependencies, and non-goals visible before launch.'
                      title='Clarify expectations'
                    />
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Verify</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Release'
                      text='Run tests, build, and inspect the demo before sharing.'
                      title='Check the release path'
                    />
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </ExampleSection>

            <ExampleSection
              description='Alternating content across a centered rail.'
              title='Alternate'
            >
              <Timeline className='p-0' position='alternate'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Alpha</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Prototype'
                      text='Validate the component API through normal consumer composition.'
                      title='Shape the primitive'
                    />
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineTitle>Beta</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <ItemBody
                      kicker='Public'
                      text='Document the copy/paste workflow and practical examples.'
                      title='Prepare the first release'
                    />
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </ExampleSection>
          </section>

          <ExampleSection
            description='Consumer-owned marker elements with simple Tailwind styling.'
            title='Custom markers'
          >
            <Timeline className='p-0' position='alternate-reverse'>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineMarker>
                    <span className='size-4 rounded-full border-2 border-emerald-700 bg-zinc-50' />
                  </TimelineMarker>
                  <TimelineTitle>Ready</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>
                  <ItemBody
                    kicker='Milestone'
                    text='Marker children can be plain elements, badges, counters, or app-owned icons.'
                    title='Bring your own visual language'
                  />
                </TimelineContent>
              </TimelineItem>
              <TimelineItem orderIndex={2}>
                <TimelineHeader>
                  <TimelineMarker>
                    <span className='grid size-6 place-items-center rounded-full bg-amber-500 text-xs font-semibold text-white'>
                      2
                    </span>
                  </TimelineMarker>
                  <TimelineTitle>Override</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>
                  <ItemBody
                    kicker='Escape hatch'
                    text='orderIndex can pin one item to a specific alternate position.'
                    title='Control one item when needed'
                  />
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </ExampleSection>
        </div>
      </main>
      <Analytics />
    </>
  );
}

type ExampleSectionProps = {
  children: React.ReactNode;
  description: string;
  title: string;
};

function ExampleSection({ children, description, title }: ExampleSectionProps) {
  return (
    <section className='border-t border-zinc-200 pt-6'>
      <div className='mb-6 flex flex-col gap-2'>
        <h2 className='text-xl font-semibold tracking-normal text-zinc-950'>
          {title}
        </h2>
        <p className='max-w-2xl text-sm leading-6 text-zinc-600'>
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

type ItemBodyProps = {
  kicker: string;
  text: string;
  title: string;
};

function ItemBody({ kicker, text, title }: ItemBodyProps) {
  return (
    <div className='min-w-0 max-w-sm rounded-md border border-zinc-200 bg-white p-4 shadow-sm'>
      <p className='text-xs font-medium uppercase tracking-wide text-teal-700'>
        {kicker}
      </p>
      <h3 className='mt-2 break-words text-base font-semibold tracking-normal text-zinc-950'>
        {title}
      </h3>
      <p className='mt-2 break-words text-sm leading-6 text-zinc-600'>{text}</p>
    </div>
  );
}

export default App;
