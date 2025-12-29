<script setup lang="ts">
import { ref } from 'vue';
import SidebarMenu from './SidebarMenu.vue';

const leftDrawerOpen = ref(false);
</script>

<template>
  <q-drawer v-model="leftDrawerOpen" mini show-if-above bordered class="sidebar">
    <SidebarMenu />
  </q-drawer>
</template>

<style scoped lang="scss">
:global(.sidebar) {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
}
</style>
