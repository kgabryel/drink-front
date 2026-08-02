import type { DrinksCardsSearch } from '@models/search/drinks-cards.search';
import type { SearchStore } from '@store/search';

import { useSearchBase } from '@composables/useSearchBase';
import { isDrinksCardsSearchModified } from '@store/search';
import { reactive } from 'vue';

import { useSearchStore } from '@/store';

export function useDrinksCardSearch() {
  // setup
  const searchStore: SearchStore = useSearchStore();

  // state
  const draft: DrinksCardsSearch = reactive<DrinksCardsSearch>({ ...searchStore.drinksCards });

  // composables
  const { close, searchIfModified } = useSearchBase(() => isDrinksCardsSearchModified(draft), search);

  // actions
  function clear() {
    draft.name = '';
    draft.active = null;
    search();
  }

  function search(): void {
    searchStore.drinksCards.name = draft.name;
    searchStore.drinksCards.active = draft.active;
  }

  return { clear, close, draft, search, searchIfModified };
}
