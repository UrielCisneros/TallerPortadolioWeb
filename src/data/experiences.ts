import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    title: 'Ingeniero de Software Senior',
    company: 'Stripe',
    dates: '2022 – Actualidad',
    current: true,
    description:
      'Lideré el desarrollo de un sistema de conciliación de pagos en tiempo real que procesa más de $2B al mes. Diseñé en Go un pipeline de eventos distribuido que redujo la latencia un 40% y eliminó la conciliación manual.',
    metrics: [
      { value: '$2B+', label: 'conciliados al mes' },
      { value: '40%', label: 'menos latencia' },
    ],
    stack: ['Go', 'Pipelines de eventos', 'Sistemas distribuidos'],
  },
  {
    title: 'Ingeniero de Software',
    company: 'Vercel',
    dates: '2020 – 2021',
    description:
      'Construí infraestructura central de la Edge Network, que atiende más de 50M de solicitudes al día. Reduje un 60% el arranque en frío de las funciones serverless con una capa de caché de módulos escrita en Rust.',
    metrics: [
      { value: '50M+', label: 'solicitudes diarias' },
      { value: '60%', label: 'arranques en frío más rápidos' },
    ],
    stack: ['Rust', 'Edge Network', 'Serverless'],
  },
  {
    title: 'Ingeniero Frontend',
    company: 'Linear',
    dates: '2018 – 2020',
    description:
      'Desarrollé el editor colaborativo de issues en tiempo real con CRDTs, el sistema de modo oscuro y el framework de atajos de teclado que hoy se usa en todo el producto.',
    metrics: [
      { value: '3', label: 'sistemas clave del producto' },
      { value: '100%', label: 'del producto los usa' },
    ],
    stack: ['CRDTs', 'Tiempo real', 'Sistemas de diseño'],
  },
];
