import type { QCardProps } from 'quasar';

export type CardVariant = 'default' | 'primary' | 'secondary';

export interface CardProps extends QCardProps {
  variant?: CardVariant;
  dense?: boolean;
  title?: string | number | null;
  caption?: string | number | null;
}
