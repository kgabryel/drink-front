import type { RouteRecordRaw } from 'vue-router';

import DrinksRouteView from '@views/drinks/DrinksRouteView.vue';

import { names } from '@/router/names';
import { paths } from '@/router/paths';
import { useDrinksStore, useIngredientsStore, useTagsStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

export const drinksRoutes: RouteRecordRaw[] = [
  {
    beforeEnter: beforeLoadStores(
      () => useDrinksStore(),
      () => useIngredientsStore(),
      () => useTagsStore(),
    ),
    children: [
      {
        component: () => import('@views/drinks/DrinkListView.vue'),
        name: names.allDrinks,
        path: paths.main,
      },
      {
        component: () => import('@views/drinks/DrinkCreateView.vue'),
        name: names.createDrink,
        path: paths.createDrink,
      },
      {
        component: () => import('@views/drinks/DrinkRandomView.vue'),
        name: names.randomDrink,
        path: paths.randomDrink,
      },
      {
        component: () => import('@views/drinks/DrinkPreviewView.vue'),
        name: names.drink,
        path: paths.id,
      },
      {
        component: () => import('@views/drinks/DrinkEditView.vue'),
        name: names.editDrink,
        path: paths.edit,
      },
    ],
    component: DrinksRouteView,
    path: paths.drinks,
  },
];
