export interface Ingredient {
  id: number;
  name: string;
  description: string;
  available: boolean;
  drinksCount: number;
  ozaId: number | null;
}
