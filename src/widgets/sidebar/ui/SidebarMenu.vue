<script setup lang="ts">
import { provide } from 'vue';
import { useSidebar } from '../model/useSidebar';
import SidebarMenuItemRecursive from './SidebarMenuItemRecursive.vue';
import SidebarMenuLogoItem from './SidebarMenuLogoItem.vue';
import { useSidebarStore } from '@entities/sidebar';
import { storeToRefs } from 'pinia';

const { menuGroups, isExpandedItem } = useSidebar();

const sidebarStore = useSidebarStore();
const { isMini } = storeToRefs(sidebarStore);

provide('isMini', isMini);
provide('isExpandedItem', isExpandedItem);
</script>

<template>
  <q-list class="sidebar-menu">
    <SidebarMenuLogoItem />

    <template v-for="(group, groupIndex) in menuGroups" :key="groupIndex">
      <!-- Group Title -->
      <q-item-label v-if="group.title" header class="sidebar-header">
        {{ group.title }}
      </q-item-label>

      <!-- Menu Items - using recursive component -->
      <SidebarMenuItemRecursive
        v-for="(item, itemIndex) in group.items"
        :key="itemIndex"
        :item="item"
        :depth="0"
      />
    </template>
  </q-list>
</template>

<style scoped lang="scss">
.sidebar-menu {
  padding: 0 10px;
}

:global(.sidebar-menu .sidebar-item) {
  border-radius: var(--border-radius);
  position: relative;
  min-width: 44px;
  min-height: 44px;
}

:global(.sidebar-menu .sidebar-item .q-item__section--avatar) {
  min-width: 40px;
}

:global(.sidebar-menu .sidebar-item_collapse ~ div) {
  padding-left: 30px;
}

:global(.sidebar-menu .sidebar-item_collapse ~ div .sidebar-item) {
  padding: 2px 12px;
  min-height: 42px;
}

:global(.sidebar-menu .sidebar-item_collapse ~ div .sidebar-item:before) {
  content: '';
  height: 6px;
  width: 6px;
  border: 2px solid var(--color-foreground);
  border-radius: 6px;
  align-self: center;
  margin-right: 12px;
}
</style>
