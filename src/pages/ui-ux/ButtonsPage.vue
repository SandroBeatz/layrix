<script setup lang="ts">
import { ref } from 'vue';
import { PageContainer, Button, Card } from '@shared/ui';

const isLoading = ref(false);

// Button variants for demo
const variants = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'regular', label: 'Regular' },
] as const;

const appearances = [
  { value: 'fill', label: 'Fill' },
  { value: 'outline', label: 'Outline' },
  { value: 'flat', label: 'Flat' },
  { value: 'ghost', label: 'Ghost' },
] as const;

const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
] as const;
</script>

<template>
  <PageContainer title="Buttons" subtitle="All button variants, appearances, sizes and states">
    <div class="column q-gutter-y-lg">
      <!-- Variants Section -->
      <Card title="Variants">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Different button color variants</span>
        </template>
        <div class="row q-gutter-md items-center flex-wrap">
          <Button v-for="variant in variants" :key="variant.value" :variant="variant.value">
            {{ variant.label }}
          </Button>
        </div>
      </Card>

      <!-- Appearance Section -->
      <Card title="Appearance">
        <template #header-right>
          <span class="text-caption text-muted-foreground"
            >Different button styles for each variant</span
          >
        </template>
        <div class="column q-gutter-y-lg">
          <div v-for="variant in variants" :key="variant.value" class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">{{ variant.label }}</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button
                v-for="appearance in appearances"
                :key="appearance.value"
                :variant="variant.value"
                :appearance="appearance.value"
              >
                {{ appearance.label }}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <!-- Sizes Section -->
      <Card title="Sizes">
        <template #header-right>
          <span class="text-caption text-muted-foreground"
            >Small, medium and large button sizes</span
          >
        </template>
        <div class="row q-gutter-md items-center flex-wrap">
          <Button v-for="size in sizes" :key="size.value" :size="size.value">
            {{ size.label }}
          </Button>
        </div>
      </Card>

      <!-- With Icons Section -->
      <Card title="With Icons">
        <template #header-right>
          <span class="text-caption text-muted-foreground"
            >Buttons with icons and icon-only buttons</span
          >
        </template>
        <div class="column q-gutter-lg">
          <!-- Icon + Label -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Icon + Label</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button icon="add" label="Add Item" />
              <Button variant="secondary" icon="edit" label="Edit" />
              <Button variant="negative" icon="delete" label="Delete" />
              <Button variant="positive" icon="check" label="Confirm" />
              <Button variant="warning" icon="warning" label="Warning" />
              <Button variant="info" icon="info" label="Info" />
            </div>
          </div>

          <!-- Icon Only -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Icon Only</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button icon="add" icon-only />
              <Button variant="secondary" icon="edit" icon-only />
              <Button variant="negative" icon="delete" icon-only />
              <Button variant="positive" icon="check" icon-only />
              <Button variant="warning" icon="warning" icon-only />
              <Button variant="info" icon="info" icon-only />
            </div>
          </div>

          <!-- Icon Only - Different Sizes -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Icon Only - Sizes</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button icon="content_copy" icon-only size="sm" />
              <Button icon="content_copy" icon-only size="md" />
              <Button icon="content_copy" icon-only size="lg" />
            </div>
          </div>

          <!-- Icon Only - Round Shape -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Icon Only - Round Shape</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button icon="add" icon-only shape="round" size="sm" />
              <Button icon="add" icon-only shape="round" size="md" />
              <Button icon="add" icon-only shape="round" size="lg" />
            </div>
          </div>
        </div>
      </Card>

      <!-- States Section -->
      <Card title="States">
        <template #header-right>
          <span class="text-caption text-muted-foreground"
            >Normal, disabled and loading states</span
          >
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Normal State -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Normal</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button>Normal Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="positive">Positive</Button>
            </div>
          </div>

          <!-- Disabled State -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Disabled</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button disabled>Disabled Button</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="positive" disabled>Positive</Button>
            </div>
          </div>

          <!-- Loading State -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Loading</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button :loading="true">Loading Button</Button>
              <Button variant="secondary" :loading="true">Secondary</Button>
              <Button variant="positive" :loading="true">Positive</Button>
            </div>
          </div>

          <!-- Interactive Loading -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Interactive Loading</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Button :loading="isLoading" @click="isLoading = !isLoading">
                {{ isLoading ? 'Loading...' : 'Click to Load' }}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <!-- Full Width Section -->
      <Card title="Full Width">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Buttons that span the full width</span>
        </template>
        <div class="column q-gutter-y-md">
          <Button full-width>Full Width Button</Button>
          <Button variant="secondary" full-width>Secondary Full Width</Button>
          <Button appearance="outline" full-width>Outline Full Width</Button>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
