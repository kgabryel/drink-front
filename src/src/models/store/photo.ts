import type { PhotoSize } from '@config/photo-size';

export interface Photo {
  id: number;
  width: number;
  height: number;
  type: PhotoSize;
}
