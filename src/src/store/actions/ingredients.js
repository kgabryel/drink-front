import {ingredientsService} from '../../services/ingredients.service';
import {errorHandler} from '../../services/errorHandler';

export const ingredients = {
    loadIngredients(context) {
        return ingredientsService.load()
            .then(data => context.commit('loadIngredients', {loaded: true, data: data}));
    },
    addIngredient(context, data) {
        return ingredientsService.add(data.name, data.description, data.available, data.ozaId)
            .then(ingredient => context.commit('addIngredient', ingredient))
            .catch(error => errorHandler.handle(error));
    },
    deleteIngredient(context, id) {
        return ingredientsService.delete(id)
            .then(() => context.commit('deleteIngredient', id))
            .catch(error => errorHandler.handle(error));
    },
    updateIngredient(context, data) {
        return ingredientsService.update(data.id, data.name, data.description)
            .then(updated => context.commit('updateIngredient', updated))
            .catch(error => errorHandler.handle(error));
    },
    updateIngredientAvailable(context, data) {
        return ingredientsService.updateAvailable(data.id, data.available)
            .then(updated => context.commit('updateIngredient', updated))
            .catch(error => errorHandler.handle(error));
    },
    updateOzaId(context, data) {
        return ingredientsService.updateOzaId(data.id, data.ozaId)
            .then(updated => context.commit('updateIngredient', updated))
            .catch(error => errorHandler.handle(error));
    }
};