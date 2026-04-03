<script setup lang="ts">
import { PageContainer, Breadcrumbs, Card, Typography } from '@shared/ui';
import type { BreadcrumbItem } from '@shared/ui';
import { tabHome, tabSettings, tabUser } from 'quasar-extras-svg-icons/tabler-icons-v2';

// Sample breadcrumb items
const basicItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Electronics', to: '/products/electronics' },
  { label: 'Laptop' },
];

const dashboardItems: BreadcrumbItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Users', to: '/users' },
  { label: 'Profile' },
];

const iconItems: BreadcrumbItem[] = [
  { label: 'Home', icon: tabHome, to: '/' },
  { label: 'Settings', icon: tabSettings, to: '/settings' },
  { label: 'Account', icon: tabUser },
];

const externalItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Documentation', href: 'https://quasar.dev', target: '_blank' },
  { label: 'Current Page' },
];
</script>

<template>
  <PageContainer title="Breadcrumbs" subtitle="Navigation breadcrumb component with variants">
    <div class="column q-gutter-y-lg">
      <!-- Variants Section -->
      <Card title="Variants" caption="Primary and Regular variants">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Primary Variant</Typography>
            <Typography variant="caption-muted"
              >Text color: primary, Active item: muted-foreground</Typography
            >
            <Breadcrumbs variant="primary" :items="basicItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Regular Variant (Default)</Typography>
            <Typography variant="caption-muted"
              >Text color: foreground, Active item: muted-foreground</Typography
            >
            <Breadcrumbs variant="regular" :items="basicItems" />
          </div>
        </div>
      </Card>

      <!-- Separators Section -->
      <Card title="Separators" caption="Different separator styles">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Default Separator (/)</Typography>
            <Breadcrumbs :items="dashboardItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Custom Text Separator (>)</Typography>
            <Breadcrumbs separator=">" :items="dashboardItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Chevron Separator (›)</Typography>
            <Breadcrumbs separator="›" :items="dashboardItems" />
          </div>
        </div>
      </Card>

      <!-- Items with Icons Section -->
      <Card title="Items with Icons" caption="Breadcrumb items can include icons">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Icons in Items</Typography>
            <Breadcrumbs :items="iconItems" />
          </div>
        </div>
      </Card>

      <!-- Special Cases Section -->
      <Card title="Special Cases" caption="External links and other use cases">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">With External Link</Typography>
            <Typography variant="caption-muted"
              >Mix of internal routes and external links</Typography
            >
            <Breadcrumbs :items="externalItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Single Item</Typography>
            <Breadcrumbs :items="[{ label: 'Current Page' }]" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Gutter Size (Large)</Typography>
            <Breadcrumbs gutter="lg" :items="basicItems" />
          </div>
        </div>
      </Card>

      <!-- Alignment Section -->
      <Card title="Alignment" caption="Different alignment options">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Left Aligned (Default)</Typography>
            <Breadcrumbs align="left" :items="basicItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Center Aligned</Typography>
            <Breadcrumbs align="center" :items="basicItems" />
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Right Aligned</Typography>
            <Breadcrumbs align="right" :items="basicItems" />
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
