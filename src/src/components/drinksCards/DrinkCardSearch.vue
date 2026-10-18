<script setup lang="ts">
import type { SelectOption } from '@config/options';

import { useDrinksCardSearch } from '@composables/drinksCards/useDrinksCardSearch';
import lengths from '@config/lengths';
import { availableOptions } from '@config/options';
import { onMounted } from 'vue';

// setup
const maxLength: number = lengths.drinksCardName;
const selectOptions: SelectOption<boolean | null>[] = availableOptions;

// composables
const { clear, close, draft, search, searchIfModified } = useDrinksCardSearch();

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
      class="mb-2 mt-2 mr-2"
      label="Nazwa"
      required
    />
    <v-select
      v-model="draft.active"
      :items="selectOptions"
      item-title="text"
      item-value="value"
      label="Aktywna"
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
