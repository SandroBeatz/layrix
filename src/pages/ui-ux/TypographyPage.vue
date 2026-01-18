<script setup lang="ts">
import { PageContainer, Typography, Card } from '@shared/ui';

// Typography variants
const headingVariants = [
  { variant: 'h1', label: 'Heading 1' },
  { variant: 'h2', label: 'Heading 2' },
  { variant: 'h3', label: 'Heading 3' },
  { variant: 'h4', label: 'Heading 4' },
  { variant: 'h5', label: 'Heading 5' },
  { variant: 'h6', label: 'Heading 6' },
] as const;

const bodyVariants = [
  { variant: 'subtitle1', label: 'Subtitle 1', description: 'Large subtitle text' },
  { variant: 'subtitle2', label: 'Subtitle 2', description: 'Small subtitle text' },
  { variant: 'body1', label: 'Body 1', description: 'Regular body text' },
  { variant: 'body2', label: 'Body 2', description: 'Small body text' },
  { variant: 'caption', label: 'Caption', description: 'Caption text for images/tables' },
  { variant: 'overline', label: 'Overline', description: 'Uppercase labels' },
] as const;

const colorVariants = [
  { color: 'default', label: 'Default' },
  { color: 'muted', label: 'Muted' },
  { color: 'primary', label: 'Primary' },
  { color: 'secondary', label: 'Secondary' },
  { color: 'positive', label: 'Positive' },
  { color: 'negative', label: 'Negative' },
  { color: 'warning', label: 'Warning' },
  { color: 'info', label: 'Info' },
] as const;
</script>

<template>
  <PageContainer title="Typography" subtitle="Typography variants, colors, and styles">
    <div class="column q-gutter-y-lg">
      <!-- Headings Section -->
      <Card title="Headings">
        <template #header-right>
          <span class="text-caption text-muted-foreground">h1 through h6 heading levels</span>
        </template>
        <div class="column q-gutter-y-md">
          <div v-for="item in headingVariants" :key="item.variant" class="column q-gutter-y-xs">
            <Typography :variant="item.variant">{{ item.label }} - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="caption" color="muted">{{ item.variant }}</Typography>
          </div>
        </div>
      </Card>

      <!-- Body Text Section -->
      <Card title="Body Text">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Subtitles, body, caption, and overline</span>
        </template>
        <div class="column q-gutter-y-lg">
          <div v-for="item in bodyVariants" :key="item.variant" class="column q-gutter-y-xs">
            <div class="row items-center q-gutter-x-md">
              <Typography :variant="item.variant">{{ item.label }} - The quick brown fox jumps over the lazy dog</Typography>
            </div>
            <Typography variant="caption" color="muted">{{ item.variant }} - {{ item.description }}</Typography>
          </div>
        </div>
      </Card>

      <!-- Colors Section -->
      <Card title="Colors">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Text color variants</span>
        </template>
        <div class="column q-gutter-y-md">
          <div v-for="item in colorVariants" :key="item.color" class="column q-gutter-y-xs">
            <Typography variant="body1" :color="item.color">
              {{ item.label }} - The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography variant="caption" color="muted">color="{{ item.color }}"</Typography>
          </div>
        </div>
      </Card>

      <!-- Modifiers Section -->
      <Card title="Modifiers">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Bold, italic, and truncate</span>
        </template>
        <div class="column q-gutter-y-lg">
          <!-- Bold -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle2" bold>Bold Text</Typography>
            <Typography variant="body1" bold>The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="caption" color="muted">bold prop makes text bold</Typography>
          </div>

          <!-- Italic -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle2" bold>Italic Text</Typography>
            <Typography variant="body1" italic>The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="caption" color="muted">italic prop makes text italic</Typography>
          </div>

          <!-- Truncate -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle2" bold>Truncate Text</Typography>
            <div style="max-width: 300px;">
              <Typography variant="body1" truncate>
                The quick brown fox jumps over the lazy dog. This is a very long text that will be truncated with ellipsis.
              </Typography>
            </div>
            <Typography variant="caption" color="muted">truncate prop adds ellipsis to overflowing text</Typography>
          </div>

          <!-- Combined -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle2" bold>Combined Modifiers</Typography>
            <Typography variant="body1" bold italic color="primary">
              Bold, italic, and colored text
            </Typography>
            <Typography variant="caption" color="muted">Multiple modifiers can be combined</Typography>
          </div>
        </div>
      </Card>

      <!-- Real-world Example -->
      <Card title="Real-world Example">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Typical usage in a page</span>
        </template>
        <div class="column q-gutter-y-md">
          <Typography variant="h3">Article Title</Typography>
          <Typography variant="subtitle1" color="muted">Published on January 18, 2026 by John Doe</Typography>
          
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris.
          </Typography>

          <Typography variant="h5">Section Heading</Typography>
          <Typography variant="body1">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>

          <Typography variant="caption" color="muted">
            Caption text: Image source attribution or additional information
          </Typography>
        </div>
      </Card>

      <!-- Custom Tag Section -->
      <Card title="Custom HTML Tag">
        <template #header-right>
          <span class="text-caption text-muted-foreground">Override default semantic tags</span>
        </template>
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-sm">
            <Typography variant="h4" tag="span">Heading 4 rendered as span</Typography>
            <Typography variant="caption" color="muted">variant="h4" tag="span"</Typography>
          </div>

          <div class="column q-gutter-y-sm">
            <Typography variant="body1" tag="div">Body text rendered as div</Typography>
            <Typography variant="caption" color="muted">variant="body1" tag="div"</Typography>
          </div>
        </div>
      </Card>

      <!-- No Margins Section -->
      <Card title="No Margins">
        <template #header-right>
          <span class="text-caption text-muted-foreground">All typography elements have no margin</span>
        </template>
        <div class="column q-gutter-y-md">
          <Typography variant="body1" color="muted">
            All typography elements have their default margins removed. This allows you to control 
            spacing using Quasar's spacing utilities (q-mt-*, q-mb-*, q-my-*, q-gutter-*) or 
            parent layout components.
          </Typography>
          
          <div class="q-pa-md bg-muted" style="border: 1px dashed var(--color-border);">
            <Typography variant="h5">No top margin</Typography>
            <Typography variant="body1">No bottom margin either</Typography>
            <Typography variant="caption" color="muted">Precise control over spacing</Typography>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
