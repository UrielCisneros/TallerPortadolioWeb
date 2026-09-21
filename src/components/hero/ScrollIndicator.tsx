import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.fromTo('circle', { y: 0, opacity: 1 }, { y: 8, opacity: 0, duration: 1.4, ease: 'power1.in', repeat: -1 });
  }, ref);

  return (
    <div ref={ref} style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity: 0.4,
      }}>
        <span style={{ fontSize: 11, letterSpacing: '0.08em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeWidth="1.5" />
          <circle cx="8" cy="7" r="2.5" fill="white" />
        </svg>
      </div>
    </div>
  );
}
