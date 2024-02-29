import Vue from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/css/main.css';
import './assets/css/styles.css';
import axios from 'axios';
import {authService} from './services/auth.service';
import {BehaviorSubject} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {names} from './router/names';
import MasonryWall from '@yeger/vue2-masonry-wall';
import {paths} from './router/paths';
import {pathsService} from './services/paths.service';
import VueClipboard from 'vue-clipboard2';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import VueWaypoint from 'vue-waypoint';

Vue.config.productionTip = false;

export const bus = new Vue();

axios.interceptors.request.use(function (config) {
    if (authService.checkAccessToken()) {
        config.headers.Authorization = authService.getAuthString();
    }
    return config;
}, err => Promise.reject(err));

let isRefreshing = false;
let refreshed = new BehaviorSubject(false);
axios.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status !== 401) {
        throw error.response;
    }
    if (error.response.status === 401 && !isRefreshing) {
        isRefreshing = true;
        refreshed.next(true);
        return authService.refreshToken().then(() => {
            isRefreshing = false;
            originalRequest.headers.Authorization = authService.getAuthString();
            return axios(originalRequest);
        }).catch(() => {
            isRefreshing = false;
            refreshed.next(false);
            authService.clearTokens();
            return router.push({name: names.login});
        });
    }
    refreshed.pipe(
        filter(refreshed => refreshed),
        take(1),
        switchMap(() => {
            originalRequest.headers.Authorization = authService.getAuthString();
            return axios(originalRequest);
        })
    );
});

Vue.filter('tagDrinksHref', function (tag) {
    return pathsService.bindParams(pathsService.concatPath(paths.tagDrinks), new Map([
        ['id', tag.id.toString()]
    ]));
});

Vue.filter('ingredientDrinksHref', function (ingredient) {
    return pathsService.bindParams(pathsService.concatPath(paths.ingredientDrinks), new Map([
        ['id', ingredient.id.toString()]
    ]));
});
const options = {
    // You can set your default options here
};
Vue.use(MasonryWall);
Vue.use(VueClipboard);
Vue.use(Toast, options);
Vue.use(VueWaypoint);

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App)
});
