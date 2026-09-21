import type { Project } from '@/types';

/**
 * `image`: captura del proyecto. Para usar las tuyas, colócalas en
 * `public/projects/` y escribe la ruta, p. ej. image: '/projects/plex.png'.
 * Las actuales son fotos de Unsplash que sirven de ejemplo.
 */
export const projects: Project[] = [
  {
    title: 'Plex',
    subtitle: 'Constructor de consultas SQL con tipos',
    description:
      'Constructor de consultas para TypeScript sin costo extra en tiempo de ejecución. Genera resultados totalmente tipados a partir de tu esquema, sin paso de compilación.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop',
    from: '#6366f1',
    to: '#8b5cf6',
  },
  {
    title: 'Beacon',
    subtitle: 'Monitoreo de disponibilidad',
    description:
      'Monitoreo autoalojado desde varias regiones, con alertas por Slack y correo, línea de tiempo de incidentes y una página de estado pública.',
    tags: ['React', 'Go', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    from: '#ec4899',
    to: '#a855f7',
  },
  {
    title: 'Forge',
    subtitle: 'CI local',
    description:
      'Replica en tu máquina los workflows de GitHub Actions antes de hacer push: detecta fallas antes de que lleguen a CI y ahorra minutos de build.',
    tags: ['Rust', 'Docker', 'CLI'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80&auto=format&fit=crop',
    from: '#06b6d4',
    to: '#3b82f6',
  },
  {
    title: 'Nomad',
    subtitle: 'Planificador de viajes con IA',
    description:
      'Genera itinerarios de viaje según tu presupuesto y tus preferencias, y los sincroniza directamente con Google Calendar.',
    tags: ['Next.js', 'OpenAI', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&auto=format&fit=crop',
    from: '#10b981',
    to: '#06b6d4',
  },
];
