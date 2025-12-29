import { ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import type { ThemeMode } from '@shared/config'
import { themes, DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from '@shared/config'

/**
 * Composable for theme management
 * Handles theme switching, persistence, and Quasar Dark mode integration
 */
export function useTheme() {
  const $q = useQuasar()
  const currentTheme = ref<ThemeMode>(DEFAULT_THEME_MODE)

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
    return DEFAULT_THEME_MODE
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
   * Apply theme to the document
   * Updates CSS variables and Quasar Dark mode
   */
  function applyTheme(mode: ThemeMode): void {
    const theme = themes[mode]
    const root = document.documentElement

    // Set data-theme attribute for CSS variable switching
    root.setAttribute('data-theme', mode)

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVarName, value)
    })

    // Sync with Quasar Dark mode
    $q.dark.set(mode === 'dark')
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

  // Watch for theme changes (if modified externally)
  watch(currentTheme, (newMode) => {
    applyTheme(newMode)
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
