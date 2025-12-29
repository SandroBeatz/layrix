<script setup lang="ts">
import { tabHome } from 'quasar-extras-svg-icons/tabler-icons-v2';
</script>

<template>
  <q-item clickable v-ripple class="sidebar-item">
    <q-item-section avatar class="sidebar-item__avatar">
      <q-icon :name="tabHome" />
    </q-item-section>

    <q-item-section>Dashboard</q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.sidebar-item {
  &__avatar {
    min-width: 40px;
  }
}
</style>
