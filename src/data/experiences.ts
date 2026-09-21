import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Stripe',
    dates: '2022 – Present',
    description:
      'Led development of a real-time payment reconciliation system processing $2B+ monthly. Designed a distributed event pipeline in Go that reduced latency by 40% and eliminated manual reconciliation work.',
  },
  {
    title: 'Software Engineer',
    company: 'Vercel',
    dates: '2020 – 2021',
    description:
      'Built core infrastructure for the Edge Network handling 50M+ daily requests. Improved serverless function cold-start by 60% via a custom module caching layer written in Rust.',
  },
  {
    title: 'Frontend Engineer',
    company: 'Linear',
    dates: '2018 – 2020',
    description:
      'Shipped the real-time collaborative issue editor using CRDTs, the dark mode system, and the keyboard-shortcut framework now used across the entire product surface.',
  },
];
