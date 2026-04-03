/**
 * ListItem Component Types
 * Wrapper around Quasar QItem with opinionated design system
 */

/**
 * ListItem color variant for active state
 */
export type ListItemVariant =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info';

/**
 * ListItem component props
 */
export interface ListItemProps {
  /**
   * Main label text
   */
  label?: string;

  /**
   * Secondary caption text displayed below the label.
   * Can also be provided via the `caption` slot for custom markup.
   */
  caption?: string;

  /**
   * Overline text displayed above the label (small, muted)
   */
  overline?: string;

  /**
   * Text displayed in the right-side section (e.g. timestamp, category)
   */
  sideLabel?: string;

  /**
   * Caption displayed below the sideLabel on the right side
   */
  sideCaption?: string;

  /**
   * Maximum number of lines for label before truncating
   */
  labelLines?: number | string;

  /**
   * Maximum number of lines for caption before truncating
   */
  captionLines?: number | string;

  /**
   * Make item interactive (shows hover/focus state)
   * @default false
   */
  clickable?: boolean;

  /**
   * Mark item as active / selected
   * @default false
   */
  active?: boolean;

  /**
   * Color variant applied to the active state
   * @default 'primary'
   */
  variant?: ListItemVariant;

  /**
   * Disable the list item
   * @default false
   */
  disabled?: boolean;

  /**
   * Dense/compact mode
   * @default false
   */
  dense?: boolean;

  /**
   * Vue Router link destination
   */
  to?: string | object;

  /**
   * Regular anchor href
   */
  href?: string;

  /**
   * Inset level for nested items (adds left padding)
   * @default 0
   */
  insetLevel?: number;
}
