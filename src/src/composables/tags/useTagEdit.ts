import type { UpdateRequest } from '@models/update.request';
import type { TagsStore } from '@store/tags';
import type { Ref } from 'vue';

import { useTagNameValidation } from '@composables/tags/useTagNameValidation';
import messages from '@config/messages';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import type { Tag } from '@/api/response';

import { useTagsStore } from '@/store';

export function useTagEdit(tag: Tag) {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const name: Ref<string> = ref(tag.name);

  // composables
  const { formErrors, valid } = useTagNameValidation(name, tag.id);

  // actions
  async function update(postAction: () => void): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: UpdateRequest<string> = {
      data: name.value,
      id: tag.id,
    };
    const success: boolean = await tagsStore.updateTag(data);

    if (!success) {
      return;
    }
    toast.success(messages.tagUpdated);
    postAction();
  }

  return { formErrors, name, update, valid };
}
