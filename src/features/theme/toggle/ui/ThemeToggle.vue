<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@shared/lib';
import { Button } from '@shared/ui';
import { tabMoon, tabSun } from 'quasar-extras-svg-icons/tabler-icons-v2';

/**
 * Theme Toggle Button
 * Switches between light and dark themes
 *
 * @example
 * <ThemeToggle />
 */

const { currentTheme, toggleTheme } = useTheme();

// Compute icon based on current theme
const icon = computed(() => {
  return currentTheme.value === 'light' ? tabSun : tabMoon;
});

// Tooltip text
const tooltip = computed(() => {
  return currentTheme.value === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
});

function handleToggle() {
  toggleTheme();
}
</script>

<template>
  <Button
    icon-only
    variant="regular"
    appearance="flat"
    :icon="icon"
    :title="tooltip"
    @click="handleToggle"
  />
</template>

<style scoped lang="scss"></style>
