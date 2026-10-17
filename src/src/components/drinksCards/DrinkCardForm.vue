<script setup lang="ts">
import type { State } from '@composables/drinksCards/useDrinksCardForm';
import type { Ref } from 'vue';

import DrinksList from '@components/drinks/DrinksList.vue';
import SimpleDrinkCard from '@components/drinksCards/SimpleDrinkCard.vue';
import AutocompleteMultiple from '@components/layout/AutocompleteMultiple.vue';
import { useDrinksCardForm } from '@composables/drinksCards/useDrinksCardForm';
import lengths from '@config/lengths';
import { ref } from 'vue';

import type { DrinksCardRequest } from '@/api/request';

// interfaces
interface Events {
  (e: 'submitted', data: DrinksCardRequest): void;
}

interface Props {
  buttonText: string;
  active?: boolean;
  availableDrinks?: number[];
  availableIngredients?: number[];
  availableTags?: number[];
  excludedDrinks?: number[];
  excludedIngredients?: number[];
  excludedTags?: number[];
  name?: string;
  showed?: boolean;
}

// setup
const props: Props = withDefaults(defineProps<Props>(), {
  active: false,
  availableDrinks: () => [],
  availableIngredients: () => [],
  availableTags: () => [],
  excludedDrinks: () => [],
  excludedIngredients: () => [],
  excludedTags: () => [],
  name: '',
  showed: false,
});

const emit: Events = defineEmits<Events>();

const maxNameLength: number = lengths.drinksCardName;

// state
const showSelectedDrinks: Ref<boolean> = ref(false);

// composables
const {
  drinksForAvailable,
  drinksForExcluded,
  ingredientsForAvailable,
  ingredientsForExcluded,
  remove,
  selectedDrinks,
  state,
  submit,
  tagsForAvailable,
  tagsForExcluded,
  valid,
} = useDrinksCardForm(props as State);

// actions
function onSubmit(data: DrinksCardRequest): void {
  emit('submitted', data);
}
</script>

<template>
  <div class="content-container px-2">
    <div class="glass-background my-2 pa-2">
      <div class="d-flex my-2">
        <v-switch v-model="showSelectedDrinks" class="ml-1 mr-4" label="Pokaż" />
        <v-text-field v-model="state.name" :counter="maxNameLength" :maxlength="maxNameLength" label="Nazwa" required />
        <v-switch v-model="state.active" class="ml-4 mr-1" label="Aktywna" />
      </div>
      <AutocompleteMultiple
        v-model="state.availableTags"
        label="Dostępne tagi"
        :items="tagsForAvailable"
        class="mb-2"
      />
      <AutocompleteMultiple
        v-model="state.excludedTags"
        label="Wykluczone tagi"
        :items="tagsForExcluded"
        class="mb-2"
      />
      <AutocompleteMultiple
        v-model="state.availableIngredients"
        label="Dostępne składniki"
        :items="ingredientsForAvailable"
        class="mb-2"
      />
      <AutocompleteMultiple
        v-model="state.excludedIngredients"
        label="Wykluczone składniki"
        :items="ingredientsForExcluded"
        class="mb-2"
      />
      <AutocompleteMultiple
        v-model="state.availableDrinks"
        label="Dostępne drinki"
        :items="drinksForAvailable"
        class="mb-2"
      />
      <AutocompleteMultiple
        v-model="state.excludedDrinks"
        label="Wykluczone drinki"
        :items="drinksForExcluded"
        class="mb-2"
      />
      <v-btn :disabled="!valid" block class="glass-background" type="button" @click="submit(onSubmit)">
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
  <DrinksList v-if="showSelectedDrinks" :drinks="selectedDrinks">
    <template #item="{ item }">
      <SimpleDrinkCard :drink="item" @remove="remove(item)" />
    </template>
  </DrinksList>
</template>
