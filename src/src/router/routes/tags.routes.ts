import type { RouteRecordRaw } from 'vue-router';

import { names } from '@/router/names';
import { paths } from '@/router/paths';
import { useDrinksStore, useIngredientsStore, useTagsStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

export const tagsRoutes: RouteRecordRaw[] = [
  {
    beforeEnter: beforeLoadStores(
      () => useDrinksStore(),
      () => useIngredientsStore(),
      () => useTagsStore(),
    ),
    component: () => import('@views/tags/TagDrinksView.vue'),
    name: names.tagDrinks,
    path: paths.tagDrinks,
  },
  {
    beforeEnter: beforeLoadStores(() => useTagsStore()),
    component: () => import('@views/tags/TagListView.vue'),
    name: names.tags,
    path: paths.tags,
  },
];
