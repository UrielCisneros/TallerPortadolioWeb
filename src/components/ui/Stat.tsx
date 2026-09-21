import { CountUp } from '@/components/motion/CountUp';
import type { Metric } from '@/types';

/** A big number with a label. Place inside a <dl>. The number counts up on scroll. */
export function Stat({ value, label }: Metric) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <dt className="sr-only">{label}</dt>
      <dd>
        <CountUp
          value={value}
          className="bg-linear-to-br from-white to-accent-soft bg-clip-text font-display text-2xl font-bold tracking-tight text-transparent"
        />
      </dd>
      <dd className="mt-0.5 text-xs text-muted">{label}</dd>
    </div>
  );
}
