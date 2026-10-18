<script setup lang="ts">
import type { OzaSuppliesStore } from '@store/oza-supplies';
import type { ComputedRef } from 'vue';

import AutocompleteSingle from '@components/layout/AutocompleteSingle.vue';
import { useIngredientEditOza } from '@composables/ingredients/useIngredientEditOza';
import { computed } from 'vue';

import type { OzaSupply } from '@/api/response';
import type { Ingredient } from '@/api/response';

import { useOzaSuppliesStore } from '@/store';

// interfaces
type Events = (e: 'stopEdit') => void;

interface Props {
  ingredient: Ingredient;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();

const ozaSuppliesStore: OzaSuppliesStore = useOzaSuppliesStore();

// composables
const { ozaId, remove, update, valid } = useIngredientEditOza(props.ingredient);

// computed
const supplies: ComputedRef<OzaSupply[]> = computed(() => ozaSuppliesStore.supplies);

// actions
function stopEdit(): void {
  emit('stopEdit');
}
</script>

<template>
  <v-list-item>
    <template #prepend>
      <v-btn
        icon="mdi-close"
        type="button"
        @click="stopEdit"
      />
      <v-btn
        :disabled="ingredient.ozaId === 0 || ingredient.ozaId === null"
        icon
        type="button"
        @click="remove(stopEdit)"
      >
        <v-icon color="black">mdi-delete</v-icon>
      </v-btn>
    </template>
    <template #default>
      <AutocompleteSingle
        v-model="ozaId"
        label="Zapas"
        :items="supplies"
        class="ma-2"
      />
    </template>
    <template #append>
      <v-btn
        :disabled="!valid"
        icon
        type="button"
        @click="update(stopEdit)"
      >
        <v-icon color="black">mdi-content-save</v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
