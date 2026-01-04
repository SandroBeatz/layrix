/**
 * Button Component Types
 * Wrapper around Quasar QBtn with opinionated design system
 */

/**
 * Button color variant
 * - primary: Main action color
 * - secondary: Secondary action color
 * - positive: Success/positive action
 * - negative: Danger/delete action
 * - warning: Warning action
 * - info: Info action
 * - regular: Regular text color (foreground)
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'regular';

/**
 * Button visual appearance
 * - fill: Solid filled button (default)
 * - outline: Outlined button with transparent background
 * - ghost: Flat button without border
 */
export type ButtonAppearance = 'fill' | 'outline' | 'ghost' | 'flat';

/**
 * Button shape
 * - rounded: Standard rounded corners (default)
 * - round: Fully circular (only works with iconOnly=true)
 */
export type ButtonShape = 'rounded' | 'round';

/**
 * Button size
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps {
  /**
   * Button color variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Visual appearance style
   * @default 'fill'
   */
  appearance?: ButtonAppearance;

  /**
   * Button shape
   * @default 'rounded'
   */
  shape?: ButtonShape;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Icon-only mode (no text content)
   * When true, 'icon' prop is required and shape='round' is available
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Icon name (for icon-only buttons or buttons with icons)
   * Use icon class names like 'ti-plus', 'ti-edit', etc.
   */
  icon?: string;

  /**
   * Loading state - shows spinner and disables button
   * @default false
   */
  loading?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * HTML button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button text label
   */
  label?: string;
}
