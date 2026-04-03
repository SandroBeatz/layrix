<script setup lang="ts">
import { computed } from 'vue';
import { QBreadcrumbs, QBreadcrumbsEl } from 'quasar';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

/**
 * Breadcrumbs Component
 * Opinionated wrapper around Quasar QBreadcrumbs
 *
 * @example
 * // Regular variant breadcrumbs
 * <Breadcrumbs :items="[
 *   { label: 'Home', to: '/' },
 *   { label: 'Products', to: '/products' },
 *   { label: 'Details' }
 * ]" />
 *
 * @example
 * // Primary variant breadcrumbs
 * <Breadcrumbs
 *   variant="primary"
 *   :items="[
 *     { label: 'Dashboard', to: '/dashboard' },
 *     { label: 'Users', to: '/users' },
 *     { label: 'Profile' }
 *   ]"
 * />
 *
 * @example
 * // Breadcrumbs with custom separator
 * <Breadcrumbs
 *   separator=">"
 *   :items="breadcrumbItems"
 * />
 *
 * @example
 * // Breadcrumbs with icon separator
 * <Breadcrumbs
 *   separator="ti-chevron-right"
 *   separator-icon
 *   :items="breadcrumbItems"
 * />
 */

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  variant: 'regular',
  separator: '/',
  gutter: 'sm',
  align: 'left',
});

// Non-active items should use default text color (foreground)
// Only on hover should they change to primary
const qColor = computed(() => {
  return 'foreground';
});

// Active item should use text-muted color
const qActiveColor = computed(() => {
  return props.activeColor || 'text-muted';
});

// Apply variant class for additional styling
const variantClass = computed(() => {
  return `breadcrumbs-variant--${props.variant}`;
});
</script>

<template>
  <QBreadcrumbs
    :active-color="qActiveColor"
    :gutter="gutter"
    :align="align"
    :class="variantClass"
  >
    <template #separator>
      <span>{{ separator }}</span>
    </template>

    <QBreadcrumbsEl
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :icon="item.icon"
      :to="item.to"
      :href="item.href"
      :target="item.target"
      :disable="item.disable"
      :tag="item.tag"
      :exact="item.exact"
      :exact-active-class="item.exactActiveClass"
      :class="item.class"
      :style="item.style"
      :replace="item.replace"
      :append="item.append"
      :color="qColor"
    />
  </QBreadcrumbs>
</template>

<style scoped lang="scss">
/**
 * Custom styles for Breadcrumbs component
 * Extend Quasar QBreadcrumbs with design system specific styles
 */

// Add hover effects for non-active breadcrumb links
:deep(.q-breadcrumbs__el) {
  // All breadcrumb elements should be in foreground color by default
  color: var(--color-foreground);

  // Non-active links (all except last) should have hover effect
  &:not(.q-breadcrumbs__el--disable):not(:last-child) {
    cursor: pointer;
    transition: color 0.2s ease, text-decoration 0.2s ease;

    &:hover {
      color: var(--color-primary) !important;
      text-decoration: underline;
    }
  }

  // Last item (active) should be text-muted
  &:last-child {
    color: var(--color-text-muted) !important;
  }
}

// Ensure separator icons render properly
:deep(.q-breadcrumbs__separator) {
  color: var(--color-foreground);
}

// Variant-specific styling
.breadcrumbs-variant--primary {
  // Links use foreground color by default, primary on hover
  // Active items use text-muted
}

.breadcrumbs-variant--regular {
  // Links use foreground color by default, primary on hover
  // Active items use text-muted
}
</style>
