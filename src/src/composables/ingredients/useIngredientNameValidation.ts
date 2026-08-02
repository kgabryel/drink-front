import type { Ingredient } from '@models/store/ingredient';
import type { IngredientsStore } from '@store/ingredients';
import type { ComputedRef, Ref } from 'vue';

import errors from '@config/errors';
import { computed } from 'vue';

import { useIngredientsStore } from '@/store';

export function useIngredientNameValidation(name: Ref<string>, excludeId: number | null) {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();

  // computed
  const found: ComputedRef<Ingredient | undefined> = computed(() => ingredientsStore.ingredientByName(name.value));

  const isNameTaken: ComputedRef<boolean> = computed(() => {
    if (name.value === '') {
      return false;
    }
    if (found.value !== undefined && found.value.id !== excludeId) {
      return true;
    }

    return false;
  });

  const formErrors: ComputedRef<string[]> = computed<string[]>(() =>
    isNameTaken.value ? [errors.ingredientExists] : [],
  );

  const valid: ComputedRef<boolean> = computed((): boolean => {
    if (name.value === '') {
      return false;
    }

    return !isNameTaken.value;
  });

  return { formErrors, valid };
}
