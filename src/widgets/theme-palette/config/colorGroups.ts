/**
 * Color group configuration
 * Represents a group of related colors in the theme palette
 */
export interface ColorGroup {
  /**
   * Display title for the color group
   */
  title: string

  /**
   * Array of color variable names (without prefix)
   * e.g., ['primary', 'secondary', 'accent']
   */
  colors: string[]
}

/**
 * Theme color groups configuration
 * Organized by semantic meaning and usage
 *
 * Color names must match CSS variables in layrix.variables.scss
 * without the --color- prefix
 */
export const colorGroups: ColorGroup[] = [
  {
    title: 'Brand Colors',
    colors: ['primary', 'secondary', 'accent']
  },
  {
    title: 'Status Colors',
    colors: ['positive', 'negative', 'info', 'warning']
  },
  {
    title: 'Background Colors',
    colors: ['dark', 'background', 'surface']
  },
  {
    title: 'Text Colors',
    colors: ['foreground', 'card-foreground', 'muted-foreground', 'sidebar-foreground']
  },
  {
    title: 'Semantic Colors',
    colors: ['border', 'input', 'muted', 'sidebar', 'card']
  }
]
