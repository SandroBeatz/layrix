/**
 * Input Component Types
 * Wrapper around Quasar QInput with opinionated design system
 */

/**
 * Input size variants
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Supported input types
 */
export type InputType = 
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'number'
  | 'url'
  | 'time'
  | 'date'
  | 'datetime-local';

/**
 * Validation rule function
 */
export type ValidationRule = (val: string | number) => boolean | string;

/**
 * Input component props
 */
export interface InputProps {
  // Model value
  modelValue?: string | number;
  
  // Basic props
  placeholder?: string;
  type?: InputType;
  name?: string;
  
  // Icons
  icon?: string;
  iconRight?: string;
  
  /**
   * Input size variant
   * @default 'md'
   */
  size?: InputSize;
  
  // Textarea mode
  /**
   * Render as textarea instead of single-line input
   */
  textarea?: boolean;
  
  /**
   * Auto-grow textarea height based on content
   * Only works when textarea=true
   */
  autogrow?: boolean;
  
  /**
   * Number of rows for textarea
   * Only works when textarea=true
   */
  rows?: number;
  
  // Password toggle
  /**
   * Show password visibility toggle icon
   * Only works when type='password'
   */
  togglePassword?: boolean;
  
  // States
  dense?: boolean;
  disable?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  
  // Validation
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  rules?: ValidationRule[];
  lazyRules?: boolean | 'ondemand';
  reactiveRules?: boolean;
  
  // Mask
  mask?: string;
  fillMask?: boolean | string;
}
