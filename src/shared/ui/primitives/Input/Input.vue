<script setup lang="ts">
import { QInput } from 'quasar';
import type { InputProps } from './Input.types';

/**
 * Input Component
 * Opinionated wrapper around Quasar QInput
 *
 * @example
 * // Basic text input
 * <Input v-model="name" label="Name" placeholder="Enter your name" />
 *
 * @example
 * // Email input with icon
 * <Input v-model="email" type="email" label="Email" icon="ti-mail" />
 *
 * @example
 * // Password input with error
 * <Input
 *   v-model="password"
 *   type="password"
 *   label="Password"
 *   :error="hasError"
 *   error-message="Password is required"
 * />
 *
 * @example
 * // Clearable search input
 * <Input v-model="search" type="search" placeholder="Search..." clearable />
 */

defineProps<InputProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  clear: [];
}>();

// Handle model value update
const handleInput = (value: string | number | null) => {
  emit('update:modelValue', value ?? '');
};

// Handle blur event
const handleBlur = (event: Event) => {
  emit('blur', event as FocusEvent);
};

// Handle focus event
const handleFocus = (event: Event) => {
  emit('focus', event as FocusEvent);
};

// Handle clear event
const handleClear = () => {
  emit('clear');
};
</script>

<template>
  <div class="">
    <span v-if="label">{{ label }}</span>
    <QInput
      class="input"
      outlined
      hide-bottom-space
      :name="name"
      :dense="dense"
      :type="type"
      :placeholder="placeholder"
      :disable="disable"
      :error="error"
      :error-message="errorMessage"
      :clearable="clearable"
      :readonly="readonly"
      :rules="rules"
      :lazy-rules="lazyRules"
      :reactive-rules="reactiveRules"
      :model-value="modelValue"
      :hint="hint"
      :mask="mask"
      :fill-mask="fillMask"
      @update:model-value="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @clear="handleClear"
    >
      <!-- Icon slot -->
      <template v-if="$slots.prepend || icon" #prepend>
        <q-icon v-if="icon" :name="icon" />
<!--        <div class="left-marginal"></div>-->
        <slot name="prepend" />
      </template>

      <!-- Pass through default slot for custom content -->
      <template v-if="$slots.default" #default>
        <slot />
      </template>

      <!-- Pass through append slot -->
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </QInput>
  </div>
</template>

<style scoped lang="scss">
.left-marginal {
  display: flex;
  flex: 1;
  background: var(--color-muted);
  padding: 4px;
}
</style>
