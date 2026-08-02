import type { ApiKeysStore } from '@store/api-keys';

import messages from '@config/messages';
import { useToast } from 'vue-toastification';

import { useApiKeysStore } from '@/store';

export function useGenerateKeyButton() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();
  const apiKeyStore: ApiKeysStore = useApiKeysStore();

  // actions
  async function generateKey(): Promise<void> {
    const success: boolean = await apiKeyStore.generateKey();

    if (!success) {
      return;
    }
    toast.success(messages.keyGenerated);
  }

  return { generateKey };
}
