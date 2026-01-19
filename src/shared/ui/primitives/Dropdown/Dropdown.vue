<!--
  Universal Dropdown Component

  Purpose: A flexible dropdown that adapts to device type
  - Desktop: Regular dropdown using QMenu
  - Mobile: Bottom sheet using QDialog

  Features:
  - Trigger slot for custom trigger elements
  - Before/after slots for custom content
  - Support for list items with icons, captions, and end content
  - Separators and section captions
  - Responsive behavior (auto-switches between menu and bottom sheet)
-->

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useScreen } from '@shared/lib/device';
import DropdownListItems from './DropdownListItems.vue';
import type { DropdownProps, DropdownEmits, DropdownItem } from './Dropdown.types';

const props = withDefaults(defineProps<DropdownProps>(), {
  items: () => [],
  showCancelButton: true,
  cancelButtonText: 'Cancel',
  maxWidth: '280px',
  transitionShow: 'jump-down',
  transitionHide: 'jump-up',
});

const emit = defineEmits<DropdownEmits>();

const { isMobileBreakpoint } = useScreen();

// Internal state for dropdown open/close
const isOpen = ref(props.modelValue ?? false);

// Sync with external modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue != null) {
      isOpen.value = newValue;
    }
  }
);

// Emit changes to parent
watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

// Handle item click
function handleItemClick(item: DropdownItem) {
  emit('item-click', item);

  if (item.onClick) {
    item.onClick();
  }

  // Close dropdown if closeOnClick is true (default)
  if (item.closeOnClick !== false) {
    isOpen.value = false;
  }
}

// Handle cancel on mobile
function handleCancel() {
  isOpen.value = false;
}

function handleOpen() {
  isOpen.value = true;
}
</script>

<template>
  <div class="dropdown">
    <!-- Trigger slot - wraps the trigger element -->
    <div
      class="dropdown__trigger"
      tabindex="0"
      role="button"
      @click.stop="handleOpen"
      @keydown.enter="handleOpen"
      @keydown.space.prevent="handleOpen"
    >
      <slot name="trigger" :trigger="handleOpen" />
    </div>

    <!-- Desktop: QMenu -->
    <q-menu
      v-if="!isMobileBreakpoint"
      v-model="isOpen"
      no-parent-event
      :transition-show="transitionShow"
      :transition-hide="transitionHide"
      class="dropdown__menu"
    >
      <q-list :style="{ maxWidth }">
        <!-- Before slot -->
        <div v-if="$slots.before" class="dropdown__before">
          <slot name="before" />
        </div>

        <!-- Render items -->
        <DropdownListItems :items="items" @item-click="handleItemClick" />

        <!-- After slot -->
        <div v-if="$slots.after" class="dropdown__after">
          <slot name="after" />
        </div>
      </q-list>
    </q-menu>

    <!-- Mobile: QDialog (Bottom Sheet) -->
    <q-dialog v-else v-model="isOpen" position="bottom" class="dropdown__dialog">
      <q-card class="dropdown__sheet">
        <!-- Before slot -->
        <q-card-section v-if="$slots.before" class="dropdown__before">
          <slot name="before" />
        </q-card-section>

        <!-- Items -->
        <q-list>
          <DropdownListItems :items="items" @item-click="handleItemClick" />
        </q-list>

        <!-- After slot -->
        <q-card-section v-if="$slots.after" class="dropdown__after">
          <slot name="after" />
        </q-card-section>

        <!-- Cancel button -->
        <q-card-actions v-if="showCancelButton">
          <q-btn
            flat
            :label="cancelButtonText"
            color="primary"
            class="full-width"
            @click="handleCancel"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  display: inline-block;

  &__trigger {
    cursor: pointer;
  }

  &__menu {
    // Desktop menu styles can be customized here
  }

  &__sheet {
    border-radius: 16px 16px 0 0;
    max-height: 80vh;
    overflow: hidden;
  }

  &__before,
  &__after {
    padding: 8px 16px;
  }
}
</style>
