import type { ReactNode } from 'react';

/** Rounded pill with a glowing green dot, e.g. "Available for opportunities". */
export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/20 px-3.5 py-1 text-xs font-medium tracking-wide text-accent-soft backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-success shadow-success" />
      {children}
    </span>
  );
}
