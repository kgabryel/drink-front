<script setup lang="ts">
import type { SelectOption } from '@config/options';

import { useIngredientSearch } from '@composables/ingredients/useIngredientSearch';
import lengths from '@config/lengths';
import { availableOptions } from '@config/options';
import { onMounted } from 'vue';

// setup
const maxLength: number = lengths.tag;
const selectOptions: SelectOption<boolean | null>[] = availableOptions;

// composables
const { clear, close, draft, search, searchIfModified } = useIngredientSearch();

// lifecycle
onMounted(searchIfModified);
</script>

<template>
  <div>
    <div class="d-flex ga-2">
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="clear"
      >
        Wyczyść
      </v-btn>
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="close"
      >
        Zamknij
      </v-btn>
    </div>
    <v-text-field
      v-model="draft.name"
      :maxlength="maxLength"
      class="mb-2 mt-3 pt-1"
      label="Nazwa"
      required
    />
    <v-select
      v-model="draft.available"
      :items="selectOptions"
      item-title="text"
      item-value="value"
      label="Dostępne"
    />
    <v-btn
      class="glass-background w-100"
      type="button"
      @click="search"
    >
      Szukaj
    </v-btn>
  </div>
</template>
