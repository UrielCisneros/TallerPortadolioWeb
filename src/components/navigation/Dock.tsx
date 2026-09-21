import { Fragment } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMagnify } from '@/hooks/useMagnify';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/cn';
import { gsap } from '@/lib/gsap';
import type { NavItem } from '@/types';
import { DockItem } from './DockItem';
import { DOCK_POSITIONS, type DockPosition } from './dockPositions';

interface DockProps {
  /** Groups of links; a divider is drawn between groups. */
  groups: NavItem[][];
  position?: DockPosition;
  /** Resting icon size, in px. */
  baseSize?: number;
  /** Icon size under the cursor, in px. */
  maxSize?: number;
  /** Distance (px) over which neighbors also grow. */
  range?: number;
  /** Seconds to wait before sliding in (e.g. to let a hero intro play first). */
  enterDelay?: number;
  className?: string;
}

/**
 * macOS-style dock with magnification (desktop only).
 * Links to "#section" get an active dot while that section is on screen —
 * render the Dock *after* the sections so it sees the final layout.
 *
 *   <Dock groups={[navSections, socials]} position="right" />
 */
export function Dock({ groups, position = 'right', baseSize = 40, maxSize = 64, range = 140, enterDelay = 0, className }: DockProps) {
  const layout = DOCK_POSITIONS[position];
  const { ref, onMouseMove, onMouseLeave } = useMagnify<HTMLElement>({ base: baseSize, max: maxSize, range, axis: layout.axis });

  const sectionIds = groups.flat().filter(item => item.href.startsWith('#')).map(item => item.href.slice(1));
  const active = useActiveSection(sectionIds);

  useMotion(() => {
    gsap.from(ref.current, { ...layout.enter, opacity: 0, duration: 0.9, delay: enterDelay, ease: 'power3.out' });
  }, ref);

  const panelSize = baseSize + 16;

  return (
    <nav
      ref={ref}
      aria-label="Site navigation"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={layout.axis === 'y' ? { width: panelSize } : { height: panelSize }}
      className={cn(
        'fixed z-40 hidden gap-2 rounded-2xl border border-white/[0.08] bg-black/40 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex',
        layout.panel,
        className,
      )}
    >
      {groups.map((group, g) => (
        <Fragment key={g}>
          {g > 0 && <span aria-hidden="true" className={cn('bg-white/10', layout.divider)} />}
          {group.map(item => (
            <DockItem
              key={item.href}
              item={item}
              size={baseSize}
              position={position}
              active={item.href === `#${active}`}
            />
          ))}
        </Fragment>
      ))}
    </nav>
  );
}
