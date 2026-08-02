import type { ApiKey } from '@models/store/api-key';
import type { AxiosResponse } from 'axios';
import type { ComputedRef, Ref } from 'vue';

import { apiKeysService } from '@services/apiKeys.service';
import { errorHandler } from '@services/errorHandler';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { pushItem, removeById, replaceById } from '@/utils/store.utils';

export const useApiKeysStore = defineStore('apiKeys', () => {
  // state
  const data: Ref<ApiKey[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  // getters
  const apiKeys: ComputedRef<ApiKey[]> = computed(() => data.value);

  // actions
  function deleteApiKey(id: number): Promise<boolean> {
    return apiKeysService
      .delete(id)
      .then(() => removeById(data.value, id))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadApiKeys();
  }

  function loadApiKeys(): Promise<void> {
    return apiKeysService.load().then((result: ApiKey[]) => {
      data.value = result;
      loaded.value = true;
    });
  }

  function generateKey(): Promise<boolean> {
    return apiKeysService
      .generate()
      .then((apiKey: ApiKey) => pushItem(data.value, apiKey))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function switchApiKey(id: number): Promise<boolean> {
    return apiKeysService
      .switch(id)
      .then((updated: ApiKey) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function reset(): void {
    data.value = [];
    loaded.value = false;
  }

  return {
    apiKeys,
    deleteApiKey,
    ensureLoaded,
    generateKey,
    reset,
    switchApiKey,
  };
});

export type ApiKeysStore = ReturnType<typeof useApiKeysStore>;
