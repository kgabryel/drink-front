import type { UpdateRequest } from '@models/update.request';
import type { DrinksStore } from '@store/drinks';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { useDrinksStore } from '@store/drinks';
import { useToast } from 'vue-toastification';

import type { DrinkRequest } from '@/api/request';
import type { Drink } from '@/api/response';

export function useDrinkUpdate(drink: Ref<Drink>) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function update(data: DrinkRequest, newTag: boolean): Promise<void> {
    const payload: UpdateRequest<DrinkRequest> = {
      data: data,
      id: drink.value.id,
    };

    const success: boolean = await drinksStore.updateDrink(payload, newTag);

    if (!success) {
      return;
    }
    toast.success(messages.drinkUpdated);
  }

  return { update };
}
