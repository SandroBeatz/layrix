/**
 * Input Component Types
 * Wrapper around Quasar QInput with opinionated design system
 */

import { type QInputProps } from 'quasar';

/**
 * Input component props
 */
export interface InputProps extends Omit<
  QInputProps,
  ''
> {
  placeholder?: string | undefined;
  icon?: string | undefined;
  iconRight?: string | undefined;
}
