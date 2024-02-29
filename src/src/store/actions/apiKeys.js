import {errorHandler} from '../../services/errorHandler';
import {apiKeysService} from '../../services/apiKeys.service';

export const apiKeys = {
    loadApiKeys(context) {
        return apiKeysService.load().then(data => context.commit('loadApiKeys', {loaded: true, data: data}));
    },
    generateKey(context) {
        return apiKeysService.generate()
            .then(apiKey => context.commit('generateApiKey', apiKey))
            .catch(error => errorHandler.handle(error));
    },
    switchApiKey(context, id) {
        return apiKeysService.switch(id)
            .then(updated => context.commit('switchApiKey', updated))
            .catch(error => errorHandler.handle(error));
    },
    deleteApiKey(context, id) {
        return apiKeysService.delete(id)
            .then(() => context.commit('deleteApiKey', id))
            .catch(error => errorHandler.handle(error));
    }
};