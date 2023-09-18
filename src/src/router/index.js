import Vue from 'vue';
import VueRouter from 'vue-router';
import AppMain from '../views/AppMain';
import {names} from './names';
import {authService} from '../services/auth.service';
import store from '../store';
import Drinks from '../views/drinks/Drinks';
import {paths} from './paths';
import {actionsNames} from '../store/actions';
import {dataLoader} from '../services/dataLoader';

Vue.use(VueRouter);

const routes = [
    {
        path: paths.publicDrink,
        name: names.publicDrink,
        component: () => import('../views/drinks/Public')
    },
    {
        path: paths.fb,
        name: names.fb,
        component: () => import('../views/auth/Fb')
    },
    {
        path: paths.login,
        name: names.login,
        component: () => import('../views/auth/Login')
    },
    {
        path: paths.register,
        name: names.register,
        component: () => import('../views/auth/Register')
    },
    {
        path: paths.changePassword,
        name: names.changePassword,
        component: () => import('../views/auth/ChangePassword')
    },
    {
        path: paths.resetPassword,
        name: names.resetPassword,
        component: () => import('../views/auth/ResetPassword')
    },
    {
        path: paths.main,
        component: AppMain,
        children: [
            {
                path: paths.main,
                redirect: {name: names.allDrinks}
            },
            {
                path: paths.createDrink,
                name: names.createDrink,
                component: () => import('../views/drinks/Create'),
                beforeEnter: (to, from, next) => {
                    const ingredientsLoaded = store.getters.loadedIngredients;
                    const tagsLoaded = store.getters.loadedTags;
                    if (!(ingredientsLoaded && tagsLoaded)) {
                        let unloaded = [];
                        if (!ingredientsLoaded) {
                            unloaded.push(store.dispatch(actionsNames.loadIngredients));
                        }
                        if (!tagsLoaded) {
                            unloaded.push(store.dispatch(actionsNames.loadTags));
                        }
                        Promise.all(unloaded).then(() => next());
                    } else {
                        next();
                    }
                }
            },
            {
                path: paths.drinks,
                component: Drinks,
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(true, true, true);
                    Promise.all(unloadedData).then(() => next());
                },
                children: [
                    {
                        path: paths.main,
                        name: names.allDrinks,
                        component: () => import('../views/drinks/All')

                    },
                    {
                        path: paths.id,
                        name: names.drink,
                        component: () => import('../views/drinks/Preview')
                    },
                    {
                        path: paths.edit,
                        name: names.editDrink,
                        component: () => import('../views/drinks/Edit')
                    }
                ]
            },
            {
                path: paths.ingredients,
                name: names.ingredients,
                component: () => import('../views/ingredients/All'),
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(false, true);
                    const suppliesLoaded = store.getters.loadedSupplies;
                    if (!suppliesLoaded) {
                        const ozaKey = store.getters.ozaKey;
                        if (ozaKey === null || ozaKey === '') {
                            unloadedData.push(store.dispatch(actionsNames.keyNotExists));
                        } else {
                            unloadedData.push(store.dispatch(actionsNames.loadSupplies));
                        }
                    }
                    Promise.all(unloadedData).then(() => next());
                }
            },
            {
                path: paths.tags,
                name: names.tags,
                component: () => import('../views/tags/All'),
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(false, false, true);
                    Promise.all(unloadedData).then(() => next());
                }
            },
            {
                path: paths.ingredientDrinks,
                name: names.ingredientDrinks,
                component: () => import('../views/ingredients/Drinks'),
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(true, true, true);
                    const apiKeysLoaded = store.getters.loadedApiKeys;
                    if (!apiKeysLoaded) {
                        unloadedData.push(store.dispatch(actionsNames.loadApiKeys));
                    }
                    Promise.all(unloadedData).then(() => next());
                }
            },
            {
                path: paths.tagDrinks,
                name: names.tagDrinks,
                component: () => import('../views/tags/Drinks'),
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(true, true, true);
                    Promise.all(unloadedData).then(() => next());
                }
            },
            {
                path: paths.randomDrink,
                name: names.randomDrink,
                component: () => import('../views/drinks/RandomDrink'),
                beforeEnter: (to, from, next) => {
                    const unloadedData = dataLoader.load(true, true, true);
                    Promise.all(unloadedData).then(() => next());
                }
            },
            {
                path: paths.account,
                name: names.account,
                component: () => import('../views/account/Account'),
                beforeEnter: (to, from, next) => {
                    const apiKeysLoaded = store.getters.loadedApiKeys;
                    if (!apiKeysLoaded) {
                        let unloaded = [];
                        unloaded.push(store.dispatch(actionsNames.loadApiKeys));
                        Promise.all(unloaded).then(() => next());
                    } else {
                        next();
                    }
                }
            },
            {
                path: paths.logout,
                name: names.logout,
                component: () => import('../views/auth/Logout')
            }
        ],
        beforeEnter: (to, from, next) => {
            const settingsLoaded = store.getters.loadedSettings;
            if (!settingsLoaded) {
                let unloaded = [];
                unloaded.push(store.dispatch(actionsNames.loadSettings));
                Promise.all(unloaded).then(() => next());
            } else {
                next();
            }
        }
    },
    {
        path: paths.notFound,
        name: names.notFound,
        component: () => import('./../views/NotFound')
    },
    {
        path: paths.all,
        component: () => import('./../views/NotFound')
    }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0, behavior: 'smooth' };
    },
});
router.beforeEach(async (to, from, next) => {
    const unprotectedPaths = [names.login, names.register, names.fb, names.publicDrink, names.changePassword, names.resetPassword];
    if (!unprotectedPaths.includes(to.name) && !(await authService.isLogged())) {
        next({name: names.login});
    } else {
        next();
    }
});

export default router;
