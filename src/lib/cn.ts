/**
 * cn — une nombres de clases CSS ignorando los valores "falsos".
 *
 * Sirve para aplicar clases de forma condicional sin llenar el JSX de
 * ternarios y espacios sueltos:
 *
 *   cn('p-4', activo && 'bg-accent', null)  →  'p-4 bg-accent'  (si activo es true)
 *                                           →  'p-4'            (si activo es false)
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  // filter(Boolean) quita false, null, undefined y '' → join(' ') las une con espacios
  return classes.filter(Boolean).join(' ');
}
