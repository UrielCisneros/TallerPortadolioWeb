import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Footer — barra inferior con contenido a la izquierda y (opcional) a la derecha.
 *
 *   <Footer left="© 2026 Uriel" right="Hecho con React y Vite" />
 *
 * Animación: <Reveal> con stagger → los dos textos suben uno tras otro
 * cuando el footer asoma por abajo (start 'top 95%').
 */
export function Footer({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <Reveal
      as="footer"
      variant="up"
      stagger={0.1}
      duration={0.6}
      start="top 95%"
      // justify-between: un texto a cada extremo · flex-wrap: en móvil se acomodan uno debajo del otro
      className="flex flex-wrap items-center justify-between gap-2 border-t border-line py-7 text-[12.5px] text-faint"
    >
      <p>{left}</p>
      {right && <p>{right}</p>}
    </Reveal>
  );
}
