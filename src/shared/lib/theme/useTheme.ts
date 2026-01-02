import { ref, onMounted } from 'vue'
import { useQuasar, setCssVar } from 'quasar'

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Storage key for theme persistence
 */
const THEME_STORAGE_KEY = 'layrix-theme'
const DEFAULT_THEME: ThemeMode = 'light'

/**
 * List of color variables to sync with Quasar
 * These must match the CSS variable names in app.scss
 */
const COLOR_VARS = [
  'primary',
  'secondary',
  'accent',
  'positive',
  'negative',
  'info',
  'warning',
  'dark'
] as const

/**
 * Simplified theme composable
 * Uses CSS variables from app.scss as single source of truth
 */
export function useTheme() {
  const $q = useQuasar()
  const currentTheme = ref<ThemeMode>(DEFAULT_THEME)

  /**
   * Get CSS variable value from :root
   */
  function getCssVariable(name: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${name}`)
      .trim()
  }

  /**
   * Apply theme by setting data-theme attribute and syncing Quasar colors
   */
  function applyTheme(mode: ThemeMode): void {
    // Set data-theme attribute to trigger CSS [data-theme='dark'] selector
    document.documentElement.setAttribute('data-theme', mode)

    // CRITICAL: Sync Quasar brand colors from CSS variables
    // This makes Quasar components (QBtn, QCard, etc.) use our CSS colors
    COLOR_VARS.forEach(colorName => {
      const cssValue = getCssVariable(colorName)
      if (cssValue) {
        setCssVar(colorName, cssValue)
      }
    })

    // Sync with Quasar Dark mode
    $q.dark.set(mode === 'dark')
  }

  /**
   * Load theme from localStorage
   */
  function loadTheme(): ThemeMode {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'light' || stored === 'dark') {
        return stored
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
    }
    return DEFAULT_THEME
  }

  /**
   * Save theme to localStorage
   */
  function saveTheme(mode: ThemeMode): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }

  /**
   * Set theme mode
   */
  function setTheme(mode: ThemeMode): void {
    currentTheme.value = mode
    applyTheme(mode)
    saveTheme(mode)
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme(): void {
    const newMode = currentTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newMode)
  }

  /**
   * Initialize theme on mount
   */
  onMounted(() => {
    const savedTheme = loadTheme()
    setTheme(savedTheme)
  })

  return {
    /** Current theme mode */
    currentTheme,
    /** Set theme mode */
    setTheme,
    /** Toggle between light and dark */
    toggleTheme,
    /** Check if dark mode is active */
    isDark: () => currentTheme.value === 'dark',
    /** Check if light mode is active */
    isLight: () => currentTheme.value === 'light',
  }
}
