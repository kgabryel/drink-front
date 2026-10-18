import { setupInterceptors } from '@services/axios.interceptor';
import { createPinia } from 'pinia';
import { createApp, type App as VueApp } from 'vue';
import 'vue-toastification/dist/index.css';
import {
  SCROLL_RESTORATION_CAPTURE_DEFAULT,
  SCROLL_RESTORATION_RESTORE_DEFAULT,
  ScrollRestoration,
} from 'vue-router/experimental';
import Toast from 'vue-toastification';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './assets/css/main.scss';

setupInterceptors(router);

const app: VueApp = createApp(App);
app.use(createPinia());
app.use(ScrollRestoration, {
  capture: SCROLL_RESTORATION_CAPTURE_DEFAULT,
  restore: SCROLL_RESTORATION_RESTORE_DEFAULT,
  router,
});
app.use(router);
app.use(vuetify);
app.use(Toast, {});

app.mount('#app');
