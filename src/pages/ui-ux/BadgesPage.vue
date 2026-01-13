<script setup lang="ts">
import { PageContainer, Badge, Card, Button } from '@shared/ui';

// Badge variants for demo
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
  { value: 'ghost', label: 'Ghost' },
] as const;
</script>

<template>
  <PageContainer title="Badges" subtitle="Status indicators, labels, and notification badges">
    <div class="column q-gutter-y-lg">
      <!-- Color Variants Section -->
      <Card title="Color Variants" caption="Different badge color variants">
        <div class="row q-gutter-md items-center flex-wrap">
          <Badge
            v-for="variant in variants"
            :key="variant.value"
            :variant="variant.value"
            :label="variant.label"
          />
        </div>
      </Card>

      <!-- Appearance Styles Section -->
      <Card title="Appearance Styles" caption="Fill, outline and ghost styles">
        <div class="column q-gutter-y-lg">
          <div v-for="variant in variants" :key="variant.value" class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">{{ variant.label }}</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge
                v-for="appearance in appearances"
                :key="appearance.value"
                :variant="variant.value"
                :appearance="appearance.value"
                :label="appearance.label"
              />
            </div>
          </div>
        </div>
      </Card>

      <!-- Pill Badges Section -->
      <Card title="Pill Badges" caption="Fully rounded pill-shaped badges">
        <div class="column q-gutter-y-md">
          <!-- Fill Pills -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Fill Pills</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge
                v-for="variant in variants"
                :key="variant.value"
                :variant="variant.value"
                pill
                :label="variant.label"
              />
            </div>
          </div>
          <!-- Outline Pills -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Outline Pills</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge
                v-for="variant in variants"
                :key="variant.value"
                :variant="variant.value"
                appearance="outline"
                pill
                :label="variant.label"
              />
            </div>
          </div>
          <!-- Ghost Pills -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Ghost Pills</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge
                v-for="variant in variants"
                :key="variant.value"
                :variant="variant.value"
                appearance="ghost"
                pill
                :label="variant.label"
              />
            </div>
          </div>
        </div>
      </Card>

      <!-- Dot Indicators Section -->
      <Card title="Dot Indicators" caption="Small dot indicators for status">
        <div class="row q-gutter-lg items-center flex-wrap">
          <div
            v-for="variant in variants"
            :key="variant.value"
            class="row items-center q-gutter-sm"
          >
            <Badge :variant="variant.value" dot />
            <span>{{ variant.label }}</span>
          </div>
        </div>
      </Card>

      <!-- With Numbers Section -->
      <Card title="With Numbers" caption="Notification counters and numeric badges">
        <div class="column q-gutter-y-lg">
          <!-- Small Numbers -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Small Numbers</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="primary" :label="3" />
              <Badge variant="secondary" :label="5" />
              <Badge variant="positive" :label="1" />
              <Badge variant="negative" :label="8" />
              <Badge variant="warning" :label="12" />
              <Badge variant="info" :label="7" />
            </div>
          </div>
          <!-- Large Numbers -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Large Numbers</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="primary" label="99+" />
              <Badge variant="info" :label="142" />
              <Badge variant="warning" :label="999" />
              <Badge variant="negative" label="1000+" />
            </div>
          </div>
          <!-- Pills with Numbers -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Pill Style with Numbers</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="primary" :label="3" pill />
              <Badge variant="negative" :label="99" pill />
              <Badge variant="positive" label="New" pill />
              <Badge variant="warning" :label="15" pill />
            </div>
          </div>
        </div>
      </Card>

      <!-- Usage Examples Section -->
      <Card title="Usage Examples" caption="Real-world usage scenarios">
        <div class="column q-gutter-y-lg">
          <!-- Status Labels -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Status Labels</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="positive" label="Active" />
              <Badge variant="warning" label="Pending" />
              <Badge variant="negative" label="Inactive" />
              <Badge variant="info" label="Draft" />
              <Badge variant="secondary" label="Archived" />
            </div>
          </div>
          <!-- Tags/Categories -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Tags/Categories</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="primary" label="Design" appearance="ghost" />
              <Badge variant="secondary" label="Development" appearance="ghost" />
              <Badge variant="info" label="Marketing" appearance="ghost" />
              <Badge variant="warning" label="Research" appearance="ghost" />
              <Badge variant="positive" label="Testing" appearance="ghost" />
            </div>
          </div>
          <!-- Pill Status Labels -->
          <div class="column q-gutter-y-sm">
            <div class="text-subtitle2 text-weight-medium">Pill Status Labels</div>
            <div class="row q-gutter-md items-center flex-wrap">
              <Badge variant="positive" label="Approved" pill />
              <Badge variant="negative" label="Rejected" pill />
              <Badge variant="warning" label="Under Review" pill />
              <Badge variant="info" label="In Progress" pill />
            </div>
          </div>
        </div>
      </Card>

      <!-- Floating Badges Section -->
      <Card title="Floating Badges" caption="Badges overlaying other elements ">
        <div class="row q-gutter-xl items-center flex-wrap">
          <!-- Example with button -->
          <div style="position: relative; display: inline-block">
            <Button>Messages</Button>
            <Badge variant="negative" :label="5" floating />
          </div>
          <div style="position: relative; display: inline-block">
            <Button variant="secondary">Notifications</Button>
            <Badge variant="primary" :label="12" floating />
          </div>
          <div style="position: relative; display: inline-block">
            <Button icon="notifications" icon-only />
            <Badge variant="negative" dot floating />
          </div>
          <div style="position: relative; display: inline-block">
            <Button icon="mail" icon-only variant="secondary" />
            <Badge variant="primary" :label="3" floating />
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
