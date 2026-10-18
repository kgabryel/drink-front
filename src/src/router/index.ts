import type { Router, RouteRecordRaw, RouteLocationNormalizedGeneric } from 'vue-router';

import { authService } from '@services/auth.service';
import AppMainView from '@views/AppMainView.vue';
import { createRouter, createWebHistory } from 'vue-router';

import { accountRoutes } from '@/router/routes/account.routes';
import { authRoutes } from '@/router/routes/auth.routes';
import { drinksCardsRoutes } from '@/router/routes/drinks-cards.routes';
import { drinksRoutes } from '@/router/routes/drinks.routes';
import { ingredientsRoutes } from '@/router/routes/ingredients.routes';
import { publicRoutes } from '@/router/routes/public.routes';
import { tagsRoutes } from '@/router/routes/tags.routes';
import { useSettingsStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

import { names } from './names';
import { paths } from './paths';

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  {
    beforeEnter: beforeLoadStores(() => useSettingsStore()),
    children: [
      {
        path: paths.main,
        redirect: { name: names.allDrinks },
      },
      ...drinksRoutes,
      ...ingredientsRoutes,
      ...tagsRoutes,
      ...accountRoutes,
      ...drinksCardsRoutes,
    ],
    component: AppMainView,
    meta: { requiresAuth: true },
    path: paths.main,
  },
  {
    component: () => import('@views/NotFoundView.vue'),
    path: paths.all,
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalizedGeneric) => {
  if (to.meta.requiresAuth && !(await authService.isLogged())) {
    return { name: names.login };
  }

  return true;
});

router.afterEach(() => {
  document.querySelector('.loading')?.remove();
});

export default router;
