import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';
import { V, V_DIM } from '@/theme';

export function ScrollProgress() {
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 50,
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        background: `linear-gradient(to right, ${V_DIM}, ${V}, #6366f1)`,
        boxShadow: '0 0 12px rgba(139,92,246,0.6)',
      }}
    />
  );
}
