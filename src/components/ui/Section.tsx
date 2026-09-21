import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SectionHeader, type SectionHeaderProps } from './SectionHeader';

interface SectionProps extends SectionHeaderProps {
  /** Anchor id — used by the dock / navigation links (href="#id"). */
  id: string;
  className?: string;
  children: ReactNode;
}

/** A page section with its header. */
export function Section({ id, className, children, ...header }: SectionProps) {
  return (
    <section id={id} className={cn('mb-32 scroll-mt-6', className)}>
      <SectionHeader {...header} />
      {children}
    </section>
  );
}
