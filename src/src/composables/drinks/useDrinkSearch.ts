import type { DrinksSearch } from '@models/search/drinks.search';
import type { IngredientsStore } from '@store/ingredients';
import type { SearchStore } from '@store/search';
import type { SettingsStore } from '@store/settings';
import type { TagsStore } from '@store/tags';
import type { ComputedRef } from 'vue';

import { useSearchBase } from '@composables/useSearchBase';
import { isDrinksSearchModified } from '@store/search';
import { computed, reactive } from 'vue';

import type { Ingredient } from '@/api/response';
import type { Tag } from '@/api/response';

import { useIngredientsStore, useSearchStore, useSettingsStore, useTagsStore } from '@/store';

export function useDrinkSearch() {
  // setup
  const searchStore: SearchStore = useSearchStore();
  const settingsStore: SettingsStore = useSettingsStore();
  const tagsStore: TagsStore = useTagsStore();
  const ingredientsStore: IngredientsStore = useIngredientsStore();

  // state
  const draft: DrinksSearch = reactive<DrinksSearch>({ ...searchStore.drinks });

  // composables
  const { close, searchIfModified } = useSearchBase(() => isDrinksSearchModified(draft, settingsStore), search);

  // computed
  const tags: ComputedRef<Tag[]> = computed(() => tagsStore.tags);

  const ingredients: ComputedRef<Ingredient[]> = computed(() => ingredientsStore.ingredients);

  // actions
  function clear() {
    draft.name = '';
    draft.onlyAvailable = settingsStore.onlyAvailable;
    draft.onlyFavourite = false;
    draft.ingredients = [];
    draft.tags = [];
    search();
  }

  function search(): void {
    searchStore.drinks.name = draft.name;
    searchStore.drinks.onlyAvailable = draft.onlyAvailable;
    searchStore.drinks.onlyFavourite = draft.onlyFavourite;
    searchStore.drinks.ingredients = draft.ingredients;
    searchStore.drinks.tags = draft.tags;
  }

  return { clear, close, draft, ingredients, search, searchIfModified, tags };
}
