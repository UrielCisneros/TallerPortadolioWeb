import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

/**
 * ScrollIndicator — ícono de mouse con la "ruedita" bajando en bucle, más un texto opcional.
 *
 *   <ScrollIndicator label="Desliza para explorar" />
 *
 * Usa `currentColor`, así que toma el color de texto de su contenedor.
 */
export function ScrollIndicator({ label = 'Desliza' }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    // 'circle' = la ruedita del mouse (el único <circle> dentro de este componente)
    gsap.fromTo('circle',
      { y: 0, opacity: 1 },   // empieza arriba y visible…
      {
        y: 8,                 // …baja 8 unidades…
        opacity: 0,           // …mientras se desvanece
        duration: 1.4,
        ease: 'power1.in',    // acelera al bajar
        repeat: -1,           // -1 = se repite para siempre
      });
  }, ref);

  return (
    <div ref={ref} className="flex items-center gap-3">
      {/* El texto solo se muestra si viene uno */}
      {label && <span>{label}</span>}
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
        {/* Cuerpo del mouse */}
        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
        {/* Ruedita (la que se anima) */}
        <circle cx="8" cy="7" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
