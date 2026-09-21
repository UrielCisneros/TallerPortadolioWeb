import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';

export interface SectionHeaderProps {
  /** Small number shown before the eyebrow, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

/** "01 — Eyebrow" + big animated title + optional description. */
export function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal variant="left" stagger={0.1} duration={0.6} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {index && <span>{index}</span>}
        <span className="h-px w-10 bg-accent/50" />
        <span>{eyebrow}</span>
      </Reveal>

      <SplitReveal
        as="h2"
        delay={0.2}
        className="mt-5 font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
      >
        {title}
      </SplitReveal>

      {description && (
        <Reveal as="p" variant="up" delay={0.4} duration={0.6} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </Reveal>
      )}
    </header>
  );
}
