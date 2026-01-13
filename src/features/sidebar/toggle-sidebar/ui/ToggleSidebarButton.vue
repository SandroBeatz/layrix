<script setup lang="ts">
import { useSidebarStore } from 'src/entities/sidebar';
import { Button } from '@shared/ui';
import { tabMenu2 } from 'quasar-extras-svg-icons/tabler-icons-v2';
import { useScreen } from '@shared/lib';

/**
 * Sidebar Toggle Sidebar Button
 *
 * @example
 * <ToggleSidebarButton />
 */

const { isMobileBreakpoint } = useScreen();

const sidebarStore = useSidebarStore();

function handleToggle() {
  sidebarStore.toggleOpen();
}
</script>

<template>
  <Button
    v-if="isMobileBreakpoint"
    icon-only
    variant="regular"
    appearance="flat"
    :icon="tabMenu2"
    @click="handleToggle"
  />
</template>

<style scoped lang="scss"></style>
