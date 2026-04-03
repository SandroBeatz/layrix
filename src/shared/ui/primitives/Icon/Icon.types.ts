/**
 * Icon Component Types
 * Wrapper around Quasar QIcon with design system integration
 */

/**
 * Icon component props
 */
export interface IconProps {
  /**
   * Icon name or SVG string from Tabler Icons v2
   * Import icons from 'quasar-extras-svg-icons/tabler-icons-v2'
   *
   * @example
   * import { tabHome, tabSearch } from 'quasar-extras-svg-icons/tabler-icons-v2'
   * <Icon :name="tabHome" />
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;

  /**
   * Icon size — CSS unit string or Quasar size keyword
   * Keywords: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   * CSS values: '16px', '24px', '1.5rem', etc.
   */
  size?: string;

  /**
   * Icon color — Quasar color name or CSS color value
   * @example 'primary', 'negative', '#ff0000'
   */
  color?: string;

  /**
   * Apply a small left margin gutter
   * Useful when the icon appears before inline text
   */
  left?: boolean;

  /**
   * Apply a small right margin gutter
   * Useful when the icon appears after inline text
   */
  right?: boolean;

  /**
   * HTML tag used to render the icon element
   * @default 'i'
   */
  tag?: string;
}
