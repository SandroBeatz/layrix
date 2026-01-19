<script setup lang="ts">
import { PageContainer, Alert, Card, Button, Typography } from '@shared/ui';

// Alert variants for demo
const variants = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'regular', label: 'Regular' },
] as const;

const appearances = [
  { value: 'fill', label: 'Fill' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
] as const;
</script>

<template>
  <PageContainer title="Alerts" subtitle="Alert components for notifications and messages">
    <div class="column q-gutter-y-lg">
      <!-- Basic Alerts Section -->
      <Card title="Basic Alerts" caption="Simple alerts with title and message">
        <div class="column q-gutter-md">
          <Alert
            v-for="variant in variants"
            :key="variant.value"
            :variant="variant.value"
            :title="`${variant.label} Alert`"
            message="This is a sample alert message to demonstrate the alert component."
          />
        </div>
      </Card>

      <!-- Appearance Styles Section -->
      <Card title="Appearance Styles" caption="Fill, outline and ghost styles for each variant">
        <div class="column q-gutter-y-lg">
          <div v-for="variant in variants" :key="variant.value" class="column q-gutter-y-sm">
            <Typography variant="subtitle" weight="medium">{{ variant.label }}</Typography>
            <div class="column q-gutter-md">
              <Alert
                v-for="appearance in appearances"
                :key="appearance.value"
                :variant="variant.value"
                :appearance="appearance.value"
                :title="`${appearance.label} ${variant.label}`"
                message="This alert demonstrates the different appearance styles available."
              />
            </div>
          </div>
        </div>
      </Card>

      <!-- With Icons Section -->
      <Card title="With Icons" caption="Alerts with custom icons">
        <div class="column q-gutter-md">
          <Alert
            variant="positive"
            icon="check_circle"
            title="Success!"
            message="Your changes have been saved successfully."
          />
          <Alert
            variant="negative"
            icon="error"
            title="Error"
            message="Something went wrong. Please try again."
          />
          <Alert
            variant="warning"
            icon="warning"
            title="Warning"
            message="Please review your input before proceeding."
          />
          <Alert
            variant="info"
            icon="info"
            title="Information"
            message="Here's some useful information for you."
          />
          <Alert
            variant="primary"
            icon="notifications"
            title="Notification"
            message="You have a new message."
          />
        </div>
      </Card>

      <!-- With Overline Section -->
      <Card title="With Overline" caption="Alerts with overline text">
        <div class="column q-gutter-md">
          <Alert
            variant="positive"
            icon="check_circle"
            overline="Success"
            title="Payment Completed"
            message="Your payment of $49.99 has been processed successfully."
          />
          <Alert
            variant="info"
            icon="info"
            overline="Update Available"
            title="New Version Available"
            message="Version 2.0 is now available. Click update to install."
          />
          <Alert
            variant="warning"
            icon="warning"
            overline="Action Required"
            title="Verify Your Email"
            message="Please verify your email address to continue using all features."
          />
        </div>
      </Card>

      <!-- With Actions Section -->
      <Card title="With Actions" caption="Alerts with action buttons">
        <div class="column q-gutter-md">
          <Alert
            variant="positive"
            icon="check_circle"
            overline="Success"
            title="Order Confirmed"
            message="Your order #12345 has been confirmed and will be shipped soon."
          >
            <template #actions>
              <Button size="sm" variant="positive">View Order</Button>
              <Button size="sm" variant="positive" appearance="outline">Track Shipment</Button>
            </template>
          </Alert>

          <Alert
            variant="warning"
            icon="warning"
            title="Storage Almost Full"
            message="You're using 95% of your storage space. Consider upgrading your plan."
          >
            <template #actions>
              <Button size="sm" variant="warning">Upgrade Now</Button>
              <Button size="sm" variant="warning" appearance="ghost">Manage Storage</Button>
            </template>
          </Alert>

          <Alert
            variant="info"
            icon="info"
            overline="New Feature"
            title="Try Our New Dashboard"
            message="We've redesigned our dashboard to make it easier to use and more powerful."
          >
            <template #actions>
              <Button size="sm" variant="info">Take a Tour</Button>
              <Button size="sm" variant="info" appearance="ghost">Learn More</Button>
            </template>
          </Alert>

          <Alert
            variant="negative"
            icon="error"
            title="Connection Lost"
            message="We couldn't connect to the server. Please check your internet connection."
          >
            <template #actions>
              <Button size="sm" variant="negative">Retry</Button>
            </template>
          </Alert>
        </div>
      </Card>

      <!-- Title Only Section -->
      <Card title="Title Only" caption="Alerts with just a title">
        <div class="column q-gutter-md">
          <Alert variant="positive" icon="check_circle" title="Changes saved successfully" />
          <Alert variant="negative" icon="error" title="Failed to load data" />
          <Alert variant="warning" icon="warning" title="Please verify your account" />
          <Alert variant="info" icon="info" title="New updates available" />
        </div>
      </Card>

      <!-- Message Only Section -->
      <Card title="Message Only" caption="Alerts with just a message">
        <div class="column q-gutter-md">
          <Alert
            variant="primary"
            icon="info"
            message="This is a simple informational message."
          />
          <Alert
            variant="positive"
            icon="check_circle"
            message="Your operation completed successfully."
          />
          <Alert
            variant="warning"
            icon="warning"
            message="Please review the information before continuing."
          />
        </div>
      </Card>

      <!-- Outline Style Examples Section -->
      <Card title="Outline Style Examples" caption="Real-world examples with outline style">
        <div class="column q-gutter-md">
          <Alert
            variant="positive"
            appearance="outline"
            icon="check_circle"
            title="Account Verified"
            message="Your account has been successfully verified. You can now access all features."
          >
            <template #actions>
              <Button size="sm" variant="positive" appearance="outline">Get Started</Button>
            </template>
          </Alert>

          <Alert
            variant="info"
            appearance="outline"
            icon="lightbulb"
            overline="Tip"
            title="Pro Tip"
            message="Use keyboard shortcuts to navigate faster. Press '?' to see all available shortcuts."
          />

          <Alert
            variant="negative"
            appearance="outline"
            icon="error"
            title="Authentication Failed"
            message="Invalid username or password. Please try again."
          >
            <template #actions>
              <Button size="sm" variant="negative" appearance="outline">Try Again</Button>
              <Button size="sm" variant="negative" appearance="ghost">Reset Password</Button>
            </template>
          </Alert>
        </div>
      </Card>

      <!-- Ghost Style Examples Section -->
      <Card title="Ghost Style Examples" caption="Real-world examples with ghost style">
        <div class="column q-gutter-md">
          <Alert
            variant="info"
            appearance="ghost"
            icon="campaign"
            overline="Announcement"
            title="System Maintenance"
            message="Scheduled maintenance will occur on Saturday from 2 AM to 4 AM EST."
          >
            <template #actions>
              <Button size="sm" variant="info" appearance="ghost">Add to Calendar</Button>
            </template>
          </Alert>

          <Alert
            variant="warning"
            appearance="ghost"
            icon="security"
            title="Security Notice"
            message="We noticed a login from a new device. If this wasn't you, please secure your account."
          >
            <template #actions>
              <Button size="sm" variant="warning" appearance="ghost">Review Activity</Button>
              <Button size="sm" variant="warning" appearance="ghost">Secure Account</Button>
            </template>
          </Alert>

          <Alert
            variant="positive"
            appearance="ghost"
            icon="emoji_events"
            overline="Congratulations"
            title="Milestone Reached!"
            message="You've completed 100 tasks this month. Keep up the great work!"
          />
        </div>
      </Card>
    </div>
  </PageContainer>
</template>
