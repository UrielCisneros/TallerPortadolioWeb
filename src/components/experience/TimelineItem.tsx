import type { ReactNode } from 'react';

interface TimelineItemProps {
  /** Side label, e.g. dates. Sits next to the node on desktop, above the content on mobile. */
  aside?: ReactNode;
  children: ReactNode;
}

/** One entry of a <Timeline>. */
export function TimelineItem({ aside, children }: TimelineItemProps) {
  return (
    <li
      data-timeline-item
      className="group relative grid grid-cols-[32px_1fr] gap-x-5 pb-10 last:pb-0 md:grid-cols-[32px_150px_1fr] md:gap-x-8 md:pb-14"
    >
      {/* Node — `.is-active` is toggled by the Timeline's ScrollTrigger */}
      <div className="relative z-10 row-span-2 flex h-8 w-8 items-center justify-center md:row-span-1">
        <span className="absolute inset-0 rounded-full border border-white/10 bg-canvas transition-colors duration-500 group-[.is-active]:border-accent/60 motion-reduce:border-accent/60" />
        <span className="relative h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-[.is-active]:scale-125 group-[.is-active]:bg-accent group-[.is-active]:shadow-glow-lg motion-reduce:bg-accent" />
      </div>

      <div data-timeline-reveal className="pb-3 md:pt-2">{aside}</div>

      <div data-timeline-reveal className="col-start-2 md:col-start-3 md:row-start-1">
        {children}
      </div>
    </li>
  );
}
