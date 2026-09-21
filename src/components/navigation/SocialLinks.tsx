import { Reveal } from '@/components/motion/Reveal';
import { IconLink } from '@/components/ui/IconLink';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/types';

/**
 * SocialLinks — fila de íconos (redes sociales) que aparecen con rebote, uno tras otro.
 *
 *   <SocialLinks items={socials} />
 *
 * La animación la hace <Reveal>: variant "pop" (crece con rebote) y
 * stagger 0.08 (cada ícono 0.08 s después del anterior).
 */
export function SocialLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <Reveal as="nav" variant="pop" stagger={0.08} duration={0.6} start="top 90%" className={cn('flex justify-center gap-2.5', className)}>
      {/* Cada hijo directo de Reveal se anima por separado */}
      {items.map(item => <IconLink key={item.href} item={item} />)}
    </Reveal>
  );
}
