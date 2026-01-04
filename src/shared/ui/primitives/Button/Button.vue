<script setup lang="ts">
import { computed } from 'vue';
import { QBtn } from 'quasar';
import type { ButtonProps } from './Button.types';

/**
 * Button Component
 * Opinionated wrapper around Quasar QBtn
 *
 * @example
 * // Primary filled button
 * <Button>Click me</Button>
 *
 * @example
 * // Outlined secondary button
 * <Button variant="secondary" appearance="outline">Cancel</Button>
 *
 * @example
 * // Icon-only button
 * <Button icon-only icon="ti-plus" />
 *
 * @example
 * // Button with loading
 * <Button :loading="isLoading">Submit</Button>
 */

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  appearance: 'fill',
  shape: 'rounded',
  size: 'md',
  iconOnly: false,
  loading: false,
  disabled: false,
  type: 'button',
  fullWidth: false,
});

// Map variant to Quasar color
const qColor = computed(() => {
  const colorMap: Record<typeof props.variant, string> = {
    primary: 'primary',
    secondary: 'secondary',
    positive: 'positive',
    negative: 'negative',
    warning: 'warning',
    info: 'info',
    regular: 'foreground',
  };
  return colorMap[props.variant];
});

// Map appearance to Quasar props
const qAppearance = computed(() => {
  return {
    unelevated: props.appearance === 'fill',
    outline: props.appearance === 'outline',
    flat: props.appearance === 'flat' || props.appearance === 'ghost',
  };
});

// Map shape to Quasar props
const qShape = computed(() => {
  return {
    rounded: props.shape === 'round',
    // 'round' only works with iconOnly
    round: props.shape === 'round' && props.iconOnly,
  };
});

// Map size to Quasar size
const qSize = computed(() => {
  return props.size;
});

// Determine text color for specific cases
const qTextColor = computed(() => {
  if (props.variant === 'regular' && props.appearance === 'fill') return 'background';
  return '';
});

// Add custom size class for precise control
const sizeClass = computed(() => {
  return `button-size-${props.size}`;
});

// Add ghost class for custom styling
const ghostClass = computed(() => {
  if (props.appearance !== 'ghost') return '';
  return `button-ghost button-ghost--${props.variant}`;
});
</script>

<template>
  <QBtn
    :type="type"
    :color="qColor"
    :size="qSize"
    :unelevated="qAppearance.unelevated"
    :outline="qAppearance.outline"
    :flat="qAppearance.flat"
    :rounded="qShape.rounded"
    :round="qShape.round"
    :loading="loading"
    :disable="disabled"
    :label="label"
    :class="[
      sizeClass,
      {
        'full-width': fullWidth,
        'button-icon-only': iconOnly && shape !== 'round',
        'shape-rounded': props.shape === 'rounded',
      },
      ghostClass,
    ]"
    :icon="icon"
    :text-color="qTextColor"
    no-caps
  >
    <!-- Default slot for button content (text, custom content) -->
    <slot v-if="!iconOnly" />
  </QBtn>
</template>

<style scoped lang="scss">
/**
 * Custom styles for Button component
 * Extend Quasar QBtn with design system specific styles
 */

.button-icon-only {
  min-width: auto;
}

.shape-rounded {
  border-radius: $button-border-radius;
}

// Ghost appearance - subtle background with colored text
.button-ghost {
  &.button-ghost--primary {
    background-color: rgba(var(--color-primary-rgb), 0.12) !important;
    color: var(--color-primary) !important;

    &:hover {
      background-color: rgba(var(--color-primary-rgb), 0.18) !important;
    }
  }

  &.button-ghost--secondary {
    background-color: rgba(var(--color-secondary-rgb), 0.12) !important;
    color: var(--color-secondary) !important;

    &:hover {
      background-color: rgba(var(--color-secondary-rgb), 0.18) !important;
    }
  }

  &.button-ghost--positive {
    background-color: rgba(var(--color-positive-rgb), 0.12) !important;
    color: var(--color-positive) !important;

    &:hover {
      background-color: rgba(var(--color-positive-rgb), 0.18) !important;
    }
  }

  &.button-ghost--negative {
    background-color: rgba(var(--color-negative-rgb), 0.12) !important;
    color: var(--color-negative) !important;

    &:hover {
      background-color: rgba(var(--color-negative-rgb), 0.18) !important;
    }
  }

  &.button-ghost--warning {
    background-color: rgba(var(--color-warning-rgb), 0.12) !important;
    color: var(--color-warning) !important;

    &:hover {
      background-color: rgba(var(--color-warning-rgb), 0.18) !important;
    }
  }

  &.button-ghost--info {
    background-color: rgba(var(--color-info-rgb), 0.12) !important;
    color: var(--color-info) !important;

    &:hover {
      background-color: rgba(var(--color-info-rgb), 0.18) !important;
    }
  }

  &.button-ghost--regular {
    background-color: rgba(var(--color-foreground-rgb), 0.08) !important;
    color: var(--color-foreground) !important;

    &:hover {
      background-color: rgba(var(--color-foreground-rgb), 0.12) !important;
    }
  }
}

// Custom button size variants
// Override Quasar defaults with Layrix design system sizes
.button-size-sm {
  //padding: 5px 14px !important;
  //min-height: 32px;
  //font-size: 13px;
  //line-height: 1.5;

  &.button-icon-only {
    width: 32px;
    height: 32px;
    padding: 0 !important;
  }
}

.button-size-md {
  //padding: 7px 18px !important;
  //min-height: 36px;
  //font-size: 14px;
  //line-height: 1.6;

  &.button-icon-only {
    width: 36px;
    height: 36px;
    padding: 0 !important;
  }
}

.button-size-lg {
  //padding: 9px 24px !important;
  //min-height: 44px;
  //font-size: 15px;
  //line-height: 1.6;

  &.button-icon-only {
    width: 44px;
    height: 44px;
    padding: 0 !important;
  }
}
</style>
