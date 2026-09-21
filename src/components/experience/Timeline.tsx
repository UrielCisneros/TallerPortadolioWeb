import { useRef, type ReactNode } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/cn';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Vertical timeline whose line fills as you scroll. Children must be <TimelineItem>s:
 * each one lights up its node when it reaches the middle of the screen.
 */
export function Timeline({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.fromTo('[data-timeline-progress]', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 55%', end: 'bottom 55%', scrub: true },
    });

    gsap.utils.toArray<HTMLElement>('[data-timeline-item]', ref.current).forEach(item => {
      ScrollTrigger.create({ trigger: item, start: 'top 55%', toggleClass: 'is-active' });
      gsap.from(item.querySelectorAll('[data-timeline-reveal]'), {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%' },
      });
    });
  }, ref);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-white/[0.07]" />
      <div
        data-timeline-progress
        className="absolute bottom-4 left-4 top-4 w-px origin-top -translate-x-1/2 bg-linear-to-b from-accent via-accent to-accent-2 shadow-glow"
      />
      <ol>{children}</ol>
    </div>
  );
}
