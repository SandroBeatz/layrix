/**
 * Theme type - light or dark
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Quasar-style semantic color palette
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: string
  /** Secondary brand color */
  secondary: string
  /** Accent color for highlights */
  accent: string
  /** Dark background color */
  dark: string
  /** Positive/success state color */
  positive: string
  /** Negative/error state color */
  negative: string
  /** Info state color */
  info: string
  /** Warning state color */
  warning: string
  /** Page background color */
  background: string
  /** Surface/card background color */
  surface: string
  /** Primary text color */
  text: string
  /** Secondary/muted text color */
  textSecondary: string
  /** Border color */
  border: string

  // Tailwind-style semantic colors
  /** Primary foreground/text color (alias for text) */
  foreground: string
  /** Card/panel background color */
  card: string
  /** Card foreground/text color */
  cardForeground: string
  /** Muted background color for secondary content */
  muted: string
  /** Muted foreground/text color */
  mutedForeground: string
  /** Input field background color */
  input: string
  /** Sidebar background color */
  sidebar: string
  /** Sidebar foreground/text color */
  sidebarForeground: string
}

/**
 * Complete theme configuration
 */
export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
}

/**
 * Theme configuration map
 */
export type ThemeConfig = Record<ThemeMode, Theme>
