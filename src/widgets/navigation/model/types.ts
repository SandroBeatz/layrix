/**
 * Navigation Menu Types
 */

export interface NavigationMenuItem {
  /** Menu item label */
  label: string;

  /** Internal route path */
  to?: string;

  /** External link flag */
  external?: boolean;

  /** External link URL */
  externalLink?: string;

  /** Icon for menu item */
  icon?: string;

  /** Disable menu item */
  disable?: boolean;

  /** Menu item caption/description */
  caption?: string;

  /** Click handler function */
  action?: () => void;

  /** Submenu items (for multi-level navigation) */
  submenu?: NavigationMenuItem[];

  /** Paths that should expand this menu item */
  expandOn?: string[];
}

export interface NavigationMenuGroup {
  /** Group title (optional) */
  title?: string;

  /** Menu items in group */
  items: NavigationMenuItem[];
}
