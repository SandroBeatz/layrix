/**
 * Avatar Component Types
 * Wrapper around Quasar QAvatar with opinionated design system
 */

/**
 * Avatar size
 * - sm: Small (32px)
 * - md: Medium (40px)
 * - lg: Large (56px)
 */
export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * Avatar shape
 * - round: Circular (default)
 * - square: Square corners
 * - rounded: Rounded corners
 */
export type AvatarShape = 'round' | 'square' | 'rounded';

/**
 * Avatar color variant (for background when no image)
 */
export type AvatarVariant =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'regular';

/**
 * Avatar component props
 */
export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for image
   */
  alt?: string;

  /**
   * Text to display (initials) when no image
   * Usually 1-2 characters
   */
  text?: string;

  /**
   * Icon name to display when no image or text
   */
  icon?: string;

  /**
   * Avatar size
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Avatar shape
   * @default 'round'
   */
  shape?: AvatarShape;

  /**
   * Background color variant (when no image)
   * @default 'primary'
   */
  variant?: AvatarVariant;

  /**
   * Custom font size for text/icon
   */
  fontSize?: string;

  /**
   * Whether the avatar is clickable
   * @default false
   */
  clickable?: boolean;
}

/**
 * User data for avatar popover
 */
export interface AvatarUserData {
  /**
   * User's display name / title
   */
  title: string;

  /**
   * User's role, email, or description
   */
  caption?: string;

  /**
   * Avatar image source
   */
  src?: string;

  /**
   * Initials to display if no image
   */
  initials?: string;
}
