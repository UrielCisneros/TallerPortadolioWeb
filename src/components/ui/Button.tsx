import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';

const VARIANTS = {
  primary:
    'bg-linear-to-br from-accent to-accent-2 text-white shadow-accent hover:-translate-y-0.5 hover:shadow-accent-lg',
  ghost: 'border border-white/15 bg-white/5 text-white/80 backdrop-blur-md hover:border-white/30 hover:text-white',
};

interface ButtonProps {
  href: string;
  variant?: keyof typeof VARIANTS;
  /** Shown before the label. */
  icon?: ReactNode;
  /** Shown after the label. */
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Link styled as a button. `href` can be "#section", "https://…" or "mailto:…". */
export function Button({ href, variant = 'primary', icon, iconEnd, className, children }: ButtonProps) {
  return (
    <a
      {...linkProps(href)}
      className={cn(
        'inline-flex items-center gap-2 rounded-[10px] px-7 py-3 text-sm font-semibold no-underline transition-all duration-200',
        VARIANTS[variant],
        className,
      )}
    >
      {icon}
      {children}
      {iconEnd}
    </a>
  );
}
