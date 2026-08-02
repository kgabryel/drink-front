import type { UpdateIngredientRequest } from '@models/api/update-ingredient.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Ingredient } from '@models/store/ingredient';
import type { IngredientsStore } from '@store/ingredients';

import { useIngredientNameValidation } from '@composables/ingredients/useIngredientNameValidation';
import messages from '@config/messages';
import { reactive, toRef } from 'vue';
import { useToast } from 'vue-toastification';

import { useIngredientsStore } from '@/store';

interface State {
  name: string;
  description: string;
}

export function useIngredientEdit(ingredient: Ingredient) {
  // setup
  const ingredientStore: IngredientsStore = useIngredientsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const state: State = reactive<State>({
    description: ingredient.description,
    name: ingredient.name,
  });

  // composables
  const { formErrors, valid } = useIngredientNameValidation(toRef(state, 'name'), ingredient.id);

  // actions
  async function update(postAction: () => void) {
    if (!valid.value) {
      return;
    }

    const data: UpdateRequest<UpdateIngredientRequest> = {
      data: {
        description: state.description,
        name: state.name,
      },
      id: ingredient.id,
    };
    const success: boolean = await ingredientStore.updateIngredient(data);

    if (!success) {
      return;
    }
    toast.success(messages.ingredientUpdated);
    postAction();
  }

  return { formErrors, state, update, valid };
}
