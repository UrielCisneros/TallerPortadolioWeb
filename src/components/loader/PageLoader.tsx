import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

/** Si algo tarda demasiado (red lenta, imagen caída), el loader se va de todos modos a los 6 s. */
const MAX_WAIT_MS = 6000;

interface PageLoaderProps {
  /** Texto grande del centro (sus letras suben una por una). */
  title: string;
  /** Imágenes que deben estar descargadas antes de revelar la página (p. ej. la del hero). */
  images?: string[];
  /** Texto de la esquina superior izquierda. */
  topLeft?: string;
  /** Texto de la esquina superior derecha. */
  topRight?: string;
  /** Texto de la esquina inferior izquierda. */
  bottomLeft?: string;
  /** Se llama cuando la cortina termina de levantarse y la página ya se ve. */
  onDone?: () => void;
}

/**
 * Promesa que se cumple cuando la página está lista para mostrarse:
 * fuentes cargadas + todas las imágenes descargadas y decodificadas.
 * Así, al levantar la cortina, la imagen del hero ya está completa (no aparece "por partes").
 */
function whenAssetsReady(images: string[]) {
  const loadImage = (src: string) => {
    const img = new Image();
    img.src = src;
    // decode() espera a que la imagen esté lista para pintarse de un solo golpe.
    // Si falla (URL rota), no bloqueamos la página.
    return img.decode().catch(() => {});
  };
  const ready = Promise.all([document.fonts.ready, ...images.map(loadImage)]);
  // Lo que pase primero: que todo cargue o que se acabe el tiempo máximo
  return Promise.race([ready, new Promise(resolve => setTimeout(resolve, MAX_WAIT_MS))]);
}

/**
 * PageLoader — pantalla de carga que aparece una sola vez al abrir la página (~2 s).
 *
 *  1. Las letras del título suben desde una máscara, una tras otra.
 *  2. Una línea de acento se llena mientras el contador va de 000 a 100.
 *  3. Si las imágenes o fuentes aún no llegan, se queda esperando en 99 %.
 *  4. Las letras salen hacia arriba y el panel oscuro se levanta como una cortina,
 *     seguido de una segunda cortina de color de acento.
 *  5. Al terminar, se desmonta y avisa con `onDone`.
 *
 * Mientras dura, el scroll queda bloqueado. Si el usuario pidió reducir movimiento,
 * el loader no se muestra y `onDone` se llama de inmediato.
 */
export function PageLoader({ title, images = [], topLeft, topRight, bottomLeft, onDone }: PageLoaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Cuando termina la animación lo quitamos del todo
  const [done, setDone] = useState(false);
  // Guardamos onDone en un ref para no reiniciar la animación si el padre pasa una función nueva
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  // Las imágenes como texto: dependencia estable (igual que en useActiveSection)
  const imagesKey = images.join('\n');

  function finish() {
    setDone(true);
    onDoneRef.current?.();
  }

  // Con "reducir movimiento" useMotion no ejecuta nada: terminamos al instante
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
  }, []);

  useMotion(() => {
    const root = document.documentElement;
    // Bloquea el scroll mientras el loader está encima
    root.style.overflow = 'hidden';

    // Letras con máscara: cada una queda dentro de una "ventanita" que la recorta
    const chars = SplitText.create('[data-loader="title"]', { type: 'chars', mask: 'chars' }).chars;
    // El contador se anima como un objeto normal y escribimos su valor en el span
    const counterEl = ref.current?.querySelector('[data-loader="count"]');
    const counter = { value: 0 };
    const renderCount = () => {
      // padStart(3, '0') → 7 se muestra como "007"
      if (counterEl) counterEl.textContent = String(Math.round(counter.value)).padStart(3, '0');
    };

    // ¿Ya cargó todo? Empieza a descargar desde ya, en paralelo con la animación
    let ready = false;
    let cancelled = false;

    const tl = gsap.timeline({
      onComplete: () => {
        // Libera el scroll y recalcula los ScrollTriggers (el pin del hero) por si cambió el layout
        root.style.overflow = '';
        ScrollTrigger.refresh();
        finish();
      },
    });

    tl
      // ── ENTRADA ────────────────────────────────────────────────
      // Las esquinas aparecen suavemente
      .from('[data-loader="corner"]', { opacity: 0, y: 10, stagger: 0.06, duration: 0.6, ease: 'power2.out' }, 0)
      // Las letras suben desde debajo de su máscara, en cascada
      .from(chars, { yPercent: 110, stagger: 0.05, duration: 0.8, ease: 'expo.out' }, 0.1)
      // La línea de acento se llena casi completa (99 %)…
      .fromTo('[data-loader="bar"]', { scaleX: 0 }, { scaleX: 0.99, duration: 1.2, ease: 'power3.inOut' }, 0)
      // …al mismo ritmo que el contador (misma duración y ease → van sincronizados)
      .to(counter, { value: 99, duration: 1.2, ease: 'power3.inOut', onUpdate: renderCount }, 0)

      // ── ESPERA ─────────────────────────────────────────────────
      // Si al llegar aquí todavía no carga todo, pausamos. whenAssetsReady la reanuda.
      .call(() => { if (!ready) tl.pause(); }, [], 1.2)

      // ── SALIDA ─────────────────────────────────────────────────
      // Último 1 %: barra y contador llegan a 100
      .to('[data-loader="bar"]', { scaleX: 1, duration: 0.2, ease: 'power1.out' }, 1.2)
      .to(counter, { value: 100, duration: 0.2, onUpdate: renderCount }, 1.2)
      // Las letras siguen su camino hacia arriba y desaparecen por la máscara
      .to(chars, { yPercent: -110, stagger: 0.03, duration: 0.45, ease: 'power3.in' }, 1.3)
      // Esquinas, línea y contador se desvanecen
      .to('[data-loader="fade"]', { opacity: 0, duration: 0.3, ease: 'power1.out' }, 1.35)
      // El panel oscuro se levanta como una cortina…
      .to('[data-loader="panel"]', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 1.45)
      // …y la cortina de acento lo sigue 0.1 s después, revelando la página
      .to('[data-loader="accent"]', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 1.55);

    whenAssetsReady(imagesKey ? imagesKey.split('\n') : []).then(() => {
      if (cancelled) return;
      ready = true;
      // Si la timeline ya estaba esperando, la reanudamos
      if (tl.paused()) tl.play();
    });

    // Limpieza: si se revierte antes de terminar (desmontaje), no dejamos el scroll bloqueado
    return () => {
      cancelled = true;
      root.style.overflow = '';
    };
  }, ref);

  if (done) return null;

  return (
    <div
      ref={ref}
      // Decorativo: el contenido real (el hero) ya está debajo para los lectores de pantalla
      aria-hidden="true"
      // Encima de todo (ScrollProgress usa z-50, el Dock z-40)
      className="fixed inset-0 z-100 overflow-hidden motion-reduce:hidden"
    >
      {/* Cortina de acento: va detrás del panel y se ve solo durante la salida */}
      <div data-loader="accent" className="absolute inset-0 bg-linear-to-br from-accent-dim via-accent to-accent-2" />

      {/* Panel principal */}
      <div data-loader="panel" className="absolute inset-0 bg-canvas">
        {/* Brillo sutil del color de acento al centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_12%,transparent)_0%,transparent_60%)]" />

        {/* Esquinas estilo revista (igual que en el hero) */}
        <div data-loader="fade" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
          <span data-loader="corner" className="absolute left-6 top-6 md:left-10 md:top-8">{topLeft}</span>
          <span data-loader="corner" className="absolute right-6 top-6 md:right-10 md:top-8">{topRight}</span>
          <span data-loader="corner" className="absolute bottom-6 left-6 max-w-[220px] md:bottom-8 md:left-10">{bottomLeft}</span>
        </div>

        {/* Centro: título + línea de progreso */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p
            data-loader="title"
            className="select-none font-display text-[clamp(40px,11vw,160px)] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-ink"
          >
            {title}
          </p>
          {/* Riel gris con la barra de acento encima (crece desde la izquierda) */}
          <div data-loader="fade" className="mt-8 h-px w-[min(320px,60vw)] bg-line">
            <div
              data-loader="bar"
              // transform inline (no la clase scale-x-0): la propiedad `scale` de Tailwind v4 se
              // multiplicaría con el transform de GSAP (ver ScrollProgress)
              style={{ transform: 'scaleX(0)' }}
              className="h-full origin-left bg-linear-to-r from-accent-dim via-accent to-accent-2 shadow-glow"
            />
          </div>
        </div>

        {/* Contador grande en la esquina inferior derecha */}
        <div
          data-loader="fade"
          className="absolute bottom-6 right-6 flex items-baseline gap-1 font-mono text-white md:bottom-8 md:right-10"
        >
          <span data-loader="count" className="text-[clamp(40px,7vw,88px)] font-medium leading-none tabular-nums">000</span>
          <span className="text-sm text-accent-soft">%</span>
        </div>
      </div>
    </div>
  );
}
