<script setup lang="ts">
import { ref } from 'vue';
import { PageContainer, Input, Card, Typography, FieldControl } from '@shared/ui';
import { tabMail, tabSearch, tabLock, tabUser } from 'quasar-extras-svg-icons/tabler-icons-v2';

const textValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
const searchValue = ref('');
const numberValue = ref('');
const phoneValue = ref('');

// Size variant examples
const smallValue = ref('');
const mediumValue = ref('');
const largeValue = ref('');

// FieldControl examples
const fieldControlEmail = ref('');
const fieldControlPassword = ref('');
const fieldControlOptional = ref('');

// Textarea examples
const textareaValue = ref('');
const textareaAutogrowValue = ref('');
const textareaFixedValue = ref('');

// Password toggle examples
const passwordToggleValue = ref('');
const passwordToggleWithIconValue = ref('');

// Disabled examples
const disabledText = ref('This field is disabled');
const disabledEmail = ref('disabled@example.com');
const disabledPassword = ref('password123');

// Readonly examples
const readonlyText = ref('This field is readonly');
const readonlyEmail = ref('readonly@example.com');
const readonlyPassword = ref('password123');

// Before/After slot examples
const beforeAfterValue = ref('');
const customSlotValue = ref('');

// Error examples
const errorValue = ref('');
const errorWithMessageValue = ref('');
const validationValue = ref('');
const emailErrorValue = ref('');
</script>

<template>
  <PageContainer title="Inputs" subtitle="All input variants, types, sizes and states">
    <div class="column q-gutter-y-lg">
      <!-- Basic Inputs Section -->
      <Card title="Basic Inputs" caption="Different input types">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Text Input">
            <Input v-model="textValue" placeholder="Enter text..." />
          </FieldControl>
          <FieldControl label="Email Input" required>
            <Input
              v-model="emailValue"
              type="email"
              placeholder="email@example.com"
              :icon="tabMail"
            />
          </FieldControl>
          <FieldControl label="Password Input" required>
            <Input
              v-model="passwordValue"
              type="password"
              placeholder="Enter password..."
              :icon="tabLock"
            />
          </FieldControl>
          <FieldControl label="Search Input">
            <Input
              v-model="searchValue"
              type="search"
              placeholder="Search..."
              clearable
              :icon="tabSearch"
            />
          </FieldControl>
          <FieldControl label="Number Input">
            <Input
              v-model="numberValue"
              type="number"
              placeholder="Enter number..."
            />
          </FieldControl>
          <FieldControl label="Phone Input">
            <Input
              v-model="phoneValue"
              type="tel"
              placeholder="(---) --- ---"
              mask="(###) ### - ###"
              fill-mask
              hint="Mask: (###) ### - ###"
            >
              <template #prepend>
                <Typography variant="caption-muted">+996</Typography>
              </template>
            </Input>
          </FieldControl>
        </div>
      </Card>

      <!-- Size Variants Section -->
      <Card title="Size Variants" caption="Small, Medium, and Large input sizes">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Small Input">
            <Input
              v-model="smallValue"
              size="sm"
              placeholder="Small size input..."
              :icon="tabMail"
            />
          </FieldControl>
          <FieldControl label="Medium Input (Default)">
            <Input
              v-model="mediumValue"
              size="md"
              placeholder="Medium size input..."
              :icon="tabMail"
            />
          </FieldControl>
          <FieldControl label="Large Input">
            <Input
              v-model="largeValue"
              size="lg"
              placeholder="Large size input..."
              :icon="tabMail"
            />
          </FieldControl>
        </div>
      </Card>

      <!-- Textarea Section -->
      <Card title="Textarea" caption="Multi-line text input with autogrow support">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Basic Textarea">
            <Input
              v-model="textareaValue"
              textarea
              placeholder="Enter your message..."
              rows="3"
            />
          </FieldControl>
          <FieldControl label="Textarea with Autogrow">
            <Input
              v-model="textareaAutogrowValue"
              textarea
              autogrow
              placeholder="This textarea will grow with your content..."
            />
          </FieldControl>
          <FieldControl label="Fixed Height Textarea">
            <Input
              v-model="textareaFixedValue"
              textarea
              placeholder="5 rows fixed height"
              rows="5"
            />
          </FieldControl>
        </div>
      </Card>

      <!-- Password Toggle Section -->
      <Card title="Password Toggle" caption="Password fields with visibility toggle">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Password with Toggle" required>
            <Input
              v-model="passwordToggleValue"
              type="password"
              toggle-password
              placeholder="Enter password..."
            />
          </FieldControl>
          <FieldControl label="Password with Icon and Toggle" required>
            <Input
              v-model="passwordToggleWithIconValue"
              type="password"
              toggle-password
              :icon="tabLock"
              placeholder="Enter password..."
            />
          </FieldControl>
        </div>
      </Card>

      <!-- Disabled Section -->
      <Card title="Disabled State" caption="Disabled inputs (non-interactive)">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Disabled Text">
            <Input
              v-model="disabledText"
              disable
              placeholder="This is disabled"
            />
          </FieldControl>
          <FieldControl label="Disabled Email">
            <Input
              v-model="disabledEmail"
              type="email"
              disable
              :icon="tabMail"
            />
          </FieldControl>
          <FieldControl label="Disabled Password">
            <Input
              v-model="disabledPassword"
              type="password"
              disable
              :icon="tabLock"
            />
          </FieldControl>
        </div>
      </Card>

      <!-- Readonly Section -->
      <Card title="Readonly State" caption="Readonly inputs (viewable but not editable)">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Readonly Text">
            <Input
              v-model="readonlyText"
              readonly
              placeholder="This is readonly"
            />
          </FieldControl>
          <FieldControl label="Readonly Email">
            <Input
              v-model="readonlyEmail"
              type="email"
              readonly
              :icon="tabMail"
            />
          </FieldControl>
          <FieldControl label="Readonly Password">
            <Input
              v-model="readonlyPassword"
              type="password"
              readonly
              :icon="tabLock"
            />
          </FieldControl>
        </div>
      </Card>

      <!-- Before/After Slots Section -->
      <Card title="Before/After Slots" caption="Content outside the input border">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Input with Before Slot">
            <Input v-model="beforeAfterValue" placeholder="Enter amount...">
              <template #before>
                <Typography variant="body-sm" class="q-mr-sm">Price:</Typography>
              </template>
            </Input>
          </FieldControl>
          <FieldControl label="Input with After Slot">
            <Input v-model="beforeAfterValue" placeholder="Enter amount...">
              <template #after>
                <Typography variant="body-sm" class="q-ml-sm">USD</Typography>
              </template>
            </Input>
          </FieldControl>
          <FieldControl label="Input with Both Slots">
            <Input v-model="customSlotValue" placeholder="0.00" :icon="tabUser">
              <template #before>
                <Typography variant="body-sm" class="q-mr-sm">$</Typography>
              </template>
              <template #after>
                <Typography variant="body-sm" class="q-ml-sm">.00</Typography>
              </template>
            </Input>
          </FieldControl>
        </div>
      </Card>

      <!-- Error State Section -->
      <Card title="Error State" caption="Validation and error messages">
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Input with Error" required>
            <Input
              v-model="errorValue"
              :error="true"
              placeholder="This field has an error"
            />
          </FieldControl>
          <FieldControl label="Input with Error Message" required>
            <Input
              v-model="errorWithMessageValue"
              :error="true"
              error-message="This field is required"
              placeholder="Enter value..."
            />
          </FieldControl>
          <FieldControl label="Email with Validation Error" required>
            <Input
              v-model="emailErrorValue"
              type="email"
              :icon="tabMail"
              :error="true"
              error-message="Please enter a valid email address"
              placeholder="email@example.com"
            />
          </FieldControl>
          <FieldControl label="Required Field (Empty)" required>
            <Input
              v-model="validationValue"
              :error="validationValue === ''"
              error-message="This field cannot be empty"
              placeholder="Required field..."
            />
          </FieldControl>
        </div>
      </Card>

      <!-- FieldControl Section -->
      <Card
        title="FieldControl Wrapper"
        caption="Semantic label + field wrapper with required indicator"
      >
        <div class="column q-gutter-md" style="max-width: 600px">
          <FieldControl label="Email Address" required>
            <Input
              v-model="fieldControlEmail"
              type="email"
              placeholder="email@example.com"
              :icon="tabMail"
            />
          </FieldControl>

          <FieldControl label="Password" required>
            <Input
              v-model="fieldControlPassword"
              type="password"
              toggle-password
              placeholder="Enter your password"
              :icon="tabLock"
            />
          </FieldControl>

          <FieldControl label="Optional Field">
            <Input
              v-model="fieldControlOptional"
              placeholder="This field is optional"
            />
          </FieldControl>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
