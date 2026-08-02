import type { IngredientsSearch } from '@models/search/ingredients.search';
import type { SearchStore } from '@store/search';

import { useSearchBase } from '@composables/useSearchBase';
import { isIngredientsSearchModified } from '@store/search';
import { reactive } from 'vue';

import { useSearchStore } from '@/store';

export function useIngredientSearch() {
  // setup
  const searchStore: SearchStore = useSearchStore();

  // state
  const draft: IngredientsSearch = reactive<IngredientsSearch>({ ...searchStore.ingredients });

  // composables
  const { close, searchIfModified } = useSearchBase(() => isIngredientsSearchModified(draft), search);

  // actions
  function clear() {
    draft.name = '';
    draft.available = null;
    search();
  }

  function search(): void {
    searchStore.ingredients.name = draft.name;
    searchStore.ingredients.available = draft.available;
  }

  return { clear, close, draft, search, searchIfModified };
}
