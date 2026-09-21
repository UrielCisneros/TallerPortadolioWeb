import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SectionHeader, type SectionHeaderProps } from './SectionHeader';

interface SectionProps extends SectionHeaderProps {
  /** id del ancla: lo usan el dock y los enlaces del menú (href="#id"). */
  id: string;
  className?: string;
  children: ReactNode;
}

/**
 * Section — una sección de la página con su encabezado animado.
 *
 *   <Section id="proyectos" index="02" eyebrow="Proyectos" title="Lo que he hecho">
 *     …contenido…
 *   </Section>
 *
 * Recibe las mismas props que <SectionHeader> (index, eyebrow, title, description)
 * y se las pasa tal cual.
 */
export function Section({ id, className, children, ...header }: SectionProps) {
  return (
    // mb-32: espacio entre secciones · scroll-mt-6: deja 24 px arriba al llegar con un enlace "#id"
    <section id={id} className={cn('mb-32 scroll-mt-6', className)}>
      {/* {...header} = todas las props restantes (index, eyebrow, title, description) */}
      <SectionHeader {...header} />
      {children}
    </section>
  );
}
