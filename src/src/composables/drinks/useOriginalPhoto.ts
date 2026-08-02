import type { Photo } from '@models/store/photo';
import type { Ref } from 'vue';

import { PhotoSize } from '@config/photo-size';
import { photoService } from '@services/photo.service';
import { ref } from 'vue';

// Singleton state — współdzielony między komponentami celowo
const photo: Ref<Photo | null> = ref<Photo | null>(null);
const photoData: Ref<string> = ref<string>('');

export function useOriginalPhoto() {
  // actions
  function clear(): void {
    photo.value = null;
    photoData.value = '';
  }

  async function load(photoItem: Photo, drinkId: number): Promise<void> {
    photo.value = photoItem;
    photoData.value = await photoService.loadPhoto(PhotoSize.Original, drinkId, photoItem.id);
  }

  return { clear, load, photo, photoData };
}
