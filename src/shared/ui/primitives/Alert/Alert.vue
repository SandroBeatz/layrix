<script setup lang="ts">
import { computed } from 'vue';
import { QCard, QIcon, QBtn } from 'quasar';
import type { AlertProps } from './Alert.types';
import { Typography } from '../Typography';
import {
  tabInfoCircle,
  tabCircleCheck,
  tabCircleX,
  tabAlertTriangle,
  tabX,
} from 'quasar-extras-svg-icons/tabler-icons-v2';

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
  closable: false,
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit('close');
};

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
  // If icon is explicitly set to empty string, null, or false, don't show an icon
  if (props.icon === '' || props.icon === null || props.icon === false) {
    return '';
  }
  
  // If icon is provided, use it
  if (props.icon) {
    return props.icon;
  }
  
  // Otherwise use variant-specific default Tabler icon
  const iconMap: Record<typeof props.variant, string> = {
    primary: tabInfoCircle,
    secondary: tabInfoCircle,
    positive: tabCircleCheck,
    negative: tabCircleX,
    warning: tabAlertTriangle,
    info: tabInfoCircle,
    regular: tabInfoCircle,
    default: tabInfoCircle,
  };
  return iconMap[props.variant];
});
</script>

<template>
  <QCard flat bordered :class="alertClasses">
    <div class="alert__container">
      <!-- Icon -->
      <div v-if="defaultIcon" class="alert__icon">
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

      <!-- Close button -->
      <div v-if="closable" class="alert__close">
        <QBtn
          flat
          round
          dense
          :icon="tabX"
          size="sm"
          @click="handleClose"
          class="alert__close-btn"
        />
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

  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
  }

  &__close-btn {
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
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
    // Add text shadow for better readability on colored backgrounds
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

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

    &.alert--default {
      background-color: rgba(var(--color-foreground-rgb), 0.1);
      color: var(--color-foreground);
      border-color: rgba(var(--color-foreground-rgb), 0.2);
      text-shadow: none;

      .alert__icon {
        color: var(--color-foreground);
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

    &.alert--default {
      border-color: rgba(var(--color-foreground-rgb), 0.3);
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

    &.alert--default {
      background-color: rgba(var(--color-foreground-rgb), 0.05);
      color: var(--color-foreground);

      .alert__icon {
        color: var(--color-foreground);
      }
    }
  }
}
</style>
