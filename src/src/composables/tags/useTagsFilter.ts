import type { TagsSearch } from '@models/search/tags.search';
import type { SearchStore } from '@store/search';
import type { TagsStore } from '@store/tags';
import type { ComputedRef } from 'vue';

import { stringsService } from '@services/strings.service';
import { computed } from 'vue';

import type { Tag } from '@/api/response';

import { useSearchStore, useTagsStore } from '@/store';

export function useTagsFilter() {
  // setup
  const tagsStore: TagsStore = useTagsStore();
  const searchStore: SearchStore = useSearchStore();

  // computed
  const search: ComputedRef<TagsSearch> = computed(() => searchStore.tags);

  const filteredTags: ComputedRef<Tag[]> = computed(() =>
    tagsStore.tags
      .filter((element: Tag) => stringsService.stringIncludes(element.name, search.value.name))
      .sort((a: Tag, b: Tag) => stringsService.compareString(a.name, b.name)),
  );

  return { filteredTags };
}
