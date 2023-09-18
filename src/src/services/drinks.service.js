import axios from 'axios';
import {routes} from '../router/routes';

class DrinksService {
    load() {
        return axios
            .get(routes.drinks)
            .then(response => response.data);
    }

    add(data) {
        return axios
            .post(routes.drinks, data)
            .then(response => response.data);
    }

    update(id, data) {
        return axios
            .put(routes.drinkById(id), data)
            .then(response => response.data);
    }

    addPhoto(id, data) {
        return axios
            .post(routes.photos(id), {photo: data})
            .then(response => response.data);
    }

    updateFavourite(id, favourite) {
        return axios
            .patch(routes.drinkById(id), {favourite})
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.drinkById(id));
    }

    photosReorder(id, data) {
        return axios
            .patch(routes.photos(id), {order: data})
            .then(response => response.data);
    }

    deletePhoto(drinkId, photoId) {
        return axios.delete(routes.photoById(drinkId, photoId)).then(response => response.data);
    }
}

export const drinksService = new DrinksService();