import { computed } from 'vue'
import { useQuasar } from 'quasar'
import type {
  UsePlatformReturn,
  PlatformInfo,
  OSType,
  BrowserType,
} from './device.types'

/**
 * Platform detection composable
 *
 * Provides operating system, browser, and device type detection.
 * Based on user agent string and platform APIs.
 *
 * Uses Quasar's Platform plugin which is SSR-safe.
 *
 * @example
 * // Check operating system
 * const { os, isIOS, isAndroid } = usePlatform()
 *
 * if (isIOS.value) {
 *   // iOS-specific logic
 * }
 *
 * @example
 * // Check browser
 * const { browser } = usePlatform()
 *
 * if (browser.value === 'safari') {
 *   // Safari-specific workaround
 * }
 *
 * @example
 * // Feature detection
 * const { hasTouch, platform } = usePlatform()
 *
 * if (hasTouch.value) {
 *   // Enable touch gestures
 * }
 *
 * if (platform.value.device.isIPad) {
 *   // iPad-specific layout
 * }
 */
export function usePlatform(): UsePlatformReturn {
  const $q = useQuasar()

  // Detect operating system
  const os = computed<OSType>(() => {
    const p = $q.platform.is
    if (p.ios) return 'ios'
    if (p.android) return 'android'
    if (p.mac) return 'mac'
    if (p.win) return 'windows'
    if (p.linux) return 'linux'
    if (p.cros) return 'chromeos'
    return 'unknown'
  })

  // Detect browser
  const browser = computed<BrowserType>(() => {
    const p = $q.platform.is
    if (p.chrome) return 'chrome'
    if (p.firefox) return 'firefox'
    if (p.safari) return 'safari'
    if (p.edge) return 'edge'
    if (p.opera) return 'opera'
    return 'unknown'
  })

  // Platform flags
  const isMobile = computed(() => $q.platform.is.mobile)
  const isDesktop = computed(() => $q.platform.is.desktop)
  const hasTouch = computed(() => $q.platform.has.touch)
  const isElectron = computed(() => $q.platform.is.electron)

  // OS convenience flags
  const isIOS = computed(() => $q.platform.is.ios)
  const isAndroid = computed(() => $q.platform.is.android)

  // Complete platform info
  const platform = computed<PlatformInfo>(() => ({
    os: os.value,
    browser: browser.value,
    isMobile: isMobile.value,
    isDesktop: isDesktop.value,
    isElectron: isElectron.value,
    isBrowserExtension: $q.platform.is.bex,
    hasTouch: hasTouch.value,
    isIframe: $q.platform.within.iframe,
    device: {
      isIPhone: $q.platform.is.iphone,
      isIPad: $q.platform.is.ipad,
      isIPod: $q.platform.is.ipod,
      isKindle: $q.platform.is.kindle,
    },
  }))

  return {
    platform,
    os,
    browser,
    isMobile,
    isDesktop,
    hasTouch,
    isIOS,
    isAndroid,
    isElectron,
  }
}
