import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

export interface ParallaxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /**
   * How much it drifts while its parent crosses the viewport.
   * Positive moves up (against the scroll), negative moves down. Default: 0.3.
   */
  speed?: number;
}

/**
 * Moves its content at a different speed than the page scroll.
 * The trigger is the parent element, so the effect stays stable.
 *
 *   <Parallax speed={0.5}><img … /></Parallax>
 */
export function Parallax({ as, speed = 0.3, children, ...rest }: ParallaxProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    const distance = speed * 100;
    gsap.fromTo(ref.current, { y: distance }, {
      y: -distance,
      ease: 'none',
      scrollTrigger: { trigger: ref.current?.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, ref);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
