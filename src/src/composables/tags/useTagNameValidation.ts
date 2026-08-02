import type { Tag } from '@models/store/tag';
import type { TagsStore } from '@store/tags';
import type { ComputedRef, Ref } from 'vue';

import errors from '@config/errors';
import { useTagsStore } from '@store/tags';
import { computed } from 'vue';

export function useTagNameValidation(name: Ref<string>, excludeId: number | null) {
  // setup
  const tagsStore: TagsStore = useTagsStore();

  // computed
  const found: ComputedRef<Tag | undefined> = computed(() => tagsStore.tagByName(name.value));

  const isNameTaken: ComputedRef<boolean> = computed(() => {
    if (name.value === '') {
      return false;
    }
    if (found.value !== undefined && found.value.id !== excludeId) {
      return true;
    }

    return false;
  });

  const formErrors: ComputedRef<string[]> = computed<string[]>(() => (isNameTaken.value ? [errors.tagExists] : []));

  const valid: ComputedRef<boolean> = computed((): boolean => {
    if (name.value === '') {
      return false;
    }

    return !isNameTaken.value;
  });

  return { formErrors, valid };
}
