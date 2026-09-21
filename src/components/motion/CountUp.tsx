import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap } from '@/lib/gsap';

interface CountUpProps {
  /** Texto con UN número adentro: "40%", "$2B+", "50M+". */
  value: string;
  /** Segundos que tarda en contar. Default: 1.6. */
  duration?: number;
  className?: string;
}

/**
 * CountUp — cuenta el número de `value` desde cero cuando entra en pantalla.
 *
 *   <CountUp value="$2B+" />   →   $0B+ … $1B+ … $2B+
 *
 * Conserva lo que va antes y después del número (el "$", el "B+", el "%").
 * Si el usuario pidió reducir movimiento, simplemente muestra el valor final.
 */
export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotion(() => {
    const el = ref.current;
    // Expresión regular que separa el texto en 3 partes:
    //   (\D*)  → prefijo: todo lo que NO es dígito al inicio   ("$")
    //   (\d+)  → el número                                     ("2")
    //   (.*)   → sufijo: el resto                              ("B+")
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    // Si no hay elemento o el texto no tiene número, no animamos
    if (!el || !match) return;

    // Descartamos el primer elemento (el texto completo) y nos quedamos con las 3 partes
    const [, prefix, target, suffix] = match;
    // GSAP puede animar propiedades de cualquier objeto, no solo de elementos HTML.
    // Animaremos counter.value de 0 al número final.
    const counter = { value: 0 };
    // Mostramos el valor inicial en cero ("$0B+") antes de que empiece
    el.textContent = `${prefix}0${suffix}`;
    gsap.to(counter, {
      // Destino: el número real (convertido de texto a número)
      value: Number(target),
      duration,
      // Cuenta rápido al inicio y frena al final
      ease: 'power2.out',
      // Empieza cuando el número está al 90 % de la pantalla
      scrollTrigger: { trigger: el, start: 'top 90%' },
      // En cada fotograma, escribimos el número redondeado con su prefijo y sufijo
      onUpdate: () => { el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`; },
    });
    // Limpieza: al revertir, dejamos el texto original
    return () => { el.textContent = value; };
  }, ref);

  // En el HTML inicial va el valor final: así se ve bien sin JavaScript o sin animaciones
  return <span ref={ref} className={className}>{value}</span>;
}
