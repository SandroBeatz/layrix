<script setup lang="ts">
import { computed } from 'vue'
import { Button, Typography } from '@shared/ui'
import { useClipboard } from '@shared/lib'
import type { ColorSwatchProps } from './ColorSwatch.types'

/**
 * ColorSwatch Component
 * Displays a color swatch with copyable CSS class names (bg-* and text-*)
 *
 * @example
 * // Basic usage
 * <ColorSwatch color-name="primary" />
 *
 * @example
 * // With hex value display
 * <ColorSwatch color-name="secondary" :show-hex="true" />
 *
 * @example
 * // Custom height
 * <ColorSwatch color-name="accent" height="200px" />
 */

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  showHex: false,
  height: '150px'
})

const { copyToClipboard } = useClipboard()

// Generate class names
const bgClassName = computed(() => `bg-${props.colorName}`)
const textClassName = computed(() => `text-${props.colorName}`)

// Get computed color value from CSS variable (for optional display)
const colorValue = computed(() => {
  if (!props.showHex) return null

  const varName = `--color-${props.colorName}`
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
})

// Copy handlers
const handleCopyBg = () => {
  void copyToClipboard(bgClassName.value)
}

const handleCopyText = () => {
  void copyToClipboard(textClassName.value)
}
</script>

<template>
  <div class="color-swatch" :class="bgClassName">
    <div class="color-swatch__content">
      <!-- Background class row -->
      <div class="color-swatch__row">
        <Typography as="span" variant="caption" class-name="color-swatch__text">{{ bgClassName }}</Typography>
        <Button
          icon-only
          icon="content_copy"
          size="sm"
          appearance="flat"
          @click="handleCopyBg"
          class="color-swatch__copy-btn"
        />
      </div>

      <!-- Text class row -->
      <div class="color-swatch__row">
        <Typography as="span" variant="caption" class-name="color-swatch__text">{{ textClassName }}</Typography>
        <Button
          icon-only
          icon="content_copy"
          size="sm"
          appearance="flat"
          @click="handleCopyText"
          class="color-swatch__copy-btn"
        />
      </div>

      <!-- Optional hex value -->
      <div v-if="showHex && colorValue" class="color-swatch__hex">
        {{ colorValue }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color-swatch {
  position: relative;
  aspect-ratio: 4/3;
  min-height: v-bind(height);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__content {
    padding: 12px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__text {
    font-size: 13px;
    font-family: 'Roboto Mono', monospace;
    color: white;
    flex: 1;
  }

  &__copy-btn {
    color: white !important;

    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }
  }

  &__hex {
    margin-top: 8px;
    font-size: 11px;
    font-family: 'Roboto Mono', monospace;
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
