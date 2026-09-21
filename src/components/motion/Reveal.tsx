import { useRef, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/** Las formas de aparecer disponibles. */
export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rise' | 'pop';

/**
 * Estado INICIAL de cada variante (desde dónde aparece).
 * La animación siempre termina en la posición natural del elemento.
 *
 *   y: 60       → empieza 60 px más abajo y sube
 *   x: -60      → empieza 60 px a la izquierda y se desliza a la derecha
 *   scale: 0.9  → empieza al 90 % de su tamaño y crece
 *   opacity: 0  → empieza invisible
 *   ease        → (opcional) curva propia de la variante
 */
const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },                                   // sube
  down: { y: -60, opacity: 0 },                                // baja
  left: { x: -60, opacity: 0 },                                // entra desde la izquierda
  right: { x: 60, opacity: 0 },                                // entra desde la derecha
  fade: { opacity: 0 },                                        // solo aparece
  scale: { scale: 0.9, opacity: 0 },                           // crece un poco
  rise: { y: 80, scale: 0.94, opacity: 0 },                    // sube y crece (tarjetas)
  pop: { y: 30, scale: 0.4, opacity: 0, ease: 'back.out(2)' }, // "salta" con rebote (íconos)
};

/** Estado FINAL: posición y tamaño naturales, totalmente visible. */
const RESTED = { x: 0, y: 0, scale: 1, opacity: 1 };

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Etiqueta HTML a renderizar ('div', 'ul', 'p', 'footer'…). Default: 'div'. */
  as?: ElementType;
  /** Forma de aparecer. Default: 'up'. */
  variant?: RevealVariant;
  /** Segundos de espera antes de empezar. */
  delay?: number;
  /** Segundos que dura la animación. */
  duration?: number;
  /** Si se indica, anima cada HIJO directo uno tras otro (en vez del elemento completo). */
  stagger?: number;
  /** Cuándo empieza (sintaxis de ScrollTrigger). Default: 'top 85%'. */
  start?: string;
}

/**
 * Reveal — hace aparecer su contenido cuando entra en pantalla al hacer scroll.
 *
 *   <Reveal variant="left">Hola</Reveal>
 *   <Reveal as="ul" stagger={0.1} variant="pop">{items}</Reveal>
 *
 * Tiene dos modos:
 *  - Sin `stagger`: anima el elemento completo.
 *  - Con `stagger`: anima cada hijo directo, uno después del otro (efecto cascada).
 */
export function Reveal({ as, variant = 'up', delay = 0, duration = 0.8, stagger, start = 'top 85%', children, ...rest }: RevealProps) {
  // Etiqueta a renderizar; por defecto un <div>
  const Tag = as ?? 'div';
  // Referencia al elemento real del DOM, para que GSAP lo pueda animar
  const ref = useRef<HTMLElement>(null);

  useMotion(() => {
    const el = ref.current;
    // Por seguridad: si aún no existe el elemento, no hacemos nada
    if (!el) return;
    // Separamos la curva (ease) del resto de propiedades iniciales.
    // Si la variante no define ease, usamos 'power3.out' (rápido al inicio, suave al final).
    const { ease = 'power3.out', ...from } = VARIANTS[variant];

    // ── Modo 1: animar el elemento completo ──
    if (stagger === undefined) {
      // gsap.from anima DESDE `from` HASTA el estado actual (su posición natural)
      gsap.from(el, {
        ...from, ease, duration, delay,
        // Empieza cuando el borde superior del elemento llega al 85 % de la altura de la pantalla
        scrollTrigger: { trigger: el, start },
      });
      return;
    }

    // ── Modo 2: animar cada hijo en cascada ──
    // Hijos directos del elemento (cada tarjeta, cada ícono…)
    const items = Array.from(el.children);
    // Los dejamos en el estado inicial desde ya (ocultos), para que no "parpadeen"
    gsap.set(items, from);
    // ScrollTrigger.batch agrupa los hijos que entran en pantalla al mismo tiempo.
    // Así, en una cuadrícula, cada fila aparece en cascada cuando llega su turno,
    // en vez de animar todo junto aunque la última fila aún no se vea.
    ScrollTrigger.batch(items, {
      start,
      // once: solo la primera vez; si vuelves a subir no se repite
      once: true,
      // `batch` = los hijos que acaban de entrar → los llevamos a su estado final,
      // separados por `stagger` segundos entre uno y otro
      onEnter: batch => gsap.to(batch, { ...RESTED, ease, duration, delay, stagger }),
    });
  }, ref);

  // ...rest pasa cualquier otra prop (className, id, aria-*…) a la etiqueta
  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
