import type { UpdateRequest } from '@models/update.request';
import type { AxiosResponse } from 'axios';
import type { ComputedRef, Ref } from 'vue';

import { errorHandler } from '@services/errorHandler';
import { stringsService } from '@services/strings.service';
import { tagsService } from '@services/tags.service';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { CreateTagRequest } from '@/api/request';
import type { Tag } from '@/api/response';

import { pushItem, removeById, replaceById } from '@/utils/store.utils';

export const useTagsStore = defineStore('tags', () => {
  // state
  const data: Ref<Tag[]> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  // getters
  const tags: ComputedRef<Tag[]> = computed(() =>
    data.value.sort((a: Tag, b: Tag) => stringsService.compareString(a.name, b.name)),
  );

  function tagById(id: number): Tag | undefined {
    return data.value.find((tag: Tag) => tag.id === id);
  }

  function tagByName(name: string): Tag | undefined {
    return data.value.find((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase());
  }

  // actions
  function loadTags(): Promise<void> {
    return tagsService.load().then((result: Tag[]) => {
      data.value = result;
      loaded.value = true;
    });
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded.value) {
      return;
    }
    await loadTags();
  }

  function addTag(payload: CreateTagRequest): Promise<boolean> {
    return tagsService
      .add(payload)
      .then((tag: Tag) => pushItem(data.value, tag))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function deleteTag(id: number): Promise<boolean> {
    return tagsService
      .delete(id)
      .then(() => removeById(data.value, id))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateTag(payload: UpdateRequest<string>): Promise<boolean> {
    return tagsService
      .update(payload)
      .then((updated: Tag) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function updateTagPublic(payload: UpdateRequest<boolean>): Promise<boolean> {
    return tagsService
      .updatePublic(payload)
      .then((updated: Tag) => replaceById(data.value, updated))
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  }

  function reset(): void {
    data.value = [];
    loaded.value = false;
  }

  return {
    addTag,
    deleteTag,
    ensureLoaded,
    loadTags,
    reset,
    tagById,
    tagByName,
    tags,
    updateTag,
    updateTagPublic,
  };
});

export type TagsStore = ReturnType<typeof useTagsStore>;
