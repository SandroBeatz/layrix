<script setup lang="ts">
import { ref } from 'vue';
import type { SidebarMenuItem as SidebarMenuItemType } from '../model/types';
import SidebarMenuItem from './SidebarMenuItem.vue';

defineProps<{
  item: SidebarMenuItemType;
}>();

const expanded = ref(false);
</script>

<template>
  <q-expansion-item
    v-model="expanded"
    :icon="item.icon"
    :label="item.label"
    :caption="item.caption"
    :disable="item.disable"
    class="sidebar-item-collapse"
  >
    <q-list>
      <SidebarMenuItem
        v-for="(subitem, index) in item.submenu"
        :key="index"
        :item="subitem"
        is-submenu
      />
    </q-list>
  </q-expansion-item>
</template>

<style scoped lang="scss">
:global(.sidebar-item-collapse .q-item__section--avatar) {
  min-width: 40px;
}
</style>
