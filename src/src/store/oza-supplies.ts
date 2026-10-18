import type { SettingsStore } from '@store/settings';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { ingredientsService } from '@services/ingredients.service';
import { useSettingsStore } from '@store/settings';
import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref } from 'vue';
import { useToast } from 'vue-toastification';

import type { OzaSupply } from '@/api/response';

export const useOzaSuppliesStore = defineStore('ozaSupplies', () => {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const data: Ref<OzaSupply[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);
  const success: Ref<boolean> = ref(false);

  // getters
  const supplies: ComputedRef<OzaSupply[]> = computed(() => data.value);

  const supplyById: ComputedRef<(id: number) => OzaSupply | undefined> = computed(
    () =>
      (id: number): OzaSupply | undefined =>
        data.value.find((supply: OzaSupply) => supply.id === id),
  );

  // actions
  function reset(): void {
    data.value = [];
    loaded.value = false;
    success.value = false;
  }

  function loadSupplies(): Promise<void> {
    return ingredientsService
      .loadSupplies()
      .then((result: OzaSupply[]) => {
        data.value = result;
        loaded.value = true;
        success.value = true;
      })
      .catch(() => {
        toast.error(messages.invalidOzaKey);

        data.value = [];
        loaded.value = true;
        success.value = false;
      });
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }

    const settingsStore: SettingsStore = useSettingsStore();
    const ozaKey: string | null = settingsStore.ozaKey;

    if (ozaKey !== null && ozaKey !== '') {
      await loadSupplies();
    }
  }

  return { ensureLoaded, loadSupplies, reset, success, supplies, supplyById };
});

export type OzaSuppliesStore = ReturnType<typeof useOzaSuppliesStore>;
