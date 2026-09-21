import { useRef, type MouseEvent } from 'react';
import { gsap } from '@/lib/gsap';
import { useMotion } from './useMotion';

export interface MagnifyOptions {
  /** Resting size of each item, in px. */
  base?: number;
  /** Size of the item right under the cursor, in px. */
  max?: number;
  /** How far from the cursor (px) items still grow. */
  range?: number;
  /** 'y' for vertical docks, 'x' for horizontal ones. */
  axis?: 'x' | 'y';
}

/**
 * macOS dock magnification. Mark children with `data-magnify` (the item that
 * grows) and optionally `data-magnify-icon` (content scaled to match).
 *
 *   const { ref, onMouseMove, onMouseLeave } = useMagnify<HTMLElement>();
 *   <nav ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>…</nav>
 */
export function useMagnify<T extends HTMLElement>({ base = 40, max = 64, range = 140, axis = 'y' }: MagnifyOptions = {}) {
  const ref = useRef<T>(null);
  const resizers = useRef<Array<(size: number) => void>>([]);

  useMotion(() => {
    resizers.current = gsap.utils.toArray<HTMLElement>('[data-magnify]', ref.current).map(item => {
      const opts = { duration: 0.3, ease: 'power3.out' };
      const width = gsap.quickTo(item, 'width', opts);
      const height = gsap.quickTo(item, 'height', opts);
      const icon = item.querySelector('[data-magnify-icon]');
      const scale = icon ? gsap.quickTo(icon, 'scale', opts) : null;
      return size => { width(size); height(size); scale?.(size / base); };
    });
    return () => { resizers.current = []; };
  }, ref);

  function onMouseMove(e: MouseEvent<T>) {
    const pointer = axis === 'y' ? e.clientY : e.clientX;
    e.currentTarget.querySelectorAll<HTMLElement>('[data-magnify]').forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const center = axis === 'y' ? rect.top + rect.height / 2 : rect.left + rect.width / 2;
      const t = Math.max(0, 1 - Math.abs(pointer - center) / range);
      const eased = t * t * (3 - 2 * t); // smoothstep for a soft falloff
      resizers.current[i]?.(base + (max - base) * eased);
    });
  }

  function onMouseLeave() {
    resizers.current.forEach(resize => resize(base));
  }

  return { ref, onMouseMove, onMouseLeave };
}
