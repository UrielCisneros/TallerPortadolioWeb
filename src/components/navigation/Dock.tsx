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
  /** Grupos de enlaces. Entre un grupo y otro se dibuja una línea separadora. */
  groups: NavItem[][];
  /** Dónde se coloca: 'right' | 'left' | 'bottom'. Default: 'right'. */
  position?: DockPosition;
  /** Tamaño normal de cada ícono, en px. */
  baseSize?: number;
  /** Tamaño del ícono bajo el cursor, en px. */
  maxSize?: number;
  /** Distancia (px) en la que los vecinos también crecen. */
  range?: number;
  /** Segundos de espera antes de entrar (p. ej. para dejar terminar la intro del hero). */
  enterDelay?: number;
  /** Nombre accesible del <nav> (lo leen los lectores de pantalla). */
  label?: string;
  className?: string;
}

/**
 * Dock — menú de íconos estilo macOS, con efecto de agrandado al pasar el mouse.
 *
 *   <Dock groups={[navSections, socials]} position="right" />
 *
 * Qué combina:
 *  - useMagnify        → el efecto "lupa" de los íconos.
 *  - useActiveSection  → el punto que marca la sección que estás viendo.
 *  - useMotion         → la animación de entrada.
 *
 * Renderízalo DESPUÉS de las secciones para que las posiciones de scroll sean correctas.
 * Se oculta en móvil (hidden md:flex), porque el efecto necesita mouse.
 */
export function Dock({ groups, position = 'right', baseSize = 40, maxSize = 64, range = 140, enterDelay = 0, label = 'Navegación del sitio', className }: DockProps) {
  // Clases y valores para la posición elegida (ver dockPositions.ts)
  const layout = DOCK_POSITIONS[position];
  // Efecto de agrandado: nos da el ref del contenedor y los dos manejadores de mouse
  const { ref, onMouseMove, onMouseLeave } = useMagnify<HTMLElement>({ base: baseSize, max: maxSize, range, axis: layout.axis });

  // De todos los enlaces, solo los internos ("#experiencia") corresponden a secciones.
  // flat() junta los grupos en una sola lista · slice(1) quita el "#" → "experiencia"
  const sectionIds = groups.flat().filter(item => item.href.startsWith('#')).map(item => item.href.slice(1));
  // id de la sección que está en pantalla ahora mismo
  const active = useActiveSection(sectionIds);

  // Animación de entrada: se desliza desde fuera de la pantalla y aparece
  useMotion(() => {
    gsap.from(ref.current, {
      ...layout.enter,      // p. ej. { x: 80 } → empieza 80 px a la derecha
      opacity: 0,
      duration: 0.9,
      delay: enterDelay,
      ease: 'power3.out',
    });
  }, ref);

  // El panel tiene un ancho fijo (vertical) o alto fijo (horizontal): ícono + 8 px de padding por lado.
  // Así, cuando los íconos crecen, sobresalen del panel en lugar de estirarlo.
  const panelSize = baseSize + 16;

  return (
    <nav
      ref={ref}
      aria-label={label}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={layout.axis === 'y' ? { width: panelSize } : { height: panelSize }}
      className={cn(
        // fixed: siempre visible · fondo oscuro translúcido con desenfoque (backdrop-blur)
        // hidden md:flex: oculto en móvil, visible desde tablet
        'fixed z-40 hidden gap-2 rounded-2xl border border-white/[0.08] bg-black/40 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex',
        layout.panel,
        className,
      )}
    >
      {groups.map((group, g) => (
        // Fragment agrupa sin agregar elementos extra al HTML
        <Fragment key={g}>
          {/* Separador antes de cada grupo, excepto el primero */}
          {g > 0 && <span aria-hidden="true" className={cn('bg-white/10', layout.divider)} />}
          {group.map(item => (
            <DockItem
              key={item.href}
              item={item}
              size={baseSize}
              position={position}
              // Activo si su href es "#" + la sección visible
              active={item.href === `#${active}`}
            />
          ))}
        </Fragment>
      ))}
    </nav>
  );
}
