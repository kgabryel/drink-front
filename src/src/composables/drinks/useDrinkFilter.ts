import type { DrinksSearch } from '@models/search/drinks.search';
import type { DrinksStore } from '@store/drinks';
import type { IngredientsStore } from '@store/ingredients';
import type { SearchStore } from '@store/search';
import type { ComputedRef } from 'vue';

import { stringsService } from '@services/strings.service';
import { computed } from 'vue';

import type { Drink } from '@/api/response';
import type { DrinkPosition } from '@/api/response';

import { useDrinksStore, useIngredientsStore, useSearchStore } from '@/store';

export function useDrinkFilter() {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const searchStore: SearchStore = useSearchStore();
  const ingredientsStore: IngredientsStore = useIngredientsStore();

  // computed
  const search: ComputedRef<DrinksSearch> = computed(() => searchStore.drinks);

  const filteredDrinks: ComputedRef<Drink[]> = computed(() =>
    drinksStore.drinks.filter((drink: Drink) => check(drink)),
  );

  // actions
  function checkName(drink: Drink): boolean {
    return stringsService.stringIncludes(drink.name, search.value.name);
  }

  function checkFavourite(drink: Drink): boolean {
    return search.value.onlyFavourite ? drink.favourite : true;
  }

  function checkOnlyAvailable(drink: Drink): boolean {
    if (!search.value.onlyAvailable) {
      return true;
    }

    return drink.positions.every(
      (position: DrinkPosition) => ingredientsStore.ingredientById(position.ingredientId)?.available,
    );
  }

  function checkTags(drink: Drink): boolean {
    if (search.value.tags.length === 0) {
      return true;
    }

    return drink.tags.some((tag: number) => search.value.tags.includes(tag));
  }

  function checkIngredients(drink: Drink): boolean {
    if (search.value.ingredients.length === 0) {
      return true;
    }
    const drinkIngredients: number[] = drink.positions.map((position: DrinkPosition) => position.ingredientId);

    return drinkIngredients.some((id: number) => search.value.ingredients.includes(id));
  }

  function check(drink: Drink): boolean {
    return (
      checkName(drink) &&
      checkFavourite(drink) &&
      checkOnlyAvailable(drink) &&
      checkTags(drink) &&
      checkIngredients(drink)
    );
  }

  return { filteredDrinks };
}
