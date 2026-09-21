import { useRef, type ReactNode } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, SplitText } from '@/lib/gsap';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

export function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useMotion(() => {
    const split = SplitText.create(titleRef.current, { type: 'words', mask: 'words' });
    gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%' }, defaults: { ease: 'power3.out' } })
      .from('[data-eyebrow]', { opacity: 0, x: -16, duration: 0.5 })
      .from('[data-line]', { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, '<')
      .from(split.words, { yPercent: 110, duration: 0.8, stagger: 0.06 }, '-=0.3')
      .from('[data-desc]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.5');
  }, ref);

  return (
    <header ref={ref} className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <span data-eyebrow>{index}</span>
        <span data-line className="h-px w-10 origin-left bg-accent/50" />
        <span data-eyebrow>{eyebrow}</span>
      </div>
      <h2
        ref={titleRef}
        className="mt-5 font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
      >
        {title}
      </h2>
      {description && (
        <p data-desc className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </header>
  );
}
