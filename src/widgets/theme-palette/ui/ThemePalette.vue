<script setup lang="ts">
import { ColorSwatch } from '@shared/ui'
import { colorGroups } from '../config/colorGroups'

/**
 * ThemePalette Widget
 * Displays the complete color palette organized by semantic groups
 *
 * Shows all theme colors with ColorSwatch components that allow
 * copying CSS class names to clipboard
 */
</script>

<template>
  <div class="theme-palette">
    <div
      v-for="group in colorGroups"
      :key="group.title"
      class="theme-palette__group"
    >
      <h3 class="theme-palette__title">{{ group.title }}</h3>
      <div class="row q-gutter-md">
        <div
          v-for="colorName in group.colors"
          :key="colorName"
          class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        >
          <ColorSwatch :color-name="colorName" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-palette {
  &__group {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-foreground);
  }
}
</style>
