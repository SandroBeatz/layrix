<script setup lang="ts">
import { PageContainer, Card, Typography } from '@shared/ui';

// Typography variants for demo
const headingVariants = [
  { value: 'h1', label: 'Heading 1', as: 'h1' },
  { value: 'h2', label: 'Heading 2', as: 'h2' },
  { value: 'h3', label: 'Heading 3', as: 'h3' },
  { value: 'h4', label: 'Heading 4', as: 'h4' },
  { value: 'h5', label: 'Heading 5', as: 'h5' },
  { value: 'h6', label: 'Heading 6', as: 'h6' },
] as const;

const textVariants = [
  { value: 'subtitle', label: 'Subtitle', as: 'p' },
  { value: 'body', label: 'Body', as: 'p' },
  { value: 'caption', label: 'Caption', as: 'p' },
  { value: 'overline', label: 'Overline', as: 'p' },
] as const;

const weights = [
  { value: 'light', label: 'Light (300)' },
  { value: 'regular', label: 'Regular (400)' },
  { value: 'medium', label: 'Medium (500)' },
  { value: 'semibold', label: 'Semibold (600)' },
  { value: 'bold', label: 'Bold (700)' },
] as const;

const alignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
] as const;

const colors = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'accent', label: 'Accent' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
] as const;
</script>

<template>
  <PageContainer title="Typography" subtitle="Text styles, variants, and typography components">
    <div class="column q-gutter-y-lg">
      <!-- Headings Section -->
      <Card title="Headings" caption="All heading levels h1 - h6">
        <div class="column q-gutter-y-md">
          <div v-for="variant in headingVariants" :key="variant.value" class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">
              {{ variant.label }}
            </Typography>
            <Typography :variant="variant.value" :as="variant.as">
              {{ variant.label }} - The quick brown fox jumps over the lazy dog
            </Typography>
          </div>
        </div>
      </Card>

      <!-- Text Variants Section -->
      <Card title="Text Variants" caption="Subtitle, body, caption, and overline">
        <div class="column q-gutter-y-md">
          <div v-for="variant in textVariants" :key="variant.value" class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">
              {{ variant.label }}
            </Typography>
            <Typography :variant="variant.value" :as="variant.as">
              {{ variant.label }} - The quick brown fox jumps over the lazy dog
            </Typography>
          </div>
        </div>
      </Card>

      <!-- Muted Variants Section -->
      <Card title="Muted Variants" caption="Using --color-text-muted for secondary content">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Normal vs Muted</Typography>
            <div class="column q-gutter-y-sm">
              <Typography variant="body">Body text - Normal color</Typography>
              <Typography variant="body-muted">Body text - Muted color</Typography>
            </div>
          </div>

          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Subtitle Muted</Typography>
            <Typography variant="subtitle">Subtitle - Normal</Typography>
            <Typography variant="subtitle-muted">Subtitle - Muted</Typography>
          </div>

          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Caption Muted</Typography>
            <Typography variant="caption">Caption - Normal</Typography>
            <Typography variant="caption-muted">Caption - Muted</Typography>
          </div>

          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Overline Muted</Typography>
            <Typography variant="overline">Overline - Normal</Typography>
            <Typography variant="overline-muted">Overline - Muted</Typography>
          </div>
        </div>
      </Card>

      <!-- Font Weights Section -->
      <Card title="Font Weights" caption="Light, regular, medium, semibold, and bold">
        <div class="column q-gutter-y-md">
          <div v-for="weight in weights" :key="weight.value" class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">
              {{ weight.label }}
            </Typography>
            <Typography variant="body" :weight="weight.value">
              {{ weight.label }} - The quick brown fox jumps over the lazy dog
            </Typography>
          </div>
        </div>
      </Card>

      <!-- Text Alignment Section -->
      <Card title="Text Alignment" caption="Left, center, right, and justify">
        <div class="column q-gutter-y-md">
          <div v-for="alignment in alignments" :key="alignment.value" class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">
              {{ alignment.label }}
            </Typography>
            <Typography variant="body" :align="alignment.value">
              {{ alignment.label }} - The quick brown fox jumps over the lazy dog
            </Typography>
          </div>
        </div>
      </Card>

      <!-- Colors Section -->
      <Card title="Text Colors" caption="Using color prop for semantic colors">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Default Colors</Typography>
            <div class="column q-gutter-y-sm">
              <Typography variant="body">Default text color (--color-text)</Typography>
              <Typography variant="body" color="muted-foreground">
                Muted text color (--color-text-muted)
              </Typography>
            </div>
          </div>

          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Semantic Colors</Typography>
            <div class="column q-gutter-y-sm">
              <Typography
                v-for="color in colors"
                :key="color.value"
                variant="body"
                :color="color.value"
              >
                {{ color.label }} - The quick brown fox jumps over the lazy dog
              </Typography>
            </div>
          </div>
        </div>
      </Card>

      <!-- Blockquote Section -->
      <Card title="Blockquote" caption="Styled quotations">
        <div class="column q-gutter-y-md">
          <Typography variant="blockquote" as="blockquote">
            "The only way to do great work is to love what you do. If you haven't found it yet, keep
            looking. Don't settle." — Steve Jobs
          </Typography>
          <Typography variant="blockquote" as="blockquote">
            "Design is not just what it looks like and feels like. Design is how it works." — Steve
            Jobs
          </Typography>
        </div>
      </Card>

      <!-- Combined Examples Section -->
      <Card title="Combined Examples" caption="Combining variants, weights, and colors">
        <div class="column q-gutter-y-lg">
          <!-- Example 1: Article Header -->
          <div class="column q-gutter-y-sm">
            <Typography variant="overline" color="primary">Technology</Typography>
            <Typography variant="h3" as="h3" weight="semibold">
              Understanding Modern Web Development
            </Typography>
            <Typography variant="subtitle-muted">Published on January 18, 2026</Typography>
            <Typography variant="body">
              Modern web development has evolved significantly over the years. With frameworks like
              Vue and Quasar, building complex applications has become more accessible than ever.
            </Typography>
          </div>

          <!-- Example 2: Card Content -->
          <div class="column q-gutter-y-sm">
            <Typography variant="h5" as="h5" weight="medium">Feature Highlights</Typography>
            <Typography variant="body">
              This component system provides a comprehensive set of typography options:
            </Typography>
            <ul class="q-pl-lg">
              <li>
                <Typography variant="body">Multiple heading levels (h1-h6)</Typography>
              </li>
              <li>
                <Typography variant="body"
                  >Text variants (subtitle, body, caption, overline)</Typography
                >
              </li>
              <li>
                <Typography variant="body">Muted variants for secondary content</Typography>
              </li>
              <li>
                <Typography variant="body">Customizable weights, colors, and alignment</Typography>
              </li>
            </ul>
          </div>

          <!-- Example 3: Status Messages -->
          <div class="column q-gutter-y-sm">
            <Typography variant="h6" as="h6" weight="medium">Status Messages</Typography>
            <Typography variant="body" color="positive"
              >✓ Operation completed successfully</Typography
            >
            <Typography variant="body" color="warning"
              >⚠ Warning: Please review your changes</Typography
            >
            <Typography variant="body" color="negative">✗ Error: Something went wrong</Typography>
            <Typography variant="body" color="info">ℹ Information: Update available</Typography>
          </div>
        </div>
      </Card>

      <!-- Usage Examples Section -->
      <Card title="Usage Examples" caption="Code examples">
        <div class="column q-gutter-y-md">
          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">Basic Usage</Typography>
            <pre
              class="bg-muted q-pa-md"
              style="border-radius: 8px; overflow-x: auto"
            ><code>&lt;Typography variant="h1" as="h1"&gt;Heading 1&lt;/Typography&gt;
&lt;Typography variant="body"&gt;Body text&lt;/Typography&gt;
&lt;Typography variant="caption-muted"&gt;Muted caption&lt;/Typography&gt;</code></pre>
          </div>

          <div class="column q-gutter-y-xs">
            <Typography variant="caption" color="muted-foreground">With Props</Typography>
            <pre
              class="bg-muted q-pa-md"
              style="border-radius: 8px; overflow-x: auto"
            ><code>&lt;Typography variant="h2" weight="bold" align="center"&gt;
  Centered Bold Heading
&lt;/Typography&gt;

&lt;Typography variant="body" color="primary"&gt;
  Primary colored text
&lt;/Typography&gt;</code></pre>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
