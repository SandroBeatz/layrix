/**
 * Typography Component Types
 * Wrapper around HTML typography elements with design system
 */

/**
 * Typography variant based on Material Design typography scale
 * - h1-h6: Heading levels
 * - subtitle1, subtitle2: Subtitle levels
 * - body1, body2: Body text
 * - caption: Small descriptive text
 * - overline: Uppercase labels
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

/**
 * Typography color variant
 * - default: Uses --color-text
 * - muted: Uses --color-text-muted for secondary/muted text
 * - primary, secondary, etc: Uses semantic colors
 */
export type TypographyColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info';

/**
 * Typography component props
 */
export interface TypographyProps {
  /**
   * Typography variant (style)
   * @default 'body1'
   */
  variant?: TypographyVariant;

  /**
   * Text color variant
   * @default 'default'
   */
  color?: TypographyColor;

  /**
   * HTML tag to render
   * If not specified, uses semantic tag based on variant
   */
  tag?: string;

  /**
   * Bold text
   * @default false
   */
  bold?: boolean;

  /**
   * Italic text
   * @default false
   */
  italic?: boolean;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;
}
