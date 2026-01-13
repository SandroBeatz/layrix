import type { ComputedRef } from 'vue'

/**
 * Device type classification
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Screen breakpoint names (matches Quasar breakpoints)
 */
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Operating system types
 */
export type OSType =
  | 'ios'
  | 'android'
  | 'mac'
  | 'windows'
  | 'linux'
  | 'chromeos'
  | 'unknown'

/**
 * Browser types
 */
export type BrowserType =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'unknown'

/**
 * Platform information
 */
export interface PlatformInfo {
  /** Current operating system */
  os: OSType
  /** Current browser */
  browser: BrowserType
  /** Is mobile device (phone or tablet) */
  isMobile: boolean
  /** Is desktop device */
  isDesktop: boolean
  /** Is running in Electron app */
  isElectron: boolean
  /** Is running as browser extension */
  isBrowserExtension: boolean
  /** Device has touch capability */
  hasTouch: boolean
  /** Running within an iframe */
  isIframe: boolean
  /** Specific device checks */
  device: {
    isIPhone: boolean
    isIPad: boolean
    isIPod: boolean
    isKindle: boolean
  }
}

/**
 * Screen information with breakpoints
 */
export interface ScreenInfo {
  /** Current breakpoint name */
  name: BreakpointName
  /** Current viewport width in pixels */
  width: number
  /** Current viewport height in pixels */
  height: number
  /** Breakpoint checks */
  is: {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
  }
  /** Less than breakpoint */
  lt: {
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
  }
  /** Greater than breakpoint */
  gt: {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
  }
  /** Less than or equal to breakpoint */
  lte: {
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
  }
  /** Greater than or equal to breakpoint */
  gte: {
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
  }
}

/**
 * Complete device information
 */
export interface DeviceInfo {
  /** Device type classification */
  type: DeviceType
  /** Is mobile phone */
  isMobile: boolean
  /** Is tablet */
  isTablet: boolean
  /** Is desktop */
  isDesktop: boolean
  /** Screen information */
  screen: ScreenInfo
  /** Platform information */
  platform: PlatformInfo
}

/**
 * Return type for useDevice composable
 */
export interface UseDeviceReturn {
  /** Complete device information (reactive) */
  device: ComputedRef<DeviceInfo>
  /** Device type shorthand */
  deviceType: ComputedRef<DeviceType>
  /** Is mobile phone */
  isMobile: ComputedRef<boolean>
  /** Is tablet */
  isTablet: ComputedRef<boolean>
  /** Is desktop */
  isDesktop: ComputedRef<boolean>
  /** Current breakpoint name */
  breakpoint: ComputedRef<BreakpointName>
  /** Operating system */
  os: ComputedRef<OSType>
  /** Browser */
  browser: ComputedRef<BrowserType>
  /** Has touch capability */
  hasTouch: ComputedRef<boolean>
}

/**
 * Return type for useScreen composable
 */
export interface UseScreenReturn {
  /** Screen information (reactive) */
  screen: ComputedRef<ScreenInfo>
  /** Current breakpoint name */
  breakpoint: ComputedRef<BreakpointName>
  /** Viewport width */
  width: ComputedRef<number>
  /** Viewport height */
  height: ComputedRef<number>
  /** Helper: Is mobile breakpoint (xs or sm) */
  isMobileBreakpoint: ComputedRef<boolean>
  /** Helper: Is tablet breakpoint (md) */
  isTabletBreakpoint: ComputedRef<boolean>
  /** Helper: Is desktop breakpoint (lg or xl) */
  isDesktopBreakpoint: ComputedRef<boolean>
}

/**
 * Return type for usePlatform composable
 */
export interface UsePlatformReturn {
  /** Platform information (reactive) */
  platform: ComputedRef<PlatformInfo>
  /** Operating system */
  os: ComputedRef<OSType>
  /** Browser */
  browser: ComputedRef<BrowserType>
  /** Is mobile device */
  isMobile: ComputedRef<boolean>
  /** Is desktop device */
  isDesktop: ComputedRef<boolean>
  /** Has touch capability */
  hasTouch: ComputedRef<boolean>
  /** Is iOS device */
  isIOS: ComputedRef<boolean>
  /** Is Android device */
  isAndroid: ComputedRef<boolean>
  /** Is running in Electron */
  isElectron: ComputedRef<boolean>
}
