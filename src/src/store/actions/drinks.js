import {drinksService} from '../../services/drinks.service';
import {errorHandler} from '../../services/errorHandler';

export const drinks = {
    loadDrinks(context) {
        return drinksService.load().then(data => context.commit('loadDrinks', {loaded: true, data: data}));
    },
    addDrink(context, data) {
        return drinksService.add(data)
            .then(drink => context.commit('addDrink', drink))
            .catch(error => errorHandler.handle(error));
    },
    updateDrink(context, data) {
        return drinksService.update(data.id, data.data)
            .then(updated => context.commit('updateDrink', updated))
            .catch(error => errorHandler.handle(error));
    },
    deleteDrink(context, id) {
        return drinksService.delete(id)
            .then(() => context.commit('deleteDrink', id))
            .catch(error => errorHandler.handle(error));
    },
    updateDrinkFavourite(context, data) {
        return drinksService.updateFavourite(data.id, data.favourite)
            .then(updated => context.commit('updateDrink', updated))
            .catch(error => errorHandler.handle(error));
    },
    addPhoto(context, data) {
        return drinksService.addPhoto(data.id, data.data)
            .then(updated => context.commit('updateDrink', updated))
            .catch(error => errorHandler.handle(error));
    },
    photosReorder(context, data) {
        return drinksService.photosReorder(data.id, data.data)
            .then(updated => context.commit('updateDrink', updated))
            .catch(error => errorHandler.handle(error));
    },
    deletePhoto(context, data) {
        return drinksService.deletePhoto(data.drinkId, data.photoId)
            .then(updated => context.commit('updateDrink', updated))
            .catch(error => errorHandler.handle(error));
    }
};