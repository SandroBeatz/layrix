<script setup lang="ts">
import { ThemeToggle } from '@features/theme/toggle'
</script>

<template>
  <q-header bordered class="header">
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div class="header-actions">
        <ThemeToggle />
        <div class="version-info">Quasar v{{ $q.version }}</div>
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
