import { CountUp } from '@/components/motion/CountUp';
import type { Metric } from '@/types';

/**
 * Stat — un número grande con su etiqueta. El número cuenta desde cero al aparecer.
 *
 *   <dl>
 *     <Stat value="40%" label="menos latencia" />
 *   </dl>
 *
 * Va dentro de un <dl> (lista de definiciones): <dt> es el término, <dd> su valor.
 */
export function Stat({ value, label }: Metric) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
      {/* Término oculto visualmente (sr-only) pero leído por lectores de pantalla */}
      <dt className="sr-only">{label}</dt>
      <dd>
        {/* Texto con degradado: el fondo es un degradado, bg-clip-text lo recorta a la forma de las letras
            y text-transparent deja ver ese fondo */}
        <CountUp
          value={value}
          className="bg-linear-to-br from-white to-accent-soft bg-clip-text font-display text-2xl font-bold tracking-tight text-transparent"
        />
      </dd>
      {/* Etiqueta visible */}
      <dd className="mt-0.5 text-xs text-muted">{label}</dd>
    </div>
  );
}
