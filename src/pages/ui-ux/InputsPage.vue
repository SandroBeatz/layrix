<script setup lang="ts">
import { ref } from 'vue';
import { PageContainer, Input, Card } from '@shared/ui';
import { tabMail, tabSearch, tabLock } from 'quasar-extras-svg-icons/tabler-icons-v2';

const textValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
const searchValue = ref('');
const numberValue = ref('');
const phoneValue = ref('');
</script>

<template>
  <PageContainer title="Inputs" subtitle="All input variants, types, sizes and states">
    <div class="column q-gutter-y-lg">
      <!-- Basic Inputs Section -->
      <Card title="Basic Inputs" caption="Different input types">
        <div class="column q-gutter-md" style="max-width: 600px">
          <Input v-model="textValue" label="Text Input" placeholder="Enter text..." />
          <Input
            v-model="emailValue"
            type="email"
            label="Email Input"
            placeholder="email@example.com"
            :icon="tabMail"
          />
          <Input
            v-model="passwordValue"
            type="password"
            label="Password Input"
            placeholder="Enter password..."
            :icon="tabLock"
          />
          <Input
            v-model="searchValue"
            type="search"
            label="Search Input"
            placeholder="Search..."
            clearable
            :icon="tabSearch"
          />
          <Input
            v-model="numberValue"
            type="number"
            label="Number Input"
            placeholder="Enter number..."
          />
          <Input
            v-model="phoneValue"
            type="tel"
            label="Phone Input"
            placeholder="(---) --- ---"
            mask="(###) ### - ###"
            fill-mask
            hint="Mask: (###) ### - ###"
          >
            <template #prepend>
              <span class="text-caption text-muted-foreground">+996</span>
            </template>
          </Input>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
