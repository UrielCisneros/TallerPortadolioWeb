import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered column with the page's max width and side padding. */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('relative z-[1] mx-auto max-w-[960px] px-6', className)}>{children}</Tag>;
}
