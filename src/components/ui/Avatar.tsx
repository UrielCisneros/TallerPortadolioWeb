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
        'grid shrink-0 place-items-center rounded-full bg-linear-to-br from-accent via-accent-2 to-accent-3 font-display shadow-avatar font-bold tracking-tight text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.375,
        animation: 'pulse-ring 3s ease-in-out infinite',
      }}
    >
      {initial}
    </div>
  );
}
