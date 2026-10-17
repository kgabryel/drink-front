import type { UpdateRequest } from '@models/update.request';
import type { DrinksStore } from '@store/drinks';
import type { TagsStore } from '@store/tags';
import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';

import type { Tag } from '@/api/response';

import { useDrinksStore, useTagsStore } from '@/store';

export function useTagPreview(tag: Ref<Tag>) {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // computed
  const drinksCount: ComputedRef<number> = computed(() => drinksStore.drinksForTagId(tag.value.id).length);

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

  return { changePublic, drinksCount, remove };
}
