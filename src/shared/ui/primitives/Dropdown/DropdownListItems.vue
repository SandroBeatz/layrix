<!--
  Dropdown List Items Component
  
  Internal component for rendering dropdown items
  Used by both desktop (QMenu) and mobile (QDialog) versions
-->

<script setup lang="ts">
import type { DropdownContent, DropdownItem, DropdownSection, DropdownSeparator } from './Dropdown.types'
import { Icon } from '../Icon'

interface Props {
  items: DropdownContent[]
}

interface Emits {
  (e: 'item-click', item: DropdownItem): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

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

function handleItemClick(item: DropdownItem) {
  emit('item-click', item)
}
</script>

<template>
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
        <Icon :name="content.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ content.label }}</q-item-label>
        <q-item-label v-if="content.caption" caption>
          {{ content.caption }}
        </q-item-label>
      </q-item-section>

      <q-item-section v-if="content.endIcon || content.end" side>
        <Icon v-if="content.endIcon" :name="content.endIcon" />
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
          <Icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-item-label v-if="item.caption" caption>
            {{ item.caption }}
          </q-item-label>
        </q-item-section>

        <q-item-section v-if="item.endIcon || item.end" side>
          <Icon v-if="item.endIcon" :name="item.endIcon" />
          <span v-else-if="item.end">{{ item.end }}</span>
        </q-item-section>
      </q-item>
    </template>
  </template>
</template>
