<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@shared/lib'
import { Button } from '@shared/ui'

/**
 * Theme Toggle Button
 * Switches between light and dark themes
 *
 * @example
 * <ThemeToggle />
 */

const { currentTheme, toggleTheme } = useTheme()

// Compute icon based on current theme
const icon = computed(() => {
  return currentTheme.value === 'light' ? 'light_mode' : 'dark_mode'
})

// Tooltip text
const tooltip = computed(() => {
  return currentTheme.value === 'light'
    ? 'Switch to dark mode'
    : 'Switch to light mode'
})

function handleToggle() {
  toggleTheme()
}
</script>

<template>
  <Button
    :icon="icon"
    icon-only
    shape="round"
    :title="tooltip"
    @click="handleToggle"
    class="theme-toggle"
  />
</template>

<style scoped lang="scss">
.theme-toggle {
  transition: transform 0.2s ease;

  &:active {
    transform: rotate(180deg);
  }
}
</style>
