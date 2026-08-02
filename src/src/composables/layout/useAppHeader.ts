import type { SearchStore } from '@store/search';
import type { ComputedRef } from 'vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { names } from '@/router/names';
import { useSearchStore } from '@/store';

export function useAppHeader() {
  // setup
  const route: ReturnType<typeof useRoute> = useRoute();
  const searchStore: SearchStore = useSearchStore();
  const hiddenRoutes: string[] = [
    names.createDrink,
    names.randomDrink,
    names.ingredientDrinks,
    names.tagDrinks,
    names.editDrink,
    names.drink,
    names.account,
    names.createDrinksCard,
  ];

  // computed
  const searchActive: ComputedRef<boolean> = computed(() => {
    switch (route.name) {
      case names.tags:
        return searchStore.isTagsSearchActive;
      case names.ingredients:
        return searchStore.isIngredientsSearchActive;
      case names.allDrinks:
        return searchStore.isDrinksSearchActive;
      case names.allDrinksCards:
        return searchStore.isDrinksCardsSearchActive;
      default:
        return false;
    }
  });

  const showAccountBtn: ComputedRef<boolean> = computed(() => route.name !== names.account);

  const isSearchButtonHidden: ComputedRef<boolean> = computed(() => hiddenRoutes.includes(route.name as string));

  const addUrl: ComputedRef<string> = computed(() => {
    switch (route.name) {
      case names.allDrinks:
      case names.drink:
      case names.editDrink:
        return names.createDrink;

      case names.allDrinksCards:
      case names.editDrinksCard:
        return names.createDrinksCard;

      default:
        return '';
    }
  });

  return { addUrl, isSearchButtonHidden, searchActive, showAccountBtn };
}
