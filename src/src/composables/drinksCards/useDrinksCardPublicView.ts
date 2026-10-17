import type { AxiosResponse } from 'axios';
import type { ComputedRef, Ref } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import messages from '@config/messages';
import { drinksCardsService } from '@services/drinksCards.service';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import type { FullDrinkResponse } from '@/api/response';

import { names } from '@/router/names';

export function useDrinksCardPublicView() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const toast: ReturnType<typeof useToast> = useToast();
  const route: RouteLocationNormalizedLoaded = useRoute();

  // state
  const loaded: Ref<boolean> = ref(false);
  const drinks: Ref<FullDrinkResponse[]> = ref([]);

  // computed
  const id: ComputedRef<string> = computed(() => route.params['id'] as string);

  // actions
  async function load(): Promise<void> {
    drinksCardsService
      .find(id.value)
      .then((result: FullDrinkResponse[]) => {
        drinks.value = result;
        loaded.value = true;
      })
      .catch(async (exception: AxiosResponse) => {
        if (exception.status === 423) {
          toast.error(messages.drinksCardUnavailable);
          await router.push({ name: names.allDrinks });
        } else if (exception.status === 404) {
          await router.push({ name: names.notFound });
        } else {
          toast.error(messages.serverError);
          await router.push({ name: names.allDrinks });
        }
      });
  }

  return { drinks, load, loaded };
}
