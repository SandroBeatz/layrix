<script setup lang="ts">
import { useSidebar } from '../model/useSidebar';
import SidebarMenuItemRecursive from './SidebarMenuItemRecursive.vue';
import SidebarMenuLogoItem from './SidebarMenuLogoItem.vue';

const { menuGroups } = useSidebar();
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
}

.sidebar-header {
  color: var(--color-muted-foreground);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}
</style>
