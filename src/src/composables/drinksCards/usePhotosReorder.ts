import type { ReorderPhotoRequest } from '@models/api/reorder-photo.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Photo } from '@models/store/photo';
import type { DrinksStore } from '@store/drinks';
import type { Ref } from 'vue';

import messages from '@config/messages';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

import { useDrinksStore } from '@/store';

export function usePhotosReorder(photos: Ref<Photo[]>, drinkId: number) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const photosList: Ref<Photo[]> = ref([]);
  const drag: Ref<boolean> = ref(false);
  const currentState: Ref<Photo[]> = ref([]);

  // watch
  watch(photos, () => (photosList.value = photos.value), { deep: true, immediate: true });

  watch(drag, async () => {
    if (drag.value) {
      currentState.value = [...photosList.value];

      return;
    }

    if (currentState.value.some((photo: Photo, index: number) => photo.id !== photosList.value[index]?.id)) {
      await reorder();
    }
  });

  // actions
  async function remove(photo: Photo): Promise<void> {
    const success: boolean = await drinksStore.deletePhoto(drinkId, photo.id);

    if (!success) {
      return;
    }
    toast.success(messages.photoDeleted);
  }

  async function reorder(): Promise<void> {
    const payload: UpdateRequest<ReorderPhotoRequest> = {
      data: {
        order: photosList.value.map((photo: Photo, index: number) => ({
          id: photo.id,
          index: index + 1,
        })),
      },
      id: drinkId,
    };

    const success: boolean = await drinksStore.photosReorder(payload);

    if (!success) {
      return;
    }
    toast.success(messages.photosReorder);
  }

  function startDrag(): void {
    drag.value = true;
  }

  function stopDrag(): void {
    drag.value = false;
  }

  return { photosList, remove, startDrag, stopDrag };
}
