<script setup lang="ts">
import { ThemeToggle } from '@features/theme/toggle';
import HeaderUserButton from './HeaderUserButton.vue';
import { ToggleSidebarButton, ToggleMiniButton } from '@features/sidebar';
</script>

<template>
  <q-header bordered class="header">
    <q-toolbar>
      <ToggleSidebarButton />
      <ToggleMiniButton />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div class="header-actions">
        <div class="version-info">Quasar v{{ $q.version }}</div>
        <ThemeToggle />
        <HeaderUserButton />
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version-info {
  font-size: 14px;
  color: var(--color-muted-foreground);
}
</style>
