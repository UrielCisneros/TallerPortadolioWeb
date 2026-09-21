import { Stat } from '@/components/ui/Stat';
import { TagList } from '@/components/ui/Tag';
import type { Experience } from '@/types';

/** Role, company, description, key metrics and stack for one job. */
export function ExperienceCard({ experience }: { experience: Experience }) {
  const { title, company, description, metrics, stack } = experience;

  return (
    <article className="rounded-2xl border border-white/[0.06] bg-surface/70 p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-surface md:p-7">
      <header className="flex items-center gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-indigo-500 font-display text-lg font-bold text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]">
          {company[0]}
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
          <p className="text-sm font-medium text-accent-soft">{company}</p>
        </div>
      </header>

      <p className="mt-5 text-[14.5px] leading-relaxed text-muted">{description}</p>

      {metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {metrics.map(metric => <Stat key={metric.label} {...metric} />)}
        </dl>
      )}

      {stack.length > 0 && <TagList items={stack} className="mt-5" />}
    </article>
  );
}
