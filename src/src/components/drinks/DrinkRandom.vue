<script setup lang="ts">
import type { Ref } from 'vue';

import RandomDrinkIngredientsStep from '@components/drinks/RandomDrinkIngredientsStep.vue';
import RandomDrinkStats from '@components/drinks/RandomDrinkStats.vue';
import RandomDrinkTagsStep from '@components/drinks/RandomDrinkTagsStep.vue';
import { useRandomDrink } from '@composables/drinks/useRandomDrink';
import { ref } from 'vue';

import type { Drink } from '@/api/response';

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

function setAnyTag(value: boolean): void {
  state.anyTag = value;
}

function setAdditionalIngredients(value: boolean): void {
  state.additionalIngredients = value;
}

function setOnlyAvailable(value: boolean): void {
  state.onlyAvailable = value;
}

function setSelectedIngredients(value: number[]): void {
  state.selectedIngredients = value;
}
</script>

<template>
  <div v-if="step < 3">
    <div class="content-container px-2">
      <v-stepper-vertical
        v-model="step"
        class="glass-background"
        hide-actions
      >
        <v-stepper-vertical-item
          :value="1"
          title="Składniki"
          bg-color="transparent"
        >
          <template #default>
            <RandomDrinkIngredientsStep
              :additional-ingredients="state.additionalIngredients"
              :ingredients="ingredients"
              :only-available="state.onlyAvailable"
              :selected-ingredients="state.selectedIngredients"
              :visible-count="visibleIngredients.length"
              :visible-selected-count="visibleSelected.length"
              @deselect-all="deselectIngredients"
              @next="goToTags"
              @select-all="selectAllIngredients"
              @toggle="toggleIngredient"
              @update:additional-ingredients="setAdditionalIngredients"
              @update:only-available="setOnlyAvailable"
              @update:selected-ingredients="setSelectedIngredients"
            >
              <template #stats>
                <RandomDrinkStats
                  :all-ingredients-count="ingredients.length"
                  :available-drinks-count="availableDrinks.length"
                  :filtered-ingredient-count="filteredIngredient.length"
                />
              </template>
            </RandomDrinkIngredientsStep>
          </template>
        </v-stepper-vertical-item>
        <v-stepper-vertical-item
          :value="2"
          title="Tagi"
          bg-color="transparent"
        >
          <template #default>
            <RandomDrinkTagsStep
              :any-tag="state.anyTag"
              :shuffle-available="availableDrinks.length > 0"
              :selected-tags="state.selectedTags"
              :tags="tags"
              @back="goToIngredients"
              @clear="clearTags"
              @shuffle="shuffle"
              @switch-tag="switchTag"
              @update:any-tag="setAnyTag"
            >
              <template #stats>
                <RandomDrinkStats
                  :all-ingredients-count="ingredients.length"
                  :available-drinks-count="availableDrinks.length"
                  :filtered-ingredient-count="filteredIngredient.length"
                />
              </template>
            </RandomDrinkTagsStep>
          </template>
        </v-stepper-vertical-item>
      </v-stepper-vertical>
    </div>
  </div>
  <div
    v-else
    class="content-container"
  >
    <DrinkPreview
      v-if="selectedDrink"
      :drink="selectedDrink"
    />
    <div class="d-flex mt-2 mx-2 mb-2 ga-2">
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="backToSelect"
      >
        Powrót
      </v-btn>
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="shuffle"
      >
        Losuj następny
      </v-btn>
    </div>
  </div>
</template>
