<script setup lang="ts">
import { useDrinkCreate } from '@composables/drinks/useDrinkCreate';

import DrinkForm from './DrinkForm.vue';

// composables
const { create } = useDrinkCreate();
</script>

<template>
  <DrinkForm :drink="null" btn-text="Dodaj" :submit-action="create" />
</template>
