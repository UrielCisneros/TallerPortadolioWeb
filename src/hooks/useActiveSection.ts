import { useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * useActiveSection — devuelve el id de la sección que está en el centro de la pantalla.
 *
 *   const activa = useActiveSection(['inicio', 'experiencia', 'proyectos']);
 *   // activa === 'experiencia' mientras esa sección cruza el centro
 *
 * Importante: úsalo en un componente que se renderice DESPUÉS de las secciones
 * (por ejemplo, el Dock al final de App). Así, cuando se crean estos
 * ScrollTriggers, el hero fijado ya agregó su espacio extra y las posiciones son correctas.
 */
export function useActiveSection(ids: string[]) {
  // Estado con la sección activa; al inicio, la primera de la lista
  const [active, setActive] = useState(ids[0]);
  // Convertimos el array a texto para usarlo como dependencia estable:
  // un array nuevo en cada render dispararía el efecto siempre; un string igual, no.
  const key = ids.join(',');

  useGSAP(() => {
    // Recorremos cada id (filter(Boolean) descarta strings vacíos si la lista viene vacía)
    key.split(',').filter(Boolean).forEach(id => {
      // Buscamos el elemento en la página
      const el = document.getElementById(id);
      // Si no existe (id mal escrito o sección quitada), lo ignoramos
      if (!el) return;
      // Creamos un ScrollTrigger "sin animación": solo nos avisa cuándo está activo
      ScrollTrigger.create({
        trigger: el,
        // Se activa cuando el borde superior de la sección llega al centro de la pantalla…
        start: 'top center',
        // …y se desactiva cuando su borde inferior pasa el centro
        end: 'bottom center',
        // onToggle se llama al entrar o salir de ese rango; si entró, la marcamos activa
        onToggle: self => { if (self.isActive) setActive(id); },
      });
    });
    // dependencies: vuelve a crear los triggers si cambia la lista de ids
    // revertOnUpdate: antes de recrearlos, elimina los anteriores
  }, { dependencies: [key], revertOnUpdate: true });

  return active;
}
