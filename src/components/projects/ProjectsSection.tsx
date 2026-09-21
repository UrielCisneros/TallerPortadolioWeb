import { useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/data/projects';
import { socials } from '@/data/socials';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ProjectCard } from './ProjectCard';

const githubUrl = socials.find(s => s.label === 'GitHub')?.href;

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', gridRef.current);
    gsap.set(items, { y: 80, scale: 0.94, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, { y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }),
    });

    // Window mockups drift against the scroll direction
    gsap.utils.toArray<HTMLElement>('[data-parallax]', gridRef.current).forEach(el => {
      gsap.fromTo(el, { y: 30 }, {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('[data-reveal]'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }, gridRef);

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="mb-32 scroll-mt-6">
      <SectionHeader
        index="02"
        eyebrow="Selected work"
        title={<>Things I've built <span className="text-white/35">on my own time.</span></>}
        description="Side projects and open-source tools — mostly born from scratching my own itch."
      />

      <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Wrappers carry GSAP transforms so they don't fight hover styles */}
        <div data-reveal className="md:col-span-3">
          <ProjectCard project={featured} index={0} featured />
        </div>
        {rest.map((project, i) => (
          <div data-reveal key={project.title}>
            <ProjectCard project={project} index={i + 1} />
          </div>
        ))}
      </div>

      {githubUrl && (
        <div className="mt-10 flex justify-center">
          <a
            href={githubUrl}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-accent/40 hover:text-white"
          >
            More on GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      )}
    </section>
  );
}
