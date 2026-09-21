import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';
import type { NavItem } from '@/types';
import { DOCK_POSITIONS, type DockPosition } from './dockPositions';

interface DockItemProps {
  /** Etiqueta, enlace e ícono. */
  item: NavItem;
  /** Tamaño inicial en px (el dock lo anima a partir de ahí). */
  size: number;
  /** Posición del dock: decide dónde van la etiqueta y el punto. */
  position: DockPosition;
  /** ¿Es la sección que se está viendo? Muestra el punto. */
  active?: boolean;
}

/**
 * DockItem — un ícono del dock, con su etiqueta flotante y el punto de "activo".
 *
 * No anima nada por sí mismo: los atributos data-magnify y data-magnify-icon
 * le indican a useMagnify (en el Dock) qué agrandar.
 * La etiqueta y el cambio de color son transiciones CSS puras (clases hover de Tailwind).
 */
export function DockItem({ item, size, position, active }: DockItemProps) {
  // Renombramos `icon` a `Icon` (mayúscula) para poder usarlo como componente: <Icon />
  const { label, href, icon: Icon } = item;
  const layout = DOCK_POSITIONS[position];

  return (
    <a
      // href + onClick/target según el tipo de enlace (ver lib/links.ts)
      {...linkProps(href)}
      // Este elemento crece con el efecto lupa
      data-magnify
      // Solo hay ícono, así que el texto accesible va en aria-label
      aria-label={label}
      // Indica a lectores de pantalla cuál es la sección actual
      aria-current={active ? 'true' : undefined}
      // Tamaño inicial inline: GSAP luego anima width/height desde aquí
      style={{ width: size, height: size }}
      // `group` permite que los hijos reaccionen al hover de este enlace (group-hover:)
      className="group relative flex shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-white/50 transition-colors duration-200 hover:border-white/15 hover:bg-white/10 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* El ícono escala junto con el contenedor */}
      <span data-magnify-icon className="inline-flex">
        <Icon size={18} />
      </span>

      {/* Etiqueta flotante: invisible (opacity-0) y un poco desplazada;
          al hacer hover o recibir foco con el teclado, aparece y se desliza a su lugar */}
      <span
        className={cn(
          'pointer-events-none absolute whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-1 font-mono text-[11px] text-white opacity-0 backdrop-blur-md transition-all duration-200',
          'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
          layout.tooltip,
        )}
      >
        {label}
      </span>

      {/* Punto de sección activa, como el de las apps abiertas en macOS */}
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
