import { useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * Returns the id of the section currently in the middle of the viewport.
 * Call it from a component rendered *after* the sections (so pinned
 * sections have already added their spacing).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useGSAP(() => {
    key.split(',').filter(Boolean).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => { if (self.isActive) setActive(id); },
      });
    });
  }, { dependencies: [key], revertOnUpdate: true });

  return active;
}
