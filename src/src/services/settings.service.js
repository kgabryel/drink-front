import axios from 'axios';
import {routes} from '../router/routes';

class SettingsService {
    load() {
        return axios
            .get(routes.settings)
            .then(response => response.data);
    }

    switchOnlyAvailable() {
        return axios
            .patch(routes.switchOnlyAvailable)
            .then(response => response.data);
    }

    changeOzaKey(key) {
        return axios
            .patch(routes.changeOzaKey, {key})
            .then(response => response.data);
    }

    changePassword(data) {
        return axios
            .post(routes.changePasswordSettings, data)
            .then(response => response.data);
    }
}

export const settingsService = new SettingsService();