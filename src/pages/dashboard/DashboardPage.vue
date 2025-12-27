<script setup lang="ts">
import { Button } from '@shared';
import { ref } from 'vue';
import { tabHome } from 'quasar-extras-svg-icons/tabler-icons-v2';

const isLoading = ref(true);
</script>

<template>
  <q-page class="row items-center justify-evenly">
    Dashboard Page

    <q-card>
      <q-card-section>
        <!-- Variants + Fill (default) -->
        <Button>Primary Fill</Button>
        <Button variant="secondary">Secondary Fill</Button>
        <Button variant="tertiary">Tertiary Fill</Button>

        <!-- Outline appearance -->
        <Button appearance="outline">Primary Outline</Button>
        <Button variant="secondary" appearance="outline">Secondary Outline</Button>
        <Button variant="tertiary" appearance="outline">Tertiary Outline</Button>

        <!-- Ghost appearance -->
        <Button appearance="ghost" :icon="tabHome" label="Primary Ghost" />
        <Button variant="secondary" appearance="ghost">Secondary Ghost</Button>
        <Button variant="tertiary" appearance="ghost">Tertiary Ghost</Button>

        <!-- Sizes -->
        <Button size="sm">Small</Button>
        <Button size="md">Medium (default)</Button>
        <Button size="lg">Large</Button>

        <!-- Icon-only buttons (rounded) -->
        <Button icon-only :icon="tabHome" />
        <Button icon-only :icon="tabHome" variant="secondary" />
        <Button icon-only :icon="tabHome" variant="tertiary" appearance="outline" />

        <!-- Icon-only buttons (round - fully circular) -->
        <Button icon-only :icon="tabHome" shape="round" />
        <Button icon-only :icon="tabHome" shape="round" size="sm" />
        <Button icon-only :icon="tabHome" shape="round" size="lg" />

        <!-- Loading state -->
        <Button :loading="isLoading">Submit</Button>
        <Button icon-only :icon="tabHome" :loading="isLoading" />

        <!-- Disabled -->
        <Button disabled>Disabled Button</Button>

        <!-- Full width -->
        <Button full-width>Full Width Button</Button>
      </q-card-section>
    </q-card>
  </q-page>
</template>
