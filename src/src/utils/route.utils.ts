import type { Ingredient } from '@models/store/ingredient';
import type { Tag } from '@models/store/tag';
import type { NavigationGuard } from 'vue-router';

import type { Loadable } from '@/utils/store.utils';

import router from '@/router';
import { names } from '@/router/names';
import { loadStores } from '@/utils/store.utils';

export function beforeLoadStores(...storeFactories: (() => Loadable)[]): NavigationGuard {
  return async (): Promise<void> => {
    await loadStores(...storeFactories.map((factory: () => Loadable) => factory()));
  };
}

export const tagDrinksHref = (tag: Tag): string =>
  router.resolve({ name: names.tagDrinks, params: { id: tag.id } }).href;

export const ingredientDrinksHref = (ingredient: Ingredient): string =>
  router.resolve({ name: names.ingredientDrinks, params: { id: ingredient.id } }).href;
