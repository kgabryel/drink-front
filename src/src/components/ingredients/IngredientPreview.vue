<script setup lang="ts">
import type { Ref } from 'vue';

import DeleteModal from '@components/layout/DeleteModal.vue';
import { useIngredientPreview } from '@composables/ingredients/useIngredientPreview';
import { ref, toRef } from 'vue';

import type { Ingredient } from '@/api/response';

import { ingredientDrinksHref } from '@/utils/route.utils';

// interfaces
type Events = (e: 'startEdit', oza: boolean) => void;

interface Props {
  ingredient: Ingredient;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();

defineOptions({ inheritAttrs: false });

// state
const showed: Ref<boolean> = ref(false);

// composables
const { changeAvailable, drinksCount, remove, supplies, suppliesReady, supply } = useIngredientPreview(
  toRef(() => props.ingredient),
);

// actions
function startEdit(oza: boolean): void {
  emit('startEdit', oza);
}

function showModel(): void {
  showed.value = true;
}
</script>

<template>
  <v-list-item
    class="w-100"
    v-bind="$attrs"
  >
    <template #prepend>
      <v-switch
        :model-value="ingredient.available"
        :readonly="ingredient.ozaId !== null && suppliesReady"
        class="mr-4 ml-1"
        @update:model-value="changeAvailable"
      />
    </template>
    <template #default>
      <p>{{ ingredient.name }}</p>
      <template v-if="ingredient.ozaId !== null && suppliesReady && supply">
        <small class="mb-0">Dostępność zarządzana przez OZA ({{ supply.amount }})</small>
        <br />
      </template>
      <small class="mb-0">{{ ingredient.description }}</small>
    </template>
    <template #append>
      <v-menu location="bottom">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-menu"
            type="button"
            v-bind="activatorProps"
          />
        </template>
        <v-list class="px-2 py-2">
          <v-list-item
            v-if="drinksCount > 0"
            :href="ingredientDrinksHref(ingredient)"
          >
            <template #title>Lista drinków ({{ drinksCount }})</template>
          </v-list-item>
          <v-list-item @click="startEdit(false)">
            <template #title>Edytuj</template>
          </v-list-item>
          <v-list-item
            :disabled="supplies.length === 0"
            @click="startEdit(true)"
          >
            <template #title>Zapas OZA</template>
          </v-list-item>
          <v-list-item @click="showModel">
            <template #title>Usuń</template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
  <DeleteModal
    v-model="showed"
    @remove="remove(ingredient.id)"
  />
</template>

<style scoped>
:deep(.v-list-item__overlay) {
  display: none;
}
</style>
