import type { DrinksCardsSearch } from '@models/search/drinks-cards.search';
import type { DrinksCard } from '@models/store/drinks-card';
import type { DrinksCardsStore } from '@store/drinks-cards';
import type { SearchStore } from '@store/search';
import type { ComputedRef } from 'vue';

import { stringsService } from '@services/strings.service';
import { computed } from 'vue';

import { useDrinksCardsStore, useSearchStore } from '@/store';

export function useDrinksCardsFilter() {
  // setup
  const drinksCardsStore: DrinksCardsStore = useDrinksCardsStore();
  const searchStore: SearchStore = useSearchStore();

  // computed
  const search: ComputedRef<DrinksCardsSearch> = computed(() => searchStore.drinksCards);

  const filteredDrinksCards: ComputedRef<DrinksCard[]> = computed(() =>
    drinksCardsStore.drinksCards
      .filter((element: DrinksCard) => {
        if (search.value.active !== null) {
          if (element.active !== search.value.active) {
            return false;
          }
        }

        return stringsService.stringIncludes(element.name, search.value.name);
      })
      .sort((a: DrinksCard, b: DrinksCard) => stringsService.compareString(a.name, b.name)),
  );

  return { filteredDrinksCards };
}
