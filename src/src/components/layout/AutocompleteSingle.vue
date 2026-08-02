<script setup lang="ts">
import type { Ref } from 'vue';

import { ref } from 'vue';

import { filterName } from '@/utils/form.utils';

// interfaces
interface Props {
  label: string;
  items: { name: string; id: number }[];
}

// setup
defineProps<Props>();

const model: Ref<number | null> = defineModel<number | null>({ required: true });

// state
const search: Ref<string> = ref('');
</script>

<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :custom-filter="filterName"
    :items="items"
    item-title="name"
    item-value="id"
    :label="label"
  >
    <template #no-data>
      <span class="px-2 py-2">Brak rezultatów dla: "{{ search }}".</span>
    </template>
  </v-autocomplete>
</template>
