import { useQuasar } from 'quasar'

/**
 * Options for clipboard copy operation
 */
export interface ClipboardOptions {
  /**
   * Success message to display in toast notification
   * @default 'Copied to clipboard'
   */
  successMessage?: string

  /**
   * Error message to display in toast notification
   * @default 'Failed to copy'
   */
  errorMessage?: string

  /**
   * Position of the toast notification
   * @default 'top'
   */
  notificationPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  /**
   * Duration of the toast notification in milliseconds
   * @default 2000
   */
  notificationTimeout?: number
}

/**
 * Composable for copying text to clipboard with toast notifications
 *
 * Uses modern Clipboard API with fallback for older browsers.
 * Shows Quasar toast notifications on success/failure.
 *
 * @example
 * const { copyToClipboard } = useClipboard()
 *
 * // Basic usage
 * await copyToClipboard('text to copy')
 *
 * // With custom message
 * await copyToClipboard('text to copy', {
 *   successMessage: 'Successfully copied!'
 * })
 */
export function useClipboard() {
  const $q = useQuasar()

  /**
   * Copy text to clipboard with toast notification
   *
   * @param text - Text to copy to clipboard
   * @param options - Optional configuration for notifications
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  async function copyToClipboard(
    text: string,
    options: ClipboardOptions = {}
  ): Promise<boolean> {
    const {
      successMessage = 'Copied to clipboard',
      errorMessage = 'Failed to copy',
      notificationPosition = 'top',
      notificationTimeout = 2000
    } = options

    try {
      // Modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)

        // Show success notification
        $q.notify({
          type: 'positive',
          message: successMessage,
          position: notificationPosition,
          timeout: notificationTimeout,
          icon: 'check_circle'
        })

        return true
      }

      // Fallback for older browsers using execCommand
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()

      const success = document.execCommand('copy')
      document.body.removeChild(textarea)

      if (success) {
        $q.notify({
          type: 'positive',
          message: successMessage,
          position: notificationPosition,
          timeout: notificationTimeout,
          icon: 'check_circle'
        })
        return true
      }

      throw new Error('execCommand failed')

    } catch (error) {
      console.warn('Failed to copy to clipboard:', error)

      $q.notify({
        type: 'negative',
        message: errorMessage,
        position: notificationPosition,
        timeout: notificationTimeout,
        icon: 'error'
      })

      return false
    }
  }

  return {
    copyToClipboard
  }
}
