import type { SettingsStore } from '@store/settings';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

import { useSettingsStore } from '@/store';

export function useAccountSettings() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();
  const settingsStore: SettingsStore = useSettingsStore();

  // state
  const ozaKey: Ref<string | null> = ref(null);
  const onlyAvailable: Ref<boolean> = ref(false);

  // watch
  watch(
    () => settingsStore.onlyAvailable,
    (newValue: boolean) => (onlyAvailable.value = newValue),
    { immediate: true },
  );

  watch(
    () => settingsStore.ozaKey,
    (newKey: string | null) => (ozaKey.value = newKey ?? ''),
    { immediate: true },
  );

  // actions
  async function switchOnlyAvailable(): Promise<void> {
    await settingsStore.switchOnlyAvailable();
    toast.success(messages.settingsUpdated);
  }

  async function updateOzaKey(): Promise<void> {
    await settingsStore.changeOzaKey(ozaKey.value);
    toast.success(messages.ozaKeyUpdate);
  }

  return { onlyAvailable, ozaKey, switchOnlyAvailable, updateOzaKey };
}
