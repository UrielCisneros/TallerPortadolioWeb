import { cn } from '@/lib/cn';

interface AvatarProps {
  /** Letra (o letras) que se muestran al centro. */
  initial: string;
  /** Diámetro en px. Default: 96. */
  size?: number;
  className?: string;
}

/**
 * Avatar — círculo con degradado, una inicial y un anillo que pulsa suavemente.
 *
 *   <Avatar initial="U" size={72} />
 *
 * El pulso es una animación CSS (`pulse-ring`, definida en src/index.css)
 * que expande y desvanece una sombra en bucle cada 3 s.
 */
export function Avatar({ initial, size = 96, className }: AvatarProps) {
  return (
    <div
      className={cn(
        // grid + place-items-center → centra la letra · degradado con los 3 colores de acento del tema
        'grid shrink-0 place-items-center rounded-full bg-linear-to-br from-accent via-accent-2 to-accent-3 font-display shadow-avatar font-bold tracking-tight text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        // La letra mide el 37.5 % del círculo, para que se vea proporcionada en cualquier tamaño
        fontSize: size * 0.375,
        // Animación CSS: nombre · duración · curva · se repite siempre
        animation: 'pulse-ring 3s ease-in-out infinite',
      }}
    >
      {initial}
    </div>
  );
}
