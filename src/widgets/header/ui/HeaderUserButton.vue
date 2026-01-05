<script setup lang="ts"></script>

<template>
  <q-item clickable dense class="header-user-button">
    <q-item-section avatar class="header-user-button__avatar">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
      </q-avatar>
    </q-item-section>

    <!--
    <q-item-section class="header-user-button__name">
      <q-item-label class="text-weight-bold">John Doe</q-item-label>
      <q-item-label caption>john2219@gmail.com</q-item-label>
    </q-item-section>
    -->

    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Having fun</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Crazy for transitions</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Mind blown</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
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
