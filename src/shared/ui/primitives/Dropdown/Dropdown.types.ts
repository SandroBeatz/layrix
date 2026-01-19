/**
 * Dropdown component types
 *
 * Universal dropdown component that adapts to device:
 * - Desktop: Regular dropdown (QMenu)
 * - Mobile: Bottom sheet (QDialog)
 */

export interface DropdownItem {
  /**
   * Icon to display before the label
   * Can be any Quasar icon or custom icon
   */
  icon?: string

  /**
   * Main text of the item
   */
  label: string

  /**
   * Caption text below the label (smaller, muted)
   */
  caption?: string

  /**
   * Icon to display after the label
   */
  endIcon?: string

  /**
   * Custom content at the end of the item
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
