<script setup lang="ts">
import { computed } from 'vue';
import { QBadge } from 'quasar';
import type { BadgeProps } from './Badge.types';

/**
 * Badge Component
 * Opinionated wrapper around Quasar QBadge
 *
 * @example
 * // Primary filled badge
 * <Badge label="New" />
 *
 * @example
 * // Outlined secondary badge
 * <Badge variant="secondary" appearance="outline" label="Draft" />
 *
 * @example
 * // Dot indicator
 * <Badge variant="positive" dot />
 *
 * @example
 * // Badge with number
 * <Badge variant="negative" :label="5" />
 *
 * @example
 * // Pill badge
 * <Badge variant="primary" label="Active" pill />
 */

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  appearance: 'fill',
  dot: false,
  pill: false,
  floating: false,
  transparent: false,
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
    outline: props.appearance === 'outline',
    transparent: props.appearance === 'ghost' || props.transparent,
  };
});

// Add ghost class for custom styling
const ghostClass = computed(() => {
  if (props.appearance !== 'ghost') return '';
  return `badge-ghost badge-ghost--${props.variant}`;
});

const qTextColor = computed(() => {
  if (props.variant === 'regular' && props.appearance === 'fill') return 'background';
  return '';
});

// Compute label (empty for dot mode)
const computedLabel = computed(() => {
  if (props.dot) return '';
  return props.label;
});
</script>

<template>
  <QBadge
    :color="qColor"
    :outline="qAppearance.outline"
    :transparent="qAppearance.transparent"
    :floating="floating"
    :rounded="!pill"
    :label="computedLabel"
    :class="[
      {
        'badge-dot': dot,
        'badge-pill': !pill,
      },
      ghostClass,
    ]"
    :text-color="qTextColor"
  >
    <!-- Default slot for custom content (when no label or dot) -->
    <slot v-if="!dot && !label" />
  </QBadge>
</template>

<style scoped lang="scss">
/**
 * Custom styles for Badge component
 * Extend Quasar QBadge with design system specific styles
 */

// Ghost appearance - subtle background with colored text
.badge-ghost {
  &.badge-ghost--primary {
    background-color: rgba(var(--color-primary-rgb), 0.12) !important;
    color: var(--color-primary) !important;
  }

  &.badge-ghost--secondary {
    background-color: rgba(var(--color-secondary-rgb), 0.12) !important;
    color: var(--color-secondary) !important;
  }

  &.badge-ghost--positive {
    background-color: rgba(var(--color-positive-rgb), 0.12) !important;
    color: var(--color-positive) !important;
  }

  &.badge-ghost--negative {
    background-color: rgba(var(--color-negative-rgb), 0.12) !important;
    color: var(--color-negative) !important;
  }

  &.badge-ghost--warning {
    background-color: rgba(var(--color-warning-rgb), 0.12) !important;
    color: var(--color-warning) !important;
  }

  &.badge-ghost--info {
    background-color: rgba(var(--color-info-rgb), 0.12) !important;
    color: var(--color-info) !important;
  }

  &.badge-ghost--regular {
    background-color: rgba(var(--color-foreground-rgb), 0.08) !important;
    color: var(--color-foreground) !important;
  }
}

// Dot indicator - small circular badge
.badge-dot {
  width: 8px !important;
  height: 8px !important;
  min-width: 8px !important;
  min-height: 8px !important;
  padding: 0 !important;
}

// Pill shape - fully rounded
.badge-pill {
  border-radius: 6px !important;
}
</style>
