import { useRef } from 'react';
import { socials } from '@/data/socials';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';
import { SocialLink } from './SocialLink';

export function SocialLinks() {
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    gsap.from('[data-reveal]', {
      y: 30,
      scale: 0.4,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: ref.current, start: 'top 90%' },
    });
  }, ref);

  return (
    <section ref={ref} style={{ paddingTop: 64, marginBottom: 80, display: 'flex', justifyContent: 'center', gap: 10 }}>
      {socials.map(social => (
        // Wrapper so GSAP's transform doesn't fight the link's hover transform
        <div data-reveal key={social.label}>
          <SocialLink social={social} />
        </div>
      ))}
    </section>
  );
}
