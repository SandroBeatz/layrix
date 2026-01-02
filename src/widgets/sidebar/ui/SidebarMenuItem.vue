<script setup lang="ts">
defineProps<{
  item: {
    title: string;
    icon: string;
    route: string;
  };
}>();
</script>

<template>
  <q-item clickable v-ripple :to="item.route" class="sidebar-item">
    <q-item-section avatar class="sidebar-item__avatar">
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section>{{ item.title }}</q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.sidebar-item {
  &__avatar {
    min-width: 40px;
  }
}
</style>
