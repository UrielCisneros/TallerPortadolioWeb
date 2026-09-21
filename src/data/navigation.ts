import { BriefcaseIcon, GridIcon, HomeIcon } from '@/components/icons';
import type { NavItem } from '@/types';
import { experienceCopy, projectsCopy } from './copy';

/** id del hero; lo usan el hero y el botón "Inicio". */
export const HOME_ID = 'inicio';

/** Secciones de la página. Cada href apunta al id de una sección ("#proyectos" → id="proyectos"). */
export const navSections: NavItem[] = [
  { label: 'Inicio', href: `#${HOME_ID}`, icon: HomeIcon },
  { label: experienceCopy.eyebrow, href: `#${experienceCopy.id}`, icon: BriefcaseIcon },
  { label: projectsCopy.eyebrow, href: `#${projectsCopy.id}`, icon: GridIcon },
];
