<script setup lang="ts">
import { ref } from 'vue'
import {
  tabHome, tabStar, tabSettings, tabUser, tabShield, tabBell,
  tabPencil, tabCopy, tabShare, tabTrash, tabLayoutDashboard, tabLogout,
  tabBook, tabLifebuoy, tabFolder, tabFolderOpen, tabFolderPlus,
  tabBookmark, tabChevronRight, tabMail, tabBrandSlack,
} from 'quasar-extras-svg-icons/tabler-icons-v2'
import { PageContainer, Dropdown, Button, Card, Typography, Avatar, ListItem, type DropdownContent } from '@shared/ui'

// Example 1: Basic Dropdown
const basicItems: DropdownContent[] = [
  { icon: tabHome,     label: 'Home',      onClick: () => console.log('Home clicked') },
  { icon: tabStar,     label: 'Favorites', onClick: () => console.log('Favorites clicked') },
  { icon: tabSettings, label: 'Settings',  onClick: () => console.log('Settings clicked') },
]

// Example 2: Dropdown with captions
const captionItems: DropdownContent[] = [
  { icon: tabUser,   label: 'Profile',       caption: 'View and edit your profile',         onClick: () => console.log('Profile clicked') },
  { icon: tabShield, label: 'Privacy',       caption: 'Manage your privacy settings',       onClick: () => console.log('Privacy clicked') },
  { icon: tabBell,   label: 'Notifications', caption: 'Configure notification preferences', onClick: () => console.log('Notifications clicked') },
]

// Example 3: Dropdown with separators
const separatorItems: DropdownContent[] = [
  { icon: tabPencil, label: 'Edit',      onClick: () => console.log('Edit clicked') },
  { icon: tabCopy,   label: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
  { type: 'separator' },
  { icon: tabShare, label: 'Share',  onClick: () => console.log('Share clicked') },
  { type: 'separator' },
  { icon: tabTrash, label: 'Delete', onClick: () => console.log('Delete clicked') },
]

// Example 4: Dropdown with sections
const sectionItems: DropdownContent[] = [
  {
    type: 'section',
    caption: 'Account',
    items: [
      { icon: tabUser,     label: 'Profile',  onClick: () => console.log('Profile clicked') },
      { icon: tabSettings, label: 'Settings', onClick: () => console.log('Settings clicked') },
    ],
  },
  { type: 'separator' },
  {
    type: 'section',
    caption: 'Help',
    items: [
      { icon: tabBook,      label: 'Documentation', onClick: () => console.log('Docs clicked') },
      { icon: tabLifebuoy,  label: 'Support',        onClick: () => console.log('Support clicked') },
    ],
  },
  { type: 'separator' },
  { icon: tabLogout, label: 'Sign Out', onClick: () => console.log('Sign Out clicked') },
]

// Example 5: Dropdown with end icons / shortcuts
const endIconItems: DropdownContent[] = [
  { icon: tabFolder,   label: 'Projects',  endIcon: tabChevronRight, onClick: () => console.log('Projects clicked') },
  { icon: tabBookmark, label: 'Bookmarks', endIcon: tabChevronRight, onClick: () => console.log('Bookmarks clicked') },
  { icon: tabStar,     label: 'Favorites', end: '⌘F',               onClick: () => console.log('Favorites clicked') },
]

// Example 6: Dropdown with submenus
const submenuItems: DropdownContent[] = [
  {
    icon: tabFolder,
    label: 'Projects',
    children: [
      { icon: tabFolderOpen, label: 'Open Project', onClick: () => console.log('Open Project') },
      { icon: tabFolderPlus, label: 'New Project',  onClick: () => console.log('New Project') },
      { type: 'separator' },
      {
        icon: tabFolder,
        label: 'Recent',
        children: [
          { label: 'Layrix v2',        onClick: () => console.log('Layrix v2') },
          { label: 'Design System',    onClick: () => console.log('Design System') },
          { label: 'Marketing Site',   onClick: () => console.log('Marketing Site') },
        ],
      },
    ],
  },
  {
    icon: tabShare,
    label: 'Share',
    children: [
      { icon: tabBrandSlack, label: 'Slack',       onClick: () => console.log('Slack') },
      { icon: tabMail,       label: 'Email',       onClick: () => console.log('Email') },
    ],
  },
  { type: 'separator' },
  { icon: tabTrash, label: 'Delete', onClick: () => console.log('Delete clicked') },
]

// Example 7: Dropdown with before/after slots
const accountItems: DropdownContent[] = [
  { icon: tabLayoutDashboard, label: 'Dashboard', onClick: () => console.log('Dashboard clicked') },
  { type: 'separator' },
  { icon: tabUser,     label: 'Profile',  onClick: () => console.log('Profile clicked') },
  { icon: tabSettings, label: 'Settings', onClick: () => console.log('Settings clicked') },
  { type: 'separator' },
  { icon: tabLogout, label: 'Sign Out', onClick: () => console.log('Sign Out clicked') },
]

// Example 8: Controlled dropdown
const controlledOpen = ref(false)
const controlledItems: DropdownContent[] = [
  { label: 'Option 1', onClick: () => console.log('Option 1 clicked') },
  { label: 'Option 2', onClick: () => console.log('Option 2 clicked') },
  { label: 'Option 3 (stays open)', closeOnClick: false, onClick: () => console.log('Option 3 clicked – stays open') },
]
</script>

<template>
  <PageContainer>
    <template #header>
      <Typography variant="h4" weight="bold">Dropdown Component</Typography>
      <Typography variant="body" class="q-mt-sm">
        Universal dropdown that adapts to device type. On desktop it shows as a popup menu with submenu support.
        On mobile (resize the browser to test) it appears as a bottom sheet with drill-down navigation.
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
          <Typography variant="caption">Organized sections with caption headers</Typography>
        </template>

        <Dropdown :items="sectionItems">
          <template #trigger>
            <Button variant="primary">Menu with Sections</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 5: End Icons / Keyboard Shortcuts -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">End Icons &amp; Shortcuts</Typography>
          <Typography variant="caption">Items can have icons or shortcut text at the end</Typography>
        </template>

        <Dropdown :items="endIconItems">
          <template #trigger>
            <Button variant="primary">Menu with End Icons</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 6: Submenus -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Submenus</Typography>
          <Typography variant="caption">
            Desktop: hover a ▶ item to open a nested menu.
            Mobile: tap a ▶ item to drill into it; use the ← back button to return.
          </Typography>
        </template>

        <Dropdown :items="submenuItems">
          <template #trigger>
            <Button variant="primary">Menu with Submenus</Button>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 7: Custom Before/After Slots -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">Custom Content Slots</Typography>
          <Typography variant="caption">Using before and after slots for custom content</Typography>
        </template>

        <Dropdown :items="accountItems" max-width="300px">
          <template #trigger>
            <Button variant="secondary">
              <Avatar
                src="https://cdn.quasar.dev/img/avatar4.jpg"
                size="sm"
                class="q-mr-xs"
              />
              John Doe
            </Button>
          </template>

          <template #before>
            <ListItem
              label="John Doe"
              caption="john.doe@example.com"
            >
              <template #prepend>
                <Avatar src="https://cdn.quasar.dev/img/avatar4.jpg" size="md" />
              </template>
            </ListItem>
          </template>

          <template #after>
            <div class="text-center q-py-sm">
              <Typography variant="caption">Version 1.0.0</Typography>
            </div>
          </template>
        </Dropdown>
      </Card>

      <!-- Example 8: Controlled Dropdown -->
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

      <!-- Mobile behaviour info -->
      <Card>
        <template #header>
          <Typography variant="h6" weight="medium">📱 Mobile Behaviour</Typography>
        </template>

        <Typography variant="body">
          On mobile devices all dropdowns transform into bottom sheets.
          Resize your browser window to see the responsive behaviour.
        </Typography>

        <Typography variant="body" class="q-mt-md">The bottom sheet includes:</Typography>
        <ul>
          <li>Slide-up animation</li>
          <li>Drag-to-close gesture support</li>
          <li>Drill-down navigation for submenus with animated slide transitions</li>
          <li>Back button with current submenu title</li>
          <li>Optional Cancel button (enabled by default)</li>
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
