<script setup lang="ts">
import { computed } from 'vue';
import { QAvatar } from 'quasar';
import type { AvatarProps } from './Avatar.types';

/**
 * Avatar Component
 * Opinionated wrapper around Quasar QAvatar
 *
 * @example
 * // Avatar with image
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 *
 * @example
 * // Avatar with initials
 * <Avatar text="JD" variant="primary" />
 *
 * @example
 * // Avatar with icon
 * <Avatar icon="person" variant="secondary" />
 */

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  shape: 'round',
  variant: 'primary',
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Map size to pixel values
const sizeMap: Record<typeof props.size, string> = {
  sm: '32px',
  md: '40px',
  lg: '56px',
};

// Map size to font size
const fontSizeMap: Record<typeof props.size, string> = {
  sm: '14px',
  md: '16px',
  lg: '22px',
};

const qSize = computed(() => sizeMap[props.size]);
const qFontSize = computed(() => props.fontSize ?? fontSizeMap[props.size]);

// Map variant to Quasar color
const qColor = computed(() => {
  const colorMap: Record<typeof props.variant, string> = {
    primary: 'primary',
    secondary: 'secondary',
    positive: 'positive',
    negative: 'negative',
    warning: 'warning',
    info: 'info',
    regular: 'grey-5',
  };
  return colorMap[props.variant];
});

// Map shape to Quasar props
const shapeProps = computed(() => ({
  square: props.shape === 'square',
  rounded: props.shape === 'rounded',
}));

// Text color based on background
const textColor = computed(() => {
  if (props.src) return undefined;
  return 'white';
});

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event);
  }
}
</script>

<template>
  <QAvatar
    :size="qSize"
    :font-size="qFontSize"
    :color="src ? undefined : qColor"
    :text-color="textColor"
    :square="shapeProps.square"
    :rounded="shapeProps.rounded"
    :icon="!src && !text ? icon : undefined"
    :class="[
      'avatar',
      `avatar--${size}`,
      `avatar--${shape}`,
      { 'avatar--clickable': clickable },
    ]"
    @click="handleClick"
  >
    <img v-if="src" :src="src" :alt="alt" class="avatar__image" />
    <template v-else-if="text">{{ text }}</template>
    <slot />
  </QAvatar>
</template>

<style scoped lang="scss">
.avatar {
  font-weight: 500;
  user-select: none;

  &--clickable {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // Rounded shape override
  &--rounded {
    border-radius: 8px !important;
  }
}
</style>
