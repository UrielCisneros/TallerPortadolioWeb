import type { ComponentType } from 'react';

export type IconComponent = ComponentType<{ size?: number }>;

/** A link with an icon — used by the dock, social links and navigation. */
export interface NavItem {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string;
  metrics: Metric[];
  stack: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  from: string;
  to: string;
  href?: string;
}
