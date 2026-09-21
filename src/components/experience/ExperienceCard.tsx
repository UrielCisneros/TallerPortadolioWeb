import { Stat } from '@/components/ui/Stat';
import { TagList } from '@/components/ui/Tag';
import type { Experience } from '@/types';

/**
 * ExperienceCard — tarjeta de un trabajo: puesto, empresa, descripción,
 * métricas clave (que cuentan desde cero) y tecnologías.
 *
 *   <ExperienceCard experience={trabajo} />
 *
 * Las métricas se animan solas porque <Stat> usa <CountUp> por dentro.
 * El hover (borde y fondo) es una transición CSS.
 */
export function ExperienceCard({ experience }: { experience: Experience }) {
  // Sacamos los campos que usamos del objeto
  const { title, company, description, metrics, stack } = experience;

  return (
    <article className="rounded-2xl border border-white/[0.06] bg-surface/70 p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-surface md:p-7">
      <header className="flex items-center gap-4">
        {/* "Logo" de la empresa: su primera letra sobre un degradado del tema */}
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 font-display text-lg font-bold text-white shadow-accent-sm">
          {company[0]}
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
          <p className="text-sm font-medium text-accent-soft">{company}</p>
        </div>
      </header>

      <p className="mt-5 text-[14.5px] leading-relaxed text-muted">{description}</p>

      {/* Métricas en 2 columnas. <dl> = lista de definiciones (etiqueta → valor) */}
      {metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {/* {...metric} pasa value y label como props */}
          {metrics.map(metric => <Stat key={metric.label} {...metric} />)}
        </dl>
      )}

      {/* Tecnologías usadas */}
      {stack.length > 0 && <TagList items={stack} className="mt-5" />}
    </article>
  );
}
