export interface AddIngredientRequest {
  name: string;
  description: string;
  available: boolean;
  ozaId: number | null;
}
