import { setupInterceptors } from '@services/axios.interceptor';
import { createPinia } from 'pinia';
import { createApp, type App as VueApp } from 'vue';
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './assets/css/main.scss';

setupInterceptors(router);

const app: VueApp = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Toast, {});

app.mount('#app');
