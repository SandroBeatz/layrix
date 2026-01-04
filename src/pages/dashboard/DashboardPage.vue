<script setup lang="ts">
import { Button, PageContainer, Card } from '@shared';
import { ref } from 'vue';
import { tabHome, tabPlus } from 'quasar-extras-svg-icons/tabler-icons-v2';

const isLoading = ref(true);
</script>

<template>
  <PageContainer title="Dashboard" subtitle="Welcome to your dashboard">
    <template #header-right>
      <Button variant="primary" :icon="tabPlus">Create New</Button>
    </template>

    <Card title="Button Variants and States">
      <h6 class="q-ma-none q-pb-md">Fill Buttons</h6>
      <div class="row q-gutter-md">
        <Button>Primary Fill</Button>
        <Button variant="secondary">Secondary Fill</Button>
        <Button variant="tertiary">Tertiary Fill</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Outline Buttons</h6>
      <div class="row q-gutter-md">
        <Button appearance="outline">Primary Outline</Button>
        <Button variant="secondary" appearance="outline">Secondary Outline</Button>
        <Button variant="tertiary" appearance="outline">Tertiary Outline</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Ghost Buttons</h6>
      <div class="row q-gutter-md">
        <Button appearance="ghost" :icon="tabHome" label="Primary Ghost" />
        <Button variant="secondary" appearance="ghost">Secondary Ghost</Button>
        <Button variant="tertiary" appearance="ghost">Tertiary Ghost</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Flat Buttons with Icons</h6>
      <div class="row q-gutter-md">
        <Button appearance="flat" :icon="tabHome">Primary Flat</Button>
        <Button variant="secondary" appearance="flat" :icon="tabHome">Secondary Flat</Button>
        <Button variant="tertiary" appearance="flat" :icon="tabPlus">Tertiary Flat</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Button Sizes</h6>
      <div class="row q-gutter-md items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium (default)</Button>
        <Button size="lg">Large</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Icon-Only Buttons (Rounded)</h6>
      <div class="row q-gutter-md items-center">
        <Button icon-only :icon="tabHome" size="sm" />
        <Button icon-only :icon="tabHome" variant="secondary" size="md" />
        <Button icon-only :icon="tabHome" variant="tertiary" size="lg" />
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Icon-Only Buttons (Circle)</h6>
      <div class="row q-gutter-md items-center">
        <Button icon-only :icon="tabHome" shape="round" size="sm" />
        <Button icon-only :icon="tabHome" shape="round" size="md" />
        <Button icon-only :icon="tabHome" shape="round" size="lg" />
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Loading State</h6>
      <div class="row q-gutter-md">
        <Button :loading="isLoading">Submit</Button>
        <Button icon-only :icon="tabHome" :loading="isLoading" />
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Disabled State</h6>
      <div class="row q-gutter-md">
        <Button disabled>Disabled Button</Button>
      </div>

      <h6 class="q-ma-none q-pb-md q-pt-lg">Full Width</h6>
      <div class="">
        <Button full-width>Full Width Button</Button>
      </div>
    </Card>
  </PageContainer>
</template>
