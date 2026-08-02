<script setup lang="ts">
// interfaces
interface Props {
  filteredIngredientCount: number;
  allIngredientsCount: number;
  availableDrinksCount: number;
}

// setup
defineProps<Props>();
</script>

<template>
  <p class="mt-1">Liczba dostępnych drinków: {{ availableDrinksCount }}</p>
  <p class="mt-1">Zaznaczone składniki: {{ filteredIngredientCount }} / {{ allIngredientsCount }}</p>
</template>
