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
    tertiary: 'accent',
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
    background-color: rgba(var(--color-primary-rgb), 0.12) !important; // primary with 12% opacity
    color: var(--color-primary) !important;

    &:hover {
      background-color: rgba(var(--color-primary-rgb), 0.18) !important; // darker on hover
    }
  }

  &.button-ghost--secondary {
    background-color: rgba(
      var(--color-secondary-rgb),
      0.12
    ) !important; // secondary with 12% opacity
    color: var(--color-secondary) !important;

    &:hover {
      background-color: rgba(var(--color-secondary-rgb), 0.18) !important;
    }
  }

  &.button-ghost--tertiary {
    background-color: rgba(156, 39, 176, 0.12) !important; // accent with 12% opacity
    color: var(--q-accent) !important;

    &:hover {
      background-color: rgba(156, 39, 176, 0.18) !important;
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
