<script setup lang="ts">
import type { TypographyProps } from './Typography.types';
import { computed } from 'vue';

const props = withDefaults(defineProps<TypographyProps>(), {
  as: 'p',
  variant: 'body',
  content: '',
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'h1':
      return 'text-h1 typography-h1';
    case 'h2':
      return 'text-h2 typography-h2';
    case 'h3':
      return 'text-h3 typography-h3';
    case 'h4':
      return 'text-h4 typography-h4';
    case 'h5':
      return 'text-h5 typography-h5';
    case 'h6':
      return 'text-h6 typography-h6';
    case 'subtitle':
      return 'text-subtitle1 typography-subtitle';
    case 'body':
      return 'text-body1 typography-body';
    case 'caption':
      return 'text-caption typography-caption';
    case 'overline':
      return 'text-overline typography-overline';
    case 'blockquote':
      return 'typography-blockquote';
    default:
      return '';
  }
});
</script>

<template>
  <component :is="as" :class="[variantClass, $attrs.class]" v-bind="$attrs">
    <template v-if="!$slots['default']">{{ content }}</template>
    <slot />
  </component>
</template>

<style scoped lang="scss">
@import './_Typography.style.scss';
</style>
