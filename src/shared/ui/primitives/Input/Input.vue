<script setup lang="ts">
import { computed } from 'vue';
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
 *
 * @example
 * // Input with size variant
 * <Input v-model="value" size="lg" label="Large Input" />
 */

const props = withDefaults(defineProps<InputProps>(), {
  size: 'md',
});

// Compute CSS class name based on the size prop for applying size-specific styling
const sizeClass = computed(() => {
  return `input-size-${props.size}`;
});

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
      :class="sizeClass"
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

// Custom input size variants
// Defines three size options with appropriate dimensions and typography
.input-size-sm {
  :deep(.q-field__control) {
    height: 36px;
    min-height: 36px;
  }

  :deep(.q-field__marginal) {
    height: 36px;
  }

  :deep(.q-field__native) {
    font-size: 13px;
    padding: 6px 12px;
  }

  :deep(.q-field__label) {
    font-size: 13px;
  }
}

.input-size-md {
  :deep(.q-field__control) {
    height: 46px;
    min-height: 46px;
  }

  :deep(.q-field__marginal) {
    height: 46px;
  }

  :deep(.q-field__native) {
    font-size: 14px;
    padding: 8px 14px;
  }

  :deep(.q-field__label) {
    font-size: 14px;
  }
}

.input-size-lg {
  :deep(.q-field__control) {
    height: 56px;
    min-height: 56px;
  }

  :deep(.q-field__marginal) {
    height: 56px;
  }

  :deep(.q-field__native) {
    font-size: 16px;
    padding: 10px 16px;
  }

  :deep(.q-field__label) {
    font-size: 16px;
  }
}
</style>
