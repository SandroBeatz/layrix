<script setup lang="ts">
import { ref } from 'vue';
import { PageContainer, Button, ButtonGroup, Card, Typography } from '@shared/ui';

const selectedAlign = ref('left');
const selectedSize = ref('md');
const selectedVariant = ref('primary');

// Button variants for demo
const variants = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
] as const;

const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
] as const;
</script>

<template>
  <PageContainer
    title="Button Groups"
    subtitle="Group buttons together in horizontal or vertical layouts"
  >
    <div class="column q-gutter-y-lg">
      <!-- Basic Horizontal Groups -->
      <Card title="Basic Horizontal Groups">
        <template #header-right>
          <Typography variant="caption-muted">Standard button groups</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Default group -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Default</Typography>
            <ButtonGroup>
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </ButtonGroup>
          </div>

          <!-- With different variants -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Different Variants</Typography>
            <div class="column q-gutter-md">
              <ButtonGroup v-for="variant in variants" :key="variant.value">
                <Button :variant="variant.value">One</Button>
                <Button :variant="variant.value">Two</Button>
                <Button :variant="variant.value">Three</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Card>

      <!-- Button Appearances -->
      <Card title="Button Appearances">
        <template #header-right>
          <Typography variant="caption-muted">Fill, outline, and flat styles</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Fill -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Fill (Default)</Typography>
            <ButtonGroup>
              <Button appearance="fill">One</Button>
              <Button appearance="fill">Two</Button>
              <Button appearance="fill">Three</Button>
            </ButtonGroup>
          </div>

          <!-- Outline -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Outline</Typography>
            <ButtonGroup>
              <Button appearance="outline">One</Button>
              <Button appearance="outline">Two</Button>
              <Button appearance="outline">Three</Button>
            </ButtonGroup>
          </div>

          <!-- Flat -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Flat</Typography>
            <ButtonGroup>
              <Button appearance="flat">One</Button>
              <Button appearance="flat">Two</Button>
              <Button appearance="flat">Three</Button>
            </ButtonGroup>
          </div>

          <!-- Ghost -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Ghost</Typography>
            <ButtonGroup>
              <Button appearance="ghost">One</Button>
              <Button appearance="ghost">Two</Button>
              <Button appearance="ghost">Three</Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <!-- Sizes -->
      <Card title="Sizes">
        <template #header-right>
          <Typography variant="caption-muted">Small, medium and large button groups</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <div v-for="size in sizes" :key="size.value" class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">{{ size.label }}</Typography>
            <ButtonGroup>
              <Button :size="size.value">One</Button>
              <Button :size="size.value">Two</Button>
              <Button :size="size.value">Three</Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <!-- Vertical Groups -->
      <Card title="Vertical Groups">
        <template #header-right>
          <Typography variant="caption-muted">Buttons stacked vertically</Typography>
        </template>
        <div class="row q-gutter-x-lg">
          <!-- Default vertical -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Default</Typography>
            <ButtonGroup orientation="vertical">
              <Button>Top</Button>
              <Button>Middle</Button>
              <Button>Bottom</Button>
            </ButtonGroup>
          </div>

          <!-- Vertical with secondary -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Secondary</Typography>
            <ButtonGroup orientation="vertical">
              <Button variant="secondary">Top</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Bottom</Button>
            </ButtonGroup>
          </div>

          <!-- Vertical outline -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Outline</Typography>
            <ButtonGroup orientation="vertical">
              <Button appearance="outline">Top</Button>
              <Button appearance="outline">Middle</Button>
              <Button appearance="outline">Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <!-- With Icons -->
      <Card title="With Icons">
        <template #header-right>
          <Typography variant="caption-muted">Button groups with icons</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Icon + Label -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Icon + Label</Typography>
            <ButtonGroup>
              <Button icon="format_align_left" label="Left" />
              <Button icon="format_align_center" label="Center" />
              <Button icon="format_align_right" label="Right" />
              <Button icon="format_align_justify" label="Justify" />
            </ButtonGroup>
          </div>

          <!-- Icon Only -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Icon Only</Typography>
            <ButtonGroup>
              <Button icon="format_align_left" icon-only />
              <Button icon="format_align_center" icon-only />
              <Button icon="format_align_right" icon-only />
              <Button icon="format_align_justify" icon-only />
            </ButtonGroup>
          </div>

          <!-- Text formatting toolbar -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Text Formatting Toolbar</Typography>
            <div class="row q-gutter-x-sm">
              <ButtonGroup>
                <Button icon="format_bold" icon-only appearance="outline" />
                <Button icon="format_italic" icon-only appearance="outline" />
                <Button icon="format_underlined" icon-only appearance="outline" />
                <Button icon="format_strikethrough" icon-only appearance="outline" />
              </ButtonGroup>
              <ButtonGroup>
                <Button icon="format_align_left" icon-only appearance="outline" />
                <Button icon="format_align_center" icon-only appearance="outline" />
                <Button icon="format_align_right" icon-only appearance="outline" />
              </ButtonGroup>
              <ButtonGroup>
                <Button icon="format_list_bulleted" icon-only appearance="outline" />
                <Button icon="format_list_numbered" icon-only appearance="outline" />
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Card>

      <!-- Interactive Examples -->
      <Card title="Interactive Examples">
        <template #header-right>
          <Typography variant="caption-muted">Stateful button groups</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Text Alignment Selector -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Text Alignment Selector (Selected: {{ selectedAlign }})</Typography
            >
            <ButtonGroup>
              <Button
                :variant="selectedAlign === 'left' ? 'primary' : 'regular'"
                :appearance="selectedAlign === 'left' ? 'fill' : 'outline'"
                icon="format_align_left"
                icon-only
                @click="selectedAlign = 'left'"
              />
              <Button
                :variant="selectedAlign === 'center' ? 'primary' : 'regular'"
                :appearance="selectedAlign === 'center' ? 'fill' : 'outline'"
                icon="format_align_center"
                icon-only
                @click="selectedAlign = 'center'"
              />
              <Button
                :variant="selectedAlign === 'right' ? 'primary' : 'regular'"
                :appearance="selectedAlign === 'right' ? 'fill' : 'outline'"
                icon="format_align_right"
                icon-only
                @click="selectedAlign = 'right'"
              />
            </ButtonGroup>
          </div>

          <!-- Size Selector -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Size Selector (Selected: {{ selectedSize }})</Typography
            >
            <ButtonGroup>
              <Button
                v-for="size in sizes"
                :key="size.value"
                :variant="selectedSize === size.value ? 'primary' : 'regular'"
                :appearance="selectedSize === size.value ? 'fill' : 'outline'"
                @click="selectedSize = size.value"
              >
                {{ size.label }}
              </Button>
            </ButtonGroup>
          </div>

          <!-- Variant Selector -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Variant Selector (Selected: {{ selectedVariant }})</Typography
            >
            <ButtonGroup>
              <Button
                v-for="variant in variants"
                :key="variant.value"
                :variant="variant.value"
                :appearance="selectedVariant === variant.value ? 'fill' : 'outline'"
                @click="selectedVariant = variant.value"
              >
                {{ variant.label }}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <!-- Spread & Stretch -->
      <Card title="Spread & Stretch">
        <template #header-right>
          <Typography variant="caption-muted">Full width and equal width buttons</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Spread -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Spread (buttons take full width)</Typography
            >
            <ButtonGroup spread>
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </ButtonGroup>
          </div>

          <!-- Stretch -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Stretch (buttons have equal width)</Typography
            >
            <ButtonGroup stretch>
              <Button>Short</Button>
              <Button>Medium Length</Button>
              <Button>Long Button Text</Button>
            </ButtonGroup>
          </div>

          <!-- Spread + Vertical -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Spread + Vertical (full height)</Typography
            >
            <div style="height: 300px">
              <ButtonGroup spread orientation="vertical">
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Card>

      <!-- Outline and Flat Groups -->
      <Card title="Group Styles">
        <template #header-right>
          <Typography variant="caption-muted">Group outline and flat properties</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- With Outline on Group -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Group with Outline</Typography>
            <ButtonGroup outline>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </div>

          <!-- Not Flat (with elevation) -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium"
              >Group with Elevation (flat=false)</Typography
            >
            <ButtonGroup :flat="false">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <!-- Complex Examples -->
      <Card title="Complex Examples">
        <template #header-right>
          <Typography variant="caption-muted">Real-world usage patterns</Typography>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Pagination Controls -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Pagination Controls</Typography>
            <div class="row q-gutter-x-sm items-center">
              <Button icon="chevron_left" icon-only appearance="outline" />
              <ButtonGroup>
                <Button appearance="outline">1</Button>
                <Button>2</Button>
                <Button appearance="outline">3</Button>
                <Button appearance="outline">4</Button>
                <Button appearance="outline">5</Button>
              </ButtonGroup>
              <Button icon="chevron_right" icon-only appearance="outline" />
            </div>
          </div>

          <!-- Action Bar -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Action Bar</Typography>
            <div class="row justify-between">
              <ButtonGroup>
                <Button icon="add" label="New" />
                <Button variant="secondary" icon="upload" label="Import" />
                <Button variant="secondary" icon="download" label="Export" />
              </ButtonGroup>
              <ButtonGroup>
                <Button icon="refresh" icon-only appearance="outline" />
                <Button icon="settings" icon-only appearance="outline" />
              </ButtonGroup>
            </div>
          </div>

          <!-- View Switcher -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">View Switcher</Typography>
            <ButtonGroup>
              <Button icon="view_list" icon-only appearance="outline" />
              <Button icon="grid_view" icon-only />
              <Button icon="view_column" icon-only appearance="outline" />
            </ButtonGroup>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
