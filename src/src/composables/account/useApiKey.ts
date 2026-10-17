import type { ApiKeysStore } from '@store/api-keys';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { useToast } from 'vue-toastification';

import type { ApiKey } from '@/api/response';

import { useApiKeysStore } from '@/store';

export function useApiKey(apiKey: Ref<ApiKey>) {
  // setup
  const apiKeysStore: ApiKeysStore = useApiKeysStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function switchKey(): Promise<void> {
    await apiKeysStore.switchApiKey(apiKey.value.id);
    toast.success(messages.apiKeyUpdated);
  }

  async function remove(): Promise<void> {
    await apiKeysStore.deleteApiKey(apiKey.value.id);
    toast.success(messages.apiKeyDeleted);
  }

  return { remove, switchKey };
}
