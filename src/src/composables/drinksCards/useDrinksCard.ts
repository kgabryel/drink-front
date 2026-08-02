import type { DrinksCard } from '@models/store/drinks-card';
import type { DrinksCardsStore } from '@store/drinks-cards';
import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';

import { base } from '@/router/routes';
import { useDrinksCardsStore } from '@/store';

export function useDrinksCard(drinksCard: Ref<DrinksCard>) {
  // setup
  const drinksCardsStore: DrinksCardsStore = useDrinksCardsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // computed
  const url: ComputedRef<string> = computed(() => `${base}public/drinks-cards/${drinksCard.value.publicId}`);

  // actions
  async function changeActivity(): Promise<void> {
    const success: boolean = await drinksCardsStore.modifyDrinksCardActivity(
      drinksCard.value.id,
      !drinksCard.value.active,
    );

    if (!success) {
      return;
    }
    toast.success(messages.drinksCardUpdated);
  }

  async function remove(): Promise<void> {
    const success: boolean = await drinksCardsStore.deleteDrinksCard(drinksCard.value.id);

    if (!success) {
      return;
    }
    toast.success(messages.drinksCardDeleted);
  }

  return { changeActivity, remove, url };
}
