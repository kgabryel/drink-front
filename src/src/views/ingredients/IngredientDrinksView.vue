<script setup lang="ts">
import type { Drink } from '@models/store/drink';
import type { DrinksStore } from '@store/drinks';
import type { ComputedRef } from 'vue';

import DrinksList from '@components/drinks/DrinksList.vue';
import { useRouteId } from '@composables/useRouteId';
import { computed } from 'vue';

import { useDrinksStore } from '@/store';

// setup
const drinksStore: DrinksStore = useDrinksStore();

// composables
const { id } = useRouteId();

// computed
const drinks: ComputedRef<Drink[]> = computed(() => drinksStore.drinksForIngredientId(id.value));
</script>

<template>
  <DrinksList :drinks="drinks" />
</template>
