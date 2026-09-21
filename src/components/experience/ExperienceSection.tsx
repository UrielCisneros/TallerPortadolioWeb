import { useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { experiences } from '@/data/experiences';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ExperienceCard } from './ExperienceCard';

export function ExperienceSection() {
  const listRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    // Timeline line fills as you scroll
    gsap.fromTo('[data-progress]', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: listRef.current, start: 'top 55%', end: 'bottom 55%', scrub: true },
    });

    gsap.utils.toArray<HTMLElement>('li.group', listRef.current).forEach(item => {
      ScrollTrigger.create({ trigger: item, start: 'top 55%', toggleClass: 'is-active' });
      gsap.from(item.querySelectorAll('[data-reveal]'), {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%' },
      });
    });

    // Count metrics up from zero ("$2B+" → "$0B+" … "$2B+")
    const counters = gsap.utils.toArray<HTMLElement>('[data-count]', listRef.current);
    const originals = counters.map(el => el.textContent ?? '');
    counters.forEach((el, i) => {
      const match = originals[i].match(/^(\D*)(\d+)(.*)$/);
      if (!match) return;
      const [, prefix, target, suffix] = match;
      const counter = { value: 0 };
      el.textContent = `${prefix}0${suffix}`;
      gsap.to(counter, {
        value: Number(target),
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`; },
      });
    });
    return () => counters.forEach((el, i) => { el.textContent = originals[i]; });
  }, listRef);

  return (
    <section id="experience" className="mb-32 scroll-mt-6">
      <SectionHeader
        index="01"
        eyebrow="Experience"
        title={<>Where I've shipped <span className="text-white/35">real impact.</span></>}
        description="Eight years across payments, edge infrastructure and product engineering — building systems that stay fast under pressure."
      />

      <div ref={listRef} className="relative">
        {/* Track + animated progress */}
        <div className="absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-white/[0.07]" />
        <div data-progress className="absolute bottom-4 left-4 top-4 w-px origin-top -translate-x-1/2 bg-linear-to-b from-accent via-accent to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]" />

        <ol>
          {experiences.map(experience => (
            <ExperienceCard key={`${experience.company}-${experience.title}`} experience={experience} />
          ))}
        </ol>
      </div>
    </section>
  );
}
