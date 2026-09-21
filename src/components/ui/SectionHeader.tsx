import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';

export interface SectionHeaderProps {
  /** Número pequeño antes de la etiqueta, p. ej. "01". */
  index?: string;
  /** Etiqueta corta sobre el título, p. ej. "Experiencia". */
  eyebrow: string;
  /** Título grande. Puede incluir JSX, p. ej. un <span> con otro color. */
  title: ReactNode;
  /** Texto opcional debajo del título. */
  description?: string;
}

/**
 * SectionHeader — encabezado de sección: "01 —— Etiqueta", título grande y descripción.
 *
 * Coreografía de la animación (todas se disparan al entrar en pantalla; los `delay` las encadenan):
 *   0.0 s → la etiqueta entra desde la izquierda, pieza por pieza (Reveal con stagger)
 *   0.2 s → el título sube palabra por palabra (SplitReveal)
 *   0.4 s → la descripción sube (Reveal)
 */
export function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-12 md:mb-16">
      {/* Etiqueta. Cada hijo (número, línea, texto) entra desde la izquierda con 0.1 s entre ellos */}
      <Reveal variant="left" stagger={0.1} duration={0.6} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {index && <span>{index}</span>}
        {/* Línea decorativa de 40 px */}
        <span className="h-px w-10 bg-accent/50" />
        <span>{eyebrow}</span>
      </Reveal>

      {/* Título que aparece palabra por palabra. clamp(32px, 5vw, 48px): tamaño fluido entre 32 y 48 px */}
      <SplitReveal
        as="h2"
        delay={0.2}
        className="mt-5 font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
      >
        {title}
      </SplitReveal>

      {/* Descripción, solo si viene */}
      {description && (
        <Reveal as="p" variant="up" delay={0.4} duration={0.6} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </Reveal>
      )}
    </header>
  );
}
