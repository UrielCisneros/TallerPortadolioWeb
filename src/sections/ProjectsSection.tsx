import { ProjectGrid } from '@/components/projects';
import { Button, Section } from '@/components/ui';
import { projectsCopy as copy } from '@/data/copy';
import { projects } from '@/data/projects';
import { socials } from '@/data/socials';

const githubUrl = socials.find(s => s.label === 'GitHub')?.href;

export function ProjectsSection() {
  return (
    <Section
      id={copy.id}
      index={copy.index}
      eyebrow={copy.eyebrow}
      title={<>{copy.title} <span className="text-white/35">{copy.titleMuted}</span></>}
      description={copy.description}
    >
      <ProjectGrid projects={projects} />

      {githubUrl && (
        <div className="mt-10 flex justify-center">
          <Button href={githubUrl} variant="ghost" iconEnd="→" className="rounded-full">{copy.moreLabel}</Button>
        </div>
      )}
    </Section>
  );
}
