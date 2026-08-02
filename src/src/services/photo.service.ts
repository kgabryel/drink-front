import type { PhotoSize } from '@config/photo-size';
import type { AxiosResponse } from 'axios';

import axios from 'axios';

import { routes } from '@/router/routes';

interface PhotoService {
  loadPhoto(size: PhotoSize, drinkId: number, photoId: number): Promise<string>;
}

export const photoService: PhotoService = {
  loadPhoto(size: PhotoSize, drinkId: number, photoId: number): Promise<string> {
    return axios
      .get(routes.getPhoto(size, drinkId, photoId), { responseType: 'arraybuffer' })
      .then((response: AxiosResponse<ArrayBuffer>) => {
        const base64: string = btoa(
          new Uint8Array(response.data).reduce((data: string, byte: number) => data + String.fromCharCode(byte), ''),
        );

        const contentType: string = response.headers['content-type'] ?? 'image/jpeg';

        return `data:${contentType};base64,${base64}`;
      });
  },
};
