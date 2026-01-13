<script setup lang="ts">
import { useSidebarStore } from 'src/entities/sidebar';
import { Button } from '@shared/ui';
import { tabMenu2 } from 'quasar-extras-svg-icons/tabler-icons-v2';

/**
 * Sidebar Toggle Sidebar Button
 *
 * @example
 * <ToggleSidebarButton />
 */

const sidebarStore = useSidebarStore();

function handleToggle() {
  sidebarStore.toggleOpen();
}
</script>

<template>
  <Button icon-only variant="regular" appearance="flat" :icon="tabMenu2" @click="handleToggle" />
</template>

<style scoped lang="scss"></style>
