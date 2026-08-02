import type { UpdateRequest } from '@models/api/update.request';
import type { Tag } from '@models/store/tag';
import type { TagsStore } from '@store/tags';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { useToast } from 'vue-toastification';

import { useTagsStore } from '@/store';

export function useTagPreview(tag: Ref<Tag>) {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function remove(id: number): Promise<void> {
    const result: boolean = await tagsStore.deleteTag(id);

    if (!result) {
      return;
    }
    toast.success(messages.tagDeleted);
  }

  async function changePublic(): Promise<void> {
    const data: UpdateRequest<boolean> = {
      data: !tag.value.public,
      id: tag.value.id,
    };
    const result: boolean = await tagsStore.updateTagPublic(data);

    if (!result) {
      return;
    }
    toast.success(messages.tagUpdated);
  }

  return { changePublic, remove };
}
