import type { IngredientsSearch } from '@models/search/ingredients.search';
import type { Ingredient } from '@models/store/ingredient';
import type { IngredientsStore } from '@store/ingredients';
import type { SearchStore } from '@store/search';
import type { ComputedRef } from 'vue';

import { stringsService } from '@services/strings.service';
import { computed } from 'vue';

import { useIngredientsStore, useSearchStore } from '@/store';

export function useIngredientsFilter() {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const searchStore: SearchStore = useSearchStore();

  // computed
  const search: ComputedRef<IngredientsSearch> = computed(() => searchStore.ingredients);

  const filteredIngredients: ComputedRef<Ingredient[]> = computed(() =>
    ingredientsStore.ingredients
      .filter((element: Ingredient) => {
        if (search.value.available !== null) {
          if (element.available !== search.value.available) {
            return false;
          }
        }

        return stringsService.stringIncludes(element.name, search.value.name);
      })
      .sort((a: Ingredient, b: Ingredient) => stringsService.compareString(a.name, b.name)),
  );

  return { filteredIngredients };
}
