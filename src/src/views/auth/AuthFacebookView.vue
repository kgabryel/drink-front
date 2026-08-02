<script setup lang="ts">
import { useFacebookLogin } from '@composables/auth/useFacebookLogin';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

// setup
const route: ReturnType<typeof useRoute> = useRoute();

// composables
const { login, redirect } = useFacebookLogin();

// lifecycle
onMounted(async () => {
  const authToken: string = (route.query['code'] as string) ?? '';

  if (authToken !== '') {
    await login(authToken);
  } else {
    await redirect();
  }
});
</script>

<template>
  <div />
</template>
