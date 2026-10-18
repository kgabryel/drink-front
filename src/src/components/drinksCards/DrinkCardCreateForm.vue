<script setup lang="ts">
import DrinkCardForm from '@components/drinksCards/DrinkCardForm.vue';
import { useDrinkCardCreate } from '@composables/drinksCards/useDrinkCardCreate';

// composables
const { create } = useDrinkCardCreate();
</script>

<template>
  <DrinkCardForm
    :button-text="'Dodaj'"
    @submitted="create"
  />
</template>
