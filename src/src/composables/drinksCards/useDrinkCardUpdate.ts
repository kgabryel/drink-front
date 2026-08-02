import type { DrinksCardRequest } from '@models/api/drinks-card.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { DrinksCard } from '@models/store/drinks-card';
import type { DrinksCardsStore } from '@store/drinks-cards';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { useToast } from 'vue-toastification';

import { useDrinksCardsStore } from '@/store';

export function useDrinkCardUpdate(drinksCard: Ref<DrinksCard>) {
  // setup
  const drinksCardsStore: DrinksCardsStore = useDrinksCardsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function update(data: DrinksCardRequest): Promise<void> {
    const payload: UpdateRequest<DrinksCardRequest> = {
      data: data,
      id: drinksCard.value.id,
    };

    const success: boolean = await drinksCardsStore.updateDrinksCard(payload);

    if (!success) {
      return;
    }
    toast.success(messages.drinksCardUpdated);
  }

  return { update };
}
