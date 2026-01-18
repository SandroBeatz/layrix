import type { NamedColor } from 'quasar';

/**
 * Typography component props
 */
export interface TypographyProps {
  as?: keyof HTMLElementTagNameMap;
  variant?: TypographyVariant;
  content?: string | undefined;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | undefined;
  align?: 'left' | 'center' | 'right' | 'justify' | undefined;
  color?: NamedColor | 'muted-foreground' | undefined;
  className?: string | undefined;
}

/**
 * Typography variants
 */
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'subtitle-muted'
  | 'body'
  | 'body-muted'
  | 'caption'
  | 'caption-muted'
  | 'overline'
  | 'overline-muted'
  | 'blockquote';
