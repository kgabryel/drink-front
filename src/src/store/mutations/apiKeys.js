import Vue from 'vue';

export const apiKeys = {
    loadApiKeys(state, data) {
        state.apiKeys = {
            loaded: data.loaded,
            data: data.data
        };
    },
    generateApiKey(state, tag) {
        state.apiKeys.data.push(tag);
    },
    switchApiKey(state, apiKey) {
        const key = state.apiKeys.data.findIndex(element => element.id === apiKey.id);
        Vue.set(state.apiKeys.data, key, apiKey);
    },
    deleteApiKey(state, id) {
        state.apiKeys.data = state.apiKeys.data.filter(apiKey => apiKey.id !== id);
    }
};