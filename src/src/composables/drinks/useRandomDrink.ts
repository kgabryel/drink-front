import type { DrinksStore } from '@store/drinks';
import type { IngredientsStore } from '@store/ingredients';
import type { TagsStore } from '@store/tags';
import type { ComputedRef } from 'vue';

import { computed, reactive } from 'vue';

import type { Drink } from '@/api/response';
import type { DrinkPosition } from '@/api/response';
import type { Ingredient } from '@/api/response';
import type { Tag } from '@/api/response';

import { useDrinksStore, useIngredientsStore, useTagsStore } from '@/store';

interface State {
  additionalIngredients: boolean;
  onlyAvailable: boolean;
  anyTag: boolean;
  selectedIngredients: number[];
  selectedTags: number[];
}

export function useRandomDrink() {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const drinksStore: DrinksStore = useDrinksStore();
  const tagsStore: TagsStore = useTagsStore();

  // state
  const state: State = reactive<State>({
    additionalIngredients: true,
    anyTag: false,
    onlyAvailable: false,
    selectedIngredients: ingredientsStore.ingredients.map((ingredient: Ingredient) => ingredient.id),
    selectedTags: [],
  });

  // computed
  const ingredients: ComputedRef<Ingredient[]> = computed(() => ingredientsStore.ingredients);

  const tags: ComputedRef<Tag[]> = computed(() => tagsStore.tags);

  const filteredIngredient: ComputedRef<number[]> = computed(() => {
    if (!state.onlyAvailable) {
      return state.selectedIngredients;
    }

    return state.selectedIngredients.filter((id: number) => ingredientsStore.ingredientById(id)?.available);
  });

  const visibleIngredients: ComputedRef<number[]> = computed(() => {
    if (!state.onlyAvailable) {
      return ingredientsStore.ingredients.map((ingredient: Ingredient) => ingredient.id);
    }

    return ingredientsStore.ingredients
      .filter((ingredient: Ingredient) => ingredient.available)
      .map((ingredient: Ingredient) => ingredient.id);
  });

  const visibleSelected: ComputedRef<number[]> = computed(() =>
    state.selectedIngredients.filter((id: number) => filteredIngredient.value.includes(id)),
  );

  const availableDrinks: ComputedRef<Drink[]> = computed(() =>
    drinksStore.drinks.filter((drink: Drink) => checkIngredients(drink) && checkTags(drink)),
  );

  // actions
  function switchTag(id: number): void {
    const index: number = state.selectedTags.indexOf(id);

    if (index === -1) {
      state.selectedTags.push(id);
    } else {
      state.selectedTags.splice(index, 1);
    }
  }

  function deselectIngredients(): void {
    state.selectedIngredients = [];
  }

  function selectAllIngredients(): void {
    state.selectedIngredients = ingredientsStore.ingredients.map((ingredient: Ingredient) => ingredient.id);
  }

  function clearTags(): void {
    state.anyTag = false;
    state.selectedTags = [];
  }

  function checkTags(drink: Drink): boolean {
    if (state.selectedTags.length === 0) {
      return true;
    }
    if (state.anyTag) {
      return drink.tags.some((tagId: number) => state.selectedTags.includes(tagId));
    }

    return state.selectedTags.every((tagId: number) => drink.tags.includes(tagId));
  }

  function checkIngredients(drink: Drink): boolean {
    const drinkIngredients: number[] = drink.positions.map((position: DrinkPosition) => position.ingredientId);

    if (drinkIngredients.length === 0) {
      return false;
    }

    if (!state.additionalIngredients) {
      return drinkIngredients.every((ingredientId: number) => filteredIngredient.value.includes(ingredientId));
    }

    return drinkIngredients.some((ingredientId: number) => filteredIngredient.value.includes(ingredientId));
  }

  function random(): Drink | undefined {
    if (availableDrinks.value.length === 0) {
      return undefined;
    }
    const index: number = Math.floor(Math.random() * availableDrinks.value.length);

    return availableDrinks.value[index];
  }

  function toggleIngredient(id: number, val: boolean | null): void {
    if (val) {
      state.selectedIngredients.push(id);
    } else {
      state.selectedIngredients = state.selectedIngredients.filter((i: number) => i !== id);
    }
  }

  return {
    availableDrinks,
    clearTags,
    deselectIngredients,
    filteredIngredient,
    ingredients,
    random,
    selectAllIngredients,
    state,
    switchTag,
    tags,
    toggleIngredient,
    visibleIngredients,
    visibleSelected,
  };
}
