import type { AnchorHTMLAttributes } from 'react';
import { smoothScrollTo } from './gsap';

/**
 * Props for an <a> that behaves correctly for any kind of link:
 *  - "#section"  → smooth scroll with GSAP
 *  - "https://…" → opens in a new tab
 *  - "mailto:…"  → default behavior
 */
export function linkProps(href: string): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (href.startsWith('#')) return { href, onClick: smoothScrollTo };
  if (/^https?:\/\//.test(href)) return { href, target: '_blank', rel: 'noopener noreferrer' };
  return { href };
}
