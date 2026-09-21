import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

interface CountUpProps {
  /** Any text with one number in it: "40%", "$2B+", "50M+". */
  value: string;
  duration?: number;
  className?: string;
}

/** Counts the number inside `value` up from zero when it scrolls into view. */
export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotion(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!el || !match) return;

    const [, prefix, target, suffix] = match;
    const counter = { value: 0 };
    el.textContent = `${prefix}0${suffix}`;
    gsap.to(counter, {
      value: Number(target),
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => { el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`; },
    });
    return () => { el.textContent = value; };
  }, ref);

  return <span ref={ref} className={className}>{value}</span>;
}
