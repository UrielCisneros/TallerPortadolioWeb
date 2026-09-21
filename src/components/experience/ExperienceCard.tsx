import type { Experience } from '@/types';

export function ExperienceCard({ experience }: { experience: Experience }) {
  const current = experience.dates.includes('Present');

  return (
    <li className="group relative grid grid-cols-[32px_1fr] gap-x-5 pb-10 last:pb-0 md:grid-cols-[32px_150px_1fr] md:gap-x-8 md:pb-14">
      {/* Timeline node — lit up by ScrollTrigger via `.is-active` */}
      <div className="relative z-10 row-span-2 flex h-8 w-8 items-center justify-center md:row-span-1">
        <span className="absolute inset-0 rounded-full border border-white/10 bg-[#080808] transition-colors duration-500 group-[.is-active]:border-accent/60" />
        <span className="relative h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-[.is-active]:scale-125 group-[.is-active]:bg-accent group-[.is-active]:shadow-[0_0_14px_3px_rgba(139,92,246,0.6)]" />
      </div>

      {/* Dates */}
      <div data-reveal className="flex items-center gap-2 pb-3 font-mono text-xs uppercase tracking-wider text-white/40 md:flex-col md:items-start md:pt-2">
        <span>{experience.dates}</span>
        {current && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Now
          </span>
        )}
      </div>

      {/* Card */}
      <article
        data-reveal
        className="col-start-2 rounded-2xl border border-white/[0.06] bg-surface/70 p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-surface md:col-start-3 md:row-start-1 md:p-7"
      >
        <header className="flex items-center gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-indigo-500 font-display text-lg font-bold text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]">
            {experience.company[0]}
          </div>
          <div>
            <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">{experience.title}</h3>
            <p className="text-sm font-medium text-accent-soft">{experience.company}</p>
          </div>
        </header>

        <p className="mt-5 text-[14.5px] leading-relaxed text-muted">{experience.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          {experience.metrics.map(metric => (
            <div key={metric.label} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <dt className="sr-only">{metric.label}</dt>
              <dd data-count className="bg-linear-to-br from-white to-accent-soft bg-clip-text font-display text-2xl font-bold tracking-tight text-transparent">
                {metric.value}
              </dd>
              <dd className="mt-0.5 text-xs text-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {experience.stack.map(item => (
            <li key={item} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/50">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
