import type { ReactNode } from 'react';

interface HeroCornersProps {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}

/**
 * Editorial labels pinned to the four corners of a <ScrollHero>.
 * ScrollHero fades them out as soon as you start scrolling.
 */
export function HeroCorners({ topLeft, topRight, bottomLeft, bottomRight }: HeroCornersProps) {
  return (
    <div
      data-hero="hud"
      className="pointer-events-none absolute inset-0 z-30 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 motion-reduce:hidden [&>*]:pointer-events-auto"
    >
      <div className="absolute left-6 top-6 md:left-10 md:top-8">{topLeft}</div>
      <div className="absolute right-6 top-6 md:right-10 md:top-8">{topRight}</div>
      <div className="absolute bottom-6 left-6 max-w-[220px] leading-relaxed md:bottom-8 md:left-10">{bottomLeft}</div>
      <div className="absolute bottom-6 right-6 hidden sm:block md:bottom-8 md:right-10">{bottomRight}</div>
    </div>
  );
}
