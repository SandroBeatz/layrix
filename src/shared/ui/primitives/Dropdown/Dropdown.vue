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
import { ref, computed } from 'vue'
import { useScreen } from '@shared/lib/device'
import type { DropdownProps, DropdownEmits, DropdownItem, DropdownContent, DropdownSection, DropdownSeparator } from './Dropdown.types'

const props = withDefaults(defineProps<DropdownProps>(), {
  items: () => [],
  showCancelButton: true,
  cancelButtonText: 'Cancel',
  maxWidth: '280px',
  modelValue: false,
  transitionShow: 'jump-down',
  transitionHide: 'jump-up'
})

const emit = defineEmits<DropdownEmits>()

const { isMobileBreakpoint } = useScreen()
const isOpen = ref(props.modelValue)

// Watch for modelValue changes
const internalModel = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : isOpen.value,
  set: (value: boolean) => {
    isOpen.value = value
    emit('update:modelValue', value)
  }
})

// Determine if item is a regular item, separator, or section
function isItem(content: DropdownContent): content is DropdownItem {
  return !('type' in content)
}

function isSeparator(content: DropdownContent): content is DropdownSeparator {
  return 'type' in content && content.type === 'separator'
}

function isSection(content: DropdownContent): content is DropdownSection {
  return 'type' in content && content.type === 'section'
}

// Handle item click
function handleItemClick(item: DropdownItem) {
  emit('item-click', item)
  
  if (item.onClick) {
    item.onClick()
  }

  // Close dropdown if closeOnClick is true (default)
  if (item.closeOnClick !== false) {
    internalModel.value = false
  }
}

// Handle cancel on mobile
function handleCancel() {
  internalModel.value = false
}
</script>

<template>
  <div class="dropdown">
    <!-- Trigger slot - wraps the trigger element -->
    <div class="dropdown__trigger" @click="internalModel = true">
      <slot name="trigger" />
    </div>

    <!-- Desktop: QMenu -->
    <q-menu
      v-if="!isMobileBreakpoint"
      v-model="internalModel"
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
        <template v-for="(content, index) in items" :key="index">
          <!-- Regular item -->
          <q-item
            v-if="isItem(content)"
            clickable
            :disable="content.disabled"
            :class="content.class"
            @click="handleItemClick(content)"
          >
            <q-item-section v-if="content.icon" avatar>
              <q-icon :name="content.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ content.label }}</q-item-label>
              <q-item-label v-if="content.caption" caption>
                {{ content.caption }}
              </q-item-label>
            </q-item-section>

            <q-item-section v-if="content.endIcon || content.end" side>
              <q-icon v-if="content.endIcon" :name="content.endIcon" />
              <span v-else-if="content.end">{{ content.end }}</span>
            </q-item-section>
          </q-item>

          <!-- Separator -->
          <q-separator v-else-if="isSeparator(content)" />

          <!-- Section -->
          <template v-else-if="isSection(content)">
            <q-item-label v-if="content.caption" header>
              {{ content.caption }}
            </q-item-label>

            <q-item
              v-for="(item, itemIndex) in content.items"
              :key="`section-${index}-item-${itemIndex}`"
              clickable
              :disable="item.disabled"
              :class="item.class"
              @click="handleItemClick(item)"
            >
              <q-item-section v-if="item.icon" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label v-if="item.caption" caption>
                  {{ item.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section v-if="item.endIcon || item.end" side>
                <q-icon v-if="item.endIcon" :name="item.endIcon" />
                <span v-else-if="item.end">{{ item.end }}</span>
              </q-item-section>
            </q-item>
          </template>
        </template>

        <!-- After slot -->
        <div v-if="$slots.after" class="dropdown__after">
          <slot name="after" />
        </div>
      </q-list>
    </q-menu>

    <!-- Mobile: QDialog (Bottom Sheet) -->
    <q-dialog
      v-else
      v-model="internalModel"
      position="bottom"
      class="dropdown__dialog"
    >
      <q-card class="dropdown__sheet">
        <!-- Before slot -->
        <q-card-section v-if="$slots.before" class="dropdown__before">
          <slot name="before" />
        </q-card-section>

        <!-- Items -->
        <q-list>
          <template v-for="(content, index) in items" :key="index">
            <!-- Regular item -->
            <q-item
              v-if="isItem(content)"
              clickable
              :disable="content.disabled"
              :class="content.class"
              @click="handleItemClick(content)"
            >
              <q-item-section v-if="content.icon" avatar>
                <q-icon :name="content.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ content.label }}</q-item-label>
                <q-item-label v-if="content.caption" caption>
                  {{ content.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section v-if="content.endIcon || content.end" side>
                <q-icon v-if="content.endIcon" :name="content.endIcon" />
                <span v-else-if="content.end">{{ content.end }}</span>
              </q-item-section>
            </q-item>

            <!-- Separator -->
            <q-separator v-else-if="isSeparator(content)" />

            <!-- Section -->
            <template v-else-if="isSection(content)">
              <q-item-label v-if="content.caption" header>
                {{ content.caption }}
              </q-item-label>

              <q-item
                v-for="(item, itemIndex) in content.items"
                :key="`section-${index}-item-${itemIndex}`"
                clickable
                :disable="item.disabled"
                :class="item.class"
                @click="handleItemClick(item)"
              >
                <q-item-section v-if="item.icon" avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ item.label }}</q-item-label>
                  <q-item-label v-if="item.caption" caption>
                    {{ item.caption }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="item.endIcon || item.end" side>
                  <q-icon v-if="item.endIcon" :name="item.endIcon" />
                  <span v-else-if="item.end">{{ item.end }}</span>
                </q-item-section>
              </q-item>
            </template>
          </template>
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
