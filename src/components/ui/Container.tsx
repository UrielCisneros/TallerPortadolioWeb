import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  /** Etiqueta HTML ('main', 'section'…). Default: 'div'. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Container — columna centrada con el ancho máximo de la página y margen lateral.
 *
 *   <Container as="main">…</Container>
 *
 * Para cambiar el ancho de todo el sitio, modifica max-w-[960px].
 */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  // mx-auto centra · px-6 deja 24 px a cada lado en móvil · z-[1] lo pone sobre fondos decorativos
  return <Tag className={cn('relative z-[1] mx-auto max-w-[960px] px-6', className)}>{children}</Tag>;
}
