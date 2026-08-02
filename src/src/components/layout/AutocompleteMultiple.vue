<script setup lang="ts">
import type { Ref } from 'vue';

import { watch } from 'vue';
import { ref } from 'vue';

import { filterName } from '@/utils/form.utils';

// interfaces
interface Item {
  name: string;
  id: number;
}
interface Props {
  label: string;
  items: Item[];
}

// setup
defineProps<Props>();

const model: Ref<number[]> = defineModel<number[]>({ required: true });

// state
const search: Ref<string> = ref('');

// watch
watch(model, () => (search.value = ''));

// actions
function remove(item: Item): void {
  model.value = model.value.filter((id: number) => id !== item.id);
}
</script>

<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :custom-filter="filterName"
    :items="items"
    hide-selected
    item-title="name"
    item-value="id"
    :label="label"
    multiple
    :menu-props="{ closeOnContentClick: true }"
  >
    <template #no-data>
      <span class="px-2 py-2">Brak rezultatów dla: "{{ search }}".</span>
    </template>
    <template #item="{ item, props: itemProps }">
      <v-list-item v-bind="itemProps" :title="item.name.toUpperCase()" />
    </template>
    <template #selection="{ item }">
      <v-chip size="small" class="glass-background--opaque" @click="remove(item)">
        {{ item.name.toUpperCase() }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>
