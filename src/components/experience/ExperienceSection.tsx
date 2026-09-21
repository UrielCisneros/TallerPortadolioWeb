import { useRef } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { experiences } from '@/data/experiences';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ExperienceCard } from './ExperienceCard';

export function ExperienceSection() {
  const listRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', listRef.current);
    gsap.set(items, { x: -60, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: 'top 85%',
      once: true,
      onEnter: batch => gsap.to(batch, { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }),
    });
  }, listRef);

  return (
    <section style={{ marginBottom: 80 }}>
      <SectionLabel>Experience</SectionLabel>
      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {experiences.map(experience => (
          // Wrapper so GSAP's transform doesn't fight the card's hover styles
          <div data-reveal key={`${experience.company}-${experience.title}`}>
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
}
