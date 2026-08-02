import type { RouteRecordRaw } from 'vue-router';

import { names } from '@/router/names';
import { paths } from '@/router/paths';

export const authRoutes: RouteRecordRaw[] = [
  {
    component: () => import('@views/auth/AuthFacebookView.vue'),
    name: names.fb,
    path: paths.fb,
  },
  {
    component: () => import('@views/auth/AuthLoginView.vue'),
    name: names.login,
    path: paths.login,
  },
  {
    component: () => import('@views/auth/AuthRegisterView.vue'),
    name: names.register,
    path: paths.register,
  },
  {
    component: () => import('@views/auth/AuthChangePasswordView.vue'),
    name: names.changePassword,
    path: paths.changePassword,
  },
  {
    component: () => import('@views/auth/AuthResetPasswordView.vue'),
    name: names.resetPassword,
    path: paths.resetPassword,
  },
  {
    component: () => import('@views/auth/AuthLogoutView.vue'),
    name: names.logout,
    path: paths.logout,
  },
];
