import type { DrinksCardRequest } from '@models/api/drinks-card.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { DrinksCard } from '@models/store/drinks-card';
import type { AxiosResponse } from 'axios';
import type { Ref } from 'vue';

import { drinksCardsService } from '@services/drinksCards.service';
import { errorHandler } from '@services/errorHandler';
import { stringsService } from '@services/strings.service';
import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref } from 'vue';

import { pushItem, removeById, replaceById } from '@/utils/store.utils';

export const useDrinksCardsStore = defineStore('drinksCards', () => {
  // state
  const data: Ref<DrinksCard[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  // getters
  const drinksCards: ComputedRef<DrinksCard[]> = computed(() =>
    data.value.sort((a: DrinksCard, b: DrinksCard) => stringsService.compareString(a.name, b.name)),
  );

  function drinksCardById(id: number): DrinksCard | undefined {
    return data.value.find((drinksCard: DrinksCard) => drinksCard.id === id);
  }

  // actions
  function loadDrinksCards(): Promise<void> {
    return drinksCardsService.load().then((result: DrinksCard[]) => {
      data.value = result;
      loaded.value = true;
    });
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadDrinksCards();
  }

  function addDrinksCard(payload: DrinksCardRequest): Promise<boolean> {
    return drinksCardsService
      .add(payload)
      .then((drinksCard: DrinksCard) => pushItem(data.value, drinksCard))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function deleteDrinksCard(id: number): Promise<boolean> {
    return drinksCardsService
      .delete(id)
      .then(() => removeById(data.value, id))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateDrinksCard(payload: UpdateRequest<DrinksCardRequest>): Promise<boolean> {
    return drinksCardsService
      .update(payload)
      .then((updated: DrinksCard) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function modifyDrinksCardActivity(id: number, active: boolean): Promise<boolean> {
    return drinksCardsService
      .modifyActivity(id, active)
      .then((updated: DrinksCard) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function reset(): void {
    data.value = [];
    loaded.value = false;
  }

  return {
    addDrinksCard,
    deleteDrinksCard,
    drinksCardById,
    drinksCards,
    ensureLoaded,
    modifyDrinksCardActivity,
    reset,
    updateDrinksCard,
  };
});

export type DrinksCardsStore = ReturnType<typeof useDrinksCardsStore>;
