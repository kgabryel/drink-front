import type { TagsSearch } from '@models/search/tags.search';
import type { SearchStore } from '@store/search';

import { useSearchBase } from '@composables/useSearchBase';
import { isTagsSearchModified } from '@store/search';
import { reactive } from 'vue';

import { useSearchStore } from '@/store';

export function useTagSearch() {
  // setup
  const searchStore: SearchStore = useSearchStore();

  // state
  const draft: TagsSearch = reactive<TagsSearch>({ ...searchStore.tags });

  // composables
  const { close, searchIfModified } = useSearchBase(() => isTagsSearchModified(draft), search);

  // actions
  function clear() {
    draft.name = '';
    search();
  }

  function search(): void {
    searchStore.tags.name = draft.name;
  }

  return { clear, close, draft, search, searchIfModified };
}
