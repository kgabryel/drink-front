import {errorHandler} from '../../services/errorHandler';
import {drinksCardsService} from '../../services/drinksCards.service';
import Vue from 'vue';
import {drinksService} from '../../services/drinks.service';

export const drinksCards = {
    loadDrinksCards(context) {
        return drinksCardsService.load().then(data => context.commit('loadDrinksCards', {loaded: true, data: data}));
    },
    addDrinksCard(context, data) {
        return drinksCardsService.add(data)
            .then(drinksCard => context.commit('addDrinksCard', drinksCard))
            .catch(error => errorHandler.handle(error));
    },
    deleteDrinksCard(context, id) {
        return drinksCardsService.delete(id)
            .then(() => context.commit('deleteDrinksCard', id))
            .catch(error => errorHandler.handle(error));
    },
    modifyDrinksCardActivity(context, data) {
        return drinksCardsService.modifyActivity(data.id, data.active)
            .then(updated => context.commit('updateDrinksCard', updated))
            .catch(error => errorHandler.handle(error));
    },
    updateDrinksCard(context, data) {
        return drinksCardsService.update(data.id, data.data)
            .then(updated => context.commit('updateDrinksCard', updated))
            .catch(error => errorHandler.handle(error));
    }
};