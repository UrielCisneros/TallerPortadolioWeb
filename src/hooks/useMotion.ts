import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * useMotion — la base de TODAS las animaciones del proyecto.
 *
 * Hace tres cosas por ti:
 *  1. Solo ejecuta `setup` si el usuario NO pidió "reducir movimiento"
 *     (ajuste de accesibilidad del sistema operativo). Si lo pidió, el
 *     contenido se queda en su estado normal, sin animar.
 *  2. Limita los selectores al `scope`: dentro de `setup`, gsap.to('.caja')
 *     solo busca '.caja' dentro del elemento de `scope`, no en toda la página.
 *  3. Al desmontar el componente, revierte y elimina todas las animaciones y
 *     ScrollTriggers que se crearon (evita fugas de memoria y estilos colgados).
 *
 * Uso:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useMotion(() => {
 *     gsap.from('.caja', { y: 50, opacity: 0 });
 *   }, ref);
 *
 * `setup` puede devolver una función de limpieza (se ejecuta al revertir).
 */
export function useMotion(setup: () => void, scope: RefObject<HTMLElement | null>) {
  // useGSAP es como useLayoutEffect, pero guarda todo lo que crea GSAP en un "contexto"
  // para poder revertirlo automáticamente al desmontar.
  useGSAP(() => {
    // matchMedia de GSAP: ejecuta código solo cuando se cumple una media query
    const mm = gsap.matchMedia();
    // Ejecuta `setup` solo si NO hay preferencia de movimiento reducido.
    // El tercer argumento (scope) hace que los selectores de texto se busquen dentro del ref.
    // Si el usuario cambia la preferencia en vivo, GSAP revierte / vuelve a ejecutar solo.
    mm.add('(prefers-reduced-motion: no-preference)', setup, scope);
    // Al desmontar: deshace todo lo que se creó dentro de mm (tweens, timelines, ScrollTriggers)
    return () => mm.revert();
  }, { scope });
}
