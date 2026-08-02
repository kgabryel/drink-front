/// <reference types="vite/client" />

import 'vue-router';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FRONT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}
