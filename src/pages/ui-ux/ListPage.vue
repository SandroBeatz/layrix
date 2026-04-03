<script setup lang="ts">
import {
  tabPencil,
  tabCopy,
  tabLink,
  tabCornerUpRight,
  tabTrash,
  tabChevronRight,
  tabUser,
  tabSettings,
  tabBell,
  tabShield,
  tabCreditCard,
  tabHelp,
  tabLogout,
  tabCheck,
  tabCircleCheck,
  tabStar,
  tabArchive,
  tabShare,
  tabMoodSmile,
  tabPhone,
  tabPhoneCall,
} from 'quasar-extras-svg-icons/tabler-icons-v2';
import { ref } from 'vue';
import { Avatar, Badge, Button, Card, Icon, List, ListItem, PageContainer, Typography } from '@shared/ui';

// ── Context menu items (image 2 style) ──────────────────────────────────────
interface MenuItem {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info';
  hasSubmenu?: boolean;
}

const contextMenuItems: MenuItem[] = [
  { label: 'Rename', icon: tabPencil },
  { label: 'Duplicate', icon: tabCopy },
  { label: 'Copy link', icon: tabLink },
  { label: 'Move to', icon: tabCornerUpRight, hasSubmenu: true },
  { label: 'Delete', icon: tabTrash, variant: 'negative' },
];

// ── Settings menu items ──────────────────────────────────────────────────────
interface SettingsItem {
  label: string;
  caption: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

const settingsItems: SettingsItem[] = [
  { label: 'Profile', caption: 'Manage your personal info', icon: tabUser },
  { label: 'Notifications', caption: 'Configure alerts and reminders', icon: tabBell },
  { label: 'Security', caption: 'Password and 2FA settings', icon: tabShield },
  { label: 'Billing', caption: 'Subscription and payment methods', icon: tabCreditCard },
  { label: 'Preferences', caption: 'Appearance and language', icon: tabSettings },
  { label: 'Help & Support', caption: 'Documentation and contact us', icon: tabHelp },
];

// ── Chat contacts (image 1 style) ────────────────────────────────────────────
interface ChatContact {
  id: number;
  name: string;
  message: string;
  time: string;
  unread?: number;
  status?: 'online' | 'away' | 'busy' | 'offline';
  src?: string;
  initials?: string;
  variant: 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info' | 'regular';
  isTyping?: boolean;
  isMissedCall?: boolean;
  isRead?: boolean;
}

const chatContacts: ChatContact[] = [
  {
    id: 1,
    name: 'Beby Tsabina',
    message: 'So, You need to rewatch lessons 7',
    time: '21.48',
    unread: 4,
    status: 'online',
    src: 'https://randomuser.me/api/portraits/women/1.jpg',
    variant: 'primary',
  },
  {
    id: 2,
    name: 'Mr. Lee',
    message: 'Thank you for ur answer',
    time: '21.15',
    status: 'online',
    src: 'https://randomuser.me/api/portraits/men/2.jpg',
    variant: 'primary',
    isRead: true,
  },
  {
    id: 3,
    name: 'Cut Syifa',
    message: 'Yes, no need images',
    time: '21.10',
    unread: 2,
    status: 'online',
    src: 'https://randomuser.me/api/portraits/women/3.jpg',
    variant: 'secondary',
  },
  {
    id: 4,
    name: 'Raissa Anggraini',
    message: 'Typing ...',
    time: '21.09',
    status: 'away',
    src: 'https://randomuser.me/api/portraits/women/4.jpg',
    variant: 'primary',
    isTyping: true,
  },
  {
    id: 5,
    name: 'Lyodra Ginting',
    message: 'Missed voice call',
    time: '21.08',
    unread: 2,
    status: 'busy',
    src: 'https://randomuser.me/api/portraits/women/5.jpg',
    variant: 'negative',
    isMissedCall: true,
  },
  {
    id: 6,
    name: 'Della Dertyan',
    message: 'Typing ...',
    time: '21.07',
    status: 'online',
    src: 'https://randomuser.me/api/portraits/women/6.jpg',
    variant: 'primary',
    isTyping: true,
  },
  {
    id: 7,
    name: 'Mr. Jackson',
    message: 'Thanks',
    time: '21.04',
    status: 'offline',
    src: 'https://randomuser.me/api/portraits/men/7.jpg',
    variant: 'primary',
    isRead: true,
  },
  {
    id: 8,
    name: 'Merry Jane',
    message: 'yaudah kabari kalo udah',
    time: '21.00',
    status: 'offline',
    initials: 'MJ',
    variant: 'warning',
  },
];

// Status variant mapping
const statusVariantMap = {
  online: 'positive',
  away: 'warning',
  busy: 'negative',
  offline: 'regular',
} as const;

// ── Notifications list ───────────────────────────────────────────────────────
interface NotificationItem {
  id: number;
  title: string;
  caption: string;
  time: string;
  read: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  variant: 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info';
}

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: 'New comment on your post',
    caption: 'John Doe commented: "Great work!"',
    time: '2 min ago',
    read: false,
    icon: tabMoodSmile,
    variant: 'primary',
  },
  {
    id: 2,
    title: 'Pull request approved',
    caption: 'Your PR #245 has been approved by the team',
    time: '15 min ago',
    read: false,
    icon: tabCircleCheck,
    variant: 'positive',
  },
  {
    id: 3,
    title: 'Incoming call',
    caption: 'Missed call from +1 (555) 123-4567',
    time: '1 hr ago',
    read: true,
    icon: tabPhoneCall,
    variant: 'negative',
  },
  {
    id: 4,
    title: 'You have a new follower',
    caption: 'Sarah Wilson started following you',
    time: '3 hr ago',
    read: true,
    icon: tabStar,
    variant: 'warning',
  },
];

// ── File manager list ────────────────────────────────────────────────────────
interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  initials: string;
  variant: 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info' | 'regular';
}

const fileItems: FileItem[] = [
  { id: 1, name: 'Design System v2.fig', type: 'Figma', size: '14.2 MB', modified: 'Today', initials: 'FG', variant: 'secondary' },
  { id: 2, name: 'API Documentation.pdf', type: 'PDF', size: '3.8 MB', modified: 'Yesterday', initials: 'PD', variant: 'negative' },
  { id: 3, name: 'Sprint Report Q4.xlsx', type: 'Excel', size: '1.1 MB', modified: 'Dec 14', initials: 'XL', variant: 'positive' },
  { id: 4, name: 'Brand Assets.zip', type: 'Archive', size: '52.0 MB', modified: 'Dec 10', initials: 'ZP', variant: 'warning' },
  { id: 5, name: 'Release Notes.md', type: 'Markdown', size: '12 KB', modified: 'Dec 8', initials: 'MD', variant: 'info' },
];

// ── Active item demo ─────────────────────────────────────────────────────────
const activeItem = ref(1);

const navItems = [
  { id: 1, label: 'Dashboard', icon: tabSettings },
  { id: 2, label: 'Profile', icon: tabUser },
  { id: 3, label: 'Notifications', icon: tabBell },
  { id: 4, label: 'Security', icon: tabShield },
];
</script>

<template>
  <PageContainer title="Lists" subtitle="List and ListItem components for displaying structured content">
    <div class="column q-gutter-y-lg">

      <!-- ── Context Menu Style (Image 2) ───────────────────────────────── -->
      <Card
        title="Context Menu Style"
        caption="Simple icon + label list similar to a context/action menu"
      >
        <div class="row q-gutter-md">
          <!-- Clean white card variant -->
          <div class="col-12 col-sm-5">
            <List bordered separator>
              <ListItem
                v-for="item in contextMenuItems"
                :key="item.label"
                :label="item.label"
                clickable
                :variant="item.variant ?? 'primary'"
                :class="item.variant === 'negative' ? 'text-negative' : ''"
              >
                <template #prepend>
                  <Icon
                    :name="item.icon"
                    size="20px"
                    :class="item.variant === 'negative' ? 'text-negative' : 'text-muted-foreground'"
                  />
                </template>
                <template v-if="item.hasSubmenu" #append>
                  <Icon :name="tabChevronRight" size="16px" class="text-muted-foreground" />
                </template>
              </ListItem>
            </List>
          </div>
        </div>
      </Card>

      <!-- ── Chat / Contacts List (Image 1) ────────────────────────────── -->
      <Card
        title="Chat Contact List"
        caption="Rich list items with avatar, status badge, message preview, timestamp and unread count"
      >
        <List separator>
          <ListItem
            v-for="contact in chatContacts"
            :key="contact.id"
            :label="contact.name"
            :side-label="contact.time"
            clickable
          >
            <!-- Left: avatar with status dot -->
            <template #prepend>
              <div style="position: relative; display: inline-block">
                <Avatar
                  v-bind="contact.src ? { src: contact.src } : contact.initials ? { text: contact.initials } : {}"
                  :variant="contact.variant === 'regular' ? 'regular' : contact.variant"
                  size="md"
                />
                <Badge
                  v-if="contact.status"
                  :variant="statusVariantMap[contact.status]"
                  dot
                  floating
                  style="bottom: 1px; right: 1px"
                />
              </div>
            </template>

            <!-- Caption: typing / missed call / plain message -->
            <template #caption>
              <span v-if="contact.isTyping" class="text-primary" style="font-style: italic">
                Typing ...
              </span>
              <span v-else-if="contact.isMissedCall" class="text-negative row items-center q-gutter-x-xs">
                <Icon :name="tabPhone" size="14px" />
                <span>Missed voice call</span>
              </span>
              <span v-else>{{ contact.message }}</span>
            </template>

            <!-- Right: unread badge or read double-check -->
            <template #append>
              <div class="column items-center q-gutter-y-xs" style="min-width: 28px">
                <Badge
                  v-if="contact.unread"
                  :label="contact.unread"
                  variant="primary"
                  pill
                />
                <Icon
                  v-else-if="contact.isRead"
                  :name="tabCheck"
                  size="16px"
                  class="text-muted-foreground"
                />
              </div>
            </template>
          </ListItem>
        </List>
      </Card>

      <!-- ── Settings Menu ──────────────────────────────────────────────── -->
      <Card
        title="Settings Menu"
        caption="Icon + label + caption items with right chevron for navigation"
      >
        <List separator>
          <ListItem
            v-for="item in settingsItems"
            :key="item.label"
            :label="item.label"
            :caption="item.caption"
            clickable
          >
            <template #prepend>
              <div
                class="row items-center justify-center bg-muted"
                style="width: 36px; height: 36px; border-radius: 8px"
              >
                <Icon :name="item.icon" size="20px" class="text-primary" />
              </div>
            </template>
            <template #append>
              <Icon :name="tabChevronRight" size="18px" class="text-muted-foreground" />
            </template>
          </ListItem>
          <!-- Logout — negative variant -->
          <q-separator />
          <ListItem label="Log out" caption="Sign out of your account" clickable variant="negative">
            <template #prepend>
              <div
                class="row items-center justify-center"
                style="width: 36px; height: 36px; border-radius: 8px; background: rgba(var(--color-negative-rgb), 0.1)"
              >
                <Icon :name="tabLogout" size="20px" class="text-negative" />
              </div>
            </template>
            <template #append>
              <Icon :name="tabChevronRight" size="18px" class="text-muted-foreground" />
            </template>
          </ListItem>
        </List>
      </Card>

      <!-- ── Notifications List ─────────────────────────────────────────── -->
      <Card title="Notifications" caption="Items with icon avatar, overline, and time stamp">
        <List separator>
          <ListItem
            v-for="item in notifications"
            :key="item.id"
            :label="item.title"
            :caption="item.caption"
            :side-label="item.time"
            clickable
            :style="!item.read ? 'background: rgba(var(--color-primary-rgb), 0.04)' : ''"
          >
            <template #prepend>
              <div
                class="row items-center justify-center"
                :style="`
                  width: 40px; height: 40px; border-radius: 50%;
                  background: rgba(var(--color-${item.variant}-rgb), 0.12);
                `"
              >
                <Icon :name="item.icon" size="20px" :class="`text-${item.variant}`" />
              </div>
            </template>
            <template #append>
              <Badge v-if="!item.read" variant="primary" dot />
            </template>
          </ListItem>
        </List>
      </Card>

      <!-- ── File Manager List ──────────────────────────────────────────── -->
      <Card title="File Manager" caption="Files list with avatar initials, type overline, and file size">
        <List separator>
          <ListItem
            v-for="file in fileItems"
            :key="file.id"
            :overline="file.type"
            :label="file.name"
            :side-label="file.size"
            :side-caption="file.modified"
            clickable
          >
            <template #prepend>
              <Avatar :text="file.initials" :variant="file.variant === 'regular' ? 'info' : file.variant" shape="rounded" />
            </template>
            <template #append>
              <div class="row q-gutter-xs">
                <Button icon-only appearance="ghost" variant="regular" size="sm">
                  <Icon :name="tabShare" size="16px" />
                </Button>
                <Button icon-only appearance="ghost" variant="regular" size="sm">
                  <Icon :name="tabArchive" size="16px" />
                </Button>
              </div>
            </template>
          </ListItem>
        </List>
      </Card>

      <!-- ── Active / Selected State ────────────────────────────────────── -->
      <Card title="Active / Selected State" caption="Click an item to mark it active">
        <div class="row q-gutter-md">
          <div class="col-12 col-sm-5">
            <List bordered>
              <ListItem
                v-for="item in navItems"
                :key="item.id"
                :label="item.label"
                clickable
                :active="activeItem === item.id"
                variant="primary"
                @click="activeItem = item.id"
              >
                <template #prepend>
                  <Icon
                    :name="item.icon"
                    size="20px"
                    :class="activeItem === item.id ? 'text-primary' : 'text-muted-foreground'"
                  />
                </template>
              </ListItem>
            </List>
          </div>
        </div>
      </Card>

      <!-- ── Dense List ─────────────────────────────────────────────────── -->
      <Card title="Dense List" caption="Compact variant suitable for data-heavy views">
        <div class="row q-gutter-md">
          <div class="col-12 col-sm-6">
            <Typography variant="subtitle" weight="medium" class="q-mb-sm">Normal</Typography>
            <List bordered separator>
              <ListItem label="Normal item one" caption="Supporting text line" />
              <ListItem label="Normal item two" caption="Supporting text line" />
              <ListItem label="Normal item three" caption="Supporting text line" />
            </List>
          </div>
          <div class="col-12 col-sm-6">
            <Typography variant="subtitle" weight="medium" class="q-mb-sm">Dense</Typography>
            <List bordered separator dense>
              <ListItem dense label="Dense item one" caption="Supporting text" />
              <ListItem dense label="Dense item two" caption="Supporting text" />
              <ListItem dense label="Dense item three" caption="Supporting text" />
            </List>
          </div>
        </div>
      </Card>

      <!-- ── Bordered vs Separator ──────────────────────────────────────── -->
      <Card title="Borders & Separators" caption="List appearance variants">
        <div class="row q-gutter-md">
          <!-- No border / separator -->
          <div class="col-12 col-sm-4">
            <Typography variant="subtitle" weight="medium" class="q-mb-sm">No border</Typography>
            <List>
              <ListItem clickable label="Item one" />
              <ListItem clickable label="Item two" />
              <ListItem clickable label="Item three" />
            </List>
          </div>
          <!-- With separator -->
          <div class="col-12 col-sm-4">
            <Typography variant="subtitle" weight="medium" class="q-mb-sm">With separator</Typography>
            <List separator>
              <ListItem clickable label="Item one" />
              <ListItem clickable label="Item two" />
              <ListItem clickable label="Item three" />
            </List>
          </div>
          <!-- Bordered -->
          <div class="col-12 col-sm-4">
            <Typography variant="subtitle" weight="medium" class="q-mb-sm">Bordered</Typography>
            <List bordered separator>
              <ListItem clickable label="Item one" />
              <ListItem clickable label="Item two" />
              <ListItem clickable label="Item three" />
            </List>
          </div>
        </div>
      </Card>

      <!-- ── Overline Labels ────────────────────────────────────────────── -->
      <Card title="Overline Labels" caption="Three-line items with overline text">
        <List bordered separator>
          <ListItem
            overline="Category"
            label="Primary label text"
            caption="Secondary supporting text that can span multiple lines when needed"
            side-label="Side"
          />
          <ListItem
            overline="Type · Updated Dec 14"
            label="Another item with overline"
            caption="Caption below the main label"
          />
          <ListItem
            overline="Status: Active"
            label="Third list item"
            caption="Additional information about this item"
            side-label="12:30"
          />
        </List>
      </Card>

      <!-- ── Disabled State ─────────────────────────────────────────────── -->
      <Card title="Disabled Items" caption="Non-interactive disabled list items">
        <List bordered separator>
          <ListItem clickable label="Active clickable item" caption="This item is enabled" />
          <ListItem clickable disabled label="Disabled item" caption="This item is not interactive" />
          <ListItem clickable label="Another active item" caption="This item is enabled" />
          <ListItem
            clickable
            disabled
            label="Another disabled item"
            caption="Also not interactive"
          >
            <template #prepend>
              <Icon :name="tabShield" size="20px" />
            </template>
          </ListItem>
        </List>
      </Card>

    </div>
  </PageContainer>
</template>
