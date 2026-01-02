/**
 * ColorSwatch Component Props
 * Displays a color swatch with copyable CSS class names
 */
export interface ColorSwatchProps {
  /**
   * Color variable name (without prefix)
   * e.g., "primary", "secondary", "muted-foreground"
   */
  colorName: string

  /**
   * Optional: Display hex color value
   * If true, computes color from CSS variable
   * @default false
   */
  showHex?: boolean

  /**
   * Optional: Custom height
   * @default '150px'
   */
  height?: string
}
