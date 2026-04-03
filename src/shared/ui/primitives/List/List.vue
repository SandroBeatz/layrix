<script setup lang="ts">
import { QList } from 'quasar';
import type { ListProps } from './List.types';

/**
 * List Component
 * Opinionated wrapper around Quasar QList
 *
 * @example
 * // Basic list with separators
 * <List separator>
 *   <ListItem label="Item 1" />
 *   <ListItem label="Item 2" />
 * </List>
 *
 * @example
 * // Bordered list
 * <List bordered>
 *   <ListItem label="Item" caption="Description" />
 * </List>
 *
 * @example
 * // Dense compact list
 * <List dense separator>
 *   <ListItem label="Item 1" />
 *   <ListItem label="Item 2" />
 * </List>
 */

const props = withDefaults(defineProps<ListProps>(), {
  bordered: false,
  separator: false,
  dense: false,
  padding: false,
  tag: 'div',
});
</script>

<template>
  <QList
    v-bind="props"
    class="list"
  >
    <slot />
  </QList>
</template>

<style scoped lang="scss">
.list {
  background: transparent;
  color: var(--color-foreground);

  // Override Quasar's default border color with our design system border
  :deep(.q-separator) {
    background-color: var(--color-border);
    opacity: 1;
  }

  // When bordered, use our design system border color
  &.q-list--bordered {
    border-color: var(--color-border);
    border-radius: var(--border-radius);
  }
}
</style>
