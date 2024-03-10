import axios from 'axios';
import {routes} from '../router/routes';

class DrinksCardsService {
    load() {
        return axios
            .get(routes.drinksCards)
            .then(response => response.data);
    }

    add(data) {
        return axios
            .post(routes.drinksCards, data)
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.drinksCardById(id));
    }

    modifyActivity(id, active) {
        return axios.patch(routes.modifyActivityDrinksCard(id, active ? 'activate' : 'deactivate'))
            .then(response => response.data);
    }

    update(id, data) {
        return axios
            .put(routes.drinksCardById(id), data)
            .then(response => response.data);
    }
}

export const drinksCardsService = new DrinksCardsService();