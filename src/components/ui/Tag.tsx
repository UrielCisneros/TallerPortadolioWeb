import { cn } from '@/lib/cn';

/** Small monospace chip for technologies, skills, etc. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-white/55">
      {children}
    </span>
  );
}

/** A wrapping list of <Tag>s. */
export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map(item => (
        <li key={item}><Tag>{item}</Tag></li>
      ))}
    </ul>
  );
}
