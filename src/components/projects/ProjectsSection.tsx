import { useRef } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { projects } from '@/data/projects';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', gridRef.current);
    gsap.set(items, { y: 80, scale: 0.92, rotateX: 12, opacity: 0, transformPerspective: 800 });
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, { y: 0, scale: 1, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }),
    });
  }, gridRef);

  return (
    <section style={{ marginBottom: 100 }}>
      <SectionLabel>Projects</SectionLabel>
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 14,
      }}>
        {projects.map(project => (
          // Wrapper so GSAP's transform doesn't fight the card's hover lift
          <div data-reveal key={project.title}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
