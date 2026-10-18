<script setup lang="ts">
import AppFooter from '@components/layout/AppFooter.vue';
import AppHeader from '@components/layout/AppHeader.vue';
import { useScrollRestoration } from 'vue-router/experimental';

useScrollRestoration();
</script>

<template>
  <AppHeader />
  <div class="content">
    <router-view />
  </div>
  <AppFooter class="bottom-menu" />
</template>

<style scoped>
.content {
  margin-bottom: 100px;
  margin-top: 80px;
}

@media screen and (width >= 1050px) {
  .content {
    margin-bottom: 0;
  }
}
</style>
