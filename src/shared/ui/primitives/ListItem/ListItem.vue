<script setup lang="ts">
import { computed } from 'vue';
import { QItem, QItemSection, QItemLabel } from 'quasar';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem Component
 * Opinionated wrapper around Quasar QItem, QItemSection and QItemLabel
 *
 * @example
 * // Simple text item
 * <ListItem label="Settings" caption="Manage your preferences" />
 *
 * @example
 * // Clickable item with left icon and right side label
 * <ListItem label="Profile" side-label="Edit" clickable>
 *   <template #prepend>
 *     <Avatar text="JD" variant="primary" size="sm" />
 *   </template>
 * </ListItem>
 *
 * @example
 * // Active item with variant color
 * <ListItem label="Dashboard" :active="true" variant="primary" clickable />
 *
 * @example
 * // Item with append slot for custom right content
 * <ListItem label="Messages" clickable>
 *   <template #append>
 *     <Badge label="5" variant="negative" />
 *   </template>
 * </ListItem>
 */

const props = withDefaults(defineProps<ListItemProps>(), {
  variant: 'primary',
  clickable: false,
  active: false,
  disabled: false,
  dense: false,
  insetLevel: 0,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

// Map variant to the Quasar active-class color
const activeClass = computed(() => `text-${props.variant}`);

// Whether to render a prepend section (avatar/icon slot)
const hasPrepend = computed(() => !!slots.prepend);
// Whether to render an append section (badge/action slot)
const hasAppend = computed(() => !!slots.append);
// Whether to render side label column
const hasSide = computed(() => !!(props.sideLabel ?? props.sideCaption ?? slots.side));

const slots = defineSlots<{
  /** Left section – avatar, icon, thumbnail */
  prepend?(): unknown;
  /** Right section – badge, timestamp, action icon */
  append?(): unknown;
  /** Named alias for append (for readability) */
  side?(): unknown;
  /** Custom caption content (overrides caption prop) */
  caption?(): unknown;
  /** Fully replaces the content area */
  default?(): unknown;
  /** Direct child of QItem — use for nested QMenu submenu support */
  menu?(): unknown;
}>();

function handleClick(event: Event) {
  emit('click', event);
}
</script>

<template>
  <QItem
    :clickable="clickable || !!to || !!href"
    :active="active"
    :active-class="activeClass"
    :disable="disabled"
    :dense="dense"
    :to="to"
    :href="href"
    :inset-level="insetLevel > 0 ? insetLevel : undefined"
    class="list-item"
    :class="[`list-item--${variant}`, { 'list-item--active': active }]"
    v-ripple="clickable || !!to || !!href"
    @click="handleClick"
  >
    <!-- Left / prepend section (avatar, icon, etc.) -->
    <QItemSection v-if="hasPrepend" avatar>
      <slot name="prepend" />
    </QItemSection>

    <!-- Main content section -->
    <QItemSection>
      <!-- Custom default slot overrides all text props -->
      <slot v-if="$slots.default" />

      <template v-else>
        <QItemLabel v-if="overline" overline>{{ overline }}</QItemLabel>
        <QItemLabel v-if="label" :lines="labelLines">{{ label }}</QItemLabel>
        <!-- caption slot overrides caption prop -->
        <QItemLabel v-if="$slots.caption || caption" caption :lines="captionLines">
          <slot name="caption">{{ caption }}</slot>
        </QItemLabel>
      </template>
    </QItemSection>

    <!-- Right / side section (timestamp, side label, etc.) -->
    <QItemSection v-if="hasSide" side top>
      <slot name="side">
        <QItemLabel v-if="sideLabel" caption class="list-item__side-label">
          {{ sideLabel }}
        </QItemLabel>
        <QItemLabel v-if="sideCaption" caption class="list-item__side-caption">
          {{ sideCaption }}
        </QItemLabel>
      </slot>
    </QItemSection>

    <!-- Right / append section (badge, action button, etc.) -->
    <QItemSection v-if="hasAppend" side>
      <slot name="append" />
    </QItemSection>

    <!-- Menu slot — direct child of QItem, used for nested QMenu submenu support -->
    <slot name="menu" />
  </QItem>
</template>

<style scoped lang="scss">
.list-item {
  color: var(--color-foreground);
  border-radius: calc(var(--border-radius) - 2px);
  transition: background-color 0.2s ease;

  // Ripple / hover state – use a subtle tinted background per variant
  &--primary {
    --_active-bg: rgba(var(--color-primary-rgb), 0.08);
    --_active-color: var(--color-primary);
  }
  &--secondary {
    --_active-bg: rgba(var(--color-secondary-rgb), 0.08);
    --_active-color: var(--color-secondary);
  }
  &--positive {
    --_active-bg: rgba(var(--color-positive-rgb), 0.08);
    --_active-color: var(--color-positive);
  }
  &--negative {
    --_active-bg: rgba(var(--color-negative-rgb), 0.08);
    --_active-color: var(--color-negative);
  }
  &--warning {
    --_active-bg: rgba(var(--color-warning-rgb), 0.08);
    --_active-color: var(--color-warning);
  }
  &--info {
    --_active-bg: rgba(var(--color-info-rgb), 0.08);
    --_active-color: var(--color-info);
  }

  &--active {
    background-color: var(--_active-bg) !important;

    :deep(.q-item__label) {
      color: var(--_active-color);
    }
  }

  // Caption and overline text colors
  :deep(.q-item__label--caption) {
    color: var(--color-text-muted);
  }

  :deep(.q-item__label--overline) {
    color: var(--color-text-muted);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  // Side label inherits muted color
  &__side-label {
    color: var(--color-text-muted) !important;
    font-size: 0.75rem;
  }

  &__side-caption {
    color: var(--color-text-muted) !important;
    font-size: 0.7rem;
    margin-top: 2px;
  }
}
</style>
