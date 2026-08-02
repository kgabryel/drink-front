<script setup lang="ts">
import type { SearchStore } from '@store/search';

import IngredientCreateForm from '@components/ingredients/IngredientCreateForm.vue';
import IngredientSearch from '@components/ingredients/IngredientSearch.vue';
import IngredientsList from '@components/ingredients/IngredientsList.vue';

import { useSearchStore } from '@/store';

// setup
const searchStore: SearchStore = useSearchStore();
</script>

<template>
  <IngredientCreateForm />
  <IngredientsList />
  <v-dialog v-model="searchStore.isOpen">
    <IngredientSearch class="glass-background--light pa-2" />
  </v-dialog>
</template>
