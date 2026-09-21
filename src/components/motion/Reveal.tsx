import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rise' | 'pop';

/** Starting state for each variant; everything animates back to its natural position. */
const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },
  down: { y: -60, opacity: 0 },
  left: { x: -60, opacity: 0 },
  right: { x: 60, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
  rise: { y: 80, scale: 0.94, opacity: 0 },
  pop: { y: 30, scale: 0.4, opacity: 0, ease: 'back.out(2)' },
};

const RESTED = { x: 0, y: 0, scale: 1, opacity: 1 };

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** HTML tag to render. Default: 'div'. */
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** If set, animates each direct child one after another instead of the element itself. */
  stagger?: number;
  /** ScrollTrigger start position. Default: 'top 85%'. */
  start?: string;
}

/**
 * Animates its content into view when it scrolls onto the screen.
 *
 *   <Reveal variant="left">…</Reveal>
 *   <Reveal as="ul" stagger={0.1} variant="pop">{items}</Reveal>
 */
export function Reveal({ as, variant = 'up', delay = 0, duration = 0.8, stagger, start = 'top 85%', children, ...rest }: RevealProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    const el = ref.current;
    if (!el) return;
    const { ease = 'power3.out', ...from } = VARIANTS[variant];

    if (stagger === undefined) {
      gsap.from(el, { ...from, ease, duration, delay, scrollTrigger: { trigger: el, start } });
      return;
    }

    const items = Array.from(el.children);
    gsap.set(items, from);
    ScrollTrigger.batch(items, {
      start,
      once: true,
      onEnter: batch => gsap.to(batch, { ...RESTED, ease, duration, delay, stagger }),
    });
  }, ref);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
