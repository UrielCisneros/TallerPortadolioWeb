/**
 * Punto único de entrada a GSAP.
 *
 * Todos los archivos importan GSAP desde aquí (y no directamente de 'gsap')
 * para que los plugins queden registrados una sola vez, antes de usarse.
 */
import type { MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';           // hook oficial de GSAP para React (limpia las animaciones al desmontar)
import gsap from 'gsap';                          // núcleo de GSAP: gsap.to, gsap.from, gsap.timeline…
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // permite animar el scroll de la ventana (scroll suave)
import { ScrollTrigger } from 'gsap/ScrollTrigger';   // conecta animaciones con la posición del scroll
import { SplitText } from 'gsap/SplitText';           // divide un texto en letras / palabras / líneas animables

// Registra los plugins. Sin esto, GSAP no reconoce opciones como `scrollTrigger` o `scrollTo`.
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

/**
 * Manejador de onClick para enlaces internos (href="#proyectos") que
 * desplaza la página suavemente hasta la sección en vez de "saltar".
 *
 *   <a href="#proyectos" onClick={smoothScrollTo}>Proyectos</a>
 */
export function smoothScrollTo(e: MouseEvent<HTMLAnchorElement>) {
  // `hash` es la parte del href que empieza con "#", p. ej. "#proyectos"
  const { hash } = e.currentTarget;
  // Si el enlace no tiene hash (href="#" vacío) dejamos que el navegador haga lo normal
  if (!hash) return;
  // Evita el salto instantáneo del navegador; el scroll lo haremos nosotros
  e.preventDefault();
  // ¿El usuario pidió "reducir movimiento" en su sistema operativo?
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Anima el scroll de la ventana hasta el elemento con ese id:
  //  - offsetY: 24 → se detiene 24 px antes, para que el título no quede pegado al borde
  //  - duration: 0 si pidió reducir movimiento (salta directo), 1.4 s si no
  //  - ease 'power3.inOut' → arranca lento, acelera y frena suave al llegar
  gsap.to(window, { scrollTo: { y: hash, offsetY: 24 }, duration: reduce ? 0 : 1.4, ease: 'power3.inOut' });
}

// Reexporta todo lo que usan los componentes
export { gsap, ScrollTrigger, SplitText, useGSAP };
