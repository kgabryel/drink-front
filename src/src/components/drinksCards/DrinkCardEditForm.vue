<script setup lang="ts">
import DrinkCardForm from '@components/drinksCards/DrinkCardForm.vue';
import { useDrinkCardUpdate } from '@composables/drinksCards/useDrinkCardUpdate';
import { toRef } from 'vue';

import type { DrinksCard } from '@/api/response';

// interfaces
interface Props {
  drinksCard: DrinksCard;
}

// setup
const props: Props = defineProps<Props>();

// composables
const { update } = useDrinkCardUpdate(toRef(props, 'drinksCard'));
</script>

<template>
  <DrinkCardForm
    :button-text="'Aktualizuj'"
    :name="drinksCard.name"
    :active="drinksCard.active"
    :available-drinks="drinksCard.availableDrinks"
    :excluded-drinks="drinksCard.excludedDrinks"
    :available-tags="drinksCard.availableTags"
    :excluded-tags="drinksCard.excludedTags"
    :available-ingredients="drinksCard.availableIngredients"
    :excluded-ingredients="drinksCard.excludedIngredients"
    :showed="true"
    @submitted="update"
  />
</template>
