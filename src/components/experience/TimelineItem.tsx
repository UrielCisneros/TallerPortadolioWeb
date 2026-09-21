import type { ReactNode } from 'react';

interface TimelineItemProps {
  /** Etiqueta lateral, p. ej. las fechas. En escritorio va junto al nodo; en móvil, encima del contenido. */
  aside?: ReactNode;
  /** Contenido principal del ítem (p. ej. una <ExperienceCard>). */
  children: ReactNode;
}

/**
 * TimelineItem — una entrada de un <Timeline>.
 *
 * No tiene JavaScript de animación: expone marcas data-* para que el Timeline
 * lo anime, y reacciona con CSS a la clase `is-active` que el Timeline le pone.
 *
 * Diseño en cuadrícula:
 *   móvil:      [nodo] [aside     ]
 *               [nodo] [contenido ]
 *   escritorio: [nodo] [aside] [contenido]
 */
export function TimelineItem({ aside, children }: TimelineItemProps) {
  return (
    <li
      // Marca para que el Timeline encuentre este ítem
      data-timeline-item
      // `group` permite estilar hijos según las clases de este <li> → group-[.is-active]:…
      // grid-cols-[32px_1fr]: columna de 32 px para el nodo + resto para el contenido
      // md:grid-cols-[32px_150px_1fr]: en escritorio agrega una columna de 150 px para las fechas
      // last:pb-0: el último ítem no deja espacio abajo
      className="group relative grid grid-cols-[32px_1fr] gap-x-5 pb-10 last:pb-0 md:grid-cols-[32px_150px_1fr] md:gap-x-8 md:pb-14"
    >
      {/* Nodo: en móvil ocupa 2 filas (row-span-2) para quedar junto a las fechas y la tarjeta */}
      <div className="relative z-10 row-span-2 flex h-8 w-8 items-center justify-center md:row-span-1">
        {/* Anillo exterior. Con .is-active el borde toma el color de acento.
            motion-reduce: sin animaciones no hay .is-active, así que lo mostramos encendido siempre */}
        <span className="absolute inset-0 rounded-full border border-white/10 bg-canvas transition-colors duration-500 group-[.is-active]:border-accent/60 motion-reduce:border-accent/60" />
        {/* Punto central. Con .is-active crece (scale-125), se colorea y brilla */}
        <span className="relative h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-[.is-active]:scale-125 group-[.is-active]:bg-accent group-[.is-active]:shadow-glow-lg motion-reduce:bg-accent" />
      </div>

      {/* Etiqueta lateral (fechas). data-timeline-reveal → el Timeline la hace entrar */}
      <div data-timeline-reveal className="pb-3 md:pt-2">{aside}</div>

      {/* Contenido. En escritorio va en la 3.ª columna y en la 1.ª fila (junto al nodo) */}
      <div data-timeline-reveal className="col-start-2 md:col-start-3 md:row-start-1">
        {children}
      </div>
    </li>
  );
}
