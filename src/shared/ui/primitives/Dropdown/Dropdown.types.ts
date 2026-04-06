/**
 * Dropdown component types
 *
 * Universal dropdown component that adapts to device:
 * - Desktop: Regular dropdown (QMenu)
 * - Mobile: Bottom sheet (QDialog)
 */

export interface DropdownItem {
  /**
   * Icon to display before the label.
   * Use Tabler icons from 'quasar-extras-svg-icons/tabler-icons-v2'.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any

  /**
   * Main text of the item
   */
  label: string

  /**
   * Caption text below the label (smaller, muted)
   */
  caption?: string

  /**
   * Icon to display after the label.
   * Use Tabler icons from 'quasar-extras-svg-icons/tabler-icons-v2'.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endIcon?: any

  /**
   * Custom text content at the end of the item (e.g. keyboard shortcut)
   */
  end?: string

  /**
   * Whether this item is disabled
   */
  disabled?: boolean

  /**
   * Click handler for the item
   */
  onClick?: () => void

  /**
   * Custom class for the item
   */
  class?: string

  /**
   * Whether to close dropdown after click
   * @default true
   */
  closeOnClick?: boolean

  /**
   * Nested submenu items.
   * On desktop a nested QMenu opens on hover/click.
   * On mobile the dialog navigates into the submenu level with a back button.
   */
  children?: DropdownContent[]
}

/**
 * Separator item - just displays a divider line
 */
export interface DropdownSeparator {
  type: 'separator'
}

/**
 * Section with optional caption
 */
export interface DropdownSection {
  type: 'section'
  /**
   * Optional caption for the section
   */
  caption?: string
  /**
   * Items in this section
   */
  items: DropdownItem[]
}

/**
 * Union type for all dropdown content items
 */
export type DropdownContent = DropdownItem | DropdownSeparator | DropdownSection

export interface DropdownProps {
  /**
   * Items to display in the dropdown
   * Can be a flat array of items, or an array with sections and separators
   */
  items?: DropdownContent[]

  /**
   * Whether to show the Cancel button on mobile bottom sheet
   * @default true
   */
  showCancelButton?: boolean

  /**
   * Text for the Cancel button
   * @default 'Cancel'
   */
  cancelButtonText?: string

  /**
   * Max width of the dropdown on desktop
   * @default '280px'
   */
  maxWidth?: string

  /**
   * Whether dropdown is open (for v-model)
   */
  modelValue?: boolean

  /**
   * Transition for the menu (desktop only)
   */
  transitionShow?: string

  /**
   * Transition for the menu (desktop only)
   */
  transitionHide?: string
}

export interface DropdownEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'item-click', item: DropdownItem): void
}
