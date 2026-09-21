import type { CSSProperties } from 'react';
import { Parallax } from '@/components/motion/Parallax';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

const GRID: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
  maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
};

const LINE_WIDTHS = ['72%', '48%', '86%', '58%'];

interface ProjectVisualProps {
  project: Project;
  index: number;
  featured?: boolean;
}

/**
 * The project's picture: its screenshot (`project.image`) or, if there is none,
 * an abstract "app window" built from its two colors.
 * Reacts to the hover of a parent `group` (e.g. <SpotlightCard>).
 */
export function ProjectVisual({ project, index, featured }: ProjectVisualProps) {
  return (
    <div className={cn('relative overflow-hidden bg-canvas', featured ? 'h-60 md:h-full md:min-h-[360px]' : 'h-52')}>
      {project.image ? <ImageVisual project={project} /> : <AbstractVisual project={project} featured={featured} />}

      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white/80 backdrop-blur-md">
        {String(index + 1).padStart(2, '0')}
      </span>

      {!featured && <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface to-transparent" />}
    </div>
  );
}

function ImageVisual({ project }: { project: Project }) {
  return (
    <>
      {/* Taller than the frame so the parallax never shows an edge */}
      <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-[15%]">
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Parallax>

      {/* Brand tint — fades out on hover to show the real image */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
        style={{ background: `linear-gradient(135deg, ${project.from}, ${project.to})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
    </>
  );
}

function AbstractVisual({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <>
      <div
        className="absolute -left-12 -top-16 h-60 w-60 rounded-full opacity-50 blur-3xl transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundColor: project.from }}
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundColor: project.to }}
      />
      <div className="absolute inset-0 opacity-[0.12]" style={GRID} />

      {/* Floating window — Parallax moves the wrapper, hover moves the window */}
      <Parallax speed={0.3} className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'rounded-xl border border-white/15 bg-black/40 p-4 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-2',
            featured ? 'w-[68%]' : 'w-[74%]',
          )}
        >
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 font-mono text-[10px] text-white/40">~/{project.title.toLowerCase()}</span>
          </div>
          <div className="space-y-2.5">
            {LINE_WIDTHS.map((width, i) => (
              <div
                key={width}
                className="h-2 rounded-full"
                style={{
                  width,
                  background: i === 0 ? `linear-gradient(to right, ${project.from}, ${project.to})` : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      </Parallax>
    </>
  );
}
