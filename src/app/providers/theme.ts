import { boot } from 'quasar/wrappers'
import { themes, DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from '@shared/config'
import type { ThemeMode } from '@shared/config'

/**
 * Theme Boot File
 * Initializes theme on application startup
 * Loads saved theme from localStorage and applies it
 */
export default boot(({ app }) => {
  // Load theme from localStorage
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

  // Apply theme to the document
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
  }

  // Initialize theme on boot
  const savedTheme = loadTheme()
  applyTheme(savedTheme)

  // Make theme available globally if needed
  app.config.globalProperties.$currentTheme = savedTheme
})
