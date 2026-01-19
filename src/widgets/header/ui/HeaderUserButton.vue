<script setup lang="ts">
import { Dropdown, type DropdownContent } from '@shared/ui';

// User menu items
const userMenuItems: DropdownContent[] = [
  {
    icon: 'person',
    label: 'Profile',
    caption: 'View and edit your profile',
    onClick: () => console.log('Profile clicked'),
  },
  {
    icon: 'settings',
    label: 'Settings',
    caption: 'Manage your preferences',
    onClick: () => console.log('Settings clicked'),
  },
  {
    type: 'separator',
  },
  {
    icon: 'help',
    label: 'Help & Support',
    onClick: () => console.log('Help clicked'),
  },
  {
    type: 'separator',
  },
  {
    icon: 'logout',
    label: 'Sign Out',
    onClick: () => console.log('Sign Out clicked'),
  },
];
</script>

<template>
  <Dropdown :items="userMenuItems" :max-width="'280px'">
    <template #trigger>
      <q-item clickable dense class="header-user-button">
        <q-item-section avatar class="header-user-button__avatar">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>
      </q-item>
    </template>

    <template #before>
      <div class="header-user-button__info">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">John Doe</q-item-label>
            <q-item-label caption>john.doe@example.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
    </template>
  </Dropdown>
</template>

<style scoped lang="scss">
.header-user-button {
  padding: 4px;
  border-radius: $button-rounded-border-radius;

  &__avatar {
    min-width: 0;
    padding: 0;
  }

  &__name {
    padding: 0 10px;
  }

  &:hover {
    .q-focus-helper {
      background: transparent;
    }
  }
}
</style>
