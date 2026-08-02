import type { Drink } from '@models/store/drink';
import type { DrinksStore } from '@store/drinks';
import type { ComputedRef } from 'vue';

import { useRouteId } from '@composables/useRouteId';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { names } from '@/router/names';
import { useDrinksStore } from '@/store';

export function useDrinkByRoute() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const drinksStore: DrinksStore = useDrinksStore();

  // composables
  const { id } = useRouteId();

  // computed
  const drink: ComputedRef<Drink | undefined> = computed(() => drinksStore.drinkById(id.value));

  // watch
  watch(
    drink,
    async (value: Drink | undefined) => {
      if (value === undefined) {
        await router.push({ name: names.notFound });
      }
    },
    { immediate: true },
  );

  return { drink };
}
