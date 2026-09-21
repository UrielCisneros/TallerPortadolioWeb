import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TagList } from '@/components/ui/Tag';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  /** Datos del proyecto. */
  project: Project;
  /** Posición en la lista; se muestra como "01", "02"… */
  index: number;
  /** Diseño ancho: imagen a un lado y texto al otro. */
  featured?: boolean;
  /** Texto de la etiqueta del proyecto destacado. */
  featuredLabel?: string;
  className?: string;
}

/**
 * ProjectCard — tarjeta de un proyecto: imagen, título, descripción y tecnologías.
 *
 *   <ProjectCard project={proyecto} index={0} featured />
 *
 * Toda la tarjeta es un enlace (a `project.href`, o "#" si no tiene).
 * Efectos al pasar el mouse (todos CSS, gracias a `group` de <SpotlightCard>):
 *  - una luz sigue al cursor (SpotlightCard),
 *  - la imagen hace zoom y pierde el tinte (ProjectVisual),
 *  - la flecha gira 45° y se vuelve blanca.
 */
export function ProjectCard({ project, index, featured, featuredLabel = 'Destacado', className }: ProjectCardProps) {
  return (
    <SpotlightCard
      href={project.href ?? '#'}
      className={cn(
        'h-full rounded-3xl border border-white/[0.07] bg-surface transition-colors duration-500 hover:border-white/15',
        // Destacado: en escritorio, 2 columnas (imagen 1.15 partes, texto 1 parte). Normal: todo en columna
        featured ? 'flex flex-col md:grid md:grid-cols-[1.15fr_1fr]' : 'flex flex-col',
        className,
      )}
    >
      {/* Imagen del proyecto (o ilustración si no tiene) */}
      <ProjectVisual project={project} index={index} featured={featured} />

      {/* Texto. flex-1 + flex-col permite empujar las tecnologías al fondo con mt-auto */}
      <div className={cn('relative z-10 flex flex-1 flex-col p-6', featured ? 'md:justify-center md:p-10' : 'md:p-7')}>
        {/* Etiqueta "Destacado", solo en la tarjeta destacada */}
        {featured && (
          <span className="mb-4 w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
            {featuredLabel}
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{project.subtitle}</p>
            <h3 className={cn('mt-2 font-display font-bold tracking-tight text-ink', featured ? 'text-3xl md:text-4xl' : 'text-2xl')}>
              {project.title}
            </h3>
          </div>
          {/* Botón circular con flecha. group-hover: reacciona al hover de TODA la tarjeta */}
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {/* Flecha "→" rotada -45° para que apunte en diagonal "↗" */}
              <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
            </svg>
          </span>
        </div>

        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{project.description}</p>

        {/* mt-auto: ocupa el espacio sobrante y deja las tecnologías siempre abajo */}
        <TagList items={project.tags} className="mt-auto pt-6" />
      </div>
    </SpotlightCard>
  );
}
