<script setup lang="ts">
import type { Ref } from 'vue';

import { ref } from 'vue';

import type { Ingredient } from '@/api/response';

import IngredientEditForm from './IngredientEditForm.vue';
import IngredientOzaEditForm from './IngredientOzaEditForm.vue';
import IngredientPreview from './IngredientPreview.vue';

// interfaces
interface Props {
  ingredient: Ingredient;
}

// setup
defineProps<Props>();

// state
const edit: Ref<boolean> = ref(false);
const oza: Ref<boolean> = ref(false);

// actions
function stopEdit(): void {
  edit.value = false;
  oza.value = false;
}

function startEdit(isOza: boolean): void {
  edit.value = true;
  oza.value = isOza;
}
</script>

<template>
  <div>
    <IngredientEditForm v-if="edit && !oza" :ingredient="ingredient" @stop-edit="stopEdit" />
    <IngredientOzaEditForm v-if="edit && oza" :ingredient="ingredient" @stop-edit="stopEdit" />
    <IngredientPreview v-if="!edit" :ingredient="ingredient" @start-edit="startEdit" />
  </div>
</template>
