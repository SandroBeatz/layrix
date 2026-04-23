<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { PageContainer } from '@shared/ui';

let scriptElement: HTMLScriptElement | null = null;

onMounted(() => {
  scriptElement = document.createElement('script');
  // scriptElement.src = 'https://velocorner-widget.vercel.app/velocorner-widget.iife.js';
  scriptElement.src = 'https://wgt.int.velocorner.ch/widget.iife.js';
  document.head.appendChild(scriptElement);
});

onUnmounted(() => {
  if (scriptElement) {
    document.head.removeChild(scriptElement);
  }
});
</script>

<template>
  <PageContainer
    title="Velocorner Widget V3"
    subtitle="An example page for Velocorner Widget V3 integration"
  >
    <div class="widget-container">
      <velocorner-widget api-key="9cb20599-17c1-435c-82ee-4241d6f4b696"></velocorner-widget>
    </div>
  </PageContainer>
</template>

<style scoped lang="scss">
.widget-container {
  width: 100%;
  max-width: 1190px;
  margin: 0 auto;
}
</style>
