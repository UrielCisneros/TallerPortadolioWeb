import { useRef } from 'react';
import { profile } from '@/data/profile';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    gsap.from('p', {
      y: 16,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 95%' },
    });
  }, ref);

  return (
    <footer ref={ref} style={{
      borderTop: '1px solid #1a1a1a',
      padding: '28px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
    }}>
      <p style={{ margin: 0, fontSize: 12.5, color: '#3a3a38' }}>© 2026 {profile.name}</p>
      <p style={{ margin: 0, fontSize: 12.5, color: '#3a3a38' }}>Built with React & Vite</p>
    </footer>
  );
}
