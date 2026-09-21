import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';

interface SpotlightCardProps {
  /** If set, the whole card is a link. */
  href?: string;
  /** Glow color that follows the cursor. Default: the theme accent at 12%. */
  color?: string;
  className?: string;
  children: ReactNode;
}

function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/**
 * Card with a soft glow that follows the mouse. It's a Tailwind `group`,
 * so children can react with `group-hover:*`.
 */
export function SpotlightCard({ href, color = 'color-mix(in oklab, var(--color-accent) 12%, transparent)', className, children }: SpotlightCardProps) {
  const classes = cn('group relative isolate overflow-hidden', className);
  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx) var(--my), ${color}, transparent 45%)` }}
      />
      {children}
    </>
  );

  return href ? (
    <a {...linkProps(href)} onMouseMove={trackPointer} className={classes}>{content}</a>
  ) : (
    <article onMouseMove={trackPointer} className={classes}>{content}</article>
  );
}
