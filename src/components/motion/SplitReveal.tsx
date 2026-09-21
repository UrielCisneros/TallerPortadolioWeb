import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, SplitText } from '@/lib/gsap';

export interface SplitRevealProps extends HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML ('h2', 'p'…). Default: 'div'. */
  as?: ElementType;
  /** En qué partes se divide el texto. Default: 'words' (palabras). */
  by?: 'words' | 'chars' | 'lines';
  /** Segundos de espera antes de empezar. */
  delay?: number;
  /** Segundos entre una parte y la siguiente. */
  stagger?: number;
  /** Cuándo empieza (sintaxis de ScrollTrigger). */
  start?: string;
}

/**
 * SplitReveal — texto que aparece deslizándose hacia arriba, pieza por pieza.
 *
 *   <SplitReveal as="h2" by="words">Hola mundo</SplitReveal>
 *
 * El truco: SplitText envuelve cada palabra en un "marco" (mask) que recorta
 * lo que sobresale. La palabra empieza debajo de su marco (invisible) y sube
 * hasta su lugar, como si saliera de detrás de una línea.
 */
export function SplitReveal({ as, by = 'words', delay = 0, stagger = 0.06, start = 'top 85%', children, ...rest }: SplitRevealProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    // Divide el texto del elemento en piezas (palabras, letras o líneas).
    // type: qué piezas crear · mask: envuelve cada pieza en un contenedor con overflow oculto
    const split = SplitText.create(ref.current, { type: by, mask: by });
    // split.words / split.chars / split.lines → el array de piezas que pedimos
    gsap.from(split[by], {
      // Cada pieza empieza 110 % de su propia altura más abajo (escondida bajo su máscara)
      yPercent: 110,
      // Cada pieza tarda 0.8 s en subir
      duration: 0.8,
      // Retraso entre una pieza y la siguiente → efecto "ola"
      stagger,
      delay,
      ease: 'power3.out',
      // Se dispara cuando el texto entra en pantalla
      scrollTrigger: { trigger: ref.current, start },
    });
    // Nota: useMotion revierte el SplitText al desmontar y el texto vuelve a ser normal
  }, ref);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
