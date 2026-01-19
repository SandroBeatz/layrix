/**
 * ButtonGroup Component Types
 * Wrapper around Quasar QBtnGroup with opinionated design system
 */

/**
 * Button group orientation
 * - horizontal: Buttons arranged horizontally (default)
 * - vertical: Buttons arranged vertically
 */
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Button group component props
 */
export interface ButtonGroupProps {
  /**
   * Orientation of the button group
   * @default 'horizontal'
   */
  orientation?: ButtonGroupOrientation;

  /**
   * Make buttons take full width/height of container
   * @default false
   */
  spread?: boolean;

  /**
   * Make buttons stretch to same size
   * @default false
   */
  stretch?: boolean;

  /**
   * Add outline/border to the group
   * @default false
   */
  outline?: boolean;

  /**
   * Make the group flat (no shadow/elevation)
   * @default true
   */
  flat?: boolean;

  /**
   * Add rounded corners to the group
   * @default true
   */
  rounded?: boolean;
}
