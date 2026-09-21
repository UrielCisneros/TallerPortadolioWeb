import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, SplitText } from '@/lib/gsap';

export interface SplitRevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Split into words, characters or lines. Default: 'words'. */
  by?: 'words' | 'chars' | 'lines';
  delay?: number;
  stagger?: number;
  start?: string;
}

/**
 * Text that slides up piece by piece (masked) when it scrolls into view.
 *
 *   <SplitReveal as="h2" by="words">Hello world</SplitReveal>
 */
export function SplitReveal({ as, by = 'words', delay = 0, stagger = 0.06, start = 'top 85%', children, ...rest }: SplitRevealProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    const split = SplitText.create(ref.current, { type: by, mask: by });
    gsap.from(split[by], {
      yPercent: 110,
      duration: 0.8,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start },
    });
  }, ref);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
