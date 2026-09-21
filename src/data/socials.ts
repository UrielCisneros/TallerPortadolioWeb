import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from '@/components/icons';
import type { NavItem } from '@/types';
import { profile } from './profile';

export const socials: NavItem[] = [
  { label: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
  { label: 'Twitter / X', href: 'https://twitter.com', icon: XIcon },
  { label: 'Correo', href: `mailto:${profile.email}`, icon: MailIcon },
];
