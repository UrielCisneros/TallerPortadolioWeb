import type { AnchorHTMLAttributes } from 'react';
import { smoothScrollTo } from './gsap';

/**
 * Devuelve las props correctas para un <a>, según el tipo de enlace:
 *  - "#seccion"   → scroll suave con GSAP (onClick = smoothScrollTo)
 *  - "https://…"  → se abre en una pestaña nueva, de forma segura
 *  - "mailto:…"   → comportamiento normal del navegador
 *
 * Uso (con spread, para no repetir esta lógica en cada componente):
 *   <a {...linkProps(item.href)}>…</a>
 */
export function linkProps(href: string): AnchorHTMLAttributes<HTMLAnchorElement> {
  // Enlace interno: interceptamos el click para hacer scroll suave
  if (href.startsWith('#')) return { href, onClick: smoothScrollTo };
  // Enlace externo: pestaña nueva + rel="noopener noreferrer"
  // (evita que la página abierta pueda controlar la nuestra vía window.opener)
  if (/^https?:\/\//.test(href)) return { href, target: '_blank', rel: 'noopener noreferrer' };
  // Cualquier otro (mailto:, tel:, rutas relativas): sin cambios
  return { href };
}
