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
  separatorIcon: false,
  gutter: 'sm',
  align: 'left',
});

// Map variant to text color for non-active items
const qColor = computed(() => {
  const colorMap: Record<typeof props.variant, string> = {
    primary: 'primary',
    regular: 'foreground',
  };
  return colorMap[props.variant];
});

// Active item should always use muted-foreground for both variants
const qActiveColor = computed(() => {
  return props.activeColor || 'muted-foreground';
});

// Separator - use icon name if separator-icon is true
const qSeparator = computed(() => {
  return props.separator;
});

// Apply variant class for additional styling
const variantClass = computed(() => {
  return `breadcrumbs-variant--${props.variant}`;
});
</script>

<template>
  <QBreadcrumbs
    :separator="qSeparator"
    :separator-icon="separatorIcon"
    :active-color="qActiveColor"
    :gutter="gutter"
    :align="align"
    :class="variantClass"
  >
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
  // Non-active links should have hover effect
  &:not(.q-breadcrumbs__el--disable):not(:last-child) {
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary) !important;
      text-decoration: underline;
    }
  }
}

// Variant-specific styling
.breadcrumbs-variant--primary {
  // Links use primary color (set via color prop)
  // Active items use muted-foreground (set via active-color prop)
}

.breadcrumbs-variant--regular {
  // Links use foreground color (set via color prop)
  // Active items use muted-foreground (set via active-color prop)
}
</style>
