/**
 * Íconos SVG como componentes de React.
 *
 * Todos siguen el mismo patrón, para poder intercambiarlos (tipo IconComponent en types.ts):
 *   - reciben `size` (px, default 18);
 *   - usan `currentColor`, así que toman el color del texto de su contenedor
 *     (className="text-accent" en el padre → ícono de color acento).
 *
 * Para agregar uno nuevo: copia un archivo, pega el SVG (p. ej. de lucide.dev)
 * y expórtalo aquí.
 */
export { BriefcaseIcon } from './BriefcaseIcon';
export { GitHubIcon } from './GitHubIcon';
export { GridIcon } from './GridIcon';
export { HomeIcon } from './HomeIcon';
export { LinkedInIcon } from './LinkedInIcon';
export { MailIcon } from './MailIcon';
export { XIcon } from './XIcon';
