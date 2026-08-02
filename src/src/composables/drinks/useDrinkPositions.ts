import type { Drink } from '@models/store/drink';
import type { DrinkPosition } from '@models/store/drink-position';
import type { Ingredient } from '@models/store/ingredient';
import type { Tag } from '@models/store/tag';
import type { IngredientsStore } from '@store/ingredients';
import type { TagsStore } from '@store/tags';
import type { ComputedRef, Ref } from 'vue';

import { useIngredientsStore } from '@store/ingredients';
import { useTagsStore } from '@store/tags';
import { computed } from 'vue';

interface FullDrinkPosition {
  id: number;
  amount: string | null;
  ingredient: Ingredient;
}

export function useDrinkPositions(drink: Ref<Drink>) {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const ingredientsStore: IngredientsStore = useIngredientsStore();

  // computed
  const tags: ComputedRef<Tag[]> = computed(() =>
    drink.value.tags
      .map((tag: number) => tagsStore.tagById(tag))
      .filter((tag: Tag | undefined): tag is Tag => tag !== undefined),
  );

  const positions: ComputedRef<FullDrinkPosition[]> = computed(
    () =>
      drink.value.positions
        .map((position: DrinkPosition) => {
          const ingredient: Ingredient | undefined = ingredientsStore.ingredientById(position.ingredientId);

          if (!ingredient) {
            return null;
          }

          return {
            amount: position.amount,
            id: position.id,
            ingredient,
          };
        })
        .filter(
          (position: FullDrinkPosition | null): position is FullDrinkPosition => position !== null,
        ) as FullDrinkPosition[],
  );

  return { positions, tags };
}
