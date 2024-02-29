import axios from 'axios';
import {routes} from '../router/routes';

class IngredientsService {
    load() {
        return axios
            .get(routes.ingredients)
            .then(response => response.data);
    }

    loadSupplies() {
        return axios
            .get(routes.supplies)
            .then(response => response.data);
    }

    add(name, description, available, ozaId) {
        return axios
            .post(routes.ingredients, {name, description, available, ozaId})
            .then(response => response.data);
    }

    update(id, name, description) {
        return axios
            .patch(routes.ingredientById(id), {name, description})
            .then(response => response.data);
    }

    updateAvailable(id, available) {
        return axios
            .patch(routes.ingredientById(id), {
                available: available ? '1' : '0'
            })
            .then(response => response.data);
    }

    updateOzaId(id, ozaId) {
        return axios
            .patch(routes.ingredientById(id), {ozaId})
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.ingredientById(id));
    }
}

export const ingredientsService = new IngredientsService();