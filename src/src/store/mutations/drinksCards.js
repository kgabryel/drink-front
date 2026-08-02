import {clearState} from '../state';
import Vue from 'vue';

export const drinksCards = {
    loadDrinksCards(state, drinksCards) {
        state.drinksCards = {
            loaded: drinksCards.loaded,
            data: drinksCards.data
        };
    },
    addDrinksCard(state, drinksCard) {
        state.drinksCards.data.push(drinksCard);
    },
    deleteDrinksCard(state, id) {
        state.drinksCards.data = state.drinksCards.data.filter(drinksCard => drinksCard.id !== id);
    },
    updateDrinksCard(state, drinksCard) {
        const key = state.drinksCards.data.findIndex(element => element.id === drinksCard.id);
        Vue.set(state.drinksCards.data, key, drinksCard);
    }
};