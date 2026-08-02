import type { RouteRecordRaw } from 'vue-router';

import { names } from '@/router/names';
import { paths } from '@/router/paths';
import { useApiKeysStore } from '@/store';
import { beforeLoadStores } from '@/utils/route.utils';

export const accountRoutes: RouteRecordRaw[] = [
  {
    beforeEnter: beforeLoadStores(() => useApiKeysStore()),
    component: () => import('@views/account/AccountView.vue'),
    name: names.account,
    path: paths.account,
  },
];
