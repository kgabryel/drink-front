import type { UpdateRequest } from '@models/update.request';
import type { IngredientsStore } from '@store/ingredients';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { computed, type ComputedRef, ref } from 'vue';
import { useToast } from 'vue-toastification';

import type { Ingredient } from '@/api/response';

import { useIngredientsStore } from '@/store';

export function useIngredientEditOza(ingredient: Ingredient) {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const ozaId: Ref<number | null> = ref(ingredient.ozaId);

  // computed
  const valid: ComputedRef<boolean> = computed(() => ozaId.value !== 0 && ozaId.value !== null);

  // actions
  async function updateOzaValue(ozaId: number | null, postAction: () => void): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: UpdateRequest<number | null> = {
      data: ozaId,
      id: ingredient.id,
    };
    const success: boolean = await ingredientsStore.updateOzaId(data);

    if (!success) {
      return;
    }
    toast.success(messages.ingredientUpdated);
    postAction();
  }

  async function update(postAction: () => void) {
    if (!valid.value) {
      return;
    }

    await updateOzaValue(ozaId.value, postAction);
  }

  async function remove(postAction: () => void) {
    await updateOzaValue(null, postAction);
  }

  return { ozaId, remove, update, valid };
}
