<script setup lang="ts">
import { useIngredientEdit } from '@composables/ingredients/useIngredientEdit';
import lengths from '@config/lengths';

import type { Ingredient } from '@/api/response';

// interfaces
type Events = (e: 'stopEdit') => void;

interface Props {
  ingredient: Ingredient;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();

const maxLength: number = lengths.ingredientName;

// composables
const { formErrors, state, update, valid } = useIngredientEdit(props.ingredient);

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
    </template>
    <template #default>
      <v-text-field
        v-model="state.name"
        :counter="maxLength"
        :error-messages="formErrors"
        :maxlength="maxLength"
        label="Nazwa"
        required
        class="mt-2"
      />
      <v-textarea
        v-model="state.description"
        class="mb-2"
        label="Opis"
        rows="2"
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
