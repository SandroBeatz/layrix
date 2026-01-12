<script setup lang="ts">
import { QCard, QIcon, QTooltip, useQuasar } from 'quasar';

interface IconCardProps {
  iconName: string;
  iconSvg: string;
}

const props = defineProps<IconCardProps>();
const $q = useQuasar();

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.iconName);
    $q.notify({
      message: `Copied: ${props.iconName}`,
      color: 'positive',
      position: 'top',
      timeout: 2000,
      icon: 'check',
    });
  } catch (error) {
    console.error('Clipboard copy failed:', error);
    $q.notify({
      message: 'Failed to copy to clipboard',
      color: 'negative',
      position: 'top',
      timeout: 2000,
      icon: 'warning',
    });
  }
};
</script>

<template>
  <QCard
    flat
    bordered
    class="icon-card cursor-pointer bg-card"
    @click="copyToClipboard"
  >
    <div class="icon-card__content">
      <div class="icon-card__icon-wrapper">
        <QIcon :name="`img:${iconSvg}`" size="32px" />
      </div>
      <div class="icon-card__name text-caption text-center">
        {{ iconName }}
      </div>
    </div>
    <QTooltip>Click to copy: {{ iconName }}</QTooltip>
  </QCard>
</template>

<style scoped lang="scss">
.icon-card {
  border-radius: calc(var(--border-radius) + 2px);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-muted);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.icon-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  min-height: 100px;
}

.icon-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--color-foreground);
}

.icon-card__name {
  word-break: break-word;
  color: var(--color-muted-foreground);
  font-size: 11px;
  line-height: 1.2;
  max-width: 100%;
}
</style>
