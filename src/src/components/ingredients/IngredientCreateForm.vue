<script setup lang="ts">
import type { OzaSupply } from '@models/store/oza-supply';
import type { OzaSuppliesStore } from '@store/oza-supplies';
import type { ComputedRef } from 'vue';

import AutocompleteSingle from '@components/layout/AutocompleteSingle.vue';
import { useIngredientCreate } from '@composables/ingredients/useIngredientCreate';
import lengths from '@config/lengths';
import { computed } from 'vue';

import { useOzaSuppliesStore } from '@/store';

// setup
const ozaSuppliesStore: OzaSuppliesStore = useOzaSuppliesStore();
const maxLength: number = lengths.ingredientName;

// composables
const { create, formErrors, state, valid } = useIngredientCreate();

// computed
const supplies: ComputedRef<OzaSupply[]> = computed(() => ozaSuppliesStore.supplies);
</script>

<template>
  <div class="content-container px-2">
    <div class="glass-background my-2 pa-2">
      <div class="d-flex pt-1">
        <v-text-field
          v-model="state.name"
          :counter="maxLength"
          :error-messages="formErrors"
          :maxlength="maxLength"
          class="mb-2 mt-2 mr-2"
          label="Nazwa"
          required
        />
        <v-switch v-model="state.available" class="mt-1 ml-2" label="Dostępne" />
      </div>
      <v-textarea v-model="state.description" class="mb-2" label="Opis" rows="2" />
      <AutocompleteSingle
        v-if="supplies.length > 0"
        v-model="state.ozaId"
        label="Zapas"
        :items="supplies"
        class="mb-2"
      />
      <v-btn :disabled="!valid" block class="glass-background" type="button" @click="create">Dodaj</v-btn>
    </div>
  </div>
</template>
