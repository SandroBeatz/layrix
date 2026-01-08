<script setup lang="ts">
import type { SidebarMenuItem as SidebarMenuItemType } from '../model/types';

const props = withDefaults(
  defineProps<{
    item: SidebarMenuItemType;
    isSubmenu?: boolean;
  }>(),
  {
    isSubmenu: false,
  },
);

const handleClick = () => {
  if (props.item.action) {
    props.item.action();
  }
};
</script>

<template>
  <q-item
    v-if="!item.submenu"
    clickable
    v-ripple
    :to="item.to"
    :href="item.external ? item.externalLink : undefined"
    :target="item.external ? '_blank' : undefined"
    :disable="item.disable"
    :class="['sidebar-item', { 'sidebar-item--submenu': isSubmenu }]"
    @click="handleClick"
  >
    <q-item-section v-if="item.icon && !isSubmenu" avatar class="sidebar-item__avatar">
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section class="relative-position">
      <div v-if="isSubmenu" class="submenu-indicator"></div>
      {{ item.label }}
    </q-item-section>

    <q-item-section v-if="item.caption" side>
      <q-item-label caption>{{ item.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.sidebar-item {
  &__avatar {
    min-width: 40px;
  }

  &--submenu {
    padding-left: 56px; // Отступ для submenu items

    .submenu-indicator {
      position: absolute;
      left: -26px;
      top: 50%;
      transform: translateY(-50%);
      height: 7px;
      width: 7px;
      border: 1px solid var(--color-muted-foreground);
      border-radius: 6px;
    }
  }
}
</style>
