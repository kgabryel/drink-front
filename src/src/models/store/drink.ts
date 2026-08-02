import type { DrinkPosition } from '@models/store/drink-position';
import type { Photo } from '@models/store/photo';

export interface Drink {
  id: number;
  name: string;
  description: string;
  positions: DrinkPosition[];
  tags: number[];
  favourite: boolean;
  public: boolean;
  publicId: string;
  photos: Photo[];
}
