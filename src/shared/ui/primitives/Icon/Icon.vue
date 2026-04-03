<script setup lang="ts">
import { QIcon } from 'quasar';
import type { IconProps } from './Icon.types';

/**
 * Icon Component
 * Opinionated wrapper around Quasar QIcon
 *
 * All icons MUST come from 'quasar-extras-svg-icons/tabler-icons-v2'.
 * Never import QIcon directly outside of shared/ui/primitives/.
 *
 * @example
 * // Basic usage with Tabler icon
 * import { tabHome } from 'quasar-extras-svg-icons/tabler-icons-v2'
 * <Icon :name="tabHome" />
 *
 * @example
 * // With size and color
 * <Icon :name="tabSearch" size="24px" color="primary" />
 *
 * @example
 * // Inline with text (left margin gutter)
 * <Icon :name="tabCheck" right /> Saved
 *
 * @example
 * // Inline with text (right margin gutter)
 * Click <Icon :name="tabChevronRight" left /> to continue
 */

defineProps<IconProps>();
</script>

<template>
  <QIcon :name="name" :size="size" :color="color" :left="left" :right="right" :tag="tag" />
</template>
