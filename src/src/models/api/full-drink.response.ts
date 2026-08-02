import type { Photo } from '@models/store/photo';

export interface FullDrinkResponse {
  id: number;
  name: string;
  description: string;
  positions: Position[];
  tags: string[];
  photos: Photo[];
}

interface Position {
  id: number;
  amount: string;
  ingredient: string;
  ingredientDescription: string;
}
