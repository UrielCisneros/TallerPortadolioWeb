import type { ComponentType } from 'react';

export interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  hue: string;
  from: string;
  to: string;
}

export interface Social {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
}
