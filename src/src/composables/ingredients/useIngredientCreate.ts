import type { AddIngredientRequest } from '@models/api/add-ingredient.request';
import type { IngredientsStore } from '@store/ingredients';

import { useIngredientNameValidation } from '@composables/ingredients/useIngredientNameValidation';
import messages from '@config/messages';
import { reactive, toRef } from 'vue';
import { useToast } from 'vue-toastification';

import { useIngredientsStore } from '@/store';

interface State {
  name: string;
  description: string;
  available: boolean;
  ozaId: number | null;
}

export function useIngredientCreate() {
  // setup
  const ingredientStore: IngredientsStore = useIngredientsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const state: State = reactive<State>({
    available: false,
    description: '',
    name: '',
    ozaId: null,
  });

  // composables
  const { formErrors, valid } = useIngredientNameValidation(toRef(state, 'name'), null);

  // actions
  function clear(): void {
    state.name = '';
    state.description = '';
    state.available = false;
    state.ozaId = null;
  }

  async function create() {
    if (!valid.value) {
      return;
    }

    const data: AddIngredientRequest = {
      available: state.available,
      description: state.description,
      name: state.name,
      ozaId: state.ozaId,
    };
    const success: boolean = await ingredientStore.addIngredient(data);

    if (!success) {
      return;
    }
    clear();
    toast.success(messages.ingredientAdded);
  }

  return { create, formErrors, state, valid };
}
