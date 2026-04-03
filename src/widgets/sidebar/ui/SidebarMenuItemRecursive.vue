<script setup lang="ts">
import { computed } from 'vue';
import type { SidebarMenuItem as SidebarMenuItemType } from '../model/types';
import SidebarMenuItem from '@widgets/sidebar/ui/SidebarMenuItem.vue';
import SidebarMenuItemCollapse from '@widgets/sidebar/ui/SidebarMenuItemCollapse.vue';

interface Props {
  item: SidebarMenuItemType;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

const isLeafItem = computed(() => !props.item.submenu || props.item.submenu.length === 0);
</script>

<template>
  <!-- CASE 1: Leaf item (no submenu) -->
  <SidebarMenuItem v-if="isLeafItem" :item="item" />

  <!-- CASE 2: Submenu in mini mode - use q-menu dropdown -->

  <!--
  <div v-else-if="isMini" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <q-item clickable :class="['sidebar-item', `sidebar-item--depth-${depth}`]">
      <q-item-section v-if="item.icon && isTopLevel" avatar class="sidebar-item__avatar">
        <Icon :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>

      <q-item-section v-if="!isTopLevel" side>
        <Icon :name="tabChevronRight" size="xs" />
      </q-item-section>

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
  -->

  <!-- CASE 3: Submenu in normal mode - use q-expansion-item -->
  <SidebarMenuItemCollapse v-else :item="item" />
</template>

<style scoped lang="scss">
//.sidebar-item {
//  &__avatar {
//    min-width: 40px;
//  }
//
//  // Custom styling for submenu items (depth > 0)
//  &--submenu {
//    // Remove background on hover
//    &:hover {
//      background-color: transparent !important;
//
//      .q-item__label,
//      .q-item__section {
//        color: var(--color-primary) !important;
//      }
//    }
//
//    // Remove background on active
//    &.q-router-link--active,
//    &.q-item--active {
//      background-color: transparent !important;
//
//      .q-item__label,
//      .q-item__section {
//        color: var(--color-primary) !important;
//      }
//    }
//
//    // Remove Quasar's focus-helper background
//    &:before {
//      background: transparent !important;
//    }
//
//    .submenu-indicator {
//      position: absolute;
//      left: -26px;
//      top: 50%;
//      transform: translateY(-50%);
//      height: 7px;
//      width: 7px;
//      border: 1px solid var(--color-muted-foreground);
//      border-radius: 6px;
//
//      &--depth-2 {
//        left: -20px;
//        height: 5px;
//        width: 5px;
//      }
//
//      &--depth-3 {
//        left: -16px;
//        height: 4px;
//        width: 4px;
//      }
//    }
//  }
//}
//
//:global(.sidebar-item-collapse .q-item__section--avatar) {
//  min-width: 40px;
//}
</style>
