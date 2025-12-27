<script setup lang="ts">
import { ref } from 'vue';
import SidebarMenu from './SidebarMenu.vue';

const leftDrawerOpen = ref(false);
</script>

<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <SidebarMenu/>
  </q-drawer>
</template>

<style scoped></style>
