<script setup lang="ts">
import { PageContainer, Avatar, AvatarGroup, Card, Badge, Typography } from '@shared/ui';
import type { AvatarGroupItem } from '@shared/ui';

// Sample user data for demos
const sampleUsers: AvatarGroupItem[] = [
  {
    id: 1,
    title: 'John Doe',
    caption: 'Software Engineer',
    src: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    title: 'Jane Smith',
    caption: 'Product Designer',
    src: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    title: 'Mike Johnson',
    caption: 'Project Manager',
    src: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    title: 'Sarah Wilson',
    caption: 'UX Researcher',
    src: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    title: 'Tom Brown',
    caption: 'DevOps Engineer',
    src: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    title: 'Emily Davis',
    caption: 'Data Scientist',
    src: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    title: 'Chris Lee',
    caption: 'Frontend Developer',
    src: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

// Users without images (for initials demo)
const usersNoImages: AvatarGroupItem[] = [
  { id: 1, title: 'Alice Brown', caption: 'Marketing Lead', initials: 'AB' },
  { id: 2, title: 'Bob Chen', caption: 'Sales Director', initials: 'BC' },
  { id: 3, title: 'Carol Davis', caption: 'HR Manager', initials: 'CD' },
  { id: 4, title: 'David Evans', caption: 'Finance Analyst', initials: 'DE' },
  { id: 5, title: 'Eva Foster', caption: 'Legal Counsel', initials: 'EF' },
];

// Avatar sizes for demo
const sizes = [
  { value: 'sm', label: 'Small (32px)' },
  { value: 'md', label: 'Medium (40px)' },
  { value: 'lg', label: 'Large (56px)' },
] as const;

// Avatar variants for demo
const variants = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'regular', label: 'Regular' },
] as const;

// Avatar shapes for demo
const shapes = [
  { value: 'round', label: 'Round' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
] as const;

function handleAvatarClick(item: AvatarGroupItem) {
  console.log('Avatar clicked:', item);
}

function handleOverflowClick() {
  console.log('Overflow clicked - show all users');
}
</script>

<template>
  <PageContainer title="Avatars" subtitle="User profile images, initials, and avatar groups">
    <div class="column q-gutter-y-lg">
      <!-- Basic Sizes Section -->
      <Card title="Sizes" caption="Small, medium, and large avatar sizes">
        <div class="row q-gutter-lg items-end">
          <div v-for="size in sizes" :key="size.value" class="column items-center q-gutter-y-sm">
            <Avatar
              src="https://randomuser.me/api/portraits/men/32.jpg"
              :size="size.value"
              alt="User avatar"
            />
            <Typography variant="caption">{{ size.label }}</Typography>
          </div>
        </div>
      </Card>

      <!-- Shapes Section -->
      <Card title="Shapes" caption="Round, rounded, and square avatar shapes">
        <div class="column q-gutter-y-lg">
          <div v-for="size in sizes" :key="size.value" class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">{{ size.label }}</Typography>
            <div class="row q-gutter-lg items-center">
              <div v-for="shape in shapes" :key="shape.value" class="column items-center q-gutter-y-sm">
                <Avatar
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  :size="size.value"
                  :shape="shape.value"
                  alt="User avatar"
                />
                <Typography variant="caption">{{ shape.label }}</Typography>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- With Initials Section -->
      <Card title="With Initials" caption="Avatars displaying user initials when no image is available">
        <div class="column q-gutter-y-lg">
          <!-- By variant -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Color Variants</Typography>
            <div class="row q-gutter-md items-center flex-wrap">
              <div v-for="variant in variants" :key="variant.value" class="column items-center q-gutter-y-sm">
                <Avatar
                  text="JD"
                  :variant="variant.value"
                  size="md"
                />
                <Typography variant="caption">{{ variant.label }}</Typography>
              </div>
            </div>
          </div>

          <!-- Different initials -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Different Initials</Typography>
            <div class="row q-gutter-md items-center flex-wrap">
              <Avatar text="A" variant="primary" />
              <Avatar text="BC" variant="secondary" />
              <Avatar text="DE" variant="positive" />
              <Avatar text="FG" variant="negative" />
              <Avatar text="HI" variant="warning" />
              <Avatar text="JK" variant="info" />
            </div>
          </div>
        </div>
      </Card>

      <!-- With Icons Section -->
      <Card title="With Icons" caption="Avatars displaying icons">
        <div class="row q-gutter-md items-center flex-wrap">
          <Avatar icon="person" variant="primary" />
          <Avatar icon="group" variant="secondary" />
          <Avatar icon="star" variant="warning" />
          <Avatar icon="favorite" variant="negative" />
          <Avatar icon="verified" variant="positive" />
          <Avatar icon="settings" variant="regular" />
        </div>
      </Card>

      <!-- Clickable Avatars Section -->
      <Card title="Clickable Avatars" caption="Avatars with click interaction and hover effect">
        <div class="row q-gutter-md items-center flex-wrap">
          <Avatar
            src="https://randomuser.me/api/portraits/men/22.jpg"
            size="lg"
            clickable
            alt="Clickable avatar"
          />
          <Avatar
            text="CL"
            variant="primary"
            size="lg"
            clickable
          />
          <Avatar
            icon="add"
            variant="secondary"
            size="lg"
            clickable
          />
        </div>
        <Typography variant="caption" class="q-mt-md">
          Hover over the avatars to see the interaction effect
        </Typography>
      </Card>

      <!-- Avatar with Status Badge Section -->
      <Card title="With Status Badge" caption="Combining Avatar with Badge component for status indicators">
        <div class="row q-gutter-xl items-center flex-wrap">
          <!-- Online -->
          <div class="column items-center q-gutter-y-sm">
            <div style="position: relative; display: inline-block">
              <Avatar
                src="https://randomuser.me/api/portraits/women/22.jpg"
                size="lg"
              />
              <Badge variant="positive" dot floating />
            </div>
            <Typography variant="caption">Online</Typography>
          </div>

          <!-- Away -->
          <div class="column items-center q-gutter-y-sm">
            <div style="position: relative; display: inline-block">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                size="lg"
              />
              <Badge variant="warning" dot floating />
            </div>
            <Typography variant="caption">Away</Typography>
          </div>

          <!-- Busy -->
          <div class="column items-center q-gutter-y-sm">
            <div style="position: relative; display: inline-block">
              <Avatar
                src="https://randomuser.me/api/portraits/women/68.jpg"
                size="lg"
              />
              <Badge variant="negative" dot floating />
            </div>
            <Typography variant="caption">Busy</Typography>
          </div>

          <!-- Offline -->
          <div class="column items-center q-gutter-y-sm">
            <div style="position: relative; display: inline-block">
              <Avatar
                src="https://randomuser.me/api/portraits/men/85.jpg"
                size="lg"
              />
              <Badge variant="regular" dot floating />
            </div>
            <Typography variant="caption">Offline</Typography>
          </div>

          <!-- With notification count -->
          <div class="column items-center q-gutter-y-sm">
            <div style="position: relative; display: inline-block">
              <Avatar
                src="https://randomuser.me/api/portraits/women/33.jpg"
                size="lg"
              />
              <Badge variant="negative" :label="5" floating />
            </div>
            <Typography variant="caption">Notifications</Typography>
          </div>
        </div>
      </Card>

      <!-- Overlapping Avatars Section -->
      <Card title="Overlapping Avatars (Avatar Group)" caption="Group of avatars with hover animation and user popover">
        <div class="column q-gutter-y-xl">
          <!-- Basic group -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Basic Avatar Group</Typography>
            <Typography variant="caption" class="q-mb-sm">
              Hover over avatars to see expanded view with user info popover
            </Typography>
            <AvatarGroup
              :items="sampleUsers"
              :max="4"
              @avatar-click="handleAvatarClick"
              @overflow-click="handleOverflowClick"
            />
          </div>

          <!-- Different sizes -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Different Sizes</Typography>
            <div class="column q-gutter-y-md">
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Small:</Typography>
                <AvatarGroup :items="sampleUsers" :max="5" size="sm" />
              </div>
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Medium:</Typography>
                <AvatarGroup :items="sampleUsers" :max="5" size="md" />
              </div>
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Large:</Typography>
                <AvatarGroup :items="sampleUsers" :max="5" size="lg" />
              </div>
            </div>
          </div>

          <!-- With initials -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">With Initials (No Images)</Typography>
            <AvatarGroup
              :items="usersNoImages"
              :max="4"
              @avatar-click="handleAvatarClick"
            />
          </div>

          <!-- Different max values -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Different Max Values</Typography>
            <div class="column q-gutter-y-md">
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Max 2:</Typography>
                <AvatarGroup :items="sampleUsers" :max="2" />
              </div>
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Max 4:</Typography>
                <AvatarGroup :items="sampleUsers" :max="4" />
              </div>
              <div class="row items-center q-gutter-x-lg">
                <Typography variant="caption" style="min-width: 80px">Max 6:</Typography>
                <AvatarGroup :items="sampleUsers" :max="6" />
              </div>
            </div>
          </div>

          <!-- Without popover -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Without Popover</Typography>
            <Typography variant="caption" class="q-mb-sm">
              Hover effect still works, but no user info popover
            </Typography>
            <AvatarGroup
              :items="sampleUsers"
              :max="5"
              :show-popover="false"
            />
          </div>

          <!-- Without hover expand -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Without Hover Expand</Typography>
            <Typography variant="caption" class="q-mb-sm">
              Static group without hover animation
            </Typography>
            <AvatarGroup
              :items="sampleUsers"
              :max="5"
              :hover-expand="false"
              :show-popover="false"
            />
          </div>
        </div>
      </Card>

      <!-- Usage Examples Section -->
      <Card title="Usage Examples" caption="Real-world usage scenarios">
        <div class="column q-gutter-y-lg">
          <!-- Team members -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Project Team Members</Typography>
            <div class="row items-center q-gutter-x-md">
              <AvatarGroup :items="sampleUsers.slice(0, 5)" :max="4" size="sm" />
              <Typography variant="body">5 team members</Typography>
            </div>
          </div>

          <!-- Comment authors -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Recent Commenters</Typography>
            <div class="row items-center q-gutter-x-md">
              <AvatarGroup :items="sampleUsers.slice(0, 3)" :max="3" size="sm" />
              <Typography variant="caption">commented on this task</Typography>
            </div>
          </div>

          <!-- Assignees -->
          <div class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">Task Assignees</Typography>
            <div
              style="
                display: inline-flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                background: var(--color-surface);
                border-radius: 8px;
              "
            >
              <Typography variant="body" weight="medium">Assigned to:</Typography>
              <AvatarGroup :items="sampleUsers.slice(0, 2)" :max="2" size="sm" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
