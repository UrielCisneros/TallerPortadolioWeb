/** Dates in mono type; adds a pulsing "Now" badge when they include "Present". */
export function DateRange({ dates, currentLabel = 'Now' }: { dates: string; currentLabel?: string }) {
  const current = dates.includes('Present');

  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/40 md:flex-col md:items-start">
      <span>{dates}</span>
      {current && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {currentLabel}
        </span>
      )}
    </div>
  );
}
