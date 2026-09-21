import { Reveal } from '@/components/motion/Reveal';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  /** Lista de proyectos a mostrar. */
  projects: Project[];
  /** Mostrar el primer proyecto a todo lo ancho, como destacado. Default: true. */
  featureFirst?: boolean;
}

/**
 * ProjectGrid — cuadrícula "bento" de proyectos.
 *
 *   <ProjectGrid projects={proyectos} />
 *
 * Diseño: 1 columna en móvil, 3 en escritorio; el destacado ocupa las 3.
 * Animación: <Reveal> con variant "rise" y stagger → cada tarjeta sube y crece
 * un poco, una tras otra, conforme cada fila entra en pantalla.
 */
export function ProjectGrid({ projects, featureFirst = true }: ProjectGridProps) {
  return (
    <Reveal variant="rise" stagger={0.12} duration={0.9} start="top 88%" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, i) => {
        // Solo el primero (i === 0) es destacado, y solo si featureFirst está activo
        const featured = featureFirst && i === 0;
        return (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            featured={featured}
            // El destacado ocupa las 3 columnas en escritorio
            className={featured ? 'md:col-span-3' : undefined}
          />
        );
      })}
    </Reveal>
  );
}
