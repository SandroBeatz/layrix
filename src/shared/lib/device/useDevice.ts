import { computed } from 'vue'
import type { UseDeviceReturn, DeviceType, DeviceInfo } from './device.types'
import { useScreen } from './useScreen'
import { usePlatform } from './usePlatform'

/**
 * Complete device detection composable
 *
 * Provides comprehensive device information including:
 * - Device type (mobile/tablet/desktop)
 * - Screen breakpoints (reactive)
 * - Platform/OS detection
 * - Browser detection
 * - Touch capability
 *
 * Uses Quasar's built-in Screen and Platform plugins for reactive,
 * SSR-safe detection. Updates automatically on viewport changes.
 *
 * @example
 * // Basic usage
 * const { deviceType, isMobile, isTablet, isDesktop } = useDevice()
 *
 * if (isMobile.value) {
 *   // Mobile-specific logic
 * }
 *
 * @example
 * // Access full device info
 * const { device, breakpoint, os, browser } = useDevice()
 *
 * console.log(`Device: ${deviceType.value}`)
 * console.log(`Breakpoint: ${breakpoint.value}`)
 * console.log(`OS: ${os.value}, Browser: ${browser.value}`)
 *
 * @example
 * // Reactive template usage
 * <template>
 *   <div v-if="isMobile">Mobile view</div>
 *   <div v-else-if="isTablet">Tablet view</div>
 *   <div v-else>Desktop view</div>
 * </template>
 */
export function useDevice(): UseDeviceReturn {
  const { screen, breakpoint: screenBreakpoint } = useScreen()
  const {
    platform,
    os: platformOS,
    browser: platformBrowser,
    hasTouch,
  } = usePlatform()

  /**
   * Determine device type based on platform and screen size
   *
   * Logic:
   * - Mobile: Touch device AND (xs or sm breakpoint)
   * - Tablet: Touch device AND md breakpoint
   * - Desktop: Everything else (no touch OR lg/xl breakpoint)
   */
  const deviceType = computed<DeviceType>(() => {
    const { isMobile: platformMobile } = platform.value
    const { name } = screen.value

    // If platform is mobile
    if (platformMobile) {
      // Small screens = mobile phone
      if (name === 'xs' || name === 'sm') {
        return 'mobile'
      }
      // Medium screens = tablet
      if (name === 'md') {
        return 'tablet'
      }
      // Large mobile screens = tablet
      return 'tablet'
    }

    // Platform is desktop
    // But check if it has touch (convertibles, touch monitors)
    if (hasTouch.value && (name === 'xs' || name === 'sm' || name === 'md')) {
      return name === 'md' ? 'tablet' : 'mobile'
    }

    return 'desktop'
  })

  // Convenience flags
  const isMobile = computed(() => deviceType.value === 'mobile')
  const isTablet = computed(() => deviceType.value === 'tablet')
  const isDesktop = computed(() => deviceType.value === 'desktop')

  // Complete device info object
  const device = computed<DeviceInfo>(() => ({
    type: deviceType.value,
    isMobile: isMobile.value,
    isTablet: isTablet.value,
    isDesktop: isDesktop.value,
    screen: screen.value,
    platform: platform.value,
  }))

  return {
    device,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: screenBreakpoint,
    os: platformOS,
    browser: platformBrowser,
    hasTouch,
  }
}
