import { Reveal } from '@/components/motion/Reveal';
import { IconLink } from '@/components/ui/IconLink';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/types';

/** Row of icon links that pop in one by one. */
export function SocialLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <Reveal as="nav" variant="pop" stagger={0.08} duration={0.6} start="top 90%" className={cn('flex justify-center gap-2.5', className)}>
      {items.map(item => <IconLink key={item.href} item={item} />)}
    </Reveal>
  );
}
