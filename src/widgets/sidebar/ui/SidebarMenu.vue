<script setup lang="ts">
import { useSidebar } from '../model/useSidebar';
import SidebarMenuItem from './SidebarMenuItem.vue';
import SidebarMenuItemCollapse from './SidebarMenuItemCollapse.vue';
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

      <!-- Menu Items -->
      <template v-for="(item, itemIndex) in group.items" :key="itemIndex">
        <!-- Item with submenu -->
        <SidebarMenuItemCollapse v-if="item.submenu" :item="item" />

        <!-- Regular item -->
        <SidebarMenuItem v-else :item="item" />
      </template>
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
