import type { IngredientsStore } from '@store/ingredients';
import type { OzaSuppliesStore } from '@store/oza-supplies';
import type { AxiosResponse } from 'axios';
import type { Ref } from 'vue';

import { errorHandler } from '@services/errorHandler';
import { settingsService } from '@services/settings.service';
import { useIngredientsStore } from '@store/ingredients';
import { useOzaSuppliesStore } from '@store/oza-supplies';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { ChangePasswordRequest } from '@/api/request';
import type { Settings } from '@/api/response';
import type UserType from '@/api/user-type';

export const useSettingsStore = defineStore('settings', () => {
  // state
  const loaded: Ref<boolean> = ref(false);
  const onlyAvailable: Ref<boolean> = ref(false);
  const ozaKey: Ref<string | null> = ref(null);
  const userType: Ref<UserType> = ref('standard');

  // actions
  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadSettings();
  }

  function loadSettings(): Promise<void> {
    return settingsService.load().then((data: Settings) => {
      loaded.value = true;
      ozaKey.value = data.ozaKey;
      onlyAvailable.value = data.onlyAvailable;
      userType.value = data.userType;
    });
  }

  function switchOnlyAvailable(): Promise<void> {
    return settingsService
      .switchOnlyAvailable()
      .then((data: Settings) => {
        onlyAvailable.value = data.onlyAvailable;
      })
      .catch((error: AxiosResponse) => {
        errorHandler.catch(error);
      });
  }

  function changePassword(data: ChangePasswordRequest): Promise<boolean> {
    return settingsService
      .changePassword(data)
      .then(() => true)
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function changeOzaKey(key: string | null): Promise<void> {
    return settingsService
      .changeOzaKey(key)
      .then(async (data: Settings) => {
        ozaKey.value = data.ozaKey;
        const ingredientsStore: IngredientsStore = useIngredientsStore();
        const ozaSuppliesStore: OzaSuppliesStore = useOzaSuppliesStore();
        ingredientsStore.reset();
        ozaSuppliesStore.reset();
        await ozaSuppliesStore.ensureLoaded();
      })
      .catch((error: AxiosResponse) => {
        errorHandler.catch(error);
      });
  }

  function reset(): void {
    loaded.value = false;
    onlyAvailable.value = false;
    ozaKey.value = null;
    userType.value = 'standard';
  }

  return {
    changeOzaKey,
    changePassword,
    ensureLoaded,
    onlyAvailable,
    ozaKey,
    reset,
    switchOnlyAvailable,
    userType,
  };
});

export type SettingsStore = ReturnType<typeof useSettingsStore>;
