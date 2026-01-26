<script setup lang="ts">
import { computed, ref } from 'vue';
import { QMenu, QCard, QCardSection, QAvatar } from 'quasar';
import { Avatar } from '../Avatar';
import type { AvatarGroupProps, AvatarGroupItem, AvatarGroupEmits } from './AvatarGroup.types';

/**
 * AvatarGroup Component
 * Displays overlapping avatars with hover effects and popovers
 *
 * @example
 * <AvatarGroup :items="users" :max="4" />
 *
 * @example
 * // With custom size and no popover
 * <AvatarGroup :items="users" size="lg" :show-popover="false" />
 */

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  size: 'md',
  max: 4,
  overlap: 12,
  hoverExpand: true,
  showPopover: true,
  direction: 'left',
});

const emit = defineEmits<AvatarGroupEmits>();

// Track which avatar is being hovered
const hoveredId = ref<string | number | null>(null);

// Visible avatars (limited by max)
const visibleItems = computed(() => {
  return props.items.slice(0, props.max);
});

// Overflow count
const overflowCount = computed(() => {
  return Math.max(0, props.items.length - props.max);
});

// Compute overlap style
const overlapStyle = computed(() => ({
  marginLeft: props.direction === 'left' ? `-${props.overlap}px` : '0',
  marginRight: props.direction === 'right' ? `-${props.overlap}px` : '0',
}));

// Popover avatar size (larger)
const popoverAvatarSize = computed(() => {
  const sizes: Record<typeof props.size, string> = {
    sm: '64px',
    md: '80px',
    lg: '96px',
  };
  return sizes[props.size];
});

// Check if popover should be shown for a specific item
function isPopoverOpen(itemId: string | number): boolean {
  return hoveredId.value === itemId;
}

function handleAvatarClick(item: AvatarGroupItem) {
  if (item.onClick) {
    item.onClick();
  }
  emit('avatar-click', item);
}

function handleOverflowClick() {
  emit('overflow-click');
}

function handleMouseEnter(id: string | number) {
  hoveredId.value = id;
}

function handleMouseLeave() {
  hoveredId.value = null;
}

// Get initials from title if no src
function getInitials(item: AvatarGroupItem): string {
  if (item.initials) return item.initials;
  return item.title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
</script>

<template>
  <div
    class="avatar-group"
    :class="[`avatar-group--${direction}`, `avatar-group--${size}`]"
  >
    <!-- Visible Avatars -->
    <div
      v-for="(item, index) in visibleItems"
      :key="item.id"
      class="avatar-group__item"
      :class="{
        'avatar-group__item--hovered': hoverExpand && hoveredId === item.id,
        'avatar-group__item--first': index === 0,
      }"
      :style="index > 0 ? overlapStyle : {}"
      @mouseenter="handleMouseEnter(item.id)"
      @mouseleave="handleMouseLeave"
      @click="handleAvatarClick(item)"
    >
      <Avatar
        v-if="item.src"
        :src="item.src"
        :alt="item.title"
        :size="size"
        clickable
        class="avatar-group__avatar"
      />
      <Avatar
        v-else
        :text="getInitials(item)"
        :alt="item.title"
        :size="size"
        clickable
        class="avatar-group__avatar"
      />

      <!-- Popover on hover -->
      <QMenu
        v-if="showPopover"
        :model-value="isPopoverOpen(item.id)"
        anchor="top middle"
        self="bottom middle"
        :offset="[0, 8]"
        transition-show="jump-up"
        transition-hide="jump-down"
        no-parent-event
        class="avatar-group__popover"
      >
        <QCard flat class="avatar-group__popover-card">
          <QCardSection class="avatar-group__popover-content">
            <QAvatar :size="popoverAvatarSize" class="avatar-group__popover-avatar">
              <img v-if="item.src" :src="item.src" :alt="item.title" />
              <template v-else>{{ getInitials(item) }}</template>
            </QAvatar>
            <div class="avatar-group__popover-info">
              <div class="avatar-group__popover-title">{{ item.title }}</div>
              <div v-if="item.caption" class="avatar-group__popover-caption">
                {{ item.caption }}
              </div>
            </div>
          </QCardSection>
        </QCard>
      </QMenu>
    </div>

    <!-- Overflow Indicator -->
    <div
      v-if="overflowCount > 0"
      class="avatar-group__item avatar-group__overflow"
      :style="overlapStyle"
      @click="handleOverflowClick"
    >
      <Avatar
        :text="`+${overflowCount}`"
        :size="size"
        variant="regular"
        clickable
        class="avatar-group__avatar avatar-group__avatar--overflow"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar-group {
  display: inline-flex;
  align-items: center;

  &--right {
    flex-direction: row-reverse;
  }

  &__item {
    position: relative;
    z-index: 1;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                z-index 0s 0.25s;

    &:hover {
      z-index: 10;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                  z-index 0s;
    }

    &--hovered {
      transform: translateY(-8px) scale(1.15);
      z-index: 10;
    }

    &--first {
      // First item has no overlap
    }
  }

  &__avatar {
    border: 2px solid var(--color-background);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &--overflow {
      background-color: var(--color-surface) !important;
      color: var(--color-foreground) !important;
      font-weight: 600;
      font-size: 12px;
    }
  }

  &__overflow {
    cursor: pointer;
  }

  &__popover {
    // Remove default menu shadow, use card shadow
    box-shadow: none !important;
    background: transparent !important;
  }

  &__popover-card {
    min-width: 200px;
    max-width: 280px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    background: var(--color-background);
  }

  &__popover-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    gap: 12px;
  }

  &__popover-avatar {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__popover-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__popover-title {
    font-weight: 600;
    font-size: 16px;
    color: var(--color-foreground);
  }

  &__popover-caption {
    font-size: 14px;
    color: var(--color-foreground-muted);
  }
}
</style>
