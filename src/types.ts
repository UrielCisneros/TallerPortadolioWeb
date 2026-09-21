import type { ComponentType } from 'react';

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

export interface Social {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
}
