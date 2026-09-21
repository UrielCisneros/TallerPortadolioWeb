# Taller Portafolio Web

Portafolio personal hecho con **React 19 + Vite + Tailwind CSS v4 + GSAP**. Está pensado como maqueta de curso: cada pieza es un componente reutilizable que puedes llevar a otro proyecto.

```bash
pnpm install
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
```

---

## La regla de oro

> **Los componentes no conocen tus datos. Todo les llega por props.**

El proyecto tiene tres capas:

| Capa | Carpeta | Qué hace |
|---|---|---|
| **Datos** | `src/data/` | Tu contenido: nombre, experiencia, proyectos, redes. Solo datos, nada de diseño. |
| **Componentes** | `src/components/` | Piezas reutilizables. **Nunca** importan de `data/`. |
| **Secciones** | `src/sections/` | Conectan los datos con los componentes. Es lo único específico de este portafolio. |

`App.tsx` solo acomoda las secciones en orden.

**Para cambiar el contenido**, edita `src/data/`. **Para reutilizar un componente**, cópialo junto con `lib/` y `hooks/`.

---

## Estructura

```
src/
├── App.tsx                 → arma la página
├── index.css               → Tailwind + tokens de diseño (@theme)
├── types.ts                → tipos compartidos (NavItem, Experience, Project…)
│
├── data/                   → TU CONTENIDO
│   ├── profile.ts            nombre, rol, bio, email, imagen del hero
│   ├── experiences.ts        trabajos (con métricas y stack)
│   ├── projects.ts           proyectos (con sus dos colores)
│   ├── socials.ts            redes sociales
│   └── navigation.ts         secciones del menú (href = "#id")
│
├── sections/               → datos + componentes
│   ├── HeroSection.tsx
│   ├── ExperienceSection.tsx
│   └── ProjectsSection.tsx
│
├── components/
│   ├── motion/               animaciones reutilizables (GSAP)
│   ├── ui/                   piezas de interfaz básicas
│   ├── navigation/           Dock tipo macOS, redes sociales
│   ├── hero/                 hero con scroll fijado (pinned)
│   ├── experience/           línea de tiempo
│   ├── projects/             cuadrícula bento de proyectos
│   ├── layout/               footer
│   └── icons/                íconos SVG
│
├── hooks/
│   ├── useMotion.ts          base de todas las animaciones
│   ├── useMagnify.ts         efecto "dock de Mac"
│   └── useActiveSection.ts   qué sección está en pantalla
│
└── lib/
    ├── gsap.ts               registra plugins de GSAP + smoothScrollTo
    ├── links.ts              linkProps(): props correctas para cualquier enlace
    └── cn.ts                 une clases condicionales
```

Cada carpeta de `components/` tiene un `index.ts`, así que puedes importar así:

```tsx
import { Reveal, Parallax } from '@/components/motion';
import { Button, Section } from '@/components/ui';
```

---

## Catálogo de componentes

### Animación — `components/motion/`

Todos respetan `prefers-reduced-motion`: si el usuario pidió menos movimiento, el contenido se muestra sin animar.

#### `<Reveal>`: aparece al hacer scroll

```tsx
<Reveal variant="up">Hola</Reveal>

{/* Con stagger anima cada hijo directo, uno tras otro */}
<Reveal as="ul" variant="pop" stagger={0.1}>
  <li>A</li><li>B</li><li>C</li>
</Reveal>
```

| Prop | Tipo | Default |
|---|---|---|
| `variant` | `'up' \| 'down' \| 'left' \| 'right' \| 'fade' \| 'scale' \| 'rise' \| 'pop'` | `'up'` |
| `as` | etiqueta HTML | `'div'` |
| `stagger` | segundos entre hijos (si se omite, anima el elemento completo) | — |
| `delay`, `duration` | segundos | `0`, `0.8` |
| `start` | posición de ScrollTrigger | `'top 85%'` |

#### `<SplitReveal>`: texto que sube palabra por palabra

```tsx
<SplitReveal as="h2" by="words">Un título animado</SplitReveal>
```

`by`: `'words' | 'chars' | 'lines'`. También acepta `delay`, `stagger` y `start`.

#### `<Parallax>`: se mueve a otra velocidad que el scroll

```tsx
<div className="relative h-96 overflow-hidden">
  <Parallax speed={0.5} className="absolute inset-0">
    <img src="…" />
  </Parallax>
</div>
```

`speed` positivo sube (contra el scroll) y negativo baja. Usa al **padre** como referencia.

#### `<CountUp>`: número que cuenta desde cero

```tsx
<CountUp value="$2B+" />   {/* $0B+ → $2B+ */}
```

#### `<ScrollProgress>`: barra de progreso fija arriba

```tsx
<ScrollProgress />
```

### Interfaz — `components/ui/`

| Componente | Uso |
|---|---|
| `<Section id eyebrow title index? description?>` | Sección completa con encabezado animado. El `id` es el ancla del menú. |
| `<SectionHeader>` | Solo el encabezado ("01 — Eyebrow" + título + descripción). |
| `<Button href variant? icon? iconEnd?>` | `variant`: `'primary' \| 'ghost'`. El `href` puede ser `#seccion`, `https://…` o `mailto:…`. |
| `<SpotlightCard href? color?>` | Tarjeta con luz que sigue al cursor. Es un `group` de Tailwind, así que los hijos pueden usar `group-hover:`. |
| `<Avatar initial size?>` | Círculo con degradado y anillo pulsante. |
| `<StatusPill>` | Etiqueta con punto verde ("Available…"). |
| `<Stat value label>` | Número grande con `CountUp` (va dentro de un `<dl>`). |
| `<Tag>` / `<TagList items>` | Etiquetas monoespaciadas de tecnologías. |
| `<IconLink item>` | Botón cuadrado con ícono. |
| `<Container as?>` | Columna centrada de 960 px. |

### Navegación — `components/navigation/`

#### `<Dock>`: menú tipo macOS con magnificación

```tsx
<Dock
  groups={[navSections, socials]}   // un separador entre cada grupo
  position="right"                   // 'right' | 'left' | 'bottom'
  baseSize={40}                      // tamaño normal (px)
  maxSize={64}                       // tamaño bajo el cursor (px)
  range={140}                        // alcance del efecto (px)
  enterDelay={1.2}                   // espera antes de entrar
/>
```

- Los enlaces `#seccion` muestran un punto cuando esa sección está en pantalla.
- Renderízalo **al final** de la página, para que vea el espacio que ocupa el hero fijado.
- En móvil se oculta.

#### `<SocialLinks items>`: fila de íconos que aparecen con rebote

### Hero — `components/hero/`

#### `<ScrollHero>`: hero fijado que se anima con el scroll

```tsx
<ScrollHero
  title="Uriel"                         // texto gigante que se dispersa
  image="https://…"                     // imagen de fondo
  corners={<HeroCorners topLeft={…} topRight={…} bottomLeft={…} bottomRight={…} />}
  scrollLength={250}                    // cuánto dura fijado (% de pantalla)
>
  {/* Contenido final: cada hijo directo aparece en orden */}
  <Avatar initial="U" />
  <p data-split>Este texto aparece palabra por palabra</p>
  <Button href="#projects">Ver trabajo</Button>
</ScrollHero>
```

La animación tiene tres momentos:

1. **Cuadro inicial:** título gigante sobre una ventana pequeña con la imagen.
2. **Al hacer scroll:** la ventana se expande, las letras vuelan y las esquinas se desvanecen.
3. **Cuadro final:** el contenido aparece sobre la imagen y la página se libera.

### Experiencia — `components/experience/`

```tsx
<Timeline>
  <TimelineItem aside={<DateRange dates="2022 – Present" />}>
    <ExperienceCard experience={job} />
  </TimelineItem>
</Timeline>
```

`Timeline` y `TimelineItem` sirven para **cualquier** línea de tiempo (estudios, historia de un producto…). Puedes poner cualquier contenido dentro.

### Proyectos — `components/projects/`

```tsx
<ProjectGrid projects={projects} featureFirst />
```

`ProjectCard` y `ProjectVisual` también se pueden usar por separado.

---

## Hooks

| Hook | Para qué |
|---|---|
| `useMotion(setup, scopeRef)` | Base de todas las animaciones. Ejecuta `setup` solo si se permite movimiento, limita los selectores a `scopeRef` y limpia todo al desmontar. |
| `useMagnify({ base, max, range, axis })` | Efecto dock de Mac. Marca los hijos con `data-magnify` y `data-magnify-icon`. |
| `useActiveSection(ids)` | Devuelve el `id` de la sección visible. |

Ejemplo de animación propia con `useMotion`:

```tsx
function MiComponente() {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.from('.caja', { y: 50, opacity: 0, scrollTrigger: { trigger: ref.current } });
  }, ref);

  return <div ref={ref}><div className="caja">Hola</div></div>;
}
```

---

## Personalizar

- **Contenido:** los archivos de `src/data/`.
- **Colores y fuentes:** el bloque `@theme` en `src/index.css`. Los tokens se convierten en clases de Tailwind: `--color-accent` → `text-accent`, `bg-accent/20`, etc.
- **Agregar una sección:**
  1. Crea `src/sections/MiSeccion.tsx` usando `<Section id="mi-seccion" …>`.
  2. Agrégala en `App.tsx`.
  3. Agrega `{ label, href: '#mi-seccion', icon }` a `src/data/navigation.ts` para que aparezca en el Dock.
