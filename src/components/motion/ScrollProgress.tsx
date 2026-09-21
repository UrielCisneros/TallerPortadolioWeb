import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/cn';

/** Thin bar fixed to the top of the page that fills as you scroll. */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.fromTo(ref.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
  }, ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // Inline transform (not a Tailwind scale class) so GSAP's scaleX isn't multiplied by 0
      style={{ transform: 'scaleX(0)' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-linear-to-r from-accent-dim via-accent to-indigo-500 shadow-[0_0_12px_rgba(139,92,246,0.6)] motion-reduce:hidden',
        className,
      )}
    />
  );
}
