import { linkProps } from '@/lib/links';
import type { NavItem } from '@/types';

/**
 * IconLink — botón cuadrado con un ícono que lleva a algún lugar (redes, correo…).
 *
 *   <IconLink item={{ label: 'GitHub', href: 'https://github.com/…', icon: GitHubIcon }} />
 *
 * Al hover (CSS): sube 2 px y se tiñe del color de acento.
 */
export function IconLink({ item }: { item: NavItem }) {
  // `icon` se renombra a `Icon` para usarlo como componente
  const { label, href, icon: Icon } = item;
  return (
    <a
      {...linkProps(href)}
      // Solo hay ícono: aria-label da el nombre a lectores de pantalla y title muestra un tooltip nativo
      aria-label={label}
      title={label}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-line bg-surface-raised text-subtle transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
    >
      <Icon />
    </a>
  );
}
