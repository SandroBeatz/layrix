<script setup lang="ts">
import SidebarMenuItem from './SidebarMenuItem.vue';
import SidebarMenuLogoItem from './SidebarMenuLogoItem.vue';
import { tabHome, tabBoxModel } from 'quasar-extras-svg-icons/tabler-icons-v2';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: tabHome,
    route: '/',
  },
  {
    title: 'Theme',
    icon: tabBoxModel,
    route: '/theme',
  },
];
</script>

<template>
  <q-list class="sidebar-menu">
    <SidebarMenuLogoItem />

    <SidebarMenuItem
      v-for="item in navigationItems"
      :key="item.route"
      :item="item"
    />
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
