<script setup lang="ts">
import { inject, ref } from 'vue';
import type { SidebarMenuItem as SidebarMenuItemType } from '../model/types';
import { SidebarMenuItemRecursive } from '@widgets/sidebar';

const props = defineProps<{
  item: SidebarMenuItemType;
}>();

const isExpandedItem = inject<(expandOn?: string[]) => boolean>('isExpandedItem');
const expanded = ref(isExpandedItem?.(props.item.expandOn) ?? false);
</script>

<template>
  <q-expansion-item
    v-model="expanded"
    :icon="item.icon"
    :label="item.label"
    :caption="item.caption"
    :disable="item.disable"
    header-class="sidebar-item sidebar-item_collapse"
  >
    <q-list>
      <SidebarMenuItemRecursive
        v-for="(subitem, index) in item.submenu"
        :key="index"
        :item="subitem"
      />
    </q-list>
  </q-expansion-item>
</template>

<style scoped lang="scss"></style>
