import type { DrinkRequest } from '@models/api/drink.request';
import type { Drink } from '@models/store/drink';
import type { DrinksStore } from '@store/drinks';

import messages from '@config/messages';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { names } from '@/router/names';
import { useDrinksStore } from '@/store';

export function useDrinkCreate() {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const router: ReturnType<typeof useRouter> = useRouter();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function create(data: DrinkRequest): Promise<void> {
    const created: Drink | false = await drinksStore.addDrink(data);

    if (!created) {
      return;
    }
    toast.success(messages.drinkAdded);
    await router.push({ name: names.drink, params: { id: created.id } });
  }

  return { create };
}
