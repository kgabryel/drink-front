import type { FullDrinkResponse } from '@models/api/full-drink.response';
import type { ComputedRef, Ref } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { drinksService } from '@services/drinks.service';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { names } from '@/router/names';

export function useDrinkPublicView() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const route: RouteLocationNormalizedLoaded = useRoute();

  // state
  const drink: Ref<FullDrinkResponse | undefined> = ref(undefined);

  // computed
  const id: ComputedRef<string> = computed(() => route.params['id'] as string);

  // actions
  async function load(): Promise<void> {
    drinksService
      .loadPublicDrink(id.value)
      .then((result: FullDrinkResponse) => (drink.value = result))
      .catch(async () => await router.push({ name: names.notFound }));
  }

  return { drink, load };
}
