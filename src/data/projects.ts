import type { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'Plex',
    subtitle: 'Type-safe SQL query builder',
    description: 'Zero-overhead query builder for TypeScript. Generates fully-typed results from raw schema definitions without a build step.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    from: '#6366f1',
    to: '#8b5cf6',
  },
  {
    title: 'Beacon',
    subtitle: 'Uptime monitoring',
    description: 'Self-hosted multi-region uptime checks with Slack/email alerts, incident timelines, and a public status page.',
    tags: ['React', 'Go', 'Redis'],
    from: '#ec4899',
    to: '#a855f7',
  },
  {
    title: 'Forge',
    subtitle: 'Local CI runner',
    description: 'Mirrors GitHub Actions workflows locally before pushing to remote — catches failures before they hit CI and saves build minutes.',
    tags: ['Rust', 'Docker', 'CLI'],
    from: '#06b6d4',
    to: '#3b82f6',
  },
  {
    title: 'Nomad',
    subtitle: 'AI trip planner',
    description: 'Generates budget-aware travel itineraries from personal preferences and syncs them directly to Google Calendar.',
    tags: ['Next.js', 'OpenAI', 'Prisma'],
    from: '#10b981',
    to: '#06b6d4',
  },
];
