import { computed } from 'vue'
import { useQuasar } from 'quasar'
import type { UseScreenReturn, ScreenInfo, BreakpointName } from './device.types'

/**
 * Screen breakpoint detection composable
 *
 * Provides reactive screen information and breakpoint detection.
 * Updates automatically when viewport size changes.
 *
 * Uses Quasar's Screen plugin which is SSR-safe and fully reactive.
 *
 * @example
 * // Basic breakpoint check
 * const { breakpoint, isMobileBreakpoint } = useScreen()
 *
 * if (isMobileBreakpoint.value) {
 *   // Show mobile navigation
 * }
 *
 * @example
 * // Responsive layout
 * const { screen } = useScreen()
 *
 * const columns = computed(() => {
 *   if (screen.value.is.xs) return 1
 *   if (screen.value.is.sm) return 2
 *   if (screen.value.is.md) return 3
 *   return 4
 * })
 *
 * @example
 * // Comparison operators
 * const { screen } = useScreen()
 *
 * if (screen.value.lt.md) {
 *   // Less than medium breakpoint
 * }
 *
 * if (screen.value.gte.lg) {
 *   // Greater than or equal to large breakpoint
 * }
 */
export function useScreen(): UseScreenReturn {
  const $q = useQuasar()

  // Current breakpoint name
  const breakpoint = computed<BreakpointName>(
    () => $q.screen.name as BreakpointName
  )

  // Viewport dimensions
  const width = computed(() => $q.screen.width)
  const height = computed(() => $q.screen.height)

  // Complete screen info
  const screen = computed<ScreenInfo>(() => ({
    name: breakpoint.value,
    width: width.value,
    height: height.value,
    is: {
      xs: $q.screen.xs,
      sm: $q.screen.sm,
      md: $q.screen.md,
      lg: $q.screen.lg,
      xl: $q.screen.xl,
    },
    lt: {
      sm: $q.screen.lt.sm,
      md: $q.screen.lt.md,
      lg: $q.screen.lt.lg,
      xl: $q.screen.lt.xl,
    },
    gt: {
      xs: $q.screen.gt.xs,
      sm: $q.screen.gt.sm,
      md: $q.screen.gt.md,
      lg: $q.screen.gt.lg,
    },
    lte: {
      sm: $q.screen.xs || $q.screen.sm,
      md: $q.screen.xs || $q.screen.sm || $q.screen.md,
      lg: $q.screen.xs || $q.screen.sm || $q.screen.md || $q.screen.lg,
      xl: true, // Always true as xl is the largest
    },
    gte: {
      sm: $q.screen.sm || $q.screen.md || $q.screen.lg || $q.screen.xl,
      md: $q.screen.md || $q.screen.lg || $q.screen.xl,
      lg: $q.screen.lg || $q.screen.xl,
      xl: $q.screen.xl,
    },
  }))

  // Helper computed properties
  const isMobileBreakpoint = computed(() => $q.screen.xs || $q.screen.sm)
  const isTabletBreakpoint = computed(() => $q.screen.md)
  const isDesktopBreakpoint = computed(() => $q.screen.lg || $q.screen.xl)

  return {
    screen,
    breakpoint,
    width,
    height,
    isMobileBreakpoint,
    isTabletBreakpoint,
    isDesktopBreakpoint,
  }
}
