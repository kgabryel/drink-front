import type { Ref } from 'vue';

import { ref } from 'vue';

export function useRemoveConfirm(emit: (e: 'remove') => void) {
  // state
  const showed: Ref<boolean> = ref(false);

  // actions
  function remove(): void {
    emit('remove');
    showed.value = false;
  }

  function showModal(): void {
    showed.value = true;
  }

  return { remove, showed, showModal };
}
