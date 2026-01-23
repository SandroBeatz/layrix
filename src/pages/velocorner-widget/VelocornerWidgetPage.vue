<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { PageContainer } from '@shared/ui';

let scriptElement: HTMLScriptElement | null = null;

onMounted(() => {
  scriptElement = document.createElement('script');
  scriptElement.src = 'https://velocorner-widget.vercel.app/velocorner-widget.iife.js';
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
    <velocorner-widget api-key="111333"></velocorner-widget>
  </PageContainer>
</template>

<style scoped lang="scss"></style>
