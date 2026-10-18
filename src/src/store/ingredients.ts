import type { UpdateRequest } from '@models/update.request';
import type { AxiosResponse } from 'axios';
import type { Ref } from 'vue';

import { errorHandler } from '@services/errorHandler';
import { ingredientsService } from '@services/ingredients.service';
import { stringsService } from '@services/strings.service';
import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref } from 'vue';

import type { CreateIngredientRequest, ModifyIngredientRequest } from '@/api/request';
import type { Ingredient } from '@/api/response';

import { pushItem, removeById, replaceById } from '@/utils/store.utils';

export const useIngredientsStore = defineStore('ingredients', () => {
  // state
  const data: Ref<Ingredient[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  // getters
  const ingredients: ComputedRef<Ingredient[]> = computed(() =>
    data.value.sort((a: Ingredient, b: Ingredient) => stringsService.compareString(a.name, b.name)),
  );

  const ingredientById: ComputedRef<(id: number) => Ingredient | undefined> = computed(
    () =>
      (id: number): Ingredient | undefined =>
        data.value.find((ingredient: Ingredient) => ingredient.id === id),
  );

  const ingredientByName: ComputedRef<(name: string) => Ingredient | undefined> = computed(
    () =>
      (name: string): Ingredient | undefined => {
        const lowerName: string = name.toLowerCase();

        return data.value.find((ingredient: Ingredient) => ingredient.name.toLowerCase() === lowerName);
      },
  );

  // actions
  function addIngredient(payload: CreateIngredientRequest): Promise<boolean> {
    return ingredientsService
      .add(payload)
      .then((ingredient: Ingredient) => pushItem(data.value, ingredient))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function reset(): void {
    data.value = [];
    loaded.value = false;
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadIngredients();
  }

  function loadIngredients(): Promise<void> {
    return ingredientsService.load().then((result: Ingredient[]) => {
      data.value = result;
      loaded.value = true;
    });
  }

  function deleteIngredient(id: number): Promise<boolean> {
    return ingredientsService
      .delete(id)
      .then(() => removeById(data.value, id))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateIngredient(payload: UpdateRequest<ModifyIngredientRequest>): Promise<boolean> {
    return ingredientsService
      .update(payload)
      .then((updated: Ingredient) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateIngredientAvailable(payload: UpdateRequest<boolean>): Promise<boolean> {
    return ingredientsService
      .updateAvailable(payload)
      .then((updated: Ingredient) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateOzaId(payload: UpdateRequest<number | null>): Promise<boolean> {
    return ingredientsService
      .updateOzaId(payload)
      .then((updated: Ingredient) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  return {
    addIngredient,
    deleteIngredient,
    ensureLoaded,
    ingredientById,
    ingredientByName,
    ingredients,
    reset,
    updateIngredient,
    updateIngredientAvailable,
    updateOzaId,
  };
});

export type IngredientsStore = ReturnType<typeof useIngredientsStore>;
