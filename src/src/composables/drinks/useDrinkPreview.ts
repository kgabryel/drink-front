import type { UpdateRequest } from '@models/update.request';
import type { DrinksStore } from '@store/drinks';
import type { Ref } from 'vue';

import { useDrinkPositions } from '@composables/drinks/useDrinkPositions';
import messages from '@config/messages';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import type { Drink } from '@/api/response';

import { names } from '@/router/names';
import { useDrinksStore } from '@/store';

export function useDrinkPreview(drink: Ref<Drink>) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();
  const router: ReturnType<typeof useRouter> = useRouter();

  // composables
  const { positions, tags } = useDrinkPositions(drink);

  // actions
  async function remove(redirect: boolean = false): Promise<void> {
    const success: boolean = await drinksStore.deleteDrink(drink.value.id);

    if (!success) {
      return;
    }
    toast.success(messages.drinkDeleted);

    if (redirect) {
      await router.push({ name: names.allDrinks });
    }
  }

  async function updateFavourite(): Promise<void> {
    const data: UpdateRequest<boolean> = {
      data: !drink.value.favourite,
      id: drink.value.id,
    };
    const success: boolean = await drinksStore.updateDrinkFavourite(data);

    if (!success) {
      return;
    }
    toast.success(messages.drinkUpdated);
  }

  return { positions, remove, tags, updateFavourite };
}
