<script setup lang="ts">
import { authService } from '@services/auth.service';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { names } from '@/router/names';

// setup
const router: ReturnType<typeof useRouter> = useRouter();

// lifecycle
onMounted(async () => {
  authService.clearTokens();
  await router.push({ name: names.login });
});
</script>

<template>
  <div />
</template>
