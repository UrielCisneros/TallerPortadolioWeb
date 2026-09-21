import { DateRange, ExperienceCard, Timeline, TimelineItem } from '@/components/experience';
import { Section } from '@/components/ui';
import { experiences } from '@/data/experiences';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="01"
      eyebrow="Experience"
      title={<>Where I've shipped <span className="text-white/35">real impact.</span></>}
      description="Eight years across payments, edge infrastructure and product engineering — building systems that stay fast under pressure."
    >
      <Timeline>
        {experiences.map(experience => (
          <TimelineItem key={`${experience.company}-${experience.title}`} aside={<DateRange dates={experience.dates} />}>
            <ExperienceCard experience={experience} />
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
