import type { RouteRecordRaw } from 'vue-router';

import DrinksCardsRouteView from '@views/drinksCards/DrinksCardsRouteView.vue';

import { names } from '@/router/names';
import { paths } from '@/router/paths';
import { useDrinksCardsStore, useDrinksStore, useIngredientsStore, useTagsStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

export const drinksCardsRoutes: RouteRecordRaw[] = [
  {
    beforeEnter: beforeLoadStores(
      () => useDrinksStore(),
      () => useIngredientsStore(),
      () => useTagsStore(),
      () => useDrinksCardsStore(),
    ),
    children: [
      {
        component: () => import('@views/drinksCards/DrinkCardListView.vue'),
        name: names.allDrinksCards,
        path: paths.main,
      },
      {
        component: () => import('@views/drinksCards/DrinkCardCreateView.vue'),
        name: names.createDrinksCard,
        path: paths.create,
      },
      {
        component: () => import('@views/drinksCards/DrinkCardEditView.vue'),
        name: names.editDrinksCard,
        path: paths.edit,
      },
    ],
    component: DrinksCardsRouteView,
    path: paths.drinksCards,
  },
];
