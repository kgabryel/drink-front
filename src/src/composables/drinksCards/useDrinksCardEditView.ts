import type { DrinksCard } from '@models/store/drinks-card';
import type { DrinksCardsStore } from '@store/drinks-cards';
import type { Ref } from 'vue';

import { useRouteId } from '@composables/useRouteId';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { names } from '@/router/names';
import { useDrinksCardsStore } from '@/store';

export function useDrinksCardEditView() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const drinksStore: DrinksCardsStore = useDrinksCardsStore();

  // state
  const drinksCard: Ref<DrinksCard | undefined> = ref(undefined);

  // composables
  const { id } = useRouteId();

  // actions
  async function find(): Promise<void> {
    const card: DrinksCard | undefined = drinksStore.drinksCardById(id.value);

    if (card === undefined) {
      await router.push({ name: names.notFound });

      return;
    }
    drinksCard.value = card;
  }

  return { drinksCard, find };
}
