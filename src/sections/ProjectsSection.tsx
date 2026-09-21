import { ProjectGrid } from '@/components/projects';
import { Button, Section } from '@/components/ui';
import { projects } from '@/data/projects';
import { socials } from '@/data/socials';

const githubUrl = socials.find(s => s.label === 'GitHub')?.href;

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Selected work"
      title={<>Things I've built <span className="text-white/35">on my own time.</span></>}
      description="Side projects and open-source tools — mostly born from scratching my own itch."
    >
      <ProjectGrid projects={projects} />

      {githubUrl && (
        <div className="mt-10 flex justify-center">
          <Button href={githubUrl} variant="ghost" iconEnd="→" className="rounded-full">More on GitHub</Button>
        </div>
      )}
    </Section>
  );
}
