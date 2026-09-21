import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Runs GSAP animations scoped to `scope`, only when the user
 * hasn't asked for reduced motion. Everything is reverted on unmount.
 */
export function useMotion(setup: () => void, scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', setup, scope);
    return () => mm.revert();
  }, { scope });
}
