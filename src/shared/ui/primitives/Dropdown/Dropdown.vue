<!--
  Universal Dropdown Component

  Purpose: A flexible dropdown that adapts to device type
  - Desktop: Regular dropdown using QMenu with submenu support
  - Mobile: Bottom sheet using QDialog with drill-down navigation for submenus

  Features:
  - Trigger slot for custom trigger elements
  - Before/after slots for custom content
  - Support for list items with icons, captions, and end content
  - Separators and section captions
  - Nested submenus (desktop: QMenu hover, mobile: animated drill-down)
  - Responsive behavior (auto-switches between menu and bottom sheet)
-->

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useScreen } from '@shared/lib/device';
import { tabChevronLeft } from 'quasar-extras-svg-icons/tabler-icons-v2';
import DropdownListItems from './DropdownListItems.vue';
import type { DropdownProps, DropdownEmits, DropdownItem, DropdownContent } from './Dropdown.types';

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

// ── Mobile navigation stack ────────────────────────────────────────────────
// Each entry is an array of DropdownContent items (a submenu level)
const mobileStack = ref<DropdownContent[][]>([]);
const mobileStackTitles = ref<string[]>([]);

// How long the QDialog close animation takes (ms) — stack reset is delayed by this
const DIALOG_CLOSE_ANIMATION_MS = 350;

// Slide direction for the transition
const slideTransition = ref<'slide-forward' | 'slide-back'>('slide-forward');

const isMobileSubmenu = computed(() => mobileStack.value.length > 0);

const currentMobileItems = computed((): DropdownContent[] => {
  const stack = mobileStack.value;
  if (stack.length === 0) return props.items;
  return stack.at(-1) ?? props.items;
});

const currentMobileTitle = computed((): string | null => {
  return mobileStackTitles.value.at(-1) ?? null;
});

// Reset navigation stack whenever the dialog closes
watch(isOpen, (open) => {
  if (!open) {
    // Delay to allow the dialog close animation to finish
    setTimeout(() => {
      mobileStack.value = [];
      mobileStackTitles.value = [];
    }, DIALOG_CLOSE_ANIMATION_MS);
  }
});
// ──────────────────────────────────────────────────────────────────────────

// Handle item click (desktop and mobile non-submenu)
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

// Mobile: navigate into a submenu level
function handleMobileSubmenuNavigate(item: DropdownItem) {
  if (!item.children?.length) return;
  slideTransition.value = 'slide-forward';
  mobileStack.value = [...mobileStack.value, item.children];
  mobileStackTitles.value = [...mobileStackTitles.value, item.label];
}

// Mobile: navigate back one level
function handleMobileBack() {
  slideTransition.value = 'slide-back';
  mobileStack.value = mobileStack.value.slice(0, -1);
  mobileStackTitles.value = mobileStackTitles.value.slice(0, -1);
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

    <!-- Desktop: QMenu with submenu support -->
    <q-menu
      v-if="!isMobileBreakpoint"
      v-model="isOpen"
      no-parent-event
      :transition-show="transitionShow"
      :transition-hide="transitionHide"
      class="dropdown__menu"
    >
      <div :style="{ maxWidth }">
        <!-- Before slot -->
        <div v-if="$slots.before" class="dropdown__before">
          <slot name="before" />
        </div>

        <!-- Render items (DropdownListItems handles desktop submenus internally) -->
        <DropdownListItems :items="items" @item-click="handleItemClick" />

        <!-- After slot -->
        <div v-if="$slots.after" class="dropdown__after">
          <slot name="after" />
        </div>
      </div>
    </q-menu>

    <!-- Mobile: QDialog (Bottom Sheet) with drill-down navigation -->
    <q-dialog v-else v-model="isOpen" position="bottom" class="dropdown__dialog">
      <q-card class="dropdown__sheet">

        <!-- Back-button header (visible when inside a submenu) -->
        <transition name="fade-header">
          <div v-if="isMobileSubmenu" class="dropdown__back-header">
            <q-btn
              flat
              round
              dense
              :icon="tabChevronLeft"
              class="dropdown__back-btn"
              @click="handleMobileBack"
            />
            <span class="dropdown__back-title">{{ currentMobileTitle }}</span>
          </div>
        </transition>

        <q-separator v-if="isMobileSubmenu" />

        <!-- Before slot (only on root level) -->
        <q-card-section v-if="$slots.before && !isMobileSubmenu" class="dropdown__before">
          <slot name="before" />
        </q-card-section>

        <!-- Animated items area (slides left/right on submenu navigation) -->
        <div class="dropdown__items-wrap">
          <transition :name="slideTransition" mode="out-in">
            <div :key="mobileStack.length">
              <DropdownListItems
                :items="currentMobileItems"
                :mobile="true"
                @item-click="handleItemClick"
                @submenu-navigate="handleMobileSubmenuNavigate"
              />
            </div>
          </transition>
        </div>

        <!-- After slot (only on root level) -->
        <q-card-section v-if="$slots.after && !isMobileSubmenu" class="dropdown__after">
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
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
  }

  &__sheet {
    border-radius: 16px 16px 0 0;
    max-height: 80vh;
    overflow: hidden;
    width: 100%;
  }

  // Back-button navigation header
  &__back-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    min-height: 48px;
  }

  &__back-btn {
    flex-shrink: 0;
  }

  &__back-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-foreground);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // Items wrapper — needed for the slide transition to measure height
  &__items-wrap {
    overflow: hidden;
  }

  &__before,
  &__after {
    padding: 8px 16px;
  }
}

// ── Slide transitions (mobile submenu drill-down) ──────────────────────────

.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition:
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

// Forward: old slides left, new enters from right
.slide-forward-enter-from {
  transform: translateX(28px);
  opacity: 0;
}
.slide-forward-leave-to {
  transform: translateX(-28px);
  opacity: 0;
}

// Back: old slides right, new enters from left
.slide-back-enter-from {
  transform: translateX(-28px);
  opacity: 0;
}
.slide-back-leave-to {
  transform: translateX(28px);
  opacity: 0;
}

// Fade for the back-header appearing/disappearing
.fade-header-enter-active,
.fade-header-leave-active {
  transition: opacity 0.18s ease;
}
.fade-header-enter-from,
.fade-header-leave-to {
  opacity: 0;
}
</style>
