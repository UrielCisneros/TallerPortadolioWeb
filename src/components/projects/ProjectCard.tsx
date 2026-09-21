import type { MouseEvent } from 'react';
import type { Project } from '@/types';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export function ProjectCard({ project, index, featured }: ProjectCardProps) {
  return (
    <a
      href={project.href ?? '#'}
      onMouseMove={trackPointer}
      className={`group relative isolate h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-surface transition-colors duration-500 hover:border-white/15 ${featured ? 'flex flex-col md:grid md:grid-cols-[1.15fr_1fr]' : 'flex flex-col'}`}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(139,92,246,0.12), transparent 45%)' }}
      />

      <ProjectVisual project={project} index={index} featured={featured} />

      <div className={`relative z-10 flex flex-1 flex-col p-6 ${featured ? 'md:justify-center md:p-10' : 'md:p-7'}`}>
        {featured && (
          <span className="mb-4 w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
            Featured
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{project.subtitle}</p>
            <h3 className={`mt-2 font-display font-bold tracking-tight text-ink ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
              {project.title}
            </h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
            </svg>
          </span>
        </div>

        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map(tag => (
            <li key={tag} className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-white/55">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
