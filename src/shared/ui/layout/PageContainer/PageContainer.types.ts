/**
 * PageContainer Component Types
 * Provides consistent page layout structure
 */

export interface PageContainerProps {
  /**
   * Page title
   */
  title?: string;

  /**
   * Page subtitle/description
   */
  subtitle?: string;

  /**
   * Limit content width with max-width container
   * @default true
   */
  container?: boolean;

  /**
   * Maximum width value when container=true
   * @default '1200px'
   */
  maxWidth?: string;
}
