import type { ThemeConfig } from './types'
import { lightColors, darkColors } from './colors'

/**
 * Application theme configuration
 * Defines available themes with their color palettes
 */
export const themes: ThemeConfig = {
  light: {
    mode: 'light',
    colors: lightColors,
  },
  dark: {
    mode: 'dark',
    colors: darkColors,
  },
}

/**
 * Default theme mode
 */
export const DEFAULT_THEME_MODE = 'light' as const

/**
 * Local storage key for theme persistence
 */
export const THEME_STORAGE_KEY = 'layrix-theme' as const
