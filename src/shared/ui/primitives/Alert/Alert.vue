<script setup lang="ts">
import { computed } from 'vue';
import { QCard, QIcon } from 'quasar';
import type { AlertProps } from './Alert.types';
import { Typography } from '../Typography';

/**
 * Alert Component
 * Opinionated wrapper around Quasar QCard for alert messages
 *
 * @example
 * // Primary filled alert
 * <Alert title="Success" message="Your changes have been saved." />
 *
 * @example
 * // Outlined warning alert with icon
 * <Alert variant="warning" appearance="outline" icon="warning" title="Warning" message="Please review your input." />
 *
 * @example
 * // Alert with overline and actions
 * <Alert variant="positive" icon="check_circle" overline="Success" title="Payment Complete" message="Your payment has been processed successfully.">
 *   <template #actions>
 *     <Button>View Receipt</Button>
 *   </template>
 * </Alert>
 */

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'primary',
  appearance: 'fill',
});

// Generate CSS classes for the alert
const alertClasses = computed(() => {
  const classes = [
    'alert',
    `alert--${props.variant}`,
    `alert--${props.appearance}`,
  ];
  return classes.join(' ');
});

// Default icons for each variant if not specified
const defaultIcon = computed(() => {
  const iconMap: Record<typeof props.variant, string> = {
    primary: 'info',
    secondary: 'info',
    positive: 'check_circle',
    negative: 'error',
    warning: 'warning',
    info: 'info',
    regular: 'info',
  };
  return props.icon || iconMap[props.variant];
});
</script>

<template>
  <QCard flat bordered :class="alertClasses">
    <div class="alert__container">
      <!-- Icon -->
      <div v-if="icon !== undefined || defaultIcon" class="alert__icon">
        <QIcon :name="defaultIcon" size="24px" />
      </div>

      <!-- Content -->
      <div class="alert__content">
        <!-- Overline -->
        <Typography v-if="overline" variant="caption" class="alert__overline">
          {{ overline }}
        </Typography>

        <!-- Title -->
        <Typography v-if="title" variant="subtitle" weight="semibold" class="alert__title">
          {{ title }}
        </Typography>

        <!-- Message -->
        <Typography v-if="message" variant="body" class="alert__message">
          {{ message }}
        </Typography>

        <!-- Default slot for custom content -->
        <slot v-if="!overline && !title && !message" />
      </div>
    </div>

    <!-- Actions slot -->
    <div v-if="$slots.actions" class="alert__actions">
      <slot name="actions" />
    </div>
  </QCard>
</template>

<style scoped lang="scss">
/**
 * Custom styles for Alert component
 * Extend Quasar QCard with design system specific styles
 */

.alert {
  border-radius: calc(var(--border-radius) + 4px);

  &__container {
    display: flex;
    gap: 12px;
    padding: 16px;
    align-items: flex-start;
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__overline {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
  }

  &__title {
    line-height: 1.4;
  }

  &__message {
    line-height: 1.6;
    opacity: 0.9;
  }

  &__actions {
    padding: 0 16px 16px 16px;
    margin-left: 36px; // Align with content (icon width + gap)
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  // Fill appearance styles
  &--fill {
    &.alert--primary {
      background-color: var(--color-primary);
      color: white;
      border-color: var(--color-primary);

      .alert__icon {
        color: white;
      }
    }

    &.alert--secondary {
      background-color: var(--color-secondary);
      color: white;
      border-color: var(--color-secondary);

      .alert__icon {
        color: white;
      }
    }

    &.alert--positive {
      background-color: var(--color-positive);
      color: white;
      border-color: var(--color-positive);

      .alert__icon {
        color: white;
      }
    }

    &.alert--negative {
      background-color: var(--color-negative);
      color: white;
      border-color: var(--color-negative);

      .alert__icon {
        color: white;
      }
    }

    &.alert--warning {
      background-color: var(--color-warning);
      color: white;
      border-color: var(--color-warning);

      .alert__icon {
        color: white;
      }
    }

    &.alert--info {
      background-color: var(--color-info);
      color: white;
      border-color: var(--color-info);

      .alert__icon {
        color: white;
      }
    }

    &.alert--regular {
      background-color: var(--color-foreground);
      color: var(--color-background);
      border-color: var(--color-foreground);

      .alert__icon {
        color: var(--color-background);
      }
    }
  }

  // Outline appearance styles
  &--outline {
    background-color: transparent;

    &.alert--primary {
      border-color: var(--color-primary);
      color: var(--color-primary);

      .alert__icon {
        color: var(--color-primary);
      }
    }

    &.alert--secondary {
      border-color: var(--color-secondary);
      color: var(--color-secondary);

      .alert__icon {
        color: var(--color-secondary);
      }
    }

    &.alert--positive {
      border-color: var(--color-positive);
      color: var(--color-positive);

      .alert__icon {
        color: var(--color-positive);
      }
    }

    &.alert--negative {
      border-color: var(--color-negative);
      color: var(--color-negative);

      .alert__icon {
        color: var(--color-negative);
      }
    }

    &.alert--warning {
      border-color: var(--color-warning);
      color: var(--color-warning);

      .alert__icon {
        color: var(--color-warning);
      }
    }

    &.alert--info {
      border-color: var(--color-info);
      color: var(--color-info);

      .alert__icon {
        color: var(--color-info);
      }
    }

    &.alert--regular {
      border-color: var(--color-foreground);
      color: var(--color-foreground);

      .alert__icon {
        color: var(--color-foreground);
      }
    }
  }

  // Ghost appearance styles
  &--ghost {
    border-color: transparent;

    &.alert--primary {
      background-color: rgba(var(--color-primary-rgb), 0.12);
      color: var(--color-primary);

      .alert__icon {
        color: var(--color-primary);
      }
    }

    &.alert--secondary {
      background-color: rgba(var(--color-secondary-rgb), 0.12);
      color: var(--color-secondary);

      .alert__icon {
        color: var(--color-secondary);
      }
    }

    &.alert--positive {
      background-color: rgba(var(--color-positive-rgb), 0.12);
      color: var(--color-positive);

      .alert__icon {
        color: var(--color-positive);
      }
    }

    &.alert--negative {
      background-color: rgba(var(--color-negative-rgb), 0.12);
      color: var(--color-negative);

      .alert__icon {
        color: var(--color-negative);
      }
    }

    &.alert--warning {
      background-color: rgba(var(--color-warning-rgb), 0.12);
      color: var(--color-warning);

      .alert__icon {
        color: var(--color-warning);
      }
    }

    &.alert--info {
      background-color: rgba(var(--color-info-rgb), 0.12);
      color: var(--color-info);

      .alert__icon {
        color: var(--color-info);
      }
    }

    &.alert--regular {
      background-color: rgba(var(--color-foreground-rgb), 0.08);
      color: var(--color-foreground);

      .alert__icon {
        color: var(--color-foreground);
      }
    }
  }
}
</style>
