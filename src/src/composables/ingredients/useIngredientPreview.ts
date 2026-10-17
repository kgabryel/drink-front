import type { UpdateRequest } from '@models/update.request';
import type { DrinksStore } from '@store/drinks';
import type { IngredientsStore } from '@store/ingredients';
import type { OzaSuppliesStore } from '@store/oza-supplies';
import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';

import type { Ingredient } from '@/api/response';
import type { OzaSupply } from '@/api/response';

import { useDrinksStore, useIngredientsStore, useOzaSuppliesStore } from '@/store';

export function useIngredientPreview(ingredient: Ref<Ingredient>) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const ingredientsStore: IngredientsStore = useIngredientsStore();
  const ozaSuppliesStore: OzaSuppliesStore = useOzaSuppliesStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // computed
  const drinksCount: ComputedRef<number> = computed(
    () => drinksStore.drinksForIngredientId(ingredient.value.id).length,
  );

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

  return { changeAvailable, drinksCount, remove, supplies, suppliesReady, supply };
}
