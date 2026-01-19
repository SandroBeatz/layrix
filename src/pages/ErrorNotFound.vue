<script setup lang="ts">
import { Typography, Button } from '@shared/ui';
</script>

<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <Typography variant="h1" class-name="error-code">404</Typography>

      <Typography variant="h2" class-name="error-message">
        Oops. Nothing here...
      </Typography>

      <Button class="q-mt-xl" to="/">Go Home</Button>
    </div>
  </div>
</template>

<style scoped>
.error-code {
  font-size: 30vh;
  line-height: 1;
}

.error-message {
  opacity: 0.4;
}
</style>
