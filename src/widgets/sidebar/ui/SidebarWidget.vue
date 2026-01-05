<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useSidebarStore } from '@entities/sidebar';
import SidebarMenu from './SidebarMenu.vue';

// Connect to sidebar store
const sidebarStore = useSidebarStore();
const { isMini, isOpen } = storeToRefs(sidebarStore);

// Initialize store on mount (load from localStorage)
onMounted(() => {
  sidebarStore.initialize();
});
</script>

<template>
  <q-drawer
    v-model="isOpen"
    :mini="isMini"
    show-if-above
    bordered
    class="sidebar"
  >
    <SidebarMenu />
  </q-drawer>
</template>

<style scoped lang="scss">
:global(.sidebar) {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
}
</style>
