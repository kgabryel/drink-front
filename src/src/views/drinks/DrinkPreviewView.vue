<script setup lang="ts">
import DrinkPreview from '@components/drinks/DrinkPreview.vue';
import { useDrinkByRoute } from '@composables/drinks/useDrinkByRoute';

// composables
const { drink } = useDrinkByRoute();
</script>

<template>
  <div class="content-container">
    <DrinkPreview
      v-if="drink !== undefined"
      :drink="drink"
      :preview-available="false"
    />
  </div>
</template>
