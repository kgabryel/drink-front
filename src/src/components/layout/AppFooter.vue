<script setup lang="ts">
import { names } from '@/router/names';

import BottomItem from './BottomItem.vue';
import RandomDrinkButton from './RandomDrinkButton.vue';

// setup
const allDrinks: string = names.allDrinks;
const allDrinksCards: string = names.allDrinksCards;
const ingredients: string = names.ingredients;
const tags: string = names.tags;
</script>

<template>
  <v-footer
    class="w-100 position-fixed pa-0 text-white above-content"
    color="transparent"
  >
    <div class="white-text d-flex w-100 pt-1 pb-1 glass-background rounded-0">
      <BottomItem
        :href="allDrinks"
        icon="mdi-format-list-numbered"
        name="Drinki"
      />
      <BottomItem
        :href="allDrinksCards"
        icon="mdi-clipboard-list"
        name="Karty"
      />
      <div class="divider" />
      <BottomItem
        :href="ingredients"
        icon="mdi-liquor"
        name="Składniki"
      />
      <BottomItem
        :href="tags"
        icon="mdi-tag-multiple"
        name="Tagi"
      />
    </div>
    <RandomDrinkButton />
  </v-footer>
</template>

<style scoped>
.divider {
  width: 60px;
}

.v-footer {
  bottom: 0;
}

@media screen and (width >= 1050px) {
  .v-footer {
    display: none;
  }
}

.rounded-0 {
  border-radius: 0 !important;
}
</style>
