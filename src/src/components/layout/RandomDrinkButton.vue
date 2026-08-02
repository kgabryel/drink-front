<script setup lang="ts">
import { names } from '@/router/names';
</script>

<template>
  <v-btn
    :to="{ name: names.randomDrink }"
    class="mx-2 glass-background"
    type="button"
    size="large"
    icon="mdi-glass-cocktail"
    color="white"
  />
</template>

<style scoped>
a {
  border: 3px solid white;
  border-radius: 100px;
  bottom: 30px;
  left: calc(50% - 33px);
  position: fixed;
  z-index: 10;
}
</style>
