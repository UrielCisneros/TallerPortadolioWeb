import { DateRange, ExperienceCard, Timeline, TimelineItem } from '@/components/experience';
import { Section } from '@/components/ui';
import { experienceCopy as copy } from '@/data/copy';
import { experiences } from '@/data/experiences';

export function ExperienceSection() {
  return (
    <Section
      id={copy.id}
      index={copy.index}
      eyebrow={copy.eyebrow}
      title={<>{copy.title} <span className="text-white/35">{copy.titleMuted}</span></>}
      description={copy.description}
    >
      <Timeline>
        {experiences.map(experience => (
          <TimelineItem
            key={`${experience.company}-${experience.title}`}
            aside={<DateRange dates={experience.dates} current={experience.current} />}
          >
            <ExperienceCard experience={experience} />
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
