import { useRef, type ReactNode } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/cn';
import { gsap, SplitText } from '@/lib/gsap';

interface ScrollHeroProps {
  /** id de la sección (para enlazarla desde el menú: href="#inicio"). */
  id?: string;
  /** Texto gigante del cuadro inicial (sus letras se dispersan al hacer scroll). */
  title: string;
  /** URL de la imagen de fondo. */
  image: string;
  /** Normalmente un <HeroCorners>. Se desvanece al empezar el scroll. */
  corners?: ReactNode;
  /** Cuánto tiempo se queda fijado, en % de la altura de la pantalla. Default: 250 (= 2.5 pantallas). */
  scrollLength?: number;
  /** Clases extra para la columna que contiene el contenido final. */
  contentClassName?: string;
  /**
   * Contenido del cuadro final. Cada hijo DIRECTO aparece uno tras otro, en orden.
   * Si un hijo de texto tiene el atributo `data-split`, aparece palabra por palabra.
   */
  children: ReactNode;
}

/*
 * La "ventana" de la imagen se hace con clip-path: inset(arriba derecha abajo izquierda round radio).
 * inset(24% 32% 24% 32%) recorta 24 % arriba y abajo y 32 % a los lados → queda un rectángulo
 * al centro. inset(0% 0% 0% 0%) no recorta nada → imagen a pantalla completa.
 * GSAP puede animar entre ambos porque tienen la misma estructura de números.
 */
const FULL_FRAME = 'inset(0% 0% 0% 0% round 0px)';
// Es una función (no una constante) para leer el ancho de pantalla en el momento:
// en móvil la ventana inicial es más ancha (solo 10 % a los lados).
const startFrame = () =>
  window.innerWidth < 768 ? 'inset(30% 10% 30% 10% round 20px)' : 'inset(24% 32% 24% 32% round 28px)';

/**
 * ScrollHero — hero "fijado" (pinned) que cuenta una pequeña historia con el scroll.
 *
 *  1. Cuadro inicial: título gigante sobre una ventana pequeña con la imagen; textos en las esquinas.
 *  2. Al hacer scroll: la ventana crece a pantalla completa, las letras salen volando
 *     y las esquinas se desvanecen.
 *  3. Cuadro final: el contenido (children) aparece sobre la imagen y la página se libera.
 *
 * Mientras dura la animación, la sección se queda quieta en pantalla ("pin") y el
 * scroll del usuario solo avanza la animación. Al terminar, la página sigue normal.
 *
 * Detalle de accesibilidad: el HTML "de fábrica" ya es el cuadro final. Si el usuario
 * pidió reducir movimiento, useMotion no ejecuta nada y ve directamente el resultado.
 */
export function ScrollHero({ id, title, image, corners, scrollLength = 250, contentClassName, children }: ScrollHeroProps) {
  // La sección completa: es lo que se fija y el disparador del ScrollTrigger
  const sectionRef = useRef<HTMLElement>(null);
  // La columna del contenido final: necesitamos recorrer sus hijos
  const contentRef = useRef<HTMLDivElement>(null);

  useMotion(() => {
    // ─────────────────────────────────────────────────────────────
    // PREPARACIÓN
    // ─────────────────────────────────────────────────────────────

    // Divide el título en letras: cada letra se vuelve un elemento animable por separado.
    // Los selectores tipo '[data-hero="title"]' solo buscan dentro de esta sección (scope de useMotion).
    const name = SplitText.create('[data-hero="title"]', { type: 'chars' });
    // Índice de la letra central (en "URIEL" → 2). Sirve para dispersar hacia ambos lados.
    const mid = (name.chars.length - 1) / 2;

    // Ponemos todo en el estado del CUADRO INICIAL (el HTML trae el cuadro final)
    gsap.set('[data-hero="window"]', { clipPath: startFrame() }); // ventana pequeña al centro
    gsap.set('[data-hero="img"]', { scale: 1.35 });                // imagen ampliada (luego se aleja)
    gsap.set('[data-hero="shade"]', { opacity: 0 });               // sin oscurecer todavía

    // ─────────────────────────────────────────────────────────────
    // TIMELINE CONTROLADO POR EL SCROLL
    // Un timeline es una secuencia de animaciones con tiempos relativos.
    // Aquí el "tiempo" no avanza solo: lo avanza el scroll del usuario.
    // ─────────────────────────────────────────────────────────────
    const tl = gsap.timeline({
      defaults: {
        // Por defecto, movimiento lineal (cada tween puede cambiarlo)
        ease: 'none',
        // No aplicar el estado inicial al crear: ya lo pusimos con gsap.set arriba
        // y así no chocamos con la animación de entrada de más abajo
        immediateRender: false,
      },
      scrollTrigger: {
        trigger: sectionRef.current,
        // Empieza cuando la parte superior de la sección toca la parte superior de la pantalla
        start: 'top top',
        // Termina después de scrollear `scrollLength` % de la pantalla (250 % = 2.5 pantallas)
        end: `+=${scrollLength}%`,
        // pin: la sección se queda FIJA mientras dura la animación
        pin: true,
        // scrub: 1 → el timeline sigue al scroll con 1 s de suavizado (se siente "con inercia")
        scrub: 1,
        // Si cambia el tamaño de la ventana, recalcula los valores (startFrame, distancias…)
        invalidateOnRefresh: true,
      },
    });

    // El último número de cada línea es la POSICIÓN en el timeline (en "segundos" de timeline).
    // Todo lo que tiene 0 ocurre al mismo tiempo, al inicio del scroll.
    tl
      // 1) La ventana se expande a pantalla completa
      .fromTo('[data-hero="window"]', { clipPath: startFrame }, { clipPath: FULL_FRAME, duration: 1, ease: 'power2.inOut' }, 0)
      // 2) Al mismo tiempo, la imagen se "aleja" (de 1.35× a su tamaño normal)
      .fromTo('[data-hero="img"]', { scale: 1.35 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
      // 3) Las letras del título salen volando
      .fromTo(name.chars, { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)' }, {
        // Valores con función: GSAP la llama para cada letra con su índice `i`.
        // Horizontal: las de la izquierda del centro van a la izquierda, las de la derecha a la derecha;
        // cuanto más lejos del centro, más lejos vuelan (22 % del ancho por posición)
        x: i => (i - mid) * window.innerWidth * 0.22,
        // Vertical: letras pares bajan, impares suben (i % 2 → 0 o 1)
        y: i => (i % 2 ? -1 : 1) * window.innerHeight * 0.28,
        // Giro: las de los extremos giran más, en sentidos opuestos
        rotation: i => (i - mid) * 18,
        // Se desvanecen…
        opacity: 0,
        // …y se desenfocan mientras se alejan
        filter: 'blur(12px)',
        duration: 0.9,
        // 'power2.in' → empiezan lento y aceleran (como si salieran disparadas)
        ease: 'power2.in',
      }, 0)
      // 4) Los textos de las esquinas desaparecen rápido (0.3 del total)
      .fromTo('[data-hero="hud"]', { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
      // 5) A partir de 0.6, la imagen se oscurece para que el texto final se lea bien
      .fromTo('[data-hero="shade"]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.6);

    // 6) Contenido final: cada hijo aparece en orden, empezando en el segundo 1
    Array.from(contentRef.current?.children ?? []).forEach((child, i) => {
      // Cada hijo empieza 0.1 después del anterior → efecto cascada
      const at = 1 + i * 0.1;
      if (child.hasAttribute('data-split')) {
        // Hijo marcado con data-split: lo dividimos en palabras con máscara
        const words = SplitText.create(child, { type: 'words', mask: 'words' }).words;
        // Las escondemos debajo de su máscara
        gsap.set(words, { yPercent: 110 });
        // Y en el timeline suben a su lugar, una tras otra (0.04 entre palabras)
        tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, at);
      } else {
        // Hijo normal: empieza invisible y 40 px abajo.
        // autoAlpha = opacity + visibility: con 0 también queda "hidden", así los botones
        // invisibles no se pueden clicar por accidente durante el cuadro inicial.
        gsap.set(child, { autoAlpha: 0, y: 40 });
        tl.fromTo(child, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, at);
      }
    });

    // 7) Tween vacío al final: mantiene el cuadro final fijo un rato antes de liberar la página
    tl.to({}, { duration: 0.6 });

    // ─────────────────────────────────────────────────────────────
    // ANIMACIÓN DE ENTRADA (al cargar la página, independiente del scroll)
    // Solo si estamos arriba: si el navegador restauró el scroll a media página, no tiene sentido.
    // ─────────────────────────────────────────────────────────────
    if (window.scrollY < 10) {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        // La ventana se abre desde un punto en el centro (inset 50 % por todos lados = tamaño 0)
        .from('[data-hero="window"]', { clipPath: 'inset(50% 50% 50% 50% round 28px)', duration: 1.4, ease: 'expo.inOut' })
        // La imagen llega desde muy cerca (1.9×) mientras la ventana se abre
        .from('[data-hero="img"]', { scale: 1.9, duration: 1.8 }, 0)
        // A los 0.5 s, las letras suben una por una
        .from(name.chars, { yPercent: 100, opacity: 0, stagger: 0.07, duration: 1.1 }, 0.5)
        // A los 0.9 s, aparecen los textos de las esquinas (cada hijo del hud)
        .from('[data-hero="hud"] > *', { opacity: 0, y: 12, stagger: 0.08, duration: 0.8 }, 0.9);
    }
  }, sectionRef);

  return (
    // h-svh = alto exacto de la pantalla (también en móvil, con la barra del navegador)
    <section id={id} ref={sectionRef} className="relative h-svh w-full overflow-hidden bg-canvas">
      {/* Ventana de la imagen: GSAP anima su clip-path. will-change avisa al navegador para optimizar */}
      <div data-hero="window" className="absolute inset-0 overflow-hidden will-change-[clip-path]">
        <img
          data-hero="img"
          src={image}
          // Imagen decorativa: sin texto alternativo y oculta a lectores de pantalla
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.6) saturate(1.2)' }}
        />
        {/* Capa para oscurecer: degradado hacia el fondo + brillo del color de acento */}
        <div data-hero="shade" className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-canvas/50 via-canvas/40 to-canvas" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent)_0%,transparent_65%)]" />
        </div>
      </div>

      {/* Título gigante. mix-blend-difference invierte los colores donde pasa sobre la imagen.
          Va en este div (no en el h1) porque el z-10 crea un contexto de apilamiento propio.
          motion-reduce:hidden → sin animaciones no tiene sentido mostrarlo encima del contenido */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center mix-blend-difference motion-reduce:hidden">
        <h1
          data-hero="title"
          // SplitText parte el texto en muchos elementos; aria-label conserva el nombre para lectores de pantalla
          aria-label={title}
          className="select-none font-display text-[clamp(96px,24vw,380px)] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-white"
        >
          {title}
        </h1>
      </div>

      {/* Textos de las esquinas (vienen por props) */}
      {corners}

      {/* Cuadro final: el contenido centrado sobre la imagen */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div ref={contentRef} className={cn('flex max-w-2xl flex-col items-center text-center', contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
