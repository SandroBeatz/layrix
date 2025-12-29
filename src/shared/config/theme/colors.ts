import type { ThemeColors } from './types'

/**
 * Light theme colors
 * Based on Quasar default palette with modern adjustments
 */
export const lightColors: ThemeColors = {
  // Brand colors
  primary: '#1976d2',
  secondary: '#26a69a',
  accent: '#9c27b0',

  // Status colors
  positive: '#21ba45',
  negative: '#c10015',
  info: '#31ccec',
  warning: '#f2c037',

  // Background colors
  dark: '#1d1d1d',
  background: '#ffffff',
  surface: '#f5f5f5',

  // Text colors
  text: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.6)',

  // Border
  border: 'rgba(0, 0, 0, 0.12)',

  // Tailwind-style semantic colors
  foreground: 'rgba(0, 0, 0, 0.87)', // = text
  card: '#ffffff',
  cardForeground: 'rgba(0, 0, 0, 0.87)',
  muted: '#f5f5f5', // светлый серый для secondary контента
  mutedForeground: 'rgba(0, 0, 0, 0.6)', // = textSecondary
  input: '#fafafa', // очень светлый серый
  sidebar: '#f8f9fa', // светлый фон для sidebar
  sidebarForeground: 'rgba(0, 0, 0, 0.87)',
}

/**
 * Dark theme colors
 * Designed for comfortable night viewing
 */
export const darkColors: ThemeColors = {
  // Brand colors (slightly adjusted for dark mode)
  primary: '#42a5f5',
  secondary: '#4db6ac',
  accent: '#ba68c8',

  // Status colors
  positive: '#4caf50',
  negative: '#ef5350',
  info: '#29b6f6',
  warning: '#ffa726',

  // Background colors
  dark: '#1d1d1d',
  background: '#121212',
  surface: '#1e1e1e',

  // Text colors
  text: 'rgba(255, 255, 255, 0.87)',
  textSecondary: 'rgba(255, 255, 255, 0.6)',

  // Border
  border: 'rgba(255, 255, 255, 0.12)',

  // Tailwind-style semantic colors
  foreground: 'rgba(255, 255, 255, 0.87)', // = text
  card: '#2c2c2c', // темный фон карточек
  cardForeground: 'rgba(255, 255, 255, 0.87)',
  muted: '#3a3a3a', // темный серый
  mutedForeground: 'rgba(255, 255, 255, 0.6)', // = textSecondary
  input: '#333333', // темный input
  sidebar: '#1e1e1e', // темный sidebar
  sidebarForeground: 'rgba(255, 255, 255, 0.87)',
}
