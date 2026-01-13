<script setup lang="ts">
import { QCard, QCardSection } from 'quasar';
import type { CardProps } from './Card.types';

const props = withDefaults(defineProps<CardProps>(), {
  bordered: true,
  flat: true,
});
</script>

<template>
  <QCard v-bind="props" class="bg-card card-radius">
    <component :is="dense ? 'div' : QCardSection" class="q-pb-none">
      <div v-if="!$slots['header']" class="flex wrap justify-between">
        <div class="">
          <div class="column">
            <h5 v-if="title" class="text-h6 q-ma-none text-weight-bold">{{ title }}</h5>
            <span v-if="caption" class="text-caption q-ma-none text-muted-foreground">{{ caption }}</span>
          </div>

          <slot name="header-left"></slot>
        </div>
        <div class="">
          <slot name="header-right"></slot>
        </div>
      </div>
    </component>
    <component :is="dense ? 'div' : QCardSection">
      <slot></slot>
    </component>
  </QCard>
</template>

<style scoped lang="scss">
.card-radius {
  border-radius: calc(var(--border-radius) + 4px);
}
</style>
