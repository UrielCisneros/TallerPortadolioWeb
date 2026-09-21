/**
 * DateRange — fechas en tipografía monoespaciada. Si es el trabajo actual,
 * agrega una etiqueta verde con un punto que pulsa.
 *
 *   <DateRange dates="2022 – Actualidad" current />
 *
 * El pulso es la clase `animate-pulse` de Tailwind (CSS puro, sin GSAP).
 */
export function DateRange({ dates, current, currentLabel = 'Actual' }: { dates: string; current?: boolean; currentLabel?: string }) {
  return (
    // En móvil van en fila; en escritorio (md:) en columna, debajo una de la otra
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/40 md:flex-col md:items-start">
      <span>{dates}</span>
      {/* Solo si es el trabajo actual */}
      {current && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-[10px] text-success">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          {currentLabel}
        </span>
      )}
    </div>
  );
}
