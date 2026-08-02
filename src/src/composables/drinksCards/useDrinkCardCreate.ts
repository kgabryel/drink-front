import type { DrinksCardRequest } from '@models/api/drinks-card.request';
import type { DrinksCardsStore } from '@store/drinks-cards';

import messages from '@config/messages';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { names } from '@/router/names';
import { useDrinksCardsStore } from '@/store';

export function useDrinkCardCreate() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const drinksCardsStore: DrinksCardsStore = useDrinksCardsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function create(data: DrinksCardRequest): Promise<void> {
    const success: boolean = await drinksCardsStore.addDrinksCard(data);

    if (!success) {
      return;
    }
    toast.success(messages.drinksCardAdded);
    await router.push({ name: names.allDrinksCards });
  }

  return { create };
}
