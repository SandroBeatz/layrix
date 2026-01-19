<script setup lang="ts">
import { ref } from 'vue'
import { PageContainer, Dropdown, Button, Card, Typography, type DropdownContent } from '@shared/ui'

// Example 1: Basic Dropdown
const basicItems: DropdownContent[] = [
  {
    icon: 'home',
    label: 'Home',
    onClick: () => console.log('Home clicked')
  },
  {
    icon: 'favorite',
    label: 'Favorites',
    onClick: () => console.log('Favorites clicked')
  },
  {
    icon: 'settings',
    label: 'Settings',
    onClick: () => console.log('Settings clicked')
  }
]

// Example 2: Dropdown with captions
const captionItems: DropdownContent[] = [
  {
    icon: 'person',
    label: 'Profile',
    caption: 'View and edit your profile',
    onClick: () => console.log('Profile clicked')
  },
  {
    icon: 'security',
    label: 'Privacy',
    caption: 'Manage your privacy settings',
    onClick: () => console.log('Privacy clicked')
  },
  {
    icon: 'notifications',
    label: 'Notifications',
    caption: 'Configure notification preferences',
    onClick: () => console.log('Notifications clicked')
  }
]

// Example 3: Dropdown with separators
const separatorItems: DropdownContent[] = [
  {
    icon: 'edit',
    label: 'Edit',
    onClick: () => console.log('Edit clicked')
  },
  {
    icon: 'content_copy',
    label: 'Duplicate',
    onClick: () => console.log('Duplicate clicked')
  },
  {
    type: 'separator'
  },
  {
    icon: 'share',
    label: 'Share',
    onClick: () => console.log('Share clicked')
  },
  {
    type: 'separator'
  },
  {
    icon: 'delete',
    label: 'Delete',
    onClick: () => console.log('Delete clicked')
  }
]

// Example 4: Dropdown with sections
const sectionItems: DropdownContent[] = [
  {
    type: 'section',
    caption: 'Account',
    items: [
      {
        icon: 'person',
        label: 'Profile',
        onClick: () => console.log('Profile clicked')
      },
      {
        icon: 'settings',
        label: 'Settings',
        onClick: () => console.log('Settings clicked')
      }
    ]
  },
  {
    type: 'separator'
  },
  {
    type: 'section',
    caption: 'Help',
    items: [
      {
        icon: 'help',
        label: 'Documentation',
        onClick: () => console.log('Documentation clicked')
      },
      {
        icon: 'support',
        label: 'Support',
        onClick: () => console.log('Support clicked')
      }
    ]
  },
  {
    type: 'separator'
  },
  {
    icon: 'logout',
    label: 'Sign Out',
    onClick: () => console.log('Sign Out clicked')
  }
]

// Example 5: Dropdown with end icons
const endIconItems: DropdownContent[] = [
  {
    icon: 'folder',
    label: 'Projects',
    endIcon: 'chevron_right',
    onClick: () => console.log('Projects clicked')
  },
  {
    icon: 'bookmark',
    label: 'Bookmarks',
    endIcon: 'chevron_right',
    onClick: () => console.log('Bookmarks clicked')
  },
  {
    icon: 'star',
    label: 'Favorites',
    end: '⌘F',
    onClick: () => console.log('Favorites clicked')
  }
]

// Example 6: Dropdown with before/after slots
const accountItems: DropdownContent[] = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    onClick: () => console.log('Dashboard clicked')
  },
  {
    type: 'separator'
  },
  {
    icon: 'person',
    label: 'Profile',
    onClick: () => console.log('Profile clicked')
  },
  {
    icon: 'settings',
    label: 'Settings',
    onClick: () => console.log('Settings clicked')
  },
  {
    type: 'separator'
  },
  {
    icon: 'logout',
    label: 'Sign Out',
    onClick: () => console.log('Sign Out clicked')
  }
]

// Example 7: Controlled dropdown
const controlledOpen = ref(false)
const controlledItems: DropdownContent[] = [
  {
    label: 'Option 1',
    onClick: () => console.log('Option 1 clicked')
  },
  {
    label: 'Option 2',
    onClick: () => console.log('Option 2 clicked')
  },
  {
    label: 'Option 3 (stays open)',
    closeOnClick: false,
    onClick: () => console.log('Option 3 clicked - dropdown stays open')
  }
]
</script>

<template>
  <PageContainer>
    <template #header>
      <Typography variant="h4" weight="bold">Dropdown Component</Typography>
      <Typography variant="body" class="q-mt-sm">
        Universal dropdown component that adapts to device type. On desktop, it shows as a regular dropdown menu.
        On mobile (resize your browser to test), it appears as a bottom sheet.
      </Typography>
    </template>

    <div class="q-gutter-lg">
      <!-- Example 1: Basic Dropdown -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Basic Dropdown</Typography>
          <Typography variant="caption">Simple dropdown with icons and labels</Typography>
        </template>

        <Dropdown :items="basicItems">
          <template #trigger>
            <Button variant="primary">Basic Menu</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 2: Dropdown with Captions -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Dropdown with Captions</Typography>
          <Typography variant="caption">Each item has a descriptive caption below the label</Typography>
        </template>

        <Dropdown :items="captionItems">
          <template #trigger>
            <Button variant="primary">Menu with Captions</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 3: Dropdown with Separators -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Dropdown with Separators</Typography>
          <Typography variant="caption">Visual separators to group related items</Typography>
        </template>

        <Dropdown :items="separatorItems">
          <template #trigger>
            <Button variant="primary">Menu with Separators</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 4: Dropdown with Sections -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Dropdown with Sections</Typography>
          <Typography variant="caption">Organized sections with captions</Typography>
        </template>

        <Dropdown :items="sectionItems">
          <template #trigger>
            <Button variant="primary">Menu with Sections</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 5: Dropdown with End Icons -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Dropdown with End Icons</Typography>
          <Typography variant="caption">Items can have icons or text at the end</Typography>
        </template>

        <Dropdown :items="endIconItems">
          <template #trigger>
            <Button variant="primary">Menu with End Icons</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 6: Dropdown with Before/After Slots -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Dropdown with Custom Content</Typography>
          <Typography variant="caption">Using before and after slots for custom content</Typography>
        </template>

        <Dropdown :items="accountItems">
          <template #trigger>
            <Button variant="primary">
              <q-avatar size="24px" class="q-mr-sm">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
              John Doe
            </Button>
          </template>

          <template #before>
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
            <q-separator class="q-my-sm" />
          </template>

          <template #after>
            <q-separator class="q-my-sm" />
            <div class="q-pa-md text-center">
              <Typography variant="caption" class="text-grey-6">
                Version 1.0.0
              </Typography>
            </div>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 7: Controlled Dropdown -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Controlled Dropdown</Typography>
          <Typography variant="caption">Control dropdown state with v-model</Typography>
        </template>

        <div class="q-gutter-sm">
          <Dropdown v-model="controlledOpen" :items="controlledItems">
            <template #trigger>
              <Button variant="primary">{{ controlledOpen ? 'Close' : 'Open' }} Menu</Button>
            </template>
          </Dropdown>

          <Button variant="secondary" @click="controlledOpen = !controlledOpen">
            Toggle from outside
          </Button>

          <Typography variant="caption" class="q-mt-sm">
            Current state: {{ controlledOpen ? 'Open' : 'Closed' }}
          </Typography>
        </div>
      </Card>

      <!-- Mobile Bottom Sheet Info -->
      <Card variant="default">
        <template #header>
          <Typography variant="h6" weight="medium">📱 Mobile Behavior</Typography>
        </template>

        <Typography variant="body">
          On mobile devices (smaller screens), all dropdowns automatically transform into bottom sheets.
          Try resizing your browser window to see the responsive behavior in action!
        </Typography>

        <Typography variant="body" class="q-mt-md">
          The bottom sheet includes:
        </Typography>
        <ul>
          <li>Slide-up animation</li>
          <li>Drag-to-close gesture support</li>
          <li>Optional Cancel button (enabled by default)</li>
          <li>Full-width layout optimized for touch</li>
        </ul>
      </Card>
    </div>
  </PageContainer>
</template>

<style scoped lang="scss">
.q-gutter-lg > * {
  margin-bottom: 24px;
}

ul {
  margin-top: 8px;
  padding-left: 24px;
}

li {
  margin-bottom: 4px;
}
</style>
