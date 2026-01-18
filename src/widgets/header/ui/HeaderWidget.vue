<script setup lang="ts">
import { ThemeToggle } from '@features/theme/toggle';
import HeaderUserButton from './HeaderUserButton.vue';
import { ToggleSidebarButton, ToggleMiniButton } from '@features/sidebar';
import { Typography } from '@shared/ui';
</script>

<template>
  <q-header bordered class="header">
    <q-toolbar>
      <ToggleSidebarButton />
      <ToggleMiniButton />

      <q-toolbar-title>
        <Typography variant="h6" weight="medium">Quasar App</Typography>
      </q-toolbar-title>

      <div class="header-actions">
        <Typography variant="body-muted">Quasar v{{ $q.version }}</Typography>
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
</style>
