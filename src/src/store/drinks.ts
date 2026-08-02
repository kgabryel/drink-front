import type { DrinkRequest } from '@models/api/drink.request';
import type { ReorderPhotoRequest } from '@models/api/reorder-photo.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Drink } from '@models/store/drink';
import type { DrinkPosition } from '@models/store/drink-position';
import type { AxiosResponse } from 'axios';
import type { ComputedRef, Ref } from 'vue';

import { drinksService } from '@services/drinks.service';
import { errorHandler } from '@services/errorHandler';
import { stringsService } from '@services/strings.service';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { removeById, replaceById } from '@/utils/store.utils';

export const useDrinksStore = defineStore('drinks', () => {
  // state
  const data: Ref<Drink[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  // getters
  const drinks: ComputedRef<Drink[]> = computed(() =>
    data.value.sort((a: Drink, b: Drink) => stringsService.compareString(a.name, b.name)),
  );

  function drinkById(id: number): Drink | undefined {
    return data.value.find((drink: Drink) => drink.id === id);
  }

  function drinksForTagId(tagId: number): Drink[] {
    return data.value.filter((drink: Drink) => drink.tags.includes(tagId));
  }

  function drinksForIngredientId(ingredientId: number): Drink[] {
    return data.value.filter((drink: Drink) =>
      drink.positions.some((position: DrinkPosition) => position.ingredientId === ingredientId),
    );
  }

  // actions
  function addDrink(payload: DrinkRequest): Promise<Drink | false> {
    return drinksService
      .add(payload)
      .then((drink: Drink) => {
        data.value.push(drink);

        return drink;
      })
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function addPhoto(drinkId: number, photo: string): Promise<boolean> {
    return drinksService
      .addPhoto(drinkId, photo)
      .then((updated: Drink) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function deleteDrink(id: number): Promise<boolean> {
    return drinksService
      .delete(id)
      .then(() => removeById(data.value, id))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function loadDrinks(): Promise<void> {
    return drinksService.load().then((result: Drink[]) => {
      data.value = result;
      loaded.value = true;
    });
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadDrinks();
  }

  function deletePhoto(drinkId: number, photoId: number): Promise<boolean> {
    return drinksService
      .deletePhoto(drinkId, photoId)
      .then((updated: Drink) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateDrinkFavourite(payload: UpdateRequest<boolean>): Promise<boolean> {
    return drinksService
      .updateFavourite(payload)
      .then((updated: Drink) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateDrink(payload: UpdateRequest<DrinkRequest>): Promise<boolean> {
    return drinksService
      .update(payload)
      .then((updated: Drink) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }
  function photosReorder(payload: UpdateRequest<ReorderPhotoRequest>): Promise<boolean> {
    return drinksService
      .photosReorder(payload)
      .then((updated: Drink) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function reset(): void {
    data.value = [];
    loaded.value = false;
  }

  return {
    addDrink,
    addPhoto,
    deleteDrink,
    deletePhoto,
    drinkById,
    drinks,
    drinksForIngredientId,
    drinksForTagId,
    ensureLoaded,
    photosReorder,
    reset,
    updateDrink,
    updateDrinkFavourite,
  };
});

export type DrinksStore = ReturnType<typeof useDrinksStore>;
