import axios from 'axios';
import {routes} from '../router/routes';

class ApiKeysService {
    load() {
        return axios
            .get(routes.apiKeys)
            .then(response => response.data);
    }

    generate() {
        return axios
            .post(routes.apiKeys)
            .then(response => response.data);
    }

    switch(id) {
        return axios
            .patch(routes.apiKeyById(id))
            .then(response => response.data);
    }

    delete(id) {
        return axios.delete(routes.apiKeyById(id));
    }
}

export const apiKeysService = new ApiKeysService();