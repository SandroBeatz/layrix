/**
 * Shared Config - Public API
 * Environment variables, constants, and configuration
 */

// Example exports:
// export { API_BASE_URL, APP_NAME } from './constants'
// export { env } from './env'

export type { ThemeMode, ThemeColors, Theme, ThemeConfig } from './theme'
export {
  lightColors,
  darkColors,
  themes,
  DEFAULT_THEME_MODE,
  THEME_STORAGE_KEY,
} from './theme'
