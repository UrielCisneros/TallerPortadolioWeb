import { cn } from '@/lib/cn';

interface AvatarProps {
  initial: string;
  /** Diameter in px. Default: 96. */
  size?: number;
  className?: string;
}

/** Gradient circle with an initial and a soft pulsing ring. */
export function Avatar({ initial, size = 96, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-linear-to-br from-accent via-indigo-500 to-blue-500 font-display font-bold tracking-tight text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.375,
        boxShadow: '0 0 0 3px rgba(8,8,8,0.6), 0 0 0 5px rgba(139,92,246,0.5), 0 12px 40px rgba(139,92,246,0.4)',
        animation: 'pulse-ring 3s ease-in-out infinite',
      }}
    >
      {initial}
    </div>
  );
}
