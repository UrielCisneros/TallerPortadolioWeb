import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';

interface SpotlightCardProps {
  /** Si se indica, toda la tarjeta es un enlace. */
  href?: string;
  /** Color de la luz que sigue al cursor. Default: el acento del tema al 12 %. */
  color?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Guarda la posición del mouse DENTRO de la tarjeta en dos variables CSS (--mx y --my).
 * El degradado de la luz las lee, así que se mueve con el cursor sin re-renderizar React.
 */
function trackPointer(e: MouseEvent<HTMLElement>) {
  // Posición y tamaño de la tarjeta en la pantalla
  const rect = e.currentTarget.getBoundingClientRect();
  // Posición del mouse relativa a la esquina superior izquierda de la tarjeta
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/**
 * SpotlightCard — tarjeta con una luz suave que sigue al mouse.
 *
 *   <SpotlightCard href="/proyecto" className="rounded-3xl p-6">…</SpotlightCard>
 *
 * Es un `group` de Tailwind: sus hijos pueden reaccionar al hover de toda la
 * tarjeta con clases `group-hover:` (p. ej. zoom de una imagen).
 * Solo usa CSS y variables; no usa GSAP.
 */
export function SpotlightCard({ href, color = 'color-mix(in oklab, var(--color-accent) 12%, transparent)', className, children }: SpotlightCardProps) {
  // isolate crea un contexto de apilamiento propio (los z-index de adentro no se mezclan con la página)
  const classes = cn('group relative isolate overflow-hidden', className);
  const content = (
    <>
      {/* La luz: un degradado circular de 420 px centrado en (--mx, --my).
          Invisible por defecto; aparece con el hover. pointer-events-none para no bloquear clics */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx) var(--my), ${color}, transparent 45%)` }}
      />
      {children}
    </>
  );

  // Con href → enlace <a>; sin href → <article>
  return href ? (
    <a {...linkProps(href)} onMouseMove={trackPointer} className={classes}>{content}</a>
  ) : (
    <article onMouseMove={trackPointer} className={classes}>{content}</article>
  );
}
