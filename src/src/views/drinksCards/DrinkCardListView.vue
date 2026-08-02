<script setup lang="ts">
import type { SearchStore } from '@store/search';

import DrinkCardSearch from '@components/drinksCards/DrinkCardSearch.vue';
import DrinksCardsList from '@components/drinksCards/DrinksCardsList.vue';

import { useSearchStore } from '@/store';

// setup
const searchStore: SearchStore = useSearchStore();
</script>

<template>
  <DrinksCardsList />
  <v-dialog v-model="searchStore.isOpen">
    <DrinkCardSearch class="glass-background--light pa-2" />
  </v-dialog>
</template>
