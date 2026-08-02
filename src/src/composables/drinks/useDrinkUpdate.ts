import type { DrinkRequest } from '@models/api/drink.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Drink } from '@models/store/drink';
import type { DrinksStore } from '@store/drinks';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { useDrinksStore } from '@store/drinks';
import { useToast } from 'vue-toastification';

export function useDrinkUpdate(drink: Ref<Drink>) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function update(data: DrinkRequest): Promise<void> {
    const payload: UpdateRequest<DrinkRequest> = {
      data: data,
      id: drink.value.id,
    };

    const success: boolean = await drinksStore.updateDrink(payload);

    if (!success) {
      return;
    }
    toast.success(messages.drinkUpdated);
  }

  return { update };
}
