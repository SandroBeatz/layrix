/**
 * Alert Component Types
 * Wrapper around Quasar QCard with opinionated design system for alerts
 */

/**
 * Alert color variant
 * - primary: Main brand color
 * - secondary: Secondary brand color
 * - positive: Success/positive status
 * - negative: Error/danger status
 * - warning: Warning status
 * - info: Informational status
 * - regular: Regular text color (foreground)
 */
export type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'regular';

/**
 * Alert visual appearance
 * - fill: Solid filled alert (default)
 * - outline: Outlined alert with transparent background
 * - ghost: Subtle background with colored text (semi-transparent)
 */
export type AlertAppearance = 'fill' | 'outline' | 'ghost';

/**
 * Alert component props
 */
export interface AlertProps {
  /**
   * Alert color variant
   * @default 'primary'
   */
  variant?: AlertVariant;

  /**
   * Visual appearance style
   * @default 'fill'
   */
  appearance?: AlertAppearance;

  /**
   * Icon name to display
   * Use icon class names like 'info', 'warning', 'check_circle', etc.
   * Set to empty string, null, or false to hide the icon
   */
  icon?: string | null | false;

  /**
   * Overline text (small text above title)
   */
  overline?: string;

  /**
   * Title text
   */
  title?: string;

  /**
   * Message text (main content)
   */
  message?: string;
}
