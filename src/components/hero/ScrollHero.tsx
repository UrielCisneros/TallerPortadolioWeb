import { useRef, type ReactNode } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/cn';
import { gsap, SplitText } from '@/lib/gsap';

interface ScrollHeroProps {
  id?: string;
  /** Giant text on the opening frame (it scatters on scroll). */
  title: string;
  /** Background image URL. */
  image: string;
  /** Usually a <HeroCorners>. Fades out on scroll. */
  corners?: ReactNode;
  /** How long the hero stays pinned, in % of the viewport height. Default: 250. */
  scrollLength?: number;
  /** Classes for the column that holds the final content. */
  contentClassName?: string;
  /**
   * Final-frame content. Each direct child rises in one after another.
   * Give a text element `data-split` to reveal it word by word instead.
   */
  children: ReactNode;
}

const FULL_FRAME = 'inset(0% 0% 0% 0% round 0px)';
const startFrame = () =>
  window.innerWidth < 768 ? 'inset(30% 10% 30% 10% round 20px)' : 'inset(24% 32% 24% 32% round 28px)';

/**
 * Pinned, scroll-driven hero:
 *  1. Opening frame — giant title over a small image window, corners around it.
 *  2. On scroll — the window expands to full screen, the letters scatter, the corners fade.
 *  3. Final frame — children rise in over the image, then the page un-pins.
 * The static markup is the final frame, so reduced-motion users see it directly.
 */
export function ScrollHero({ id, title, image, corners, scrollLength = 250, contentClassName, children }: ScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    const name = SplitText.create('[data-hero="title"]', { type: 'chars' });
    const mid = (name.chars.length - 1) / 2;

    // Opening-frame state
    gsap.set('[data-hero="window"]', { clipPath: startFrame() });
    gsap.set('[data-hero="img"]', { scale: 1.35 });
    gsap.set('[data-hero="shade"]', { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollLength}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo('[data-hero="window"]', { clipPath: startFrame }, { clipPath: FULL_FRAME, duration: 1, ease: 'power2.inOut' }, 0)
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
      .fromTo('[data-hero="shade"]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.6);

    // Final-frame content, in order
    Array.from(contentRef.current?.children ?? []).forEach((child, i) => {
      const at = 1 + i * 0.1;
      if (child.hasAttribute('data-split')) {
        const words = SplitText.create(child, { type: 'words', mask: 'words' }).words;
        gsap.set(words, { yPercent: 110 });
        tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, at);
      } else {
        gsap.set(child, { autoAlpha: 0, y: 40 });
        tl.fromTo(child, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, at);
      }
    });

    tl.to({}, { duration: 0.6 }); // hold the final frame before un-pinning

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
    <section id={id} ref={sectionRef} className="relative h-svh w-full overflow-hidden bg-canvas">
      {/* Image window */}
      <div data-hero="window" className="absolute inset-0 overflow-hidden will-change-[clip-path]">
        <img
          data-hero="img"
          src={image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.6) saturate(1.2)' }}
        />
        <div data-hero="shade" className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-canvas/50 via-canvas/40 to-canvas" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent)_0%,transparent_65%)]" />
        </div>
      </div>

      {/* Giant title — inverts colors over the image */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center mix-blend-difference motion-reduce:hidden">
        <h1
          data-hero="title"
          aria-label={title}
          className="select-none font-display text-[clamp(96px,24vw,380px)] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-white"
        >
          {title}
        </h1>
      </div>

      {corners}

      {/* Final frame */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div ref={contentRef} className={cn('flex max-w-2xl flex-col items-center text-center', contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
