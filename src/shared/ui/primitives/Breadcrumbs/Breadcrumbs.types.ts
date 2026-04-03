/**
 * Breadcrumbs Component Types
 * Wrapper around Quasar QBreadcrumbs with opinionated design system
 */

/**
 * Breadcrumbs style variant
 * - primary: Text color is primary, active item color is muted-foreground
 * - regular: Text color is foreground, active item color is muted-foreground
 */
export type BreadcrumbsVariant = 'primary' | 'regular';

/**
 * Breadcrumb item properties
 * Corresponds to all properties of QBreadcrumbsEl
 */
export interface BreadcrumbItem {
  /**
   * Label text for the breadcrumb
   */
  label: string;

  /**
   * Icon to display before the label
   * Can be a Tabler icon object or string icon name
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;

  /**
   * Router link object or string path
   */
  to?: string | object;

  /**
   * Href for external links
   */
  href?: string;

  /**
   * Target attribute for links
   */
  target?: string;

  /**
   * Whether this item is disabled
   * @default false
   */
  disable?: boolean;

  /**
   * Tag name to use for the element
   * @default 'span' for disabled items, 'a' for links
   */
  tag?: string;

  /**
   * Whether to use exact match for router links
   * @default false
   */
  exact?: boolean;

  /**
   * Whether to use exact active class for router links
   * @default false
   */
  exactActiveClass?: string;

  /**
   * Custom class to apply
   */
  class?: string;

  /**
   * Custom style to apply
   */
  style?: string | object;

  /**
   * Whether to replace history instead of push
   * @default false
   */
  replace?: boolean;

  /**
   * Whether to append to current path
   * @default false
   */
  append?: boolean;
}

/**
 * Breadcrumbs component props
 */
export interface BreadcrumbsProps {
  /**
   * Style variant
   * @default 'regular'
   */
  variant?: BreadcrumbsVariant;

  /**
   * Array of breadcrumb items
   */
  items?: BreadcrumbItem[];

  /**
   * Separator between breadcrumb items
   * Can be a string, Tabler icon object, or icon name
   * @default '/'
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  separator?: any;

  /**
   * Use icon as separator
   * @default false
   */
  separatorIcon?: boolean;

  /**
   * Active color for QBreadcrumbs
   * This is managed internally based on variant
   */
  activeColor?: string;

  /**
   * Gutter size (spacing) for breadcrumbs
   * Values: 'none', 'xs', 'sm', 'md', 'lg', 'xl'
   * @default 'sm'
   */
  gutter?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Alignment of breadcrumbs
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
}
