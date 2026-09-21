import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/cn';

/**
 * ScrollProgress — barra delgada fija arriba que se llena conforme bajas por la página.
 *
 *   <ScrollProgress />
 *
 * La barra siempre mide el 100 % de ancho; lo que cambia es su escala horizontal
 * (scaleX de 0 a 1). Escalar es mucho más eficiente que cambiar `width`.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.fromTo(ref.current, { scaleX: 0 }, { // empieza vacía (0 %)…
      scaleX: 1,                                // …y termina llena (100 %)
      // Lineal: el llenado es proporcional al scroll
      ease: 'none',
      scrollTrigger: {
        // Usamos todo el documento como referencia
        trigger: document.documentElement,
        // 0 % cuando la parte superior de la página está arriba de la pantalla…
        start: 'top top',
        // …100 % cuando el final de la página toca el final de la pantalla
        end: 'bottom bottom',
        // scrub con número: sigue al scroll con 0.3 s de suavizado (sin tirones)
        scrub: 0.3,
      },
    });
  }, ref);

  return (
    <div
      ref={ref}
      // Es decorativa: los lectores de pantalla la ignoran
      aria-hidden="true"
      // Transform inline (no una clase de Tailwind como scale-x-0): Tailwind v4 usa la
      // propiedad CSS `scale`, que se MULTIPLICA con el transform de GSAP → quedaría en 0 siempre
      style={{ transform: 'scaleX(0)' }}
      className={cn(
        // fixed arriba · 3 px de alto · crece desde la izquierda (origin-left) · degradado del tema
        // motion-reduce:hidden → si el usuario pidió reducir movimiento, no se muestra
        'fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-linear-to-r from-accent-dim via-accent to-accent-2 shadow-glow motion-reduce:hidden',
        className,
      )}
    />
  );
}
