/**
 * List Component Types
 * Wrapper around Quasar QList with opinionated design system
 */

/**
 * List component props
 */
export interface ListProps {
  /**
   * Add border around the list
   * @default false
   */
  bordered?: boolean;

  /**
   * Add separator lines between items
   * @default false
   */
  separator?: boolean;

  /**
   * Dense/compact mode – reduces item height
   * @default false
   */
  dense?: boolean;

  /**
   * Add internal padding to the list
   * @default false
   */
  padding?: boolean;

  /**
   * HTML tag to render the list as
   * @default 'div'
   */
  tag?: string;
}
