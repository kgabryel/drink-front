import type { Ref } from 'vue';

import { onUnmounted } from 'vue';
import { ref, watch } from 'vue';

export function useChunkedList<T>(drinks: Ref<T[]>) {
  // setup
  let cancelled: boolean = false;
  let currentLoadId: number = 0;

  // state
  const loaded: Ref<T[]> = ref([]);
  const ready: Ref<boolean> = ref(false);

  // watch
  watch(drinks, loadChunks, { immediate: true });

  // lifecycle
  onUnmounted(() => {
    cancelled = true;
  });

  // actions
  async function loadChunks(): Promise<void> {
    const loadId: number = ++currentLoadId;
    const chunks: T[] = [...drinks.value];
    loaded.value = [];
    ready.value = false;

    while (chunks.length > 0) {
      if (cancelled || loadId !== currentLoadId) {
        return;
      }

      loaded.value.push(...chunks.splice(0, 100));
      await new Promise<void>((resolve: () => void) => setTimeout(resolve, 500));
    }

    if (!cancelled && loadId === currentLoadId) {
      ready.value = true;
    }
  }

  return { loaded, ready };
}
