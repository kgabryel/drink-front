import type { DrinksCardsSearch } from '@models/search/drinks-cards.search';
import type { DrinksSearch } from '@models/search/drinks.search';
import type { IngredientsSearch } from '@models/search/ingredients.search';
import type { TagsSearch } from '@models/search/tags.search';
import type { SettingsStore } from '@store/settings';
import type { ComputedRef, Ref } from 'vue';

import { useSettingsStore } from '@store/settings';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

const TAGS_INIT: TagsSearch = { name: '' };
const INGREDIENTS_INIT: IngredientsSearch = { available: null, name: '' };
const DRINKS_CARDS_INIT: DrinksCardsSearch = { active: null, name: '' };

export function getDrinksInit(settingsStore: SettingsStore): DrinksSearch {
  return {
    ingredients: [],
    name: '',
    onlyAvailable: settingsStore.onlyAvailable,
    onlyFavourite: false,
    tags: [],
  };
}

export function isTagsSearchModified(search: TagsSearch): boolean {
  return search.name !== '';
}

export function isIngredientsSearchModified(search: IngredientsSearch): boolean {
  return search.name !== '' || search.available !== null;
}

export function isDrinksCardsSearchModified(search: DrinksCardsSearch): boolean {
  return search.name !== '' || search.active !== null;
}

export function isDrinksSearchModified(search: DrinksSearch, settingsStore: SettingsStore): boolean {
  return (
    search.name !== '' ||
    search.onlyAvailable !== settingsStore.onlyAvailable ||
    search.onlyFavourite !== false ||
    search.tags.length > 0 ||
    search.ingredients.length > 0
  );
}

export const useSearchStore = defineStore('search', () => {
  // setup
  const settingsStore: SettingsStore = useSettingsStore();

  // state
  const isOpen: Ref<boolean> = ref(false);
  const tags: TagsSearch = reactive<TagsSearch>({ ...TAGS_INIT });
  const ingredients: IngredientsSearch = reactive<IngredientsSearch>({ ...INGREDIENTS_INIT });
  const drinksCards: DrinksCardsSearch = reactive<DrinksCardsSearch>({ ...DRINKS_CARDS_INIT });
  const drinks: DrinksSearch = reactive<DrinksSearch>(getDrinksInit(settingsStore));

  // getters
  const isTagsSearchActive: ComputedRef<boolean> = computed(() => isTagsSearchModified(tags));

  const isIngredientsSearchActive: ComputedRef<boolean> = computed(() => isIngredientsSearchModified(ingredients));

  const isDrinksCardsSearchActive: ComputedRef<boolean> = computed(() => isDrinksCardsSearchModified(drinksCards));

  const isDrinksSearchActive: ComputedRef<boolean> = computed(() => isDrinksSearchModified(drinks, settingsStore));

  // actions
  function open(): void {
    isOpen.value = true;
  }

  function close(): void {
    isOpen.value = false;
  }

  function reset(): void {
    isOpen.value = false;
    Object.assign(tags, TAGS_INIT);
    Object.assign(ingredients, INGREDIENTS_INIT);
    Object.assign(drinksCards, DRINKS_CARDS_INIT);
    Object.assign(drinks, getDrinksInit(settingsStore));
  }

  return {
    close,
    drinks,
    drinksCards,
    ingredients,
    isDrinksCardsSearchActive,
    isDrinksSearchActive,
    isIngredientsSearchActive,
    isOpen,
    isTagsSearchActive,
    open,
    reset,
    tags,
  };
});

export type SearchStore = ReturnType<typeof useSearchStore>;
