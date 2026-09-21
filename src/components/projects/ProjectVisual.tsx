import type { CSSProperties } from 'react';
import { Parallax } from '@/components/motion/Parallax';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

/**
 * Cuadrícula decorativa del fondo (solo en la ilustración abstracta):
 * dos degradados de 1 px (horizontal y vertical) repetidos cada 32 px,
 * con una máscara radial para que se desvanezca hacia los bordes.
 */
const GRID: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
  maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)', // Safari
};

/** Anchos de las "líneas de código" falsas de la ventana abstracta. */
const LINE_WIDTHS = ['72%', '48%', '86%', '58%'];

interface ProjectVisualProps {
  project: Project;
  /** Posición en la lista (se muestra como "01"). */
  index: number;
  /** Tarjeta destacada: el área de imagen es más alta. */
  featured?: boolean;
}

/**
 * ProjectVisual — la parte visual de una tarjeta de proyecto.
 *
 *  - Si el proyecto tiene `image`: muestra la imagen con parallax y un tinte de color.
 *  - Si no: dibuja una "ventana de app" abstracta con los dos colores del proyecto.
 *
 * Sus efectos de hover usan `group-hover:`, así que necesita estar dentro de un
 * elemento con la clase `group` (por ejemplo, <SpotlightCard>).
 */
export function ProjectVisual({ project, index, featured }: ProjectVisualProps) {
  return (
    // overflow-hidden recorta el parallax y el zoom para que no se salgan
    <div className={cn('relative overflow-hidden bg-canvas', featured ? 'h-60 md:h-full md:min-h-[360px]' : 'h-52')}>
      {/* Imagen real o ilustración, según si hay `image` */}
      {project.image ? <ImageVisual project={project} /> : <AbstractVisual project={project} featured={featured} />}

      {/* Número del proyecto: padStart(2, '0') convierte 1 → "01" */}
      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white/80 backdrop-blur-md">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* En tarjetas normales, degradado inferior que funde la imagen con el fondo de la tarjeta */}
      {!featured && <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface to-transparent" />}
    </div>
  );
}

/** Imagen del proyecto con parallax, zoom al pasar el mouse y tinte de color. */
function ImageVisual({ project }: { project: Project }) {
  return (
    <>
      {/* El contenedor del parallax es 15 % más alto arriba y abajo (-inset-y-[15%]):
          así, al moverse, nunca se ve un borde vacío */}
      <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-[15%]">
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          // Carga la imagen solo cuando está por aparecer en pantalla (mejora el rendimiento)
          loading="lazy"
          // object-cover: llena el espacio sin deformarse · group-hover:scale-105: zoom suave al 105 %
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Parallax>

      {/* Tinte con los colores del proyecto. mix-blend-color tiñe la imagen conservando su luz y sombra.
          Al pasar el mouse (group-hover:opacity-0) desaparece y se ve la imagen original */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
        style={{ background: `linear-gradient(135deg, ${project.from}, ${project.to})` }}
      />
      {/* Sombra arriba y abajo para que el número y el texto se lean bien */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
    </>
  );
}

/** Ilustración para proyectos sin imagen: luces de color, cuadrícula y una ventana flotante. */
function AbstractVisual({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <>
      {/* Dos "luces" desenfocadas (blur-3xl) con los colores del proyecto. Crecen al pasar el mouse */}
      <div
        className="absolute -left-12 -top-16 h-60 w-60 rounded-full opacity-50 blur-3xl transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundColor: project.from }}
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundColor: project.to }}
      />
      {/* Cuadrícula tenue */}
      <div className="absolute inset-0 opacity-[0.12]" style={GRID} />

      {/* Ventana flotante. Dos capas de movimiento que no chocan entre sí:
          el Parallax (GSAP) mueve el contenedor y el hover (CSS) mueve la ventana de adentro */}
      <Parallax speed={0.3} className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            // Vidrio oscuro con desenfoque · al hover sube 8 px y gira -2°
            'rounded-xl border border-white/15 bg-black/40 p-4 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-2',
            featured ? 'w-[68%]' : 'w-[74%]',
          )}
        >
          {/* Barra de título: tres puntos (como macOS) y "~/nombre" */}
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 font-mono text-[10px] text-white/40">~/{project.title.toLowerCase()}</span>
          </div>
          {/* "Líneas de código": la primera con los colores del proyecto, el resto grises */}
          <div className="space-y-2.5">
            {LINE_WIDTHS.map((width, i) => (
              <div
                key={width}
                className="h-2 rounded-full"
                style={{
                  width,
                  background: i === 0 ? `linear-gradient(to right, ${project.from}, ${project.to})` : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      </Parallax>
    </>
  );
}
