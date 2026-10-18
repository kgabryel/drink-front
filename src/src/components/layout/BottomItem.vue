<script setup lang="ts">
// interfaces
interface Props {
  href: string;
  icon: string;
  name: string;
}

// setup
defineProps<Props>();
</script>

<template>
  <div class="item">
    <router-link :to="{ name: href }">
      <div class="d-inline-block c-pointer">
        <v-icon color="white">
          {{ icon }}
        </v-icon>
        <p class="white-text">
          {{ name }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.item {
  display: inline-block;
  text-align: center;
  width: calc(25% - 15px);
}
</style>
