import { cn } from '@/lib/cn';

/**
 * Tag — etiqueta pequeña en fuente monoespaciada (tecnologías, habilidades…).
 *
 *   <Tag>TypeScript</Tag>
 */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-white/55">
      {children}
    </span>
  );
}

/**
 * TagList — lista de <Tag>s que salta de línea cuando no caben (flex-wrap).
 *
 *   <TagList items={['React', 'Go', 'Redis']} />
 */
export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {/* El propio texto sirve como key porque no se repite dentro de la lista */}
      {items.map(item => (
        <li key={item}><Tag>{item}</Tag></li>
      ))}
    </ul>
  );
}
