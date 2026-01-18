<script setup lang="ts">
import type { TypographyProps } from './Typography.types';
import { computed } from 'vue';

const props = withDefaults(defineProps<TypographyProps>(), {
  as: 'p',
  variant: 'body',
  content: '',
});

const variantClass = computed(() => {
  const isMuted = props.variant?.endsWith('-muted');
  const baseVariant = isMuted ? props.variant?.replace('-muted', '') : props.variant;

  let classes = '';
  switch (baseVariant) {
    case 'h1':
      classes = 'text-h1 typography-h1';
      break;
    case 'h2':
      classes = 'text-h2 typography-h2';
      break;
    case 'h3':
      classes = 'text-h3 typography-h3';
      break;
    case 'h4':
      classes = 'text-h4 typography-h4';
      break;
    case 'h5':
      classes = 'text-h5 typography-h5';
      break;
    case 'h6':
      classes = 'text-h6 typography-h6';
      break;
    case 'subtitle':
      classes = 'text-subtitle1 typography-subtitle';
      break;
    case 'body':
      classes = 'text-body1 typography-body';
      break;
    case 'caption':
      classes = 'text-caption typography-caption';
      break;
    case 'overline':
      classes = 'text-overline typography-overline';
      break;
    case 'blockquote':
      classes = 'typography-blockquote';
      break;
    default:
      classes = '';
  }

  if (isMuted) {
    classes += ' typography-muted';
  }

  return classes;
});

const colorClass = computed(() => {
  if (props.color) {
    return `text-${props.color}`;
  }
  return '';
});

const weightClass = computed(() => {
  if (props.weight) {
    return `text-weight-${props.weight}`;
  }
  return '';
});

const alignClass = computed(() => {
  if (props.align) {
    return `text-${props.align}`;
  }
  return '';
});
</script>

<template>
  <component
    :is="as"
    :class="[variantClass, colorClass, weightClass, alignClass, className]"
    v-bind="$attrs"
  >
    <template v-if="!$slots['default']">{{ content }}</template>
    <slot />
  </component>
</template>

<style scoped lang="scss">
@import './_Typography.style.scss';
</style>
