import { linkProps } from '@/lib/links';
import type { NavItem } from '@/types';

/** Square icon button that links somewhere (social profiles, email…). */
export function IconLink({ item }: { item: NavItem }) {
  const { label, href, icon: Icon } = item;
  return (
    <a
      {...linkProps(href)}
      aria-label={label}
      title={label}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-line bg-surface-raised text-subtle transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
    >
      <Icon />
    </a>
  );
}
