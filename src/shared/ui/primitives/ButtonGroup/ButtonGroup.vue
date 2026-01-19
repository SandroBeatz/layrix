<script setup lang="ts">
import { computed } from 'vue';
import { QBtnGroup } from 'quasar';
import type { ButtonGroupProps } from './ButtonGroup.types';

/**
 * ButtonGroup Component
 * Opinionated wrapper around Quasar QBtnGroup
 *
 * @example
 * // Basic horizontal button group
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Middle</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 *
 * @example
 * // Vertical button group
 * <ButtonGroup orientation="vertical">
 *   <Button>Top</Button>
 *   <Button>Middle</Button>
 *   <Button>Bottom</Button>
 * </ButtonGroup>
 *
 * @example
 * // Spread buttons to fill container
 * <ButtonGroup spread>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 */

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  spread: false,
  stretch: false,
  outline: false,
  flat: true,
  rounded: true,
});

// Map orientation to Quasar props
const isVertical = computed(() => props.orientation === 'vertical');

// Build custom classes
const groupClasses = computed(() => {
  return {
    'button-group-rounded': props.rounded,
  };
});
</script>

<template>
  <QBtnGroup
    :spread="spread"
    :stretch="stretch"
    :outline="outline"
    :flat="flat"
    :class="groupClasses"
    :vertical="isVertical"
  >
    <!-- Default slot for buttons -->
    <slot />
  </QBtnGroup>
</template>

<style scoped lang="scss">
/**
 * Custom styles for ButtonGroup component
 * Extend Quasar QBtnGroup with design system specific styles
 */

.button-group-rounded {
  border-radius: $button-border-radius;

  // Ensure first and last buttons maintain rounded corners
  :deep(.q-btn:first-child) {
    border-top-left-radius: $button-border-radius;
    border-bottom-left-radius: $button-border-radius;
  }

  :deep(.q-btn:last-child) {
    border-top-right-radius: $button-border-radius;
    border-bottom-right-radius: $button-border-radius;
  }

  // For vertical orientation
  &.q-btn-group--vertical {
    :deep(.q-btn:first-child) {
      border-top-left-radius: $button-border-radius;
      border-top-right-radius: $button-border-radius;
      border-bottom-left-radius: 0;
    }

    :deep(.q-btn:last-child) {
      border-bottom-left-radius: $button-border-radius;
      border-bottom-right-radius: $button-border-radius;
      border-top-right-radius: 0;
    }
  }
}
</style>
