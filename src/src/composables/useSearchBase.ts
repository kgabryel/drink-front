import type { SearchStore } from '@store/search';
import type { ComputedRef } from 'vue';

import { computed } from 'vue';

import { useSearchStore } from '@/store';

export function useSearchBase(isModified: () => boolean, search: () => void) {
  // setup
  const searchStore: SearchStore = useSearchStore();

  // computed
  const modified: ComputedRef<boolean> = computed(isModified);

  // actions
  function close() {
    searchStore.close();
  }

  function searchIfModified(): void {
    if (modified.value) {
      search();
    }
  }

  return { close, searchIfModified };
}
