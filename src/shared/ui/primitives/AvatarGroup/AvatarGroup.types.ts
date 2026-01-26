/**
 * AvatarGroup Component Types
 * Overlapping avatar group with hover effects and popovers
 */

import type { AvatarSize, AvatarUserData } from '../Avatar/Avatar.types';

/**
 * Avatar item in the group
 */
export interface AvatarGroupItem extends AvatarUserData {
  /**
   * Unique identifier for the avatar
   */
  id: string | number;

  /**
   * Click handler for the avatar
   */
  onClick?: () => void;
}

/**
 * AvatarGroup component props
 */
export interface AvatarGroupProps {
  /**
   * Array of avatar items to display
   */
  items: AvatarGroupItem[];

  /**
   * Avatar size for all items
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Maximum number of avatars to show
   * Remaining count is shown as "+N"
   * @default 4
   */
  max?: number;

  /**
   * Overlap amount in pixels (negative margin)
   * @default 12
   */
  overlap?: number;

  /**
   * Enable hover effect to show full avatar
   * @default true
   */
  hoverExpand?: boolean;

  /**
   * Enable popover with user data on hover
   * @default true
   */
  showPopover?: boolean;

  /**
   * Direction of the stack
   * @default 'left'
   */
  direction?: 'left' | 'right';
}

/**
 * AvatarGroup emits
 */
export interface AvatarGroupEmits {
  /**
   * Emitted when an avatar is clicked
   */
  (e: 'avatar-click', item: AvatarGroupItem): void;

  /**
   * Emitted when the overflow indicator is clicked
   */
  (e: 'overflow-click'): void;
}
