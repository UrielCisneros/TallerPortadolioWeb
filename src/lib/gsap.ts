import type { MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

/** onClick handler for in-page anchors (`href="#projects"`) that scrolls smoothly. */
export function smoothScrollTo(e: MouseEvent<HTMLAnchorElement>) {
  const { hash } = e.currentTarget;
  if (!hash) return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.to(window, { scrollTo: { y: hash, offsetY: 24 }, duration: reduce ? 0 : 1.4, ease: 'power3.inOut' });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
