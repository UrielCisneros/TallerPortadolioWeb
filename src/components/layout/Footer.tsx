import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

/** Bottom bar with content on the left and right. */
export function Footer({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <Reveal
      as="footer"
      variant="up"
      stagger={0.1}
      duration={0.6}
      start="top 95%"
      className="flex flex-wrap items-center justify-between gap-2 border-t border-line py-7 text-[12.5px] text-faint"
    >
      <p>{left}</p>
      {right && <p>{right}</p>}
    </Reveal>
  );
}
