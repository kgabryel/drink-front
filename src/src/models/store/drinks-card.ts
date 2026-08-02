export interface DrinksCard {
  id: number;
  name: string;
  active: boolean;
  publicId: string;
  availableTags: number[];
  excludedTags: number[];
  availableIngredients: number[];
  excludedIngredients: number[];
  availableDrinks: number[];
  excludedDrinks: number[];
}
