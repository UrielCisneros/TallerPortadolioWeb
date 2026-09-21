import { useRef } from 'react';
import { profile } from '@/data/profile';
import { useMotion } from '@/hooks/useMotion';
import { gsap, SplitText } from '@/lib/gsap';
import { HeroContent } from './HeroContent';
import { HeroHud } from './HeroHud';
import { HeroImage } from './HeroImage';

const FULL_FRAME = 'inset(0% 0% 0% 0% round 0px)';
const startFrame = () =>
  window.innerWidth < 768 ? 'inset(30% 10% 30% 10% round 20px)' : 'inset(24% 32% 24% 32% round 28px)';

/**
 * Pinned, scroll-driven hero:
 *  1. Opening frame — giant name over a small image window, editorial HUD in the corners.
 *  2. On scroll — the window expands to full screen, the letters scatter, the HUD fades.
 *  3. Final frame — headline, bio and CTAs rise in over the image, then the page un-pins.
 * Static markup is the final frame, so reduced-motion users get it without any animation.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useMotion(() => {
    const name = SplitText.create('[data-hero="name"]', { type: 'chars' });
    const headline = SplitText.create('[data-hero="headline"]', { type: 'words', mask: 'words' });
    const mid = (name.chars.length - 1) / 2;

    // Opening-frame state
    gsap.set('[data-hero="window"]', { clipPath: startFrame() });
    gsap.set('[data-hero="img"]', { scale: 1.35 });
    gsap.set('[data-hero="shade"]', { opacity: 0 });
    gsap.set('[data-hero="reveal"]', { autoAlpha: 0, y: 40 });
    gsap.set(headline.words, { yPercent: 110 });

    // Scroll-driven scene
    gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
      .fromTo('[data-hero="window"]', { clipPath: startFrame }, { clipPath: FULL_FRAME, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo('[data-hero="img"]', { scale: 1.35 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(name.chars, { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)' }, {
        x: i => (i - mid) * window.innerWidth * 0.22,
        y: i => (i % 2 ? -1 : 1) * window.innerHeight * 0.28,
        rotation: i => (i - mid) * 18,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.9,
        ease: 'power2.in',
      }, 0)
      .fromTo('[data-hero="hud"]', { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
      .fromTo('[data-hero="shade"]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.6)
      .fromTo('[data-hero="reveal"]', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, 1)
      .fromTo(headline.words, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, 1.1)
      .to({}, { duration: 0.6 }); // hold the final frame before un-pinning

    // Intro on page load (only if we're at the top)
    if (window.scrollY < 10) {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-hero="window"]', { clipPath: 'inset(50% 50% 50% 50% round 28px)', duration: 1.4, ease: 'expo.inOut' })
        .from('[data-hero="img"]', { scale: 1.9, duration: 1.8 }, 0)
        .from(name.chars, { yPercent: 100, opacity: 0, stagger: 0.07, duration: 1.1 }, 0.5)
        .from('[data-hero="hud"] > *', { opacity: 0, y: 12, stagger: 0.08, duration: 0.8 }, 0.9);
    }
  }, sectionRef);

  return (
    <section ref={sectionRef} className="relative h-svh w-full overflow-hidden bg-[#080808]">
      <HeroImage src={profile.heroImage} />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center mix-blend-difference motion-reduce:hidden">
        <h1
          data-hero="name"
          aria-label={profile.name}
          className="select-none font-display text-[clamp(96px,24vw,380px)] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-white"
        >
          {profile.name}
        </h1>
      </div>

      <HeroHud />
      <HeroContent />
    </section>
  );
}
