<script setup lang="ts">
import { useIngredientsFilter } from '@composables/ingredients/useIngredientsFilter';

import IngredientContainer from './IngredientContainer.vue';

// composables
const { filteredIngredients } = useIngredientsFilter();
</script>

<template>
  <div class="content-container px-2">
    <div v-if="filteredIngredients.length > 0" class="glass-background">
      <IngredientContainer
        v-for="ingredient in filteredIngredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        class="pt-2"
      />
    </div>
  </div>
</template>
