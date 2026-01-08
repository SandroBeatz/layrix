<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSidebarStore } from '@entities/sidebar';
import type { SidebarMenuItem as SidebarMenuItemType } from '../model/types';

interface Props {
  item: SidebarMenuItemType;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

const sidebarStore = useSidebarStore();
const { isMini } = storeToRefs(sidebarStore);

const expanded = ref(false);
const menuOpen = ref(false);
let hoverTimer: ReturnType<typeof setTimeout> | null = null;

const isLeafItem = computed(() => !props.item.submenu || props.item.submenu.length === 0);
const isTopLevel = computed(() => props.depth === 0);
const isSubmenuItem = computed(() => props.depth > 0);

const paddingLeft = computed(() => {
  if (props.depth === 0) return '16px';
  return `${56 + (props.depth - 1) * 24}px`;
});

const handleClick = () => {
  if (props.item.action) {
    props.item.action();
  }
};

const handleMouseEnter = () => {
  if (!isMini.value) return;
  hoverTimer = setTimeout(() => {
    menuOpen.value = true;
  }, 200);
};

const handleMouseLeave = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
  menuOpen.value = false;
};
</script>

<template>
  <!-- CASE 1: Leaf item (no submenu) -->
  <q-item
    v-if="isLeafItem"
    clickable
    v-ripple
    :to="item.to"
    :href="item.external ? item.externalLink : undefined"
    :target="item.external ? '_blank' : undefined"
    :disable="item.disable"
    :class="['sidebar-item', `sidebar-item--depth-${depth}`, { 'sidebar-item--submenu': isSubmenuItem }]"
    :style="{ paddingLeft }"
    @click="handleClick"
  >
    <q-item-section v-if="item.icon && isTopLevel" avatar class="sidebar-item__avatar">
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section class="relative-position">
      <div v-if="isSubmenuItem" class="submenu-indicator" :class="`submenu-indicator--depth-${depth}`"></div>
      {{ item.label }}
    </q-item-section>

    <q-item-section v-if="item.caption" side>
      <q-item-label caption>{{ item.caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <!-- CASE 2: Submenu in mini mode - use q-menu dropdown -->
  <div v-else-if="isMini" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <q-item clickable :class="['sidebar-item', `sidebar-item--depth-${depth}`]">
      <q-item-section v-if="item.icon && isTopLevel" avatar class="sidebar-item__avatar">
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>

      <q-item-section v-if="!isTopLevel" side>
        <q-icon name="chevron_right" size="xs" />
      </q-item-section>

      <!-- Nested dropdown menu -->
      <q-menu
        v-model="menuOpen"
        anchor="top end"
        self="top start"
        :offset="[4, 0]"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-list style="min-width: 200px">
          <SidebarMenuItemRecursive
            v-for="(subitem, index) in item.submenu"
            :key="index"
            :item="subitem"
            :depth="depth + 1"
          />
        </q-list>
      </q-menu>
    </q-item>
  </div>

  <!-- CASE 3: Submenu in normal mode - use q-expansion-item -->
  <q-expansion-item
    v-else
    v-model="expanded"
    :icon="item.icon"
    :label="item.label"
    :caption="item.caption"
    :disable="item.disable"
    :class="['sidebar-item-collapse', `sidebar-item--depth-${depth}`]"
  >
    <q-list>
      <SidebarMenuItemRecursive
        v-for="(subitem, index) in item.submenu"
        :key="index"
        :item="subitem"
        :depth="depth + 1"
      />
    </q-list>
  </q-expansion-item>
</template>

<style scoped lang="scss">
.sidebar-item {
  &__avatar {
    min-width: 40px;
  }

  // Custom styling for submenu items (depth > 0)
  &--submenu {
    // Remove background on hover
    &:hover {
      background-color: transparent !important;

      .q-item__label,
      .q-item__section {
        color: var(--color-primary) !important;
      }
    }

    // Remove background on active
    &.q-router-link--active,
    &.q-item--active {
      background-color: transparent !important;

      .q-item__label,
      .q-item__section {
        color: var(--color-primary) !important;
      }
    }

    // Remove Quasar's focus-helper background
    &:before {
      background: transparent !important;
    }

    .submenu-indicator {
      position: absolute;
      left: -26px;
      top: 50%;
      transform: translateY(-50%);
      height: 7px;
      width: 7px;
      border: 1px solid var(--color-muted-foreground);
      border-radius: 6px;

      &--depth-2 {
        left: -20px;
        height: 5px;
        width: 5px;
      }

      &--depth-3 {
        left: -16px;
        height: 4px;
        width: 4px;
      }
    }
  }
}

:global(.sidebar-item-collapse .q-item__section--avatar) {
  min-width: 40px;
}
</style>
