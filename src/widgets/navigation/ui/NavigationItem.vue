<script setup lang="ts">
import { ref, computed } from 'vue';
import type { NavigationMenuItem as NavigationMenuItemType } from '../model/types';
import { useRouter } from 'vue-router';

interface Props {
  item: NavigationMenuItemType;
  isActive?: boolean;
  mobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  mobile: false,
});

const router = useRouter();
const menuOpen = ref(false);

const hasSubmenu = computed(() => props.item.submenu && props.item.submenu.length > 0);

const handleItemClick = () => {
  if (props.item.action) {
    props.item.action();
  } else if (props.item.to) {
    void router.push(props.item.to);
  } else if (props.item.externalLink) {
    window.open(props.item.externalLink, props.item.external ? '_blank' : '_self');
  }
};

const handleSubmenuClick = (subitem: NavigationMenuItemType) => {
  if (subitem.to) {
    void router.push(subitem.to);
    menuOpen.value = false;
  } else if (subitem.action) {
    subitem.action();
    menuOpen.value = false;
  }
};
</script>

<template>
  <!-- Mobile Navigation Item -->
  <template v-if="mobile">
    <q-expansion-item
      v-if="hasSubmenu"
      :label="item.label"
      :icon="item.icon"
      :disable="item.disable"
      class="nav-item-mobile"
    >
      <q-list>
        <q-item
          v-for="(subitem, index) in item.submenu"
          :key="index"
          clickable
          :disable="subitem.disable"
          :to="subitem.to"
          class="nav-subitem-mobile"
        >
          <q-item-section>{{ subitem.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-item
      v-else
      clickable
      :disable="item.disable"
      :to="item.to"
      :active="isActive"
      class="nav-item-mobile"
      @click="handleItemClick"
    >
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </template>

  <!-- Desktop Navigation Item -->
  <template v-else>
    <div
      v-if="hasSubmenu"
      class="nav-item"
      :class="{ 'nav-item--active': isActive }"
    >
      <q-btn
        flat
        no-caps
        :label="item.label"
        :icon-right="hasSubmenu ? 'keyboard_arrow_down' : undefined"
        :disable="item.disable"
        class="nav-item__button"
      >
        <q-menu
          v-model="menuOpen"
          anchor="bottom left"
          self="top left"
          :offset="[0, 8]"
          class="nav-dropdown"
        >
          <q-list class="nav-dropdown__list">
            <q-item
              v-for="(subitem, index) in item.submenu"
              :key="index"
              clickable
              :disable="subitem.disable"
              class="nav-dropdown__item"
              @click="handleSubmenuClick(subitem)"
            >
              <q-item-section>{{ subitem.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div
      v-else
      class="nav-item"
      :class="{ 'nav-item--active': isActive }"
    >
      <q-btn
        flat
        no-caps
        :label="item.label"
        :icon="item.icon"
        :disable="item.disable"
        :to="item.to"
        class="nav-item__button"
        @click="handleItemClick"
      />
    </div>
  </template>
</template>

<style scoped lang="scss">
.nav-item {
  display: inline-block;
  position: relative;

  &__button {
    color: var(--color-foreground);
    font-weight: 500;
    padding: 8px 16px;
    min-height: 40px;

    &:hover {
      background-color: var(--color-accent);
    }
  }

  &--active {
    .nav-item__button {
      color: var(--color-primary);
    }
  }
}

:global(.nav-dropdown) {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;

  .nav-dropdown__list {
    padding: 4px;
  }

  .nav-dropdown__item {
    border-radius: calc(var(--border-radius) - 2px);
    padding: 8px 12px;
    min-height: 36px;
    color: var(--color-foreground);

    &:hover {
      background-color: var(--color-accent);
    }
  }
}

.nav-item-mobile {
  color: var(--color-foreground);
  min-height: 48px;

  &:hover {
    background-color: var(--color-accent);
  }
}

.nav-subitem-mobile {
  padding-left: 32px;
  min-height: 44px;
  color: var(--color-muted-foreground);

  &:hover {
    background-color: var(--color-accent);
    color: var(--color-foreground);
  }
}
</style>
