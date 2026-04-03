<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput } from 'quasar';
import { tabEye, tabEyeOff } from 'quasar-extras-svg-icons/tabler-icons-v2';
import type { InputProps } from './Input.types';
import { Icon } from '../Icon';

/**
 * Input Component
 * Opinionated wrapper around Quasar QInput
 *
 * @example
 * // Basic text input
 * <Input v-model="name" placeholder="Enter your name" />
 *
 * @example
 * // Email input with icon
 * <Input v-model="email" type="email" :icon="tabMail" />
 *
 * @example
 * // Password input with toggle
 * <Input v-model="password" type="password" toggle-password />
 *
 * @example
 * // Textarea with autogrow
 * <Input v-model="bio" textarea autogrow placeholder="Tell us about yourself..." />
 *
 * @example
 * // Input with error
 * <Input
 *   v-model="password"
 *   type="password"
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
 * <Input v-model="value" size="lg" placeholder="Large Input" />
 */

const props = withDefaults(defineProps<InputProps>(), {
  size: 'md',
});

// Password visibility toggle
const isPasswordVisible = ref(false);

// Computed type for password toggle
const computedType = computed(() => {
  if (props.type === 'password' && props.togglePassword && isPasswordVisible.value) {
    return 'text';
  }
  return props.type;
});

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
  <QInput
    class="input"
    :class="sizeClass"
    outlined
    hide-bottom-space
    :name="name"
    :dense="dense"
    :type="textarea ? 'textarea' : computedType"
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
    :autogrow="textarea && autogrow"
    :rows="textarea ? rows : undefined"
    @update:model-value="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
    @clear="handleClear"
  >
    <!-- Before slot (outside the field border) -->
    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>

    <!-- Prepend slot (inside the field border, left side) -->
    <template v-if="$slots.prepend || icon" #prepend>
      <Icon v-if="icon" :name="icon" />
      <slot name="prepend" />
    </template>

    <!-- Pass through default slot for custom content -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <!-- Append slot (inside the field border, right side) -->
    <template #append>
      <!-- Password toggle icon -->
      <Icon
        v-if="type === 'password' && togglePassword"
        :name="isPasswordVisible ? tabEyeOff : tabEye"
        class="cursor-pointer"
        @click="togglePasswordVisibility"
      />
      <slot name="append" />
    </template>

    <!-- After slot (outside the field border) -->
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
  </QInput>
</template>

<style scoped lang="scss">
// Custom input size variants
// Uses shared control tokens for consistency across form controls
.input-size-sm {
  :deep(.q-field__control) {
    height: var(--control-height-sm);
    min-height: var(--control-height-sm);
  }

  :deep(.q-field__marginal) {
    height: var(--control-height-sm);
  }

  :deep(.q-field__native) {
    font-size: var(--control-font-size-sm);
    padding: var(--control-padding-sm) 0;
  }

  :deep(.q-field__label) {
    font-size: var(--control-font-size-sm);
  }
}

.input-size-md {
  :deep(.q-field__control) {
    height: var(--control-height-md);
    min-height: var(--control-height-md);
  }

  :deep(.q-field__marginal) {
    height: var(--control-height-md);
  }

  :deep(.q-field__native) {
    font-size: var(--control-font-size-md);
    padding: var(--control-padding-md) 0;
  }

  :deep(.q-field__label) {
    font-size: var(--control-font-size-md);
  }
}

.input-size-lg {
  :deep(.q-field__control) {
    height: var(--control-height-lg);
    min-height: var(--control-height-lg);
  }

  :deep(.q-field__marginal) {
    height: var(--control-height-lg);
  }

  :deep(.q-field__native) {
    font-size: var(--control-font-size-lg);
    padding: var(--control-padding-lg) 0;
  }

  :deep(.q-field__label) {
    font-size: var(--control-font-size-lg);
  }
}
</style>

