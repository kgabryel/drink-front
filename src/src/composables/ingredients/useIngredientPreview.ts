import type { UpdateRequest } from '@models/api/update.request';
import type { Ingredient } from '@models/store/ingredient';
import type { OzaSupply } from '@models/store/oza-supply';
import type { IngredientsStore } from '@store/ingredients';
import type { OzaSuppliesStore } from '@store/oza-supplies';
import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';

import { useIngredientsStore, useOzaSuppliesStore } from '@/store';

export function useIngredientPreview(ingredient: Ref<Ingredient>) {
  // setup
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const ozaSuppliesStore: OzaSuppliesStore = useOzaSuppliesStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // computed
  const supply: ComputedRef<OzaSupply | undefined> = computed(() =>
    ozaSuppliesStore.supplyById(ingredient.value.ozaId ?? 0),
  );

  const supplies: ComputedRef<OzaSupply[]> = computed(() => ozaSuppliesStore.supplies);

  const suppliesReady: ComputedRef<boolean> = computed(() => ozaSuppliesStore.success);

  // actions
  async function remove(id: number): Promise<void> {
    const result: boolean = await ingredientsStore.deleteIngredient(id);

    if (!result) {
      return;
    }
    toast.success(messages.ingredientDeleted);
  }

  async function changeAvailable(): Promise<void> {
    const data: UpdateRequest<boolean> = {
      data: !ingredient.value.available,
      id: ingredient.value.id,
    };
    const result: boolean = await ingredientsStore.updateIngredientAvailable(data);

    if (!result) {
      return;
    }
    toast.success(messages.ingredientUpdated);
  }

  return { changeAvailable, remove, supplies, suppliesReady, supply };
}
