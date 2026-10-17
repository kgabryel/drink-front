import type { DrinksStore } from '@store/drinks';
import type { IngredientsStore } from '@store/ingredients';
import type { TagsStore } from '@store/tags';
import type { ComputedRef } from 'vue';

import { computed, reactive } from 'vue';

import type { DrinksCardRequest } from '@/api/request';
import type { Drink } from '@/api/response';
import type { DrinkPosition } from '@/api/response';
import type { Ingredient } from '@/api/response';
import type { Tag } from '@/api/response';

import { useDrinksStore, useIngredientsStore, useTagsStore } from '@/store';

export interface State {
  active: boolean;
  availableDrinks: number[];
  availableIngredients: number[];
  availableTags: number[];
  excludedDrinks: number[];
  excludedIngredients: number[];
  excludedTags: number[];
  name: string;
}

export function useDrinksCardForm(defaultValues: State) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const tagsStore: TagsStore = useTagsStore();
  const ingredientsStore: IngredientsStore = useIngredientsStore();

  // state
  const state: State = reactive<State>({ ...defaultValues });

  // computed
  const drinksForAvailable: ComputedRef<Drink[]> = computed(() =>
    drinksStore.drinks.filter((drink: Drink) => !state.excludedDrinks.includes(drink.id)),
  );

  const drinksForExcluded: ComputedRef<Drink[]> = computed(() =>
    drinksStore.drinks.filter((drink: Drink) => !state.availableDrinks.includes(drink.id)),
  );

  const tagsForAvailable: ComputedRef<Tag[]> = computed(() =>
    tagsStore.tags.filter((tag: Tag) => !state.excludedTags.includes(tag.id)),
  );

  const tagsForExcluded: ComputedRef<Tag[]> = computed(() =>
    tagsStore.tags.filter((tag: Tag) => !state.availableTags.includes(tag.id)),
  );

  const ingredientsForAvailable: ComputedRef<Ingredient[]> = computed(() =>
    ingredientsStore.ingredients.filter((ingredient: Ingredient) => !state.excludedIngredients.includes(ingredient.id)),
  );

  const ingredientsForExcluded: ComputedRef<Ingredient[]> = computed(() =>
    ingredientsStore.ingredients.filter(
      (ingredient: Ingredient) => !state.availableIngredients.includes(ingredient.id),
    ),
  );

  const selectedDrinks: ComputedRef<Drink[]> = computed(() =>
    drinksStore.drinks.filter((drink: Drink) => check(drink)),
  );

  const valid: ComputedRef<boolean> = computed(() => state.name !== '');

  // actions
  function check(drink: Drink): boolean {
    const drinkIngredients: number[] = drink.positions.map((position: DrinkPosition) => position.ingredientId);

    if (state.excludedDrinks.includes(drink.id)) {
      return false;
    }
    if (drink.tags.some((tag: number) => state.excludedTags.includes(tag))) {
      return false;
    }
    if (drinkIngredients.some((id: number) => state.excludedIngredients.includes(id))) {
      return false;
    }

    if (state.availableTags.some((tag: number) => drink.tags.includes(tag))) {
      return true;
    }
    if (state.availableIngredients.some((id: number) => drinkIngredients.includes(id))) {
      return true;
    }
    if (state.availableDrinks.includes(drink.id)) {
      return true;
    }

    return false;
  }

  function remove(drink: Drink): void {
    state.availableDrinks = state.availableDrinks.filter((id: number) => id !== drink.id);
    if (!state.excludedDrinks.includes(drink.id)) {
      state.excludedDrinks.push(drink.id);
    }
  }

  function submit(callback: (data: DrinksCardRequest) => void): void {
    if (!valid.value) {
      return;
    }

    const data: DrinksCardRequest = {
      active: state.active,
      availableDrinks: state.availableDrinks,
      availableIngredients: state.availableIngredients,
      availableTags: state.availableTags,
      excludedDrinks: state.excludedDrinks,
      excludedIngredients: state.excludedIngredients,
      excludedTags: state.excludedTags,
      name: state.name,
    };
    callback(data);
  }

  return {
    drinksForAvailable,
    drinksForExcluded,
    ingredientsForAvailable,
    ingredientsForExcluded,
    remove,
    selectedDrinks,
    state,
    submit,
    tagsForAvailable,
    tagsForExcluded,
    valid,
  };
}
