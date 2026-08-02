import type { RouteRecordRaw } from 'vue-router';

import { names } from '@/router/names';
import { paths } from '@/router/paths';
import { useDrinksStore, useIngredientsStore, useOzaSuppliesStore, useTagsStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

export const ingredientsRoutes: RouteRecordRaw[] = [
  {
    beforeEnter: beforeLoadStores(
      () => useDrinksStore(),
      () => useIngredientsStore(),
      () => useTagsStore(),
      () => useOzaSuppliesStore(),
    ),
    component: () => import('@views/ingredients/IngredientDrinksView.vue'),
    name: names.ingredientDrinks,
    path: paths.ingredientDrinks,
  },
  {
    beforeEnter: beforeLoadStores(
      () => useIngredientsStore(),
      () => useOzaSuppliesStore(),
    ),
    component: () => import('@views/ingredients/IngredientListView.vue'),
    name: names.ingredients,
    path: paths.ingredients,
  },
];
