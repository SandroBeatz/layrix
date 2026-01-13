<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from 'src/entities/sidebar';
import { Button } from '@shared/ui';
import {
  tabLayoutSidebarLeftCollapseFilled,
  tabLayoutSidebarLeftExpandFilled,
} from 'quasar-extras-svg-icons/tabler-icons-v2';
import { useScreen } from '@shared/lib';

/**
 * Sidebar Toggle Mini Button
 * Toggles sidebar between mini (collapsed) and expanded modes
 *
 * @example
 * <ToggleMiniButton />
 */

const { isMobileBreakpoint } = useScreen();

const sidebarStore = useSidebarStore();

// Compute icon based on current mini state
const icon = computed(() => {
  // When NOT mini (expanded) → show collapse icon
  // When mini (collapsed) → show expand icon
  return !sidebarStore.isMini
    ? tabLayoutSidebarLeftCollapseFilled
    : tabLayoutSidebarLeftExpandFilled;
});

// Tooltip text
const tooltip = computed(() => {
  return sidebarStore.isMini ? 'Expand sidebar' : 'Collapse sidebar';
});

function handleToggle() {
  sidebarStore.toggleMini();
}
</script>

<template>
  <Button
    v-if="!isMobileBreakpoint"
    icon-only
    variant="regular"
    appearance="flat"
    :icon="icon"
    :title="tooltip"
    @click="handleToggle"
  />
</template>

<style scoped lang="scss"></style>
