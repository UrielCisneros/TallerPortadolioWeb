import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { linkProps } from '@/lib/links';

/**
 * Estilos de cada variante.
 *  - primary: degradado del tema con sombra; al hover sube 2 px y la sombra crece.
 *  - ghost:   transparente con borde; al hover el borde y el texto se aclaran.
 */
const VARIANTS = {
  primary:
    'bg-linear-to-br from-accent to-accent-2 text-white shadow-accent hover:-translate-y-0.5 hover:shadow-accent-lg',
  ghost: 'border border-white/15 bg-white/5 text-white/80 backdrop-blur-md hover:border-white/30 hover:text-white',
};

interface ButtonProps {
  /** A dónde lleva: "#seccion", "https://…" o "mailto:…". */
  href: string;
  /** 'primary' (default) o 'ghost'. */
  variant?: keyof typeof VARIANTS;
  /** Se muestra ANTES del texto (p. ej. <MailIcon />). */
  icon?: ReactNode;
  /** Se muestra DESPUÉS del texto (p. ej. "→"). */
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Button — enlace con apariencia de botón.
 *
 *   <Button href="mailto:hola@ejemplo.com" icon={<MailIcon size={16} />}>Contáctame</Button>
 *   <Button href="#proyectos" variant="ghost" iconEnd="↓">Ver proyectos</Button>
 *
 * Es un <a> (no un <button>) porque siempre lleva a algún lugar.
 * Los efectos de hover son transiciones CSS (transition-all duration-200).
 */
export function Button({ href, variant = 'primary', icon, iconEnd, className, children }: ButtonProps) {
  return (
    <a
      // href + scroll suave / pestaña nueva según el tipo de enlace
      {...linkProps(href)}
      className={cn(
        'inline-flex items-center gap-2 rounded-[10px] px-7 py-3 text-sm font-semibold no-underline transition-all duration-200',
        VARIANTS[variant],
        // className al final para poder sobrescribir (p. ej. rounded-full)
        className,
      )}
    >
      {icon}
      {children}
      {iconEnd}
    </a>
  );
}
