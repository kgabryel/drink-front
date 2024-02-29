import Vue from 'vue';
import {bus} from '../../main';
import events from '../../config/events';

export const drinks = {
    loadDrinks(state, drinks) {
        state.drinks = {
            loaded: drinks.loaded,
            data: drinks.data
        };
    },
    addDrink(state, drink) {
        state.drinks.data.push(drink);
    },
    updateDrink(state, drink) {
        const key = state.drinks.data.findIndex(element => element.id === drink.id);
        Vue.set(state.drinks.data, key, drink);
        bus.$emit(events.drinkUpdated, drink);
    },
    deleteDrink(state, id) {
        state.drinks.data = state.drinks.data.filter(drink => drink.id !== id);
    }
};