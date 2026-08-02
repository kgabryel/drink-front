<script setup lang="ts">
import AutocompleteMultiple from '@components/layout/AutocompleteMultiple.vue';
import { useDrinkSearch } from '@composables/drinks/useDrinkSearch';
import lengths from '@config/lengths';
import { onMounted } from 'vue';

// setup
const maxDrinkLength: number = lengths.drinkName;

// composables
const { clear, close, draft, ingredients, search, searchIfModified, tags } = useDrinkSearch();

// lifecycle
onMounted(searchIfModified);
</script>

<template>
  <div>
    <div class="d-flex ga-2">
      <v-btn class="glass-background flex-1-1" type="button" @click="clear">Wyczyść</v-btn>
      <v-btn class="glass-background flex-1-1" type="button" @click="close">Zamknij</v-btn>
    </div>
    <v-text-field v-model="draft.name" :maxlength="maxDrinkLength" class="mb-2 mt-2 mr-2" label="Nazwa" required />
    <div class="d-flex justify-center">
      <v-switch v-model="draft.onlyFavourite" class="mt-1" label="Tylko ulubione" />
      <v-switch v-model="draft.onlyAvailable" class="mt-1 ml-3" label="Tylko dostępne" />
    </div>
    <AutocompleteMultiple v-model="draft.tags" label="Tagi" :items="tags" />
    <AutocompleteMultiple v-model="draft.ingredients" label="Składniki" :items="ingredients" />
    <v-btn class="glass-background w-100" type="button" @click="search">Szukaj</v-btn>
  </div>
</template>
