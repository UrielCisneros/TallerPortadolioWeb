import type { ReactNode } from 'react';

interface HeroCornersProps {
  /** Contenido de la esquina superior izquierda (p. ej. logo). */
  topLeft?: ReactNode;
  /** Superior derecha (p. ej. menú de texto). */
  topRight?: ReactNode;
  /** Inferior izquierda (p. ej. rol y enfoque). */
  bottomLeft?: ReactNode;
  /** Inferior derecha (p. ej. <ScrollIndicator>). Se oculta en pantallas muy pequeñas. */
  bottomRight?: ReactNode;
}

/**
 * HeroCorners — textos estilo revista en las 4 esquinas de un <ScrollHero>.
 *
 * No tiene animación propia: ScrollHero lo encuentra por `data-hero="hud"`,
 * hace aparecer cada esquina al cargar y las desvanece al empezar el scroll.
 */
export function HeroCorners({ topLeft, topRight, bottomLeft, bottomRight }: HeroCornersProps) {
  return (
    <div
      // Marca que usa ScrollHero para encontrar y animar este bloque
      data-hero="hud"
      // pointer-events-none: la capa cubre toda la pantalla, pero no bloquea los clics…
      // [&>*]:pointer-events-auto: …excepto en las esquinas, que sí son clicables (enlaces del menú)
      className="pointer-events-none absolute inset-0 z-30 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 motion-reduce:hidden [&>*]:pointer-events-auto"
    >
      <div className="absolute left-6 top-6 md:left-10 md:top-8">{topLeft}</div>
      <div className="absolute right-6 top-6 md:right-10 md:top-8">{topRight}</div>
      <div className="absolute bottom-6 left-6 max-w-[220px] leading-relaxed md:bottom-8 md:left-10">{bottomLeft}</div>
      <div className="absolute bottom-6 right-6 hidden sm:block md:bottom-8 md:right-10">{bottomRight}</div>
    </div>
  );
}
