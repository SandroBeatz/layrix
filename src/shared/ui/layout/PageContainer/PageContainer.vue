<script setup lang="ts">
import { computed } from 'vue';
import type { PageContainerProps } from './PageContainer.types';

/**
 * PageContainer Component
 * Provides consistent page layout structure
 *
 * @example
 * // Basic usage
 * <PageContainer title="Dashboard" subtitle="Welcome back">
 *   <Content />
 * </PageContainer>
 *
 * @example
 * // With header actions
 * <PageContainer title="Users">
 *   <template #header-right>
 *     <Button variant="primary" icon="plus">Add User</Button>
 *   </template>
 *   <UsersList />
 * </PageContainer>
 */

const props = withDefaults(defineProps<PageContainerProps>(), {
  maxWidth: '1200px',
});

const slots = defineSlots<{
  default: () => unknown;
  header?: () => unknown;
  'header-right'?: () => unknown;
}>();

// Check if header should be shown
const hasHeader = computed(() => {
  const hasHeaderRight = slots['header-right'];
  return Boolean(props.title || props.subtitle || slots.header || hasHeaderRight);
});

// Container max-width style
const containerStyle = computed(() => {
  if (!props.container) return {};
  return {
    maxWidth: props.maxWidth,
  };
});
</script>

<template>
  <q-page class="page-container">
    <!-- Header Section -->
    <header v-if="hasHeader" class="page-container__header q-pa-md">
      <!-- Custom header slot (replaces default) -->
      <slot name="header">
        <!-- Default header: title + subtitle on left, actions on right -->
        <div class="page-container__header-content">
          <div class="page-container__header-left">
            <h1 v-if="title" class="page-container__title">{{ title }}</h1>
            <p v-if="subtitle" class="page-container__subtitle">{{ subtitle }}</p>
          </div>
          <div v-if="slots['header-right']" class="page-container__header-right">
            <slot name="header-right" />
          </div>
        </div>
      </slot>
    </header>

    <!-- Content Section -->
    <div
      class="page-container__content q-pa-md"
      :class="{ 'page-container__content--contained': container }"
      :style="containerStyle"
    >
      <slot />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
/**
 * PageContainer Styles
 * Minimal structure-only styles, no padding or background
 */

.page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}

.page-container__header {
  width: 100%;
}

.page-container__header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.page-container__header-left {
  flex: 1;
}

.page-container__header-right {
  flex-shrink: 0;
}

.page-container__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.page-container__subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--color-text-secondary);
}

.page-container__content {
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
}

.page-container__content--contained {
  margin: 0 auto;
}
</style>
