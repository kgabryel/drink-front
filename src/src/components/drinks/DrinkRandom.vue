<script setup lang="ts">
import type { Drink } from '@models/store/drink';
import type { Ref } from 'vue';

import RandomDrinkIngredientsActions from '@components/drinks/RandomDrinkIngredientsActions.vue';
import RandomDrinkStats from '@components/drinks/RandomDrinkStats.vue';
import { useRandomDrink } from '@composables/drinks/useRandomDrink';
import { ref } from 'vue';

import DrinkPreview from './DrinkPreview.vue';

// state
const step: Ref<number> = ref(1);
const selectedDrink: Ref<Drink | undefined> = ref(undefined);

// composables
const {
  availableDrinks,
  clearTags,
  deselectIngredients,
  filteredIngredient,
  ingredients,
  random,
  selectAllIngredients,
  state,
  switchTag,
  tags,
  toggleIngredient,
  visibleIngredients,
  visibleSelected,
} = useRandomDrink();

// actions
function shuffle(): void {
  step.value = 3;
  selectedDrink.value = random();
}

function goToIngredients(): void {
  step.value = 1;
}

function goToTags(): void {
  step.value = 2;
}

function backToSelect(): void {
  selectedDrink.value = undefined;
  step.value = 2;
}
</script>

<template>
  <div v-if="step < 3">
    <div class="content-container px-2">
      <v-stepper-vertical v-model="step" class="glass-background" hide-actions>
        <v-stepper-vertical-item :value="1" title="Składniki" bg-color="transparent">
          <template #default>
            <RandomDrinkStats
              v-if="ingredients.length > 10"
              :filtered-ingredient-count="filteredIngredient.length"
              :all-ingredients-count="ingredients.length"
              :available-drinks-count="availableDrinks.length"
            />
            <v-switch v-model="state.onlyAvailable" class="mt-2" label="Ukryj brakujące składniki" />
            <v-switch v-model="state.additionalIngredients" class="mt-0" label="Dodatkowe składniki" />
            <RandomDrinkIngredientsActions
              v-if="ingredients.length > 10"
              :selected-count="visibleSelected.length"
              :visible-count="visibleIngredients.length"
              @select-all="selectAllIngredients"
              @deselect-all="deselectIngredients"
              @next="goToTags"
            />
            <v-list v-model:selected="state.selectedIngredients" select-strategy="classic">
              <v-list-item
                v-for="ingredient in ingredients"
                :key="ingredient.id"
                :class="{ 'd-none': state.onlyAvailable && !ingredient.available }"
                :value="ingredient.id"
                class="px-0 py-0"
              >
                <template #prepend>
                  <v-switch
                    :model-value="state.selectedIngredients.includes(ingredient.id)"
                    class="ml-1 mr-4"
                    @update:model-value="(val) => toggleIngredient(ingredient.id, val)"
                  />
                </template>
                <template #title>{{ ingredient.name }}</template>
                <template #append>
                  <v-icon v-if="ingredient.available" class="available-icon">mdi-check-circle</v-icon>
                  <v-icon v-else class="unavailable-icon">mdi-close-circle</v-icon>
                </template>
              </v-list-item>
            </v-list>
            <RandomDrinkStats
              :filtered-ingredient-count="filteredIngredient.length"
              :all-ingredients-count="ingredients.length"
              :available-drinks-count="availableDrinks.length"
            />
            <RandomDrinkIngredientsActions
              :selected-count="visibleSelected.length"
              :visible-count="visibleIngredients.length"
              @select-all="selectAllIngredients"
              @deselect-all="deselectIngredients"
              @next="goToTags"
            />
          </template>
        </v-stepper-vertical-item>
        <v-stepper-vertical-item :value="2" title="Tagi" bg-color="transparent">
          <template #default>
            <v-switch v-model="state.anyTag" class="ml-1 mr-4" label="Dowolny tag" />
            <v-btn
              v-for="tag in tags"
              :key="tag.id"
              :class="{ 'blue-glass': state.selectedTags.includes(tag.id) }"
              class="mx-1 my-1 glass-background"
              elevation="2"
              type="button"
              @click="switchTag(tag.id)"
            >
              {{ tag.name }}
            </v-btn>
            <RandomDrinkStats
              :filtered-ingredient-count="filteredIngredient.length"
              :all-ingredients-count="ingredients.length"
              :available-drinks-count="availableDrinks.length"
            />
            <div class="d-flex justify-space-between mt-2 mb-2">
              <v-btn class="glass-background" type="button" @click="goToIngredients">Powrót</v-btn>
              <v-btn
                :disabled="availableDrinks.length === 0"
                class="glass-background blue-glass"
                type="button"
                @click="shuffle"
              >
                Losuj
              </v-btn>
              <v-btn class="glass-background" type="button" @click="clearTags">Wyczyść tagi</v-btn>
            </div>
          </template>
        </v-stepper-vertical-item>
      </v-stepper-vertical>
    </div>
  </div>
  <div v-else class="content-container">
    <DrinkPreview v-if="selectedDrink" :drink="selectedDrink" />
    <div class="d-flex mt-2 mx-2 ga-2">
      <v-btn class="glass-background flex-1-1" type="button" @click="backToSelect">Powrót</v-btn>
      <v-btn class="glass-background flex-1-1" type="button" @click="shuffle">Losuj następny</v-btn>
    </div>
  </div>
</template>

<style scoped>
:deep(.v-list-item__overlay) {
  background: transparent;
}
</style>
