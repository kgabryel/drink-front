<script setup lang="ts">
import RandomDrinkIngredientsActions from '@components/drinks/RandomDrinkIngredientsActions.vue';
import AvailableIcon from '@components/layout/AvailableIcon.vue';

import type { Ingredient } from '@/api/response';

// interfaces
interface Props {
  additionalIngredients: boolean;
  ingredients: Ingredient[];
  onlyAvailable: boolean;
  selectedIngredients: number[];
  visibleCount: number;
  visibleSelectedCount: number;
}

interface Events {
  (e: 'deselect-all' | 'next' | 'select-all'): void;
  (e: 'toggle', id: number, value: boolean | null): void;
  (e: 'update:additionalIngredients' | 'update:onlyAvailable', value: boolean): void;
  (e: 'update:selectedIngredients', value: number[]): void;
}

// setup
defineProps<Props>();
const emit: Events = defineEmits<Events>();

// actions
function deselectAll(): void {
  emit('deselect-all');
}

function next(): void {
  emit('next');
}

function selectAll(): void {
  emit('select-all');
}

function toggle(id: number, value: boolean | null): void {
  emit('toggle', id, value);
}

function updateAdditionalIngredients(value: boolean | null): void {
  emit('update:additionalIngredients', value ?? false);
}

function updateOnlyAvailable(value: boolean | null): void {
  emit('update:onlyAvailable', value ?? false);
}

function updateSelectedIngredients(value: unknown[]): void {
  emit('update:selectedIngredients', value as number[]);
}
</script>

<template>
  <template v-if="ingredients.length > 10">
    <slot name="stats" />
  </template>
  <v-switch
    :model-value="onlyAvailable"
    class="mt-2"
    label="Ukryj brakujące składniki"
    @update:model-value="updateOnlyAvailable"
  />
  <v-switch
    :model-value="additionalIngredients"
    class="mt-0"
    label="Dodatkowe składniki"
    @update:model-value="updateAdditionalIngredients"
  />
  <RandomDrinkIngredientsActions
    v-if="ingredients.length > 10"
    :selected-count="visibleSelectedCount"
    :visible-count="visibleCount"
    @select-all="selectAll"
    @deselect-all="deselectAll"
    @next="next"
  />
  <v-list
    :selected="selectedIngredients"
    select-strategy="classic"
    @update:selected="updateSelectedIngredients"
  >
    <v-list-item
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :class="{ 'd-none': onlyAvailable && !ingredient.available }"
      :value="ingredient.id"
      class="px-0 py-0"
    >
      <template #prepend>
        <v-switch
          :model-value="selectedIngredients.includes(ingredient.id)"
          class="ml-1 mr-4"
          @update:model-value="(val) => toggle(ingredient.id, val)"
        />
      </template>
      <template #title>
        {{ ingredient.name }}
      </template>
      <template #append>
        <AvailableIcon
          :vivid="false"
          :is-available="ingredient.available"
        />
      </template>
    </v-list-item>
  </v-list>
  <template v-if="ingredients.length > 10">
    <slot name="stats" />
  </template>
  <RandomDrinkIngredientsActions
    :selected-count="visibleSelectedCount"
    :visible-count="visibleCount"
    @select-all="selectAll"
    @deselect-all="deselectAll"
    @next="next"
  />
</template>

<style scoped>
:deep(.v-list-item__overlay) {
  background: transparent;
}
</style>
