import { BriefcaseIcon, GridIcon, HomeIcon } from '@/components/icons';
import type { NavItem } from '@/types';

/** In-page sections. Each href must match a section's `id` ("#projects" → id="projects"). */
export const navSections: NavItem[] = [
  { label: 'Home', href: '#top', icon: HomeIcon },
  { label: 'Experience', href: '#experience', icon: BriefcaseIcon },
  { label: 'Projects', href: '#projects', icon: GridIcon },
];
