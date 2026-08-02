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
  <v-btn class="text-center glass-background" type="button" :to="{ name: href }">
    <v-icon class="mr-3 icon">{{ icon }}</v-icon>
    {{ name }}
  </v-btn>
</template>

<style scoped>
.v-btn {
  width: 200px;
}

@media screen and (width <= 1520px) {
  .v-btn {
    width: 120px;
  }
}

@media screen and (width <= 1130px) {
  .icon {
    display: none;
  }
}
</style>
