export interface DrinksCardRequest {
  name: string;
  active: boolean;
  availableDrinks: number[];
  availableIngredients: number[];
  availableTags: number[];
  excludedDrinks: number[];
  excludedIngredients: number[];
  excludedTags: number[];
}
