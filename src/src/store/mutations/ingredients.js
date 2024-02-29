import Vue from 'vue';
import {clearState} from '../state';

export const ingredients = {
    loadIngredients(state, ingredients) {
        state.ingredients = {
            loaded: ingredients.loaded,
            data: ingredients.data
        };
    },
    addIngredient(state, ingredient) {
        state.ingredients.data.push(ingredient);
    },
    updateIngredient(state, ingredient) {
        const key = state.ingredients.data.findIndex(element => element.id === ingredient.id);
        Vue.set(state.ingredients.data, key, ingredient);
    },
    deleteIngredient(state, id) {
        state.ingredients.data = state.ingredients.data.filter(ingredient => ingredient.id !== id);
    },
    clearIngredients(state) {
        state.ingredients = clearState.ingredients;
    }
};