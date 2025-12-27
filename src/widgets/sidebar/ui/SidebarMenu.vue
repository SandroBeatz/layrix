<script setup lang="ts">
import SidebarMenuItem from './SidebarMenuItem.vue';
import { tabHome } from 'quasar-extras-svg-icons/tabler-icons-v2';
</script>

<template>
  <q-list>
    <q-item-label header>
      <q-icon :name="tabHome" />
      Essential Links
    </q-item-label>

    <SidebarMenuItem />
  </q-list>
</template>

<style scoped></style>
