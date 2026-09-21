/** Dónde se puede colocar el dock. */
export type DockPosition = 'right' | 'left' | 'bottom';

/** Todo lo que cambia según la posición del dock. */
interface DockLayout {
  /** Eje en el que se acomodan (y se agrandan) los íconos: 'y' vertical, 'x' horizontal. */
  axis: 'x' | 'y';
  /** Clases del panel: dónde se fija en la pantalla y hacia dónde crecen los íconos. */
  panel: string;
  /** Clases de la línea separadora entre grupos. */
  divider: string;
  /** Clases de la etiqueta que aparece al pasar el mouse (y su desplazamiento inicial). */
  tooltip: string;
  /** Clases del punto que marca la sección activa. */
  dot: string;
  /** Desde dónde entra el dock al cargar la página (propiedades de GSAP). */
  enter: gsap.TweenVars;
}

/**
 * Configuración de cada posición. Separarla aquí mantiene limpio el componente:
 * Dock y DockItem solo leen DOCK_POSITIONS[position].
 */
export const DOCK_POSITIONS: Record<DockPosition, DockLayout> = {
  right: {
    axis: 'y',
    // Pegado a la derecha y centrado verticalmente. items-end: los íconos crecen hacia la izquierda
    panel: 'right-4 top-1/2 -translate-y-1/2 flex-col items-end',
    divider: 'my-1 mr-2 h-px w-6',
    // Tooltip a la izquierda del ícono, empezando 4 px desplazado (se desliza al aparecer)
    tooltip: 'right-full mr-4 translate-x-1',
    // Punto en el borde derecho, centrado verticalmente
    dot: '-right-[7px] top-1/2 -translate-y-1/2',
    // Entra deslizándose desde 80 px a la derecha
    enter: { x: 80 },
  },
  left: {
    axis: 'y',
    // Pegado a la izquierda. items-start: los íconos crecen hacia la derecha
    panel: 'left-4 top-1/2 -translate-y-1/2 flex-col items-start',
    divider: 'my-1 ml-2 h-px w-6',
    tooltip: 'left-full ml-4 -translate-x-1',
    dot: '-left-[7px] top-1/2 -translate-y-1/2',
    enter: { x: -80 },
  },
  bottom: {
    axis: 'x',
    // Abajo y centrado horizontalmente, como el dock de macOS. items-end: crecen hacia arriba
    panel: 'bottom-4 left-1/2 -translate-x-1/2 flex-row items-end',
    divider: 'mx-1 mb-2 h-6 w-px',
    tooltip: 'bottom-full mb-4 translate-y-1',
    dot: '-bottom-[7px] left-1/2 -translate-x-1/2',
    enter: { y: 80 },
  },
};
