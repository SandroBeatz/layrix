/**
 * Device Detection - Public API
 *
 * Composables for device, screen, and platform detection.
 * Built on Quasar's Screen and Platform plugins.
 */

// Composables
export { useDevice } from './useDevice'
export { useScreen } from './useScreen'
export { usePlatform } from './usePlatform'

// Types
export type {
  // Main types
  DeviceType,
  BreakpointName,
  OSType,
  BrowserType,

  // Info interfaces
  DeviceInfo,
  ScreenInfo,
  PlatformInfo,

  // Return types
  UseDeviceReturn,
  UseScreenReturn,
  UsePlatformReturn,
} from './device.types'
