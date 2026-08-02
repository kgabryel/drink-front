<script setup lang="ts">
import type { SearchStore } from '@store/search';

import DrinkSearch from '@components/drinks/DrinkSearch.vue';
import DrinksList from '@components/drinks/DrinksList.vue';
import { useDrinkFilter } from '@composables/drinks/useDrinkFilter';

import { useSearchStore } from '@/store';

// setup
const searchStore: SearchStore = useSearchStore();

// composables
const { filteredDrinks } = useDrinkFilter();
</script>

<template>
  <DrinksList :drinks="filteredDrinks" />
  <v-dialog v-model="searchStore.isOpen">
    <DrinkSearch class="glass-background--light pa-2" />
  </v-dialog>
</template>
