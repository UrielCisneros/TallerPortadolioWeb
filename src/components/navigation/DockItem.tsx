import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';
import type { NavItem } from '@/types';
import { DOCK_POSITIONS, type DockPosition } from './dockPositions';

interface DockItemProps {
  item: NavItem;
  /** Resting size in px (the dock animates it from there). */
  size: number;
  position: DockPosition;
  active?: boolean;
}

export function DockItem({ item, size, position, active }: DockItemProps) {
  const { label, href, icon: Icon } = item;
  const layout = DOCK_POSITIONS[position];

  return (
    <a
      {...linkProps(href)}
      data-magnify
      aria-label={label}
      aria-current={active ? 'true' : undefined}
      style={{ width: size, height: size }}
      className="group relative flex shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-white/50 transition-colors duration-200 hover:border-white/15 hover:bg-white/10 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span data-magnify-icon className="inline-flex">
        <Icon size={18} />
      </span>

      {/* Tooltip */}
      <span
        className={cn(
          'pointer-events-none absolute whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-1 font-mono text-[11px] text-white opacity-0 backdrop-blur-md transition-all duration-200',
          'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
          layout.tooltip,
        )}
      >
        {label}
      </span>

      {/* Active-section indicator, like the macOS "running app" dot */}
      <span
        className={cn(
          'absolute h-1 w-1 rounded-full bg-accent shadow-glow-sm transition-opacity duration-300',
          layout.dot,
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
    </a>
  );
}
