import { useRef, type MouseEvent } from 'react';
import { gsap } from '@/lib/gsap';
import { useMotion } from './useMotion';

export interface MagnifyOptions {
  /** Tamaño normal de cada ítem, en px. */
  base?: number;
  /** Tamaño del ítem que está justo debajo del cursor, en px. */
  max?: number;
  /** Hasta qué distancia del cursor (px) los ítems siguen creciendo. */
  range?: number;
  /** 'y' para docks verticales, 'x' para horizontales. */
  axis?: 'x' | 'y';
}

/**
 * useMagnify — el efecto "lupa" del dock de macOS.
 *
 * Cómo funciona:
 *  - Cada ítem mide qué tan lejos está del cursor.
 *  - Cuanto más cerca, más grande (de `base` a `max`).
 *  - Los que están a más de `range` px se quedan en `base`.
 *
 * Cómo se usa: marca los hijos que crecen con `data-magnify` y, opcionalmente,
 * su contenido (el ícono) con `data-magnify-icon` para que escale al mismo ritmo.
 *
 *   const { ref, onMouseMove, onMouseLeave } = useMagnify<HTMLElement>();
 *   <nav ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 *     <a data-magnify><span data-magnify-icon>…</span></a>
 *   </nav>
 */
export function useMagnify<T extends HTMLElement>({ base = 40, max = 64, range = 140, axis = 'y' }: MagnifyOptions = {}) {
  // Referencia al contenedor (el <nav> del dock)
  const ref = useRef<T>(null);
  // Una función por ítem: resizers.current[i](48) → anima el ítem i a 48 px.
  // Se guarda en un ref (no en estado) porque cambiarla no debe re-renderizar.
  const resizers = useRef<Array<(size: number) => void>>([]);

  // Preparamos las funciones de animación (solo si se permite movimiento)
  useMotion(() => {
    // Todos los ítems marcados con data-magnify dentro del contenedor
    resizers.current = gsap.utils.toArray<HTMLElement>('[data-magnify]', ref.current).map(item => {
      // Cada cambio de tamaño tarda 0.3 s y frena suave al final
      const opts = { duration: 0.3, ease: 'power3.out' };
      // quickTo crea una función ultrarrápida para animar UNA propiedad hacia un valor.
      // Es ideal para eventos que se disparan muchas veces por segundo (como mousemove):
      // en vez de crear un tween nuevo cada vez, reutiliza el mismo.
      const width = gsap.quickTo(item, 'width', opts);
      const height = gsap.quickTo(item, 'height', opts);
      // El ícono de adentro (si existe) se escala para acompañar al contenedor
      const icon = item.querySelector('[data-magnify-icon]');
      const scale = icon ? gsap.quickTo(icon, 'scale', opts) : null;
      // Función final para este ítem: cambia ancho, alto y escala del ícono.
      // size / base → si el ítem mide 60 y la base es 40, el ícono escala 1.5×
      return size => { width(size); height(size); scale?.(size / base); };
    });
    // Limpieza: si se revierte (desmontaje o reducir movimiento), vaciamos la lista
    // para que onMouseMove deje de animar.
    return () => { resizers.current = []; };
  }, ref);

  /** Se llama cada vez que el mouse se mueve sobre el dock. */
  function onMouseMove(e: MouseEvent<T>) {
    // Posición del cursor en el eje que importa (vertical u horizontal)
    const pointer = axis === 'y' ? e.clientY : e.clientX;
    // Recorremos cada ítem del dock
    e.currentTarget.querySelectorAll<HTMLElement>('[data-magnify]').forEach((item, i) => {
      // Posición y tamaño actuales del ítem en pantalla
      const rect = item.getBoundingClientRect();
      // Centro del ítem en ese mismo eje
      const center = axis === 'y' ? rect.top + rect.height / 2 : rect.left + rect.width / 2;
      // t = cercanía normalizada: 1 si el cursor está en el centro, 0 si está a `range` px o más
      const t = Math.max(0, 1 - Math.abs(pointer - center) / range);
      // "smoothstep": suaviza la curva para que el crecimiento no sea lineal (se ve más natural)
      const eased = t * t * (3 - 2 * t);
      // Tamaño final: base + (lo que puede crecer × cercanía). ?. por si aún no hay resizers
      resizers.current[i]?.(base + (max - base) * eased);
    });
  }

  /** Cuando el mouse sale del dock, todos vuelven a su tamaño normal. */
  function onMouseLeave() {
    resizers.current.forEach(resize => resize(base));
  }

  // El componente conecta estas tres piezas a su contenedor
  return { ref, onMouseMove, onMouseLeave };
}
