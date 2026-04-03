<!--
  Dropdown List Items Component

  Internal component for rendering dropdown items using List and ListItem.
  Supports recursive submenus:
  - Desktop: nested QMenu (opens on hover/click)
  - Mobile: emits 'submenu-navigate' so the parent dialog can navigate levels
-->

<script setup lang="ts">
import { QMenu, QSeparator, QItemLabel } from 'quasar'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { Icon } from '../Icon'
import type { DropdownContent, DropdownItem, DropdownSection, DropdownSeparator } from './Dropdown.types'
import { tabChevronRight } from 'quasar-extras-svg-icons/tabler-icons-v2'

interface Props {
  items: DropdownContent[]
  /**
   * Mobile mode — clicking an item with children emits 'submenu-navigate'
   * instead of opening a nested QMenu.
   * @default false
   */
  mobile?: boolean
}

const props = withDefaults(defineProps<Props>(), { mobile: false })

const emit = defineEmits<{
  (e: 'item-click', item: DropdownItem): void
  (e: 'submenu-navigate', item: DropdownItem): void
}>()

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
  // Items with children are submenu triggers — handle separately per mode
  if (item.children && item.children.length > 0) {
    if (props.mobile) {
      // Mobile: navigate into the submenu level
      emit('submenu-navigate', item)
    }
    // Desktop: Quasar's QMenu (in the #menu slot) handles the click natively.
    // We must NOT emit 'item-click' here or the parent dropdown would close,
    // collapsing the nested QMenu before it can open.
    return
  }
  emit('item-click', item)
}

function hasEndContent(item: DropdownItem): boolean {
  return item.endIcon !== undefined || item.end !== undefined || (item.children !== undefined && item.children.length > 0)
}

/**
 * Build ListItem-compatible prop object, omitting any undefined values.
 * Required because exactOptionalPropertyTypes: true prevents passing
 * `prop: undefined` for optional `prop?: T` component props.
 */
function itemProps(item: DropdownItem) {
  const result: {
    label: string
    clickable: true
    caption?: string
    disabled?: boolean
  } = { label: item.label, clickable: true }
  if (item.caption !== undefined) result.caption = item.caption
  if (item.disabled !== undefined) result.disabled = item.disabled
  return result
}
</script>

<template>
  <List>
    <template v-for="(content, index) in items" :key="index">
      <!-- Separator -->
      <QSeparator v-if="isSeparator(content)" class="dropdown-items__sep" />

      <!-- Section with optional header -->
      <template v-else-if="isSection(content)">
        <QItemLabel v-if="content.caption" header class="dropdown-items__section-header">
          {{ content.caption }}
        </QItemLabel>

        <ListItem
          v-for="(item, itemIndex) in content.items"
          :key="`s${index}-i${itemIndex}`"
          v-bind="itemProps(item)"
          :class="item.class"
          @click="handleItemClick(item)"
        >
          <template v-if="item.icon" #prepend>
            <Icon :name="item.icon" size="20px" />
          </template>

          <template v-if="hasEndContent(item)" #append>
            <Icon v-if="item.endIcon !== undefined" :name="item.endIcon" size="16px" />
            <Icon v-else-if="item.children && item.children.length > 0" :name="tabChevronRight" size="16px" />
            <span v-else-if="item.end" class="dropdown-items__shortcut">{{ item.end }}</span>
          </template>

          <!-- Desktop: nested submenu via QMenu inside QItem -->
          <template v-if="!mobile && item.children && item.children.length > 0" #menu>
            <QMenu
              anchor="top end"
              self="top start"
              :offset="[2, 0]"
              transition-show="jump-right"
              transition-hide="jump-left"
            >
              <DropdownListItems
                :items="item.children"
                @item-click="emit('item-click', $event)"
              />
            </QMenu>
          </template>
        </ListItem>
      </template>

      <!-- Regular item (with optional submenu) -->
      <ListItem
        v-else-if="isItem(content)"
        v-bind="itemProps(content)"
        :class="content.class"
        @click="handleItemClick(content)"
      >
        <template v-if="content.icon" #prepend>
          <Icon :name="content.icon" size="20px" />
        </template>

        <template v-if="hasEndContent(content)" #append>
          <Icon v-if="content.endIcon !== undefined" :name="content.endIcon" size="16px" />
          <Icon v-else-if="content.children && content.children.length > 0" :name="tabChevronRight" size="16px" />
          <span v-else-if="content.end" class="dropdown-items__shortcut">{{ content.end }}</span>
        </template>

        <!-- Desktop: nested submenu via QMenu inside QItem -->
        <template v-if="!mobile && content.children && content.children.length > 0" #menu>
          <QMenu
            anchor="top end"
            self="top start"
            :offset="[2, 0]"
            transition-show="jump-right"
            transition-hide="jump-left"
          >
            <DropdownListItems
              :items="content.children"
              @item-click="emit('item-click', $event)"
            />
          </QMenu>
        </template>
      </ListItem>
    </template>
  </List>
</template>

<style scoped lang="scss">
.dropdown-items {
  &__sep {
    background-color: var(--color-border);
    opacity: 1;
    margin: 4px 0;
  }

  &__section-header {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    padding-top: 12px;
    padding-bottom: 4px;
  }

  &__shortcut {
    font-size: 0.72rem;
    color: var(--color-text-muted);
    font-family: ui-monospace, SFMono-Regular, monospace;
    letter-spacing: 0;
  }
}
</style>
