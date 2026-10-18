<script setup lang="ts">
import { useDrinksCardsFilter } from '@composables/drinksCards/useDrinksCardsFilter';

import DrinksCard from './DrinksCard.vue';

// composables
const { filteredDrinksCards } = useDrinksCardsFilter();
</script>

<template>
  <div class="content-container px-2">
    <v-list
      v-if="filteredDrinksCards.length > 0"
      class="glass-background"
    >
      <DrinksCard
        v-for="drinksCard in filteredDrinksCards"
        :key="drinksCard.id"
        :drinks-card="drinksCard"
        class="pt-2"
      />
    </v-list>
  </div>
</template>
