import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';
import { V } from '@/theme';

export function SectionLabel({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
      .from('span', { x: -24, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('[data-line]', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.inOut' }, '-=0.35');
  }, ref);

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: V,
        fontFamily: "'Inter', sans-serif",
      }}>
        {children}
      </span>
      <div data-line style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,92,246,0.3), transparent)' }} />
    </div>
  );
}
