import { Reveal } from '@/components/motion/Reveal';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  /** Show the first project full-width. Default: true. */
  featureFirst?: boolean;
}

/** Bento grid of projects; cards rise in as they scroll into view. */
export function ProjectGrid({ projects, featureFirst = true }: ProjectGridProps) {
  return (
    <Reveal variant="rise" stagger={0.12} duration={0.9} start="top 88%" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, i) => {
        const featured = featureFirst && i === 0;
        return (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            featured={featured}
            className={featured ? 'md:col-span-3' : undefined}
          />
        );
      })}
    </Reveal>
  );
}
