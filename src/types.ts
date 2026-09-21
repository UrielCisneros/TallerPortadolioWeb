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
  /** Trabajo actual: muestra la etiqueta "Actual". */
  current?: boolean;
  description: string;
  metrics: Metric[];
  stack: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  /** Captura del proyecto (URL o ruta en /public). Sin imagen se usa una ilustración abstracta. */
  image?: string;
  /** Colores del proyecto: tiñen la imagen y la ilustración. */
  from: string;
  to: string;
  href?: string;
}
