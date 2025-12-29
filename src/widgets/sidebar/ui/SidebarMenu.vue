<script setup lang="ts">
import SidebarMenuItem from './SidebarMenuItem.vue';
import SidebarMenuLogoItem from './SidebarMenuLogoItem.vue';
</script>

<template>
  <q-list class="sidebar-menu">
    <SidebarMenuLogoItem/>

    <SidebarMenuItem />
  </q-list>
</template>

<style scoped lang="scss">
.sidebar-menu {}

.sidebar-header {
  color: var(--color-muted-foreground);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}
</style>
