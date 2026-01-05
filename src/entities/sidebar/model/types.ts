/**
 * Sidebar state type
 */
export interface SidebarState {
  /**
   * Mini mode - sidebar is collapsed but visible (icon-only mode)
   * Used on desktop (show-if-above)
   */
  isMini: boolean;

  /**
   * Drawer open state - sidebar is visible/hidden
   * Used on mobile (drawer toggle)
   */
  isOpen: boolean;
}

/**
 * Sidebar persistence data
 * Only isMini is persisted to localStorage
 */
export interface SidebarStorageData {
  isMini: boolean;
}
