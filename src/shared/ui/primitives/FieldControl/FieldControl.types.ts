/**
 * FieldControl Component Types
 * Wrapper component that provides consistent label + field layout
 */

/**
 * FieldControl component props
 */
export interface FieldControlProps {
  /**
   * Label text displayed above the field
   */
  label?: string;

  /**
   * Whether the field is required
   * When true, displays a red asterisk next to the label
   * @default false
   */
  required?: boolean;

  /**
   * ID for the form control
   * If not provided, a unique ID will be auto-generated
   * This ID is used to link the label to the field via `for` attribute
   */
  id?: string;
}
