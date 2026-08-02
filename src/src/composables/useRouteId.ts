import type { ComputedRef } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteId() {
  // setup
  const route: RouteLocationNormalizedLoaded = useRoute();

  // computed
  const id: ComputedRef<number> = computed(() => parseInt(route.params['id'] as string));

  return { id };
}
