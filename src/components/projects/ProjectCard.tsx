import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TagList } from '@/components/ui/Tag';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  project: Project;
  /** Position in the list — shown as "01", "02"… */
  index: number;
  /** Wide layout with the visual beside the text. */
  featured?: boolean;
  /** Badge text on the featured card. */
  featuredLabel?: string;
  className?: string;
}

export function ProjectCard({ project, index, featured, featuredLabel = 'Destacado', className }: ProjectCardProps) {
  return (
    <SpotlightCard
      href={project.href ?? '#'}
      className={cn(
        'h-full rounded-3xl border border-white/[0.07] bg-surface transition-colors duration-500 hover:border-white/15',
        featured ? 'flex flex-col md:grid md:grid-cols-[1.15fr_1fr]' : 'flex flex-col',
        className,
      )}
    >
      <ProjectVisual project={project} index={index} featured={featured} />

      <div className={cn('relative z-10 flex flex-1 flex-col p-6', featured ? 'md:justify-center md:p-10' : 'md:p-7')}>
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
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
            </svg>
          </span>
        </div>

        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{project.description}</p>

        <TagList items={project.tags} className="mt-auto pt-6" />
      </div>
    </SpotlightCard>
  );
}
