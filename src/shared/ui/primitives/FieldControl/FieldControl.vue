<script setup lang="ts">
import { computed, provide } from 'vue';
import type { FieldControlProps } from './FieldControl.types';

/**
 * FieldControl Component
 * Wraps form controls (Input, Select, etc.) with a consistent label + field layout
 *
 * ## Quasar QInput Label Research Findings:
 * - QInput extends QField which renders as a `<label>` tag by default
 * - The `label` prop in QInput renders text INSIDE the field (floating label style)
 * - QInput does NOT use semantic HTML label with `for` attribute for accessibility
 * - Instead, it uses `aria-label` attribute on the input element
 *
 * ## Chosen Approach:
 * We use an external `<label for="...">` element that points to the inner input's ID.
 * This is the standard HTML form approach and provides proper accessibility:
 * - Screen readers will correctly associate label with input
 * - Clicking label will focus the input
 * - We generate a unique ID and provide it to child components via provide/inject
 *
 * @example
 * // Basic usage
 * <FieldControl label="Email">
 *   <Input v-model="email" type="email" placeholder="Enter email" />
 * </FieldControl>
 *
 * @example
 * // Required field
 * <FieldControl label="Password" required>
 *   <Input v-model="password" type="password" />
 * </FieldControl>
 */

const props = withDefaults(defineProps<FieldControlProps>(), {
  required: false,
});

// Generate unique ID for the field
const fieldId = computed(() => {
  return props.id ?? `field-${Math.random().toString(36).substring(2, 9)}`;
});

// Provide the field ID to slotted components
// Slotted components can inject this ID to set their own ID attribute
provide('fieldControlId', fieldId);
</script>

<template>
  <div class="field-control">
    <label v-if="label" :for="fieldId" class="field-control__label">
      {{ label }}
      <span v-if="required" class="field-control__required" aria-label="required">*</span>
    </label>
    <div class="field-control__field">
      <slot :id="fieldId" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.field-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-control__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-foreground);
  cursor: pointer;
  user-select: none;
}

.field-control__required {
  color: var(--color-negative);
  margin-left: 2px;
}

.field-control__field {
  width: 100%;
}
</style>
