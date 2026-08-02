import type { TagsStore } from '@store/tags';

import { useTagNameValidation } from '@composables/tags/useTagNameValidation';
import messages from '@config/messages';
import { reactive, toRef } from 'vue';
import { useToast } from 'vue-toastification';

import { useTagsStore } from '@/store';

interface State {
  name: string;
  publicTag: boolean;
}

export function useTagCreate() {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const state: State = reactive<State>({
    name: '',
    publicTag: false,
  });

  // composables
  const { formErrors, valid } = useTagNameValidation(toRef(state, 'name'), null);

  // actions
  async function create() {
    if (!valid.value) {
      return;
    }

    const success: boolean = await tagsStore.addTag(state.name, state.publicTag);

    if (!success) {
      return;
    }
    clear();
    toast.success(messages.tagAdded);
  }

  function clear(): void {
    state.name = '';
    state.publicTag = false;
  }

  return { create, formErrors, state, valid };
}
