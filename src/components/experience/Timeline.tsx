import { useRef, type ReactNode } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/cn';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Timeline — línea de tiempo vertical que se "dibuja" conforme haces scroll.
 *
 *   <Timeline>
 *     <TimelineItem aside="2022">…</TimelineItem>
 *     <TimelineItem aside="2020">…</TimelineItem>
 *   </Timeline>
 *
 * Tres animaciones:
 *  1. Una línea de color que se llena de arriba a abajo siguiendo el scroll.
 *  2. El punto (nodo) de cada ítem se ilumina cuando llega al centro de la pantalla.
 *  3. El contenido de cada ítem entra deslizándose desde la derecha.
 *
 * Los hijos deben ser <TimelineItem>: el Timeline los encuentra por sus atributos data-*.
 */
export function Timeline({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    // ── 1) Línea de progreso ──
    // Es una línea de altura completa que escalamos verticalmente de 0 a 1.
    // Con origin-top (en su className) crece desde arriba hacia abajo.
    gsap.fromTo('[data-timeline-progress]', { scaleY: 0 }, {
      scaleY: 1,
      // Lineal: el avance de la línea es proporcional al scroll
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        // Empieza cuando el inicio de la lista llega al 55 % de la pantalla…
        start: 'top 55%',
        // …y termina cuando el final de la lista llega a ese mismo punto
        end: 'bottom 55%',
        // Pegada al scroll (retrocede si subes)
        scrub: true,
      },
    });

    // Recorremos cada ítem de la línea de tiempo
    gsap.utils.toArray<HTMLElement>('[data-timeline-item]', ref.current).forEach(item => {
      // ── 2) Encender el nodo ──
      // toggleClass agrega la clase `is-active` al ítem mientras el trigger está activo
      // (desde que su parte superior cruza el 55 % hasta el final de la página) y la quita al subir.
      // El estilo lo hace CSS: en TimelineItem, las clases group-[.is-active]:… cambian el color y el brillo.
      ScrollTrigger.create({ trigger: item, start: 'top 55%', toggleClass: 'is-active' });

      // ── 3) Entrada del contenido ──
      // Las partes marcadas con data-timeline-reveal (fechas y tarjeta) entran desde la derecha
      gsap.from(item.querySelectorAll('[data-timeline-reveal]'), {
        x: 40,            // empiezan 40 px a la derecha
        opacity: 0,       // e invisibles
        duration: 0.8,
        stagger: 0.12,    // primero las fechas, 0.12 s después la tarjeta
        ease: 'power3.out',
        // Cuando el ítem asoma por abajo (85 % de la pantalla)
        scrollTrigger: { trigger: item, start: 'top 85%' },
      });
    });
  }, ref);

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Riel gris de fondo (siempre visible). left-4 = centro de la columna de nodos (32 px / 2) */}
      <div className="absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-white/[0.07]" />
      {/* Línea de color que se llena con el scroll (encima del riel) */}
      <div
        data-timeline-progress
        className="absolute bottom-4 left-4 top-4 w-px origin-top -translate-x-1/2 bg-linear-to-b from-accent via-accent to-accent-2 shadow-glow"
      />
      {/* Lista ordenada: semánticamente correcto para una secuencia en el tiempo */}
      <ol>{children}</ol>
    </div>
  );
}
