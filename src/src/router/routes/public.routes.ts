import type { RouteRecordRaw } from 'vue-router';

import { names } from '@/router/names';
import { paths } from '@/router/paths';

export const publicRoutes: RouteRecordRaw[] = [
  {
    component: () => import('@views/drinksCards/DrinkCardPublicView.vue'),
    name: names.publicCard,
    path: paths.publicCard,
  },
  {
    component: () => import('@views/drinks/DrinkPublicView.vue'),
    name: names.publicDrink,
    path: paths.publicDrink,
  },
  {
    component: () => import('@views/NotFoundView.vue'),
    name: names.notFound,
    path: paths.notFound,
  },
];
