export type DockPosition = 'right' | 'left' | 'bottom';

interface DockLayout {
  /** Axis the icons are laid out (and magnified) along. */
  axis: 'x' | 'y';
  panel: string;
  divider: string;
  tooltip: string;
  dot: string;
  /** Where the dock slides in from. */
  enter: gsap.TweenVars;
}

/** Tailwind classes for each dock placement. */
export const DOCK_POSITIONS: Record<DockPosition, DockLayout> = {
  right: {
    axis: 'y',
    panel: 'right-4 top-1/2 -translate-y-1/2 flex-col items-end',
    divider: 'my-1 mr-2 h-px w-6',
    tooltip: 'right-full mr-4 translate-x-1',
    dot: '-right-[7px] top-1/2 -translate-y-1/2',
    enter: { x: 80 },
  },
  left: {
    axis: 'y',
    panel: 'left-4 top-1/2 -translate-y-1/2 flex-col items-start',
    divider: 'my-1 ml-2 h-px w-6',
    tooltip: 'left-full ml-4 -translate-x-1',
    dot: '-left-[7px] top-1/2 -translate-y-1/2',
    enter: { x: -80 },
  },
  bottom: {
    axis: 'x',
    panel: 'bottom-4 left-1/2 -translate-x-1/2 flex-row items-end',
    divider: 'mx-1 mb-2 h-6 w-px',
    tooltip: 'bottom-full mb-4 translate-y-1',
    dot: '-bottom-[7px] left-1/2 -translate-x-1/2',
    enter: { y: 80 },
  },
};
