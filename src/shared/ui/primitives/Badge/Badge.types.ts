/**
 * Badge Component Types
 * Wrapper around Quasar QBadge with opinionated design system
 */

/**
 * Badge color variant
 * - primary: Main brand color
 * - secondary: Secondary brand color
 * - positive: Success/positive status
 * - negative: Error/danger status
 * - warning: Warning status
 * - info: Informational status
 * - regular: Regular text color (foreground)
 */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'regular';

/**
 * Badge visual appearance
 * - fill: Solid filled badge (default)
 * - outline: Outlined badge with transparent background
 * - ghost: Subtle background with colored text (semi-transparent)
 */
export type BadgeAppearance = 'fill' | 'outline' | 'ghost';

/**
 * Badge component props
 */
export interface BadgeProps {
  /**
   * Badge color variant
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * Visual appearance style
   * @default 'fill'
   */
  appearance?: BadgeAppearance;

  /**
   * Badge label/content
   * Can be text or number
   */
  label?: string | number;

  /**
   * Pill shape (fully rounded)
   * Uses border-radius for fully rounded pill shape
   * @default false
   */
  pill?: boolean;

  /**
   * Dot indicator mode
   * Shows a small dot without label
   * @default false
   */
  dot?: boolean;

  /**
   * Floating mode
   * Positions badge absolutely (useful for overlaying on avatars, buttons, etc.)
   * @default false
   */
  floating?: boolean;

  /**
   * Transparent background
   * @default false
   */
  transparent?: boolean;
}
