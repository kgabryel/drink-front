import type { IngredientsStore } from '@store/ingredients';
import type { TagsStore } from '@store/tags';
import type { ComputedRef, Ref } from 'vue';

import { useIngredientsStore } from '@store/ingredients';
import { useTagsStore } from '@store/tags';
import { computed, reactive, ref, watch } from 'vue';

import type { DrinkRequest } from '@/api/request';
import type { Drink } from '@/api/response';
import type { DrinkPosition } from '@/api/response';
import type { Ingredient } from '@/api/response';
import type { Tag } from '@/api/response';

interface Position {
  amount: string;
  ingredient: number | null;
}

interface State {
  name: string;
  description: string;
  tags: string[];
  drinkPositions: Position[];
  isPublic: boolean;
  isFavourite: boolean;
}

export function useDrinkForm(drink: Drink | null = null) {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const tagsStore: TagsStore = useTagsStore();

  // state
  const state: State = reactive<State>({
    description: drink?.description ?? '',
    drinkPositions: mapDrinkPositions(drink),
    isFavourite: drink?.favourite ?? false,
    isPublic: drink?.public ?? false,
    name: drink?.name ?? '',
    tags: mapDrinkTags(drink),
  });

  const tagSearch: Ref<string> = ref('');

  // computed
  const availableIngredients: ComputedRef<(currentId?: number | null) => Ingredient[]> = computed(
    () =>
      (currentId: number | null = null): Ingredient[] => {
        const usedIngredients: number[] = state.drinkPositions
          .map((position: Position) => position.ingredient)
          .filter((id: number | null): id is number => id !== null && id !== currentId);

        return ingredientsStore.ingredients.filter(
          (ingredient: Ingredient) => !usedIngredients.includes(ingredient.id),
        );
      },
  );

  const availableTags: ComputedRef<string[]> = computed(() =>
    tagsStore.tags
      .filter((tag: Tag) => !state.tags.includes(tag.name.toUpperCase()))
      .map((tag: Tag) => tag.name.toUpperCase()),
  );

  const addTagAvailable: ComputedRef<boolean> = computed(
    () => tagSearch.value !== '' && !state.tags.includes(tagSearch.value.toUpperCase()),
  );

  const valid: ComputedRef<boolean> = computed(
    () => state.name !== '' && state.drinkPositions.every((position: Position) => position.ingredient !== null),
  );

  // watch
  watch(
    () => state.tags,
    () => {
      const unique: string[] = [...new Set(state.tags.map((tag: string) => tag.toUpperCase()))];

      if (unique.length !== state.tags.length) {
        state.tags = unique;
      }
    },
  );

  // actions
  function addPosition(): void {
    state.drinkPositions.push({
      amount: '',
      ingredient: null,
    });
  }

  function removePosition(index: number): void {
    state.drinkPositions.splice(index, 1);
  }

  function removeTag(index: number): void {
    state.tags.splice(index, 1);
  }

  function changeFavourite(): void {
    state.isFavourite = !state.isFavourite;
  }

  function changePublic(): void {
    state.isPublic = !state.isPublic;
  }

  function addTag(): void {
    const tag: string = tagSearch.value.toUpperCase();

    if (tag === '') {
      return;
    }
    state.tags.push(tag);
    tagSearch.value = '';
  }

  function getData(): DrinkRequest {
    return {
      description: state.description,
      favourite: state.isFavourite,
      name: state.name,
      positions: state.drinkPositions
        .filter((position: Position) => position.ingredient !== null)
        .map((position: Position) => ({
          amount: position.amount,
          ingredient: position.ingredient as number,
        })),
      public: state.isPublic,
      tags: state.tags,
    };
  }

  function submit(submitAction: (data: DrinkRequest, newTag: boolean) => void): void {
    if (!valid.value) {
      return;
    }

    const data: DrinkRequest = getData();
    const newTag: boolean = data.tags.some((name: string) => tagsStore.tagByName(name) === undefined);

    submitAction(data, newTag);
  }

  function mapDrinkPositions(drink: Drink | null): Position[] {
    return (
      drink?.positions.map((drinkPosition: DrinkPosition) => ({
        amount: drinkPosition.amount,
        ingredient: drinkPosition.ingredientId,
      })) ?? []
    );
  }

  function mapDrinkTags(drink: Drink | null): string[] {
    return drink?.tags.map((id: number) => tagsStore.tagById(id)?.name.toUpperCase() ?? '').filter(Boolean) ?? [];
  }

  return {
    addPosition,
    addTag,
    addTagAvailable,
    availableIngredients,
    availableTags,
    changeFavourite,
    changePublic,
    removePosition,
    removeTag,
    state,
    submit,
    tagSearch,
    valid,
  };
}
