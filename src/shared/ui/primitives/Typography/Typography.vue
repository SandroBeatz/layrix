<script setup lang="ts">
import { computed } from 'vue';
import type { TypographyProps } from './Typography.types';

/**
 * Typography Component
 * Semantic text elements with consistent styling based on Material Design
 *
 * @example
 * // Heading
 * <Typography variant="h1">Page Title</Typography>
 *
 * @example
 * // Muted text
 * <Typography variant="body2" color="muted">Secondary information</Typography>
 *
 * @example
 * // Custom color
 * <Typography variant="subtitle1" color="primary">Highlighted text</Typography>
 */

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: 'body1',
  color: 'default',
  bold: false,
  italic: false,
  truncate: false,
});

// Map variant to semantic HTML tag
const componentTag = computed(() => {
  if (props.tag) return props.tag;
  
  const tagMap: Record<typeof props.variant, string> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'div',
    subtitle2: 'div',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
  };
  return tagMap[props.variant];
});

// Generate classes for typography
const typographyClasses = computed(() => {
  const classes: string[] = [];
  
  // Add variant class (Quasar style)
  classes.push(`text-${props.variant}`);
  
  // Add color class
  if (props.color === 'default') {
    classes.push('text-color-default');
  } else if (props.color === 'muted') {
    classes.push('text-color-muted');
  } else {
    // Use Quasar color classes for semantic colors
    classes.push(`text-${props.color}`);
  }
  
  // Add weight and style modifiers
  if (props.bold) classes.push('text-weight-bold');
  if (props.italic) classes.push('text-italic');
  if (props.truncate) classes.push('ellipsis');
  
  return classes;
});
</script>

<template>
  <component :is="componentTag" :class="typographyClasses">
    <slot />
  </component>
</template>

<style scoped lang="scss">
/**
 * Typography Component Styles
 * Remove default margins and apply design system colors
 */

// Remove all margins from typography elements
h1, h2, h3, h4, h5, h6, p, span, div {
  margin: 0;
}

// Default text color
.text-color-default {
  color: var(--color-text);
}

// Muted text color
.text-color-muted {
  color: var(--color-text-muted);
}
</style>
