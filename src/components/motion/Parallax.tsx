import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

export interface ParallaxProps extends HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML. Default: 'div'. */
  as?: ElementType;
  /**
   * Cuánto se desplaza mientras su padre cruza la pantalla.
   * Positivo: sube (va contra el scroll). Negativo: baja. Default: 0.3 (= 30 px hacia cada lado).
   */
  speed?: number;
}

/**
 * Parallax — mueve su contenido a una velocidad distinta a la del scroll,
 * lo que da sensación de profundidad.
 *
 *   <div className="relative h-96 overflow-hidden">
 *     <Parallax speed={0.5} className="absolute inset-0"><img … /></Parallax>
 *   </div>
 *
 * Usa al PADRE como referencia (no a sí mismo) porque el propio elemento se
 * está moviendo; medir algo que se mueve haría el efecto inestable.
 * Consejo: haz el contenido un poco más grande que el padre (p. ej. -inset-y-[15%])
 * para que al desplazarse nunca se vea el borde.
 */
export function Parallax({ as, speed = 0.3, children, ...rest }: ParallaxProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    // Distancia en píxeles: speed 0.3 → 30 px
    const distance = speed * 100;
    // fromTo: definimos el inicio Y el final explícitamente
    gsap.fromTo(ref.current, { y: distance }, {   // empieza 30 px abajo…
      y: -distance,                                // …y termina 30 px arriba
      // 'none' = movimiento lineal: 1 px de scroll → siempre el mismo avance
      ease: 'none',
      scrollTrigger: {
        // El padre es quien marca el progreso
        trigger: ref.current?.parentElement,
        // Empieza cuando el borde SUPERIOR del padre asoma por ABAJO de la pantalla…
        start: 'top bottom',
        // …y termina cuando su borde INFERIOR sale por ARRIBA
        end: 'bottom top',
        // scrub: la animación va "pegada" al scroll (si scrolleas hacia atrás, retrocede)
        scrub: true,
      },
    });
  }, ref);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
