import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.fromTo('circle', { y: 0, opacity: 1 }, { y: 8, opacity: 0, duration: 1.4, ease: 'power1.in', repeat: -1 });
  }, ref);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span>Scroll to explore</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="7" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
